package com.kito.madina.test.dao;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.PersonVO;

public class ProjectDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "project.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
		public List<PersonVO> selectAllProject(){
			
			return getSqlMapClientTemplate().queryForList(NAMESPACE + "selectAll");
		}
}
