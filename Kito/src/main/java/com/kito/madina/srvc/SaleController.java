package com.kito.madina.srvc;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.stream.JsonReader;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

@Controller
public class SaleController {
	
	@Resource(name = "menuService")
	private MenuService menuService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;
	
	@Resource(name = "roomService")
	private RoomService roomService;
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@RequestMapping("/sale/saveSaleOrderList.json")
	public ModelAndView saveSaleServices111(HttpServletRequest req, RoomTurnVO rtVo) {
		
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String roomUseId = req.getParameter("ROOM_USE_ID");
		String roomId = req.getParameter("ROOM_ID");
		String dataList = req.getParameter("DATA");
		String timePay = req.getParameter("CHANGE_DATE");
		String totalMoney = req.getParameter("TOTAL_MONEY");
		String payMoney = req.getParameter("PAYED_MONEY");
		String isDiliver = req.getParameter("IS_DELIVERED");
		String isDebitStr = req.getParameter("IS_DEBIT");
		String shipAddr = req.getParameter("SHIP_ADDR");
		String aCCUMULT = req.getParameter("ACCUMULT");
		
		String cusCD = req.getParameter("CUS_CD");
		int iCusCD = (cusCD != null && !cusCD.isEmpty()) ? Integer.parseInt(cusCD):0;
		int isDebit = (isDebitStr != null && !isDebitStr.isEmpty()) ? Integer.parseInt(isDebitStr):0;
		
		float totalMoneyf = Float.parseFloat(totalMoney);
		float payedMoneyf = Float.parseFloat(payMoney);
		
		roomUseId = CmmUtil.getGUID();
		//RoomTurnVO rtVo = new RoomTurnVO();
		rtVo.setROOM_USED_ID(roomUseId);
		rtVo.setCHANGE_DATE(timePay);
		rtVo.setPAYED_MONEY(payedMoneyf);
		rtVo.setTOTAL_MONEY(totalMoneyf);
		rtVo.setUSER_NAME(loginUser);
		rtVo.setIS_DELIVERED(Integer.parseInt(isDiliver));
		rtVo.setCUS_CD(iCusCD+"");
		rtVo.setIS_ORDER(1);
		rtVo.setIS_DEBIT(isDebit);
		rtVo.setSHIP_ADDR(shipAddr);
		String billCD = roomTurnService.generateBillCode();
		rtVo.setBILL_CD(billCD);
		roomTurnService.CreateRoomTurnVO(rtVo);
		if(dataList != null && dataList.length() > 10){
						
			String data = dataList.replaceAll("&quot;", "\"");
			data = data.replaceAll("false", "N");
			data = data.replaceAll("true", "Y");
			JsonReader reader1 = new JsonReader(new StringReader(data));
			reader1.setLenient(true);
					
			List<RoomSrvcVO> listServices = CmmUtil.jsonToRoomSrvcList(reader1);
			System.out.println(listServices.size());
			for(RoomSrvcVO vo : listServices){
				vo.setROOM_USED_ID(roomUseId);
				vo.setUSER_NAME(loginUser);
				
				//if(vo.getTOTAL_MONEY() > 0){}
				//else {
					float total = vo.getAMOUNT() * vo.getPRICE();
					vo.setTOTAL_MONEY(total);
				//}
				roomSrvcService.createAnOrder(vo, rtVo);
				jvon.setData(roomUseId);
				jvon.setSuccess(true);
			}
			
			// Update customer's score
			if(iCusCD != 0){
				try{
					CustomerVO cVO = new CustomerVO();
					cVO.setCUS_CD(iCusCD);
					cVO.setRESTAR_ID(restarId);
					cVO = customerService.getCustomerVOByVo(cVO);
					
					if(cVO != null){
						String _value = (aCCUMULT!=null)?aCCUMULT:"0";
						cVO.setACCUMULT(_value);
						customerService.updateCustomerVO(cVO);
					}
				}
				catch(Exception e){
					System.out.print("Error when update score");
				}
			}
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/sale/saveEditSaleOrderList.json")
	public ModelAndView saveSaleServices(HttpServletRequest req, RoomTurnVO rtVo) {
		
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String roomUseId = req.getParameter("ROOM_USE_ID");
		String dataList = req.getParameter("DATA");
		String totalMoney = req.getParameter("TOTAL_MONEY");
		String payMoney = req.getParameter("PAYED_MONEY");
		String isDiliver = req.getParameter("IS_DELIVERED");
		String isDebitStr = req.getParameter("IS_DEBIT");
		String aCCUMULT = req.getParameter("ACCUMULT");
		String hAS_PAYED = req.getParameter("HAS_PAYED");
		String cusCD = req.getParameter("CUS_CD");
		int iCusCD = (cusCD != null && !cusCD.isEmpty()) ? Integer.parseInt(cusCD):0;
		int isDebit = (isDebitStr != null && !isDebitStr.isEmpty()) ? Integer.parseInt(isDebitStr):0;
		int iHasPay = (hAS_PAYED != null && !hAS_PAYED.isEmpty()) ? Integer.parseInt(hAS_PAYED):0;
		
		float totalMoneyf = Float.parseFloat(totalMoney);
		float payedMoneyf = Float.parseFloat(payMoney);
		
		if(roomUseId == null || roomUseId.isEmpty()) return new ModelAndView("jsonView", jvon);
		
		rtVo.setPAYED_MONEY(payedMoneyf);
		rtVo.setTOTAL_MONEY(totalMoneyf);
		rtVo.setUSER_NAME(loginUser);
		rtVo.setIS_DELIVERED(Integer.parseInt(isDiliver));
		if(cusCD != null) rtVo.setCUS_CD(iCusCD+"");
		rtVo.setHAS_PAYED(iHasPay);
		rtVo.setIS_DEBIT(isDebit);
		int isDeliverOld = 1;
		if(roomUseId == null || roomUseId.isEmpty()){
			roomUseId = CmmUtil.getGUID();
			rtVo.setROOM_USED_ID(roomUseId);
			String billCD = roomTurnService.generateBillCode();
			rtVo.setBILL_CD(billCD);
			roomTurnService.CreateRoomTurnVO(rtVo);
		}else {
			RoomTurnVO vo =  new RoomTurnVO();
			vo.setRESTAR_ID(restarId);
			vo.setROOM_USED_ID(roomUseId);
			RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
			isDeliverOld = dbVo.getIS_DELIVERED();
			dbVo.setIS_DELIVERED(Integer.parseInt(isDiliver));
			if(cusCD != null && !cusCD.isEmpty())dbVo.setCUS_CD(iCusCD+"");
			dbVo.setHAS_PAYED(iHasPay);
			dbVo.setPAYED_MONEY(payedMoneyf);
			dbVo.setTOTAL_MONEY(totalMoneyf);
			dbVo.setCUS_NM(rtVo.getCUS_NM());
			dbVo.setCHANGE_DATE(rtVo.getCHANGE_DATE());
			roomTurnService.UpdateRoomTurnVO(dbVo);
		}
		
		// 1. Update bill info
		if(dataList != null && dataList.length() > 10){
						
			String data = dataList.replaceAll("&quot;", "\"");
			data = data.replaceAll("false", "N");
			data = data.replaceAll("true", "Y");
			JsonReader reader1 = new JsonReader(new StringReader(data));
			reader1.setLenient(true);
					
			List<RoomSrvcVO> listServices = CmmUtil.jsonToRoomSrvcList(reader1);
			System.out.println(listServices.size());
			for(RoomSrvcVO vo : listServices){
				vo.setROOM_USED_ID(roomUseId);
				vo.setUSER_NAME(loginUser);
				vo.setTOTAL_MONEY(vo.getAMOUNT()*vo.getPRICE());
					if(vo.getSTATUS() != null
							&& vo.getID() > 0 
							&& vo.getSTATUS() != null && vo.getSTATUS().equalsIgnoreCase("delete")){
						roomSrvcService.deleteRoomSrvcVoByID(vo.getID());
					}
					else if(vo.getID() > 0) roomSrvcService.UpdateRoomSrvcVO(vo);
					else roomSrvcService.CreateRoomSrvcVO(vo);
					jvon.setData(roomUseId);
					jvon.setSuccess(true);
			}			
		}
		// 2.1 Update store info
		if (isDiliver != null && isDiliver.equalsIgnoreCase("1") 
				&& isDeliverOld == 0){
			List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUseId);
			for(RoomSrvcVO rVo : listSrvc){
				SrvcVO sVo = new SrvcVO();
				sVo.setSRVC_ID(rVo.getSRVC_ID());
				sVo.setRESTAR_ID(restarId);
				sVo.setIS_USED(1);
				srvcService.popOutStore(sVo, rVo.getAMOUNT());
			}
		}
		// 2.2 Update store info
		if (isDiliver != null && isDiliver.equalsIgnoreCase("0") 
				&& isDeliverOld == 1){
			List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUseId);
			for(RoomSrvcVO rVo : listSrvc){
				SrvcVO sVo = new SrvcVO();
				sVo.setSRVC_ID(rVo.getSRVC_ID());
				sVo.setRESTAR_ID(restarId);
				sVo.setIS_USED(1);
				srvcService.pushInStore(sVo, rVo.getAMOUNT());
			}
		}
		// 3. Update customer info
		if(iCusCD != 0){
			try{
				CustomerVO cVO = new CustomerVO();
				cVO.setCUS_CD(iCusCD);
				cVO.setRESTAR_ID(restarId);
				cVO = customerService.getCustomerVOByVo(cVO);
				
				if(cVO != null){
					String _value = (aCCUMULT!=null)?aCCUMULT:"0";
					cVO.setACCUMULT(_value);
					customerService.updateCustomerVO(cVO);
				}
			}
			catch(Exception e){
				System.out.print("Error when update score");
			}
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/sale/getChitietbanhang.json", method = RequestMethod.GET)
	public ModelAndView getListSaleByDate(HttpServletRequest req, SrvcVO vo) {
		
		JsonVO jvon = new JsonVO();
		String userName = req.getParameter("USER_NAME");
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		String isDeliver = req.getParameter("IS_DELIVERED");
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("RESTAR_ID", loginRestautant);
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		map.put("MIN", vo.getMIN()+"");
		map.put("MAX", vo.getMAX()+"");
		
		if(userName != null && !userName.isEmpty())map.put("USER_NAME", userName);
		if(startDate != null && !startDate.isEmpty() && startDate.length() > 5)map.put("STARTDATE", startDate);
		if(endDate != null && !endDate.isEmpty() && endDate.length() > 5) map.put("ENDDATE", endDate);
		if(isDeliver != null && isDeliver.equalsIgnoreCase("1"))map.put("IS_DELIVERED", "1");
		
		if(vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty()){
			map.put("SRVC_ID", vo.getSRVC_ID());
		}
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD("DONVI");
		List<CodeVO> listCode = codeService.getListCodeVO(mVo);
		List<HashMap<String, Object>> list = roomSrvcService.getThongKeBanHang(map);
		
		for(int i=0; i< list.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = list.get(i);
			if(Vo.get("UNIT")!= null){
		    	for(CodeVO coMap : listCode){
		    		if(Vo.get("UNIT").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
		    			Vo.put("UNIT_NM", coMap.getCD_NM());
		    			break;
		    		}
		    	}
		    }
		}
		
		if(userName != null && !userName.isEmpty()){
			for(HashMap<String, Object> mapTmp : list){
				mapTmp.put("USER_NAME", userName);
			}
		}
		HashMap<String, Object> mapResult = roomSrvcService.getThongKeBanHangCount(map);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.addObject("SumObj", mapResult);
		jvon.setSuccess(true);
		jvon.setData(list);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * Description: get list deleted bill
	 * 
	 * */
	@RequestMapping(value = "/sale/getDanhSachXoa.json", method = RequestMethod.GET)
	public ModelAndView getPagingStatistic(HttpServletRequest req, RoomTurnVO vo) {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");

		HashMap<String, Object> map = new HashMap<String, Object>();

		if (startDate != null && !startDate.isEmpty())
			map.put("STARTDATE", startDate);
		if (endDate != null && !endDate.isEmpty())
			map.put("ENDDATE", endDate);

		map.put("RESTAR_ID", restarId);
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		List<RoomTurnVO> listTurnVo = roomTurnService.getDeletedBillHistory(map);
		HashMap<String, Object> mapResult = roomTurnService.getDeletedBillHistoryCount(map);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		jvon.addObject("SumObj", mapResult);
		jvon.setData(listTurnVo);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
}
