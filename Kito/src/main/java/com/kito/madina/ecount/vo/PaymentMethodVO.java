package com.kito.madina.ecount.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class PaymentMethodVO extends DefaultVO{
	
	private String METHOD_ID ;
	private String ROOM_USED_ID ;
	private String PAY_TYPE ;
	private String PAY_TYPE_NM ;
	private String ID_BANK;
	private Double VALUE;
	private String RESTAR_ID;
	private String NOTE;
	private String BANK_NM;
	
	public String getMETHOD_ID() {
		return METHOD_ID;
	}
	public void setMETHOD_ID(String mETHOD_ID) {
		METHOD_ID = mETHOD_ID;
	}
	public String getROOM_USED_ID() {
		return ROOM_USED_ID;
	}
	public void setROOM_USED_ID(String rOOM_USED_ID) {
		ROOM_USED_ID = rOOM_USED_ID;
	}
	public String getPAY_TYPE() {
		return PAY_TYPE;
	}
	public void setPAY_TYPE(String pAY_TYPE) {
		PAY_TYPE = pAY_TYPE;
	}
	public String getPAY_TYPE_NM() {
		return PAY_TYPE_NM;
	}
	public void setPAY_TYPE_NM(String pAY_TYPE_NM) {
		PAY_TYPE_NM = pAY_TYPE_NM;
	}
	public String getID_BANK() {
		return ID_BANK;
	}
	public void setID_BANK(String bANK_ID) {
		ID_BANK = bANK_ID;
	}
	public Double getVALUE() {
		return VALUE;
	}
	public void setVALUE(Double vALUE) {
		VALUE = vALUE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	public String getNOTE() {
		return NOTE;
	}
	public void setNOTE(String nOTE) {
		NOTE = nOTE;
	}
	public String getBANK_NM() {
		return BANK_NM;
	}
	public void setBANK_NM(String bANK_NM) {
		BANK_NM = bANK_NM;
	}
	
	
}
