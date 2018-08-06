package com.kito.madina.system.auth.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.system.auth.vo.RoleGroupVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RoleGroupMenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.TreeVO;

import javax.annotation.Resource;

@Repository
public class AuthDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoleGroupVO> getListRoleGroupVO(RoleGroupVO vo){
		
		List<RoleGroupVO> queryForList = (List<RoleGroupVO>) getSqlMapClientTemplate().queryForList("System.auth.List", vo);
		return queryForList;
	 }
	 public List<RoleGroupMenuVO> getListRoleGroupMenuVO(RoleGroupVO vo){
			
			List<RoleGroupMenuVO> queryForList = (List<RoleGroupMenuVO>) getSqlMapClientTemplate().queryForList("System.auth.ListRoleGroup", vo);
			return queryForList;
		 }
	public List<HashMap<String, Object>> getMenuTreeList(TreeVO vo) {
		// TODO Auto-generated method stub
		if(vo.getNode().equals("root") ){			
			List<HashMap<String, Object>> top_list = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("System.auth.menu.tree", vo);			
			return top_list;
		}else{
			return (List<HashMap<String, Object>>)getSqlMapClientTemplate().queryForList("System.auth.menu.tree", vo);
		}
	}
	public Integer menuChange (RoleGroupVO vo) {		
		return (Integer)getSqlMapClientTemplate().update("System.auth.menu.merge",vo);
	}
	public Integer insertRoleGroupMenu(RoleGroupMenuVO vo) {
		// TODO Auto-generated method stub
		//return (Integer)getSqlMapClientTemplate().insert("CreateCustomerVO", vo);
		Integer i = (Integer)getSqlMapClientTemplate().insert("System.auth.menu.insert",vo);
		return i;
	}
	public Integer deleteRoleGroupMenu(RoleGroupMenuVO vo) {
		// TODO Auto-generated method stub
		return (Integer)getSqlMapClientTemplate().delete("System.auth.menu.delete",vo);
	}
}
