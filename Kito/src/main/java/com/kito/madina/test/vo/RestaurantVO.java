package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RestaurantVO extends DefaultVO{
	
	private String RESTAR_ID; 
	private String RESTAR_CODE; 
	private String RESTAR_NM; 
	private String ADDR;
	private String PHONE;
	private String ADDR2;
	private String EMAIL;
	private String RESTAR_TYPE;
	private String USE_TYPE;
	private String CONTACT_NM;
	private String CONTACT_PHONE;
	private String CREATE_TIME;
	private String EXPIRED_DATE;
	private String CHANGE_DATE;
	private int IS_LOCK;
	private int MIN;
	private int MAX;
	private String rn1;
	private float COIN_EXCHANGE;
	private String IS_PRINT_BIG; 
	private String USER_EDIT_BILL;
	private String PACKAGE;
	private String BILL_TITLE;
	private String BILL_SLOGAN;
	private String BILL_TITLE3;
	
	private String BILL_BOTTOM1;
	private String BILL_BOTTOM2;
	private String BILL_BOTTOM3;
	private int IS_PRINT_PAYMENT;
	private String BILL_LABEL_PAYED1;
	private String BILL_LABEL_PAYED2;
	private int IS_PRINT_PAYMETHOD;
	
	private boolean HAS_VERIFY;
	
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	public String getRESTAR_CODE() {
		return RESTAR_CODE;
	}
	public void setRESTAR_CODE(String rESTAR_CODE) {
		RESTAR_CODE = rESTAR_CODE;
	}
	public String getRESTAR_NM() {
		return RESTAR_NM;
	}
	public void setRESTAR_NM(String rESTAR_NM) {
		RESTAR_NM = rESTAR_NM;
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
	public String getADDR2() {
		return ADDR2;
	}
	public void setADDR2(String aDDR2) {
		ADDR2 = aDDR2;
	}
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	/**
	 * @return the rESTAR_TYPE
	 */
	public String getRESTAR_TYPE() {
		return RESTAR_TYPE;
	}
	/**
	 * @param rESTAR_TYPE the rESTAR_TYPE to set
	 */
	public void setRESTAR_TYPE(String rESTAR_TYPE) {
		RESTAR_TYPE = rESTAR_TYPE;
	}
	/**
	 * @return the uSE_TYPE
	 */
	public String getUSE_TYPE() {
		return USE_TYPE;
	}
	/**
	 * @param uSE_TYPE the uSE_TYPE to set
	 */
	public void setUSE_TYPE(String uSE_TYPE) {
		USE_TYPE = uSE_TYPE;
	}
	/**
	 * @return the CONTACT_NM
	 */
	public String getCONTACT_NM() {
		return CONTACT_NM;
	}
	/**
	 * @param CONTACT_NM the CONTACT_NM to set
	 */
	public void setCONTACT_NM(String cONTACT_NM) {
		CONTACT_NM = cONTACT_NM;
	}
	/**
	 * @return the cONTACT_PHONE
	 */
	public String getCONTACT_PHONE() {
		return CONTACT_PHONE;
	}
	/**
	 * @param cONTACT_PHONE the cONTACT_PHONE to set
	 */
	public void setCONTACT_PHONE(String cONTACT_PHONE) {
		CONTACT_PHONE = cONTACT_PHONE;
	}
	public String getCREATE_TIME() {
		return CREATE_TIME;
	}
	public void setCREATE_TIME(String cREATE_TIME) {
		CREATE_TIME = cREATE_TIME;
	}
	public int getIS_LOCK() {
		return IS_LOCK;
	}
	public void setIS_LOCK(int iS_LOCK) {
		IS_LOCK = iS_LOCK;
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
	public String getRn1() {
		return rn1;
	}
	public void setRn1(String rn1) {
		this.rn1 = rn1;
	}
	public String getEXPIRED_DATE() {
		return EXPIRED_DATE;
	}
	public void setEXPIRED_DATE(String eXPIRED_DATE) {
		EXPIRED_DATE = eXPIRED_DATE;
	}
	public String getCHANGE_DATE() {
		return CHANGE_DATE;
	}
	public void setCHANGE_DATE(String cHANGE_DATE) {
		CHANGE_DATE = cHANGE_DATE;
	}
	public float getCOIN_EXCHANGE() {
		return COIN_EXCHANGE;
	}
	public void setCOIN_EXCHANGE(float cOIN_EXCHANGE) {
		COIN_EXCHANGE = cOIN_EXCHANGE;
	}
	public String getIS_PRINT_BIG() {
		return IS_PRINT_BIG;
	}
	public void setIS_PRINT_BIG(String bILL_STYLE) {
		IS_PRINT_BIG = bILL_STYLE;
	}
	public String getUSER_EDIT_BILL() {
		return USER_EDIT_BILL;
	}
	public void setUSER_EDIT_BILL(String uSER_EDIT_BILL) {
		USER_EDIT_BILL = uSER_EDIT_BILL;
	}
	public String getPACKAGE() {
		return PACKAGE;
	}
	public void setPACKAGE(String pACKAGE) {
		PACKAGE = pACKAGE;
	}
	public boolean getHAS_VERIFY() {
		return HAS_VERIFY;
	}
	public void setHAS_VERIFY(boolean hAS_VERIFY) {
		HAS_VERIFY = hAS_VERIFY;
	}
	public String getBILL_TITLE() {
		return BILL_TITLE;
	}
	public void setBILL_TITLE(String bILL_TITLE) {
		BILL_TITLE = bILL_TITLE;
	}
	public String getBILL_SLOGAN() {
		return BILL_SLOGAN;
	}
	public void setBILL_SLOGAN(String bILL_SLOGAN) {
		BILL_SLOGAN = bILL_SLOGAN;
	}
	public String getBILL_TITLE3() {
		return BILL_TITLE3;
	}
	public void setBILL_TITLE3(String bILL_TITLE3) {
		BILL_TITLE3 = bILL_TITLE3;
	}
	public String getBILL_BOTTOM1() {
		return BILL_BOTTOM1;
	}
	public void setBILL_BOTTOM1(String bILL_BOTTOM1) {
		BILL_BOTTOM1 = bILL_BOTTOM1;
	}
	public String getBILL_BOTTOM2() {
		return BILL_BOTTOM2;
	}
	public void setBILL_BOTTOM2(String bILL_BOTTOM2) {
		BILL_BOTTOM2 = bILL_BOTTOM2;
	}
	public String getBILL_BOTTOM3() {
		return BILL_BOTTOM3;
	}
	public void setBILL_BOTTOM3(String bILL_BOTTOM3) {
		BILL_BOTTOM3 = bILL_BOTTOM3;
	}
	public int getIS_PRINT_PAYMENT() {
		return IS_PRINT_PAYMENT;
	}
	public void setIS_PRINT_PAYMENT(int iS_PRINT_PAYMENT) {
		IS_PRINT_PAYMENT = iS_PRINT_PAYMENT;
	}
	public String getBILL_LABEL_PAYED1() {
		return BILL_LABEL_PAYED1;
	}
	public void setBILL_LABEL_PAYED1(String bILL_LABEL_PAYED1) {
		BILL_LABEL_PAYED1 = bILL_LABEL_PAYED1;
	}
	public String getBILL_LABEL_PAYED2() {
		return BILL_LABEL_PAYED2;
	}
	public void setBILL_LABEL_PAYED2(String bILL_LABEL_PAYED2) {
		BILL_LABEL_PAYED2 = bILL_LABEL_PAYED2;
	}
	public int getIS_PRINT_PAYMETHOD() {
		return IS_PRINT_PAYMETHOD;
	}
	public void setIS_PRINT_PAYMETHOD(int iS_PRINT_PAYMETHOD) {
		IS_PRINT_PAYMETHOD = iS_PRINT_PAYMETHOD;
	}
	
	  
}
