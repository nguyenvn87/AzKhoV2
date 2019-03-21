package com.kito.madina.srvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

@Controller
public class MenuController {
	
	@Resource(name = "menuService")
	private MenuService menuService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@RequestMapping(value = "/saveMenu.json", method = RequestMethod.POST)
	public ModelAndView saveMenu(HttpServletRequest req, MenuVO vo) {
		
		//String loginUser = SessionUtil.getSessionAttribute("loginUser").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		System.out.println("Save room");
		
		if(vo.getMENU_ID() == null || vo.getMENU_ID().isEmpty()){
			vo.setMENU_ID(CmmUtil.getGUID());
			vo.setRESTAR_ID(restarId);
			menuService.CreateMenuVO(vo);
		}
		else{
			menuService.UpdateMenuVO(vo);
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/getListMenu.json", method = RequestMethod.GET)
	public ModelAndView getListMenu(HttpServletRequest req) {
		
		String stsActive = req.getParameter("ACTIVE_STS");
		boolean isAdmin = true;
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		MenuVO rVo = new MenuVO();
		JsonVO jvon = new JsonVO();
		
		if(stsActive != null && stsActive.equalsIgnoreCase("true")){
			isAdmin = true;
		}
		else isAdmin = false;
		
		rVo.setRESTAR_ID(restarId);		
		SrvcVO sVo = new SrvcVO();
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		//List<MenuVO> list = menuService.getListMenuVoByMenuVO(rVo);
		List<HashMap<String, Object>> list = srvcService.listImportReport(sVo);
		
		/*List<MenuVO> listOut = new ArrayList<MenuVO>();
		System.out.println(list.size());
		if(isAdmin == false){
			for (MenuVO vo : list) {
				if(vo.getACTIVE() == 1){
					listOut.add(vo);
				}
			}
			jvon.setData(listOut);
		}
		else jvon.setData(list);*/
		
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/getListPagingMenu.json", method = RequestMethod.GET)
	public ModelAndView getListPagingMenu(HttpServletRequest req, MenuVO vo) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		JsonVO jvon = new JsonVO();
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		vo.setRESTAR_ID(loginRestautant);
		
		List<MenuVO> list = menuService.getPagingListMenu(vo);
		HashMap<String, Object> mapResult = menuService.getMenuListCount(vo);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/getSearchListMenu.json", method = RequestMethod.GET)
	public ModelAndView getSearchListMenu(HttpServletRequest req, SrvcVO vo) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String query = req.getParameter("query");
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
		vo.setIS_SERVICE(-1);
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
		return new ModelAndView("jsonView", jvon);
	}
}
