package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.StoreSrvcVO;

public interface StoreSrvcService {
	
	public int CreateStoreSrvcVO(StoreSrvcVO vo);
	public List<StoreSrvcVO> getListStoreSrvcVOByVO(StoreSrvcVO vo);
	public int updateStoreSrvcVo(StoreSrvcVO vo);
	public StoreSrvcVO getStoreSrvcVOByVO(StoreSrvcVO vo);
	public List<StoreSrvcVO> getPagingListStoreSrvc(StoreSrvcVO vo);
	public HashMap<String, Object> getStoregetListCount(StoreSrvcVO vo);
}
