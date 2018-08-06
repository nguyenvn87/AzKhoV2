package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.dao.SysMenuDAO;
import com.kito.madina.test.dao.MenuDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.SysMenuService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SysMenuVO;
import com.kito.madina.test.vo.MenuVO;


@Service("sysMenuService")
public class SysMenuServiceImpl implements SysMenuService{

	@Autowired
	private SysMenuDAO sysMenuDAO;
	
	@Override  
	public List<SysMenuVO> getListSysMenuVoByVO(SysMenuVO vo){
		List<SysMenuVO> list = sysMenuDAO.getListSysMenuVoByVO(vo);
		return list;
	}
	@Override
	public List getMainList(HashMap<String, Object> vo) {
		// TODO Auto-generated method stub
		return sysMenuDAO.getMainList(vo);
	}
}
