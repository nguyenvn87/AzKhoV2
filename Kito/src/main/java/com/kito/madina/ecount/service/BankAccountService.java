package com.kito.madina.ecount.service;

import java.util.List;

import com.kito.madina.ecount.vo.BankAccountVO;
import com.kito.madina.test.vo.RoomVO;

public interface BankAccountService {
	
	public BankAccountVO getBankAccountVOByVO(BankAccountVO vo);
	public int createBankAccountVO(BankAccountVO vo);
	public int updateBankAccountVO(BankAccountVO vo);
	public List<BankAccountVO> getListBankAccountVO(BankAccountVO vo);
	public void deleteBankObjectByBankID(String id_BANK);
}
