package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SrvcVO;

public interface SrvcService {
	
	public List<SrvcVO> getSrvcVOAll();
	public int createSrvcVO(SrvcVO vo);
	public int updateSrvcVO(SrvcVO vo);
	public List<SrvcVO> getSrvcVOBySrvcVo(SrvcVO vo);
	public List<SrvcVO> getPagingListSrvc(SrvcVO vo);
	public HashMap<String, Object> getSrvcListCount(SrvcVO vo);
	public List<HashMap<String, Object>> listImportReport(SrvcVO vo);
	public void createDefaultSrvc(String groupCd, String _restaurantId, String _restarType);
	public SrvcVO getSrvcVO(SrvcVO vo);
	public int updateStatusStore(SrvcVO vo);
	public boolean pushInStore(SrvcVO vo, float value);
	public boolean popOutStore(SrvcVO vo, float value);
	public int backupSrvcVOToHistory(SrvcVO vo);
	public List<SrvcVO> getListSrvcVOHistory(String srvcId, String changeDate);
	public int updateSrvcVOHistory(SrvcVO vo);
}
