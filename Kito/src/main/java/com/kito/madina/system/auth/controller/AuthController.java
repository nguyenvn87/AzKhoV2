package com.kito.madina.system.auth.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.reflect.TypeToken;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.system.auth.service.AuthService;
import com.kito.madina.system.auth.vo.RoleGroupVO;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.TreeVO;
import com.kito.madina.test.vo.UserVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.MessageUtil;

@Controller
public class AuthController {
	
	@Resource(name = "authService")
	private AuthService authService;
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@RequestMapping(value = "/system/auth/getlist.json", method = RequestMethod.GET)
	public ModelAndView getlistRoleGroupVO(HttpServletRequest req, RoleGroupVO vo) {
		
				JsonVO jvon = new JsonVO();
				List<RoleGroupVO> _list = authService.getListRoleGroupVO(vo);
				jvon.setData(_list);
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
	/*@RequestMapping(value="/ladm/system/auth/role/tree.json")
	public  ModelAndView roleTree(TreeVO vo,  Map map)
	{		
		List<Object> data = authService.getRoleTreeList( vo);		
		JsonVO jvo = new JsonVO( true, null);		
		jvo.setData(data); 
		return new ModelAndView( "jsonView", jvo);
	}*/
	@RequestMapping(value="/system/auth/menu/tree.json")
	public  ModelAndView menuTree(TreeVO vo,  Map map)
	{		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		RestaurantVO rvo = restaurantService.getRestaurantVOByID(restarId);
		int haveRoom = codeService.getHaveRoomInRestaurant(restarId, rvo.getRESTAR_TYPE());
		if(haveRoom == 1){
			vo.setFOR_ROOM(haveRoom);
			vo.setFOR_SALE(-1);
		}
		else {
			vo.setFOR_ROOM(-1);
			vo.setFOR_SALE(1);
		}
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(loginUser);
		UserVO chkUvo = userService.getUserVo(uVo);
		vo.setRESTAR_ID(restarId);
		List<HashMap<String, Object>> _list = authService.getMenuTreeList( vo);		
		List<HashMap<String, Object>> data = new ArrayList<HashMap<String,Object>>();
		
		for(int i=0; i < _list.size(); i++){
			HashMap<String, Object> _map = _list.get(i);
			_map.put("ICONCLS", _map.get("iconcls"));
			_map.put("NODETYPE", _map.get("nodetype"));
			_map.put("TEXT", _map.get("text"));
			_map.put("ID", _map.get("ID"));
			_map.put("LEAF", false);
			_map.put("CHECKED", _map.get("checked"));
			_map.put("EXPANDED", false);
			_map.put("INFO", "icon-lop-group");
			_map.put("LEAF_COUNT", i);	
			data.add(_map);
		}
		JsonVO jvo = new JsonVO( true, null);		
		jvo.setData(data); 
		return new ModelAndView( "jsonView", jvo);
	}
	@RequestMapping(value="/system/auth/changeall.json", method = RequestMethod.POST)
	public ModelAndView allChange(HttpServletRequest req, String menu, String act){
		
		JsonVO jvo = new JsonVO(true, null);
		
		if(menu.equals("none") || menu.equals("null") || menu==null || menu.length()<=4) menu = null;
		//if(act.equals("none") || act.equals("null") || act==null || act.length()<=4) act = null;
		
		if(menu==null 
				//&& act==null
				) {
			
			jvo.setSuccess(false);
			jvo.setMessage(com.kito.madina.cmmn.util.MessageUtil .getMessage("common.msg.update.ok"));
			
			return new ModelAndView("jsonView", jvo);
		}
		
		int result = 0;
		
		try{
			// 1. auth_menu
			RoleGroupVO[] menuVo = null;
			if( menu!=null) {
				menuVo = parseJsonToRoleGroupVO(menu);
			}
			// 2. auth_role
			RoleGroupVO[] roleVo = null;
			if(act!=null) {
				//roleVo = parseJsonToRoleGroupVO(act);
			}
			// 3. update data
			result = authService.allChange(menuVo, roleVo);
			result = 1;
		}catch( Exception e)
		{
			//jvo.setSuccess(false);
			//jvo.setMessage(MessageUtil.getMessage("common.msg.error"));	
			//e.printStackTrace();
			
			
			//return new ModelAndView("jsonView", jvo);
		}
		
		if(result > 0){
			jvo.setSuccess(true);
			jvo.setMessage(MessageUtil.getMessage("common.msg.update.ok"));	
		}
		else{
			jvo.setSuccess(false);
			jvo.setMessage(MessageUtil.getMessage("common.msg.error"));
		}				
		return new ModelAndView("jsonView", jvo);
	}
	public RoleGroupVO[] parseJsonToRoleGroupVO(String jsonParam){
		
		String jsonValue =  jsonParam.replaceAll("&quot;", "\"");
		
		// check null data
		if(jsonValue.equals("null") || jsonValue==null || jsonValue.length()<=0) return null;
		
		ArrayList<HashMap<String, String>> voList = (ArrayList<HashMap<String, String>>) CmmUtil.jsonToObject(jsonValue, new TypeToken<ArrayList<HashMap<String,String>>>(){}.getType());
		//HashMap [] mapValue = (HashMap[]) voList.toArray(new HashMap[voList.size()]);
		RoleGroupVO[] rtnVo = new RoleGroupVO[voList.size()];

		for(int i=0; i<voList.size(); i++) {
			HashMap m = (HashMap) voList.get(i);
			rtnVo[i] = new RoleGroupVO();
			
			if(m.containsKey("MENU_ID")) {
				rtnVo[i].setMENU_ID((String) m.get("MENU_ID"));
			}
			if(m.containsKey("ROLE_ID")) {
				rtnVo[i].setROLE_ID((String) m.get("ROLE_ID"));
			}
			rtnVo[i].setUSE_YN(((String) m.get("USE_YN")).equals("true")?"Y":"N");
			rtnVo[i].setROLEGROUP_ID((String) m.get("ROLEGROUP_ID"));
		}
		
		return rtnVo;
	}
}
