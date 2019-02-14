package com.kito.madina.ecount.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class PhieuThuVO extends DefaultVO{
	
	private String BILL_CD ;
	private String BILL_DATE ;
	private String BOOK_NO ;
	private String VALUE ;
	private String CUSTOMMER;
	private String NGUOINOP;
	private String NGUOINOP_ADDR;
	private String RECEPT_CD;
	private String RECEPT_NM;
	private String USER_NAME;
	private String CHUNGTU_CODE ;
	private String CHUNGTU_DATE;
	private String HACHTOAN_DATE;
	private String CHANGE_DATE;
	private String THU_TYPE;
	private String THU_NAME;
	private String PAY_METHOD;
	private String BANK_ID;
	private String RESTAR_ID ;
	private String EXPIRED_DATE;
	private String DESCRIPTION;
	private String RECEIPT_DATE;
	private String ROOM_USED_ID;
	private String BANK_NM;
	private int MIN;
	private int MAX;
	private int IS_DEFAULT;
	private int SORT_NO;
	private String rn1;
	
	public String getBILL_CD() {
		return BILL_CD;
	}
	public void setBILL_CD(String bILL_CD) {
		BILL_CD = bILL_CD;
	}
	public String getBILL_DATE() {
		return BILL_DATE;
	}
	public void setBILL_DATE(String bILL_DATE) {
		BILL_DATE = bILL_DATE;
	}
	public String getBOOK_NO() {
		return BOOK_NO;
	}
	public void setBOOK_NO(String bOOK_NO) {
		BOOK_NO = bOOK_NO;
	}
	public String getVALUE() {
		return VALUE;
	}
	public void setVALUE(String vALUE) {
		VALUE = vALUE;
	}
	public String getRECEPT_CD() {
		return RECEPT_CD;
	}
	public void setRECEPT_CD(String rECEPT_CD) {
		RECEPT_CD = rECEPT_CD;
	}
	public String getRECEPT_NM() {
		return RECEPT_NM;
	}
	public void setRECEPT_NM(String rECEPT_NM) {
		RECEPT_NM = rECEPT_NM;
	}
	public String getUSER_NAME() {
		return USER_NAME;
	}
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	public String getCHUNGTU_CODE() {
		return CHUNGTU_CODE;
	}
	public void setCHUNGTU_CODE(String cHUNGTU_CODE) {
		CHUNGTU_CODE = cHUNGTU_CODE;
	}
	public String getCHUNGTU_DATE() {
		return CHUNGTU_DATE;
	}
	public void setCHUNGTU_DATE(String cHUNGTU_DATE) {
		CHUNGTU_DATE = cHUNGTU_DATE;
	}
	public String getHACHTOAN_DATE() {
		return HACHTOAN_DATE;
	}
	public void setHACHTOAN_DATE(String hACHTOAN_DATE) {
		HACHTOAN_DATE = hACHTOAN_DATE;
	}
	public String getCHANGE_DATE() {
		return CHANGE_DATE;
	}
	public void setCHANGE_DATE(String cHANGE_DATE) {
		CHANGE_DATE = cHANGE_DATE;
	}
	public String getTHU_TYPE() {
		return THU_TYPE;
	}
	public void setTHU_TYPE(String tHU_TYPE) {
		THU_TYPE = tHU_TYPE;
	}
	public String getTHU_NAME() {
		return THU_NAME;
	}
	public void setTHU_NAME(String tHU_NAME) {
		THU_NAME = tHU_NAME;
	}
	public String getPAY_METHOD() {
		return PAY_METHOD;
	}
	public void setPAY_METHOD(String pAY_METHOD) {
		PAY_METHOD = pAY_METHOD;
	}
	public String getBANK_ID() {
		return BANK_ID;
	}
	public void setBANK_ID(String bANK_ID) {
		BANK_ID = bANK_ID;
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
	public int getIS_DEFAULT() {
		return IS_DEFAULT;
	}
	public void setIS_DEFAULT(int iS_DEFAULT) {
		IS_DEFAULT = iS_DEFAULT;
	}
	public int getSORT_NO() {
		return SORT_NO;
	}
	public void setSORT_NO(int sORT_NO) {
		SORT_NO = sORT_NO;
	}
	public String getEXPIRED_DATE() {
		return EXPIRED_DATE;
	}
	public void setEXPIRED_DATE(String eXPIRED_DATE) {
		EXPIRED_DATE = eXPIRED_DATE;
	}
	public String getCUSTOMMER() {
		return CUSTOMMER;
	}
	public void setCUSTOMMER(String cUSTOMMER) {
		CUSTOMMER = cUSTOMMER;
	}
	public String getNGUOINOP() {
		return NGUOINOP;
	}
	public void setNGUOINOP(String nGUOINOP) {
		NGUOINOP = nGUOINOP;
	}
	public String getNGUOINOP_ADDR() {
		return NGUOINOP_ADDR;
	}
	public void setNGUOINOP_ADDR(String nGUOINOP_ADDR) {
		NGUOINOP_ADDR = nGUOINOP_ADDR;
	}
	public String getRn1() {
		return rn1;
	}
	public void setRn1(String rn1) {
		this.rn1 = rn1;
	}
	public String getDESCRIPTION() {
		return DESCRIPTION;
	}
	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}
	public String getRECEIPT_DATE() {
		return RECEIPT_DATE;
	}
	public void setRECEIPT_DATE(String rECEIPT_DATE) {
		RECEIPT_DATE = rECEIPT_DATE;
	}
	public String getROOM_USED_ID() {
		return ROOM_USED_ID;
	}
	public void setROOM_USED_ID(String rOOM_USED_ID) {
		ROOM_USED_ID = rOOM_USED_ID;
	}
	public String getBANK_NM() {
		return BANK_NM;
	}
	public void setBANK_NM(String bANK_NM) {
		BANK_NM = bANK_NM;
	}
	
	
}
