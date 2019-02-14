package com.kito.madina.ecount.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.test.vo.SrvcVO;

import javax.annotation.Resource;

@Repository
public class PhieuChiDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "srvc";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }

	 public List<PhieuChiVO> getPhieuChiVOByPhieuChiVO(PhieuChiVO vo) {
			// TODO Auto-generated method stub
			return null;
		}

		public List<PhieuChiVO> getPagingListPhieuChi(HashMap<String, Object> map) {
			List<PhieuChiVO> list = getSqlMapClientTemplate().queryForList("getPhieuChi.list.paging", map);
			return list;
		}

		public HashMap<String, Object> getPhieuChiListCount(PhieuChiVO vo) {
			// TODO Auto-generated method stub
			HashMap<String, Object> record = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getPhieuChi.getListCount", vo);
			return record;
		}

		public PhieuChiVO getLastBillCDPhieuChiByIndex(PhieuChiVO vo) {
			// TODO Auto-generated method stub
			PhieuChiVO record = (PhieuChiVO) getSqlMapClientTemplate().queryForObject("getLastBillCDPhieuChiByIndex", vo);
			return record;
		}

		public int createPhieuChiVO(PhieuChiVO vo) {
			// TODO Auto-generated method stub
			Object i = getSqlMapClientTemplate().insert("createPhieuChi", vo);
			return 1;
		}

		public int updatePhieuChiVO(PhieuChiVO vo) {
			Object i = getSqlMapClientTemplate().update("UpdatePhieuChi", vo);
			return 1;
		}

		public PhieuChiVO getPhieuChiByVo(PhieuChiVO vo) {
			// TODO Auto-generated method stub
			PhieuChiVO record = (PhieuChiVO) getSqlMapClientTemplate().queryForObject("getPhieuChiByVo", vo);
			return record;
		}

		public HashMap<String, Object> getPhieuChiPagingCount(HashMap<String, Object> map) {
			// TODO Auto-generated method stub
			HashMap<String, Object> record = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getPhieuChi.paging.getListCount", map);
			return record;
		}
	 
}
