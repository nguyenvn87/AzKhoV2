package com.kito.madina.ecount.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.dao.RoomDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.ecount.dao.BankAccountDAO;
import com.kito.madina.ecount.service.BankAccountService;
import com.kito.madina.ecount.vo.BankAccountVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomVO;


@Service("bankAccountService")
public class BankAccountServiceImpl implements BankAccountService{

	@Autowired
	private BankAccountDAO RoomDAO;
	
	@Override
	public BankAccountVO getBankAccountVOByVO(BankAccountVO vo) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		BankAccountVO restaurantVO = RoomDAO.getBankAccountVOByVO(vo);
		return restaurantVO;
	}
	@Override
	public int createBankAccountVO(BankAccountVO vo) {
		int i = RoomDAO.createBankAccountVO(vo);
		return i;
	}
	@Override  
	public int updateBankAccountVO(BankAccountVO vo){
		int i = RoomDAO.updateBankAccountVO(vo);
		return i;
	}
	@Override  
	public List<BankAccountVO> getListBankAccountVO(BankAccountVO vo){
		List<BankAccountVO> list = RoomDAO.getListBankAccountVO(vo);
		return list;
	}
	@Override  
	public void deleteBankObjectByBankID(String id_BANK){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		BankAccountVO vo = new BankAccountVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setID_BANK(id_BANK);
		RoomDAO.deleteBankObjectByBankID(vo);
	}
}
