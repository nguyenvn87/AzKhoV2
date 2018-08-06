package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RoleGroupRoleVO extends DefaultVO{
	
	private String ROLEGROUP_ID ;
	private String ROLE_ID; 
	private String USE_YN;
	private String RESTAR_ID;
	
	public String getROLEGROUP_ID() {
		return ROLEGROUP_ID;
	}
	public void setROLEGROUP_ID(String rOLEGROUP_ID) {
		ROLEGROUP_ID = rOLEGROUP_ID;
	}
	public String getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(String rOLE_ID) {
		ROLE_ID = rOLE_ID;
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
