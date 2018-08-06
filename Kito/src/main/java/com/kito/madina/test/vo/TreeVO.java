package com.kito.madina.test.vo;

import com.kito.madina.cmmn.vo.DefaultVO;

public class TreeVO extends DefaultVO {
    
	String id;
	String text;
	String expanded;
	String info;
	String node;
	boolean leaf;
	String nodeType;
	String iconCls;	
	String ROLEGROUP_ID;
	String crtific_id;
	String CHANGE_TIME;
	private int FOR_ROOM;
	private int FOR_SALE;
	private String RESTAR_ID;
	
	
	public String getCHANGE_TIME() {
		return CHANGE_TIME;
	}
	public void setCHANGE_TIME(String cHANGE_TIME) {
		CHANGE_TIME = cHANGE_TIME;
	}
	public String getCrtific_id() {
		return crtific_id;
	}
	public void setCrtific_id(String crtific_id) {
		this.crtific_id = crtific_id;
	}
	public String getROLEGROUP_ID() {
		return ROLEGROUP_ID;
	}
	public void setROLEGROUP_ID(String rOLEGROUP_ID) {
		ROLEGROUP_ID = rOLEGROUP_ID;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getNodeType() {
		return nodeType;
	}
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}
	public String getNode() {
		return node;
	}
	public void setNode(String node) {
		this.node = node;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getExpanded() {
		return expanded;
	}
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public int getFOR_ROOM() {
		return FOR_ROOM;
	}
	public void setFOR_ROOM(int fOR_ROOM) {
		FOR_ROOM = fOR_ROOM;
	}
	public int getFOR_SALE() {
		return FOR_SALE;
	}
	public void setFOR_SALE(int fOR_SALE) {
		FOR_SALE = fOR_SALE;
	}
	public String getRESTAR_ID() {
		return RESTAR_ID;
	}
	public void setRESTAR_ID(String rESTAR_ID) {
		RESTAR_ID = rESTAR_ID;
	}
	
}
