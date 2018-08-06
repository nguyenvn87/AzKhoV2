package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;
public class CmmCdUserVO extends DefaultVO {

	String GROUP_CD;
	int CD;
	String GROUP_NM;
	String CD_NM;
	String VALUE1;
	String SYS_USE_YN;
	String USE_YN;
	String SORT_SN;
	String DSCR;
	String RESTAR_ID;

	private int MIN;
	private int MAX;
	private int COUNT;
	private int PAGESIZE;
	
	private String CHANGE_TIME  = null;

	public String getGROUP_CD() {
		return GROUP_CD;
	}

	public void setGROUP_CD(String gROUP_CD) {
		GROUP_CD = gROUP_CD;
	}

	public int getCD() {
		return CD;
	}

	public void setCD(int cD) {
		CD = cD;
	}

	public String getGROUP_NM() {
		return GROUP_NM;
	}

	public void setGROUP_NM(String gROUP_NM) {
		GROUP_NM = gROUP_NM;
	}

	public String getCD_NM() {
		return CD_NM;
	}

	public void setCD_NM(String cD_NM) {
		CD_NM = cD_NM;
	}

	public String getVALUE1() {
		return VALUE1;
	}

	public void setVALUE1(String vALUE1) {
		VALUE1 = vALUE1;
	}

	public String getSYS_USE_YN() {
		return SYS_USE_YN;
	}

	public void setSYS_USE_YN(String sYS_USE_YN) {
		SYS_USE_YN = sYS_USE_YN;
	}

	public String getUSE_YN() {
		return USE_YN;
	}

	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}

	public String getSORT_SN() {
		return SORT_SN;
	}

	public void setSORT_SN(String sORT_SN) {
		SORT_SN = sORT_SN;
	}

	public String getDSCR() {
		return DSCR;
	}

	public void setDSCR(String dSCR) {
		DSCR = dSCR;
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

	public int getCOUNT() {
		return COUNT;
	}

	public void setCOUNT(int cOUNT) {
		COUNT = cOUNT;
	}

	public int getPAGESIZE() {
		return PAGESIZE;
	}

	public void setPAGESIZE(int pAGESIZE) {
		PAGESIZE = pAGESIZE;
	}

	public String getCHANGE_TIME() {
		return CHANGE_TIME;
	}

	public void setCHANGE_TIME(String cHANGE_TIME) {
		CHANGE_TIME = cHANGE_TIME;
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
	
	

}
