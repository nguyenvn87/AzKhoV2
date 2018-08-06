package com.kito.madina.cmmn.excel;

import java.util.LinkedHashMap;

/**
 * 
 * @author moon9
 * @version 2014.02.10
 */
public class ExcelVO extends LinkedHashMap<String, Object> {

	
	/**
	 *  use serialVersionUID
	 */
	private static final long serialVersionUID = 3120522313355327761L;
	
	/**
	 *  default constructor
	 */
	public ExcelVO()	{}
	

	public ExcelVO(boolean success, Object data)	{
		addObject("success", success);
		addObject("data", data);
	}
	
	public ExcelVO(Object data)	{
		addObject("success", true);
		addObject("data", data);
	}
	
	public void addObject(String str, Object obj)	{
		this.put(str, obj);
	}
	
	public boolean isSuccess() {
		return (Boolean) this.get("success");
	}
	
	
	public void setSuccess(boolean success) {
		addObject("success", success);
	}
	
	public Object getData() {
		return this.get("data");
	}
	
	public void setData(Object data) {
		addObject("data", data);
	}
	
	public int getTotalCount() {
		return (Integer) this.get("totalCount");
	}
	
	public void setTotalCount(int totalCount) {
		addObject("totalCount", totalCount);
	}
	
	public String getMessage() {
		return (String) this.get("message");
	}
	
	public void setMessage(String message) {
		addObject("message", message);
	}	
	
	public String getReturnUrl() {
		return (String) this.get("returnurl");
	}

	public void setReturnUrl(String returnurl) {
		addObject("returnurl", returnurl);
	}

	public boolean isWarning() {
		return (Boolean) this.get("warning");
	}

	public void setWarning(boolean warning) {
		addObject("warning", warning);
	}
}
