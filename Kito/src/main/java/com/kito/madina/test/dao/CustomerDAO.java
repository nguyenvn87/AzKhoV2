package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.CustomerVO;

import javax.annotation.Resource;

@Repository
public class CustomerDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "person.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<CustomerVO> getListCustomerVO(CustomerVO vo){
		
		List<CustomerVO> queryForList = (List<CustomerVO>) getSqlMapClientTemplate().queryForList("getListCustomerVOByVo", vo);
		return queryForList;
	 }
	 public CustomerVO getCustomerVOByVo(CustomerVO object_){
		 CustomerVO record = (CustomerVO) getSqlMapClientTemplate().queryForObject("getCustomerVOByVo", object_);
		 return record;
	 }
	 public Integer createCustomerVO(CustomerVO vo){
		 return (Integer)getSqlMapClientTemplate().insert("CreateCustomerVO", vo);
	}
	 public int updateCustomerVO(CustomerVO vo){
				Object i = getSqlMapClientTemplate().update("UpdateCustomerVO", vo);
				return 1;
	}
	 public List<CustomerVO> getSearchListAllCustomer(CustomerVO map){
		 List<CustomerVO> queryForList = (List<CustomerVO>) getSqlMapClientTemplate().queryForList("selectSearchCustomerList", map);
			return queryForList;
	 }
	public HashMap<String, Object> getListCountSearchCustomer(CustomerVO map) {
		HashMap<String, Object> _object = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getListCountSearchCustomer", map);
		 return _object;
	}
}
