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
import com.kito.madina.ecount.dao.PhieuChiDAO;
import com.kito.madina.ecount.service.PhieuChiService;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.ecount.vo.PhieuThuVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.test.dao.SrvcDAO;
import com.kito.madina.test.dao.UserDAO;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;


@Service("phieuChiService")
public class PhieuChiServiceImpl implements PhieuChiService{

	@Autowired
	private PhieuChiDAO objDao;
	
	
	@Override
	public int createPhieuChiVO(PhieuChiVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.createPhieuChiVO(vo);
	}
	@Override
	public int updatePhieuChiVO(PhieuChiVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.updatePhieuChiVO(vo);
	}
	@Override
	public List<PhieuChiVO> getPhieuChiVOByPhieuChiVO(PhieuChiVO vo){
		return objDao.getPhieuChiVOByPhieuChiVO(vo);
	}
	@Override
	public List<PhieuChiVO> getPagingListPhieuChi(HashMap<String, Object> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return objDao.getPagingListPhieuChi(map);
	}
	@Override
	public HashMap<String, Object> getPhieuChiListCount(PhieuChiVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getPhieuChiListCount(vo);
	}
	@Override
	public PhieuChiVO getLastBillCDPhieuChiByIndex(String index){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		PhieuChiVO vo = new PhieuChiVO();
		vo.setRn1(index);
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getLastBillCDPhieuChiByIndex(vo);
	}
	@Override
	public PhieuChiVO getPhieuChiByVo(PhieuChiVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return objDao.getPhieuChiByVo(vo);
	}
	@Override
	public HashMap<String, Object> getPhieuChiPagingCount(HashMap<String, Object> map){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", loginRestautant);
		return objDao.getPhieuChiPagingCount(map);
	}
	@Override
	public String getNewBillCode(){
		String billCode = "000001";
		PhieuChiVO phieuChi = new PhieuChiVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		phieuChi.setRESTAR_ID(loginRestautant);
		HashMap<String, Object> mapCount = this.getPhieuChiListCount(phieuChi);
		if(mapCount!= null && mapCount.get("COUNT")!= null && !mapCount.get("COUNT").toString().equalsIgnoreCase("0")){
			PhieuChiVO lastest = this.getLastBillCDPhieuChiByIndex("0");
			if(lastest!= null && !lastest.getBILL_CD().isEmpty()){
				int billId = Integer.parseInt(lastest.getBILL_CD());
				billId = billId + 1;
				billCode = CmmUtil.generateBillCode(billId+"", 6);
			}
		}
		return billCode;
	}
	@Override
	public int createPhieuChiPayment(RoomTurnVO rVO, PaymentMethodVO pVo) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		if(pVo.getVALUE() == 0) return 0;
		if(pVo.getID_BANK()== null || pVo.getID_BANK().isEmpty()) return 0;
		try{
			PhieuChiVO phieuChiVO = new PhieuChiVO();
			phieuChiVO.setBILL_CD(this.getNewBillCode());
			phieuChiVO.setCHUNGTU_CODE(rVO.getBILL_CD());
			phieuChiVO.setRECEPT_NM(rVO.getCUS_NM());
			phieuChiVO.setRECEPTER(PropertyUtil.getStringUTF8("other.customer.name"));
			phieuChiVO.setRECEPTER_ADDR(rVO.getDSCRT());
			String description =  (rVO.getDSCRT()!=null && !rVO.getDSCRT().isEmpty())?"("+rVO.getDSCRT()+")":"";
			phieuChiVO.setDESCRIPTION(rVO.getCUS_NM()+ " "+ description);
			phieuChiVO.setVALUE(String.valueOf(pVo.getVALUE()));
			phieuChiVO.setBANK_ID(pVo.getID_BANK());
			phieuChiVO.setBILL_DATE(rVO.getCHANGE_DATE());
			phieuChiVO.setBANK_ID(pVo.getID_BANK());
			phieuChiVO.setCHI_TYPE(UtilConst.ECOUNT_CODE_AUTO);
			phieuChiVO.setCHI_NAME(PropertyUtil.getStringUTF8("other.customer.auto"));
			phieuChiVO.setHACHTOAN_DATE(rVO.getCHANGE_DATE());
			phieuChiVO.setRESTAR_ID(loginRestautant);
			int i = objDao.createPhieuChiVO(phieuChiVO);
			return 1;
		}catch(Exception e){
			System.out.print("Error when saving payment !");
		}
		return 0;
	}
}
