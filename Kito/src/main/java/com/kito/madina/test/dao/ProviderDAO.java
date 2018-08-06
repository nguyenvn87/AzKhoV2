package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.ProviderVO;

@Repository
public class ProviderDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "srvc";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public int createProviderVO(ProviderVO vo){
		Object i = getSqlMapClientTemplate().insert("createProviderVO", vo);
		return 1;
	 }
	 public int updateProviderVO(ProviderVO vo){
			Object i = getSqlMapClientTemplate().update("updateProviderVO", vo);
			return 1;
	}
	public List<ProviderVO> selectProviderVOByVO(ProviderVO vo){
			List<ProviderVO> list = getSqlMapClientTemplate().queryForList("selectProviderVOByProviderVO", vo);
			return list;
	}
	 public List<ProviderVO> getPagingListProviderVo(ProviderVO vo){
		 List<ProviderVO> queryForList = (List<ProviderVO>) getSqlMapClientTemplate().queryForList("getProvider.list.paging", vo);
			return queryForList;
	 }
	 public List<ProviderVO> selectProviderVOByProviderVO(ProviderVO vo){
		 List<ProviderVO> queryForList = (List<ProviderVO>) getSqlMapClientTemplate().queryForList("selectProviderVOByProviderVO", vo);
			return queryForList;
	 }
	 public HashMap<String, Object> getProviderListCount(ProviderVO vo){
		 HashMap<String, Object> map = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getProvider.getListCount", vo);
		 return map;
	 }
	public int deleteProviderVO(String cD) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().delete("provider.deleteVo", cD);
		return 0;
	}
	 
}
