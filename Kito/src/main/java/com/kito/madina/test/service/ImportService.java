package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;

public interface ImportService {

	public List<ImportVO> getImportVoByObject(ImportVO vo);
	public List<ImportDetailVO> getDetailFromImportVO(ImportVO vo);
	public List<HashMap<String, Object>> getListStatisticImportProfit(ImportVO vo);
	public HashMap<String, Object> getStsImportProfitCount(ImportVO vo);
	public int countImport(ImportVO vo);
	
	public Integer addImport(ImportVO vo);
	public Integer updateImport(ImportVO vo);
	public Integer deleteImport(ImportVO vo);
	
	
	public Integer deleteImportDetailByImportID(ImportDetailVO vo);
	public List<HashMap<String, Object>> getStatisticImport(HashMap<String, Object> vo);
	public List<ImportVO> getImportPaging(ImportVO vo);
	public HashMap<String, Object> getImportCount(ImportVO vo);
	public List<ImportDetailVO> getImportDetailPaging(HashMap<String, Object> map);
	public HashMap<String, Object> getImportDetailPagingCount(HashMap<String, Object> map);
	public List<HashMap<String, Object>> getListMonthlyImport(HashMap<String, Object> vo);
	public List<HashMap<String, Object>> getImportDetailAll(HashMap<String, Object> map);
	
	public Integer updateImportDetail(ImportDetailVO detailVO);
	public Integer addImportDetail(ImportDetailVO vo);
	public Integer deleteImportDetailVOByID(ImportDetailVO dbVO);
	public List<HashMap<String, Object>> getThongKeNhapHangPaging(HashMap<String, String> map);
	public HashMap<String, Object> getThongKeNhapHangCount(HashMap<String, String> map);
}
