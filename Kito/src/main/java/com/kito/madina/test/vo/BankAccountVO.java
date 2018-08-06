package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class BankAccountVO extends DefaultVO{
	
	private String ID_BANK ;
	private String ACCOUNT_NO ;
	private String BANK_NM ;
	private String ACCOUNT_NM ;
	private String NOTE;
	private String RESTAR_ID;
	private String CHANGE_USER;
	
	public String getID_BANK() {
		return ID_BANK;
	}
	public void setID_BANK(String iD_CODE) {
		ID_BANK = iD_CODE;
	}
	public String getACCOUNT_NO() {
		return ACCOUNT_NO;
	}
	public void setACCOUNT_NO(String aCCOUNT_NO) {
		ACCOUNT_NO = aCCOUNT_NO;
	}
	public String getBANK_NM() {
		return BANK_NM;
	}
	public void setBANK_NM(String bANK_NAME) {
		BANK_NM = bANK_NAME;
	}
	public String getACCOUNT_NM() {
		return ACCOUNT_NM;
	}
	public void setACCOUNT_NM(String aCCOUNT_NM) {
		ACCOUNT_NM = aCCOUNT_NM;
	}
	public String getNOTE() {
		return NOTE;
	}
	public void setNOTE(String nOTE) {
		NOTE = nOTE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String nOTE) {
		RESTAR_ID = nOTE;
	}
	public String getCHANGE_USER() {
		return CHANGE_USER;
	}
	public void setCHANGE_USER(String cHANGE_USER) {
		CHANGE_USER = cHANGE_USER;
	}
	
	
}
