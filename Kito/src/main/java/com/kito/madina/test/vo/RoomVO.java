package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RoomVO extends DefaultVO{
	
	private String ROOM_ID ;
	private String ROOM_NO ;
	private String ROOM_FLOR ;
	private String ROOM_TYPE ;
	private String ROOM_TYPE_NM;
	private String RESTAR_ID;
	private String ROOM_STATUS;
	private int	IS_EMPTY;
	private int IS_USED;
	
	public String getROOM_ID() {
		return ROOM_ID;
	}
	public void setROOM_ID(String rOOM_ID) {
		ROOM_ID = rOOM_ID;
	}
	public String getROOM_NO() {
		return ROOM_NO;
	}
	public void setROOM_NO(String rOOM_NO) {
		ROOM_NO = rOOM_NO;
	}
	public String getROOM_FLOR() {
		return ROOM_FLOR;
	}
	public void setROOM_FLOR(String rOOM_FLOR) {
		ROOM_FLOR = rOOM_FLOR;
	}
	public String getROOM_TYPE() {
		return ROOM_TYPE;
	}
	public void setROOM_TYPE(String rOOM_TYPE) {
		ROOM_TYPE = rOOM_TYPE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	/**
	 * @return the sTATUS
	 */
	public String getROOM_STATUS() {
		return ROOM_STATUS;
	}
	/**
	 * @param sTATUS the sTATUS to set
	 */
	public void setROOM_STATUS(String sROOM_STATUS) {
		ROOM_STATUS = sROOM_STATUS;
	}
	/**
	 * @return the iS_EMPTY
	 */
	public int getIS_EMPTY() {
		return IS_EMPTY;
	}
	/**
	 * @param iS_EMPTY the iS_EMPTY to set
	 */
	public void setIS_EMPTY(int iS_EMPTY) {
		IS_EMPTY = iS_EMPTY;
	}
	/**
	 * @return the rOOM_TYPE_NM
	 */
	public String getROOM_TYPE_NM() {
		return ROOM_TYPE_NM;
	}
	/**
	 * @param rOOM_TYPE_NM the rOOM_TYPE_NM to set
	 */
	public void setROOM_TYPE_NM(String rOOM_TYPE_NM) {
		ROOM_TYPE_NM = rOOM_TYPE_NM;
	}
	public int getIS_USED() {
		return IS_USED;
	}
	public void setIS_USED(int iS_USED) {
		IS_USED = iS_USED;
	} 
	
	
	
}
