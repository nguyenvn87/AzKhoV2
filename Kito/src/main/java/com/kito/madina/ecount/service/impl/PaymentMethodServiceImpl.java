package com.kito.madina.ecount.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.dao.PaymentMethodDAO;
import com.kito.madina.ecount.dao.PhieuThuDAO;
import com.kito.madina.ecount.service.PaymentMethodService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.ecount.vo.PhieuThuVO;

@Service("paymentMethodService")
public class PaymentMethodServiceImpl implements PaymentMethodService{

	@Autowired
	private PaymentMethodDAO objDao;
	
	@Autowired
	private PhieuThuDAO phieuThuDAO;
	
	@Override
	public int createPaymentMethodVO(PaymentMethodVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		int methodId = 0;
		List<PaymentMethodVO> listPvo = this.getListPaymentMethod(vo.getROOM_USED_ID());
		if(listPvo != null && listPvo.size() > 0){
			int method = Integer.parseInt(listPvo.get(0).getMETHOD_ID());
			methodId = method + 1;
		}
		vo.setMETHOD_ID(methodId+"");
		if(vo.getID_BANK()!= null && vo.getID_BANK().equalsIgnoreCase(UtilConst.ECOUNT_PAY_METHOD_CASH)){
			vo.setPAY_TYPE(UtilConst.ECOUNT_PAY_METHOD_CASH);
		}
		objDao.createPaymentMethodVO(vo);
		return 1;
	}
	@Override
	public int updatePaymentMethodVO(PaymentMethodVO vo){
		objDao.updatePaymentMethodVO(vo);
		return 1;
	}
	@Override
	public List<PaymentMethodVO> getPaymentMethodVOByVO(PaymentMethodVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		return objDao.getPaymentMethodVOByVO(vo);
	}
	@Override
	public HashMap<String, Object> getMethodListCount(PaymentMethodVO vo){
		return objDao.getMethodListCount(vo);
	}
	@Override
	public List<PaymentMethodVO> getListPaymentMethod(String roomTurnId){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();	
		PaymentMethodVO vo = new PaymentMethodVO();
		vo.setRESTAR_ID(restarId);
		vo.setROOM_USED_ID(roomTurnId);
		return objDao.getListPaymentMethod(vo);
	}
	@Override
	public List<PaymentMethodVO> getListPhieuThu(String roomTurnId){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();	
		PhieuThuVO vo = new PhieuThuVO();
		vo.setRESTAR_ID(restarId);
		vo.setROOM_USED_ID(roomTurnId);
		List<PhieuThuVO> list = phieuThuDAO.getPhieuThuVOByPhieuThuVO(vo);
		List<PaymentMethodVO> listOut = null;
		
		if(list != null && list.size() > 0){
			listOut = new ArrayList<PaymentMethodVO>();
			for(PhieuThuVO pVo: list){
				PaymentMethodVO mthVo = new PaymentMethodVO();
				mthVo.setID_BANK(pVo.getBANK_ID());
				mthVo.setVALUE(Double.valueOf(pVo.getVALUE()));
				mthVo.setBANK_NM(pVo.getBANK_NM());
				listOut.add(mthVo);
			}
		}
		return listOut;
	}
	@Override
	public void deletePaymentMethodByRoomTurnId(String room_USED_ID){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		PaymentMethodVO vo = new PaymentMethodVO();
		vo.setRESTAR_ID(restarId);
		vo.setROOM_USED_ID(room_USED_ID);
		objDao.deletePaymentMethodByRoomTurnId(vo);
	}
	@Override
	public HashMap<String, String> getPaymentMethodSumaryTurnId(String room_USED_ID){
		HashMap<String, String> map = null;
		//List<PaymentMethodVO> listMethod = getListPaymentMethod(room_USED_ID);
		List<PaymentMethodVO> listMethod = getListPhieuThu(room_USED_ID);
		String method = null;
		String bankID = null;
		String bankNM = null;
		if(listMethod != null && listMethod.size() > 0){
			map = new HashMap<String, String>();
			HashMap<String, String> mapCk = new HashMap<String, String>();
			HashMap<String, String> mapCkMethod = new HashMap<String, String>();
			for(PaymentMethodVO mVo: listMethod){
				if(mapCk.get(mVo.getID_BANK())==null){
					String methodTmp = "";
					String bankIDTmp = "";
					String bankNMTmp = "";
					mapCk.put(mVo.getID_BANK(), "true");
					if(mVo.getID_BANK()!= null && mVo.getID_BANK().equalsIgnoreCase(UtilConst.ECOUNT_PAY_METHOD_CASH)){
						methodTmp =  PropertyUtil.getStringUTF8("paymethod.cash");
						if(method != null) methodTmp = "TM";
						}
					else {
						methodTmp = PropertyUtil.getStringUTF8("paymethod.ebank");
						if(method != null) methodTmp = "CK";
						bankIDTmp = mVo.getID_BANK();
						bankNMTmp = mVo.getBANK_NM();
					}
					if(mapCkMethod.get(methodTmp)== null){
						mapCkMethod.put(methodTmp, "ebank");
						if(method == null)method = methodTmp;
						else method = method +", "+ methodTmp;
					}
					if(bankID == null || bankID.isEmpty()) bankID = bankIDTmp;
					else if(!bankIDTmp.isEmpty()) bankID = bankID+ ", "+bankIDTmp;
					if(bankNMTmp!= null && !bankNMTmp.isEmpty()) bankNM = bankNMTmp;
				}
			}
			map.put("METHOD",method);
			map.put("BANK_ID",bankID);
			map.put("BANK_NM",bankNM);
		}
		return map;
	}
}
