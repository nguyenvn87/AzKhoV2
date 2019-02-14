package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;

@Repository
public class ImportDAO extends SqlMapClientDaoSupport {

	@Resource(name = "sqlMapClient")
	public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
		super.setSqlMapClient(sqlMapClient);
	}

	public List<ImportVO> listImportVO(ImportVO vo) {
		List<ImportVO> list = getSqlMapClientTemplate().queryForList("getImportAll", vo);
		return list;
	}
	/**
	 * param: IMPRT_CD
	 * */
	public List<ImportDetailVO> getDetailFromImportVO(ImportVO vo) {
		List<ImportDetailVO> list = getSqlMapClientTemplate().queryForList("getDetailFromImportVO", vo);
		return list;
	}

	public List<HashMap<String, Object>> getListStatisticImportProfit(ImportVO vo){
		List<HashMap<String, Object>> list = getSqlMapClientTemplate().queryForList("GetListStatisticImportProfit", vo);
		return list;
	}
	public HashMap<String, Object> getStsImportProfitCount(ImportVO vo){
		HashMap<String, Object> list = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getImportProfit.getListCount", vo);
		return list;
	}
	public int countImport(ImportVO vo){
		return (Integer) getSqlMapClientTemplate().queryForObject("countImport", vo);
	}
	
	public Integer addImport(ImportVO vo) {
		return (Integer) getSqlMapClientTemplate().insert("CreateImportVO", vo);
	}
	public Integer updateImport(ImportVO vo) {
		return (Integer) getSqlMapClientTemplate().update("UpdateImportVo", vo);
	}
	public Integer deleteImport(ImportVO vo) {
		return (Integer) getSqlMapClientTemplate().delete("DeleteImportVo", vo);
	}
	
	public Integer addImportDetail(ImportDetailVO vo) {
		return (Integer) getSqlMapClientTemplate().insert("CreateImportDetailVO", vo);
	}
	public Integer deleteImportDetailByImportID(ImportDetailVO vo) {
		return (Integer) getSqlMapClientTemplate().delete("DeleteImportDetailVOByImportID", vo);
	}
	public List<HashMap<String, Object>> getStatisticImport(HashMap<String, Object> vo){
		List<HashMap<String, Object>> list = getSqlMapClientTemplate().queryForList("getStatisticImport", vo);
		return list;
	}
	
	public List<ImportVO> getImportPaging(HashMap<String, Object> vo){
		List<ImportVO> list = getSqlMapClientTemplate().queryForList("getImportPaging", vo);
		return list;
	}
	public HashMap<String, Object> getImportCount(HashMap<String, Object> vo){
		HashMap<String, Object> list = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getImport.getListCount", vo);
		return list;
	}
	public List<ImportDetailVO> getImportDetailPaging(HashMap<String, Object> map) {
		List<ImportDetailVO> list = getSqlMapClientTemplate().queryForList("getImportDetailPaging", map);
		return list;
	}
	public HashMap<String, Object> getImportDetailPagingCount(HashMap<String, Object> map){
		HashMap<String, Object> list = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getImportDetailPaging.getCount", map);
		return list;
	}
	public List<HashMap<String, Object>> getListMonthlyImport(HashMap<String, Object> vo){
		List<HashMap<String, Object>> list = getSqlMapClientTemplate().queryForList("getListMonthlyImport", vo);
		return list;
	}
	public List<HashMap<String, Object>> getImportDetailAll(HashMap<String, Object> map) {
		List<HashMap<String, Object>> list = getSqlMapClientTemplate().queryForList("getImportDetailAll", map);
		return list;
	}

	public Integer updateImportDetail(ImportDetailVO detailVO) {
		// TODO Auto-generated method stub
		return (Integer) getSqlMapClientTemplate().update("updateImportDetail", detailVO);
	}

	public ImportDetailVO getImportDetailVOByID(ImportDetailVO detailVO) {
		// TODO Auto-generated method stub
		return (ImportDetailVO) getSqlMapClientTemplate().queryForObject("getImportDetailVOByID", detailVO);
	}
	public Integer deleteImportDetailVOByID(ImportDetailVO vo) {
		return (Integer) getSqlMapClientTemplate().delete("deleteImportDetailVOByID", vo);
	}

	public List<HashMap<String, Object>> getThongKeNhapHangPaging(HashMap<String, String> map) {
		// TODO Auto-generated method stub
		List<HashMap<String, Object>> list = getSqlMapClientTemplate().queryForList("getThongKeNhapHangPaging", map);
		return list;
	}

	public HashMap<String, Object> getThongKeNhapHangCount(HashMap<String, String> map) {
		// TODO Auto-generated method stub
		return (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getThongKeNhapHangCount", map);
	}
	public HashMap<String, Object> getDetailSrvcCount(HashMap<String, Object> map){
		HashMap<String, Object> list = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getImport.getDetailSrvcCount", map);
		return list;
	}

	public ImportVO getLastIDImportIndex(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		ImportVO obj = (ImportVO) getSqlMapClientTemplate().queryForObject("getLastIDImportIndex", map);
		return obj;
	}
}
