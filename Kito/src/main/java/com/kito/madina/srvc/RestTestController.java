package com.kito.madina.srvc;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.vo.CustomerVO;

@RestController
@RequestMapping("/rest")
public class RestTestController {

    private static final String template = "Hello, %s!";
    
    @RequestMapping(value="/importExport")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	System.out.println("2412341234");
    	String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
    	String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
    	System.out.println("loginUser = "+loginUser);
        return "abcd1124343";
    }
    @RequestMapping(value="/getcustomer")
    public CustomerVO getcustomer(@RequestParam(value="name", defaultValue="World") String name) {
    	System.out.println("2412341234");
    	String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
    	String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
    	System.out.println("loginUser = "+loginUser);
    	CustomerVO cVO = new CustomerVO();
    	cVO.setCUS_CD(1);
    	cVO.setEMAIL("3452345");
    	cVO.setNAME("2452345");
        return cVO;
    }
}