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
public class CodeDAO extends SqlMapClientDaoSupport {
	
	@Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	public List getComboList(Map<String, String> params){
		
		return (List<CodeVO>) getSqlMapClientTemplate().queryForList("System.Code.getComboList", params);
	}
	public int createCodeVO(CmmCdUserVO vo){
		Object i = getSqlMapClientTemplate().insert("User.Code.createCmmCdUserVO", vo);
		return 1;
	}
	public int updateCodeVO(CmmCdUserVO vo){
		Object i = getSqlMapClientTemplate().insert("User.Code.createCmmCdUserVO", vo);
		return 1;
	}
	public List<CodeVO> getListCodeVO(CodeVO vo) {
		return (List<CodeVO>) getSqlMapClientTemplate().queryForList("System.Code.getCodeVO", vo);
	}
	public int createCodeVO(CodeVO vo) {
		Object i = getSqlMapClientTemplate().insert("System.Code.createCodeVO", vo);
		return 1;
	}
	public int updateCodeVO(CodeVO vo) {
		Object i = getSqlMapClientTemplate().insert("System.Code.updateCodeVO", vo);
		return 1;
	}
}


