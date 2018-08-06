package com.kito.madina.test.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.RoomTurnVO;
import javax.annotation.Resource;

@Repository
public class RoomTurnDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO vo){
		
		List<RoomTurnVO> queryForList = (List<RoomTurnVO>) getSqlMapClientTemplate().queryForList("getListRoomTurnVoByVO", vo);
		return queryForList;
	 }
	 public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo){
		 RoomTurnVO record = (RoomTurnVO) getSqlMapClientTemplate().queryForObject("getRoomTurnVOByObject", vo);
		 return record;
	 }
	 public int CreateRoomTurnVO(RoomTurnVO vo){
			//vo.setROOM_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("createRoomTurnVO", vo);
			return 1;
	}
	 public int UpdateRoomTurnVO(RoomTurnVO vo){
			Object i = getSqlMapClientTemplate().update("updateRoomTurnVO", vo);
			return 1;
	}
	 public List<RoomTurnVO> getListTurnStatistic(HashMap<String, Object> map){
		 List<RoomTurnVO> queryForList = (List<RoomTurnVO>) getSqlMapClientTemplate().queryForList("getListTurnStatistic", map);
			return queryForList;
	 }
	 public List<RoomTurnVO> getListPagingTurnStatistic(HashMap<String, Object> map){
		 List<RoomTurnVO> queryForList = (List<RoomTurnVO>) getSqlMapClientTemplate().queryForList("getStatistic.list.paging", map);
			return queryForList;
	 }
	 public HashMap<String, Object> getTotalStatisticCount(HashMap<String, Object> map){
		 HashMap<String, Object> queryForList = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getStatistic.getListCount", map);
			return queryForList;
	 }
	 public List<HashMap<String, Object>> getListMonthlyProfit(HashMap<String, Object> map){
		 List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getListMonthlyProfit", map);
			return queryForList;
	 }
	 public List<HashMap<String, Object>> getListDailyProfit(HashMap<String, Object> map){
		 List<HashMap<String, Object>> queryForList = (List<HashMap<String, Object>>) getSqlMapClientTemplate().queryForList("getListDailyProfit", map);
			return queryForList;
	 }
	public int deleteRoomTurnByRoomUsedId(String roomUsedId) {
		int iResult = getSqlMapClientTemplate().delete("deleteRoomTurnByRoomUsedId", roomUsedId);
		return iResult;
	}
	public int createRoomTurnHistoryVO(RoomTurnVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createRoomTurnHistoryVO", vo);
		return 1;
	}
	public List<RoomTurnVO> getDeletedBillHistory(HashMap<String, Object> map) {
		List<RoomTurnVO> queryForList = (List<RoomTurnVO>) getSqlMapClientTemplate().queryForList("getStatisticHistory.list.paging", map);
		return queryForList;
	}
	public HashMap<String, Object> getDeletedBillHistoryCount(HashMap<String, Object> map) {
		HashMap<String, Object> queryForList = (HashMap<String, Object>) getSqlMapClientTemplate().queryForObject("getStatisticHistory.getListCount", map);
		return queryForList;
	}
	public RoomTurnVO getRoomTurnHistoryVOByObject(RoomTurnVO vo) {
		RoomTurnVO record = (RoomTurnVO) getSqlMapClientTemplate().queryForObject("getRoomTurnHistoryVOByObject", vo);
		 return record;
	}
}
