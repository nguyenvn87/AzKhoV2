package com.kito.madina.sample.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.sample.dao.SampleRoomSrvcDAO;
import com.kito.madina.sample.service.SampleRoomSrvcService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.SrvcVO;


@Service("sampleRoomSrvcService")
public class SampleRoomSrvcServiceImpl implements SampleRoomSrvcService{

	@Autowired
	private SampleRoomSrvcDAO Dao;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Override
	public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo) {
		RoomSrvcVO restaurantVO = Dao.getRoomSrvcVOByObject(vo);
		return restaurantVO;
	}
	@Override
	public int CreateRoomSrvcVO(RoomSrvcVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		vo.setCHANGETIME(eDate.toString());
		int i = Dao.CreateRoomSrvcVO(vo);

		return i;
	}
	@Override  
	public int UpdateRoomSrvcVO(RoomSrvcVO vo){
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		int i = Dao.UpdateRoomSrvcVO(vo);
		return i;
	}
	@Override  
	public List<RoomSrvcVO> getListRoomSrvcVOByID(String roomId){
		List<RoomSrvcVO> list = Dao.getListRoomSrvcVOByID(roomId);
		return list;
	}
}
