package com.kito.madina.report;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.DateUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.UserVO;
import com.google.common.util.concurrent.ExecutionError;
import com.kito.madina.cmmn.excel.ExcelVO;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
public class ReportController {
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "importService")
	private ImportService importService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "roomService")
	private RoomService roomService;
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	
	@RequestMapping(value="/report/testreport.do")
	public ModelAndView preview_issue(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		List<HashMap<String, String>> al = new ArrayList<HashMap<String, String>>();
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put( "datasource", ds);
		map.put( "format", "pdf");
		return new ModelAndView("testReportId", map);
	}
	@RequestMapping(value="/report/billPrint.do")
	public ModelAndView billPrint(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String webAddr = req.getParameter("SUPPLYER");
		String roomUsedId = req.getParameter("LIID");
		String printTyle = req.getParameter("PRINT_TYPE");
		String strRetail = req.getParameter("ISRETAIL");
		String paramTimeIn = "";
		String paramTimeOut = "";
		String paramRoomNo = "";
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		uVo = userService.getUserVo(uVo);
		boolean isA4 = false;
		boolean isRetail = false;
		
		if(printTyle != null && printTyle.equalsIgnoreCase("1")){
			isA4 = true;
		}
		else if(printTyle != null && printTyle.equalsIgnoreCase("0")){
			isA4 = false;
		}
		if(strRetail != null && strRetail.equalsIgnoreCase("1")){
			isRetail = true;
		}
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		String timeInOut = "";
		List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUsedId);
		RoomTurnVO rtVo = new RoomTurnVO();
		rtVo.setROOM_USED_ID(roomUsedId);
		RoomTurnVO tmpRtVo = roomTurnService.getRoomTurnVOByObject(rtVo);
		
		// Check this bill had printed or not
		try{
			if(tmpRtVo.getPRINTED()==0){
				tmpRtVo.setPRINTED(1);
				roomTurnService.UpdateRoomTurnVO(tmpRtVo);
			}
		}catch(Exception e){
			
		}
		// Get date
		try {
	        DateFormat f = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	        Date d = f.parse(tmpRtVo.getCHANGE_DATE());
	        DateFormat date = new SimpleDateFormat("dd/MM/yyyy");
	        map.put( "ParamDate", date.format(d));
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
		// Get time in/out
		if(tmpRtVo != null){
			if(tmpRtVo.getTIME_STS() != null && !tmpRtVo.getTIME_STS().isEmpty())
				paramTimeIn = paramTimeIn + tmpRtVo.getTIME_STS();
			if(tmpRtVo.getTIME_END() != null && !tmpRtVo.getTIME_END().isEmpty())
				paramTimeOut = paramTimeOut + tmpRtVo.getTIME_END();
			RoomVO rVo = roomService.getRoomVoByObject(tmpRtVo.getROOM_ID());
			if(rVo != null){
				paramRoomNo = rVo.getROOM_NO();
			}
		}
		
		for(int i=0; i< listSrvc.size(); i++){
			RoomSrvcVO vo = listSrvc.get(i);
			String stt = (i+1)+"";
			double totalMoney = vo.getAMOUNT() * vo.getPRICE();
			String totalM = CmmUtil.formatNumber2Money(totalMoney);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			String unitName = (vo.getUNIT_NM()!=null) ? vo.getUNIT_NM():"";
			
			mapVo.put("ItemName", vo.getMENU_NM());
			mapVo.put("ItemPrice", CmmUtil.formatNumber2Money(vo.getPRICE()));
			mapVo.put("ItemNo", stt);
			mapVo.put("ItemTotal", totalMoney);
			mapVo.put("ItemUnit", vo.getAMOUNT()+"");
			mapVo.put("ItemAmount", unitName);
			al.add(mapVo);
		}
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUsedId);
		rVo = roomTurnService.getRoomTurnVOByObject(rVo);
		
		RestaurantVO restaurntVO = restaurantService.getRestaurantVOByID(rVo.getRESTAR_ID());
		if(printTyle == null || printTyle.isEmpty()){
			if(restaurntVO.getIS_PRINT_BIG()!= null && restaurntVO.getIS_PRINT_BIG().trim().equalsIgnoreCase("1")){
				isA4 = true;
			}
			else isA4 = false;
		}
		
		if(rVo != null && rVo.getCHANGE_DATE() != null){
			String printDate = "NgÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â y "+ rVo.getCHANGE_DATE().substring(8, 10)
					+ " thÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡ng "+ rVo.getCHANGE_DATE().substring(5, 7) 
					+ " nÃƒÆ’Ã¢â‚¬Å¾Ãƒâ€ Ã¢â‚¬â„¢m "+ rVo.getCHANGE_DATE().substring(0, 4); 					
			map.put("PRINTDATE", printDate);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		map.put( "ParamResName", restaurntVO.getRESTAR_NM());
		map.put( "ParamAddr", restaurntVO.getADDR());
		map.put( "ParamPhone",restaurntVO.getBILL_TITLE3());
		map.put( "ParamHours", paramTimeIn);
		map.put( "ParamHoursOut", paramTimeOut);
		map.put( "ParamRoomNo", paramRoomNo);
		map.put( "ParamUser", uVo.getFULLNAME());
		String billTitle = (restaurntVO.getBILL_TITLE()!= null)?restaurntVO.getBILL_TITLE():PropertyUtil.getStringUTF8("info.restar.title");
		map.put("paramMainTitle", billTitle);
		map.put("paramTitle2", restaurntVO.getADDR2()!=null?restaurntVO.getADDR2():"");
		
		map.put( "ParameterWebAddr", (webAddr != null)?webAddr:"");
		map.put( "datasource", ds);
		map.put( "format", "pdf");
		String strPrintParam = "billPrintId";
		
		if(isA4){
			strPrintParam = "billA4PrintId";
		}
		if(isRetail)
			strPrintParam = "billRetailPrintId";
		return new ModelAndView(strPrintParam, map);
	}
	@RequestMapping(value="/report/rptDaily.do")
	public ModelAndView rptDaily(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String roomUsedId = req.getParameter("LIID");
		String roomNM = req.getParameter("ROOM_NM");
		
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUsedId);
		
		for(int i=0; i< listSrvc.size(); i++){
			RoomSrvcVO vo = listSrvc.get(i);
			String stt = (i+1)+"";
			double totalMoney = vo.getAMOUNT() * vo.getPRICE();
			String totalM = CmmUtil.formatNumber2Money(totalMoney);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			mapVo.put("ItemName", vo.getMENU_NM());
			mapVo.put("ItemPrice", CmmUtil.formatNumber2Money(vo.getPRICE()));
			mapVo.put("ItemNo", stt);
			mapVo.put("ItemTotal", totalMoney);
			mapVo.put("ItemUnit", vo.getAMOUNT()+"");
			mapVo.put("ItemAmount", vo.getUNIT_NM());
			al.add(mapVo);
		}
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUsedId);
		rVo = roomTurnService.getRoomTurnVOByObject(rVo);
			
		map.put("ROOM_PARAM", roomNM);
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		map.put( "datasource", ds);
		map.put( "format", "pdf");
		return new ModelAndView("rptDailyExportId", map);
	}
	@RequestMapping(value = "/getStatistic.json", method = RequestMethod.GET)
	public ModelAndView getStatistic(HttpServletRequest req, SrvcVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", "RES1234");
		
		List<RoomTurnVO> listTurnVo= roomTurnService.getListTurnStatistic(map);
		
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		jvon.setData(listTurnVo);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/report/statistic.do")
	public String showService(Locale locale, Model model) {
		
		return "/support/statistic";
	}
	@RequestMapping("/report/statisticview.do")
	public String showStatisticView(Locale locale, Model model) {
		
		return "/support/statistic-view";
	}
	@RequestMapping("/report/debit.do")
	public String showDebit(Locale locale, Model model) {
		
		return "/support/debit";
	}
	@RequestMapping("/report/getStatisticInfo.json")
	public ModelAndView getStatisticInfo(HttpServletRequest req, @RequestParam(value="TYPE_STATIS", required=false)String TYPE_STATIS){
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		System.out.println("TYPE_STATIS = "+TYPE_STATIS);
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("ENDDATE", endDate);
		List<RoomTurnVO> listTurnVo= roomTurnService.getListTurnStatistic(map);
		
		
		JsonVO jvon = new JsonVO();
		jvon.setData(listTurnVo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/report/getPagingStatistic.json", method = RequestMethod.GET)
	public ModelAndView getPagingStatistic(HttpServletRequest req, RoomTurnVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String statisType = req.getParameter("TYPE_STATIS");
		String isDebit = req.getParameter("DEBIT");
		String isDelivered = req.getParameter("IS_DELIVERED");
		String isCanceled = req.getParameter("IS_CANCELED");
		String isOrder = req.getParameter("IS_ORDER");
		String havePayed = req.getParameter("HAS_PAYED");
		String isReturn = req.getParameter("IS_RETURN");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		if(isDebit != null && isDebit.equals("true")){
			map.put("IS_DEBIT", 1);
		}
		if(isReturn != null && isReturn.equals("1")) map.put("IS_RETURN", 1);
		else map.put("IS_RETURN", 0);
		
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
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		
		List<RoomTurnVO> listTurnVo= roomTurnService.getListPagingTurnStatistic(map);
		for(RoomTurnVO voTmp: listTurnVo) {
			String userName = voTmp.getUSER_NAME();
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(userName);
			try {
				vo.setRESTAR_ID(restarId);
				uVo = userService.getUserVo(uVo);
				voTmp.setSALER(uVo.getFULLNAME());
			}catch(Exception e) {
				
			}
		}
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
	@RequestMapping(value = "/report/getPagingDebitList.json", method = RequestMethod.GET)
	public ModelAndView getPagingDebitList(HttpServletRequest req, RoomTurnVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String statisType = req.getParameter("TYPE_STATIS");
		String isDebit = req.getParameter("DEBIT");
		String hasPayed = req.getParameter("HAS_PAYED");
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		if(isDebit != null && isDebit.equals("true")){
			map.put("IS_DEBIT", 1);
		}
		if(hasPayed != null && hasPayed.equals("0")){
			map.put("HAS_PAYED", 0);
		}
		if(hasPayed != null && hasPayed.equals("1")){
			map.put("HAS_PAYED", 1);
		}
		map.put("RESTAR_ID", restarId);
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
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
	@RequestMapping(value="/report/calculateProfit.do")
	public ModelAndView calculateProfit(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String statisType = req.getParameter("LIID");
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String arrangeTime = "";
		System.out.println("statisType = "+statisType+ " STARTDATE = "+startDateParam+" / endDate = "+endDateParam);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
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
		else {
			map.put("STARTDATE", startDateParam);
			map.put("ENDDATE", endDateParam);
		}
		
		
		map.put("RESTAR_ID", restarId);
		
		// Style for date
		
		System.out.println("STARTDATE = "+map.get("STARTDATE"));
		String startDate = "";
		String endDate = "";
		if(map.get("STARTDATE") != null && !map.get("STARTDATE").toString().isEmpty()){
			
			startDate = map.get("STARTDATE").toString();
			 
			startDate = DateUtil.getVNDateFormatFromString(startDate);
		}
		if(map.get("ENDDATE") != null && !map.get("ENDDATE").toString().isEmpty()){
			
			endDate = map.get("ENDDATE").toString();
			 
			endDate = DateUtil.getVNDateFormatFromString(endDate);
		}
		System.out.println(startDate + " / "+ endDate);
		List<RoomTurnVO> listTurnVo= roomTurnService.getListTurnStatistic(map);
		
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		Map<String, Object> mapdate = new HashMap<String, Object>();
		String ItemDateToDate = "("+startDate + " -> "+ endDate+")";
		mapdate.put("ItemDateToDate", ItemDateToDate);
		//al.add(mapdate);
		for(int i=0; i< listTurnVo.size(); i++){
			int j = i+1;
			String timeEnd = "";
			String timeStart = "";
			RoomTurnVO vo = listTurnVo.get(i);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			if(vo.getTIME_END() != null){
				timeEnd = vo.getTIME_END().split(" ")[0];
			}
			if(vo.getTIME_STS() != null){
				timeStart = vo.getTIME_STS().split(" ")[0];
			}
			
			mapVo.put("ItemDate", vo.getCHANGE_DATE());
			mapVo.put("ItemRoom", vo.getROOM_NO());
			mapVo.put("ItemNote", vo.getDSCRT());
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemStartTime", timeStart+" -> "+timeEnd);
			mapVo.put("ItemTotal", vo.getTOTAL_MONEY());
			mapVo.put("ItemPayed", vo.getPAYED_MONEY());
			al.add(mapVo);
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "paramDate", ItemDateToDate);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("profitPrintId", mapRpt);
	}
	@RequestMapping(value="/report/calculateStore.do")
	public ModelAndView calculateStore(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		StoreSrvcVO vos = new StoreSrvcVO();
		List<StoreSrvcVO> list = storeSrvcService.getListStoreSrvcVOByVO(vos);
		
		CmmCdUserVO cVo = new CmmCdUserVO();
		cVo.setRESTAR_ID(restarId);
		cVo.setGROUP_CD(UtilConst.GROUP_HANG);
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(cVo);
		
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		
		Map<String, Object> mapDate = new HashMap<String, Object>();

		for(int i=0; i< list.size(); i++){
			int j = i+1;
			StoreSrvcVO vo = list.get(i);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			if(vo.getSRVC_NM() != null && !vo.getSRVC_NM().isEmpty()){
			    float total = 0;
			    if(vo.getTOTAL_NO() != 0){
			    	total = vo.getTOTAL_NO();
			    }
			    if(vo.getTYPE()!= null && !vo.getTYPE().isEmpty()){
			    	for(CmmCdUserVO coMap : listCode){
			    		if(vo.getTYPE().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapVo.put("ItemType", coMap.getCD_NM());
			    			break;
			    		}
			    		
			    	}
			    }
				mapVo.put("ItemName", vo.getSRVC_NM());
				mapVo.put("ItemNo", ""+j);
				mapVo.put("ItemUnit", (vo.getUNIT_NM()!=null)?vo.getUNIT_NM():"");
				mapVo.put("ItemTotal", total);
				if(vo.getTYPE() != null && vo.getTYPE().equalsIgnoreCase("LI003")){
					
				}
				else if(mapVo.get("ItemUnit") != null && !mapVo.get("ItemUnit").toString().isEmpty()
						&& mapVo.get("ItemTotal")!= null
						&&!mapVo.get("ItemUnit").toString().isEmpty()
						&& mapVo.get("ItemName")!= null
						&&!mapVo.get("ItemName").toString().isEmpty()){
					al.add(mapVo);
				}
			}
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("storePrintId", mapRpt);
	}
	
	@RequestMapping(value="/report/exportStore.do")
	public ModelAndView exportStore(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String statisType = req.getParameter("LIID");
		String arrangeTime = "";
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, Object> map =  null ;
		if(statisType!= null && statisType.equalsIgnoreCase("DAY")){
			arrangeTime = "(Trong ngÃƒÆ’Ã‚Â y)";
			map = getArrangeTime(statisType);
		}else if(statisType!= null && statisType.equalsIgnoreCase("WEEK")){
			//arrangeTime = "(Trong tuÃƒÂ¡Ã‚ÂºÃ‚Â§n)";
			map = getArrangeTime(statisType);
		}else if(statisType!= null && statisType.equalsIgnoreCase("MONTH")){
			//arrangeTime = "(Trong thÃƒÆ’Ã‚Â¡ng)";
			map = getArrangeTime(statisType);
		}
		else{
			map = new HashMap<String, Object>();
			String startDateParam = req.getParameter("STARTDATE");
			String endDateParam = req.getParameter("ENDDATE");
			arrangeTime = "("+startDateParam.substring(8, 10)
						+"/"+startDateParam.substring(5, 7)
						+"/"+startDateParam.substring(0, 4)
						+" -> "
						+ endDateParam.substring(8, 10)
						+ "/"+endDateParam.substring(5, 7)
						+ "/"+endDateParam.substring(0, 4)
						+ ")";
			map.put("STARTDATE", startDateParam);
			map.put("ENDDATE", endDateParam);
		}
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		CmmCdUserVO cVo = new CmmCdUserVO();
		cVo.setRESTAR_ID(restarId);
		cVo.setGROUP_CD("GRHAG");
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(cVo);
		
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
		for(HashMap<String, Object> mVo : listOut){
			Map<String, Object> mapVo = new HashMap<String, Object>();
			String total = (mVo.get("total")!= null) ? mVo.get("total").toString():"";
			String groupName = "";
			if(mVo.get("TYPE") != null){
				try{
					int _code = Integer.parseInt(mVo.get("TYPE").toString().trim());
					//CmmCdUserVO tmpVo = cmmCdUserService.getCmmCdUserVoByCD(listCode, _code);
					CmmCdUserVO tmpVo = cmmCdUserService.getCmmCdUserVoByCD(listCode, _code+"");
					if(tmpVo != null)
						groupName = tmpVo.getCD_NM();
				}catch(Exception e){
					System.out.println("TYPE is not valid !");
				}
			}
			mapVo.put("ItemName", mVo.get("SRVC_NM"));
			mapVo.put("ItemUnit", mVo.get("UNIT_NM"));
			mapVo.put("ItemAmount",total);
			mapVo.put("ItemType", groupName);
			mapVo.put("ItemTotalMoney", mVo.get("total_money"));
			al.add(mapVo);
		}
		if(arrangeTime.isEmpty() && map != null && map.get("paramDate")!= null){
			arrangeTime = map.get("paramDate").toString();
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "paramDate", arrangeTime);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("storeExportId", mapRpt);
	}
	public HashMap<String, Object> getArrangeTime(String statisType){
		
		String arrangeTime = "";
		String startDateParam = "";
		String endDateParam = "";
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
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
		else if(statisType != null && statisType.equalsIgnoreCase("YEAR")){
			dateStr.setDate(1);
			dateStr.setMonth(0);
			dateCrr.setDate(30);
			dateCrr.setMonth(11);
			dateCrr.setHours(23);
			dateCrr.setMinutes(59);
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		}
		else {
			dateStr.setDate(1);
			dateStr.setMonth(1);
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		}
		if(map.get("STARTDATE") != null && map.get("STARTDATE").toString().length() >= 10
				& map.get("ENDDATE") != null && map.get("ENDDATE").toString().length() >= 10){
			startDateParam = map.get("STARTDATE").toString();
			endDateParam = map.get("ENDDATE").toString();
			
			arrangeTime = "("+startDateParam.substring(8, 10)
			+"/"+startDateParam.substring(5, 7)
			+"/"+startDateParam.substring(0, 4)
			+" -> "
			+ endDateParam.substring(8, 10)
			+ "/"+endDateParam.substring(5, 7)
			+ "/"+endDateParam.substring(0, 4)
			+ ")";
		}
		map.put("paramDate", arrangeTime);
		return map;
	}
	@RequestMapping(value="/report/rptImportProfit.do")
	public ModelAndView rptImportProfit(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String userName = req.getParameter("USERNAME");
		
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		HashMap<String, Object> mapType =  null ;
		String arrangeTime = null;
		
		
		mapType = new HashMap<String, Object>();
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		mapType.put("STARTDATE", startDateParam);
		mapType.put("ENDDATE", endDateParam);
		
		// Sale list
		if(userName != null && !userName.isEmpty())mapType.put("USER_NAME", userName);
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(mapType);
		
		CodeVO codeVo = new CodeVO();
		codeVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		codeVo.setUSE_YN("Y");
		List<CodeVO> listCodeUnit = codeService.getListCodeVO(codeVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		for(CodeVO cVO : listCodeUnit){
			mapDonVi.put(cVO.getCD(), cVO.getCD_NM());
		}
		
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			HashMap<String, Object> tmpMap = listOut.get(i);
			tmpMap.put("SRVC_ID", tmpMap.get("SRVC_ID"));
			String groupName = tmpMap.get("TYPE_NM")!=null?tmpMap.get("TYPE_NM").toString():"";
			Map<String, Object> mapVo = new HashMap<String, Object>();
			
			Double totalAmount = tmpMap.get("TOTAL") != null?Double.valueOf(tmpMap.get("TOTAL").toString()):0.0;
			Double soBan = tmpMap.get("AMOUNT")!=null?Double.parseDouble(tmpMap.get("AMOUNT").toString()): 0;
			Double giaNhap = tmpMap.get("PRICE_IMPORT") != null?Double.parseDouble(tmpMap.get("PRICE_IMPORT").toString()): 0;
			Double tienvon = soBan * giaNhap;
			Double loiNhuan = totalAmount - tienvon;
			mapVo.put("ItemName", tmpMap.get("SRVC_NM"));
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemUnit", mapDonVi.get(tmpMap.get("UNIT")));
			mapVo.put("ItemTienVon", tienvon);
			mapVo.put("ItemPayed", totalAmount);
			mapVo.put("ItemAmount", tmpMap.get("AMOUNT"));
			mapVo.put("ItemType", groupName);
			mapVo.put("ItemProfit", loiNhuan);
			
			al.add(mapVo);
		}
		UserVO userVo = null;
		try{
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(userName);
			uVo.setRESTAR_ID(restarId);
			userVo = userService.getUserVo(uVo);
		}catch(Exception e){
			
		}
		if(startDateParam!= null && !startDateParam.isEmpty()){
			startDateParam = startDateParam.substring(0, 10);
			startDateParam = startDateParam.split("-")[2] +"/"+ startDateParam.split("-")[1] +"/"+ startDateParam.split("-")[0];
			String startDate = PropertyUtil.getStringUTF8("date.fromdate");
			arrangeTime = startDate + ": " +startDateParam;
		}
		if(endDateParam!= null && !endDateParam.isEmpty()){
			endDateParam = endDateParam.substring(0, 10);
			endDateParam = endDateParam.split("-")[2] +"/"+ endDateParam.split("-")[1] +"/"+ endDateParam.split("-")[0];
			String startDate = PropertyUtil.getStringUTF8("date.todate");
			if(arrangeTime != null) arrangeTime = arrangeTime + " - " + startDate + ": " +endDateParam;
			else arrangeTime = startDate + ": " +endDateParam;
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		
		mapRpt.put( "paramUserName", userVo!=null?userVo.getFULLNAME():null);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "format", "pdf");
		mapRpt.put( "paramDate", arrangeTime);
		return new ModelAndView("rptImportProfitId", mapRpt);
	}
	public HashMap<String, Object> getObjectInList(List<HashMap<String, Object>> list, String str, String value){
		HashMap<String, Object> map = null;
		
		if(list != null && list.size() > 0){
			for (HashMap<String, Object> tmpMap : list) {
				if(tmpMap.get(str) != null && tmpMap.get(str).toString().equalsIgnoreCase(value)){
					map = tmpMap;
					break;
				}
			}
		}
		return map;
	}
	@RequestMapping(value="/report/PrintDebitStatistic.do")
	public ModelAndView PrintDebitStatistic(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String statisType = req.getParameter("LIID");
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String hasPayed = req.getParameter("HAS_PAYED");
		String content = req.getParameter("CONTENT");
		
		String arrangeTime = "";
		System.out.println("statisType = "+statisType+ " STARTDATE = "+startDateParam+" / endDate = "+endDateParam);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		java.util.Date dateCrr= new java.util.Date();
		java.util.Date dateStr= new java.util.Date();
		
		dateStr.setHours(0);
		dateStr.setMinutes(0);
		dateStr.setSeconds(0);
		
		map.put("RESTAR_ID", restarId);
		map.put("IS_DEBIT", "1");
		map.put("HAS_PAYED", hasPayed);
		
		// Style for date
		List<RoomTurnVO> listTurnVo= roomTurnService.getListTurnStatistic(map);
		
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		
		for(int i=0; i< listTurnVo.size(); i++){
			int j = i+1;
			String timeEnd = "";
			String timeStart = "";
			RoomTurnVO vo = listTurnVo.get(i);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			if(vo.getTIME_END() != null){
				timeEnd = vo.getTIME_END().split(" ")[0];
			}
			if(vo.getTIME_STS() != null){
				timeStart = vo.getTIME_STS().split(" ")[0];
			}
			
			mapVo.put("ItemDate", vo.getCHANGE_DATE());
			mapVo.put("ItemRoom", vo.getROOM_NO());
			mapVo.put("ItemNote", vo.getDSCRT());
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemStartTime", timeStart+" -> "+timeEnd);
			mapVo.put("ItemTotal", vo.getTOTAL_MONEY());
			mapVo.put("ItemPayed", vo.getPAYED_MONEY());
			al.add(mapVo);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "paramDate",content);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("debitPrintId", mapRpt);
	}
	@RequestMapping(value="/getListMonthlyProfit.json", method = RequestMethod.GET)
	public ModelAndView getListMonthlyProfit(HttpServletRequest req,int YEAR) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("YEAR", YEAR);
		List<HashMap<String, Object>> listOut = new ArrayList<HashMap<String,Object>>();
		List<HashMap<String, Object>> listSale = roomTurnService.getListMonthlyProfit(map);
		List<HashMap<String, Object>> listImport = importService.getListMonthlyImport(map);
		
		for(int i=1; i <= 12; i++){
			HashMap<String, Object> mapOut = new HashMap<String, Object>();
			for(HashMap<String, Object> mapSale : listSale){
				if(Integer.parseInt(mapSale.get("MONTH").toString()) == i){
					mapOut.put("MONTH", mapSale.get("MONTH"));
					mapOut.put("TOTAL", mapSale.get("TOTAL"));
					
				}
			}
			for(HashMap<String, Object> mapUse : listImport){
				if(Integer.parseInt(mapUse.get("MONTH").toString()) == i){
					mapOut.put("EXPENSE", mapUse.get("TOTAL"));
				}
			}
			listOut.add(mapOut);
		}
		JsonVO jvon = new JsonVO();
		jvon.setData(listOut);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/getListMonthlyImport.json", method = RequestMethod.GET)
	public ModelAndView getListMonthlyImport(HttpServletRequest req,int YEAR) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("YEAR", YEAR);
		List<HashMap<String, Object>> list = importService.getListMonthlyImport(map);
		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/getListDailyProfit.json", method = RequestMethod.GET)
	public ModelAndView getListDailyProfit(HttpServletRequest req,int YEAR, int MONTH) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("YEAR", YEAR);
		map.put("MONTH", MONTH);
		List<HashMap<String, Object>> list = roomTurnService.getListDailyProfit(map);
		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/report/PrintSaledProduct1.do")
	public ModelAndView PrintSaledProduct1(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String userName = req.getParameter("USER_NAME");
		
		String subtitle = "";
		if(startDateParam!= null){
			subtitle = "("+startDateParam.substring(8, 10)
			+"/"+startDateParam.substring(5, 7)
			+"/"+startDateParam.substring(0, 4);
		}
		if(endDateParam != null){
			subtitle = subtitle +" - "+ endDateParam.substring(8, 10)
			+ "/"+endDateParam.substring(5, 7)
			+ "/"+endDateParam.substring(0, 4)+")";
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("RESTAR_ID", restarId);
		if(startDateParam != null && !startDateParam.isEmpty()) map.put("STARTDATE", startDateParam);
		if(endDateParam != null && !endDateParam.isEmpty()) map.put("ENDDATE", endDateParam);
		if(userName != null && !userName.isEmpty())map.put("ENDDATE", userName);
		
		CmmCdUserVO mVo = new CmmCdUserVO();
		mVo.setRESTAR_ID(restarId);
		mVo.setGROUP_CD("GRHAG");
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(mVo);
		
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
				
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = listOut.get(i);
			HashMap<String, Object> mapVo = new HashMap<String, Object>();
			if(Vo.get("TYPE")!= null){
		    	for(CmmCdUserVO coMap : listCode){
		    		if(Vo.get("TYPE").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
		    			mapVo.put("ItemType", coMap.getCD()+"");
		    			break;
		    		}
		    	}
		    }
			if(Vo.get("TOTAL") != null){
				String sumValue = CmmUtil.formatNumber2Money(Float.parseFloat(Vo.get("TOTAL").toString()));
				mapVo.put("ItemNumber", sumValue);
			}
			
			mapVo.put("ItemName", Vo.get("SRVC_NM"));
			mapVo.put("ItemCode", "");
			mapVo.put("ItemNote", Vo.get(""));
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemType", "1");
			
			mapVo.put("ItemAmount", Vo.get("TOTAL"));
			mapVo.put("ItemUnit", (Vo.get("UNIT_NM")!=null)?Vo.get("UNIT_NM"):"");
			mapVo.put("ItemTotal", Vo.get("TOTAL_MONEY"));
			if(userName != null && !userName.isEmpty()) mapVo.put("itemUserName", userName);
			
			al.add(mapVo);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile",subtitle);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("idListSrvcSaled", mapRpt);
	}
	
	@RequestMapping(value="/PrintSaledProduct.json", method = RequestMethod.GET)
	public ModelAndView ExportSaledProduct(HttpServletRequest req) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();		
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		
		String subtitle = "";
		if(startDateParam!= null){
			subtitle = "("+startDateParam.substring(8, 10)
			+"/"+startDateParam.substring(5, 7)
			+"/"+startDateParam.substring(0, 4);
		}
		if(endDateParam != null){
			subtitle = subtitle +" - "+ endDateParam.substring(8, 10)
			+ "/"+endDateParam.substring(5, 7)
			+ "/"+endDateParam.substring(0, 4)+")";
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("RESTAR_ID", restarId);
		map.put("STARTDATE", startDateParam);
		map.put("ENDDATE", endDateParam);
	
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
		JsonVO jvon = new JsonVO();
		jvon.setData(listOut);
		jvon.addObject("Obj", subtitle);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/report/PrintImportProduct.do")
	public ModelAndView ListImportProduct(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();		
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String subtitle = "";
		if(startDateParam!= null){
			subtitle = "("+startDateParam.substring(8, 10)
			+"/"+startDateParam.substring(5, 7)
			+"/"+startDateParam.substring(0, 4);
		}
		if(endDateParam != null){
			subtitle = subtitle +" - "+ endDateParam.substring(8, 10)
			+ "/"+endDateParam.substring(5, 7)
			+ "/"+endDateParam.substring(0, 4)+")";
		}
		CmmCdUserVO cVo = new CmmCdUserVO();
		cVo.setRESTAR_ID(restarId);
		cVo.setGROUP_CD("GRHAG");
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(cVo);
		
		HashMap<String, Object> iVo = new HashMap<String, Object>();
		iVo.put("RESTAR_ID",restarId);
		iVo.put("STARTDATE", startDateParam);
		iVo.put("ENDDATE", endDateParam);
		List<HashMap<String, Object>> listOut = importService.getImportDetailAll(iVo);
	
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = listOut.get(i);
			HashMap<String, Object> mapVo = new HashMap<String, Object>();
			if(Vo.get("TYPE")!= null){
		    	for(CmmCdUserVO coMap : listCode){
		    		if(Vo.get("TYPE").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
		    			mapVo.put("ItemType", coMap.getCD()+"");
		    			break;
		    		}
		    	}
		    }
			if(Vo.get("AMOUNT") != null){
				String sumValue = CmmUtil.formatNumber2Money(Float.parseFloat(Vo.get("AMOUNT").toString()));
				mapVo.put("ItemNumber", sumValue);
			}
			mapVo.put("ItemName", Vo.get("SRVC_NAME"));
			mapVo.put("ItemCode", Vo.get("SRVC_CD"));
			mapVo.put("ItemNote", "");
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemType", "1");
			mapVo.put("ItemAmount", Vo.get("AMOUNT"));
			mapVo.put("ItemUnit", (Vo.get("UNIT")!=null)?Vo.get("UNIT"):"");
			mapVo.put("ItemTotal", Vo.get("TOTAL_MONEY"));
			al.add(mapVo);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile",subtitle);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("idListSrvcImport", mapRpt);
	}
	@RequestMapping(value="/report/excel/exportExcel.do")
	public ModelAndView createLisInfo1(HttpSession session, HttpServletRequest req) throws Exception{
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		ExcelVO evo = null;
		
		HashMap<String, Object> iVo = new HashMap<String, Object>();
		iVo.put("RESTAR_ID",restarId);
		iVo.put("STARTDATE", startDateParam);
		iVo.put("ENDDATE", endDateParam);
		List<HashMap<String, Object>> listData = importService.getImportDetailAll(iVo);
		
		String[] column_arr = {"SRVC_NAME","SRVC_CD", "AMOUNT", "TOTAL_MONEY"};
		String[] column_header =  new String[column_arr.length];
		for(int i=0; i < column_arr.length; i++){
			String str = PropertyUtil.getString(column_arr[ i ]);
			String newValue = column_arr[ i ];
			try {
				newValue = new String(str.getBytes("iso-8859-1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			column_header[i] = newValue;
		}
		evo = new ExcelVO(listData);
		evo.addObject( "fileName", "FileName");
		evo.addObject( "column_arr", column_arr );
		evo.addObject( "column_header", column_header );
		evo.addObject("comment", "");
		
		return new ModelAndView( "ExcelView", evo );
	}
	// Export data of import detail
	@RequestMapping(value="/report/excel/ExcelImportDetail.do")
	public ModelAndView ExcelImportDetail(HttpSession session, HttpServletRequest req) throws Exception{
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String iMPRT_CD = req.getParameter("IMPRT_CD");
		String fileName = req.getParameter("FILENAME");
		ImportVO vo = new ImportVO();
		vo.setIMPRT_CD(Integer.parseInt(iMPRT_CD) );
		ExcelVO evo = null;
		
		List<HashMap<String, Object>> listData = new ArrayList<HashMap<String,Object>>();
		List<ImportDetailVO> list = importService.getDetailFromImportVO(vo);
		if(list != null && list.size() > 0)
		for(int i=0; i < list.size(); i++){
			ImportDetailVO iVo = list.get(i);
			HashMap<String, Object> tmpMap = new HashMap<String, Object>();
			tmpMap.put("SRVC_CD", iVo.getSRVC_CD());
			tmpMap.put("SRVC_NAME", iVo.getSRVC_NAME());
			tmpMap.put("IMPRT_PRICE", iVo.getIMPRT_PRICE());
			tmpMap.put("NOTE", iVo.getNOTE());
			tmpMap.put("TOTAL_MONEY", iVo.getTOTAL_MONEY());
			tmpMap.put("AMOUNT", iVo.getAMOUNT());
			tmpMap.put("UNIT", iVo.getUNIT());
			listData.add(tmpMap);
		}
		
		String[] column_arr = {"SRVC_NAME","SRVC_CD", "AMOUNT","UNIT","NOTE", "TOTAL_MONEY"};
		String[] column_header =  new String[column_arr.length];
		for(int i=0; i < column_arr.length; i++){
			String str = PropertyUtil.getStringUTF8(column_arr[ i ]);
			String newValue = column_arr[ i ];
			if(str != null) newValue = str;
			column_header[i] = newValue;
		}
		evo = new ExcelVO(listData);
		evo.addObject( "fileName", fileName);
		evo.addObject( "column_arr", column_arr );
		evo.addObject( "column_header", column_header );
		evo.addObject("comment", "");
		
		return new ModelAndView( "ExcelView", evo );
	}
	
	@RequestMapping(value="/report/excel/exportExcel1.do")
	public ModelAndView createLisInfo(HttpSession session, HttpServletResponse response) throws Exception{
		
		//String output = ServletRequestUtils.getStringParameter(request, "output");
			String output = "EXCEL";
			//dummy data
			Map<String,String> revenueData = new HashMap<String,String>();
			revenueData.put("Jan-2010", "$100,000,000");
			revenueData.put("Feb-2010", "$110,000,000");
			revenueData.put("Mar-2010", "$130,000,000");
			revenueData.put("Apr-2010", "$140,000,000");
			revenueData.put("May-2010", "$200,000,000");

			if(output ==null || "".equals(output)){
				//return normal view
				return new ModelAndView("RevenueSummary","revenueData",revenueData);

			}else if("EXCEL".equals(output.toUpperCase())){
				//return excel view
				return new ModelAndView("ExcelRevenueSummary","revenueData",revenueData);

			}else{
				//return normal view
				return new ModelAndView("RevenueSummary","revenueData",revenueData);

			}
	}
	@RequestMapping(value="/report/excel/exportSaledExcel.do")
	public ModelAndView exportSaleList(HttpSession session, HttpServletRequest req) throws Exception{
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		ExcelVO evo = null;
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("RESTAR_ID", restarId);
		map.put("STARTDATE", startDateParam);
		map.put("ENDDATE", endDateParam);
		
		CmmCdUserVO mVo = new CmmCdUserVO();
		mVo.setRESTAR_ID(restarId);
		mVo.setGROUP_CD("GRHAG");
		List<CmmCdUserVO> listCode = cmmCdUserService.getListCmmCdUserVO(mVo);
		
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
		float total = 0;
		for(int i=0;i < listOut.size();i++){
			HashMap<String, Object> mapTmp = listOut.get(i);
			mapTmp.put("TT", i+1);
			float totalMn = Float.parseFloat(mapTmp.get("TOTAL").toString());
			mapTmp.put("TOTAL_MONEY", totalMn);
			mapTmp.put("TOTAL", mapTmp.get("AMOUNT"));
			total = total + totalMn;
		}
		HashMap<String, Object> mapTotal = new HashMap<String, Object>();
		mapTotal.put("TOTAL", PropertyUtil.getStringUTF8("TOTAL_MONEY"));
		mapTotal.put("TOTAL_MONEY", total);
		listOut.add(mapTotal);
		String[] column_arr = {"TT","SRVC_NM","SRVC_CD", "TOTAL", "TOTAL_MONEY"};
		String[] column_header =  new String[column_arr.length];
		
		for(int i=0; i < column_arr.length; i++){
			String newValue = column_arr[ i ];
			if(i!=0){
				String str = PropertyUtil.getStringUTF8(column_arr[ i ]);
				newValue = str;
			}
			column_header[i] = newValue;
		}		
		evo = new ExcelVO(listOut);
		evo.addObject( "fileName", "FileName");
		evo.addObject( "column_arr", column_arr );
		evo.addObject( "column_header", column_header );
		evo.addObject("comment", "");
		
		return new ModelAndView( "ExcelView", evo );
	}
	
	@RequestMapping(value="/report/PrintDailyStatistic.do")
	public ModelAndView PrintDailyStatistic(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> listSub = new ArrayList<Map<String, Object>>();
		String statisType = req.getParameter("LIID");
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String hasPayed = req.getParameter("HAS_PAYED");
		String content = req.getParameter("CONTENT");
		
		String arrangeTime = "";
		System.out.println("statisType = "+statisType+ " STARTDATE = "+startDateParam+" / endDate = "+endDateParam);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("STARTDATE", startDateParam);
		map.put("ENDDATE", endDateParam);
		
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
		HashMap<String, Object> countObj = roomSrvcService.getCountSaledSrvc(map);
		HashMap<String, Object> countTurn = roomTurnService.getTotalStatisticCount(map);
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			String timeEnd = "";
			String timeStart = "";
			HashMap<String, Object> vo = listOut.get(i);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			mapVo.put("ItemName", vo.get("SRVC_NM"));
			mapVo.put("ItemCode", vo.get("SRVC_CD"));
			mapVo.put("ItemNote", vo.get(""));
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemType", "1");
			mapVo.put("ItemAmount", vo.get("TOTAL"));
			mapVo.put("ItemUnit", vo.get("PRICE"));
			mapVo.put("ItemTotal", vo.get("TOTAL_MONEY"));
			al.add(mapVo);
		}
		for(int i=0; i< 10; i++){
			Map<String, Object> mapTmp = new HashMap<String, Object>();
			mapTmp.put("ItemCode", i+"");
			mapTmp.put("ItemName", i+"");
			listSub.add(mapTmp);
		}
		Double debitValue = 0.0;
		try{
			debitValue = (Double) countObj.get("total") - (Double)countTurn.get("payed");
			System.out.println("debitValue = "+debitValue);
		}
		catch(Exception e){
			
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "paramDate",content);
		mapRpt.put( "ParamProfit",(countObj !=null)?countObj.get("total"): null);
		mapRpt.put( "ParamDebit", debitValue);
		mapRpt.put( "ParamPayed", (countTurn != null)?countTurn.get("payed"):null);
		mapRpt.put( "ParamTurnNo",(countTurn != null)?countTurn.get("COUNT"):null);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("idDailyReport", mapRpt);
	}
	@RequestMapping(value="/report/ThongKeChiTiet.do")
	public ModelAndView ThongKeChiTiet(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String isSaleStr = req.getParameter("SALE");
		String srvcID = req.getParameter("SRVC_ID");
		String userName = req.getParameter("USER_NAME");
		String isDeliver = req.getParameter("IS_DELIVERED");
		
		String _title = "";
		boolean isSale = false;
		if(isSaleStr != null && isSaleStr.equalsIgnoreCase("1")){
			_title = PropertyUtil.getStringUTF8("RPT_TITLE_SALE");
			isSale = true;
		}else{
			_title = PropertyUtil.getStringUTF8("RPT_TITLE_IMPRT");
		}
		
		String subtitle = "";
		if(startDateParam!= null){
			subtitle = "("+startDateParam.substring(8, 10)
			+"/"+startDateParam.substring(5, 7)
			+"/"+startDateParam.substring(0, 4);
		}
		if(endDateParam != null){
			subtitle = subtitle +" - "+ endDateParam.substring(8, 10)
			+ "/"+endDateParam.substring(5, 7)
			+ "/"+endDateParam.substring(0, 4)+")";
		}
		
		HashMap<String, String> map = new HashMap<String, String>();
		
		map.put("RESTAR_ID", restarId);
		if(startDateParam != null && !startDateParam.isEmpty()) map.put("STARTDATE", startDateParam);
		if(endDateParam != null && !endDateParam.isEmpty()) map.put("ENDDATE", endDateParam);
		if(userName != null && !userName.isEmpty()) map.put("USER_NAME", userName);
		if(isDeliver != null && isDeliver.equalsIgnoreCase("1"))map.put("IS_DELIVERED", "1");
		
		if(srvcID!= null && !srvcID.isEmpty()){
			map.put("SRVC_ID", srvcID);
		}
		//CodeVO mVo = new CodeVO();
		//mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		//List<CodeVO> listCode = codeService.getListCodeVO(mVo);
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		List<HashMap<String, Object>> listOut = null;
		if(isSale)
			listOut = roomSrvcService.getThongKeBanHang(map);
		else listOut = importService.getThongKeNhapHangPaging(map);
				
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = listOut.get(i);
			HashMap<String, Object> mapVo = new HashMap<String, Object>();
			/*
			 * if(Vo.get("UNIT")!= null){ for(CodeVO coMap : listCode){
			 * if(Vo.get("UNIT").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			 * mapVo.put("ItemUnit", coMap.getCD_NM()); break; } } }
			 */
			if(Vo.get("UNIT")!= null && !Vo.get("UNIT").toString().isEmpty()){
				String unitNm = cmmCdUserService.getUnitNameFromList(Vo.get("UNIT").toString(), listDonVi, mapDonVi);
				mapVo.put("ItemUnit", unitNm);
		    }
			mapVo.put("ItemName", Vo.get("SRVC_NM"));
			mapVo.put("ItemCode", Vo.get("SRVC_CD"));
			mapVo.put("CREATE_DATE", Vo.get("CREATE_DATE"));
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemType", "1");
			mapVo.put("ItemAmount", Vo.get("TOTAL"));
			mapVo.put("ItemTotal", Vo.get("TOTAL_MONEY"));
			if(userName != null && !userName.isEmpty()) mapVo.put("ItemUserName", userName);
			al.add(mapVo);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile",subtitle);
		mapRpt.put( "paramTitle",_title);
		mapRpt.put( "format", "pdf");
		return new ModelAndView("rptThongKeChiTiet", mapRpt);
	}
	@RequestMapping(value="/report/barcode.do")
	public ModelAndView printBarcode(HttpServletRequest req, @RequestParam(value="SRVC_ID", required=true)String SRVC_ID, String type, String list,
			Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setSRVC_ID(SRVC_ID);
		sVo.setIS_USED(1);
		SrvcVO tmpVO = srvcService.getSrvcVO(sVo);
		
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
			
		Double value = 0.0;
		if(tmpVO.getPRICE()!= null && !tmpVO.getPRICE().isEmpty()) 
			value =	Double.parseDouble(tmpVO.getPRICE());
		int rowTotal = 1;
		if(list!=null&&!list.isEmpty())  rowTotal = 1;
		for(int i=0; i < rowTotal; i++) {
			Map<String, Object> tmpMap = new HashMap<String, Object>(); 
			tmpMap.put("FieldBarcode",tmpVO.getSRVC_CD());
			tmpMap.put("GiaBan", value);
			tmpMap.put("FieldGhiChu",tmpVO.getSRVC_NM());
			al.add(tmpMap);
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		String viewName = "rptBarcode";
		if(type != null && type.equalsIgnoreCase("pdf")) {
			mapRpt.put( "format", "pdf");
			if(list!=null&&!list.isEmpty() && list.equalsIgnoreCase("3")) viewName = "rptBarcode3";
			else if(list!=null&&!list.isEmpty()) viewName = "rptBarcodeList";
			else viewName = "rptBarcode";
		}
		else {
			mapRpt.put( "format", "docx");
			if(list!=null&&!list.isEmpty() && list.equalsIgnoreCase("3")) viewName = "rptBarcode3Doc";
			else if(list!=null&&!list.isEmpty()) viewName = "rptBarcodeListDoc";
			else viewName = "rptBarcodeDoc";
		}
		mapRpt.put("filename", tmpVO.getSRVC_CD());
		return new ModelAndView(viewName, mapRpt);
	}

}
