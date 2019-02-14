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
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.dao.PhieuChiDAO;
import com.kito.madina.ecount.service.PhieuChiService;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.test.dao.SrvcDAO;
import com.kito.madina.test.dao.UserDAO;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
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
}
