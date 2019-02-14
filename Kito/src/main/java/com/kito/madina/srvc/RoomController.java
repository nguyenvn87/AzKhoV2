package com.kito.madina.srvc;

import java.io.IOException;
import java.io.StringReader;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.exolab.castor.types.DateTime;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.stream.JsonReader;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.DateUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.UserVO;

@Controller
public class RoomController {

	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "menuService")
	private MenuService menuService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "roomService")
	private RoomService roomService;
	
	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	private UtilConst UtilConst = new UtilConst();
	
	@RequestMapping("/manager/roomManager.do")
	public String showService(Locale locale, Model model) {
		
		return "/manager/RoomManager2";
	}
	@RequestMapping("/manager/roomManager2.do")
	public String showService2(Locale locale, Model model) {
		
		return "/manager/RoomManager";
	}
	@RequestMapping("/manager/roomOrder.do")
	public String roomOrder(Locale locale, Model model) {
		
		
		return "/adm/admRoom";
	}
	@RequestMapping(value="/getListRoom.json", method = RequestMethod.GET)
	public ModelAndView getListRoom(RoomVO vo) {
		
		Object restarIdOj = SessionUtil.getSessionAttribute("loginRestautant");
		String restarId = restarIdOj.toString();
		//RoomVO vo = new RoomVO();
		vo.setRESTAR_ID(restarId);
		System.out.println("Lys mac sau");
		
		List<RoomVO> list = roomService.getListRoomVoByRoomVO(vo);
		
		if(list != null && list.size() > 0){
			for(RoomVO roomVO : list) {
				String roomId = roomVO.getROOM_ID();
				RoomTurnVO tmpRvo = new RoomTurnVO();
				tmpRvo.setROOM_ID(roomId);
				tmpRvo.setIS_ON(1);
				List<RoomTurnVO> listVo = roomTurnService.getListRoomTurnVoByVO(tmpRvo);
				if(listVo != null && listVo.size() > 0){
					roomVO.setIS_EMPTY(0);
				}else roomVO.setIS_EMPTY(1);
			}
		}
		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/manager/getListRoomTurn.json")
	public ModelAndView getListRoomTurn(HttpServletRequest req) {
		
		String roomId = req.getParameter("ROOM_ID");
		String roomUseId = req.getParameter("ROOM_USED_ID");
		System.out.println(roomId);
		
		List<RoomSrvcVO> list = roomSrvcService.getListRoomSrvcVOByID(roomUseId);
		
		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/manager/startRoom.json")
	public ModelAndView startRoom(HttpServletRequest req) {
		
		String roomId = req.getParameter("ROOM_ID");
		String roomUseId = req.getParameter("ROOM_USED_ID");
		String timeOnOff = req.getParameter("TIMEON_OFF");
		String changeDate = req.getParameter("CHANGEDATE");
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		System.out.println(roomId+ " / "+roomUseId);
		java.util.Date dateStr= new java.util.Date();

		int _year = Integer.parseInt(changeDate.substring(0, 4));
		int _month = Integer.parseInt(changeDate.substring(5, 7));
		int _date = Integer.parseInt(changeDate.substring(8, 10));
		dateStr.setYear(_year - 1900);
		dateStr.setMonth(_month-1);
		dateStr.setDate(_date);
		Timestamp eDate = new Timestamp(dateStr.getTime());
		String tmpDate = changeDate.substring(0, 4)+""+changeDate.substring(5, 7)+""+changeDate.substring(8, 10);
		
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_ID(roomId);
		vo.setIS_ON(1);
		List<RoomTurnVO> list = roomTurnService.getListRoomTurnVoByVO(vo);
		if(list == null || list.size() == 0){
			
			String roomUseID = CmmUtil.getGUID();
			vo.setROOM_USED_ID(roomUseID);
			vo.setTIME_STS(timeOnOff);
			vo.setCHANGE_DATE(eDate.toString());
			//vo.setCHANGE_DATE(changeDate);
			vo.setUSER_NAME(loginUser);
			vo.setDATE(tmpDate);
			roomTurnService.CreateRoomTurnVO(vo);
			
			RoomVO rVo = roomService.getRoomVoByObject(roomId);
			if(rVo != null){
				rVo.setIS_EMPTY(0);
				roomService.UpdateRoomVo(rVo);
			}
			// Set default service
			SrvcVO menuVo = new SrvcVO();
			menuVo.setIS_DEFAULT(1);
			menuVo.setIS_USED(1);
			menuVo.setRESTAR_ID(restarId);
			
			List<SrvcVO> listMenu = srvcService.getSrvcVOBySrvcVo(menuVo);
			if(listMenu != null && listMenu.size() > 0)
			for(SrvcVO mVo : listMenu){
				RoomSrvcVO sVo = new RoomSrvcVO();
				sVo.setROOM_USED_ID(roomUseID);
				sVo.setSRVC_ID(mVo.getSRVC_ID());
				sVo.setPRICE(Float.parseFloat(mVo.getPRICE()));
				sVo.setAMOUNT(0);
				sVo.setTOTAL_MONEY(sVo.getAMOUNT()*sVo.getPRICE());
				roomSrvcService.CreateRoomSrvcVO(sVo);
			}
		}
		
		JsonVO jvon = new JsonVO();
		jvon.setData(vo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/manager/endRoom.json")
	public ModelAndView endRoom(HttpServletRequest req) {
		
		String roomId = req.getParameter("ROOM_ID");
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		System.out.println(roomId);
		
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_ID(roomId);
		vo.setIS_ON(1);
		List<RoomTurnVO> list = roomTurnService.getListRoomTurnVoByVO(vo);
		if(list == null || list.size() == 0){
			vo.setROOM_USED_ID(CmmUtil.getGUID());
			//vo.setTIME_STS('113530');
			vo.setUSER_NAME(loginUser);
			roomTurnService.CreateRoomTurnVO(vo);
			
			RoomVO rVo = roomService.getRoomVoByObject(roomId);
			if(rVo != null){
				roomService.UpdateRoomVo(rVo);
			}
		}
		
		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping("/room/checkRoomRunningStatus.json")
	public ModelAndView checkRoomRunningStatus(HttpServletRequest req) {
		
		JsonVO jvon = new JsonVO();
		String roomId = req.getParameter("ROOM_ID");
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_ID(roomId);
		rVo.setIS_ON(1);
		
		List<RoomTurnVO> list = roomTurnService.getListRoomTurnVoByVO(rVo);
		
		if(list != null && list.size() > 0){
			jvon.setData(list.get(0));
		}
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/room/closeRoomServices.json")
	public ModelAndView closeRoomServices(HttpServletRequest req) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String roomUseId = req.getParameter("ROOM_USED_ID");
		String roomId = req.getParameter("ROOM_ID");
		String totalMoney = req.getParameter("TOTAL_MONEY");
		String isDebit = req.getParameter("IS_DEBIT");
		String timeOnOff = req.getParameter("TIMEON_OFF");
		
		boolean isSuccess = false;
		System.out.println(roomUseId);
		
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_USED_ID(roomUseId);
		//vo.setTIME_END(timeOnOff);
		
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		if(dbVo != null && dbVo.getROOM_USED_ID() != null){
			dbVo.setUSER_NAME(loginUser);
			dbVo.setIS_ON(UtilConst.TURN_OFF);
			roomTurnService.UpdateRoomTurnVO(dbVo);
			isSuccess = true;
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	public boolean checkRolePermition(UserVO uVo){
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		RestaurantVO rVO = restaurantService.getRestaurantVOByID(restarId);
		boolean isOk = true;
		if(rVO != null && rVO.getUSER_EDIT_BILL() != null) {
			if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
				if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_MANAGER)){
					isOk = false;
				}
				else if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_USER)){
					isOk = false;
				}
			}
			else if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_MANAGER)){
				if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_USER)){
					isOk = false;
				}
			}
			else if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_USER)){
				isOk = true;
			}
		}
		return isOk;
	}
	@RequestMapping("/room/saveTurnRoomServices.json")
	public ModelAndView saveTurnRoomServices(HttpServletRequest req) {
		
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String roomUseId = req.getParameter("ROOM_USE_ID");
		String roomId = req.getParameter("ROOM_ID");
		String dataList = req.getParameter("DATA");
		String hasPrinted = req.getParameter("PRINTED");
		
		// Checking print status
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUseId);
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(rVo);
		if(dbVo.getPRINTED() == 1){
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(loginUser);
			UserVO chkUvo = userService.getUserVo(uVo);
			if(chkUvo.getAuthority() != null && !chkUvo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
				RestaurantVO rVO = restaurantService.getRestaurantVOByID(restarId);
				if(!restaurantService.checkRolePermition(chkUvo)) {
					jvon.setSuccess(false);
					jvon.setMessage("permission");
					return new ModelAndView("jsonView", jvon);
				}
			}
		}
		
		// Performance
		if(dataList != null && dataList.length() > 10 
				&& roomUseId != null){
						
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
				
				StoreSrvcVO sVo = new StoreSrvcVO();
				sVo.setSRVC_ID(vo.getSRVC_ID());
				sVo.setRESTAR_ID(restarId);
				sVo = storeSrvcService.getStoreSrvcVOByVO(sVo);
				if(sVo == null){
					StoreSrvcVO stVo = new StoreSrvcVO();
					stVo.setSRVC_ID(vo.getSRVC_ID());
					stVo.setRESTAR_ID(restarId);
					stVo.setTOTAL_NO(1);
					stVo.setREMAIN_NO(1);
					storeSrvcService.CreateStoreSrvcVO(stVo);
					
					sVo = new StoreSrvcVO();
					sVo.setSRVC_ID(vo.getSRVC_ID());
					sVo.setRESTAR_ID(restarId);
					sVo = storeSrvcService.getStoreSrvcVOByVO(sVo);
				}
				
				if(sVo != null){
					if(vo.getSTATUS() != null
							&& vo.getID() > 0 
							&& vo.getSTATUS() != null && vo.getSTATUS().equalsIgnoreCase("delete")){
						roomSrvcService.deleteRoomSrvcVoByID(vo.getID());
						if(sVo != null){
							float total = sVo.getTOTAL_NO() + vo.getAMOUNT();
							sVo.setTOTAL_NO(total);
						}
					}
					else if(vo.getID() > 0){
						RoomSrvcVO olVo = roomSrvcService.getRoomSrvcVOByObject(vo);
						float oldAmount = olVo.getAMOUNT();
						if(vo.getAMOUNT() > oldAmount){
							float total = sVo.getTOTAL_NO() - (vo.getAMOUNT() - oldAmount);
							sVo.setTOTAL_NO(total);
						}
						else if(vo.getAMOUNT() < oldAmount){
							float total = sVo.getTOTAL_NO() + (oldAmount - vo.getAMOUNT());
							sVo.setTOTAL_NO(total);
						}
						roomSrvcService.UpdateRoomSrvcVO(vo);
					}
					else {
						roomSrvcService.CreateRoomSrvcVO(vo);
						if(sVo != null){
							if( sVo.getTOTAL_NO() >=  vo.getAMOUNT()){
								float total = sVo.getTOTAL_NO() - vo.getAMOUNT();
								sVo.setTOTAL_NO(total);
							}
						}
					}
					if(sVo.getSTORE_ID() != null)
						storeSrvcService.updateStoreSrvcVo(sVo);
					jvon.setSuccess(true);
				}
				else{
					jvon.setSuccess(false);
				}
			}
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/room/saveChangeRoom.json")
	public ModelAndView saveChangeRoom(HttpServletRequest req) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String roomUseId = req.getParameter("ROOM_USE_ID");
		String roomFrom = req.getParameter("ROOM_ID");
		String roomTo = req.getParameter("ROOM_TO");
		JsonVO jvon = new JsonVO();
		
		RoomTurnVO ckVo = new RoomTurnVO();
		ckVo.setROOM_USED_ID(roomUseId);
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(ckVo);
		if(dbVo.getPRINTED() == 1){
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(loginUser);
			UserVO chkUvo = userService.getUserVo(uVo);
			if(chkUvo.getAuthority() != null && !chkUvo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
				//RestaurantVO rVO = restaurantService.getRestaurantVOByID(restarId);
				if(!restaurantService.checkRolePermition(chkUvo)) {
					jvon.setSuccess(false);
					jvon.setMessage("permission");
					return new ModelAndView("jsonView", jvon);
				}
			}
		}
		// Check RoomTO
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_ID(roomTo);
		rVo.setIS_ON(1);
		List<RoomTurnVO> list = roomTurnService.getListRoomTurnVoByVO(rVo);
		if(list != null && list.size() > 0){
			jvon.setMessage("This room is busy !");
		}
		else{
			RoomTurnVO vo = new RoomTurnVO();
			vo.setROOM_USED_ID(roomUseId);
			vo.setROOM_ID(roomTo);
			vo.setIS_ON(1);
			roomTurnService.UpdateRoomTurnVO(vo);
			jvon.setMessage("Okied !");
		}		
		
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/room/saveToCalculate.json")
	public ModelAndView saveToCalculate(HttpServletRequest req) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String roomUseId = req.getParameter("ROOM_USED_ID");
		String roomId = req.getParameter("ROOM_ID");
		String totalMoneyStr = req.getParameter("TOTAL_MONEY");
		String timeOnOff = req.getParameter("TIMEON_OFF");
		
		float totalMoney = Float.parseFloat(totalMoneyStr);
		boolean isSuccess = true;
		System.out.println(roomUseId);
		
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_USED_ID(roomUseId);
		
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		float hoursTotal = DateUtil.calculateHours(dbVo.getTIME_STS(), timeOnOff);
		
		String sTime[] = timeOnOff.split(" ");
		String sArr[] = sTime[0].split(":");
		String hh = sArr[0];
		String mn = sArr[1];
		if(sArr[0].length() <2){
			hh = "0" + sArr[0];
		}
		if(sArr[1].length() <2){
			mn = "0" + sArr[1];
		}
		timeOnOff = hh + ":" + mn +" "+ sTime[1];
		dbVo.setTIME_END(timeOnOff);
		roomTurnService.UpdateRoomTurnVO(dbVo);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("hours", hoursTotal);
		
		// Set time of sing
		HashMap<String, String> mapSrvc = new HashMap<String, String>();
		mapSrvc.put("TYPE", "LI003");
		List<MenuVO> listMenu = menuService.getListMenuVoByGroupType(mapSrvc);
		if(listMenu.size() > 0){
			map.put("SRVCID", listMenu.get(0).getSRVC_ID());
		}		
		JsonVO jvon = new JsonVO();
		jvon.setData(map);
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping("/room/saveTurnRoomPayment.json")
	public ModelAndView saveTurnRoomPayment(HttpServletRequest req) {
		
		JsonVO jvon = new JsonVO();
		boolean isSuccess = false;
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String roomUseId = req.getParameter("ROOM_USED_ID");
		String totalValue = req.getParameter("TOTAL_MONEY");
		String payedValue = req.getParameter("PAYED_MONEY");
		String strDebit = req.getParameter("IS_DEBIT");
		String strDscrt = req.getParameter("DSCRT");
		String timeEnd = req.getParameter("TIME_END");
		try{
			if(timeEnd != null && timeEnd.split(":").length > 0){
				String house = timeEnd.split(":")[0];
				if(Integer.parseInt(house) > 12){
					timeEnd = timeEnd + " PM";
				} 
				else timeEnd = timeEnd + " AM";
			}
		}catch(Exception e){}
		
		float totalMoney = Float.parseFloat(totalValue);
		float payedMoney = Float.parseFloat(payedValue);
		
		int isDebit = 0;
		int hasPayed = 1;
		if(strDebit != null && strDebit.equalsIgnoreCase("true")){
			isDebit = 1;
			hasPayed = 0;
		}
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_USED_ID(roomUseId);
		
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		
		// Update into system
		if(dbVo != null && dbVo.getROOM_USED_ID() != null){
			dbVo.setUSER_NAME(loginUser);
			dbVo.setTOTAL_MONEY(totalMoney);
			dbVo.setPAYED_MONEY(payedMoney);
			dbVo.setIS_DEBIT(isDebit);
			dbVo.setDSCRT(strDscrt);
			dbVo.setHAS_PAYED(hasPayed);
			dbVo.setTIME_END((timeEnd!=null && !timeEnd.isEmpty())?timeEnd:"");
			dbVo.setIS_ON(UtilConst.TURN_OFF);
			roomTurnService.UpdateRoomTurnVO(dbVo);
			isSuccess = true;
		}
		
		jvon.setData(dbVo);
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/room/saveDebitPayment.json")
	public ModelAndView saveDebitPayment(HttpServletRequest req) {
		
		boolean isSuccess = false;
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String roomUseId = req.getParameter("ROOM_USED_ID");
		String hasPayedStr = req.getParameter("HAS_PAYED");
		String payedInfo = req.getParameter("PAY_INFO");
		String payedDateStr = req.getParameter("PAY_DATE");
		
		String payedDate = null; 
		
		if(payedDateStr != null && payedDateStr.length() > 10){
			payedDate = payedDateStr.substring(0, 10);
		}
		
		int hasPayed = 0;
		
		RoomTurnVO vo = new RoomTurnVO();
		vo.setROOM_USED_ID(roomUseId);
		
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		if(hasPayedStr != null && hasPayedStr.equalsIgnoreCase("true")){
			hasPayed = 1;
			double remain = dbVo.getTOTAL_MONEY() - dbVo.getPAYED_MONEY();
			payedInfo = payedInfo +"(Lan 1:{"+ dbVo.getPAYED_MONEY()+"} ; lan 2:{"+remain+"})";
			dbVo.setPAYED_MONEY(dbVo.getTOTAL_MONEY());
		}
		
		if(dbVo != null && dbVo.getROOM_USED_ID() != null){
			dbVo.setUSER_NAME(loginUser);
			dbVo.setHAS_PAYED(hasPayed);
			dbVo.setPAY_INFO(payedInfo);
			dbVo.setPAY_DATE(payedDate);
			roomTurnService.UpdateRoomTurnVO(dbVo);
			isSuccess = true;
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/manager/saleManager.do")
	public String saleManager(Locale locale, Model model) {
		
		return "/manager/SaleManager";
	}
}
