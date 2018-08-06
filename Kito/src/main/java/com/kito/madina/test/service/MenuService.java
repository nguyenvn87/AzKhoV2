package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SrvcVO;

public interface MenuService {
	
	public MenuVO getMenuVoByObject(String _ID);
	public int CreateMenuVO(MenuVO vo);
	public int UpdateMenuVO(MenuVO vo);
	public List<MenuVO> getListMenuVoByMenuVO(MenuVO vo);
	public List<MenuVO> getListMenuVoByGroupType(HashMap<String, String> map);
	public List<MenuVO> getPagingListMenu(MenuVO vo);
	public HashMap<String, Object> getMenuListCount(MenuVO vo);
	public List<SrvcVO> getSearchListAllMenu(SrvcVO map);
	public HashMap<String, Object> getListCountSearchMenu(SrvcVO map);
}
