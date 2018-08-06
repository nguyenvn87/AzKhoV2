package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class UserVO extends DefaultVO{
	
	private String USERNAME; 
	private String PASSWORD ;
	private String FULLNAME ;
	private String CMND ;
	private String PHONE ;
	private String ADDRESS ;
	private String RESTAR_ID; 
	private String ENABLED; 
	private String GENDER; 
	private String EMAIL;
	private String RESTAR_TYPE;
	private String authority;
	private String packageid;
	private int MIN;
	private int MAX;
	private int rn1;
	
	public String getUSERNAME() {
		return USERNAME;
	}
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}
	public String getPASSWORD() {
		return PASSWORD;
	}
	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}
	public String getCMND() {
		return CMND;
	}
	public void setCMND(String cMND) {
		CMND = cMND;
	}
	public String getPHONE() {
		return PHONE;
	}
	public void setPHONE(String pHONE) {
		PHONE = pHONE;
	}
	public String getADDRESS() {
		return ADDRESS;
	}
	public void setADDRESS(String aDDRESS) {
		ADDRESS = aDDRESS;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	public String getENABLED() {
		return ENABLED;
	}
	public void setENABLED(String eNABLED) {
		ENABLED = eNABLED;
	}
	public String getGENDER() {
		return GENDER;
	}
	public void setGENDER(String gENDER) {
		GENDER = gENDER;
	}
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	/**
	 * @return the fULLNAME
	 */
	public String getFULLNAME() {
		return FULLNAME;
	}
	/**
	 * @param fULLNAME the fULLNAME to set
	 */
	public void setFULLNAME(String fULLNAME) {
		FULLNAME = fULLNAME;
	}
	public int getMIN() {
		return MIN;
	}
	public void setMIN(int mIN) {
		MIN = mIN;
	}
	public int getMAX() {
		return MAX;
	}
	public void setMAX(int mAX) {
		MAX = mAX;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public int getRn1() {
		return rn1;
	}
	public void setRn1(int rn1) {
		this.rn1 = rn1;
	}
	public String getRESTAR_TYPE() {
		return RESTAR_TYPE;
	}
	public void setRESTAR_TYPE(String rESTAR_TYPE) {
		RESTAR_TYPE = rESTAR_TYPE;
	}
	public String getPackageid() {
		return packageid;
	}
	public void setPackageid(String packageid) {
		this.packageid = packageid;
	} 
	
	
	 
}
