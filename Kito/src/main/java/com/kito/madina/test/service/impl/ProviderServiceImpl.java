package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.ProviderDAO;
import com.kito.madina.test.dao.SrvcDAO;
import com.kito.madina.test.dao.UserDAO;
import com.kito.madina.test.service.ProviderService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.ProviderVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;


@Service("providerService")
public class ProviderServiceImpl implements ProviderService{

	@Autowired
	private ProviderDAO providerDAO;
	
	@Override
	public int createProviderVO(ProviderVO vo){
		return providerDAO.createProviderVO(vo);
	}
	@Override
	public int updateProviderVO(ProviderVO vo){
		return providerDAO.updateProviderVO(vo);
	}
	@Override
	public List<ProviderVO> selectProviderVOByVO(ProviderVO vo){
		return providerDAO.selectProviderVOByVO(vo);
	}
	@Override 
	public List<ProviderVO> getPagingListProviderVo(ProviderVO vo){
		List<ProviderVO> list = providerDAO.getPagingListProviderVo(vo);
		return list;
	}
	@Override 
	public HashMap<String, Object> getProviderListCount(ProviderVO vo){
		HashMap<String, Object> list = providerDAO.getProviderListCount(vo);
		return list;
	}
	@Override
	public List<ProviderVO> selectProviderVOByProviderVO(ProviderVO vo) {
		return providerDAO.selectProviderVOByProviderVO(vo);
	}
	@Override
	public int deleteProviderVO(String CD){
		return providerDAO.deleteProviderVO(CD);
	}
}
