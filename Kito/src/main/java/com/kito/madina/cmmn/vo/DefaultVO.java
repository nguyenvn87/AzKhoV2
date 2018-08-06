package com.kito.madina.cmmn.vo;

import java.io.Serializable;

 
public class DefaultVO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// extjs param -> lowcase
	String	page;
	String	start;
	String	limit;
	String  sort;
	
	String	SearchText;
	String	SearchText01;

	String	STATUS;
	
	
	String	PARENT_ID;
	String	CHILD_ID;
	String	RESULT;
	
	String	TRNSC_ID;
	String	LOCALE = "vn";
	
	String	PERMISSION_USER_ID;
	String	PERMISSION_PART_ID;
	
	String	LOGGED_USER_ID;
	
	public String getLOGGED_USER_ID() {
		return LOGGED_USER_ID;
	}

	public void setLOGGED_USER_ID(String lOGGED_USER_ID) {
		LOGGED_USER_ID = lOGGED_USER_ID;
	}

	public String getPERMISSION_USER_ID() {
		return PERMISSION_USER_ID;
	}

	public void setPERMISSION_USER_ID(String pERMISSION_USER_ID) {
		PERMISSION_USER_ID = pERMISSION_USER_ID;
	}

	/**
	 * @return the pERMISSION_PART_ID
	 */
	public String getPERMISSION_PART_ID() {
		return PERMISSION_PART_ID;
	}

	/**
	 * @param pERMISSION_PART_ID the pERMISSION_PART_ID to set
	 */
	public void setPERMISSION_PART_ID(String pERMISSION_PART_ID) {
		PERMISSION_PART_ID = pERMISSION_PART_ID;
	}

	public String getSearchText01() {
		return SearchText01;
	}

	public void setSearchText01(String searchText01) {
		SearchText01 = searchText01;
	}

	

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}
	
	public String getCHILD_ID() {
		return CHILD_ID;
	}

	public void setCHILD_ID(String cHILD_ID) {
		CHILD_ID = cHILD_ID;
	}

	public String getPARENT_ID() {
		return PARENT_ID;
	}

	public void setPARENT_ID(String pARENT_ID) {
		PARENT_ID = pARENT_ID;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getSearchText() {
		return SearchText;
	}

	public void setSearchText(String searchText) {
		SearchText = searchText;
	}

	public String getRESULT() {
		return RESULT;
	}

	public void setRESULT(String rESULT) {
		RESULT = rESULT;
	}

	public String getTRNSC_ID() {
		return TRNSC_ID;
	}

	public void setTRNSC_ID(String tRNSC_ID) {
		TRNSC_ID = tRNSC_ID;
	}

	public String getLOCALE() {
		return LOCALE;
	}

	public void setLOCALE(String lOCALE) {
		LOCALE = lOCALE;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getSTATUS() {
		return this.STATUS;
	}
}
