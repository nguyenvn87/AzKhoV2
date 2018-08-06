package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class StoreSrvcVO extends DefaultVO{
	
	private String STORE_ID; 
	private String SRVC_ID; 
	private String SRVC_CD; 
	private String SRVC_NM; 
	private float TOTAL_NO; 
	private float REMAIN_NO ;
	private String RESTAR_ID;
	private String UNIT;
	private String UNIT_NM;
	private String USERNAME;
	private String CHANGETIME;
	private String TYPE;
	private String TYPE_NM;
	private int MIN;
	private int MAX;
	
	public String getSTORE_ID() {
		return STORE_ID;
	}
	public void setSTORE_ID(String sTORE_ID) {
		STORE_ID = sTORE_ID;
	}
	public String getSRVC_ID() {
		return SRVC_ID;
	}
	public void setSRVC_ID(String sRVC_ID) {
		SRVC_ID = sRVC_ID;
	}
	public float getTOTAL_NO() {
		return TOTAL_NO;
	}
	public void setTOTAL_NO(float tOTAL_NO) {
		TOTAL_NO = tOTAL_NO;
	}
	public float getREMAIN_NO() {
		return REMAIN_NO;
	}
	public void setREMAIN_NO(float rEMAIN_NO) {
		REMAIN_NO = rEMAIN_NO;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	public String getUNIT() {
		return UNIT;
	}
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}
	public String getUNIT_NM() {
		return UNIT_NM;
	}
	public void setUNIT_NM(String uNIT_NM) {
		UNIT_NM = uNIT_NM;
	}
	public String getUSERNAME() {
		return USERNAME;
	}
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}
	public String getCHANGETIME() {
		return CHANGETIME;
	}
	public void setCHANGETIME(String cHANGETIME) {
		CHANGETIME = cHANGETIME;
	}
	/**
	 * @return the sRVC_NM
	 */
	public String getSRVC_NM() {
		return SRVC_NM;
	}
	/**
	 * @param sRVC_NM the sRVC_NM to set
	 */
	public void setSRVC_NM(String sRVC_NM) {
		SRVC_NM = sRVC_NM;
	}
	/**
	 * @return the tYPE
	 */
	public String getTYPE() {
		return TYPE;
	}
	/**
	 * @param tYPE the tYPE to set
	 */
	public void setTYPE(String tYPE) {
		TYPE = tYPE;
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
	public String getTYPE_NM() {
		return TYPE_NM;
	}
	public void setTYPE_NM(String tYPE_NM) {
		TYPE_NM = tYPE_NM;
	}
	public String getSRVC_CD() {
		return SRVC_CD;
	}
	public void setSRVC_CD(String sRVC_CD) {
		SRVC_CD = sRVC_CD;
	}
	
	
}
