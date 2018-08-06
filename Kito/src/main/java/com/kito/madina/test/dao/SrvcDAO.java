package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.SrvcVO;

import javax.annotation.Resource;

@Repository
public class SrvcDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "srvc";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<SrvcVO> getSrvcVoAll(){
		List queryForList = getSqlMapClientTemplate().queryForList("getSrvcVOAll");
		return queryForList;
	 }
	 public int createSrvcVO(SrvcVO vo){
		Object i = getSqlMapClientTemplate().insert("createSrvcVO", vo);
		return 1;
	 }
	 public int updateSrvcVO(SrvcVO vo){
			Object i = getSqlMapClientTemplate().update("UpdateSrvcVO", vo);
			return 1;
	}
	 public List<SrvcVO> getSrvcVOBySrvcVo(SrvcVO vo){
			List<SrvcVO> list = getSqlMapClientTemplate().queryForList("getSrvcVOBySrvcVo", vo);
			return list;
	}
	 public List<SrvcVO> getPagingListSrvc(SrvcVO vo){
		 List<SrvcVO> queryForList = (List<SrvcVO>) getSqlMapClientTemplate().queryForList("getSrvc.list.paging", vo);
			return queryForList;
	 }
	 public HashMap<String, Object> getSrvcListCount(SrvcVO vo){
		 HashMap<String, Object> map = (HashMap<String, Object>)getSqlMapClientTemplate().queryForObject("getSrvc.getListCount", vo);
		 return map;
	 }
	 public List<HashMap<String, Object>> listImportReport(SrvcVO vo){
		 List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getSrvc.listImportReport", vo);
			return queryForList;
	 }
	public SrvcVO getSrvcVO(SrvcVO vo) {
		// TODO Auto-generated method stub
		SrvcVO map = (SrvcVO)getSqlMapClientTemplate().queryForObject("getSrvcVOBySrvcVo", vo);
		 return map;
	}
	public int updateStatusStore(SrvcVO vo) {
		Object i = getSqlMapClientTemplate().update("updateAmountInStore", vo);
		return 1;
	}
	public int backupSrvcVOToHistory(SrvcVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("backupSrvcVOToHistory", vo);
		return 1;
	}
	public List<SrvcVO> getListSrvcVOHistory(SrvcVO vo) {
		List<SrvcVO> queryForList = (List<SrvcVO>) getSqlMapClientTemplate().queryForList("getSrvcHistoryChange", vo);
		return queryForList;
	}
	public int updateSrvcVOHistory(SrvcVO vo) {
		Object i = getSqlMapClientTemplate().update("updateSrvcVOHistory", vo);
		return 1;
	}
	 
}
