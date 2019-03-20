package com.kito.madina.ecount.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.dao.PhieuThuDAO;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.ecount.vo.PhieuThuVO;
import com.kito.madina.test.vo.RoomTurnVO;

@Service("phieuThuService")
public class PhieuThuServiceImpl implements PhieuThuService{

	@Autowired
	private PhieuThuDAO objDao;
	
	
	@Override
	public int createPhieuThuVO(PhieuThuVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.createPhieuThuVO(vo);
	}
	@Override
	public int createPhieuThuPayment(RoomTurnVO rVO, PaymentMethodVO pVo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		
		if(pVo.getVALUE() == 0) return 0;
		if(pVo.getID_BANK()== null || pVo.getID_BANK().isEmpty()) return 0;
		try{
			PhieuThuVO phieuThuVO = new PhieuThuVO();
			phieuThuVO.setBILL_CD(this.getNewBillCode());
			phieuThuVO.setCHUNGTU_CODE(rVO.getBILL_CD());
			phieuThuVO.setCUSTOMMER(rVO.getCUS_NM());
			phieuThuVO.setNGUOINOP(PropertyUtil.getStringUTF8("other.customer.name"));
			phieuThuVO.setNGUOINOP_ADDR(rVO.getDSCRT());
			
			String description =  (rVO.getDSCRT()!=null && !rVO.getDSCRT().isEmpty())?"("+rVO.getDSCRT()+")":"";
			phieuThuVO.setDESCRIPTION(rVO.getCUS_NM()+" "+description);
			phieuThuVO.setVALUE(String.valueOf(pVo.getVALUE()));
			phieuThuVO.setBANK_NM(pVo.getBANK_NM());
			phieuThuVO.setBILL_DATE(rVO.getCHANGE_DATE());
			phieuThuVO.setRECEIPT_DATE(rVO.getCHANGE_DATE());
			phieuThuVO.setBANK_ID(pVo.getID_BANK());
			phieuThuVO.setTHU_TYPE(UtilConst.ECOUNT_CODE_AUTO);
			phieuThuVO.setTHU_NAME(PropertyUtil.getStringUTF8("other.customer.auto"));
			phieuThuVO.setRESTAR_ID(loginRestautant);
			phieuThuVO.setROOM_USED_ID(rVO.getROOM_USED_ID());
			int i = objDao.createPhieuThuVO(phieuThuVO);
			return 1;
		}catch(Exception e){
			System.out.print("Error when saving payment !");
		}
		return 0;
	}
	@Override
	public int updatePhieuThuVO(PhieuThuVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.updatePhieuThuVO(vo);
	}
	@Override
	public List<PhieuThuVO> getPhieuThuVOByPhieuThuVO(PhieuThuVO vo){
		return objDao.getPhieuThuVOByPhieuThuVO(vo);
	}
	@Override
	public List<PhieuThuVO> getPagingListPhieuThu(HashMap<String, Object> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return objDao.getPagingListPhieuThu(map);
	}
	@Override
	public HashMap<String, Object> getPhieuThuListCount(PhieuThuVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getPhieuThuListCount(vo);
	}
	@Override
	public PhieuThuVO getLastBillCDPhieuThuByIndex(String index){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		PhieuThuVO vo = new PhieuThuVO();
		vo.setRn1(index);
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getLastBillCDPhieuThuByIndex(vo);
	}
	@Override
	public PhieuThuVO getPhieuThuByVo(PhieuThuVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getPhieuThuByVo(vo);
	}
	@Override
	public int deletePhieuThuByID(String room_USED_ID){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		PhieuThuVO vo = new PhieuThuVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setBILL_CD(room_USED_ID);
		return objDao.deletePhieuThuByID(vo);
	}
	@Override
	public int deletePhieuThuByRoomUsedId(String roomUsedId){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		PhieuThuVO vo = new PhieuThuVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setROOM_USED_ID(roomUsedId);
		return objDao.deletePhieuThuByRoomUsedId(vo);
	}
	@Override
	public String getNewBillCode(){
		String billCode = "000001";
		PhieuThuVO phieuThu = new PhieuThuVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		phieuThu.setRESTAR_ID(loginRestautant);
		HashMap<String, Object> mapCount = this.getPhieuThuListCount(phieuThu);
		if(mapCount!= null && mapCount.get("COUNT")!= null && !mapCount.get("COUNT").toString().equalsIgnoreCase("0")){
			PhieuThuVO lastest = this.getLastBillCDPhieuThuByIndex("0");
			if(lastest!= null && !lastest.getBILL_CD().isEmpty()){
				int billId = Integer.parseInt(lastest.getBILL_CD());
				billId = billId + 1;
				billCode = CmmUtil.generateBillCode(billId+"", 6);
			}
		}
		return billCode;
	}
	@Override
	public HashMap<String, Object> getPhieuThuPagingCount(HashMap<String, Object> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return objDao.getPhieuThuPagingCount(map);
	}
}
