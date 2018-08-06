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
		return importDAO.addImport(vo);
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
	public List<ImportVO> getImportPaging(ImportVO vo){
		return importDAO.getImportPaging(vo);
	}
	@Override
	public HashMap<String, Object> getImportCount(ImportVO vo){
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
			//float newValue = sVo.getAMOUNT_STORE() + fValue;
			//sVo.setAMOUNT_STORE(newValue);
			//srvcService.updateSrvcVO(sVo);
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
}
