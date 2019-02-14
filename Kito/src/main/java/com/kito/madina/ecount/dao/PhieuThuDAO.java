package com.kito.madina.ecount.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.ecount.vo.PhieuThuVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.SrvcVO;

import javax.annotation.Resource;

@Repository
public class PhieuThuDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "srvc";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }

	public List<PhieuThuVO> getPhieuThuVOByPhieuThuVO(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();	
		vo.setRESTAR_ID(restarId);
		List<PhieuThuVO> list = getSqlMapClientTemplate().queryForList("getPhieuThuVOByPhieuThuVO", vo);
		return list;
	}

	public List<PhieuThuVO> getPagingListPhieuThu(HashMap<String, Object> map) {
		List<PhieuThuVO> list = getSqlMapClientTemplate().queryForList("getPhieuThu.list.paging", map);
		return list;
	}

	public HashMap<String, Object> getPhieuThuListCount(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> record = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getPhieuThu.getListCount", vo);
		return record;
	}
	public HashMap<String, Object> getPhieuThuPagingCount(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		HashMap<String, Object> record = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getPhieuThu.paging.getListCount", map);
		return record;
	}
	public PhieuThuVO getLastBillCDPhieuThuByIndex(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		PhieuThuVO record = (PhieuThuVO) getSqlMapClientTemplate().queryForObject("getLastBillCDPhieuThuByIndex", vo);
		return record;
	}

	public int createPhieuThuVO(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createPhieuThu", vo);
		return 1;
	}

	public int updatePhieuThuVO(PhieuThuVO vo) {
		Object i = getSqlMapClientTemplate().update("UpdatePhieuThu", vo);
		return 1;
	}

	public PhieuThuVO getPhieuThuByVo(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		PhieuThuVO record = (PhieuThuVO) getSqlMapClientTemplate().queryForObject("getPhieuThuByVo", vo);
		return record;
	}

	public int deletePhieuThuByID(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().delete("deletePhieuThuByVO", vo);
		return 0;
	}
	public int deletePhieuThuByRoomUsedId(PhieuThuVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().delete("deletePhieuThuByRoomUsedId", vo);
		return 0;
	}
	
}
