package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.UserVO;

import javax.annotation.Resource;

@Repository
public class UserDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "sys_user";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<UserVO> getUserAll(UserVO vo){
		List queryForList = getSqlMapClientTemplate().queryForList("getUserAll", vo);
		return queryForList;
	 }
	 public int createUserVo(UserVO vo){
		
		Object i = getSqlMapClientTemplate().insert("CreateUserVO", vo);
		return 1;
	 }
	 public int updateUserVO(UserVO vo){
			Object i = getSqlMapClientTemplate().update("UpdateUserVo", vo);
			return 1;
	}
	 public List<UserVO> selectUserByUserNM(UserVO vo){
			List<UserVO> list = getSqlMapClientTemplate().queryForList("selectUserByUserNM", vo);
			return list;
	}
	 public UserVO getUserVo(UserVO vo){
		 
		 UserVO vo1 = (UserVO) getSqlMapClientTemplate().queryForObject("getUserVoByUserName", vo);
		 return vo1;
	 }
	 public List<UserVO> getPagingListUser(UserVO vo){
		 List<UserVO> queryForList = (List<UserVO>) getSqlMapClientTemplate().queryForList("getUsers.list.paging", vo);
			return queryForList;
	 }
	 public HashMap<String, Object> getUserListCount(UserVO vo){
		 HashMap<String, Object> map = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getUsers.getListCount", vo);
		 return map;
	 }
	 public int createUserRight(UserVO vo){
			
			Object i = getSqlMapClientTemplate().insert("createUserRight", vo);
			return 1;
	}
	 public int updateUserRight(UserVO vo){
			Object i = getSqlMapClientTemplate().update("updateUserRight", vo);
			return 1;
	}
	 public int deleteUserVo(UserVO username){
		 return (Integer)getSqlMapClientTemplate().delete("deleteUserVo", username);
	 }
	public List<UserVO> getListAllUser(UserVO vo) {
		// TODO Auto-generated method stub
		List<UserVO> list = getSqlMapClientTemplate().queryForList("getListAllUser", vo);
		return list;
	}
}
