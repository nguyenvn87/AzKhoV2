package com.kito.madina.ecount.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.ecount.vo.PaymentMethodVO;

public interface PaymentMethodService {
	
	public int createPaymentMethodVO(PaymentMethodVO vo);
	public int updatePaymentMethodVO(PaymentMethodVO vo);
	public List<PaymentMethodVO> getPaymentMethodVOByVO(PaymentMethodVO vo);
	public HashMap<String, Object> getMethodListCount(PaymentMethodVO vo);
	public List<PaymentMethodVO> getListPaymentMethod(String roomUseId);
	public void deletePaymentMethodByRoomTurnId(String room_USED_ID);
	public HashMap<String, String> getPaymentMethodSumaryTurnId(String room_USED_ID);
	public List<PaymentMethodVO> getListPhieuThu(String roomTurnId);
}
