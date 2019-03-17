package com.kito.madina.test.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.dao.RoomTurnDAO;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.vo.RoomTurnVO;


@Service("roomTurnService")
public class RoomTurnServiceImpl implements RoomTurnService{

	@Autowired
	private RoomTurnDAO roomTurnDAO;
	
	@Override
	public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo) {
		RoomTurnVO obj = roomTurnDAO.getRoomTurnVOByObject(vo);
		return obj;
	}
	@Override
	public int CreateRoomTurnVO(RoomTurnVO vo) {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		int i = roomTurnDAO.CreateRoomTurnVO(vo);
		return i;
	}
	@Override  
	public int UpdateRoomTurnVO(RoomTurnVO vo){
		int i = roomTurnDAO.UpdateRoomTurnVO(vo);
		return i;
	}
	@Override  
	public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO vo){
		List<RoomTurnVO> list = roomTurnDAO.getListRoomTurnVoByVO(vo);
		return list;
	}
	@Override  
	public List<RoomTurnVO> getListTurnStatistic(HashMap<String, Object> map){
		List<RoomTurnVO> list = roomTurnDAO.getListTurnStatistic(map);
		return list;
	}
	@Override  
	public List<RoomTurnVO> getListPagingTurnStatistic(HashMap<String, Object> map){
		if(map.get("sort")==null || map.get("sort").toString().isEmpty()) map.put("sort", "DESC");
		List<RoomTurnVO> list = roomTurnDAO.getListPagingTurnStatistic(map);
		return list;
	}
	@Override
	public HashMap<String, Object> getTotalStatisticCount(HashMap<String, Object> map){
		HashMap<String, Object> mapResult = roomTurnDAO.getTotalStatisticCount(map);
		return mapResult;
	}
	@Override
	public List<HashMap<String, Object>> getListMonthlyProfit(HashMap<String, Object> map){
		List<HashMap<String, Object>> mapResult = roomTurnDAO.getListMonthlyProfit(map);
		return mapResult;
	}
	@Override
	public List<HashMap<String, Object>> getListDailyProfit(HashMap<String, Object> map){
		List<HashMap<String, Object>> mapResult = roomTurnDAO.getListDailyProfit(map);
		return mapResult;
	}
	@Override
	public int deleteRoomTurnByRoomUsedId(String RoomUsedId){
		return roomTurnDAO.deleteRoomTurnByRoomUsedId(RoomUsedId);
	}
	@Override
	public String generateNewBillCode(){
		String strCodeBill = "HD";
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("RESTAR_ID", restarId);
			HashMap<String, Object> mapCount = roomTurnDAO.getTotalStatisticCount(map);
			String strCount = mapCount.get("COUNT").toString();
			if(strCount != null && strCount.length() > 0){
				
				int iTmp = 6 - strCount.length();
				for(int i=0; i < iTmp; i++){
					strCodeBill = strCodeBill+"0";
				}
				strCodeBill = strCodeBill + strCount;
			}
		}catch(Exception e){
			
		}
		return strCodeBill;
	}
	@Override
	public String generateBillCode(String strCodeBill){
		//String strCodeBill = "HD";
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		try{
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("RESTAR_ID", restarId);
			RoomTurnVO rVo = getLastRoomTurnByIndex(1);
			if(rVo != null && rVo.getBILL_CD().length() > 6){
				String billCode = rVo.getBILL_CD();
				if(billCode.length() > 6){
					String abcd = billCode.substring(billCode.length()-6, billCode.length());
					int iCount = Integer.parseInt(abcd);
					iCount = iCount + 1;
					String strCount = iCount+"";
					if(strCount != null && strCount.length() > 0){
						int iTmp = 6 - strCount.length();
						for(int i=0; i < iTmp; i++){
							strCodeBill = strCodeBill+"0";
						}
						strCodeBill = strCodeBill + strCount;
					}
				}
			}else{
				strCodeBill = generateNewBillCode();
			}
		}catch(Exception e){
			strCodeBill = generateNewBillCode();
		}
		return strCodeBill;
	}
	@Override
	public int createRoomTurnHistoryVO(RoomTurnVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		int i = roomTurnDAO.createRoomTurnHistoryVO(vo);
		return i;
	}
	@Override
	public List<RoomTurnVO> getDeletedBillHistory(HashMap<String, Object> map){
		List<RoomTurnVO> list = roomTurnDAO.getDeletedBillHistory(map);
		return list;
	}
	@Override
	public HashMap<String, Object> getDeletedBillHistoryCount(HashMap<String, Object> map){
		HashMap<String, Object> mapResult = roomTurnDAO.getDeletedBillHistoryCount(map);
		return mapResult;
	}
	@Override
	public RoomTurnVO getRoomTurnHistoryVOByObject(RoomTurnVO vo){
		RoomTurnVO obj = roomTurnDAO.getRoomTurnHistoryVOByObject(vo);
		return obj;
	}
	@Override
	public RoomTurnVO getLastRoomTurnByIndex(int index){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESTAR_ID", restarId);
		map.put("rn1", index);
		RoomTurnVO obj = roomTurnDAO.getLastRoomTurnByIndex(map);
		return obj;
	}
	
}
