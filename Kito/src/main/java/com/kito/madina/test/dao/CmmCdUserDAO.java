package com.kito.madina.test.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;


@Repository
public class CmmCdUserDAO extends SqlMapClientDaoSupport {
	
	@Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	public List getComboList(Map<String, String> params){
		
		return (List<CodeVO>) getSqlMapClientTemplate().queryForList("User.Code.getComboList", params);
	}
	public List<CmmCdUserVO> getListCmmCdUserVO(CmmCdUserVO vo){
		return (List<CmmCdUserVO>) getSqlMapClientTemplate().queryForList("User.Code.getListCmmCdUserVO", vo);
	}
	public CmmCdUserVO getCmmCdUserVO(String _Cd){
		return (CmmCdUserVO) getSqlMapClientTemplate().queryForObject("User.Code.getListCmmCdUserVO", _Cd);
	}
	public CmmCdUserVO createCodeVO(CmmCdUserVO vo){
		try {
			Object i = getSqlMapClientTemplate().insert("User.Code.createCmmCdUserVO", vo);
		}catch(Exception e) {
			return null;
		}
		//return i;
		return vo;
	}
	public int updateCodeVO(CmmCdUserVO vo){
		Object i = getSqlMapClientTemplate().update("User.Code.updateCmmCdUserVO", vo);
		return 1;
	}
	public int deleteCmmCdUserVO(int id) {
		Object i = getSqlMapClientTemplate().delete("User.Code.deleteVo", id);
		return 0;
	}
	public int deleteCmmCdUserVO(String id) {
		Object i = getSqlMapClientTemplate().delete("User.Code.deleteVo", id);
		return 0;
	}
	public List<CmmCdUserVO> getLatestCmmCdUserVOByGroup(CmmCdUserVO vo) {
		// TODO Auto-generated method stub
		return (List<CmmCdUserVO>) getSqlMapClientTemplate().queryForList("User.Code.getLatestCmmCdUserVOByGroup", vo);
	}
}


