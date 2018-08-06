package com.kito.madina;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.MD5Endcode;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.PersonService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.UserVO;
import com.sun.xml.internal.bind.v2.runtime.reflect.opt.Const;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	protected PersonService personService;
	
	@Autowired
	protected UserService userService;
	
	@Autowired
	protected SrvcService srvcService;
	
	@Autowired
	protected RoomService roomService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/login/login";
		//return "index";
	}
	@RequestMapping("/dangki.do")
	public ModelAndView testlist(Locale locale, Model model) {
		
		ModelAndView nav = new ModelAndView("/test/bootstrap","model", model);
		return nav;
	}
	@RequestMapping("/karaoke.do")
	public ModelAndView karaoke(Locale locale, Model model) {
		
		ModelAndView nav = new ModelAndView("/introduction/karaoke","model", model);
		return nav;
	}
	@RequestMapping("/banhang.do")
	public ModelAndView banhang(Locale locale, Model model) {
		
		ModelAndView nav = new ModelAndView("/introduction/banhang","model", model);
		return nav;
	}
	@RequestMapping("/introduction.do")
	public ModelAndView introduce(Locale locale, Model model) {
		
		ModelAndView nav = new ModelAndView("/app/page/ADM033","model", model);
		return nav;
	}
	@RequestMapping("/login.json")
	public void login1(Locale locale, HttpServletRequest req, HttpServletResponse rep) throws IOException{
		
		System.out.println("Name = "+req.getParameter("userName")+ " Pass: "+ req.getParameter("pass"));
		String userNM = req.getParameter("userName");
		String passwd = req.getParameter("pass");
		
		
		UserVO userVo = new UserVO();
		userVo.setUSERNAME(userNM);
		String passwdCrypt = MD5Endcode.crypt(passwd);
		System.out.println("passwdCrypt = "+passwdCrypt);
		userVo.setPASSWORD(passwdCrypt);
		
		List<UserVO> listUser = userService.selectUserByUserNM(userVo);		
		if(listUser != null && listUser.size() > 0){
			SessionUtil.setSessionAttribute("loggedUserId", listUser.get(0).getUSERNAME());
			SessionUtil.setSessionAttribute("loginRestautant", listUser.get(0).getRESTAR_ID());
			System.out.println("Login successful !");
			//HttpSession session = req.getSession();
			//session.setMaxInactiveInterval(1440);
			rep.getWriter().println("true");
		}
		else{
			System.out.println("Login unsuccessful !");
			rep.getWriter().println("false");
		}
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER',ROLE_USER)")
	@RequestMapping("/application.do")
	public ModelAndView applycation(Locale locale, Model model) {
		
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		model.addAttribute("loggedUserId", objUser.toString());
		
		ModelAndView nav = new ModelAndView("/app/main","model", model);
		return nav;
	}
	//@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@RequestMapping("/mainAdmin.do")
	public ModelAndView mainAdmin(Locale locale, Model model) {
		
		ModelAndView nav = null;
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		model.addAttribute("loggedUserId", objUser.toString());
		UserVO uVo = new UserVO();
		uVo.setUSERNAME(objUser.toString());
		uVo = userService.getUserVo(uVo);
		if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
			nav = new ModelAndView("/app/mainAdmin","model", model);
		}
		else {
			nav = new ModelAndView("/403","model", model);
		}
		return nav;
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER',ROLE_USER)")
	@RequestMapping("/mainStatistic.do")
	public ModelAndView mainStatistic(Locale locale, Model model) {
		
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		model.addAttribute("loggedUserId", objUser.toString());
		
		ModelAndView nav = new ModelAndView("/app/mainStatistic","model", model);
		return nav;
		//return "/app/mainStatistic";
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping("/mainStore.do")
	public ModelAndView mainStore(Locale locale, Model model) {
		
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		model.addAttribute("loggedUserId", objUser.toString());
		
		ModelAndView nav = new ModelAndView("/app/mainStore","model", model);
		return nav;
		//return "/app/mainStore";
	}
	@RequestMapping("/mainDebit.do")
	public ModelAndView mainDebit(Locale locale, Model model) {
		
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		model.addAttribute("loggedUserId", objUser.toString());
		
		ModelAndView nav = new ModelAndView("/app/mainDebit","model", model);
		return nav;
		//return "/app/mainDebit";
	}
	@RequestMapping("/home.do")
	public String home(Locale locale, Model model, HttpServletRequest req) {
		
		Object objUser = SessionUtil.getSessionAttribute("loggedUserId");
		Object objRes = SessionUtil.getSessionAttribute("loginRestautant");
		String loginUser = null;
		String loginRestautant = null;
		if(objUser != null){
			loginUser = objUser.toString();
		}
		if(objRes != null){
			loginRestautant = objRes.toString();
		}
		
		if(loginUser != null && !loginUser.isEmpty()){
			
			RestaurantVO rVo = restaurantService.getRestaurantVOByID(loginRestautant) ;
			int haveRoom = codeService.getHaveRoomInRestaurant(loginRestautant, rVo.getRESTAR_TYPE());
			if(haveRoom == 1){
				return "/home";
			}
			else return "/manager/SaleManager";
		}
		else
			return "index";
	}
	@RequestMapping("/adm/menu.do")
	public String menu(Locale locale, Model model, HttpServletRequest req) {
		
		return "/adm/menu";
	}
	@RequestMapping("/index.do")
	public String login(Locale locale, Model model, HttpServletRequest req) {
		
		System.out.println("login");
		return "/login/login";
	}
	@RequestMapping("/adm/room.do")
	public String room(Locale locale, Model model, HttpServletRequest req) {
		
		Object restarIdOj = SessionUtil.getSessionAttribute("loginRestautant");
		String restaurantId = restarIdOj.toString();
		
		String userID = "nguyen";
		String userNM = "nguyen";
		System.out.println("Room size ");
		RoomVO rVo = new RoomVO();
		rVo.setRESTAR_ID(restaurantId);
		List<RoomVO> list = roomService.getListRoomVoByRoomVO(rVo);
		for(RoomVO vo : list){
			System.out.println(vo.getROOM_ID()+" / "+vo.getROOM_FLOR()+" / "+vo.getROOM_NO());
		}
		System.out.println("Room size = "+list.size());
		return "/adm/room";
	}
	
	@RequestMapping("/adm/admRoom.do")
	public String admRoom(Locale locale, Model model, HttpServletRequest req) {
		System.out.println("admRoom");
		
		return "/adm/admRoom";
	}
	@RequestMapping("/adm/admMenu.do")
	public String admMenu(Locale locale, Model model, HttpServletRequest req) {
		
		
		return "/adm/admMenu";
	}
	@RequestMapping("/getListRoom1.do")
	public ModelAndView getListRoom1(){
		
		Object restarIdOj = SessionUtil.getSessionAttribute("loginRestautant");
		String restarId = restarIdOj.toString();
		
		RoomVO rVo = new RoomVO();
		rVo.setRESTAR_ID(restarId);
		System.out.println("Lys mac sau");
		
		List<RoomVO> list = roomService.getListRoomVoByRoomVO(rVo);
		System.out.println(list.size());
		for (RoomVO vo : list) {
			System.out.println(vo.getROOM_ID()+"/"+vo.getROOM_FLOR());
		}
		JsonVO jsonVo = new JsonVO(list);
		jsonVo.setSuccess(true);
		jsonVo.setData(list);
		ModelAndView nav = new ModelAndView("jsonView");
		nav.addObject(list.get(0));
		return nav;
		//ModelAndView jsonView = new ModelAndView(abc);
		//return jsonView;
	}
	@RequestMapping(value = "/signup.do", method = RequestMethod.GET)
	public ModelAndView signup(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("signup");

		return mav;
	}
	@RequestMapping("/admin.do")
	public String admin(Locale locale, Model model, HttpServletRequest req) {

		return "/manager/admin";
	}
	@RequestMapping("/adm/storemanager.do")
	public String storemanager(Locale locale, Model model, HttpServletRequest req) {
		return "/manager/storeManager";
	}
	@RequestMapping("/store/import.do")
	public String storeImport(Locale locale, Model model, HttpServletRequest req) {
		
		return "/store/storeImport";
	}
	@RequestMapping(value="/application/get/{code}.do")
	public String getViewPageByCodes(@PathVariable String code, ModelMap model, HttpServletRequest req){
		
		System.out.println("Code : "+ code);
		return "/app/page/"+code;
	}
	@PreAuthorize("hasAnyRole('ROLE_SYSTEM','ROLE_ADMIN')")
	@RequestMapping("/sysadmin.do")
	public String sysadmin(Locale locale, Model model, HttpServletRequest req) {

		return "/manager/sysadmin";
	}
}
