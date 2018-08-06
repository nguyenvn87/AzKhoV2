package com.kito.madina.system.auth.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.system.auth.vo.RoleGroupVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RoleGroupMenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.TreeVO;

public interface AuthService {
	
	public List<RoleGroupVO> getListRoleGroupVO(RoleGroupVO vo);

	public List<HashMap<String, Object>> getMenuTreeList(TreeVO vo);

	public int allChange(RoleGroupVO[] menuVo, RoleGroupVO[] roleVo);
	
	public List<RoleGroupMenuVO> getListRoleGroupMenuVO(RoleGroupVO vo);
	
	public int insertRoleGroupMenu(RoleGroupMenuVO vo);
	
	public int deleteRoleGroupMenu(RoleGroupMenuVO vo);
}
