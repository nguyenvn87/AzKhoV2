package com.kito.madina.srvc;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

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
						if(Integer.toString(groupVo.getCD()).equalsIgnoreCase(tmpVo.getTYPE().trim())){
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
		int i = restaurantService.updateRestaurantVO(vo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
}
