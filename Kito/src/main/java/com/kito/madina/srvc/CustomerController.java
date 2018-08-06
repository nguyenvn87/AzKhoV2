package com.kito.madina.srvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

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
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		
		map.put("RESTAR_ID", loginRestautant);
		map.put("CUS_CD", vo.getCUS_CD());
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
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
	public ModelAndView getListLoanCustomer(HttpServletRequest req, String USER_NAME){
		JsonVO jvon = new JsonVO();
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", loginRestautant);
		map.put("IS_CANCELED", 0);
		map.put("IS_DEBIT", 1);
		map.put("HAS_PAYED", 0);
		if(USER_NAME != null && ! USER_NAME.isEmpty())
			map.put("USERNAME", USER_NAME);
		List<RoomTurnVO> listTurnVo = roomTurnService.getListTurnStatistic(map);
		List<CustomerVO> listCustomer = new ArrayList<CustomerVO>();
		List<Integer> listChk = new ArrayList<Integer>();
		
		for(RoomTurnVO vo : listTurnVo){
			Float totalMoney =  vo.getTOTAL_MONEY();
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
		jvon.setSuccess(true);
		jvon.setData(listCustomer);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
}
