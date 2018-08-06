package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class ImportDetailVO extends DefaultVO {

	private int IMPRT_CD;
	private String SRVC_ID;
	private String SRVC_NAME;
	private String SRVC_CD;
	private String IMPRT_PRICE;
	private String AMOUNT;
	private String TOTAL_MONEY;
	private String UNIT;
	private String RESTAR_ID;
	private String USER_NAME;
	private String CHANGETIME;
	private String ID_DETAIL;
	private String TYPE;
	private String TYPE_NM;
	private String NOTE;

	/**
	 * @return the iMPRT_CD
	 */
	public int getIMPRT_CD() {
		return IMPRT_CD;
	}

	/**
	 * @param iMPRT_CD
	 *            the iMPRT_CD to set
	 */
	public void setIMPRT_CD(int iMPRT_CD) {
		IMPRT_CD = iMPRT_CD;
	}

	/**
	 * @return the sRVC_ID
	 */
	public String getSRVC_ID() {
		return SRVC_ID;
	}

	/**
	 * @param sRVC_ID
	 *            the sRVC_ID to set
	 */
	public void setSRVC_ID(String sRVC_ID) {
		SRVC_ID = sRVC_ID;
	}

	/**
	 * @return the iMPRT_PRICE
	 */
	public String getIMPRT_PRICE() {
		return IMPRT_PRICE;
	}

	/**
	 * @param iMPRT_PRICE
	 *            the iMPRT_PRICE to set
	 */
	public void setIMPRT_PRICE(String iMPRT_PRICE) {
		IMPRT_PRICE = iMPRT_PRICE;
	}

	/**
	 * @return the aMOUNT
	 */
	public String getAMOUNT() {
		return AMOUNT;
	}

	/**
	 * @param aMOUNT
	 *            the aMOUNT to set
	 */
	public void setAMOUNT(String aMOUNT) {
		AMOUNT = aMOUNT;
	}

	/**
	 * @return the tOTAL_MONEY
	 */
	public String getTOTAL_MONEY() {
		return TOTAL_MONEY;
	}

	/**
	 * @param tOTAL_MONEY
	 *            the tOTAL_MONEY to set
	 */
	public void setTOTAL_MONEY(String tOTAL_MONEY) {
		TOTAL_MONEY = tOTAL_MONEY;
	}

	/**
	 * @return the uNIT
	 */
	public String getUNIT() {
		return UNIT;
	}

	/**
	 * @param uNIT
	 *            the uNIT to set
	 */
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}

	/**
	 * @return the rESTAR_ID
	 */
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}

	/**
	 * @param rESTAR_ID
	 *            the rESTAR_ID to set
	 */
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}

	/**
	 * @return the uSER_NAME
	 */
	public String getUSER_NAME() {
		return USER_NAME;
	}

	/**
	 * @param uSER_NAME
	 *            the uSER_NAME to set
	 */
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}

	/**
	 * @return the cHANGETIME
	 */
	public String getCHANGETIME() {
		return CHANGETIME;
	}

	/**
	 * @param cHANGETIME
	 *            the cHANGETIME to set
	 */
	public void setCHANGETIME(String cHANGETIME) {
		CHANGETIME = cHANGETIME;
	}

	public String getID_DETAIL() {
		return ID_DETAIL;
	}

	public void setID_DETAIL(String iD_DETAIL) {
		ID_DETAIL = iD_DETAIL;
	}

	public String getSRVC_NAME() {
		return SRVC_NAME;
	}

	public void setSRVC_NAME(String sRVC_NAME) {
		SRVC_NAME = sRVC_NAME;
	}

	public String getTYPE() {
		return TYPE;
	}

	public void setTYPE(String tYPE) {
		TYPE = tYPE;
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

	public String getNOTE() {
		return NOTE;
	}

	public void setNOTE(String nOTE) {
		NOTE = nOTE;
	}

	@Override
	public String toString() {
		return "ImportDetailVO [IMPRT_CD=" + IMPRT_CD + ", SRVC_ID=" + SRVC_ID + ", SRVC_NAME=" + SRVC_NAME
				+ ", IMPRT_PRICE=" + IMPRT_PRICE + ", AMOUNT=" + AMOUNT + ", TOTAL_MONEY=" + TOTAL_MONEY + ", UNIT="
				+ UNIT + ", RESTAR_ID=" + RESTAR_ID + ", USER_NAME=" + USER_NAME + ", CHANGETIME=" + CHANGETIME
				+ ", TYPE=" + TYPE + ", TYPE_NM=" + TYPE_NM + ", SRVC_CD=" + SRVC_CD
				+ ", ID_DETAIL=" + ID_DETAIL + "]";
	}
	
}
