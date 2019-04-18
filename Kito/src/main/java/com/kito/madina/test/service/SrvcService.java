package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
	public int backupSrvcVOToHistory(SrvcVO vo, float currentNumber);
	public List<SrvcVO> getListSrvcVOHistory(String srvcId, String changeDate);
	public int updateSrvcVOHistory(SrvcVO vo);
	public List<SrvcVO> getSrvcHistoryByDate(SrvcVO vo);
	public List<SrvcVO> getListSrvcHistoryBySrvcId(String srvdId, String restarId);
	public boolean checkExistInHistoryStore(String srvcID, List<SrvcVO> store);
	public HashMap<String, Object> getValueInStore(SrvcVO vo);
	public void writeLogChangeStore(String str);
	public List<SrvcVO> importSPListFromExcel(MultipartFile file);
	public void saveList(List<SrvcVO> listSrvc);
}
