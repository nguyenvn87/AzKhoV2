package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.RoomSrvcVO;
import javax.annotation.Resource;

@Repository
public class RoomSrvcDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoomSrvcVO> getListRoomSrvcVOByID(String vo){
		
		List<RoomSrvcVO> queryForList = (List<RoomSrvcVO>) getSqlMapClientTemplate().queryForList("getListRoomSrvcVOByID", vo);
		return queryForList;
	 }
	 public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo){
		 RoomSrvcVO record = (RoomSrvcVO) getSqlMapClientTemplate().queryForObject("getRoomSrvcVOByVo", vo);
		 return record;
	 }
	 public int CreateRoomSrvcVO(RoomSrvcVO vo){
			//vo.setROOM_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("createRoomSrvcVO", vo);
			return 1;
	}
	 public int UpdateRoomSrvcVO(RoomSrvcVO vo){
				Object i = getSqlMapClientTemplate().update("updateRoomSrvcVO", vo);
				return 1;
	}
	 public int deleteRoomSrvcVoByID(int ID){
		 Object i = getSqlMapClientTemplate().delete("deleteRoomSrvcVoByID", ID);
		return 1;
	 }
	 public List<HashMap<String, Object>> getStatisticExportStore(HashMap<String, Object> map){
		 List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getStatisticExportStore", map);
		return queryForList;
	 }
	 public List<HashMap<String, Object>> getPagingSaledSrvc(HashMap<String, Object> map){
		 List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getSrvcSaleList.paging", map);
		return queryForList;
	 }
	 public HashMap<String, Object> getCountSaledSrvc(HashMap<String, Object> map){
		 HashMap<String, Object> queryForList = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getListCount-sale-srvc", map);
			return queryForList;
	 }
	public int deleteRoomSrvcByRoomUsedId(String roomUsedId) {
		// TODO Auto-generated method stub
		int iResult = (int)getSqlMapClientTemplate().delete("deleteRoomSrvcByRoomUsedId",roomUsedId);
		return iResult;
	}
	public List<HashMap<String, Object>> getThongKeBanHang(HashMap<String, String> map) {
		List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getThongKeBanHang", map);
		return queryForList;
	}
	public HashMap<String, Object> getThongKeBanHangCount(HashMap<String, String> map) {
		// TODO Auto-generated method stub 
		HashMap<String, Object> record = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getThongKeBanHangCount", map);
		return record;
	}
	public int createRoomSrvcHistoryVO(RoomSrvcVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createRoomSrvcHistoryVO", vo);
		return 1;
	}
	public List<RoomSrvcVO> getListRoomSrvcHistoryVOByID(String roomUsedId) {
		List<RoomSrvcVO> queryForList = (List<RoomSrvcVO>) getSqlMapClientTemplate().queryForList("getListRoomSrvcVOHistoryByID", roomUsedId);
		return queryForList;
	}
}
