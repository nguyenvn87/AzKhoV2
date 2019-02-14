package com.kito.madina.srvc;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
public class statisticController {
		
	@Resource(name = "importService")
	private ImportService importService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@RequestMapping(value="/sale/getListSaleByDate.json", method = RequestMethod.GET)
	public ModelAndView getListSaleByDate(HttpServletRequest req, SrvcVO vo) {
		
		JsonVO jvon = new JsonVO();
		String userName = req.getParameter("USER_NAME");
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("RESTAR_ID", loginRestautant);
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		map.put("MIN", vo.getMIN()+"");
		map.put("MAX", vo.getMAX()+"");
		if(userName != null && !userName.isEmpty()){
			map.put("USER_NAME", userName);
		}
		if(vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty()){
			map.put("SRVC_ID", vo.getSRVC_ID());
		}
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
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
		
		jvon.setSuccess(true);
		jvon.setData(list);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	public List<HashMap<String, Object>> getListImportExport(HashMap<String, Object> map){
		
		List<HashMap<String, Object>> listImport = importService.getStatisticImport(map);
		// Sale list
		List<HashMap<String, Object>> listOut = roomSrvcService.getStatisticExportStore(map);
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
			tmpMap.put("SRVC_ID", tmpMap.get("srvc_id"));
			if(tmpMap.get("SRVC_ID") != null){
				HashMap<String, Object> iMap = getObjectInList(listImport, "SRVC_ID", tmpMap.get("SRVC_ID").toString());
				
				if(iMap != null){
					tmpMap.put("IAMOUNT", iMap.get("IAMOUNT"));
					tmpMap.put("ITOTAL", iMap.get("TOTAL_MONEY"));
				}
			}
		}
		List<HashMap<String, Object>> listTmp = new ArrayList<HashMap<String,Object>>();
		for(int i=0; i< listImport.size(); i++){
			HashMap<String, Object> tmpMap = listImport.get(i);
			if(tmpMap.get("SRVC_ID") != null && !tmpMap.get("SRVC_ID").toString().isEmpty())
			{
				String srvcId = tmpMap.get("SRVC_ID").toString();
				boolean isExist = false;
				for(int j=0; j< listOut.size(); j++){
					HashMap<String, Object> tmpMap1 = listOut.get(j);
					if(tmpMap1.get("SRVC_ID")!= null) {
						String srvcId1 = tmpMap1.get("SRVC_ID").toString();
						if(srvcId1.equalsIgnoreCase(srvcId)){
							isExist = true;
						}
					}
				}
				if(isExist == false){
					tmpMap.put("IAMOUNT", tmpMap.get("IAMOUNT"));
					tmpMap.put("ITOTAL", tmpMap.get("TOTAL_MONEY"));
					listTmp.add(tmpMap);
				}
			}
		}
		if(listTmp != null && listTmp.size() > 0) listOut.addAll(listTmp);
		
		// Set unit
		for(int i=0; i< listOut.size(); i++){
			int j = i+ 1;
			HashMap<String, Object> tmpMap = listOut.get(i);
			tmpMap.put("ItemNo", j+"");
			tmpMap.put("UNIT_NM", mapDonVi.get(tmpMap.get("UNIT")));
			if(tmpMap.get("PRICE_IMPORT") != null && tmpMap.get("AMOUNT_STORE")!= null){
				double priceImport = Double.parseDouble(tmpMap.get("PRICE_IMPORT").toString());
				double amountInStore = Double.parseDouble(tmpMap.get("AMOUNT_STORE").toString());
				double moneyRemain = priceImport * amountInStore;
				tmpMap.put("MONEY_REMAIN", moneyRemain);
			}
		}
		return listOut;
	}
	@RequestMapping(value="/statistic/ImportExport.json")
	public ModelAndView ImportExport(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, ImportVO vo) throws JRException, IOException {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		
		HashMap<String, Object> iVo = new HashMap<String, Object>();
		iVo.put("RESTAR_ID",restarId);
		if(startDate!= null && !startDate.isEmpty()) iVo.put("STARTDATE", startDate);
		if(endDate!= null && !endDate.isEmpty()) iVo.put("ENDDATE", endDate);
		//iVo.put("MIN", vo.getMIN());
		//iVo.put("MAX", vo.getMAX());
		
		List<HashMap<String, Object>> listOut = getListImportExport(iVo);
		HashMap<String, Object> mapCount = roomSrvcService.getCountSaledSrvc(iVo);
		HashMap<String, Object> mapImport = importService.getImportCount(iVo);
		
		HashMap<String, Object> mapDetailImport = importService.getDetailSrvcCount(iVo);
		int totalCount = Integer.parseInt(mapCount.get("COUNT").toString()) + Integer.parseInt(mapDetailImport.get("COUNT").toString());
		
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		HashMap<String, Object> storeValue = srvcService.getValueInStore(sVo);
		
		mapCount.put("itotal", mapImport.get("total"));
		mapCount.put("totalValue", storeValue.get("totalValue"));
		JsonVO jvon = new JsonVO();
		jvon.setData(listOut);
		jvon.setTotalCount(totalCount);
		jvon.addObject("SumObj", mapCount);
		return new ModelAndView("jsonView", jvon);
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
	@RequestMapping(value="/statistic/importExport.do")
	public ModelAndView preview_issue(HttpServletRequest req, @RequestParam(value="LIID", required=false)String liid, 
			@RequestParam(value="CRID", required=false)String crid, Map<String, Object> model) throws JRException, IOException {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		if(restarId == null || restarId.isEmpty()) return new ModelAndView("rptImportExport", null);
		
		String startDate = req.getParameter("STARTDATE");
		String endDate = req.getParameter("ENDDATE");
		String title= null;
		
		HashMap<String, Object> iVo = new HashMap<String, Object>();
		iVo.put("RESTAR_ID",restarId);
		if(startDate!= null && !startDate.isEmpty()) iVo.put("STARTDATE", startDate);
		if(endDate!= null && !endDate.isEmpty()) iVo.put("ENDDATE", endDate);
		
		// Set title
		if(iVo.get("STARTDATE") != null) title = startDate;
		if(iVo.get("ENDDATE") != null) title = title != null? title+" -> "+ endDate: title;
		// Get data
		List<HashMap<String, Object>> al = getListImportExport(iVo);
		HashMap<String, Object> mapCount = roomSrvcService.getCountSaledSrvc(iVo);
		HashMap<String, Object> mapImport = importService.getImportCount(iVo);
		
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		HashMap<String, Object> storeValue = srvcService.getValueInStore(sVo);
		
		
		mapCount.put("itotal", mapImport.get("total"));
		
		JRDataSource ds = new JRBeanCollectionDataSource(al);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put( "ParamTotal", mapCount.get("total"));
		map.put( "paramITotal", mapCount.get("itotal"));
		Float total = Float.valueOf(mapCount.get("total").toString());
		Float itotal = Float.valueOf(mapCount.get("itotal").toString());
		Number inStore = (Number)storeValue.get("totalValue");
		map.put( "paramInStore", inStore);
		map.put( "paramMainTitle", title);
		map.put( "ParameterWebAddr", "");
		map.put( "datasource", ds);
		map.put( "format", "pdf");
		return new ModelAndView("rptImportExport", map);
	}
}
