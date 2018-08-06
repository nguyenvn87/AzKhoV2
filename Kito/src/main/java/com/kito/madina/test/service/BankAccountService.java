package com.kito.madina.test.service;

import java.util.List;

import com.kito.madina.test.vo.BankAccountVO;
import com.kito.madina.test.vo.RoomVO;

public interface BankAccountService {
	
	public BankAccountVO getBankAccountVOByVO(BankAccountVO vo);
	public int createBankAccountVO(BankAccountVO vo);
	public int updateBankAccountVO(BankAccountVO vo);
	public List<BankAccountVO> getListBankAccountVO(BankAccountVO vo);
}
