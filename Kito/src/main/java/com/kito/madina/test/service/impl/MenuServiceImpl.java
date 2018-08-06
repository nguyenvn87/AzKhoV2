package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.dao.MenuDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.MenuVO;


@Service("menuService")
public class MenuServiceImpl implements MenuService{

	@Autowired
	private MenuDAO MenuDAO;
	
	@Override
	public MenuVO getMenuVoByObject(String _Id) {
		MenuVO restaurantVO = MenuDAO.getMenuVoByObject(_Id);
		return restaurantVO;
	}
	@Override
	public int CreateMenuVO(MenuVO vo) {
		int i = MenuDAO.CreateMenuVO(vo);
		return i;
	}
	@Override  
	public int UpdateMenuVO(MenuVO vo){
		int i = MenuDAO.UpdateMenuVO(vo);
		return i;
	}
	@Override  
	public List<MenuVO> getListMenuVoByMenuVO(MenuVO vo){
		List<MenuVO> list = MenuDAO.getListMenuVoByMenuVO(vo);
		return list;
	}
	@Override  
	public List<MenuVO> getListMenuVoByGroupType(HashMap<String, String> map){
		List<MenuVO> list = MenuDAO.getListMenuVoByGroupType(map);
		return list;
	}
	@Override 
	public List<MenuVO> getPagingListMenu(MenuVO vo){
		List<MenuVO> list = MenuDAO.getPagingListMenu(vo);
		return list;
	}
	@Override 
	public HashMap<String, Object> getMenuListCount(MenuVO vo){
		HashMap<String, Object> list = MenuDAO.getMenuListCount(vo);
		return list;
	}
	@Override 
	public List<SrvcVO> getSearchListAllMenu(SrvcVO map){
		List<SrvcVO> list = MenuDAO.getSearchListAllMenu(map);
		return list;
	}
	@Override 
	public HashMap<String, Object> getListCountSearchMenu(SrvcVO vo){
		HashMap<String, Object> list = MenuDAO.getListCountSearchMenu(vo);
		return list;
	}
}
