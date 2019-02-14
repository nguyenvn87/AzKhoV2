package com.kito.madina.srvc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.excel.ExcelVO;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
public class CustomerController {
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@RequestMapping(value = "/customer/getLisPagingCustomers.json", method = RequestMethod.GET)
	public ModelAndView getListCDUser(HttpServletRequest req, CustomerVO vo) {
		
				String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
				String query = req.getParameter("query");
				if(query != null){
					vo.setNAME(query);
				}
				if(vo.getNAME() == null){
					vo.setNAME("%%");
				}
				else vo.setNAME("%"+vo.getNAME()+"%");
				vo.setRESTAR_ID(restarId);
				int	limit 	=  Integer.parseInt(vo.getLimit()); 
				int	page 	=  Integer.parseInt(vo.getPage());
				vo.setMIN((page -1)*limit);
				vo.setMAX(((page-1)*limit) + limit);
				System.out.println("getListCDUser");
				
				List<CustomerVO> list = customerService.getSearchListAllCustomer(vo);
				HashMap<String, Object> map = customerService.getListCountSearchCustomer(vo);
				int totalCount = 0;
				if(map != null && map.get("COUNT") != null){
					totalCount = Integer.parseInt(map.get("COUNT").toString());
				}
				JsonVO jvon = new JsonVO();
				jvon.setData(list);
				jvon.setTotalCount(totalCount);
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/customer/createCustomer.json", method = RequestMethod.POST)
	public ModelAndView createCDUser(HttpServletRequest req, CustomerVO vo) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		vo.setRESTAR_ID(loginRestautant);
		vo.setCHANGE_USER(loginUser);
		CustomerVO vo1 = null;
		if(vo.getCUS_CD() > 0){
			vo1 = customerService.getCustomerVOByVo(vo);
		}
		if(vo.getCUS_CD() > 0){
				customerService.updateCustomerVO(vo);
				jvon.setSuccess(true);
		}
		else{
			int cusCD = customerService.createCustomerVO(vo);
			vo.setCUS_CD(cusCD);
			jvon.setData(vo);
			jvon.setSuccess(true);
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/customer/getCustomersVo.json", method = RequestMethod.GET)
	public ModelAndView getCustomersVo(HttpServletRequest req, CustomerVO vo) {
		
				String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
				vo.setRESTAR_ID(restarId);
				System.out.println("getListCDUser");
				
				CustomerVO cVo = customerService.getCustomerVOByVo(vo);
			
				JsonVO jvon = new JsonVO();
				jvon.setData(cVo);
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/customer/updateBillCustomer.json", method = RequestMethod.POST)
	public ModelAndView updateBillCustomer(HttpServletRequest req) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String roomUseId = req.getParameter("ROOM_USED_ID"); 
		String descrt = req.getParameter("DSCRT"); 
		String hasPayed = req.getParameter("HAS_PAYED"); 
		String isCancel = req.getParameter("IS_CANCELED"); 
		String payMoney = req.getParameter("PAYED_MONEY"); 
		String cusCD = req.getParameter("CUS_CD"); 
		String cusNM = req.getParameter("CUS_NM"); 
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		RoomTurnVO vo =  new RoomTurnVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setROOM_USED_ID(roomUseId);
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		
		if(isCancel != null)
			dbVo.setIS_CANCELED((isCancel != null && isCancel.equalsIgnoreCase("1"))? 1: 0);
		if(hasPayed != null)
			dbVo.setHAS_PAYED((hasPayed != null && hasPayed.equalsIgnoreCase("1"))? 1: 0);
		if(payMoney != null){
			dbVo.setPAYED_MONEY(Float.parseFloat(payMoney));
		}
		if(vo.getROOM_USED_ID() != null && !vo.getROOM_USED_ID().isEmpty()){
			
			// Update status in roomTurn
			dbVo.setDSCRT(descrt);
			dbVo.setUSER_NAME(loginUser);
			dbVo.setCUS_CD(cusCD);
			dbVo.setCUS_NM(cusNM);
			roomTurnService.UpdateRoomTurnVO(dbVo);
			
			//Checking deliver
			if(dbVo.getIS_CANCELED() == 1){
				List<RoomSrvcVO> listSrvc = null;
				if(dbVo.getIS_DELIVERED() == 1){
					// Rollback store here
					listSrvc = roomSrvcService.getListRoomSrvcVOByID(dbVo.getROOM_USED_ID());
					for(RoomSrvcVO rSVo: listSrvc){
						SrvcVO sVo = new SrvcVO();
						sVo.setSRVC_ID(rSVo.getSRVC_ID());
						srvcService.pushInStore(sVo, rSVo.getAMOUNT());
						
					}
				}
				if(roomUseId != null && roomUseId.length() > 10){
					if(listSrvc != null && listSrvc.size() > 0){
						roomTurnService.createRoomTurnHistoryVO(dbVo);
						for(RoomSrvcVO rSVo: listSrvc){
							roomSrvcService.createRoomSrvcHistoryVO(rSVo);
						}
					}
					roomSrvcService.deleteRoomSrvcByRoomUsedId(roomUseId);
					roomTurnService.deleteRoomTurnByRoomUsedId(roomUseId);
				}
			}
			jvon.setSuccess(true);
		}
		else jvon.setSuccess(false);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/customer/getListBillByCustomer.json", method = RequestMethod.GET)
	public ModelAndView getListBillByCustomer(HttpServletRequest req, RoomTurnVO vo){
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		
		map.put("RESTAR_ID", loginRestautant);
		map.put("CUS_CD", vo.getCUS_CD());
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		map.put("sort", vo.getSort()!=null&& !vo.getSort().isEmpty()?vo.getSort():"DESC");
		
		if(startDate != null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate != null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		
		List<RoomTurnVO> listTurnVo= roomTurnService.getListPagingTurnStatistic(map);
		HashMap<String, Object> mapResult = roomTurnService.getTotalStatisticCount(map);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setSuccess(true);
		jvon.addObject("SumObj", mapResult);
		jvon.setData(listTurnVo);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping(value = "/customer/getListLoanCustomer.json", method = RequestMethod.GET)
	public ModelAndView getListLoanCustomer(HttpServletRequest req, String USER_NAME, RoomTurnVO rVo){
		JsonVO jvon = new JsonVO();
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		/*int	limit 	=  Integer.parseInt(rVo.getLimit()); 
		int	page 	=  Integer.parseInt(rVo.getPage());
		rVo.setMIN((page - 1) * limit);
		rVo.setMAX(((page - 1) * limit)+limit);*/
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", loginRestautant);
		map.put("IS_CANCELED", 0);
		map.put("IS_DEBIT", 1);
		map.put("HAS_PAYED", 0);
		
		/*map.put("MIN", rVo.getMIN());
		map.put("MAX", rVo.getMAX());*/
		
		if(USER_NAME != null && ! USER_NAME.isEmpty())
			map.put("USERNAME", USER_NAME);
		List<RoomTurnVO> listTurnVo = roomTurnService.getListTurnStatistic(map);
		//List<RoomTurnVO> listTurnVo = roomTurnService.getListPagingTurnStatistic(map);
		List<CustomerVO> listCustomer = new ArrayList<CustomerVO>();
		List<Integer> listChk = new ArrayList<Integer>();
		
		for(RoomTurnVO vo : listTurnVo){
			double totalMoney =  vo.getTOTAL_MONEY();
			if(vo.getCUS_CD() == null || vo.getCUS_CD().isEmpty()) break;
			CustomerVO  cVo = new CustomerVO();
			cVo.setCUS_CD(Integer.parseInt(vo.getCUS_CD())); 
			cVo.setRESTAR_ID(loginRestautant);
			cVo = customerService.getCustomerVOByVo(cVo);
			if(cVo != null){
				if(listChk.contains(cVo.getCUS_CD())){
					for(CustomerVO tmmVo : listCustomer){
						if(cVo.getCUS_CD() == tmmVo.getCUS_CD()){
							tmmVo.setTOTAL_MONEY(totalMoney + tmmVo.getTOTAL_MONEY());
						}
					}
				}
				else {
					cVo.setTOTAL_MONEY(totalMoney);
					listCustomer.add(cVo);
					listChk.add(cVo.getCUS_CD());
				}
			}
		}
		int totalCount = 0;
		/*HashMap<String, Object> mapResult = roomTurnService.getTotalStatisticCount(map);
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}*/
		jvon.setSuccess(true);
		jvon.setData(listCustomer);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * @author Nguyen
	 * @description Print list of customers (PDF)
	 * */
	@RequestMapping(value="/customer/danhsachkhachhang.do")
	public ModelAndView danhsachkhachhang(HttpServletRequest req, Map<String, Object> model) throws JRException, IOException {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		CustomerVO vo = new CustomerVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setCUS_CD(-1);
		List<CustomerVO> list = customerService.getListCustomerVO(vo);
		
		int i=0;
		for(CustomerVO cVo: list){
			cVo.setGROUP_NM("Group 1");
		}
		
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		JRDataSource ds = new JRBeanCollectionDataSource(list);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile","");
		mapRpt.put( "paramTitle","");
		mapRpt.put( "format", "pdf");
		return new ModelAndView("danhsachkhachhangId", mapRpt);
	}
	/**
	 * @author Nguyen
	 * @description Print list of customers (EXCEL)
	 * */
	@RequestMapping(value="/customer/khachhangexcel.do")
	public ModelAndView khachhangexcel(HttpServletRequest req, Map<String, Object> model) throws JRException, IOException {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String fileName = req.getParameter("FILENAME")!= null?req.getParameter("FILENAME"):"Danh_Sach_Khach_Hang";

		List<HashMap<String, Object>> listCustomer = new ArrayList<HashMap<String,Object>>();
		ExcelVO evo = null;
		
		CustomerVO vo = new CustomerVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setCUS_CD(-1);
		List<CustomerVO> list = customerService.getListCustomerVO(vo);
		
		// Convert to HashMap List
		int count = 0;
		for(CustomerVO voTmp : list){
			count++;
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("STT", count);
			map.put("cusinfo.name", voTmp.getNAME());
			map.put("cusinfo.phone", voTmp.getPHONE());
			map.put("cusinfo.addr", voTmp.getADDR());
			map.put("cusinfo.email", voTmp.getEMAIL());
			listCustomer.add(map);
		}
		
		String[] column_arr = { "STT", "cusinfo.name", "cusinfo.phone", "cusinfo.email", "cusinfo.addr"};
		String[] column_header = new String[column_arr.length];
		for (int i = 0; i < column_arr.length; i++) {
			String newValue = column_arr[i];
			if(i!=0){ 
				String str = PropertyUtil.getStringUTF8(column_arr[i]);
				if (str != null)
					newValue = str;
			}
			column_header[i] = newValue;
		}
		
		evo = new ExcelVO(listCustomer);
		evo.addObject("fileName", fileName);
		evo.addObject("column_arr", column_arr);
		evo.addObject("column_header", column_header);
		evo.addObject("comment", "");

		return new ModelAndView("ExcelView", evo);
	}
	/**
	 * @author Nguyen
	 * @description Print history of charge
	 * */
	@RequestMapping(value="/customer/lichsugiaodich.do")
	public ModelAndView lichsugiaodich(HttpServletRequest req, RoomTurnVO vo) throws JRException, IOException {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		
		map.put("RESTAR_ID", loginRestautant);
		map.put("CUS_CD", vo.getCUS_CD());
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		
		if(startDate != null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate != null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		List<RoomTurnVO> listTurnVo= roomTurnService.getListPagingTurnStatistic(map);
		
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		JRDataSource ds = new JRBeanCollectionDataSource(listTurnVo);
		
		CustomerVO cVo = new CustomerVO();
		cVo.setCUS_CD(Integer.parseInt(vo.getCUS_CD()));
		cVo.setRESTAR_ID(loginRestautant);
		cVo = customerService.getCustomerVOByVo(cVo);
		
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile",cVo.getNAME());
		mapRpt.put( "ParamFone",cVo.getPHONE());
		mapRpt.put( "ParamAddr",cVo.getADDR());
		mapRpt.put( "format", "pdf");
		return new ModelAndView("pdfLichSuGiaoDichId", mapRpt);
	}
	@RequestMapping(value="/customer/deleteCustomer.json")
	public ModelAndView deleteCustomer(HttpServletRequest req) throws JRException, IOException {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String cusCd = req.getParameter("CUS_CD");
		CustomerVO cVo = new CustomerVO();
		
		if(cusCd != null && !cusCd.isEmpty()) {
			int cusID = Integer.parseInt(cusCd);
			cVo.setCUS_CD(cusID);
			cVo.setRESTAR_ID(loginRestautant);
			customerService.deleteCustomerByID(cVo);
			jvon.setSuccess(true);
		}
		else jvon.setSuccess(false);
		
		jvon.setMessage("OK");
		return new ModelAndView("jsonView", jvon);
	}
}
