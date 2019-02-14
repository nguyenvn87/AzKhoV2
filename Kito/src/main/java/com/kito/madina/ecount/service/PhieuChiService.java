package com.kito.madina.ecount.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.ecount.vo.PhieuChiVO;

public interface PhieuChiService {
	
	public int createPhieuChiVO(PhieuChiVO vo);
	public int updatePhieuChiVO(PhieuChiVO vo);
	public List<PhieuChiVO> getPhieuChiVOByPhieuChiVO(PhieuChiVO vo);
	public List<PhieuChiVO> getPagingListPhieuChi(HashMap<String, Object> map);
	public HashMap<String, Object> getPhieuChiListCount(PhieuChiVO vo);
	public PhieuChiVO getLastBillCDPhieuChiByIndex(String index);
	public PhieuChiVO getPhieuChiByVo(PhieuChiVO PhieuChi);
	public HashMap<String, Object> getPhieuChiPagingCount(HashMap<String, Object> map);
}
