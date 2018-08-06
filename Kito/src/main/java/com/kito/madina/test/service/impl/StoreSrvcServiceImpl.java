package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.dao.StoreSrvcDAO;
import com.kito.madina.test.dao.MenuDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.StoreSrvcVO;
import com.kito.madina.test.vo.MenuVO;


@Service("storeSrvcService")
public class StoreSrvcServiceImpl implements StoreSrvcService{

	@Autowired
	private StoreSrvcDAO storeSrvcDAO;
	
	@Override  
	public List<StoreSrvcVO> getListStoreSrvcVOByVO(StoreSrvcVO vo){
		List<StoreSrvcVO> list = storeSrvcDAO.getListStoreSrvcVOByVO(vo);
		return list;
	}
	@Override  
	public int CreateStoreSrvcVO(StoreSrvcVO vo){
		int i = storeSrvcDAO.CreateStoreSrvcVO(vo);
		return i;
	}
	@Override  
	public int updateStoreSrvcVo(StoreSrvcVO vo){
		int i = storeSrvcDAO.updateStoreSrvcVo(vo);
		return i;
	}
	@Override  
	public StoreSrvcVO getStoreSrvcVOByVO(StoreSrvcVO vo){
		StoreSrvcVO obj = storeSrvcDAO.getStoreSrvcVOByVO(vo);
		return obj;
	}
	@Override
	public List<StoreSrvcVO> getPagingListStoreSrvc(StoreSrvcVO vo){
		List<StoreSrvcVO> list = storeSrvcDAO.getPagingListStoreSrvc(vo);
		return list;
	}
	@Override
	public HashMap<String, Object> getStoregetListCount(StoreSrvcVO vo){
		HashMap<String, Object> list = storeSrvcDAO.getStoregetListCount(vo);
		return list;
	}
}
