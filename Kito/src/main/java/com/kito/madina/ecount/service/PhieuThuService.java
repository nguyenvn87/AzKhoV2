package com.kito.madina.ecount.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.ecount.vo.PhieuThuVO;
import com.kito.madina.test.vo.RoomTurnVO;

public interface PhieuThuService {
	
	public int createPhieuThuVO(PhieuThuVO vo);
	public int updatePhieuThuVO(PhieuThuVO vo);
	public List<PhieuThuVO> getPhieuThuVOByPhieuThuVO(PhieuThuVO vo);
	public List<PhieuThuVO> getPagingListPhieuThu(HashMap<String, Object> map);
	public HashMap<String, Object> getPhieuThuPagingCount(HashMap<String, Object> map);
	public HashMap<String, Object> getPhieuThuListCount(PhieuThuVO vo);
	public PhieuThuVO getLastBillCDPhieuThuByIndex(String index);
	public PhieuThuVO getPhieuThuByVo(PhieuThuVO phieuThu);
	public int deletePhieuThuByID(String room_USED_ID);
	public int createPhieuThuPayment(RoomTurnVO rVO, PaymentMethodVO payedValue);
	public int deletePhieuThuByRoomUsedId(String roomUsedId);
	public String getNewBillCode();
}
