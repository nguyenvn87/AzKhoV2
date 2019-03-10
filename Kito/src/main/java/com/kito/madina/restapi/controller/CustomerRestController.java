package com.kito.madina.restapi.controller;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.stream.JsonReader;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.JwtUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;

@RestController
@RequestMapping("/rest/customer")
public class CustomerRestController {
	
	private JwtUtil jwtUtil;

	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@RequestMapping(value = "/getLisPagingCustomers.json", method = RequestMethod.GET)
	public ModelAndView getListCDUser(HttpServletRequest req, CustomerVO vo) {
		
				String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
				String query = req.getParameter("query");
				if(query != null){
					vo.setNAME(query);
				}
				if(vo.getNAME() == null){
					vo.setNAME("%%");
				}
				else vo.setNAME("%"+vo.getNAME()+"%");
				vo.setRESTAR_ID(restarId);
				int	limit 	=  vo.getLimit() !=null?Integer.parseInt(vo.getLimit()): 20; 
				int	page 	=  vo.getPage() != null?Integer.parseInt(vo.getPage()): 1;
				vo.setMIN((page -1)*limit);
				vo.setMAX(((page-1)*limit) + limit);
				System.out.println("getListCDUser");
				
				List<CustomerVO> list = customerService.getSearchListAllCustomer(vo);
				HashMap<String, Object> map = customerService.getListCountSearchCustomer(vo);
				int totalCount = 0;
				if(map != null && map.get("COUNT") != null){
					totalCount = Integer.parseInt(map.get("COUNT").toString());
				}
				JsonVO jvon = new JsonVO();
				jvon.setData(list);
				jvon.setTotalCount(totalCount);
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
}
