package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SysMenuVO;

public interface SysMenuService {
	
	public List<SysMenuVO> getListSysMenuVoByVO(SysMenuVO vo);
	public List getMainList(HashMap<String, Object> vo);
}
