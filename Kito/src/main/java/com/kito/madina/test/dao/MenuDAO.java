package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

import javax.annotation.Resource;

@Repository
public class MenuDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<MenuVO> getListMenuVoByMenuVO(MenuVO vo){
		
		List<MenuVO> queryForList = (List<MenuVO>) getSqlMapClientTemplate().queryForList("getListMenuVoByMenuVO", vo);
		return queryForList;
	 }
	 public MenuVO getMenuVoByObject(String _ID){
		 MenuVO object_ = new MenuVO();
		 object_.setMENU_ID(_ID);
		 MenuVO record = (MenuVO) getSqlMapClientTemplate().queryForObject("selectMenuVoByMenuVo", object_);
		 return record;
	 }
	 public int CreateMenuVO(MenuVO vo){
			vo.setMENU_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("CreateMenuVO", vo);
			return 1;
	}
	 public int UpdateMenuVO(MenuVO vo){
				Object i = getSqlMapClientTemplate().update("UpdateMenuVo", vo);
				return 1;
	}
	 public List<MenuVO> getListMenuVoByGroupType(HashMap<String, String> map){
		 List<MenuVO> queryForList = (List<MenuVO>) getSqlMapClientTemplate().queryForList("getListMenuVoByGroupType", map);
			return queryForList;
	 }
	 public List<MenuVO> getPagingListMenu(MenuVO vo){
		 List<MenuVO> queryForList = (List<MenuVO>) getSqlMapClientTemplate().queryForList("getMenu.list.paging", vo);
			return queryForList;
	 }
	 public HashMap<String, Object> getMenuListCount(MenuVO vo){
		 HashMap<String, Object> map = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getMenu.getListCount", vo);
		 return map;
	 }
	 public List<SrvcVO> getSearchListAllMenu(SrvcVO map){
		 List<SrvcVO> queryForList = (List<SrvcVO>) getSqlMapClientTemplate().queryForList("selectSearchMenuList", map);
			return queryForList;
	 }
	public HashMap<String, Object> getListCountSearchMenu(SrvcVO map) {
		HashMap<String, Object> _object = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getListCountSearchMenu", map);
		 return _object;
	}
}
