package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.ProviderVO;


public interface ProviderService {
	
	public int createProviderVO(ProviderVO vo);
	public int updateProviderVO(ProviderVO vo);
	public int deleteProviderVO(String CD);
	public List<ProviderVO> selectProviderVOByVO(ProviderVO vo);
	public List<ProviderVO> getPagingListProviderVo(ProviderVO vo);
	public HashMap<String, Object> getProviderListCount(ProviderVO vo);
	public List<ProviderVO> selectProviderVOByProviderVO(ProviderVO vo);
}
