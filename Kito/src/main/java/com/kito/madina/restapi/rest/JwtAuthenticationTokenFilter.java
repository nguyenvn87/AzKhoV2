
package com.kito.madina.restapi.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.kito.madina.cmmn.util.JwtUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.UserVO;

public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

	private final static String TOKEN_HEADER = "authorization";

	/*
	 * @Autowired private JwtService jwtService;
	 * 
	 * @Autowired private UserService userService;
	 */
	@Resource(name = "userService")
	private UserService userService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		JwtUtil jwtUtil = new JwtUtil();
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String authToken = httpRequest.getHeader(TOKEN_HEADER);
		
		if (jwtUtil.validateTokenLogin(authToken)) { 
		 String username = jwtUtil.getUsernameFromToken(authToken);
		  
		 UserVO user = userService.getUserVoByUsername(username);
		  
		if (user != null) { 
			
			SessionUtil.setSessionAttribute("loggedUserId", user.getUSERNAME());
			SessionUtil.setSessionAttribute("loginRestautant", user.getRESTAR_ID());
			boolean enabled = true; 
			boolean accountNonExpired = true;
			boolean credentialsNonExpired = true; 
			boolean accountNonLocked = true;
			
			UserDetails userDetail = new User(username, user.getPASSWORD(), enabled,accountNonExpired, credentialsNonExpired, accountNonLocked, user.getAuthorities());
		  
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities()); 
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
			SecurityContextHolder.getContext().setAuthentication(authentication); 
			} 
		}
			 
			chain.doFilter(request, response);
	}
}