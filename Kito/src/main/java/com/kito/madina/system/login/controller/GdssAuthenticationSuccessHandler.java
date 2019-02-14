package com.kito.madina.system.login.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.kito.madina.cmmn.util.MD5Endcode;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.session.service.SessionService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.UserVO;

/**
 * @author Thaihv
 *
 */
public class GdssAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Resource(name = "userService")
	protected UserService userService;
	@Autowired
	private SessionService sessionService;
	
	@Resource(name = "codeService")
	private CodeService codeService;

	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	protected Log log = LogFactory.getLog(this.getClass());

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.security.web.authentication.
	 * AuthenticationSuccessHandler#onAuthenticationSuccess(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse,
	 * org.springframework.security.core.Authentication)
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		UserVO vo = new UserVO();
		System.out.println("Login success: "+auth.getName());
		vo.setUSERNAME(auth.getName());
		//vo.setPASSWORD(auth.get);
		vo = userService.getUserVo(vo);
		
		UserVO userVo = new UserVO();
		userVo.setUSERNAME(auth.getName());
		
		//List<UserVO> listUser = userService.selectUserByUserNM(userVo);	
		boolean isUser = false;
		if(vo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_USER)){
			isUser = true;
		}
		
		if (vo != null) {
		    // test
			this.sessionService.createSesstion(request.getSession(), "loggedUserId", vo.getUSERNAME());
			//this.sessionService.createSesstion(request.getSession(), "loginRestautant", vo.getRESTAR_ID());
			this.sessionService.createSesstion(request.getSession(), "loggedUserEmail", vo.getEMAIL());
			this.sessionService.createSesstion(request.getSession(), "loggedUserPhone", vo.getPHONE());
			this.sessionService.createSesstion(request.getSession(), "loggedUserAddress", vo.getADDRESS());
			this.sessionService.createSesstion(request.getSession(), "loggedUserLocale", vo.getLOCALE());
			
			SessionUtil.setSessionAttribute("loginRestautant", vo.getRESTAR_ID());
			SessionUtil.setSessionAttribute("loggedUserId", vo.getUSERNAME());

			/* If want to return a Json data for Ajax */ 
			/*			
 			ObjectMapper mapper = new ObjectMapper();
			LoginStatus status = new LoginStatus(true, auth.isAuthenticated(), auth.getName(), null);
			OutputStream out = response.getOutputStream();
			mapper.writeValue(out, status);
			 */
			log.debug("Status LOGIN is OK!");
			response.setStatus(HttpServletResponse.SC_OK);
			/* If using select-menu style from same login page using index.do */
			//response.sendRedirect("/GDSS/index.do");
			String path = request.getContextPath();
			response.sendRedirect(path+"/home.do");
			/*
			if(isUser){
				RestaurantVO rVo = restaurantService.getRestaurantVOByID(vo.getRESTAR_ID()) ;
				int haveRoom = codeService.getHaveRoomInRestaurant(vo.getRESTAR_ID(), rVo.getRESTAR_TYPE());
				if(haveRoom == 0)
					response.sendRedirect(path+"/manager/saleManager.do");
				else
					response.sendRedirect(path+"/home.do");
			}
			else response.sendRedirect(path+"/mainStatistic.do");
			*/
		}
	}

}
