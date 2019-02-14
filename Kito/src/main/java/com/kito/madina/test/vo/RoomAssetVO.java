package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RoomAssetVO extends DefaultVO{
	
	private String ID_ROOM_ASSET ;
	private String ROOM_ID ;
	private String SRVC_ID ;
	private float AMOUNT ;
	private float PRICE ;
	private String USER_NAME;
	private String RESTAR_ID;
	private String UNIT;
	private String CHANGETIME;
	
	public String getID_ROOM_ASSET() {
		return ID_ROOM_ASSET;
	}
	public void setID_ROOM_ASSET(String iD_ROOM_ASSET) {
		ID_ROOM_ASSET = iD_ROOM_ASSET;
	}
	public String getROOM_ID() {
		return ROOM_ID;
	}
	public void setROOM_ID(String rOOM_ID) {
		ROOM_ID = rOOM_ID;
	}
	public String getSRVC_ID() {
		return SRVC_ID;
	}
	public void setSRVC_ID(String sRVC_ID) {
		SRVC_ID = sRVC_ID;
	}
	public float getAMOUNT() {
		return AMOUNT;
	}
	public void setAMOUNT(float aMOUNT) {
		AMOUNT = aMOUNT;
	}
	public float getPRICE() {
		return PRICE;
	}
	public void setPRICE(float pRICE) {
		PRICE = pRICE;
	}
	public String getUSER_NAME() {
		return USER_NAME;
	}
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
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
	public String getCHANGETIME() {
		return CHANGETIME;
	}
	public void setCHANGETIME(String cHANGETIME) {
		CHANGETIME = cHANGETIME;
	}
	
	
}
