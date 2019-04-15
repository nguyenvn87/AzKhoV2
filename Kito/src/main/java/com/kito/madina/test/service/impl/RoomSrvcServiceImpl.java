package com.kito.madina.test.service.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.dao.RoomSrvcDAO;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;


@Service("roomSrvcService")
public class RoomSrvcServiceImpl implements RoomSrvcService{

	@Autowired
	private RoomSrvcDAO roomSrvcDAO;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Override
	public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo) {
		RoomSrvcVO restaurantVO = roomSrvcDAO.getRoomSrvcVOByObject(vo);
		return restaurantVO;
	}
	@Transactional
	@Override
	public int CreateRoomSrvcVO(RoomSrvcVO vo) {
		
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		vo.setCHANGETIME(eDate.toString());
		int i = roomSrvcDAO.CreateRoomSrvcVO(vo);
		
		return i;
	}
	@Transactional
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
		sVo.setIS_USED(1);
		sVo = srvcService.getSrvcVO(sVo);
		if(turnBuyVo.getIS_DELIVERED() == 1 && sVo != null && vo.getAMOUNT() >= 0){
			float fValue =  vo.getAMOUNT();
			sVo.setAMOUNT_STORE(sVo.getAMOUNT_STORE() - fValue);
			srvcService.popOutStore(sVo, fValue);
			srvcService.writeLogChangeStore("Out : "+fValue);
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
		
		List<CmmCdUserVO> listDonVi = cmmCdUserService.getListCmmCdUserByGroupCD(UtilConst.GROUP_UNIT);
		HashMap<String, String> mapDonVi = new HashMap<String, String>();
		List<RoomSrvcVO> list = roomSrvcDAO.getListRoomSrvcVOByID(roomId);
		
		for(RoomSrvcVO vo : list) {
			if(vo.getUNIT()!= null && !vo.getUNIT().isEmpty()){
				String unitNm = cmmCdUserService.getUnitNameFromList(vo.getUNIT(), listDonVi, mapDonVi);
				vo.setUNIT_NM(unitNm);
		    }
		}
		return list;
	}
	@Override  
	public int deleteRoomSrvcVoByID(int ID){
		return  roomSrvcDAO.deleteRoomSrvcVoByID(ID);
	}
	@Override 
	public List<HashMap<String, Object>> getStatisticExportStore(HashMap<String, Object> map){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", restarId);
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
	@Override
	public List<HashMap<String, Object>> getChiTietThongKeBanHangTheoNgay(HashMap<String, String> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return roomSrvcDAO.getChiTietThongKeBanHangTheoNgay(map);
	}
	@Override
	public HashMap<String, Object> getCountChiTietBanHangTheoNgay(HashMap<String, String> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return roomSrvcDAO.getCountChiTietBanHangTheoNgay(map);
	}
	@Override
	public int createReturnBill(RoomSrvcVO vo, RoomTurnVO turnBuyVo) {
		
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
		if(turnBuyVo.getIS_RETURN() == 1 && sVo != null && vo.getAMOUNT() > 0){
			float fValue =  vo.getAMOUNT();
			sVo.setAMOUNT_STORE(sVo.getAMOUNT_STORE() + fValue);
			//srvcService.popOutStore(sVo, fValue);
			srvcService.pushInStore(sVo, fValue);
		}
		return i;
	}
	
}
