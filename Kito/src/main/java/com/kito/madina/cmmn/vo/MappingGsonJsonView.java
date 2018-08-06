package com.kito.madina.cmmn.vo;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.kito.madina.cmmn.util.CmmUtil;


public class MappingGsonJsonView extends AbstractView {
	
	
	public MappingGsonJsonView() {
		super();
	}
	
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		res.setContentType( getContentType());
		res.getWriter().write( CmmUtil.getGsonInstance().toJson( model));

	}

}
