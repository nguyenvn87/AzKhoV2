package com.kito.madina.test.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.dao.RoomSrvcDAO;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;


@Service("roomSrvcService")
public class RoomSrvcServiceImpl implements RoomSrvcService{

	@Autowired
	private RoomSrvcDAO roomSrvcDAO;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Override
	public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo) {
		RoomSrvcVO restaurantVO = roomSrvcDAO.getRoomSrvcVOByObject(vo);
		return restaurantVO;
	}
	@Override
	public int CreateRoomSrvcVO(RoomSrvcVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		vo.setCHANGETIME(eDate.toString());
		int i = roomSrvcDAO.CreateRoomSrvcVO(vo);

		return i;
	}
	@Override
	public int createAnOrder(RoomSrvcVO vo, RoomTurnVO turnBuyVo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		vo.setCHANGETIME(eDate.toString());
		int i = roomSrvcDAO.CreateRoomSrvcVO(vo);
		
		// Update store
		SrvcVO sVo = new SrvcVO();
		sVo.setSRVC_ID(vo.getSRVC_ID());
		sVo.setRESTAR_ID(restarId);
		sVo.setIS_USED(1);
		sVo = srvcService.getSrvcVO(sVo);
		if(turnBuyVo.getIS_DELIVERED() == 1 && sVo != null && vo.getAMOUNT() >= 0){
			float fValue =  vo.getAMOUNT();
			sVo.setAMOUNT_STORE(sVo.getAMOUNT_STORE() - fValue);
			//srvcService.updateSrvcVO(sVo);
			srvcService.popOutStore(sVo, fValue);
		}
		return i;
	}
	@Override  
	public int UpdateRoomSrvcVO(RoomSrvcVO vo){
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		int i = roomSrvcDAO.UpdateRoomSrvcVO(vo);
		return i;
	}
	@Override  
	public List<RoomSrvcVO> getListRoomSrvcVOByID(String roomId){
		List<RoomSrvcVO> list = roomSrvcDAO.getListRoomSrvcVOByID(roomId);
		return list;
	}
	@Override  
	public int deleteRoomSrvcVoByID(int ID){
		return  roomSrvcDAO.deleteRoomSrvcVoByID(ID);
	}
	@Override 
	public List<HashMap<String, Object>> getStatisticExportStore(HashMap<String, Object> map){
		return roomSrvcDAO.getStatisticExportStore(map);
	}
	@Override
	public HashMap<String, Object> getCountSaledSrvc(HashMap<String, Object> map){
		return roomSrvcDAO.getCountSaledSrvc(map);
	}
	@Override
	public List<HashMap<String, Object>> getPagingSaledSrvc(HashMap<String, Object> map){
		return roomSrvcDAO.getPagingSaledSrvc(map);
	}
	@Override
	public int deleteRoomSrvcByRoomUsedId(String roomUsedId){
		return roomSrvcDAO.deleteRoomSrvcByRoomUsedId(roomUsedId);
	}
	@Override
	public List<HashMap<String, Object>> getThongKeBanHang(HashMap<String, String> map){
		return roomSrvcDAO.getThongKeBanHang(map);
	}
	@Override
	public HashMap<String, Object> getThongKeBanHangCount(HashMap<String, String> map){
		return roomSrvcDAO.getThongKeBanHangCount(map);
	}
	@Override
	public int createRoomSrvcHistoryVO(RoomSrvcVO vo){
		int i = roomSrvcDAO.createRoomSrvcHistoryVO(vo);
		return i;
	}
	@Override
	public List<RoomSrvcVO> getListRoomSrvcHistoryVOByID(String roomUsedId){
		List<RoomSrvcVO> list = roomSrvcDAO.getListRoomSrvcHistoryVOByID(roomUsedId);
		return list;
	}
}
