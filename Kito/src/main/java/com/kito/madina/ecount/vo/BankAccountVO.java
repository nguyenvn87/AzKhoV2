package com.kito.madina.ecount.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class BankAccountVO extends DefaultVO{
	
	private String ID_BANK ;
	private String BANK_NM ;
	private String RESTAR_ID;
	private String CHANGE_USER;
	private String BALANCE;
	private String CURRENCY;
	private String ADDRESS;
	private String OWNER;
	private String ISSORT;
	
	public String getID_BANK() {
		return ID_BANK;
	}
	public void setID_BANK(String iD_BANK) {
		ID_BANK = iD_BANK;
	}
	public String getBANK_NM() {
		return BANK_NM;
	}
	public void setBANK_NM(String bANK_NM) {
		BANK_NM = bANK_NM;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	public String getCHANGE_USER() {
		return CHANGE_USER;
	}
	public void setCHANGE_USER(String cHANGE_USER) {
		CHANGE_USER = cHANGE_USER;
	}
	public String getBALANCE() {
		return BALANCE;
	}
	public void setBALANCE(String bALANCE) {
		BALANCE = bALANCE;
	}
	public String getCURRENCY() {
		return CURRENCY;
	}
	public void setCURRENCY(String cURRENCY) {
		CURRENCY = cURRENCY;
	}
	public String getADDRESS() {
		return ADDRESS;
	}
	public void setADDRESS(String aDDRESS) {
		ADDRESS = aDDRESS;
	}
	public String getOWNER() {
		return OWNER;
	}
	public void setOWNER(String oWNER) {
		OWNER = oWNER;
	}
	public String getISSORT() {
		return ISSORT;
	}
	public void setISSORT(String oRDER) {
		ISSORT = oRDER;
	}
	
	
}
