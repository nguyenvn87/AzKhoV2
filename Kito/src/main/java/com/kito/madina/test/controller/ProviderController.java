package com.kito.madina.test.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.ProviderService;
import com.kito.madina.ecount.service.BankAccountService;
import com.kito.madina.ecount.vo.BankAccountVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.ProviderVO;

@Controller
public class ProviderController {
	@Resource(name = "providerService")
	private ProviderService providerService;
	
	@Resource(name = "bankAccountService")
	private BankAccountService bankAccountService;
	
	@RequestMapping(value="/getListAllProvider.json", method = RequestMethod.GET)
	public ModelAndView getListProvider(ProviderVO vo) {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);

		List<ProviderVO> list = providerService.selectProviderVOByProviderVO(vo);
		jvon.setData(list);
		jvon.setSuccess(true);
		
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/bank/getListBankAccount.json", method = RequestMethod.GET)
	public ModelAndView getListBankAccount() {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		BankAccountVO bankVo = new BankAccountVO();
		bankVo.setRESTAR_ID(loginRestautant);

		List<BankAccountVO> list = bankAccountService.getListBankAccountVO(bankVo);
		if(list != null && list.size() > 0){
			boolean isOk = false;
			for(BankAccountVO vo: list){
				if(vo.getID_BANK()!= null && vo.getID_BANK().equalsIgnoreCase(UtilConst.ECOUNT_PAY_METHOD_CASH)){
					isOk = true;
					break;
				}
			}
			if(isOk==false){
				bankVo.setID_BANK(UtilConst.ECOUNT_PAY_METHOD_CASH);
				bankVo.setBANK_NM(PropertyUtil.getStringUTF8("paymethod.cash"));
				bankAccountService.createBankAccountVO(bankVo);
				list.add(bankVo);
			}
		}
		else{
			list = new ArrayList<BankAccountVO>();
			bankVo.setID_BANK(UtilConst.ECOUNT_PAY_METHOD_CASH);
			bankVo.setBANK_NM(PropertyUtil.getStringUTF8("paymethod.cash"));
			bankAccountService.createBankAccountVO(bankVo);
			list.add(bankVo);
		}
		jvon.setData(list);
		jvon.setSuccess(true);
		
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value="/bank/getBankAccountVO.json", method = RequestMethod.GET)
	public ModelAndView getBankAccountVO(BankAccountVO bankVo) {
		
		JsonVO jvon = new JsonVO();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		bankVo.setRESTAR_ID(loginRestautant);

		BankAccountVO bankVO  = bankAccountService.getBankAccountVOByVO(bankVo);
		jvon.setData(bankVO);
		jvon.setSuccess(true);
		
		return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/bank/saveBankAccount.json", method = RequestMethod.POST)
	public ModelAndView saveBankAccount(HttpServletRequest req, BankAccountVO vo) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		vo.setRESTAR_ID(loginRestautant);
		vo.setCHANGE_USER(loginUser);
		if(vo.getID_BANK() != null && !vo.getID_BANK().isEmpty()){
			int i = bankAccountService.updateBankAccountVO(vo);
			jvon.setSuccess(true);
		}
		else{
			int i = bankAccountService.createBankAccountVO(vo);
			jvon.setData(vo);
			jvon.setSuccess(true);
		}
		return new ModelAndView("jsonView", jvon);
	}
}
