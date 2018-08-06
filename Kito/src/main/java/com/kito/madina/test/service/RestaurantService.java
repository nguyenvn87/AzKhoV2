package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.UserVO;

public interface RestaurantService {
	
	public RestaurantVO getRestaurantVOByID(String Id);
	public int insertRestaurantVO(RestaurantVO vo);
	public int updateRestaurantVO(RestaurantVO vo);
	public String createAccount(UserVO vo);
	public List<RestaurantVO> getListRestaurantVO(RestaurantVO vo);
	public HashMap<String, Object> getRestaurantListCount(RestaurantVO vo);
	public RestaurantVO getRestaurantLastUseByID(String Id);
	public boolean checkRolePermition(UserVO uVo);
	
}
