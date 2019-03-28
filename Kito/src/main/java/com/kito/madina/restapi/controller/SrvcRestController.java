package com.kito.madina.restapi.controller;

import java.io.StringReader;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.stream.JsonReader;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.JwtUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;

@RestController
@RequestMapping("/rest")
public class SrvcRestController {
	
	private JwtUtil jwtUtil;

	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "menuService")
	private MenuService menuService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@Resource(name = "phieuThuService")
	private PhieuThuService phieuThuService;

	/* ---------------- GET ALL PRODUCTS ------------------------ */
	
	@RequestMapping(value = "/geListSrvc", method = RequestMethod.GET) public
	JsonVO getAllUser(HttpServletRequest req, SrvcVO vo) {
		
		String query = req.getParameter("query");
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		if(query != null && !query.isEmpty()){
			vo.setSRVC_NM(query);
		}
		String valueSearch = "";
		if(vo.getSRVC_NM() != null && !vo.getSRVC_NM().isEmpty())
			valueSearch = "%"+vo.getSRVC_NM()+"%";
		JsonVO jvon = new JsonVO();
		
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		vo.setRESTAR_ID(loginRestautant);
		vo.setSRVC_NM(valueSearch);
		List<SrvcVO> list = menuService.getSearchListAllMenu(vo);
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		HashMap<String, Object> mapResult = menuService.getListCountSearchMenu(vo);
		
		for (SrvcVO tmpVo : list) {
			// Set unit name
			if(tmpVo.getUNIT()!= null && !tmpVo.getUNIT().isEmpty()){
				String unitNm = codeService.getUnitNameFromList(tmpVo.getUNIT(), listDonVi, mapDonVi);
				tmpVo.setUNIT_NM(unitNm);
		    }
		}
		
		
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);
		return jvon;
	}
	/* ---------------- Save bill info ------------------------ */
	//@CrossOrigin(origins = "http://192.168.100.157:8080")
	@RequestMapping(value="/saveSaleOrderList", method = RequestMethod.POST)
	//public JsonVO saveSaleServices111(HttpServletRequest req, @RequestParam("DATA") List<RoomSrvcVO> listData) {
	public JsonVO saveSaleServices111(HttpServletRequest req) {	
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		try {
			String roomUseId = req.getParameter("ROOM_USE_ID");
			String dataList = req.getParameter("DATA");
			String timePay = req.getParameter("CHANGE_DATE");
			String totalMoney = req.getParameter("TOTAL_MONEY");
			String payMoney = req.getParameter("PAYED_MONEY");
			String isDiliver = req.getParameter("IS_DELIVERED");
			String isDebitStr = req.getParameter("IS_DEBIT");
			String shipAddr = req.getParameter("SHIP_ADDR");
			String aCCUMULT = req.getParameter("ACCUMULT");
			String methodList = req.getParameter("METHOD");
			String discountMoney = req.getParameter("DISCOUNT");
			String isReturn = req.getParameter("IS_RETURN");
			
			String cusCD = req.getParameter("CUS_CD");
			int iCusCD = (cusCD != null && !cusCD.isEmpty()) ? Integer.parseInt(cusCD):0;
			int isDebit = (isDebitStr != null && !isDebitStr.isEmpty()) ? Integer.parseInt(isDebitStr):0;
			int iReturn = (isReturn != null && !isReturn.isEmpty() && isReturn.equalsIgnoreCase("1")) ? 1:0;
			int iDiliver = (isDiliver != null && !isDiliver.isEmpty()) ? Integer.parseInt(isDiliver):0;
			
			double totalMoneyf = Double.valueOf(totalMoney);
			double payedMoneyf = Double.valueOf(payMoney);
			double discountValue = 0;
			if(discountMoney != null && !discountMoney.isEmpty()) discountValue = Double.valueOf(discountMoney);
			
			boolean isValid = false;
			roomUseId = CmmUtil.getGUID();
			RoomTurnVO rtVo = new RoomTurnVO();
			
			rtVo.setROOM_USED_ID(roomUseId);
			rtVo.setCHANGE_DATE(timePay);
			rtVo.setPAYED_MONEY(payedMoneyf);
			rtVo.setTOTAL_MONEY(totalMoneyf);
			rtVo.setUSER_NAME(loginUser);
			rtVo.setIS_DELIVERED(iDiliver);
			rtVo.setCUS_CD(iCusCD+"");
			rtVo.setIS_DEBIT(isDebit);
			rtVo.setIS_ORDER(1);
			rtVo.setSHIP_ADDR(shipAddr);
			rtVo.setDISCOUNT(discountValue);
			rtVo.setIS_RETURN(iReturn);
			
			String billCD = roomTurnService.generateBillCode(UtilConst.ECOUNT_PREFIX_HOADON);
			if(rtVo.getIS_RETURN()==1) billCD = roomTurnService.generateBillCode(UtilConst.ECOUNT_PREFIX_TRAHANG);
			rtVo.setBILL_CD(billCD);
			
			roomTurnService.CreateRoomTurnVO(rtVo);
			
			// Save payment method
			List<PaymentMethodVO> listMethod = null;
			if(methodList != null && methodList.length() > 10){
				String data = methodList.replaceAll("&quot;", "\"");
				data = data.replaceAll("false", "N");
				data = data.replaceAll("true", "Y");
				JsonReader reader1 = new JsonReader(new StringReader(data));
				reader1.setLenient(true);
						
				listMethod = CmmUtil.jsonToPayMethodList(reader1);
			}
			
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
					
					double total = vo.getAMOUNT() * vo.getPRICE();
					vo.setTOTAL_MONEY(total);
					
					if(rtVo.getIS_RETURN()==1) {
						roomSrvcService.createReturnBill(vo, rtVo);
					}
					else roomSrvcService.createAnOrder(vo, rtVo);
					jvon.setData(roomUseId);
					jvon.setSuccess(true);
					isValid = true;
				}
			}
			if(isValid && listMethod!= null && listMethod.size() >0){
				for(PaymentMethodVO pVo : listMethod){
					pVo.setROOM_USED_ID(roomUseId);
					phieuThuService.createPhieuThuPayment(rtVo, pVo);
				}
			}
			jvon.setSuccess(true);
		}catch(Exception e) {
			jvon.setSuccess(false);
			jvon.setMessage("Error !");
		}
		return jvon;
	}

	/* ---------------- GET USER BY ID ------------------------ */
	
	 @RequestMapping(value = "/users/{id}", method = RequestMethod.GET) public
	 ResponseEntity<Object> getUserById(@PathVariable int id) { 
		 UserVO user = new UserVO();
		 user.setUSERNAME("Nguyen");
		 user.setPASSWORD("123456");
		 
	 	if (user != null) { 
	 		return new ResponseEntity<Object>(user, HttpStatus.OK); 
	 	} 
	 	return new ResponseEntity<Object>("Not Found User", HttpStatus.NO_CONTENT); 
	 }
	 
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<String> login(HttpServletRequest request, UserVO user) {
		String result = "";
		jwtUtil = new JwtUtil();
		String userName = request.getParameter("USERNAME");
		String userPassword = request.getParameter("PASSWORD");
		String passmd5 = DigestUtils.md5Hex(userPassword) ;
		user.setUSERNAME(userName);
		user.setPASSWORD(passmd5);
		
		HttpStatus httpStatus = null;
		try {
			if (userService.checkLogin(user)) {
				result = jwtUtil.generateTokenLogin(user.getUSERNAME());
				httpStatus = HttpStatus.OK;
			} else {
				result = "Wrong userId and password";
				httpStatus = HttpStatus.BAD_REQUEST;
			}
		} catch (Exception ex) {
			result = "Server Error";
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<String>(result, httpStatus);
	}
	@RequestMapping(value = "/getPagingListDonHang", method = RequestMethod.GET)
	public ModelAndView getPagingListDonHang(HttpServletRequest req, RoomTurnVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String statisType = req.getParameter("TYPE_STATIS");
		String isDebit = req.getParameter("DEBIT");
		String isDelivered = req.getParameter("IS_DELIVERED");
		String isCanceled = req.getParameter("IS_CANCELED");
		String isOrder = req.getParameter("IS_ORDER");
		String havePayed = req.getParameter("HAS_PAYED");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		if(isDebit != null && isDebit.equals("true")){
			map.put("IS_DEBIT", 1);
		}
		if(isDelivered != null ){
			if(isDelivered.equals("1"))
				map.put("IS_DELIVERED", 1);
			else if(isDelivered.equals("0"))
				map.put("IS_DELIVERED", 0);
		}
		if(isCanceled != null){
			if(isCanceled != null && isCanceled.equals("1"))
				map.put("IS_CANCELED", 1);
			else if(isCanceled.equals("0"))
				map.put("IS_CANCELED", 0);
		}
		if(isOrder != null){
			if(isOrder.equals("1"))
				map.put("IS_ORDER", 1);
			else if(isOrder.equals("0"))
				map.put("IS_ORDER", 0);
		}
		if(havePayed != null){
			if(havePayed.equals("1"))
				map.put("HAS_PAYED", 1);
			else if(havePayed.equals("0"))
				map.put("HAS_PAYED", 0);
		}
		if(vo.getUSER_NAME()!= null && !vo.getUSER_NAME().isEmpty()){
			map.put("USER_NAME", vo.getUSER_NAME());
		}
		java.util.Date dateCrr= new java.util.Date();
		java.util.Date dateStr= new java.util.Date();
		
		dateStr.setHours(0);
		dateStr.setMinutes(0);
		dateStr.setSeconds(0);
		
		if(statisType != null && statisType.equalsIgnoreCase("DAY")){
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		}
		else if(statisType != null && statisType.equalsIgnoreCase("WEEK")){
			int abc = dateStr.getDate();
			if(abc > 1){
				dateStr.setDate(abc - 1);
			}
			else{
				dateStr.setDate(0);
			}
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		}
		else if(statisType != null && statisType.equalsIgnoreCase("MONTH")){
				dateStr.setDate(1);
				Timestamp sDate = new Timestamp(dateStr.getTime());
				Timestamp eDate = new Timestamp(dateCrr.getTime());
				map.put("STARTDATE", sDate.toString());
				map.put("ENDDATE", eDate.toString());
			}
		else if(statisType != null && statisType.equalsIgnoreCase("OTHER")){
			String startDate = req.getParameter("STARTDATE");
			String endDate = req.getParameter("ENDDATE");
			System.out.println(startDate+ " / "+ endDate);
			map.put("STARTDATE", startDate);
			map.put("ENDDATE", endDate);
		}
		
		map.put("RESTAR_ID", restarId);
		int	limit 	=  vo.getLimit()!=null?Integer.parseInt(vo.getLimit()): 15; 
		int	page 	=  vo.getPage()!=null?Integer.parseInt(vo.getPage()):1;
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		List<RoomTurnVO> listTurnVo= roomTurnService.getListPagingTurnStatistic(map);
		HashMap<String, Object> mapResult = roomTurnService.getTotalStatisticCount(map);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
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
