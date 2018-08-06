package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class CustomerVO extends DefaultVO{
	
	private int CUS_CD; 
	private String NAME ;
	private String ADDR ;
	private String PHONE ;
	private String EMAIL ;
	private String SCORE ;
	private String RESTAR_ID; 
	private String CHANGE_USER; 
	private String CHANGE_DATE; 
	private String ACCUMULT;
	private Float TOTAL_MONEY;
	private int MIN;
	private int MAX;
	private int rn1;
	
	public int getCUS_CD() {
		return CUS_CD;
	}
	public void setCUS_CD(int cUS_CD) {
		CUS_CD = cUS_CD;
	}
	public String getNAME() {
		return NAME;
	}
	public void setNAME(String nAME) {
		NAME = nAME;
	}
	public String getADDR() {
		return ADDR;
	}
	public void setADDR(String aDDR) {
		ADDR = aDDR;
	}
	public String getPHONE() {
		return PHONE;
	}
	public void setPHONE(String pHONE) {
		PHONE = pHONE;
	}
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	public String getSCORE() {
		return SCORE;
	}
	public void setSCORE(String sCORE) {
		SCORE = sCORE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
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
	public int getRn1() {
		return rn1;
	}
	public void setRn1(int rn1) {
		this.rn1 = rn1;
	}
	public String getCHANGE_USER() {
		return CHANGE_USER;
	}
	public void setCHANGE_USER(String cHANGE_USER) {
		CHANGE_USER = cHANGE_USER;
	}
	public String getCHANGE_DATE() {
		return CHANGE_DATE;
	}
	public void setCHANGE_DATE(String cHANGE_DATE) {
		CHANGE_DATE = cHANGE_DATE;
	}
	public String getACCUMULT() {
		return ACCUMULT;
	}
	public void setACCUMULT(String aCCUMULT) {
		ACCUMULT = aCCUMULT;
	}
	public Float getTOTAL_MONEY() {
		return TOTAL_MONEY;
	}
	public void setTOTAL_MONEY(Float tOTAL_MONEY) {
		TOTAL_MONEY = tOTAL_MONEY;
	}
	
}
