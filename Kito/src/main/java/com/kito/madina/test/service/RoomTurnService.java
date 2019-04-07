package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.RoomTurnVO;

public interface RoomTurnService {
	
	public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo);
	public int CreateRoomTurnVO(RoomTurnVO vo);
	public int UpdateRoomTurnVO(RoomTurnVO vo);
	public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO roomId);
	public List<RoomTurnVO> getListTurnStatistic(HashMap<String, Object> map);
	public List<RoomTurnVO> getListPagingTurnStatistic(HashMap<String, Object> map);
	public HashMap<String, Object> getTotalStatisticCount(HashMap<String, Object> map);
	public List<HashMap<String, Object>> getListMonthlyProfit(HashMap<String, Object> map);
	public List<HashMap<String, Object>> getListDailyProfit(HashMap<String, Object> map);
	public int deleteRoomTurnByRoomUsedId(String RoomUsedId);
	public String generateBillCode(String preCode);
	public String generateNewBillCode();
	public int createRoomTurnHistoryVO(RoomTurnVO vo);
	public List<RoomTurnVO> getDeletedBillHistory(HashMap<String, Object> map);
	public HashMap<String, Object> getDeletedBillHistoryCount(HashMap<String, Object> map);
	public RoomTurnVO getRoomTurnHistoryVOByObject(RoomTurnVO rtVo);
	public RoomTurnVO getLastRoomTurnByIndex(int index, String typeBill);
}
