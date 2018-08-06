package com.kito.madina.test.service;

import java.util.List;

import com.kito.madina.test.vo.RoomVO;

public interface RoomService {
	
	public RoomVO getRoomVoByObject(String Id);
	public int CreateRoomVO(RoomVO vo);
	public int UpdateRoomVo(RoomVO vo);
	public List<RoomVO> getListRoomVoByRoomVO(RoomVO vo);
}
