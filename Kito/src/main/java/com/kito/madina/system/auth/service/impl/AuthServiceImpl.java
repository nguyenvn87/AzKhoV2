package com.kito.madina.system.auth.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.system.auth.dao.AuthDAO;
import com.kito.madina.system.auth.service.AuthService;
import com.kito.madina.system.auth.vo.RoleGroupVO;
import com.kito.madina.test.dao.MenuDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoleGroupMenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.TreeVO;
import com.kito.madina.test.vo.MenuVO;


@Service("authService")
public class AuthServiceImpl implements AuthService{

	@Autowired
	private AuthDAO authDAO;
	
	@Override
	public List<RoleGroupVO> getListRoleGroupVO(RoleGroupVO vo) {
		List<RoleGroupVO> restaurantVO = authDAO.getListRoleGroupVO(vo);
		return restaurantVO;
	}
	@Override
	public List<HashMap<String, Object>> getMenuTreeList(TreeVO vo) {
		// TODO Auto-generated method stub
		return authDAO.getMenuTreeList(vo);
	}
	@Override
	public int allChange(RoleGroupVO[] menuVo, RoleGroupVO[] roleVo) {
		// TODO Auto-generated method stub
		int result = 0;
		
		if( menuVo!=null && (menuVo.length>0 || roleVo.length>0 )) {
			
			if(menuVo.length>0){
				//authDAO.historyInsert(menuVo[0].getROLEGROUP_ID());
			}else if(roleVo.length>0){
				//authDAO.historyInsert(roleVo[0].getROLEGROUP_ID());
			}else{
				
			}
		}		

		// change menuVo
		if(menuVo!=null && menuVo.length>0) {
			// Remove all by ROLEGROUP_ID
			String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
			RoleGroupMenuVO rgmVo = new RoleGroupMenuVO();
			rgmVo.setRESTAR_ID(restarId);
			rgmVo.setROLEGROUP_ID(menuVo[0].getROLEGROUP_ID());
			//authDAO.deleteRoleGroupMenu(rgmVo);
			for(RoleGroupVO mVo : menuVo) {
				RoleGroupMenuVO newVo = new RoleGroupMenuVO();
				newVo.setRESTAR_ID(restarId);
				newVo.setMENU_ID(mVo.getMENU_ID());
				newVo.setROLEGROUP_ID(mVo.getROLEGROUP_ID());
				newVo.setUSE_YN("Y");
				if(mVo.getUSE_YN() != null && mVo.getUSE_YN().equalsIgnoreCase("Y")){
					Integer mResult = authDAO.insertRoleGroupMenu(newVo);
				}
				else authDAO.deleteRoleGroupMenu(newVo);
				//int mResult = authDAO.menuChange(mVo);
				//result = (mResult>0)? mResult : 0;
				// check error
				//if(result==0)  return result;
			}
		}
		
		return result;
	}
	@Override
	public List<RoleGroupMenuVO> getListRoleGroupMenuVO(RoleGroupVO vo){
		return authDAO.getListRoleGroupMenuVO(vo);
	}
	@Override
	public int insertRoleGroupMenu(RoleGroupMenuVO vo){
		return authDAO.insertRoleGroupMenu(vo);
	}
	@Override
	public int deleteRoleGroupMenu(RoleGroupMenuVO vo){
		return authDAO.deleteRoleGroupMenu(vo);
	}
}
