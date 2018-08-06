package com.kito.madina.test.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.PersonVO;
import javax.annotation.Resource;

@Repository
public class PersonDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "person.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<PersonVO> selectAllPerson(){
		
		return getSqlMapClientTemplate().queryForList("selectAll");
	}
}
