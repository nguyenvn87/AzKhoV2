package com.kito.madina.test.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.BankAccountVO;
import com.kito.madina.test.vo.RoomVO;
import javax.annotation.Resource;

@Repository
public class BankAccountDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "person.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	public BankAccountVO getBankAccountVOByVO(BankAccountVO vo) {
		
		BankAccountVO record = (BankAccountVO) getSqlMapClientTemplate().queryForObject("getBankAccountVOByVO", vo);
		// TODO Auto-generated method stub
		return record;
	}
	public int createBankAccountVO(BankAccountVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createBankAccountVO", vo);
		return 1;
	}
	public int updateBankAccountVO(BankAccountVO vo) {
		Object i = getSqlMapClientTemplate().update("updateBankAccountVO", vo);
		return 1;
	}
	public List<BankAccountVO> getListBankAccountVO(BankAccountVO vo) {
		// TODO Auto-generated method stub
		List<BankAccountVO> queryForList = (List<BankAccountVO>) getSqlMapClientTemplate().queryForList("getListBankAccountVO", vo);
		return queryForList;
	}
}
