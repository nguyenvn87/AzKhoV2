package com.kito.madina.test.vo;

import java.util.Date;

import com.kito.madina.cmmn.vo.DefaultVO;

public class RoomTurnVO extends DefaultVO{
	
	private String ROOM_ID ;
	private String ROOM_USED_ID ;
	private String ROOM_NO;
	private String TIME_STS ;
	private String TIME_END ;
	private float TIME_TOTAL ;
	private String ID ;
	private String USER_NAME;
	private int IS_ON;
	private int IS_DEBIT;
	private double TOTAL_MONEY;
	private double PAYED_MONEY;
	private String RESTAR_ID;
	private String CHANGE_DATE;
	private int MIN;
	private int MAX;
	private String DSCRT;
	private String DATE;
	private int HAS_PAYED;
	private String PAY_INFO;
	private String PAY_DATE;
	private String rn1;
	private String CUS_CD;
	private String CUS_NM;
	private int IS_DELIVERED;
	private String BILL_CD;
	private String SHIP_ADDR;
	private float SHIP_FEE ;
	private int PRINTED;
	private int IS_ORDER;
	private int IS_CANCELED;
	private String PAY_METHOD;
	private int IS_SAMPLE;
	
	public int getIS_CANCELED() {
		return IS_CANCELED;
	}
	public void setIS_CANCELED(int iS_CANCELED) {
		IS_CANCELED = iS_CANCELED;
	}
	public String getROOM_ID() {
		return ROOM_ID;
	}
	public void setROOM_ID(String rOOM_ID) {
		ROOM_ID = rOOM_ID;
	}
	public String getROOM_USED_ID() {
		return ROOM_USED_ID;
	}
	public void setROOM_USED_ID(String rOOM_USED_ID) {
		ROOM_USED_ID = rOOM_USED_ID;
	}
	public String getTIME_STS() {
		return TIME_STS;
	}
	public void setTIME_STS(String tIME_STS) {
		TIME_STS = tIME_STS;
	}
	public String getTIME_END() {
		return TIME_END;
	}
	public void setTIME_END(String tIME_END) {
		TIME_END = tIME_END;
	}
	public float getTIME_TOTAL() {
		return TIME_TOTAL;
	}
	public void setTIME_TOTAL(float tIME_TOTAL) {
		TIME_TOTAL = tIME_TOTAL;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	/**
	 * @return the iS_ON
	 */
	public int getIS_ON() {
		return IS_ON;
	}
	/**
	 * @param iS_ON the iS_ON to set
	 */
	public void setIS_ON(int iS_ON) {
		IS_ON = iS_ON;
	}
	/**
	 * @return the rn1
	 */
	public String getRn1() {
		return rn1;
	}
	/**
	 * @param rn1 the rn1 to set
	 */
	public void setRn1(String rn1) {
		this.rn1 = rn1;
	}
	/**
	 * @return the uSER_NAME
	 */
	public String getUSER_NAME() {
		return USER_NAME;
	}
	/**
	 * @param uSER_NAME the uSER_NAME to set
	 */
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	/**
	 * @return the iS_DEBIT
	 */
	public int getIS_DEBIT() {
		return IS_DEBIT;
	}
	/**
	 * @param iS_DEBIT the iS_DEBIT to set
	 */
	public void setIS_DEBIT(int iS_DEBIT) {
		IS_DEBIT = iS_DEBIT;
	}
	/**
	 * @return the tOTAL_MONEY
	 */
	public double getTOTAL_MONEY() {
		return TOTAL_MONEY;
	}
	/**
	 * @param tOTAL_MONEY the tOTAL_MONEY to set
	 */
	public void setTOTAL_MONEY(double tOTAL_MONEY) {
		TOTAL_MONEY = tOTAL_MONEY;
	}
	/**
	 * @return the pAYED_MONEY
	 */
	public double getPAYED_MONEY() {
		return PAYED_MONEY;
	}
	/**
	 * @param pAYED_MONEY the pAYED_MONEY to set
	 */
	public void setPAYED_MONEY(double pAYED_MONEY) {
		PAYED_MONEY = pAYED_MONEY;
	}
	/**
	 * @return the rESTAR_ID
	 */
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	/**
	 * @param rESTAR_ID the rESTAR_ID to set
	 */
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	/**
	 * @return the cHANGE_DATE
	 */
	public String getCHANGE_DATE() {
		return CHANGE_DATE;
	}
	/**
	 * @param cHANGE_DATE the cHANGE_DATE to set
	 */
	public void setCHANGE_DATE(String cHANGE_DATE) {
		CHANGE_DATE = cHANGE_DATE;
	}
	/**
	 * @return the mIN
	 */
	public int getMIN() {
		return MIN;
	}
	/**
	 * @param mIN the mIN to set
	 */
	public void setMIN(int mIN) {
		MIN = mIN;
	}
	/**
	 * @return the mAX
	 */
	public int getMAX() {
		return MAX;
	}
	/**
	 * @param mAX the mAX to set
	 */
	public void setMAX(int mAX) {
		MAX = mAX;
	}
	/**
	 * @return the rOOM_NO
	 */
	public String getROOM_NO() {
		return ROOM_NO;
	}
	/**
	 * @param rOOM_NO the rOOM_NO to set
	 */
	public void setROOM_NO(String rOOM_NO) {
		ROOM_NO = rOOM_NO;
	}
	/**
	 * @return the dSCRT
	 */
	public String getDSCRT() {
		return DSCRT;
	}
	/**
	 * @param dSCRT the dSCRT to set
	 */
	public void setDSCRT(String dSCRT) {
		DSCRT = dSCRT;
	}
	/**
	 * @return the dATE
	 */
	public String getDATE() {
		return DATE;
	}
	/**
	 * @param dATE the dATE to set
	 */
	public void setDATE(String dATE) {
		DATE = dATE;
	}
	/**
	 * @return the hAS_PAYED
	 */
	public int getHAS_PAYED() {
		return HAS_PAYED;
	}
	/**
	 * @param hAS_PAYED the hAS_PAYED to set
	 */
	public void setHAS_PAYED(int hAS_PAYED) {
		HAS_PAYED = hAS_PAYED;
	}
	/**
	 * @return the pAY_INFO
	 */
	public String getPAY_INFO() {
		return PAY_INFO;
	}
	/**
	 * @param pAY_INFO the pAY_INFO to set
	 */
	public void setPAY_INFO(String pAY_INFO) {
		PAY_INFO = pAY_INFO;
	}
	public String getPAY_DATE() {
		return PAY_DATE;
	}
	public void setPAY_DATE(String pAY_DATE) {
		PAY_DATE = pAY_DATE;
	}
	public String getCUS_CD() {
		return CUS_CD;
	}
	public void setCUS_CD(String cUS_CD) {
		CUS_CD = cUS_CD;
	}
	/**
	 * @return the iS_DELIVERED
	 */
	public int getIS_DELIVERED() {
		return IS_DELIVERED;
	}
	/**
	 * @param iS_DELIVERED the iS_DELIVERED to set
	 */
	public void setIS_DELIVERED(int iS_DELIVERED) {
		IS_DELIVERED = iS_DELIVERED;
	}
	public String getBILL_CD() {
		return BILL_CD;
	}
	public void setBILL_CD(String bILL_CD) {
		BILL_CD = bILL_CD;
	}
	public String getSHIP_ADDR() {
		return SHIP_ADDR;
	}
	public void setSHIP_ADDR(String sHIP_ADDR) {
		SHIP_ADDR = sHIP_ADDR;
	}
	public float getSHIP_FEE() {
		return SHIP_FEE;
	}
	public void setSHIP_FEE(float sHIP_FEE) {
		SHIP_FEE = sHIP_FEE;
	}
	public int getPRINTED() {
		return PRINTED;
	}
	public void setPRINTED(int pRINTED) {
		PRINTED = pRINTED;
	}
	public String getCUS_NM() {
		return CUS_NM;
	}
	public void setCUS_NM(String cUS_NM) {
		CUS_NM = cUS_NM;
	}
	public int getIS_ORDER() {
		return IS_ORDER;
	}
	public void setIS_ORDER(int iS_ORDER) {
		IS_ORDER = iS_ORDER;
	}
	public String getPAY_METHOD() {
		return PAY_METHOD;
	}
	public void setPAY_METHOD(String pAY_METHOD) {
		PAY_METHOD = pAY_METHOD;
	}
	public int getIS_SAMPLE() {
		return IS_SAMPLE;
	}
	public void setIS_SAMPLE(int iS_SAMPLE) {
		IS_SAMPLE = iS_SAMPLE;
	} 
	
	
}
