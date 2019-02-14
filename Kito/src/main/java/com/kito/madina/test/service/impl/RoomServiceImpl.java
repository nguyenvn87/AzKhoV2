package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.dao.RoomDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomVO;


@Service("roomService")
public class RoomServiceImpl implements RoomService{

	@Autowired
	private RoomDAO RoomDAO;
	
	@Override
	public RoomVO getRoomVoByObject(String _Id) {
		RoomVO restaurantVO = RoomDAO.getRoomVoByObject(_Id);
		return restaurantVO;
	}
	@Override
	public int CreateRoomVO(RoomVO vo) {
		int i = RoomDAO.CreateRoomVO(vo);
		return i;
	}
	@Override  
	public int UpdateRoomVo(RoomVO vo){
		int i = RoomDAO.UpdateRoomVo(vo);
		return i;
	}
	@Override  
	public List<RoomVO> getListRoomVoByRoomVO(RoomVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		List<RoomVO> list = RoomDAO.getListRoomVoByRoomVO(vo);
		return list;
	}
}
