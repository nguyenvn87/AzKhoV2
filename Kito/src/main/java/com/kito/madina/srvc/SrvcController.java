package com.kito.madina.srvc;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.DateUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.ProviderService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.ProviderVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.UserVO;
import com.sun.jmx.snmp.Timestamp;

@Controller
public class SrvcController {

	@Resource(name = "roomService")
	private RoomService roomService;

	@Resource(name = "menuService")
	private MenuService menuService;

	@Resource(name = "srvcService")
	private SrvcService srvcService;

	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;

	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;

	@Resource(name = "providerService")
	private ProviderService providerService;

	@Resource(name = "importService")
	private ImportService importService;

	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;

	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	

	@RequestMapping("/service.do")
	public String showService(Locale locale, Model model) {

		return "/adm/srvc";
	}

	@RequestMapping(value = "/getTestList", method = RequestMethod.GET)
	public @ResponseBody RoomVO getShopInJSON() {

		RoomVO shop = new RoomVO();
		shop.setRESTAR_ID("1232");
		shop.setROOM_FLOR("234");

		return shop;

	}

	@RequestMapping(value = "/testjson", method = RequestMethod.GET)
	public String jsonAjax(Locale locale, Model model) {

		return "testjson";
	}

	@RequestMapping(value = "/getjson", method = RequestMethod.GET)
	public @ResponseBody String testJson() {

		List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
		for (int i = 0; i < 15; i++) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("Name", "John");
			map.put("RollNo", "101" + i);
			map.put("Percentage", "%" + i);
			list.add(map);
		}
		String abc = CmmUtil.objToJson(list);
		return abc;
	}

	@RequestMapping(value = "/saveRoom.json", method = RequestMethod.POST)
	public ModelAndView saveRoom(HttpServletRequest req, RoomVO rVo) {

		System.out.println("Save room");
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();

		rVo.setRESTAR_ID(loginRestautant);

		if (rVo.getROOM_ID() == null || rVo.getROOM_ID().isEmpty()) {
			rVo.setROOM_ID(CmmUtil.getGUID());
			roomService.CreateRoomVO(rVo);
		} else {
			roomService.UpdateRoomVo(rVo);
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getListService.json", method = RequestMethod.GET)
	public ModelAndView getListService(HttpServletRequest req, SrvcVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String query = req.getParameter("query");
		HashMap<String, Object> mapResult = null;
		JsonVO jvon = new JsonVO();
		List<SrvcVO> list = null;
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		
		if(query != null && !query.isEmpty()) vo.setSRVC_NM(query);
		
		vo.setRESTAR_ID(loginRestautant);
		if (vo.getIS_USED() != 0 && vo.getIS_USED() != 1)
			vo.setIS_USED(-1);
		if (vo.getSRVC_NM() != null && !vo.getSRVC_NM().isEmpty()) {
			String valueSearch = "%" + vo.getSRVC_NM() + "%";
			vo.setSRVC_NM(valueSearch);
			list = menuService.getSearchListAllMenu(vo);
			mapResult = menuService.getListCountSearchMenu(vo);
		} else {
			list = srvcService.getPagingListSrvc(vo);
		}

		// Group hang
		List<CmmCdUserVO> listGrp = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_HANG);

		// Group don vi
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);

		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		try {
			for (SrvcVO tmpVo : list) {
				if (tmpVo.getTYPE() != null) {
					boolean isNotHaveGroup = false;
					for (CmmCdUserVO groupVo : listGrp) {
						if (groupVo.getCD().equalsIgnoreCase(tmpVo.getTYPE().trim())) {
							tmpVo.setGROUP_NM(groupVo.getCD_NM());
							tmpVo.setTYPE_NM(groupVo.getCD_NM());
							isNotHaveGroup = true;
						}
					}
					if (!isNotHaveGroup) {
						tmpVo.setTYPE_NM("");
					}
				}
				
				// Set unit name
				if(tmpVo.getUNIT()!= null && !tmpVo.getUNIT().isEmpty()){
					String unitNm = cmmCdUserService.getUnitNameFromList(tmpVo.getUNIT(), listDonVi, mapDonVi);
					tmpVo.setUNIT_NM(unitNm);
			    }
				
			}
		} catch (Exception e) {

		}
		if(mapResult == null)
			mapResult = srvcService.getSrvcListCount(vo);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);

		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getListAllSrvcVo.json", method = RequestMethod.GET)
	public ModelAndView getListAllSrvcVo(SrvcVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();

		vo.setRESTAR_ID(loginRestautant);
		vo.setIS_USED(1);

		List<SrvcVO> list = srvcService.getSrvcVOBySrvcVo(vo);

		jvon.setData(list);
		jvon.setSuccess(true);

		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/saveService.json", method = RequestMethod.POST)
	public ModelAndView saveRoom(HttpServletRequest req, SrvcVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		vo.setRESTAR_ID(loginRestautant);
		SrvcVO vo1 = null;
		String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
		//vo.setCHANGE_DATE(timeStamp);
		
		if (vo.getSRVC_CD() != null && vo.getSRVC_CD().length() > 0) {
			SrvcVO ckVO = new SrvcVO();
			ckVO.setRESTAR_ID(loginRestautant);
			ckVO.setSRVC_CD(vo.getSRVC_CD().trim());
			ckVO.setIS_USED(-1);
			vo1 = srvcService.getSrvcVO(ckVO);
		}
		if (vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty()) {
			//vo.setUSER_NAME(loginUser);
			if (vo1 != null && !vo1.getSRVC_ID().trim().equalsIgnoreCase(vo.getSRVC_ID().trim())) {
				jvon.setSuccess(false);
				jvon.setMessage(PropertyUtil.getString("message.user.existcode"));
			} else {
				srvcService.updateSrvcVO(vo);
				jvon.setSuccess(true);
			}
		} else if (vo1 != null) {
			jvon.setSuccess(false);
			jvon.setMessage(PropertyUtil.getString("message.user.existcode"));
		} else {
			String srvcID = CmmUtil.getGUID();
			vo.setCHANGE_DATE(timeStamp);
			vo.setSRVC_ID(srvcID);
			vo.setUSER_NAME(loginUser);
			srvcService.createSrvcVO(vo);

			StoreSrvcVO storeVo = new StoreSrvcVO();
			storeVo.setSTORE_ID("KARAO");
			storeVo.setSRVC_ID(srvcID);
			storeVo.setRESTAR_ID(loginRestautant);
			storeVo.setTOTAL_NO(0);
			storeVo.setUSERNAME(loginUser);
			storeSrvcService.CreateStoreSrvcVO(storeVo);
			jvon.setSuccess(true);
		}
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping("/srvc/statistic.do")
	public String statistic(Locale locale, Model model) {

		return "/support/statistic";
	}

	@RequestMapping(value = "/getListProvider.json", method = RequestMethod.GET)
	public ModelAndView getListProvider(ProviderVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();

		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);

		vo.setRESTAR_ID(loginRestautant);

		List<ProviderVO> list = providerService.getPagingListProviderVo(vo);
		HashMap<String, Object> mapResult = providerService.getProviderListCount(vo);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);

		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/saveProvider.json", method = RequestMethod.POST)
	public ModelAndView saveProvider(HttpServletRequest req, ProviderVO vo) {

		System.out.println("Save room");
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		vo.setRESTAR_ID(loginRestautant);
		if (vo.getPROV_CD() == null || vo.getPROV_CD().isEmpty()) {

			providerService.createProviderVO(vo);
		} else {
			if(vo.getSTATUS() != null && vo.getSTATUS().equalsIgnoreCase("DELETE"))
				providerService.deleteProviderVO(vo.getPROV_CD());
			else providerService.updateProviderVO(vo);
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getListStatisticImportProfit.json", method = RequestMethod.GET)
	public ModelAndView getListStatisticImportProfit(HttpServletRequest req, ImportVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String statisType = req.getParameter("LIID");
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");

		JsonVO jvon = new JsonVO();
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());

		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);

		vo.setRESTAR_ID(loginRestautant);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", loginRestautant);
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());

		if (startDate != null && !startDate.isEmpty())
			map.put("STARTDATE", startDate);
		if (endDate != null && !endDate.isEmpty())
			map.put("ENDDATE", endDate);
		// List<HashMap<String, Object>> list =
		// importService.getListStatisticImportProfit(vo);
		List<ImportDetailVO> list = importService.getImportDetailPaging(map);

		CmmCdUserVO cmmVo = new CmmCdUserVO();
		cmmVo.setGROUP_CD(UtilConst.GROUP_HANG);
		cmmVo.setRESTAR_ID(loginRestautant);
		cmmVo.setUSE_YN("Y");
		List<CmmCdUserVO> listGrp = cmmCdUserService.getListCmmCdUserVO(cmmVo);

		try {
			for (ImportDetailVO tmpVo : list) {
				if (tmpVo.getTYPE() != null) {
					boolean isNotHaveGroup = false;
					for (CmmCdUserVO groupVo : listGrp) {
						//if (Integer.toString(groupVo.getCD()).equalsIgnoreCase(tmpVo.getTYPE().trim())) {
						if (groupVo.getCD().equalsIgnoreCase(tmpVo.getTYPE().trim())) {
							tmpVo.setTYPE_NM(groupVo.getCD_NM());
							isNotHaveGroup = true;
						}
					}
					if (!isNotHaveGroup) {
						tmpVo.setTYPE_NM(UtilConst.GROUP_NONE);
					}
				}
			}
		} catch (Exception e) {

		}
		// HashMap<String, Object> mapResult =
		// importService.getStsImportProfitCount(vo);
		HashMap<String, Object> mapResult = importService.getImportDetailPagingCount(map);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.addObject("SumObj", mapResult);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);

		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getListAllRoomTurn.json", method = RequestMethod.GET)
	public ModelAndView getLístAllRoomTurn(RoomTurnVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();

		vo.setRESTAR_ID(loginRestautant);
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (vo.getIS_DEBIT() == 1)
			map.put("IS_DEBIT", vo.getIS_DEBIT());
		if (vo.getHAS_PAYED() == 1)
			map.put("HAS_PAYED", vo.getHAS_PAYED());
		if (vo.getHAS_PAYED() == 0)
			map.put("HAS_PAYED", vo.getHAS_PAYED());

		map.put("RESTAR_ID", loginRestautant);
		List<RoomTurnVO> list = roomTurnService.getListTurnStatistic(map);

		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getListProductHavedSaled.json", method = RequestMethod.GET)
	public ModelAndView getListProductHavedSaled(HttpServletRequest req) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		HashMap<String, Object> mapType = new HashMap<String, Object>();
		mapType.put("RESTAR_ID", loginRestautant);
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(mapType);
		CmmCdUserVO mVo = new CmmCdUserVO();
		mVo.setRESTAR_ID(loginRestautant);
		mVo.setGROUP_CD("GRHAG");
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(mVo);

		for (int i = 0; i < listOut.size(); i++) {
			HashMap<String, Object> tmpMap = listOut.get(i);
			String groupName = "";
			if (tmpMap.get("TYPE") != null) {
				try {
					int _code = Integer.parseInt(tmpMap.get("TYPE").toString().trim());
					//CmmCdUserVO tmpVo = cmmCdUserService.getCmmCdUserVoByCD(listCode, _code);
					CmmCdUserVO tmpVo = cmmCdUserService.getCmmCdUserVoByCD(listCode, _code+"");
					if (tmpVo != null) {
						groupName = tmpVo.getCD_NM();
						tmpMap.put("TYPE_NM", groupName);
					}
				} catch (Exception e) {
					System.out.println("Error type of Srvc is not number !");
				}
			}
		}
		jvon.setData(listOut);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getPagingProductHavedSaled.json", method = RequestMethod.GET)
	public ModelAndView getPagingProductHavedSaled(HttpServletRequest req, SrvcVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		HashMap<String, Object> mapType = new HashMap<String, Object>();
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		String userNm = req.getParameter("USER_NAME");
		String isDeliver = req.getParameter("IS_DELIVERED");
		String isReturn = req.getParameter("IS_RETURN");
		String cusCD = req.getParameter("CUS_CD");
		
		UserVO uVo = null;
		if(userNm != null && !userNm.isEmpty()){ 
			try{
				uVo = new UserVO();
				uVo.setUSERNAME(userNm);
				uVo = userService.getUserVo(uVo);
			}catch(Exception e){
				System.out.println(e.getMessage());
			}
		}
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		mapType.put("MIN", vo.getMIN());
		mapType.put("MAX", vo.getMAX());
		
		if(startDate != null && !startDate.isEmpty()) mapType.put("STARTDATE", startDate);
		if(endDate != null && !endDate.isEmpty()) mapType.put("ENDDATE", endDate);
		if(uVo != null && !userNm.isEmpty()) mapType.put("USER_NAME", userNm);
		if(isDeliver != null && isDeliver.equalsIgnoreCase("1"))mapType.put("IS_DELIVERED", "1");
		if(cusCD != null && !cusCD.isEmpty()) mapType.put("CUS_CD", cusCD);
		
		if(vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty()) mapType.put("SRVC_ID", vo.getSRVC_ID());
		
		// Get list srvc
		mapType.put("RESTAR_ID", loginRestautant);
		if(isReturn!=null && isReturn.equalsIgnoreCase("1")) mapType.put("IS_RETURN", 1);
		else mapType.put("IS_RETURN", 0);
		List<HashMap<String, Object>> listOut = roomSrvcService.getPagingSaledSrvc(mapType);

		// Get common code
		//CodeVO mVo = new CodeVO();
		//mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		//List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		for (int i = 0; i < listOut.size(); i++) {
			HashMap<String, Object> tmpMap = listOut.get(i);
			
			// Format number
			Float totalObj =  Float.parseFloat(tmpMap.get("AMOUNT").toString());
			
			tmpMap.put("TOTAL_MONEY",tmpMap.get("TOTAL"));
			if(totalObj > 0){
				tmpMap.put("TOTAL",CmmUtil.formatNumber2Money(totalObj) );
			}
			// Unit name
			if(uVo != null && !uVo.getFULLNAME().isEmpty()) tmpMap.put("USER_NAME", uVo.getFULLNAME());
			if(tmpMap.get("UNIT")!= null){
				/*
				 * if(mapDonVi.get(tmpMap.get("UNIT"))!= null){} else{ for(CodeVO coMap :
				 * listDonVi){
				 * if(tmpMap.get("UNIT").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
				 * mapDonVi.put(tmpMap.get("UNIT").toString(), coMap.getCD_NM()); break; } } }
				 */
				String unitNm = cmmCdUserService.getUnitNameFromList(tmpMap.get("UNIT").toString().trim(), listDonVi, mapDonVi);
				tmpMap.put("UNIT_NM", unitNm);
		    }
			//tmpMap.put("UNIT_NM", mapDonVi.get(tmpMap.get("UNIT")));
		}
		HashMap<String, Object> resultMap = roomSrvcService.getCountSaledSrvc(mapType);
		jvon.setData(listOut);
		jvon.addObject("SumObj", resultMap);
		jvon.setSuccess(true);
		jvon.setTotalCount(Integer.parseInt(resultMap.get("COUNT").toString()));
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/getAllSrvcCount.json", method = RequestMethod.GET)
	public ModelAndView getAllSrvcCount(HttpServletRequest req) {
		SrvcVO vo = new SrvcVO();
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();

		vo.setRESTAR_ID(loginRestautant);
		vo.setIS_USED(-1);
		vo.setIS_SERVICE(-1);
		HashMap<String, Object> mapResult = srvcService.getSrvcListCount(vo);

		jvon.setData(mapResult);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}

	@RequestMapping(value = "/deleteBillOrder.json", method = RequestMethod.GET)
	public ModelAndView deleteRoomTurn(HttpServletRequest req) {
		String roomUsedId = req.getParameter("ROOM_USED_ID");
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		JsonVO jvon = new JsonVO();

		// Checking print status
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUsedId);
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(rVo);
		if (dbVo.getPRINTED() == 1) {
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(loginUser);
			UserVO chkUvo = userService.getUserVo(uVo);
			if (chkUvo.getAuthority() != null && !chkUvo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_ADMIN)) {
				RestaurantVO rVO = restaurantService.getRestaurantVOByID(restarId);
				if (!restaurantService.checkRolePermition(chkUvo)) {
					jvon.setSuccess(false);
					jvon.setMessage("permission");
					return new ModelAndView("jsonView", jvon);
				}
			}
		}

		try {
			if (roomUsedId != null && !roomUsedId.isEmpty()) {
				int iRoomSrvc = roomSrvcService.deleteRoomSrvcByRoomUsedId(roomUsedId);
				int iRoomTurn = roomTurnService.deleteRoomTurnByRoomUsedId(roomUsedId);
				jvon.setSuccess(true);
			} else
				jvon.setSuccess(false);
		} catch (Exception e) {
			jvon.setSuccess(false);
		}
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping(value = "/srvc/deleteProductInBill.json", method = RequestMethod.POST)
	public ModelAndView deleteRoomTurn(HttpServletRequest req, RoomSrvcVO vo) {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		try {
			roomSrvcService.deleteRoomSrvcVoByID(vo.getID());
			
			SrvcVO sVo = new SrvcVO();
			sVo.setSRVC_ID(vo.getSRVC_ID());
			sVo.setRESTAR_ID(restarId);
			srvcService.pushInStore(sVo, vo.getAMOUNT());
			jvon.setSuccess(true);
		} catch (Exception e) {
			jvon.setSuccess(false);
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/srvc/getListBillDetail.json", method = RequestMethod.GET)
	public ModelAndView getListBillDetail(HttpServletRequest req) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String roomUsedId = req.getParameter("ROOM_USED_ID");
		List<RoomSrvcVO> listSrvc = null;
		if(roomUsedId != null && !roomUsedId.isEmpty()){
			listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUsedId);
		}

		jvon.setData(listSrvc);
		jvon.setSuccess(true);

		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/updateStatusInStore.json", method = RequestMethod.POST)
	public ModelAndView updateStatusInStore(HttpServletRequest req, SrvcVO vo) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		vo.setRESTAR_ID(loginRestautant);
		SrvcVO vo1 = null;
		String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
		
		if (vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty() && vo.getAMOUNT_STORE() >= 0) {
			
			// backup
			SrvcVO bkvo = new SrvcVO();
			bkvo.setSRVC_ID(vo.getSRVC_ID());
			bkvo.setRESTAR_ID(vo.getRESTAR_ID());
			bkvo.setIS_USED(1);
			SrvcVO storeVo = srvcService.getSrvcVO(vo);
			srvcService.backupSrvcVOToHistory(storeVo, vo.getAMOUNT_STORE());
			
			// update store
			vo.setUSER_NAME(loginUser);
			vo.setCHANGE_DATE(timeStamp);
			vo.setREASON("(K)");
			srvcService.updateStatusStore(vo);
			jvon.setSuccess(true);
		}
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/srvc/getListSrvcHistory.json", method = RequestMethod.GET)
	public ModelAndView getListSrvcHistory(HttpServletRequest req, String SRVC_ID) {

		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		List<SrvcVO> listSrvc = null;
		String changeDate = req.getParameter("CHANGE_DATE");
		
		if(SRVC_ID != null && !SRVC_ID.isEmpty()){
			if(changeDate != null && changeDate.length() > 5 )
				listSrvc = srvcService.getListSrvcVOHistory(SRVC_ID, changeDate);
			else listSrvc = srvcService.getListSrvcVOHistory(SRVC_ID, null);
		}

		jvon.setData(listSrvc);
		jvon.setSuccess(true);

		return new ModelAndView("jsonView", jvon);
	}
	/***
	 * Import product from excel
	 * @param file
	 * @return
	 */
	@RequestMapping(value = "/importfromexcel.json", method = RequestMethod.POST)
	public ModelAndView importSPFromExcel(@RequestParam("fileUpload") MultipartFile file) {
		
		//String type = req.getParameter("type");
		System.out.println("Import from excel file"
				);
		JsonVO jvon = new JsonVO();
		List<SrvcVO> listSrvc = srvcService.importSPListFromExcel(file);
		srvcService.saveList(listSrvc);
		if(listSrvc !=null) {
			jvon.setMessage("Success");
			jvon.setSuccess(true);
		}
		else
			jvon.setMessage("Failse");
		return new ModelAndView("jsonView", jvon);
	}
	
}
