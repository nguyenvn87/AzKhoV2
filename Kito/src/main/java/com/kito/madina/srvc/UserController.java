package com.kito.madina.srvc;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.session.service.SessionService;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;

@Controller
public class UserController {
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "roomService")
	private RoomService roomService;
	
	@Autowired
	private SessionService sessionService;
	
	public static String ROLE_ADMIN = "ROLE_ADMIN";
	public static String ROLE_USER = "ROLE_USER";
	public static String ROLE_MANAGER = "ROLE_MANAGER";
	
	@RequestMapping(value = "/saveUserVo.json", method = RequestMethod.POST)
	public ModelAndView saveMenu(HttpServletRequest req, UserVO vo) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		boolean isSuccess = false;
		String messageNotify = "";
		System.out.println("Save room");
		UserVO checkVo = userService.getUserVo(vo);
	
		if(vo.getSTATUS().trim().equalsIgnoreCase("true")){
			
			if(checkVo == null){
				String passwd = CmmUtil.MD5Hash(vo.getCMND());
				vo.setPASSWORD(passwd);
				vo.setENABLED("0");
				vo.setRESTAR_ID(restarId);
				System.out.println("passwd = "+passwd);
				userService.createUserVo(vo);
				isSuccess = true;
			}
			else{
				isSuccess = false;
				messageNotify = PropertyUtil.getString("notify.user.exist");
				try {
					messageNotify = new String(messageNotify.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		else{
			userService.updateUserVO(vo);
			isSuccess = true;
		}
		JsonVO jvon = new JsonVO();
		jvon.setMessage(messageNotify);
		jvon.setSuccess(isSuccess);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/adm/admUser.do")
	public String admUser(Locale locale, Model model, HttpServletRequest req) {
		
		return "/adm/admUser";
	}
	@RequestMapping("/getListUser.json")
	public ModelAndView getListUser(Locale locale, Model model, HttpServletRequest req, UserVO rVo) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();		
		rVo.setRESTAR_ID(loginRestautant);	
		
		int	limit 	=  Integer.parseInt(rVo.getLimit()); 
		int	page 	=  Integer.parseInt(rVo.getPage());
		
		rVo.setMIN((page - 1) * limit);
		rVo.setMAX(((page - 1) * limit)+limit);
		rVo.setRESTAR_ID(loginRestautant);
		
		List<UserVO> list = userService.getPagingListUser(rVo);
		HashMap<String, Object> mapResult = userService.getUserListCount(rVo);
		int totalCount = 0;
		if(mapResult != null && mapResult.get("COUNT") != null){
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}

		JsonVO jvon = new JsonVO();
		jvon.setData(list);
		jvon.setSuccess(true);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/user/manager.do")
	public String manager(Locale locale, Model model, HttpServletRequest req) {
		
		
		return "/adm/manager";
	}
	@RequestMapping(value = "/403.do", method = RequestMethod.GET)
	public ModelAndView accessDenied(Principal user){
		return new ModelAndView("403");
	}
	@RequestMapping(value = "/saveUserAuthority.json", method = RequestMethod.POST)
	public ModelAndView saveUserAuthority(HttpServletRequest req, UserVO vo) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		System.out.println("saveUserAuthority");
		String restarId = "RES1234";
		UserVO checkVo = userService.getUserVo(vo);
		
		if(checkVo.getAuthority() == null || checkVo.getAuthority().isEmpty()){ 
			userService.createUserRight(vo);
		}
		else{
			userService.updateUserRight(vo);
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/updateUserPasswd.json", method = RequestMethod.POST)
	public ModelAndView updateUserPasswd(HttpServletRequest req, UserVO vo) {
		
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		System.out.println("Save room");
		//UserVO checkVo = userService.getUserVo(vo);
		//if(vo.getSTATUS().trim().equalsIgnoreCase("true")){
			String passwd = CmmUtil.MD5Hash(vo.getPASSWORD());
			vo.setPASSWORD(passwd);
			vo.setRESTAR_ID(restarId);
		
			userService.updateUserVO(vo);
		//}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping("/deleteUserVo.json")
	public ModelAndView deleteUserVo(Locale locale, Model model, HttpServletRequest req, UserVO rVo){
		
		if(rVo.getAuthority() != null && !rVo.getAuthority().equalsIgnoreCase("ROLE_ADMIN")){
			userService.deleteUserVo(rVo);
		}
		JsonVO jvon = new JsonVO();
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	
	@RequestMapping(value = "/system/user/register",method = RequestMethod.POST)
	public @ResponseBody JsonVO registerUser(@RequestBody UserVO rVo){
		
		System.out.println("register: " + rVo.getPASSWORD());
		JsonVO jvon = new JsonVO();
		
		if(rVo.getCMND() != null) {
			rVo.setRESTAR_TYPE(rVo.getCMND());
			rVo.setCMND(null);
		}
		// 1. Check existing of account
		UserVO ckUser = new UserVO();
		ckUser.setUSERNAME(rVo.getUSERNAME());
		UserVO checkVo = userService.getUserVo(ckUser);
		if(checkVo != null){
			jvon.setSuccess(false);
			jvon.setMessage("Exist");
			return jvon;
		}
		// 2. Create account restaurant
		String _restaurantId = restaurantService.createAccount(rVo);
		
		// 3. Create account member
		rVo.setRESTAR_ID(_restaurantId);
		String passwd = CmmUtil.MD5Hash(rVo.getPASSWORD());
		rVo.setPASSWORD(passwd);
		int i = userService.createUserVo(rVo);
		
		rVo.setAuthority(ROLE_ADMIN);
		int k = userService.createUserRight(rVo);
		
		// 5. Create default menu
		SessionUtil.setSessionAttribute("loginRestautant", rVo.getRESTAR_ID());
		SessionUtil.setSessionAttribute("loggedUserId", rVo.getUSERNAME());
				
		// Create group default
		//createDefaultData(_restaurantId);
		
		jvon.setSuccess(true);
		return jvon;
	}
	@RequestMapping("/setDefaultInitData.json")
	public ModelAndView setInitData(){
		
		JsonVO jvon = new JsonVO();
		try{
			String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
			createDefaultData(restarId);
		}
		catch(Exception e){
			System.out.println("Error when initing default data !");
		}
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	public void CreateDefaultCmmCd(String groupCd, String _restaurantId, String _restarType){
		
		try{
			
			CodeVO groupVo = new CodeVO();
			groupVo.setGROUP_CD(groupCd);
			groupVo.setUSE_YN("Y");
			groupVo.setRESTAR_TYPE(_restarType);
			
			List<CodeVO> cmmGroupList = codeService.getListCodeVO(groupVo);
			if(cmmGroupList != null && cmmGroupList.size() >0){
				for(int j=0; j < cmmGroupList.size(); j++){
					CodeVO cmmVo = cmmGroupList.get(j);
					CmmCdUserVO sVo = new CmmCdUserVO();
					
					sVo.setRESTAR_ID(_restaurantId);
					sVo.setCD_NM(cmmVo.getCD_NM());
					sVo.setGROUP_NM(cmmVo.getGROUP_NM());
					sVo.setGROUP_CD(groupCd);
					sVo.setUSE_YN("Y");
					cmmCdUserService.createCodeVO(sVo);
				}
			}
		}
		catch(Exception e){
			
		}
	}
	public void createDefaultData(String _restaurantId){
		
		RestaurantVO rVO = restaurantService.getRestaurantVOByID(_restaurantId);
		
		// Create group default
		CreateDefaultCmmCd(UtilConst.GROUP_HANG, _restaurantId, rVO.getRESTAR_TYPE());
		CreateDefaultCmmCd(UtilConst.GROUP_AREA, _restaurantId, rVO.getRESTAR_TYPE());
		srvcService.createDefaultSrvc(UtilConst.GROUP_SRVC, _restaurantId, rVO.getRESTAR_TYPE());
		
		// Create list room default
		CodeVO groupVo = new CodeVO();
		groupVo.setGROUP_CD(UtilConst.GROUP_ROOM);
		groupVo.setUSE_YN("Y");
		groupVo.setRESTAR_TYPE(rVO.getRESTAR_TYPE());
		
		List<CodeVO> cmmGroupList = codeService.getListCodeVO(groupVo);
		if(cmmGroupList != null && cmmGroupList.size() >0){
			for(int j=0; j < cmmGroupList.size(); j++){
				CodeVO cmmVo = cmmGroupList.get(j);
				RoomVO rVo = new RoomVO();
				rVo.setROOM_ID(CmmUtil.getGUID());
				rVo.setIS_USED(1);
				rVo.setROOM_NO(cmmVo.getCD_NM());
				rVo.setRESTAR_ID(_restaurantId);
				roomService.CreateRoomVO(rVo);
			}
		}
		
	}
}
