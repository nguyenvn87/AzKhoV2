package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.StoreSrvcVO;

import javax.annotation.Resource;

@Repository
public class StoreSrvcDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<StoreSrvcVO> getListStoreSrvcVOByVO(StoreSrvcVO vo){
		
		List<StoreSrvcVO> queryForList = (List<StoreSrvcVO>) getSqlMapClientTemplate().queryForList("getListStoreSrvcVOByVO", vo);
		return queryForList;
	 }
	 public StoreSrvcVO getStoreSrvcVOByID(String _ID){
		 StoreSrvcVO object_ = new StoreSrvcVO();
		 object_.setSRVC_ID(_ID);
		 StoreSrvcVO record = (StoreSrvcVO) getSqlMapClientTemplate().queryForObject("selectStoreSrvcVOByStoreSrvcVO", object_);
		 return record;
	 }
	 public int CreateStoreSrvcVO(StoreSrvcVO vo){
		    vo.setSTORE_ID("KARAO");
			Object i = getSqlMapClientTemplate().insert("CreateStoreSrvcVO", vo);
			return 1;
	}
	 public int updateStoreSrvcVo(StoreSrvcVO vo){
				Object i = getSqlMapClientTemplate().update("updateStoreSrvcVo", vo);
				return 1;
	}
	 public StoreSrvcVO getStoreSrvcVOByVO(StoreSrvcVO vo){
		 StoreSrvcVO queryForList = (StoreSrvcVO) getSqlMapClientTemplate().queryForObject("getStoreSrvcVOByVO", vo);
			return queryForList;
	 }
	 public List<StoreSrvcVO> getPagingListStoreSrvc(StoreSrvcVO vo){
		 List<StoreSrvcVO> queryForList = (List<StoreSrvcVO>) getSqlMapClientTemplate().queryForList("getStore.list.paging", vo);
			return queryForList;
	 }
	 public HashMap<String, Object> getStoregetListCount(StoreSrvcVO vo){
		 HashMap<String, Object> map = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getStore.getListCount", vo);
		 return map;
	 }
}
