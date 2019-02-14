package com.kito.madina.sample.service;

import java.util.List;

import com.kito.madina.test.vo.RoomSrvcVO;

public interface SampleRoomSrvcService {
	
	public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo);
	public int CreateRoomSrvcVO(RoomSrvcVO vo);
	public int UpdateRoomSrvcVO(RoomSrvcVO vo);
	public List<RoomSrvcVO> getListRoomSrvcVOByID(String roomUseId);
}
