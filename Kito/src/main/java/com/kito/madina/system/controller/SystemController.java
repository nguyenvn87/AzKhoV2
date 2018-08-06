package com.kito.madina.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SystemController {
	
	@RequestMapping(value="/system/auth/{app}/{file}.do")
	public String getViewPageByCodes(@PathVariable String app , @PathVariable String file){	
		return "/"+app+"/" + file;		
	}
}
