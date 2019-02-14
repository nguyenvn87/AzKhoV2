package com.kito.madina.ecount.controller;

import java.io.StringReader;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.BankAccountService;
import com.kito.madina.ecount.service.PaymentMethodService;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.ecount.vo.BankAccountVO;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.ecount.vo.PhieuThuVO;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.vo.RoomTurnVO;

@Controller
public class PaymentController {
	
	/*@Resource(name = "srvcService")
	private SrvcService srvcService;*/
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "paymentMethodService")
	private PaymentMethodService paymentMethodService;
	
	@Resource(name = "bankAccountService")
	private BankAccountService bankAccountService;
	
	@Resource(name = "phieuThuService")
	private PhieuThuService phieuThuService;
	
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/saveImport.json")
	public ModelAndView saveImport(HttpServletRequest request){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		java.util.Date dateStr= new java.util.Date();
		String importJson = request.getParameter("importVO");
		String importDetailJson = request.getParameter("importDetailVO");
		
	
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/deletePaymentAccount.json")
	public ModelAndView deletePaymentAccount(HttpServletRequest request, BankAccountVO bankVO){
		JsonVO jvon = new JsonVO();
		
		if(bankVO.getID_BANK()!= null && !bankVO.getID_BANK().isEmpty()){
			if(!bankVO.getID_BANK().equalsIgnoreCase(UtilConst.ECOUNT_PAY_METHOD_CASH))
			bankAccountService.deleteBankObjectByBankID(bankVO.getID_BANK());
		}
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/savePaymentAccount.json")
	public ModelAndView savePaymentAccount(HttpServletRequest request, BankAccountVO bankVO){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		
		bankVO.setRESTAR_ID(loginRestautant);
		BankAccountVO checkBankVo = bankAccountService.getBankAccountVOByVO(bankVO);
		if(checkBankVo != null) bankAccountService.updateBankAccountVO(bankVO);
		else bankAccountService.createBankAccountVO(bankVO);
		
	
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/getPaymentAccount.json")
	public ModelAndView getPaymentAccount(HttpServletRequest request, BankAccountVO bankVO){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();

		BankAccountVO checkBankVo = bankAccountService.getBankAccountVOByVO(bankVO);
		
		jvon.setData(checkBankVo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/getPaymentInfo.json")
	public ModelAndView getPaymentInfo(HttpServletRequest request){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String roomUsedId = request.getParameter("ROOM_USED_ID");
		//List<PaymentMethodVO> listMethod = (List<PaymentMethodVO>)paymentMethodService.getListPaymentMethod(roomUsedId);
		List<PaymentMethodVO> listMethod = (List<PaymentMethodVO>)paymentMethodService.getListPhieuThu(roomUsedId);
		
		jvon.setData(listMethod);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * @author Nguyen
	 * @date 2018/12/23
	 * @description Update payment method
	 * 
	 * */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_USER')")
	@RequestMapping(value = "/payment/updatePaymentMethod.json", method = RequestMethod.POST)
	public ModelAndView updateBillCustomer(HttpServletRequest req) {
		
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		String roomUseId = req.getParameter("ROOM_USED_ID"); 
		String hasPayed = req.getParameter("HAS_PAYED"); 
		String payMoney = req.getParameter("PAYED_MONEY"); 
		String methodList = req.getParameter("METHOD");
		String loginUser = SessionUtil.getSessionAttribute("loggedUserId").toString();
		RoomTurnVO vo =  new RoomTurnVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setROOM_USED_ID(roomUseId);
		
		RoomTurnVO dbVo = roomTurnService.getRoomTurnVOByObject(vo);
		if(hasPayed != null && hasPayed == "1") dbVo.setHAS_PAYED(1);
		// Save payment method
		List<PaymentMethodVO> listMethod = null;
		if(methodList != null && methodList.length() > 10){
			String data = methodList.replaceAll("&quot;", "\"");
			data = data.replaceAll("false", "N");
			data = data.replaceAll("true", "Y");
			JsonReader reader1 = new JsonReader(new StringReader(data));
			reader1.setLenient(true);	
			listMethod = CmmUtil.jsonToPayMethodList(reader1);
		}
				
		if(hasPayed != null)
			dbVo.setHAS_PAYED((hasPayed != null && hasPayed.equalsIgnoreCase("1"))? 1: 0);
		if(payMoney != null){
			dbVo.setPAYED_MONEY(Float.parseFloat(payMoney));
		}
		if(vo.getROOM_USED_ID() != null && !vo.getROOM_USED_ID().isEmpty()){
			
			// Update status in roomTurn
			dbVo.setUSER_NAME(loginUser);
			roomTurnService.UpdateRoomTurnVO(dbVo);
			jvon.setSuccess(true);
			
			if(listMethod!=null && listMethod.size()>0){
				//paymentMethodService.deletePaymentMethodByRoomTurnId(vo.getROOM_USED_ID());
				phieuThuService.deletePhieuThuByRoomUsedId(vo.getROOM_USED_ID());
				double payedValue = 0;
				for(PaymentMethodVO pVo : listMethod){
					payedValue = payedValue + pVo.getVALUE();
					pVo.setROOM_USED_ID(vo.getROOM_USED_ID());
					if(pVo.getVALUE() > 0){
						//paymentMethodService.createPaymentMethodVO(pVo);
						phieuThuService.createPhieuThuPayment(dbVo, pVo);
					}
				}
				dbVo.setPAYED_MONEY(payedValue);
				roomTurnService.UpdateRoomTurnVO(dbVo);
			}
		}
		else jvon.setSuccess(false);
		return new ModelAndView("jsonView", jvon);
	}
}
