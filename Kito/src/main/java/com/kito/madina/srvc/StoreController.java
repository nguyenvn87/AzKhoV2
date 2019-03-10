package com.kito.madina.srvc;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.excel.ExcelVO;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.UserVO;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
public class StoreController {
	
	@Resource(name = "storeSrvcService")
	private StoreSrvcService storeSrvcService;
	
	@Resource(name = "importService")
	private ImportService importService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@RequestMapping("/store/main.do")
	public String applycation(Locale locale, Model model) {
		
		return "/store/storeImport";
	}
	@RequestMapping(value="/store/getListStoreSrvc.json", method = RequestMethod.GET)
	public ModelAndView getListStoreSrvc(HttpServletRequest req, StoreSrvcVO vo) {
		
		JsonVO jvon = new JsonVO();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();

		//StoreSrvcVO vo = new StoreSrvcVO();
		//List<StoreSrvcVO> list = storeSrvcService.getListStoreSrvcVOByVO(vo);
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setRESTAR_ID(restarId);
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		List<StoreSrvcVO> list = storeSrvcService.getPagingListStoreSrvc(vo);
		
		CmmCdUserVO cmmVo = new CmmCdUserVO();
		cmmVo.setGROUP_CD(UtilConst.GROUP_HANG);
		cmmVo.setRESTAR_ID(restarId);
		cmmVo.setUSE_YN("Y");
		List<CmmCdUserVO> listGrp = cmmCdUserService.getListCmmCdUserVO(cmmVo);
		
		try{
			for(StoreSrvcVO tmpVo : list){
				if(tmpVo.getTYPE() != null){
					boolean isNotHaveGroup = false;
					for(CmmCdUserVO groupVo : listGrp){
						//if(Integer.toString(groupVo.getCD()).equalsIgnoreCase(tmpVo.getTYPE().trim())){
						if(groupVo.getCD().equalsIgnoreCase(tmpVo.getTYPE().trim())){
							tmpVo.setTYPE_NM(groupVo.getCD_NM());
							isNotHaveGroup = true;
						}
					}
					if(!isNotHaveGroup){
						tmpVo.setTYPE_NM(UtilConst.GROUP_NONE);
					}
				}
			}
		}
		catch(Exception e){
			
		}
		
		HashMap<String, Object> mapResult = storeSrvcService.getStoregetListCount(vo);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/store/saveStore.json")
	public ModelAndView saveStore(HttpServletRequest req) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String srvcId = req.getParameter("SRVC_ID");
		String unit = req.getParameter("UNIT");
		String total = req.getParameter("TOTAL_NO");
		
		float totalAmount = Float.parseFloat(total);
		boolean isSuccess = true;
		
		StoreSrvcVO vo = new StoreSrvcVO();
		vo.setSRVC_ID(srvcId);
		vo.setUNIT(unit);
		vo.setTOTAL_NO(totalAmount);
		vo.setUSERNAME(loginUser);
		vo.setSTORE_ID("KARAO");
		vo.setRESTAR_ID(loginRestautant);
		
		storeSrvcService.updateStoreSrvcVo(vo);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		JsonVO jvon = new JsonVO();
		jvon.setData(map);
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/store/updateRestaurant.json", method = RequestMethod.POST)
	public ModelAndView updateRestaurant(RestaurantVO vo) {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		int i = restaurantService.updateRestaurantVO(vo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/store/getRestaurantInfo.json", method = RequestMethod.GET)
	public ModelAndView getRestaurantInfo(HttpServletRequest req, String RESTAR_ID) {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		RestaurantVO vo = restaurantService.getRestaurantVOByID(loginRestautant);
		
		jvon.setSuccess(true);
		jvon.setData(vo);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/store/updateSettingRestaurant.json", method = RequestMethod.POST)
	public ModelAndView updateSettingRestaurant(RestaurantVO vo) {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		RestaurantVO voCk = restaurantService.getRestaurantVOByID(loginRestautant);
		
		if(vo.getEXPIRED_DATE()!= null && !vo.getEXPIRED_DATE().isEmpty())
			voCk.setEXPIRED_DATE(vo.getEXPIRED_DATE());
		if(vo.getRESTAR_TYPE()!= null && !vo.getRESTAR_TYPE().isEmpty())
			voCk.setRESTAR_TYPE(vo.getRESTAR_TYPE());
		
		int i = restaurantService.updateRestaurantVO(voCk);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	public List<SrvcVO> getListHistoryData(String datetime){
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		List<SrvcVO> listResult = new ArrayList<SrvcVO>();
		
		SrvcVO vo1 = new SrvcVO();
		vo1.setRESTAR_ID(loginRestautant);
		vo1.setIS_USED(1);
		List<SrvcVO> listAll = srvcService.getSrvcVOBySrvcVo(vo1);
				
		for(SrvcVO VO: listAll){
			String id = VO.getSRVC_ID();
			
			SrvcVO tmpVo = new SrvcVO();
			tmpVo.setRESTAR_ID(loginRestautant);
			tmpVo.setHIS_CHANGE_TIME(datetime);
			tmpVo.setSRVC_ID(id);
			List<SrvcVO> list = srvcService.getSrvcHistoryByDate(tmpVo);
			
			if(list != null && list.size() > 0){
				listResult.add(list.get(0));
			}
			else{
				boolean isExist = srvcService.checkExistInHistoryStore(id, listResult);
				if(!isExist){
					if(VO.getCHANGE_DATE()!= null){					
						try {
							String dateStr1 = VO.getCHANGE_DATE();
							DateFormat f = new SimpleDateFormat("yyyy-MM-dd");
							Date date1 = f.parse(dateStr1);
							
							String dateStr2 = tmpVo.getHIS_CHANGE_TIME();
							DateFormat date = new SimpleDateFormat("yyyy-MM-dd");
							Date date2 = date.parse(dateStr2);
							
							if(date2.compareTo(date1) >= 0){
								listResult.add(VO);
							}							
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		return listResult;
	}
	@RequestMapping(value="/store/getStoreHistory.json", method = RequestMethod.GET)
	public ModelAndView getStoreHistory(HttpServletRequest req, String datetime) {
		
		JsonVO jvon = new JsonVO();
		List<SrvcVO> listResult = this.getListHistoryData(datetime);
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		for (int i = 0; i < listResult.size(); i++) {
			SrvcVO sVo = listResult.get(i);
			if(sVo.getUNIT()!= null && !sVo.getUNIT().isEmpty()){
				if(mapDonVi.get(sVo.getUNIT())!= null){}
				else{
			    	for(CodeVO coMap : listDonVi){
			    		if(sVo.getUNIT().toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(sVo.getUNIT().toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			sVo.setUNIT_NM(mapDonVi.get(sVo.getUNIT()));
		}
		jvon.setSuccess(true);
		jvon.setData(listResult);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/store/tonkhohistory.do")
	public ModelAndView baocaotonkho(HttpServletRequest req, String datetime)
			throws JRException, IOException {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<SrvcVO> listResult = this.getListHistoryData(datetime);
		
		List<HashMap<String, Object>> listSrvc = new ArrayList<HashMap<String,Object>>();
		
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		uVo = userService.getUserVo(uVo);
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();

		for (int i = 0; i < listResult.size(); i++) {
			SrvcVO sVo = listResult.get(i);
			HashMap<String, Object> vo = new HashMap<String, Object>();
			String stt = (i + 1) + "";
			vo.put("STT", stt);
			vo.put("SRVC_CD", sVo.getSRVC_CD());
			vo.put("SRVC_NM", sVo.getSRVC_NM());
			vo.put("UNIT_NM", sVo.getUNIT_NM());
			vo.put("DSCRT", sVo.getDSCRT());
			vo.put("ItemNo", sVo.getSRVC_CD());
			vo.put("AMOUNT_STORE", sVo.getAMOUNT_STORE());
			
			if(sVo.getUNIT()!= null && !sVo.getUNIT().isEmpty()){
				if(mapDonVi.get(sVo.getUNIT())!= null){}
				else{
			    	for(CodeVO coMap : listDonVi){
			    		if(sVo.getUNIT().toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(sVo.getUNIT().toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			vo.put("UNIT_NM", mapDonVi.get(sVo.getUNIT()));
			listSrvc.add(vo);
		}
		JRDataSource ds = new JRBeanCollectionDataSource(listSrvc);
		
		map.put("ParamDate", datetime);
		map.put("ParamSubtile", uVo.getFULLNAME());
		map.put("datasource", ds);
		map.put("format", "pdf");
		return new ModelAndView("baocaotonkhoId", map);
	}
	@RequestMapping(value = "/store/excel/ExcelDataStore.do")
	public ModelAndView ExcelDataStore(HttpServletRequest req, String datetime) throws Exception {

		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		ExcelVO evo = null;
		String fileName = req.getParameter("FILENAME");
		List<HashMap<String, Object>> listSrvc = new ArrayList<HashMap<String,Object>>();
		
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD(UtilConst.GROUP_UNIT);
		List<CodeVO> listDonVi = codeService.getListCodeVO(mVo);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		
		List<SrvcVO> listResult = this.getListHistoryData(datetime);
		for (int i = 0; i < listResult.size(); i++) {
			SrvcVO sVo = listResult.get(i);
			HashMap<String, Object> vo = new HashMap<String, Object>();
			String stt = (i + 1) + "";
			vo.put("STT", stt);
			vo.put("SRVC_CD", sVo.getSRVC_CD());
			vo.put("SRVC_NM", sVo.getSRVC_NM());
			vo.put("UNIT_NM", sVo.getUNIT_NM());
			vo.put("DSCRT", sVo.getDSCRT());
			vo.put("ItemNo", sVo.getSRVC_CD());
			vo.put("AMOUNT_STORE", sVo.getAMOUNT_STORE());
			
			if(sVo.getUNIT()!= null && !sVo.getUNIT().isEmpty()){
				if(mapDonVi.get(sVo.getUNIT())!= null){}
				else{
			    	for(CodeVO coMap : listDonVi){
			    		if(sVo.getUNIT().toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(sVo.getUNIT().toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			vo.put("UNIT_NM", mapDonVi.get(sVo.getUNIT()));
			listSrvc.add(vo);
		}

		String[] column_arr = { "STT", "SRVC_NM", "SRVC_CD", "AMOUNT_STORE", "UNIT_NM", "DSCRT" };
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
		evo = new ExcelVO(listSrvc);
		evo.addObject("fileName", fileName);
		evo.addObject("column_arr", column_arr);
		evo.addObject("column_header", column_header);
		evo.addObject("comment", "");

		return new ModelAndView("ExcelView", evo);
	}
}
