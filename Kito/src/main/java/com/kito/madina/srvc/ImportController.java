package com.kito.madina.srvc;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.kito.madina.cmmn.excel.ExcelVO;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;

@Controller
public class ImportController {
	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;
	
	@Resource(name = "importService")
	private ImportService importService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@RequestMapping(value = "/store/getListImport.json", method = RequestMethod.GET)
	public ModelAndView getListImport(ImportVO vo) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		///List<ImportVO> importVOs = importService.getImportVoByObject(vo);
		JsonVO jvon = new JsonVO();
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		vo.setRESTAR_ID(loginRestautant);
		
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		map.put("RESTAR_ID", vo.getRESTAR_ID());
		
		List<ImportVO> list = importService.getImportPaging(map);
		HashMap<String, Object> mapResult = importService.getImportCount(map);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		
		jvon.setData(list);
		jvon.addObject("SumObj", mapResult);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping(value = "/store/getDetailFromImportVO.json")
	public ModelAndView getDetailFromImportVO(ImportVO vo){
		JsonVO jvon = new JsonVO();
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		List<ImportDetailVO> list = importService.getDetailFromImportVO(vo);
		for(ImportDetailVO iVo : list){
		
			if(iVo.getUNIT()!= null){
				if(mapDonVi.get(iVo.getUNIT())!= null){}
				else{
			    	for(CodeVO coMap : listDonVi){
			    		if(iVo.getUNIT().toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(iVo.getUNIT().toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			iVo.setUNIT_NM(mapDonVi.get(iVo.getUNIT()));
		}
		
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/store/countImport.json")
	public ModelAndView countImport(ImportVO vo) {
		JsonVO jvon = new JsonVO();
		jvon.setData(importService.countImport(vo));
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/store/saveImport.json")
	public ModelAndView saveImport(HttpServletRequest request){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		java.util.Date dateStr= new java.util.Date();
		String importJson = request.getParameter("importVO");
		String importDetailJson = request.getParameter("importDetailVO");
		ImportVO importVO = new Gson().fromJson(importJson, ImportVO.class);
		
		if(importVO.getIMPRT_CD() > 0){
			UserVO uVo = new UserVO();
			uVo.setUSERNAME(loginUserID);
		}
		Timestamp eDate = new Timestamp(dateStr.getTime());
		try{
			String changeDate = importVO.getDATE_IMPORT();
			String tmpDate = changeDate.substring(0, 4)+""+changeDate.substring(5, 7)+""+changeDate.substring(8, 10);
			int _year = Integer.parseInt(changeDate.substring(0, 4));
			int _month = Integer.parseInt(changeDate.substring(5, 7));
			int _date = Integer.parseInt(changeDate.substring(8, 10));
			dateStr.setYear(_year - 1900);
			dateStr.setMonth(_month-1);
			dateStr.setDate(_date);
			eDate = new Timestamp(dateStr.getTime());
		}catch(Exception e){}
		
		List<ImportDetailVO> importDetailVOs = new Gson().fromJson(importDetailJson,new TypeToken<List<ImportDetailVO>>(){}.getType());
		importVO.setUSER_NAME(loginUserID);
		importVO.setRESTAR_ID(loginRestautant);
		
		int importcd = importVO.getIMPRT_CD();
		if (importcd == 0){ // Add
			importVO.setDATE_IMPORT(eDate.toString());
			importcd = importService.addImport(importVO);
		} else {
			importService.updateImport(importVO);
			ImportDetailVO tempVO = new ImportDetailVO();
			tempVO.setIMPRT_CD(importVO.getIMPRT_CD());
			
			List<ImportDetailVO> listInStore = importService.getDetailFromImportVO(importVO);
			
			for(ImportDetailVO dbVO : listInStore){
				boolean isOK = false;
				for(ImportDetailVO newVO : importDetailVOs){
					if(dbVO.getSRVC_ID().equalsIgnoreCase(newVO.getSRVC_ID()))
						isOK = true;
				}
				if(!isOK) importService.deleteImportDetailVOByID(dbVO);
			}
		}
		for(ImportDetailVO detailVO : importDetailVOs){
			detailVO.setIMPRT_CD(importcd);
			detailVO.setRESTAR_ID(loginRestautant);
			if(detailVO.getID_DETAIL() != null && !detailVO.getID_DETAIL().isEmpty())
				importService.updateImportDetail(detailVO);
			else importService.addImportDetail(detailVO);
		}
		
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping(value = "/store/getThongKeNhapHang.json")
	public ModelAndView getThongKeNhapHang(HttpServletRequest request, ImportDetailVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String startDate = request.getParameter("STARTDATE");
		String endDate = request.getParameter("ENDDATE");
		JsonVO jvon = new JsonVO();
		HashMap<String, String> map = new HashMap<String, String>();
		if(vo.getLimit() != null && !vo.getLimit().isEmpty()){
			int	limit 	=  Integer.parseInt(vo.getLimit()); 
			int	page 	=  Integer.parseInt(vo.getPage());
			int min = (page - 1) * limit;
			int max = ((page - 1) * limit)+limit;
			map.put("MIN", min+"") ;
			map.put("MAX", max+"");
		}
		map.put("RESTAR_ID", loginRestautant);
		if(vo.getSRVC_ID()!= null && !vo.getSRVC_ID().isEmpty()){
			map.put("SRVC_ID", vo.getSRVC_ID());
		}
		if(startDate != null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate != null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		
		List<HashMap<String, Object>> list = importService.getThongKeNhapHangPaging(map);
		HashMap<String, Object> mapResult = importService.getThongKeNhapHangCount(map);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.addObject("SumObj", mapResult);
		jvon.setData(list);
		jvon.setTotalCount(totalCount);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * Delete bill of import
	 * 
	 * */
	/*@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping(value = "/store/removeImport.json")
	public ModelAndView removeImport(ImportVO vo) {
		importService.deleteImport(vo);
		ImportDetailVO tempVO = new ImportDetailVO();
		tempVO.setIMPRT_CD(vo.getIMPRT_CD());
		importService.deleteImportDetailByImportID(tempVO);
		
		JsonVO jvon = new JsonVO();
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}*/
	/*@PreAuthorize("hasAnyRole('ROLE_ADMIN')")*/
	@RequestMapping(value = "/store/removeImport.json")
	public ModelAndView removeImport(ImportVO vo) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		List<ImportDetailVO> listDel = importService.getDetailFromImportVO(vo);
		try{
			for(ImportDetailVO iVo : listDel){
				String srvcId = iVo.getSRVC_ID();
				float amount = Float.parseFloat(iVo.getAMOUNT());
				if(amount > 0){
					SrvcVO sVo = new SrvcVO();
					sVo.setRESTAR_ID(loginRestautant);
					sVo.setIS_USED(1);
					sVo.setSRVC_ID(srvcId);
					srvcService.popOutStore(sVo, amount);
				}
			}
			importService.deleteImport(vo);
			
			// Delete import detail
			ImportDetailVO tempVO = new ImportDetailVO();
			tempVO.setIMPRT_CD(vo.getIMPRT_CD());
			importService.deleteImportDetailByImportID(tempVO);
		}catch(Exception e){
			jvon.setMessage("Error !");
		}
		
		
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * params: IMPRT_CD
	 * */
	/*@PreAuthorize("hasAnyRole('ROLE_ADMIN')")*/
	@RequestMapping(value = "/store/deleteImportBill.json")
	public ModelAndView deleteImportBill(ImportVO vo) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		List<ImportDetailVO> listDel = importService.getDetailFromImportVO(vo);
		try{
			for(ImportDetailVO iVo : listDel){
				String srvcId = iVo.getSRVC_ID();
				float amount = Float.parseFloat(iVo.getAMOUNT());
				if(amount > 0){
					SrvcVO sVo = new SrvcVO();
					sVo.setRESTAR_ID(loginRestautant);
					sVo.setIS_USED(1);
					sVo.setSRVC_ID(srvcId);
					srvcService.popOutStore(sVo, amount);
				}
			}
			importService.deleteImport(vo);
		}catch(Exception e){
			jvon.setMessage("Error !");
		}
		jvon.setData(true);
		jvon.setMessage("OK");
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	// Export data of status store
	@RequestMapping(value = "/store/Excel/ChiTietNhapHang.do")
	public ModelAndView ChiTietDonHang(HttpSession session, HttpServletRequest req) throws Exception {

			String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
			List<Map<String, Object>> al = new ArrayList<Map<String, Object>>();
			String importCd = req.getParameter("IMPRT_CD");
			String filename = (req.getParameter("FILENAME")!= null && !req.getParameter("FILENAME").isEmpty())?req.getParameter("FILENAME"):"NhapHang";
			String title = req.getParameter("title");
			
			ExcelVO evo = null;
				
			if(importCd!=null && !importCd.isEmpty()){
				
				ImportVO imVo = new ImportVO();
				imVo.setIMPRT_CD(Integer.parseInt(importCd));
				imVo.setRESTAR_ID(restarId);
				CodeVO mVo = new CodeVO();
				mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
				List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
				
				HashMap<String, String> mapDonVi = new HashMap<String, String>();
				
				List<ImportDetailVO> list = importService.getDetailFromImportVO(imVo);
				for(ImportDetailVO iVo : list){
				
					if(iVo.getUNIT()!= null){
						if(mapDonVi.get(iVo.getUNIT())!= null){}
						else{
					    	for(CodeVO coMap : listDonVi){
					    		if(iVo.getUNIT().toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
					    			mapDonVi.put(iVo.getUNIT().toString(), coMap.getCD_NM());
					    			break;
					    		}
					    	}
						}
				    }
					iVo.setUNIT_NM(mapDonVi.get(iVo.getUNIT()));
				}
				
				int iCount = 0;
				for(ImportDetailVO rVo : list){
					iCount++;
					String price = rVo.getIMPRT_PRICE()!=null&&!rVo.getIMPRT_PRICE().isEmpty()?rVo.getIMPRT_PRICE():"0";
					float fPrice = Float.parseFloat(price);
					Double soluong = Double.parseDouble(rVo.getAMOUNT()+"");
					Double total = fPrice*soluong;
					Map<String, Object> mapTmp = new HashMap<String, Object>();
					mapTmp.put("STT", iCount);
					mapTmp.put("SRVC_NM", rVo.getSRVC_NAME());
					mapTmp.put("SL", soluong);
					mapTmp.put("PRICE", fPrice);
					mapTmp.put("SUM_MONEY", total);
					mapTmp.put("UNIT_NM", rVo.getUNIT_NM());
					al.add(mapTmp);
				}
			}	
			// Header info
			String[] column_arr = {"STT","SRVC_NM","SL","UNIT_NM", "PRICE","SUM_MONEY"};
			String[] column_header = new String[column_arr.length];
			for (int i = 0; i < column_arr.length; i++) {
				String str = PropertyUtil.getStringUTF8(column_arr[i]);
				String newValue = column_arr[i];
				if (str != null) newValue = str;
				column_header[i] = newValue;
			}
			// Export to file
			evo = new ExcelVO(al);
			evo.addObject("fileName", filename);
			evo.addObject("title", title);
			evo.addObject("column_arr", column_arr);
			evo.addObject("column_header", column_header);
			evo.addObject("comment", "");

			return new ModelAndView("BillTemplateExcelView", evo);
	}
}
