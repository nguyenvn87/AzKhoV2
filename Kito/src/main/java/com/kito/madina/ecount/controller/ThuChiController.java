package com.kito.madina.ecount.controller;

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
import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.MessageUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.BankAccountService;
import com.kito.madina.ecount.service.PhieuChiService;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.ecount.vo.BankAccountVO;
import com.kito.madina.ecount.vo.PhieuChiVO;
import com.kito.madina.ecount.vo.PhieuThuVO;

@Controller
public class ThuChiController {
	
	@Resource(name = "phieuThuService")
	private PhieuThuService phieuThuService;
	
	@Resource(name = "phieuChiService")
	private PhieuChiService phieuChiService;
	
	@Resource(name = "bankAccountService")
	private BankAccountService bankAccountService;
	
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/savePhieuThu.json", method = RequestMethod.POST)
	public ModelAndView savePhieuThu(HttpServletRequest request, PhieuThuVO phieuThu){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		java.util.Date dateStr= new java.util.Date();
		String billCD = "";
		if(phieuThu.getBILL_CD()== null || phieuThu.getBILL_CD().isEmpty()){
			HashMap<String, Object> mapCount = phieuThuService.getPhieuThuListCount(phieuThu);
			if(mapCount!= null && mapCount.get("COUNT")!= null && !mapCount.get("COUNT").toString().equalsIgnoreCase("0")){
				PhieuThuVO lastest = phieuThuService.getLastBillCDPhieuThuByIndex("0");
				if(lastest!= null && !lastest.getBILL_CD().isEmpty()){
					int billId = Integer.parseInt(lastest.getBILL_CD());
					billId = billId + 1;
					phieuThu.setBILL_CD(CmmUtil.generateBillCode(billId+"", 6));
					phieuThu.setCHUNGTU_CODE(UtilConst.ECOUNT_CODE_PREFIX_THU+phieuThu.getBILL_CD());
				}
			}
			else phieuThu.setBILL_CD("000001");
			phieuThuService.createPhieuThuVO(phieuThu);
		}
		else{
			phieuThuService.updatePhieuThuVO(phieuThu);
		}
		
		System.out.println("thuchi/savePhieuThu.json"+phieuThu.getBILL_CD() );
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/getPhieuThu.json", method = RequestMethod.GET)
	public ModelAndView getPhieuThu(HttpServletRequest request, PhieuThuVO phieuThu){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		JsonVO jvon = new JsonVO();
		java.util.Date dateStr= new java.util.Date();
		
		PhieuThuVO phieuVo = phieuThuService.getPhieuThuByVo(phieuThu);
		System.out.println("thuchi/savePhieuThu.json"+phieuThu.getBILL_CD() );
		jvon.setData(phieuVo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/getPagingPhieuThu.json", method = RequestMethod.GET)
	public ModelAndView getPagingPhieuThu(HttpServletRequest request, PhieuThuVO vo){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String startDate = request.getParameter("STARTDATE");
		String endDate = request.getParameter("ENDDATE");
		JsonVO jvon = new JsonVO();
		java.util.Date dateStr= new java.util.Date();
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		
		if(vo.getRECEIPT_DATE()!= null && !vo.getRECEIPT_DATE().isEmpty()){
			map.put("RECEIPT_DATE", vo.getRECEIPT_DATE());
		}
		if(vo.getBILL_CD()!= null && !vo.getBILL_CD().isEmpty()){
			map.put("BILL_CD", vo.getBILL_CD());
		}
		if(vo.getTHU_TYPE()!= null && !vo.getTHU_TYPE().isEmpty()){
			map.put("THU_TYPE", vo.getTHU_TYPE());
		}
		
		if(startDate!= null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate!= null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		
		List<PhieuThuVO> list = phieuThuService.getPagingListPhieuThu(map);
		HashMap<String, Object> mapCount = phieuThuService.getPhieuThuPagingCount(map);
		int count = 0;
		if(mapCount != null && mapCount.get("COUNT")!=null){
			count = Integer.parseInt(mapCount.get("COUNT").toString());
		}
		jvon.addObject("SumObj", mapCount);
		jvon.setData(list);
		jvon.setTotalCount(count);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/getPagingPhieuChi.json", method = RequestMethod.GET)
	public ModelAndView getPagingPhieuChi(HttpServletRequest request, PhieuChiVO vo){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		String startDate = request.getParameter("STARTDATE");
		String endDate = request.getParameter("ENDDATE");
		
		JsonVO jvon = new JsonVO();
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		
		if(vo.getHACHTOAN_DATE()!= null && !vo.getHACHTOAN_DATE().isEmpty()){
			map.put("HACHTOAN_DATE", vo.getHACHTOAN_DATE());
		}
		if(vo.getBILL_CD()!= null && !vo.getBILL_CD().isEmpty()){
			map.put("BILL_CD", vo.getBILL_CD());
		}
		if(vo.getCHI_TYPE()!= null && !vo.getCHI_TYPE().isEmpty()){
			map.put("CHI_TYPE", vo.getCHI_TYPE());
		}
		if(startDate!= null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate!= null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		
		List<PhieuChiVO> list = phieuChiService.getPagingListPhieuChi(map);
		HashMap<String, Object> mapCount = phieuChiService.getPhieuChiPagingCount(map);
		int count = 0;
		if(mapCount != null && mapCount.get("COUNT")!=null){
			count = Integer.parseInt(mapCount.get("COUNT").toString());
		}
		jvon.addObject("SumObj", mapCount);
		jvon.setData(list);
		jvon.setTotalCount(count);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/savePhieuChi.json", method = RequestMethod.POST)
	public ModelAndView savePhieuChi(HttpServletRequest request, PhieuChiVO phieuChi){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		JsonVO jvon = new JsonVO();
		
		if(phieuChi.getBILL_CD()== null || phieuChi.getBILL_CD().isEmpty()){
			HashMap<String, Object> mapCount = phieuChiService.getPhieuChiListCount(phieuChi);
			if(mapCount!= null && mapCount.get("COUNT")!= null && !mapCount.get("COUNT").toString().equalsIgnoreCase("0")){
				PhieuChiVO lastest = phieuChiService.getLastBillCDPhieuChiByIndex("0");
				if(lastest!= null && !lastest.getBILL_CD().isEmpty()){
					int billId = Integer.parseInt(lastest.getBILL_CD());
					billId = billId + 1;
					phieuChi.setBILL_CD(CmmUtil.generateBillCode(billId+"", 6));
					phieuChi.setCHUNGTU_CODE(UtilConst.ECOUNT_CODE_PREFIX_CHI+phieuChi.getBILL_CD());
				}
			}
			else phieuChi.setBILL_CD("000001");
			phieuChiService.createPhieuChiVO(phieuChi);
		}
		else{
			phieuChiService.updatePhieuChiVO(phieuChi);
		}
		
		jvon.setData(true);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * @author Nguyen
	 * @description Get phieu chi object
	 * @date 2018/12/20
	 * */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/getPhieuChi.json", method = RequestMethod.GET)
	public ModelAndView getPhieuChi(HttpServletRequest request, PhieuChiVO phieuchi){
		String loginUserID = SessionUtil.getSessionAttribute("loggedUserId").toString();
		JsonVO jvon = new JsonVO();
		
		PhieuChiVO phieuVo = phieuChiService.getPhieuChiByVo(phieuchi);
		jvon.setData(phieuVo);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	/**
	 * @author Nguyen
	 * @description Get overview info
	 * @date 2018/12/20
	 * */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
	@RequestMapping(value = "/phieuthu/getPagingTongQuanThuChi.json", method = RequestMethod.GET)
	public ModelAndView getPagingTongQuanThuChi(HttpServletRequest request, PhieuChiVO vo){
		String startDate = request.getParameter("STARTDATE");
		String endDate = request.getParameter("ENDDATE");
		String isChi = request.getParameter("ISCHI");
		List<PhieuThuVO> listThu = null;
		List<PhieuChiVO> listChi = null;
		List<HashMap<String, Object>> listOut = new ArrayList<HashMap<String,Object>>();
		
		JsonVO jvon = new JsonVO();
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("MIN", vo.getMIN());
		map.put("MAX", vo.getMAX());
		if(startDate!= null && !startDate.isEmpty()) map.put("STARTDATE", startDate);
		if(endDate!= null && !endDate.isEmpty()) map.put("ENDDATE", endDate);
		
		HashMap<String, Object> mapCount = new HashMap<String, Object>();
		HashMap<String, Object> mapCountChi = phieuChiService.getPhieuChiPagingCount(map);
		HashMap<String, Object> mapCountThu = phieuThuService.getPhieuThuPagingCount(map);
		if(isChi!= null && isChi.equalsIgnoreCase("1")){
			listChi = phieuChiService.getPagingListPhieuChi(map);
			mapCount = mapCountChi;
			}
		else{ 
			listThu = phieuThuService.getPagingListPhieuThu(map);
			mapCount = mapCountThu;
		}
		
		
		String messageOk = MessageUtil.getMessage("common.msg.update.ok");
		System.out.println("messageOk = "+messageOk);
		
		if(listThu != null && listThu.size() > 0){
			int count = 0;
			for(PhieuThuVO voTmp: listThu){
				count++;
				HashMap<String, Object> tmpMap = new HashMap<String, Object>();
				tmpMap.put("rn1", count);
				tmpMap.put("BILL_CD", voTmp.getCHUNGTU_CODE());
				tmpMap.put("VALUE", voTmp.getVALUE());
				tmpMap.put("BANK_ID", voTmp.getBANK_ID());
				tmpMap.put("PAY_METHOD", voTmp.getPAY_METHOD());
				tmpMap.put("THUCHI_TYPE", voTmp.getTHU_TYPE());
				tmpMap.put("TYPE", 0);
				tmpMap.put("PERSON", voTmp.getNGUOINOP());
				tmpMap.put("DESCRIPTION", voTmp.getDESCRIPTION());
				tmpMap.put("PAYDATE", voTmp.getRECEIPT_DATE());
				listOut.add(tmpMap);
			}
		}
		if(listChi != null && listChi.size() > 0){
			int count = 0;
			for(PhieuChiVO voTmp: listChi){
				count++;
				HashMap<String, Object> tmpMap = new HashMap<String, Object>();
				tmpMap.put("rn1", count);
				tmpMap.put("BILL_CD", voTmp.getCHUNGTU_CODE());
				tmpMap.put("VALUE", voTmp.getVALUE());
				tmpMap.put("BANK_ID", voTmp.getBANK_ID());
				tmpMap.put("PAY_METHOD", voTmp.getPAY_METHOD());
				tmpMap.put("THUCHI_TYPE", voTmp.getCHI_TYPE());
				tmpMap.put("TYPE", 1);
				tmpMap.put("PERSON", voTmp.getRECEPTER());
				tmpMap.put("DESCRIPTION", voTmp.getDESCRIPTION());
				tmpMap.put("PAYDATE", voTmp.getHACHTOAN_DATE());
				listOut.add(tmpMap);
			}
		}
		int count = 0;
		
		if(mapCount != null && mapCount.get("COUNT")!=null){
			count = Integer.parseInt(mapCount.get("COUNT").toString());
		}
		mapCount.put("chi", mapCountChi.get("total"));
		mapCount.put("thu", mapCountThu.get("total"));
		jvon.setMessage(messageOk);
		jvon.setTotalCount(count);
		jvon.addObject("SumObj", mapCount);
		jvon.setData(listOut);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
}
