package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.UserDAO;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.UserVO;


@Service("userService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO userDao;
	@Override
	public List<UserVO> getUserAll(UserVO vo) {
		System.out.println("Size = ");
		List<UserVO> list = userDao.getUserAll(vo);
		System.out.println("Size = "+list.size());
		return list;
	}
	@Override
	public int createUserVo(UserVO vo){
		vo.setENABLED("1");
		return userDao.createUserVo(vo);
	}
	@Override
	public int updateUserVO(UserVO vo){
		return userDao.updateUserVO(vo);
	}
	@Override
	public List<UserVO> selectUserByUserNM(UserVO vo){
		return userDao.selectUserByUserNM(vo);
	}
	@Override
	public UserVO getUserVo(UserVO vo){
		return userDao.getUserVo(vo);
	}
	@Override
	public List<UserVO> getPagingListUser(UserVO vo){
		return userDao.getPagingListUser(vo);
	}
	@Override
	public HashMap<String, Object> getUserListCount(UserVO vo){
		return userDao.getUserListCount(vo);
	}
	@Override
	public int createUserRight(UserVO vo){
		return userDao.createUserRight(vo);
	}
	@Override
	public int updateUserRight(UserVO vo){
		return userDao.updateUserRight(vo);
	}
	@Override
	public int deleteUserVo(UserVO username){
		return userDao.deleteUserVo(username);
	}
	@Override
	public List<UserVO> getListAllUser(UserVO vo){
		return userDao.getListAllUser(vo);
	}
}
