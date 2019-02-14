package com.kito.madina.test.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.ImportDAO;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.vo.ImportDetailVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;

@Service("importService")
public class ImportServiceImpl implements ImportService {
	@Autowired
	private ImportDAO importDAO;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Override
	public List<ImportVO> getImportVoByObject(ImportVO vo) {
		return importDAO.listImportVO(vo);
	}

	@Override
	public List<ImportDetailVO> getDetailFromImportVO(ImportVO vo) {
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		return importDAO.getDetailFromImportVO(vo);
	}

	@Override
	public List<HashMap<String, Object>> getListStatisticImportProfit(ImportVO vo){
		return importDAO.getListStatisticImportProfit(vo);
	}
	@Override
	public HashMap<String, Object> getStsImportProfitCount(ImportVO vo){
		return importDAO.getStsImportProfitCount(vo);
	}

	@Override
	public int countImport(ImportVO vo) {
		return importDAO.countImport(vo);
	}

	@Override
	public Integer addImport(ImportVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		ImportVO iVo = this.getLastIDImportIndex(map);
		int idImport = 1;
		if(iVo != null && iVo.getIMPRT_CD() > 0)
			idImport = iVo.getIMPRT_CD()+1;
		vo.setIMPRT_CD(idImport);
		String str = CmmUtil.generateBillCode(vo.getIMPRT_CD()+"", 6);
		vo.setIMPRT_BILL("CD"+str);
		importDAO.addImport(vo);
		return idImport;
		//return importDAO.addImport(vo);
	}

	@Override
	public Integer updateImport(ImportVO vo) {
		return importDAO.updateImport(vo);
	}

	@Override
	public Integer deleteImport(ImportVO vo) {
		return importDAO.deleteImport(vo);
	}

	@Override
	public Integer addImportDetail(ImportDetailVO vo) {
		Integer i = 0;
		try{
			i = importDAO.addImportDetail(vo);
			SrvcVO sVo = new SrvcVO();
			sVo.setSRVC_ID(vo.getSRVC_ID());
			sVo.setRESTAR_ID(vo.getRESTAR_ID());
			sVo.setIS_USED(1);
			if(vo.getIMPRT_PRICE()!= null && Float.parseFloat(vo.getIMPRT_PRICE()) > 0){
				sVo.setPRICE_IMPORT(vo.getIMPRT_PRICE());
			}
			float fValue =  Float.parseFloat(vo.getAMOUNT());
			srvcService.pushInStore(sVo, fValue);
		}catch(Exception e){
			
		}
		return i;
	}

	@Override
	public Integer deleteImportDetailByImportID(ImportDetailVO vo) {
		Integer i = importDAO.deleteImportDetailByImportID(vo);
		return i;
	}
	@Override
	public List<HashMap<String, Object>> getStatisticImport(HashMap<String, Object> vo){
		return importDAO.getStatisticImport(vo);
	}
	@Override
	public List<ImportVO> getImportPaging(HashMap<String, Object> vo){
		return importDAO.getImportPaging(vo);
	}
	@Override
	public HashMap<String, Object> getImportCount(HashMap<String, Object> vo){
		return importDAO.getImportCount(vo);
	}
	@Override
	public List<ImportDetailVO> getImportDetailPaging(HashMap<String, Object> map){
		return importDAO.getImportDetailPaging(map);
	}
	@Override
	public HashMap<String, Object> getImportDetailPagingCount(HashMap<String, Object> map){
		return importDAO.getImportDetailPagingCount(map);
	}
	@Override
	public List<HashMap<String, Object>> getListMonthlyImport(HashMap<String, Object> map){
		return importDAO.getListMonthlyImport(map);
	}
	@Override
	public List<HashMap<String, Object>> getImportDetailAll(HashMap<String, Object> map){
		return importDAO.getImportDetailAll(map);
	}
	@Override
	public Integer updateImportDetail(ImportDetailVO vo){
		
		ImportDetailVO oldVO = importDAO.getImportDetailVOByID(vo);
		Integer i = importDAO.updateImportDetail(vo);
		SrvcVO sVo = new SrvcVO();
		sVo.setSRVC_ID(vo.getSRVC_ID());
		sVo.setRESTAR_ID(vo.getRESTAR_ID());
		sVo.setIS_USED(1);
		sVo = srvcService.getSrvcVO(sVo);
		if(sVo != null && oldVO != null){
			float fValue =  Float.parseFloat(vo.getAMOUNT()) - Float.parseFloat(oldVO.getAMOUNT());
			if(vo.getIMPRT_PRICE()!= null && Float.parseFloat(vo.getIMPRT_PRICE())>0){
				sVo.setPRICE_IMPORT(vo.getIMPRT_PRICE());
			}
			if(fValue > 0) srvcService.pushInStore(sVo, fValue);
			else if(fValue < 0)srvcService.popOutStore(sVo, fValue);
		}
		return i;
	}
	@Override
	public Integer deleteImportDetailVOByID(ImportDetailVO vo) {
		Integer i = importDAO.deleteImportDetailVOByID(vo);
		SrvcVO sVo = new SrvcVO();
		sVo.setSRVC_ID(vo.getSRVC_ID());
		sVo.setRESTAR_ID(vo.getRESTAR_ID());
		sVo.setIS_USED(1);
		sVo = srvcService.getSrvcVO(sVo);
		if(sVo != null && sVo.getAMOUNT_STORE() >= 0){
			float fValue =  Float.parseFloat(vo.getAMOUNT());
			//float newValue = sVo.getAMOUNT_STORE() - fValue;
			//sVo.setAMOUNT_STORE(newValue);
			//srvcService.updateSrvcVO(sVo);
			srvcService.popOutStore(sVo, fValue);
		}
		return i;
	}
	@Override
	public List<HashMap<String, Object>> getThongKeNhapHangPaging(HashMap<String, String> map){
		return importDAO.getThongKeNhapHangPaging(map);
	}
	@Override
	public HashMap<String, Object> getThongKeNhapHangCount(HashMap<String, String> map){
		return importDAO.getThongKeNhapHangCount(map);
	}
	@Override
	public HashMap<String, Object> getDetailSrvcCount(HashMap<String, Object> map){
		return importDAO.getDetailSrvcCount(map);
	}
	@Override
	public ImportVO getLastIDImportIndex(HashMap<String, Object> map){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		map.put("RESTAR_ID", restarId);
		return importDAO.getLastIDImportIndex(map);
	}
}
