package com.kito.madina.cmmn.util;

import java.io.UnsupportedEncodingException;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;

import com.kito.madina.cmmn.properties.PropertyService;

public class PropertyUtil {

	private static PropertyService property;

	private static PropertyService getBean() {
		if (property == null) {
			ApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();
			property = (PropertyService) ctx.getBean("propertiesService");
		}
		return property;
	}

	public static String getString(String key) {
		return getBean().getString(key);
	}
	public static String getStringUTF8(String key) {
		String str = getBean().getString(key);
		String newValue = null;
		try {
			 newValue = new String(str.getBytes("iso-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return newValue;
	}
}
