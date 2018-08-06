package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RoleGroupMenuVO extends DefaultVO{
	
	private String MENU_ID ;
	private String ROLEGROUP_ID; 
	private String MENU_TYPE; 
	private String USE_YN;
	private String RESTAR_ID;
	
	public String getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getROLEGROUP_ID() {
		return ROLEGROUP_ID;
	}
	public void setROLEGROUP_ID(String rOLEGROUP_ID) {
		ROLEGROUP_ID = rOLEGROUP_ID;
	}
	public String getMENU_TYPE() {
		return MENU_TYPE;
	}
	public void setMENU_TYPE(String mENU_TYPE) {
		MENU_TYPE = mENU_TYPE;
	}
	public String getUSE_YN() {
		return USE_YN;
	}
	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	 
	
}
