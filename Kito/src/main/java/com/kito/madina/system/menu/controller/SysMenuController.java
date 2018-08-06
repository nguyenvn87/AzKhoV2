package com.kito.madina.system.menu.controller;

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
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.SysMenuService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SysMenuVO;
import com.kito.madina.test.vo.UserVO;

@Controller
public class SysMenuController {

	@Resource(name = "sysMenuService")
	private SysMenuService sysMenuService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@RequestMapping(value="/system/menu/menuList.json")
	public ModelAndView getListMenu(HttpServletRequest req) {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String stsActive = req.getParameter("UP_MENU_ID");
		
		RestaurantVO vo = restaurantService.getRestaurantVOByID(restarId);
		int haveRoom = codeService.getHaveRoomInRestaurant(restarId, vo.getRESTAR_TYPE());
		
		SysMenuVO rVo = new SysMenuVO();
		rVo.setUP_MENU_ID(stsActive);
		if(haveRoom == 1){
			rVo.setFOR_ROOM(haveRoom);
			rVo.setFOR_SALE(-1);
		}
		else {
			rVo.setFOR_ROOM(-1);
			rVo.setFOR_SALE(1);
		}
		JsonVO jvon = new JsonVO();
		
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		UserVO chkUvo = userService.getUserVo(uVo);
		
		List<SysMenuVO> list = null;
		if(chkUvo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
			list = sysMenuService.getListSysMenuVoByVO(rVo);
		}
		else {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("UP_MENU_ID", rVo.getUP_MENU_ID());
			map.put("ROLEGROUP_ID", chkUvo.getAuthority());
			map.put("RESTAR_ID", restarId);
			if(haveRoom == 1){
				map.put("FOR_ROOM", 1);
				map.put("FOR_SALE", -1);
			}
			else {
				map.put("FOR_ROOM", -1);
				map.put("FOR_SALE", 1);
			}
			list = sysMenuService.getMainList(map);
		}
		
		
		jvon.setData(list);
		
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/system/menu/getListRestaurants.json")
	public ModelAndView getListRestaurants(RestaurantVO vo) {
				
		JsonVO jvon = new JsonVO();
		int	limit 	=  Integer.parseInt(vo.getLimit()); 
		int	page 	=  Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit)+limit);
		
		List<RestaurantVO> list = restaurantService.getListRestaurantVO(vo);
		for(RestaurantVO tmpVo : list){
			RestaurantVO rVo = restaurantService.getRestaurantLastUseByID(tmpVo.getRESTAR_ID());
			if(rVo != null){
				tmpVo.setCHANGE_DATE(rVo.getCHANGE_DATE());
			}
		}
		HashMap<String, Object> mapResult = restaurantService.getRestaurantListCount(vo);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		jvon.setTotalCount(totalCount);
		jvon.setData(list);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
}
