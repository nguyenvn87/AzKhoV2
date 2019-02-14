package com.kito.madina.sample.service;

import java.util.List;

import com.kito.madina.test.vo.RoomTurnVO;

public interface SampleRoomTurnService {
	
	public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo);
	public int CreateRoomTurnVO(RoomTurnVO vo);
	public int UpdateRoomTurnVO(RoomTurnVO vo);
	public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO roomId);
}
