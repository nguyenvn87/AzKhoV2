package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class MenuVO extends DefaultVO{
	
	private String MENU_ID; 
	private String SRVC_ID; 
	private String SRVC_CD; 
	private String SRVC_NM; 
	private String PROD_NM; 
	private String PRICE ;
	private String RESTAR_ID;
	private String UNIT;
	private String UNIT_NM;
	private String TYPE;
	private int ACTIVE;
	private int IS_DEFAULT;
	private int MIN;
	private int MAX;
	
	public String getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getSRVC_ID() {
		return SRVC_ID;
	}
	public void setSRVC_ID(String sRVC_ID) {
		SRVC_ID = sRVC_ID;
	}
	public String getPROD_NM() {
		return PROD_NM;
	}
	public void setPROD_NM(String pROD_NM) {
		PROD_NM = pROD_NM;
	}
	public String getPRICE() {
		return PRICE;
	}
	public void setPRICE(String pRICE) {
		PRICE = pRICE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	/**
	 * @return the uNIT
	 */
	public String getUNIT() {
		return UNIT;
	}
	/**
	 * @param uNIT the uNIT to set
	 */
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}
	/**
	 * @return the uNIT_NM
	 */
	public String getUNIT_NM() {
		return UNIT_NM;
	}
	/**
	 * @param uNIT_NM the uNIT_NM to set
	 */
	public void setUNIT_NM(String uNIT_NM) {
		UNIT_NM = uNIT_NM;
	}
	/**
	 * @return the aCTIVE
	 */
	public int getACTIVE() {
		return ACTIVE;
	}
	/**
	 * @param aCTIVE the aCTIVE to set
	 */
	public void setACTIVE(int aCTIVE) {
		ACTIVE = aCTIVE;
	}
	public String getTYPE() {
		return TYPE;
	}
	public void setTYPE(String tYPE) {
		TYPE = tYPE;
	}
	/**
	 * @return the iS_DEFAULT
	 */
	public int getIS_DEFAULT() {
		return IS_DEFAULT;
	}
	/**
	 * @param iS_DEFAULT the iS_DEFAULT to set
	 */
	public void setIS_DEFAULT(int iS_DEFAULT) {
		IS_DEFAULT = iS_DEFAULT;
	}
	/**
	 * @return the mIN
	 */
	public int getMIN() {
		return MIN;
	}
	/**
	 * @param mIN the mIN to set
	 */
	public void setMIN(int mIN) {
		MIN = mIN;
	}
	/**
	 * @return the mAX
	 */
	public int getMAX() {
		return MAX;
	}
	/**
	 * @param mAX the mAX to set
	 */
	public void setMAX(int mAX) {
		MAX = mAX;
	}
	public String getSRVC_CD() {
		return SRVC_CD;
	}
	public void setSRVC_CD(String sRVC_CD) {
		SRVC_CD = sRVC_CD;
	}
	public String getSRVC_NM() {
		return SRVC_NM;
	}
	public void setSRVC_NM(String sRVC_NM) {
		SRVC_NM = sRVC_NM;
	} 
	
	
}
