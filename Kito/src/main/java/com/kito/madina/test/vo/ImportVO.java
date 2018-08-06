package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class ImportVO extends DefaultVO {
	private static final long serialVersionUID = 1L;
	private long NOWNUM;
	private String DATE_IMPORT;
	private String PRICE_IMPORT;
	private int IMPRT_CD;
	private String IMPRT_BILL;
	private String RESTAR_ID;
	private String USER_NAME;
	private String CHANGETIME;
	private String PROV_CD;
	private String TOTAL_MONEY;
	private String DISCOUNT_MONEY;
	private String NEEDTOPAYED;
	private String PAYED_MONEY;
	private String PROV_NM;
	private int MIN;
	private int MAX;
	

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

	public long getNOWNUM() {
		return NOWNUM;
	}

	public void setNOWNUM(long nOWNUM) {
		NOWNUM = nOWNUM;
	}
	
	public String getDATE_IMPORT() {
		return DATE_IMPORT;
	}

	public void setDATE_IMPORT(String dATE_IMPORT) {
		DATE_IMPORT = dATE_IMPORT;
	}

	public String getPRICE_IMPORT() {
		return PRICE_IMPORT;
	}

	public void setPRICE_IMPORT(String pRICE_IMPORT) {
		PRICE_IMPORT = pRICE_IMPORT;
	}

	public String getRESTAR_ID() {
		return RESTAR_ID;
	}

	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}

	public String getUSER_NAME() {
		return USER_NAME;
	}

	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}

	public String getCHANGETIME() {
		return CHANGETIME;
	}

	public void setCHANGETIME(String cHANGETIME) {
		CHANGETIME = cHANGETIME;
	}

	public String getPROV_CD() {
		return PROV_CD;
	}

	public void setPROV_CD(String pROV_CD) {
		PROV_CD = pROV_CD;
	}

	public String getTOTAL_MONEY() {
		return TOTAL_MONEY;
	}

	public void setTOTAL_MONEY(String tOTAL_MONEY) {
		TOTAL_MONEY = tOTAL_MONEY;
	}

	public String getDISCOUNT_MONEY() {
		return DISCOUNT_MONEY;
	}

	public void setDISCOUNT_MONEY(String dISCOUNT_MONEY) {
		DISCOUNT_MONEY = dISCOUNT_MONEY;
	}

	public String getNEEDTOPAYED() {
		return NEEDTOPAYED;
	}

	public void setNEEDTOPAYED(String nEEDTOPAYED) {
		NEEDTOPAYED = nEEDTOPAYED;
	}

	public String getPAYED_MONEY() {
		return PAYED_MONEY;
	}

	public void setPAYED_MONEY(String pAYED_MONEY) {
		PAYED_MONEY = pAYED_MONEY;
	}

	public int getIMPRT_CD() {
		return IMPRT_CD;
	}

	public void setIMPRT_CD(int iMPRT_CD) {
		IMPRT_CD = iMPRT_CD;
	}

	public String getIMPRT_BILL() {
		return IMPRT_BILL;
	}

	public void setIMPRT_BILL(String iMPRT_BILL) {
		IMPRT_BILL = iMPRT_BILL;
	}

	/**
	 * @return the pROV_NM
	 */
	public String getPROV_NM() {
		return PROV_NM;
	}

	/**
	 * @param pROV_NM the pROV_NM to set
	 */
	public void setPROV_NM(String pROV_NM) {
		PROV_NM = pROV_NM;
	}

	@Override
	public String toString() {
		return "ImportVO [NOWNUM=" + NOWNUM + ", DATE_IMPORT=" + DATE_IMPORT + ", PRICE_IMPORT=" + PRICE_IMPORT
				+ ", IMPRT_CD=" + IMPRT_CD + ", IMPRT_BILL=" + IMPRT_BILL + ", RESTAR_ID=" + RESTAR_ID + ", USER_NAME="
				+ USER_NAME + ", CHANGETIME=" + CHANGETIME + ", PROV_CD=" + PROV_CD + ", TOTAL_MONEY=" + TOTAL_MONEY
				+ ", DISCOUNT_MONEY=" + DISCOUNT_MONEY + ", NEEDTOPAYED=" + NEEDTOPAYED + ", PAYED_MONEY=" + PAYED_MONEY
				+ ", MIN=" + MIN + ", MAX=" + MAX + "]";
	}
}
