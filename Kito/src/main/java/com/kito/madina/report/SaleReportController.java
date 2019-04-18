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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.DateUtil;
import com.kito.madina.cmmn.util.MessageUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.PaymentMethodService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
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
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.UserVO;
import com.kito.madina.cmmn.excel.ExcelVO;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
public class SaleReportController {

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
	
	@Resource(name = "paymentMethodService")
	private PaymentMethodService paymentMethodService;
	
	protected Log log = LogFactory.getLog(this.getClass());

	@RequestMapping(value = "/report/billRetailPrint.do")
	public ModelAndView billRetailPrint(HttpServletRequest req,
			@RequestParam(value = "LIID", required = false) String liid,
			@RequestParam(value = "CRID", required = false) String crid, Map<String, Object> model)
			throws JRException, IOException {

		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String webAddr = req.getParameter("SUPPLYER");
		String roomUsedId = req.getParameter("LIID");
		String printTyle = req.getParameter("PRINT_TYPE");
		float totalAmount = 0;
		
		CustomerVO cVo = null;

		boolean isA4 = false;
		if (printTyle != null && printTyle.equalsIgnoreCase("1")) {
			isA4 = true;
		} else if (printTyle != null && printTyle.equalsIgnoreCase("0")) {
			isA4 = false;
		}
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		String timeInOut = "";
		List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUsedId);
		RoomTurnVO rtVo = new RoomTurnVO();
		rtVo.setROOM_USED_ID(roomUsedId);
		RoomTurnVO tmpRtVo = roomTurnService.getRoomTurnVOByObject(rtVo);
		
		// Get unit
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(tmpRtVo.getUSER_NAME());
		uVo = userService.getUserVo(uVo);

		// Get date
		try {
			DateFormat f = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			Date d = f.parse(tmpRtVo.getCHANGE_DATE());
			DateFormat date = new SimpleDateFormat("dd/MM/yyyy");
			map.put("ParamDate", date.format(d));
		} catch (Exception e) {
			e.printStackTrace();
		}
		// Get time in/out
		if (tmpRtVo != null && tmpRtVo.getCUS_CD() != null && !tmpRtVo.getCUS_CD().isEmpty()) {

			cVo = new CustomerVO();
			cVo.setCUS_CD(Integer.parseInt(tmpRtVo.getCUS_CD().trim()));
			cVo.setRESTAR_ID(restarId);
			cVo = customerService.getCustomerVOByVo(cVo);
		}

		for (int i = 0; i < listSrvc.size(); i++) {
			RoomSrvcVO vo = listSrvc.get(i);
			String stt = (i + 1) + "";
			double totalMoney = vo.getAMOUNT() * vo.getPRICE();
			String totalM = CmmUtil.formatNumber2Money(totalMoney);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			String unitName = "";
			
			if(vo.getUNIT()!= null && !vo.getUNIT().isEmpty()){
				unitName = cmmCdUserService.getUnitNameFromList(vo.getUNIT(), listDonVi, mapDonVi);
				vo.setUNIT_NM(unitName);
		    }
			if(vo.getUNIT() != null){ 
				totalAmount = totalAmount + vo.getAMOUNT();
			}
			
			mapVo.put("ItemName", vo.getMENU_NM());
			mapVo.put("ItemPrice", CmmUtil.formatNumber2Money(vo.getPRICE()));
			mapVo.put("ItemNo", stt);
			mapVo.put("ItemTotal", totalMoney);
			mapVo.put("ItemUnit", CmmUtil.formatNumber2Money(vo.getAMOUNT()));
			mapVo.put("ItemAmount", unitName);
			
			
			al.add(mapVo);
		}
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUsedId);
		rVo = roomTurnService.getRoomTurnVOByObject(rVo);

		RestaurantVO restaurntVO = restaurantService.getRestaurantVOByID(rVo.getRESTAR_ID());

		if (printTyle == null || printTyle.isEmpty()) {
			if (restaurntVO.getIS_PRINT_BIG() != null && restaurntVO.getIS_PRINT_BIG().trim().equalsIgnoreCase("1")) {
				isA4 = true;
			} else
				isA4 = false;
		}

		JRDataSource ds = new JRBeanCollectionDataSource(al);

		if (restaurntVO.getRESTAR_NM() == null) {
			String str = PropertyUtil.getString("info.restar.name");
			try {
				if (str != null) {
					String newValue = new String(str.getBytes("iso-8859-1"), "UTF-8");
					restaurntVO.setRESTAR_NM(newValue);
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		if (restaurntVO.getADDR() == null) {
			String addr = PropertyUtil.getString("info.restar.addr");
			try {
				if (addr != null) {
					String newValue = new String(addr.getBytes("iso-8859-1"), "UTF-8");
					restaurntVO.setADDR(newValue);
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		map.put("ParamResName", restaurntVO.getBILL_SLOGAN());
		map.put("ParamAddr", restaurntVO.getADDR());
		map.put("ParamPhone", "" + restaurntVO.getBILL_TITLE3());
		map.put("ParamHours", timeInOut);
		map.put("ParamBillCD", (tmpRtVo.getBILL_CD() != null) ? tmpRtVo.getBILL_CD() : "");
		map.put("ParamCusName", (tmpRtVo.getCUS_NM() != null) ? tmpRtVo.getCUS_NM() : PropertyUtil.getStringUTF8("info.bill.customer.name"));
		map.put("ParamCusAddr", (tmpRtVo.getDSCRT() != null) ? tmpRtVo.getDSCRT() : "");
		map.put("ParamCusFone1", (cVo != null && cVo.getPHONE() != null) ? cVo.getPHONE() : "");
		map.put("ParamHours", timeInOut);
		map.put("ParamUser", uVo != null?uVo.getFULLNAME():"");
		map.put("ParameterWebAddr", (webAddr != null) ? webAddr : "");
		map.put("ParamTotal", CmmUtil.formatNumber2Money(totalAmount));
		String billTitle = (restaurntVO.getBILL_TITLE()!= null)?restaurntVO.getBILL_TITLE():PropertyUtil.getStringUTF8("info.restar.title");
		map.put("paramMainTitle", billTitle);
		map.put("paramTitle2", restaurntVO.getADDR2()!=null?restaurntVO.getADDR2():"");
		
		map.put("paramButtom1", restaurntVO.getBILL_BOTTOM1()!=null?restaurntVO.getBILL_BOTTOM1():"");
		map.put("paramButtom2", restaurntVO.getBILL_BOTTOM2()!=null?restaurntVO.getBILL_BOTTOM2():"");
		map.put("paramButtom3", restaurntVO.getBILL_BOTTOM3()!=null?restaurntVO.getBILL_BOTTOM3():"");
		map.put("paramCusPayed", tmpRtVo.getPAYED_MONEY());
		map.put("paramDiscount", tmpRtVo.getDISCOUNT());
		
		Number remain = tmpRtVo.getTOTAL_MONEY() - tmpRtVo.getPAYED_MONEY();
		map.put("paramCusRemain", remain);
		String isPrintPayment = restaurntVO.getIS_PRINT_PAYMENT()==1?"1":"";
		String isPrintPayMethod = restaurntVO.getIS_PRINT_PAYMETHOD()==1?"1":"";
		map.put("paramPayPrint", isPrintPayment);
		map.put("paramPayMethodPrint", isPrintPayMethod);
		map.put("paramPayLabel1", restaurntVO.getBILL_LABEL_PAYED1()!= null&&!restaurntVO.getBILL_LABEL_PAYED1().isEmpty()? restaurntVO.getBILL_LABEL_PAYED1():PropertyUtil.getStringUTF8("info.bill.customer.payed"));
		map.put("paramPayLabel2", restaurntVO.getBILL_LABEL_PAYED2()!= null? restaurntVO.getBILL_LABEL_PAYED2():PropertyUtil.getStringUTF8("info.bill.customer.remain"));
		
		String txtInfo = MessageUtil.getMessage("common.sys.azkho.info");
		map.put("paramAzKhoInfo", txtInfo);
		
		HashMap<String, String> mapMethod = paymentMethodService.getPaymentMethodSumaryTurnId(roomUsedId);
		if(mapMethod !=null){
			if(mapMethod.get("METHOD")!=null)map.put("paramPayMethod",mapMethod.get("METHOD"));
			if(mapMethod.get("BANK_ID")!=null)map.put("paramPayBankID",mapMethod.get("BANK_ID"));
			if(mapMethod.get("BANK_NM")!=null)map.put("paramPayBankNM",mapMethod.get("BANK_NM"));
		}
		map.put("datasource", ds);
		map.put("format", "pdf");
		
		// Print bill
		String strPrintParam = "billRetailPrintId";
		if(tmpRtVo.getIS_RETURN() == 1) {
			strPrintParam = "billTraHangId";
		}
		else {
			strPrintParam = "billRetailPrintId";
			if (isA4) {
				strPrintParam = "billA4PrintRetailId";
			}
		}
		return new ModelAndView(strPrintParam, map);
	}

	@RequestMapping(value = "/saleReport/calculateProfit.do")
	public ModelAndView calculateProfit(HttpServletRequest req,
			@RequestParam(value = "LIID", required = false) String liid,
			@RequestParam(value = "CRID", required = false) String crid, Map<String, Object> model)
			throws JRException, IOException {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String userName = req.getParameter("USER_NAME");
		String isOder = req.getParameter("IS_ORDER");
		String isCanceled = req.getParameter("IS_CANCELED");
		String isDelivered = req.getParameter("IS_DELIVERED");
		String isDebit = req.getParameter("DEBIT");
		String isReturn = req.getParameter("IS_RETURN");

		String statisType = req.getParameter("LIID");
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String arrangeTime = "";
		System.out.println(
				"statisType = " + statisType + " STARTDATE = " + startDateParam + " / endDate = " + endDateParam);

		HashMap<String, Object> map = new HashMap<String, Object>();

		java.util.Date dateCrr = new java.util.Date();
		java.util.Date dateStr = new java.util.Date();

		dateStr.setHours(0);
		dateStr.setMinutes(0);
		dateStr.setSeconds(0);

		if (statisType != null && statisType.equalsIgnoreCase("DAY")) {
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		} else if (statisType != null && statisType.equalsIgnoreCase("WEEK")) {
			int abc = dateStr.getDate();
			if (abc > 1) {
				dateStr.setDate(abc - 1);
			} else {
				dateStr.setDate(0);
			}
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		} else if (statisType != null && statisType.equalsIgnoreCase("MONTH")) {
			dateStr.setDate(1);
			Timestamp sDate = new Timestamp(dateStr.getTime());
			Timestamp eDate = new Timestamp(dateCrr.getTime());
			map.put("STARTDATE", sDate.toString());
			map.put("ENDDATE", eDate.toString());
		} else {
			map.put("STARTDATE", startDateParam);
			map.put("ENDDATE", endDateParam);
		}
		if (isOder != null && isOder.equalsIgnoreCase("1"))
			map.put("IS_ORDER", 1);
		if (isCanceled != null && isCanceled.equalsIgnoreCase("1"))
			map.put("IS_CANCELED", 1);
		if (isCanceled != null && isCanceled.equalsIgnoreCase("0"))
			map.put("IS_CANCELED", 0);
		if (isDelivered != null && isDelivered.equalsIgnoreCase("1"))
			map.put("IS_DELIVERED", 1);
		if (isDelivered != null && isDelivered.equalsIgnoreCase("0"))
			map.put("IS_DELIVERED", 0);
		if (isReturn != null && isReturn.equalsIgnoreCase("1")) map.put("IS_RETURN", 1);
		else map.put("IS_RETURN", 0);
		
		if (isDebit != null && isDebit.equals("true")) map.put("IS_DEBIT", 1);
		if(userName != null && !userName.isEmpty()) map.put("USER_NAME", userName);
		
		map.put("RESTAR_ID", restarId);

		// Style for date

		System.out.println("STARTDATE = " + map.get("STARTDATE"));
		String startDate = "";
		String endDate = "";
		if (map.get("STARTDATE") != null && !map.get("STARTDATE").toString().isEmpty()) {

			startDate = map.get("STARTDATE").toString();

			startDate = DateUtil.getVNDateFormatFromString(startDate);
		}
		if (map.get("ENDDATE") != null && !map.get("ENDDATE").toString().isEmpty()) {

			endDate = map.get("ENDDATE").toString();

			endDate = DateUtil.getVNDateFormatFromString(endDate);
		}
		System.out.println(startDate + " / " + endDate);
		List<RoomTurnVO> listTurnVo = roomTurnService.getListTurnStatistic(map);

		Map<String, Object> mapRpt = new HashMap<String, Object>();
		Map<String, Object> mapdate = new HashMap<String, Object>();
		String ItemDateToDate = null;
		if(startDate.equalsIgnoreCase(endDate)){
			ItemDateToDate = "(" +startDate+ ")";
		}
		else ItemDateToDate = "(" + startDate + " -> " + endDate + ")";
		mapdate.put("ItemDateToDate", ItemDateToDate);
		double totalMoney = 0;
		for (int i = 0; i < listTurnVo.size(); i++) {
			int j = i + 1;
			String timeEnd = "";
			String timeStart = "";
			RoomTurnVO vo = listTurnVo.get(i);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			if (vo.getTIME_END() != null) {
				timeEnd = vo.getTIME_END().split(" ")[0];
			}
			if (vo.getTIME_STS() != null) {
				timeStart = vo.getTIME_STS().split(" ")[0];
			}
			totalMoney = totalMoney + vo.getTOTAL_MONEY();
			mapVo.put("ItemDate", vo.getCHANGE_DATE());
			mapVo.put("ItemRoom", (vo.getBILL_CD() != null) ? vo.getBILL_CD() : "");
			mapVo.put("ItemNote", vo.getDSCRT());
			mapVo.put("ItemCusNm", vo.getCUS_NM());
			mapVo.put("ItemNo", "" + j);
			mapVo.put("ItemStartTime", timeStart + " -> " + timeEnd);
			mapVo.put("ItemTotal", vo.getTOTAL_MONEY());
			mapVo.put("ItemPayed", vo.getPAYED_MONEY());
			al.add(mapVo);
		}
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put("datasource", ds);
		mapRpt.put("paramDate", ItemDateToDate);
		mapRpt.put("paramTotal", totalMoney);
		
		if(userName != null && !userName.isEmpty()){
			UserVO uVo = new UserVO();
			uVo.setRESTAR_ID(restarId);
			uVo.setUSERNAME(userName);
			uVo = userService.getUserVo(uVo);
			String userNameStr = uVo!=null?uVo.getFULLNAME():userName;
			String salerName = PropertyUtil.getStringUTF8("info.bill.customer.saler");
			mapRpt.put("paramUser", salerName + ": "+userNameStr);
		}
		mapRpt.put("format", "pdf");
		return new ModelAndView("profitPrintIdRetail", mapRpt);
	}

	@RequestMapping(value = "/saleReport/getPagingStatistic.json", method = RequestMethod.GET)
	public ModelAndView getPagingStatistic(HttpServletRequest req, RoomTurnVO vo) {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String isDebit = req.getParameter("DEBIT");
		String isDelivered = req.getParameter("IS_DELIVERED");
		String isCanceled = req.getParameter("IS_CANCELED");
		String payMethod = req.getParameter("PAY_METHOD");
		String bankId = req.getParameter("ID_BANK");
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");

		HashMap<String, Object> map = new HashMap<String, Object>();

		if (isDebit != null && isDebit.equals("true")) {
			map.put("IS_DEBIT", 1);
		}
		if (isDelivered != null) {
			if (isDelivered.equals("1"))
				map.put("IS_DELIVERED", 1);
			if (isDelivered.equals("0"))
				map.put("IS_DELIVERED", 0);
		}
		if (isCanceled != null) {
			if (isCanceled != null && isCanceled.equals("1"))
				map.put("IS_CANCELED", 1);
			if (isCanceled.equals("0"))
				map.put("IS_CANCELED", 0);
		}
		if (payMethod != null) {
			if (payMethod.equalsIgnoreCase("ALL")) {

			} else if (payMethod.equalsIgnoreCase("CASH")) {
				map.put("PAY_METHOD", "CASH1");
			} else if (payMethod.equalsIgnoreCase("EBANK")) {
				map.put("PAY_METHOD", "EBANK");
				if (bankId != null && !bankId.isEmpty())
					map.put("ID_BANK", bankId);
			}
		}

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
		List<RoomTurnVO> listTurnVo = roomTurnService.getListPagingTurnStatistic(map);
		HashMap<String, Object> mapResult = roomTurnService.getTotalStatisticCount(map);
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

	// Export data of status store
	@RequestMapping(value = "/report/excel/ExcelDataStore.do")
	public ModelAndView ExcelDataStore(HttpSession session, HttpServletRequest req) throws Exception {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		ExcelVO evo = null;
		String fileName = req.getParameter("FILENAME");

		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		if(sVo.getSort()==null||sVo.getSort().isEmpty())sVo.setSort("AMOUNT_STORE");
		List<HashMap<String, Object>> list = srvcService.listImportReport(sVo);
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		for(int i=0; i< list.size();i++){
			HashMap<String, Object> map = list.get(i);
			map.put("TT", i+1);
			
			// Set unit name
			if(map.get("UNIT")!= null && !map.get("UNIT").toString().isEmpty()){
				String unitNm = codeService.getUnitNameFromList(map.get("UNIT").toString(), listDonVi, mapDonVi);
				map.put("UNIT_NM", unitNm);
		    }
		}

		String[] column_arr = { "TT", "SRVC_NM", "SRVC_CD", "AMOUNT_STORE", "UNIT_NM", "DSCRT" };
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
		evo = new ExcelVO(list);
		evo.addObject("fileName", fileName);
		evo.addObject("column_arr", column_arr);
		evo.addObject("column_header", column_header);
		evo.addObject("comment", "");

		return new ModelAndView("ExcelView", evo);
	}

	// Export data of status store
	@RequestMapping(value = "/report/excel/ExcelStatisticStore.do")
	public ModelAndView ExcelStatisticStore(HttpSession session, HttpServletRequest req) throws Exception {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		ExcelVO evo = null;
		String fileName = req.getParameter("FILENAME");
		String groupNameDefault = PropertyUtil.getStringUTF8("srvc.name.other"); 
		String isService = req.getParameter("IS_SERVICE");
		
		int iService = (isService!=null&&isService.equalsIgnoreCase("1"))?1:0;
		
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		sVo.setSort("TYPE_NM");
		sVo.setIS_SERVICE(iService);
		
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		
		List<HashMap<String, Object>> list = srvcService.listImportReport(sVo);
		int count = 0;
		for(HashMap<String, Object> map : list){
			count++;
			if(map.get("PRICE") != null){
				float fPrice = Float.parseFloat(map.get("PRICE").toString());
				map.put("PRICE", fPrice);
			}
			if(map.get("PRICE_IMPORT") != null){
				double fPrice = Double.parseDouble(map.get("PRICE_IMPORT").toString());
				map.put("PRICE_IMPORT", fPrice);
			}
			if(map.get("TYPE_NM")==null || map.get("TYPE_NM").toString().isEmpty()) {
				map.put("TYPE_NM", groupNameDefault);
			}
			map.put("STT", count);
	
			// Set unit name
			if(map.get("UNIT")!= null && !map.get("UNIT").toString().isEmpty()){
				String unitNm = cmmCdUserService.getUnitNameFromList(map.get("UNIT").toString().trim(), listDonVi, mapDonVi);
				map.put("UNIT_NM", unitNm);
		    }
		}

		String[] column_arr = {"STT", "SRVC_NM", "SRVC_CD","UNIT_NM","PRICE","PRICE_IMPORT","DSCRT","TYPE_NM"};
		String[] column_header = new String[column_arr.length];
		for (int i = 0; i < column_arr.length; i++) {
			String str = PropertyUtil.getStringUTF8(column_arr[i]);
			String newValue = column_arr[i];
			if (str != null)
				newValue = str;
			column_header[i] = newValue;
		}
		evo = new ExcelVO(list);
		evo.addObject("fileName", fileName);
		evo.addObject("column_arr", column_arr);
		evo.addObject("column_header", column_header);
		evo.addObject("comment", "");

		return new ModelAndView("ExcelView", evo);
	}
	@RequestMapping(value = "/saleReport/baocaotonkho.do")
	public ModelAndView baocaotonkho(HttpServletRequest req)
			throws JRException, IOException {

		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();

		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		uVo = userService.getUserVo(uVo);

		Map<String, Object> map = new HashMap<String, Object>();
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		sVo.setSort("AMOUNT_STORE");

		List<HashMap<String, Object>> listSrvc = srvcService.listImportReport(sVo);
		//List<HashMap<String, Object>> listSrvc = srvcService.listSrvcTonKho(sVo);
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();

		for (int i = 0; i < listSrvc.size(); i++) {
			HashMap<String, Object> vo = listSrvc.get(i);
			String stt = (i + 1) + "";
			vo.put("STT", stt);
			
			// Set unit name
			if(vo.get("UNIT") != null && !vo.get("UNIT").toString().isEmpty()){
					String unitNm = codeService.getUnitNameFromList(vo.get("UNIT").toString(), listDonVi, mapDonVi);
					vo.put("UNIT_NM",unitNm);
			}
		}

		JRDataSource ds = new JRBeanCollectionDataSource(listSrvc);

		map.put("ParamSubtile", uVo.getFULLNAME());
		map.put("datasource", ds);
		map.put("format", "pdf");
		return new ModelAndView("baocaotonkhoId", map);
	}
	@RequestMapping(value = "/saleReport/baogiabanhang.do")
	public ModelAndView baogiabanhang(HttpServletRequest req)
			throws JRException, IOException {

		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();

		String isService = req.getParameter("IS_SERVICE");
		int iService = 0;
		if(isService != null && isService.equalsIgnoreCase("1")) iService = 1;
		
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		uVo = userService.getUserVo(uVo);
		
		String groupNameDefault = PropertyUtil.getStringUTF8("srvc.name.other"); 

		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		// Group don vi
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		

		Map<String, Object> map = new HashMap<String, Object>();
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		sVo.setIS_SERVICE(iService);
		sVo.setSort("TYPE_NM");
		
		List<HashMap<String, Object>> listSrvc = srvcService.listImportReport(sVo);

		for (int i = 0; i < listSrvc.size(); i++) {
			HashMap<String, Object> vo = listSrvc.get(i);
			String stt = (i + 1) + "";
			vo.put("STT", stt);
			String price = vo.get("PRICE").toString();
			float fPrice = Float.parseFloat(price);
			vo.put("PRICE", CmmUtil.formatNumber2Money(fPrice));
			
			String grouName = vo.get("TYPE_NM")!=null?vo.get("TYPE_NM").toString(): groupNameDefault;
			vo.put("ItemType", grouName);
			
			// Set unit name
			if(vo.get("UNIT") != null && !vo.get("UNIT").toString().isEmpty()){
				//String unitNm = codeService.getUnitNameFromList(vo.get("UNIT").toString(), listDonVi, mapDonVi);
				String unitNm = cmmCdUserService.getUnitNameFromList(vo.get("UNIT").toString(), listDonVi, mapDonVi);
				vo.put("UNIT_NM",unitNm);
		    }
		}

		JRDataSource ds = new JRBeanCollectionDataSource(listSrvc);
		
		map.put("ParamSubtile", uVo.getFULLNAME());
		map.put("datasource", ds);
		map.put("format", "pdf");
		return new ModelAndView("baogiabanhangId", map);
	}
	@RequestMapping(value="/report/PrintSaledProduct.do")
	public ModelAndView PrintSaledProduct(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String userName = req.getParameter("USER_NAME");
		String isDeliver = req.getParameter("IS_DELIVERED");
		String cusCD = req.getParameter("CUS_CD");
		String isReturn = req.getParameter("IS_RETURN");
		
		// Get Username
		UserVO uVo = null;
		if(userName != null && !userName.isEmpty()){
			uVo = new UserVO();
			uVo.setUSERNAME(userName);
			uVo = userService.getUserVo(uVo);
		}
		
		String subtitle = "";
		if(startDateParam!= null){
			subtitle = "("+startDateParam.substring(8, 10) +"/"+startDateParam.substring(5, 7)+"/"+startDateParam.substring(0, 4);
		}
		if(endDateParam != null){
			subtitle = subtitle +" - "+ endDateParam.substring(8, 10)+ "/"+endDateParam.substring(5, 7)+ "/"+endDateParam.substring(0, 4)+")";
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("RESTAR_ID", restarId);
		if(startDateParam != null && !startDateParam.isEmpty()) map.put("STARTDATE", startDateParam);
		if(endDateParam != null && !endDateParam.isEmpty()) map.put("ENDDATE", endDateParam);
		if(userName != null && !userName.isEmpty())map.put("USER_NAME", userName);
		if(isDeliver != null && isDeliver.equalsIgnoreCase("1"))map.put("IS_DELIVERED", "1");
		if(cusCD != null && !cusCD.isEmpty())map.put("CUS_CD", cusCD);
		if(isReturn != null && !isReturn.isEmpty() && isReturn.equalsIgnoreCase("1")) map.put("IS_RETURN", 1);
		else map.put("IS_RETURN", 0);
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
		
		//CodeVO mVo = new CodeVO();
		//mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		//List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		
		Map<String, Object> mapRpt = new HashMap<String, Object>();
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		float totalMoney = 0;
		for(int i=0; i< listOut.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = listOut.get(i);
			HashMap<String, Object> mapVo = new HashMap<String, Object>();
			String unitNm = "";
			if(Vo.get("UNIT")!= null){
				/*
				 * if(mapDonVi.get(Vo.get("UNIT"))!= null){} else{ for(CodeVO coMap :
				 * listDonVi){
				 * if(Vo.get("UNIT").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
				 * mapDonVi.put(Vo.get("UNIT").toString(), coMap.getCD_NM()); break; } } }
				 */
				unitNm = cmmCdUserService.getUnitNameFromList(Vo.get("UNIT").toString(), listDonVi, mapDonVi);
				mapVo.put("ItemUnit", unitNm);
				//tmpVo.setUNIT_NM(unitNm);
		    }
			
			if(Vo.get("AMOUNT") != null){
				String sumValue = CmmUtil.formatNumber2Money(Float.parseFloat(Vo.get("AMOUNT").toString()));
				mapVo.put("ItemNumber", sumValue);
			}
			if(Vo.get("TOTAL") != null){
				mapVo.put("ItemTotal", Float.parseFloat(Vo.get("TOTAL").toString()));
			}
			if(Vo.get("AMOUNT") != null){
				mapVo.put("ItemAmount", Float.parseFloat(Vo.get("AMOUNT").toString()));
			}
			
			mapVo.put("ItemName", Vo.get("SRVC_NM"));
			mapVo.put("ItemCode", Vo.get("SRVC_CD"));
			mapVo.put("ItemNote", Vo.get(""));
			mapVo.put("ItemNo", ""+j);
			mapVo.put("ItemType", "1");
			//mapVo.put("ItemUnit", mapDonVi.get(Vo.get("UNIT")));
			if(uVo != null && !uVo.getFULLNAME().isEmpty()) mapVo.put("itemUserName", uVo.getFULLNAME());
			
			al.add(mapVo);
		}
		// Customer info
		CustomerVO cVo = new CustomerVO();
		if(cusCD != null && !cusCD.isEmpty()){
			try{
				cVo.setCUS_CD(Integer.parseInt(cusCD));
				cVo.setRESTAR_ID(restarId);
				cVo = customerService.getCustomerVOByVo(cVo);
				mapRpt.put( "ParamCustomName",cVo.getNAME());
				mapRpt.put( "ParamCustomFone",cVo.getPHONE());
			}catch(Exception e){
				
			}
		}
		
		System.out.println("totalMoney = "+totalMoney);
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		mapRpt.put( "datasource", ds);
		mapRpt.put( "ParamSubtile",subtitle);
		
		mapRpt.put( "format", "pdf");
		return new ModelAndView("idListSrvcSaled", mapRpt);
	}
	@RequestMapping(value = "/report/viewHistoryBillPdf.do")
	public ModelAndView viewHistoryBillPdf(HttpServletRequest req,
			@RequestParam(value = "LIID", required = false) String liid,
			@RequestParam(value = "CRID", required = false) String crid, Map<String, Object> model)
			throws JRException, IOException {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String webAddr = req.getParameter("SUPPLYER");
		String roomUsedId = req.getParameter("LIID");
		String printTyle = req.getParameter("PRINT_TYPE");
		float totalAmount = 0;
		
		CustomerVO cVo = null;

		boolean isA4 = false;
		if (printTyle != null && printTyle.equalsIgnoreCase("1")) {
			isA4 = true;
		} else if (printTyle != null && printTyle.equalsIgnoreCase("0")) {
			isA4 = false;
		}
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		String timeInOut = "";
		List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcHistoryVOByID(roomUsedId);
		RoomTurnVO rtVo = new RoomTurnVO();
		rtVo.setROOM_USED_ID(roomUsedId);
		RoomTurnVO tmpRtVo = roomTurnService.getRoomTurnHistoryVOByObject(rtVo);
		
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(tmpRtVo.getUSER_NAME());
		uVo = userService.getUserVo(uVo);

		// Get date
		try {
			DateFormat f = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			Date d = f.parse(tmpRtVo.getCHANGE_DATE());
			DateFormat date = new SimpleDateFormat("dd/MM/yyyy");
			map.put("ParamDate", date.format(d));
		} catch (Exception e) {
			e.printStackTrace();
		}
		// Get time in/out
		if (tmpRtVo != null && tmpRtVo.getCUS_CD() != null && !tmpRtVo.getCUS_CD().isEmpty()) {

			cVo = new CustomerVO();
			cVo.setCUS_CD(Integer.parseInt(tmpRtVo.getCUS_CD().trim()));
			cVo.setRESTAR_ID(restarId);
			cVo = customerService.getCustomerVOByVo(cVo);
		}

		for (int i = 0; i < listSrvc.size(); i++) {
			RoomSrvcVO vo = listSrvc.get(i);
			String stt = (i + 1) + "";
			double totalMoney = vo.getAMOUNT() * vo.getPRICE();
			String totalM = CmmUtil.formatNumber2Money(totalMoney);
			Map<String, Object> mapVo = new HashMap<String, Object>();
			String unitName = "";
			if(vo.getUNIT_NM() != null){ 
				unitName = vo.getUNIT_NM();
				totalAmount = totalAmount + vo.getAMOUNT();
			}
			mapVo.put("ItemName", vo.getMENU_NM());
			mapVo.put("ItemPrice", CmmUtil.formatNumber2Money(vo.getPRICE()));
			mapVo.put("ItemNo", stt);
			mapVo.put("ItemTotal", totalMoney);
			mapVo.put("ItemUnit", CmmUtil.formatNumber2Money(vo.getAMOUNT()));
			mapVo.put("ItemAmount", unitName);
			
			
			al.add(mapVo);
		}
		RoomTurnVO rVo = new RoomTurnVO();
		rVo.setROOM_USED_ID(roomUsedId);
		rVo = roomTurnService.getRoomTurnHistoryVOByObject(rVo);

		RestaurantVO restaurntVO = restaurantService.getRestaurantVOByID(rVo.getRESTAR_ID());

		if (printTyle == null || printTyle.isEmpty()) {
			if (restaurntVO.getIS_PRINT_BIG() != null && restaurntVO.getIS_PRINT_BIG().trim().equalsIgnoreCase("1")) {
				isA4 = true;
			} else
				isA4 = false;
		}

		JRDataSource ds = new JRBeanCollectionDataSource(al);

		if (restaurntVO.getRESTAR_NM() == null) {
			String str = PropertyUtil.getString("info.restar.name");
			try {
				if (str != null) {
					String newValue = new String(str.getBytes("iso-8859-1"), "UTF-8");
					restaurntVO.setRESTAR_NM(newValue);
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		if (restaurntVO.getADDR() == null) {
			String addr = PropertyUtil.getString("info.restar.addr");
			try {
				if (addr != null) {
					String newValue = new String(addr.getBytes("iso-8859-1"), "UTF-8");
					restaurntVO.setADDR(newValue);
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		map.put("ParamResName", restaurntVO.getBILL_SLOGAN());
		map.put("ParamAddr", restaurntVO.getADDR());
		map.put("ParamPhone", "" + restaurntVO.getBILL_TITLE3());
		map.put("ParamHours", timeInOut);
		map.put("ParamBillCD", (tmpRtVo.getBILL_CD() != null) ? tmpRtVo.getBILL_CD() : "");
		map.put("ParamCusName", (tmpRtVo.getCUS_NM() != null) ? tmpRtVo.getCUS_NM() : PropertyUtil.getStringUTF8("info.bill.customer.name"));
		map.put("ParamCusAddr", (tmpRtVo.getDSCRT() != null) ? tmpRtVo.getDSCRT() : "");
		map.put("ParamCusFone1", (cVo != null && cVo.getPHONE() != null) ? cVo.getPHONE() : "");
		map.put("ParamHours", timeInOut);
		map.put("ParamUser", uVo != null?uVo.getFULLNAME():"");
		map.put("ParameterWebAddr", (webAddr != null) ? webAddr : "");
		map.put("ParamTotal", CmmUtil.formatNumber2Money(totalAmount));
		String billTitle = (restaurntVO.getBILL_TITLE()!= null)?restaurntVO.getBILL_TITLE():PropertyUtil.getStringUTF8("info.restar.title");
		map.put("paramMainTitle", billTitle);
		map.put("paramTitle2", restaurntVO.getADDR2()!=null?restaurntVO.getADDR2():"");
		
		map.put("paramButtom1", restaurntVO.getBILL_BOTTOM1()!=null?restaurntVO.getBILL_BOTTOM1():"");
		map.put("paramButtom2", restaurntVO.getBILL_BOTTOM2()!=null?restaurntVO.getBILL_BOTTOM2():"");
		map.put("paramButtom3", restaurntVO.getBILL_BOTTOM3()!=null?restaurntVO.getBILL_BOTTOM3():"");
		map.put("paramCusPayed", tmpRtVo.getPAYED_MONEY());
		Number remain = tmpRtVo.getTOTAL_MONEY() - tmpRtVo.getPAYED_MONEY();
		map.put("paramCusRemain", remain);
		String isPrintPayment = restaurntVO.getIS_PRINT_PAYMENT()==1?"1":"";
		String isPrintPayMethod = restaurntVO.getIS_PRINT_PAYMETHOD()==1?"1":"";
		map.put("paramPayPrint", isPrintPayment);
		map.put("paramPayMethodPrint", isPrintPayMethod);
		map.put("paramPayLabel1", restaurntVO.getBILL_LABEL_PAYED1()!= null? restaurntVO.getBILL_LABEL_PAYED1():PropertyUtil.getStringUTF8("info.bill.customer.payed"));
		map.put("paramPayLabel2", restaurntVO.getBILL_LABEL_PAYED2()!= null? restaurntVO.getBILL_LABEL_PAYED2():PropertyUtil.getStringUTF8("info.bill.customer.remain"));
		
		map.put("datasource", ds);
		map.put("format", "pdf");
		String strPrintParam = "billRetailPrintId";
		if (isA4) {
			strPrintParam = "billA4PrintRetailId";
		}
		return new ModelAndView(strPrintParam, map);
	}
	// Export data of status store
	@RequestMapping(value = "/saleReport/excel/DanhSachDonHang.do")
	public ModelAndView DanhSachDonHang(HttpSession session, HttpServletRequest req) throws Exception {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		ExcelVO evo = null;
		String fileName = req.getParameter("FILENAME");
		List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();		
			
		String userName = req.getParameter("USER_NAME");
		String isOder = req.getParameter("IS_ORDER");
		String isCanceled = req.getParameter("IS_CANCELED");
		String isDelivered = req.getParameter("IS_DELIVERED");
		String isDebit = req.getParameter("DEBIT");
		String hasPayed = req.getParameter("HAS_PAYED");
		String startDateParam = req.getParameter("STARTDATE");
		String endDateParam = req.getParameter("ENDDATE");
		String isReturn = req.getParameter("IS_RETURN");
			
		HashMap<String, Object> map = new HashMap<String, Object>();
			
		if (isOder != null && isOder.equalsIgnoreCase("1")) map.put("IS_ORDER", 1);
		if (isCanceled != null && isCanceled.equalsIgnoreCase("1")) map.put("IS_CANCELED", 1);
		if (isCanceled != null && isCanceled.equalsIgnoreCase("0")) map.put("IS_CANCELED", 0);
		if (isDelivered != null && isDelivered.equalsIgnoreCase("1")) map.put("IS_DELIVERED", 1);
		if (isDelivered != null && isDelivered.equalsIgnoreCase("0")) map.put("IS_DELIVERED", 0);
		if (isDebit != null && isDebit.equals("true")) map.put("IS_DEBIT", 1);
		if (startDateParam != null && !startDateParam.isEmpty()) map.put("STARTDATE", startDateParam);
		if (endDateParam != null && !endDateParam.isEmpty()) map.put("ENDDATE", endDateParam);
		if (hasPayed != null && hasPayed.equalsIgnoreCase("1")) map.put("HAS_PAYED", 1);
		if (hasPayed != null && hasPayed.equalsIgnoreCase("0")) map.put("HAS_PAYED", 0);
		if (userName != null && !userName.isEmpty()) map.put("USER_NAME", userName);
		if(isReturn != null && !isReturn.isEmpty() && isReturn.equalsIgnoreCase("1")) map.put("IS_RETURN", 1);
		else map.put("IS_RETURN", 0);
		
		map.put("RESTAR_ID", restarId);
			
		List<RoomTurnVO> listTurnVo = roomTurnService.getListTurnStatistic(map);
		DecimalFormat decimalFormat = new DecimalFormat("###.#");
		for (int i = 0; i < listTurnVo.size(); i++) {
			RoomTurnVO rVo = listTurnVo.get(i);
			int j = i+1;
			HashMap<String, Object> tmpMap = new HashMap<String, Object>();
			tmpMap.put("STT", j);
			//tmpMap.put("CHANGE_DATE", rVo.getCHANGE_DATE().split(" ")[0]);
			tmpMap.put("CHANGE_DATE", rVo.getCHANGE_DATE()!=null?rVo.getCHANGE_DATE().split(" ")[0]:null);
			tmpMap.put("BILL_CD", rVo.getBILL_CD());
			tmpMap.put("CUS_NM", rVo.getCUS_NM());
			tmpMap.put("DSCRT", rVo.getDSCRT());
			String strTotal =  decimalFormat.format(rVo.getTOTAL_MONEY());
			String strPayed =  decimalFormat.format(rVo.getPAYED_MONEY());
			tmpMap.put("TOTAL_MONEY", Double.parseDouble(strTotal));
			tmpMap.put("PAYED_MONEY", Double.parseDouble(strPayed));
			al.add(tmpMap);
		}

		String[] column_arr = {"STT","CHANGE_DATE","BILL_CD","TOTAL_MONEY","PAYED_MONEY","CUS_NM","DSCRT"};
		String[] column_header = new String[column_arr.length];
		for (int i = 0; i < column_arr.length; i++) {
			String str = PropertyUtil.getStringUTF8(column_arr[i]);
			String newValue = column_arr[i];
			if (str != null) newValue = str;
			column_header[i] = newValue;
		}
				
		evo = new ExcelVO(al);
		evo.addObject("fileName", fileName);
		evo.addObject("column_arr", column_arr);
		evo.addObject("column_header", column_header);
		evo.addObject("comment", "");

		return new ModelAndView("BillLisExcelView", evo);
	}
	// Export data of status store
	@RequestMapping(value = "/saleReport/excel/ChiTietDonHang.do")
	public ModelAndView ChiTietDonHang(HttpSession session, HttpServletRequest req) throws Exception {

			String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
			ExcelVO evo = null;
			String fileName = req.getParameter("FILENAME");
			String title = req.getParameter("title");
			String roomUsedId = req.getParameter("ROOM_USED_ID");
			
			String webAddr = req.getParameter("SUPPLYER");
			
			CustomerVO cVo = null;
			
			List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
			List<RoomSrvcVO> listSrvc = roomSrvcService.getListRoomSrvcVOByID(roomUsedId);
			RoomTurnVO rtVo = new RoomTurnVO();
			rtVo.setROOM_USED_ID(roomUsedId);
			RoomTurnVO tmpRtVo = roomTurnService.getRoomTurnVOByObject(rtVo);
			
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(tmpRtVo.getUSER_NAME());
			uVo = userService.getUserVo(uVo);

			String[] column_arr = {"STT","SRVC_NM","SL","UNIT_NM", "PRICE","SUM_MONEY"};
			String[] column_header = new String[column_arr.length];
			for (int i = 0; i < column_arr.length; i++) {
				String str = PropertyUtil.getStringUTF8(column_arr[i]);
				String newValue = column_arr[i];
				if (str != null) newValue = str;
				column_header[i] = newValue;
			}
			int iCount = 0;
			for(RoomSrvcVO rVo : listSrvc){
				iCount++;
				float price = Float.parseFloat(rVo.getPRICE()+"");
				Double total = 0.0;
				Map<String, Object> mapTmp = new HashMap<String, Object>();
				mapTmp.put("STT", iCount);
				mapTmp.put("SRVC_NM", rVo.getMENU_NM());
				mapTmp.put("SL", Double.parseDouble(rVo.getAMOUNT()+""));
				mapTmp.put("PRICE", price);
				total = rVo.getAMOUNT() * rVo.getPRICE();
				mapTmp.put("SUM_MONEY", total);
				mapTmp.put("PAYED_MONEY", total);
				mapTmp.put("UNIT_NM", rVo.getUNIT_NM());
				al.add(mapTmp);
			}
					
			evo = new ExcelVO(al);
			evo.addObject("fileName", fileName);
			evo.addObject("title", title);
			evo.addObject("column_arr", column_arr);
			evo.addObject("column_header", column_header);
			evo.addObject("comment", "");

			return new ModelAndView("BillTemplateExcelView", evo);
		}
}
