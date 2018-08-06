package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SysMenuVO;

import javax.annotation.Resource;

@Repository
public class SysMenuDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<SysMenuVO> getListSysMenuVoByVO(SysMenuVO vo){
		 vo.setUSE_YN("1");
		List<SysMenuVO> queryForList = (List<SysMenuVO>) getSqlMapClientTemplate().queryForList("selectSysMenuVOByVo", vo);
		return queryForList;
	 }
	public List<SysMenuVO> getMainList(HashMap<String, Object> vo) {
		return (List<SysMenuVO>)getSqlMapClientTemplate().queryForList("System.menu.getMainList", vo);
	}
}
