package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.UserVO;

import javax.annotation.Resource;

@Repository
public class RestaurantDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "person.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public RestaurantVO getRestaurantVOByID(String _ID){
		 RestaurantVO object_ = new RestaurantVO();
		 object_.setRESTAR_ID(_ID);
		 RestaurantVO record = (RestaurantVO) getSqlMapClientTemplate().queryForObject("getRestaurantVoByID", object_);
		 return record;
	 }
	 public int insertRestaurantVO(RestaurantVO vo){
			//vo.setRESTAR_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("CreateRestaurantVO", vo);
			return 1;
	}
	 public int updateRestaurantVO(RestaurantVO vo){
				Object i = getSqlMapClientTemplate().update("UpdateRestaurantVo", vo);
				return 1;
	}
	public List<RestaurantVO> getListRestaurantVO(RestaurantVO vo) {
		List<RestaurantVO> list = (List<RestaurantVO>) getSqlMapClientTemplate().queryForList("getListPagingRestaurantVO", vo);
		return list;
	}
	public HashMap<String, Object> getRestaurantListCount(RestaurantVO vo) {
		HashMap<String, Object> map = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getRestaurantVo.getListCount", vo);
		return map;
	}
	public RestaurantVO getRestaurantLastUseByID(String id) {
		// TODO Auto-generated method stub
		RestaurantVO record = (RestaurantVO) getSqlMapClientTemplate().queryForObject("getRestaurantLastUseByID", id);
		 return record;
	}
}
