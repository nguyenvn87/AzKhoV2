package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.test.vo.UserVO;

public interface UserService {
	
	public List<UserVO> getUserAll(UserVO vo);
	public int createUserVo(UserVO vo);
	public int updateUserVO(UserVO vo);
	public List<UserVO> selectUserByUserNM(UserVO vo);
	public UserVO getUserVo(UserVO vo);
	public List<UserVO> getPagingListUser(UserVO vo);
	public HashMap<String, Object> getUserListCount(UserVO vo);
	public int createUserRight(UserVO vo);
	public int updateUserRight(UserVO vo);
	public int deleteUserVo(UserVO username);
	public List<UserVO> getListAllUser(UserVO vo);
	public JsonVO validateUser(UserVO user);
	public boolean checkLogin(UserVO vo);
	public UserVO getUserVoByUsername(String username);
}
