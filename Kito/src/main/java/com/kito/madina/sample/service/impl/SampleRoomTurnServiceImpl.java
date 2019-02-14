package com.kito.madina.sample.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.sample.dao.SampleRoomTurnDAO;
import com.kito.madina.sample.service.SampleRoomTurnService;
import com.kito.madina.test.vo.RoomTurnVO;


@Service("sampleRoomTurnService")
public class SampleRoomTurnServiceImpl implements SampleRoomTurnService{

	@Autowired
	private SampleRoomTurnDAO DAO;
	
	@Override
	public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo) {
		RoomTurnVO obj = DAO.getRoomTurnVOByObject(vo);
		return obj;
	}
	@Override
	public int CreateRoomTurnVO(RoomTurnVO vo) {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		int i = DAO.CreateRoomTurnVO(vo);
		return i;
	}
	@Override  
	public int UpdateRoomTurnVO(RoomTurnVO vo){
		int i = DAO.UpdateRoomTurnVO(vo);
		return i;
	}
	@Override  
	public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO vo){
		List<RoomTurnVO> list = DAO.getListRoomTurnVoByVO(vo);
		return list;
	}
}
