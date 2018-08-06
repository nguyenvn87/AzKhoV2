package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;

public interface RoomSrvcService {
	
	public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo);
	public int CreateRoomSrvcVO(RoomSrvcVO vo);
	public int UpdateRoomSrvcVO(RoomSrvcVO vo);
	public List<RoomSrvcVO> getListRoomSrvcVOByID(String roomUseId);
	public int deleteRoomSrvcVoByID(int ID);
	public List<HashMap<String, Object>> getStatisticExportStore(HashMap<String, Object> map);
	public HashMap<String, Object> getCountSaledSrvc(HashMap<String, Object> map);
	public List<HashMap<String, Object>> getPagingSaledSrvc(HashMap<String, Object> map);
	public int deleteRoomSrvcByRoomUsedId(String roomUsedId);
	public int createAnOrder(RoomSrvcVO vo, RoomTurnVO turnBuyVo);
	public List<HashMap<String, Object>> getThongKeBanHang(HashMap<String, String> map);
	public HashMap<String, Object> getThongKeBanHangCount(HashMap<String, String> map);
	public int createRoomSrvcHistoryVO(RoomSrvcVO vo);
	public List<RoomSrvcVO> getListRoomSrvcHistoryVOByID(String roomUsedId);
}
