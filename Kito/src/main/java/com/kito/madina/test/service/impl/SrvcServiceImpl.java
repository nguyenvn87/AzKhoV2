package com.kito.madina.test.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.dao.SrvcDAO;
import com.kito.madina.test.dao.UserDAO;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;


@Service("srvcService")
public class SrvcServiceImpl implements SrvcService{

	@Autowired
	private SrvcDAO srvcDao;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Override
	public List<SrvcVO> getSrvcVOAll() {
		System.out.println("Size = ");
		List<SrvcVO> list = srvcDao.getSrvcVoAll();
		System.out.println("Size = "+list.size());
		return list;
	}
	@Override
	public int createSrvcVO(SrvcVO vo){
		return srvcDao.createSrvcVO(vo);
	}
	@Override
	public int updateSrvcVO(SrvcVO vo){
		return srvcDao.updateSrvcVO(vo);
	}
	@Override
	public List<SrvcVO> getSrvcVOBySrvcVo(SrvcVO vo){
		return srvcDao.getSrvcVOBySrvcVo(vo);
	}
	@Override 
	public List<SrvcVO> getPagingListSrvc(SrvcVO vo){
		List<SrvcVO> list = srvcDao.getPagingListSrvc(vo);
		return list;
	}
	@Override 
	public HashMap<String, Object> getSrvcListCount(SrvcVO vo){
		HashMap<String, Object> list = srvcDao.getSrvcListCount(vo);
		return list;
	}
	@Override
	public List<HashMap<String, Object>> listImportReport(SrvcVO vo){
		List<HashMap<String, Object>> list = srvcDao.listImportReport(vo);
		return list;
	}
	@Override
	public void createDefaultSrvc(String groupCd, String _restaurantId, String _restarType){
		
		try{
			CodeVO cVo = new CodeVO();
			cVo.setGROUP_CD(UtilConst.GROUP_SRVC);
			cVo.setUSE_YN("Y");
			cVo.setRESTAR_TYPE(_restarType);
			List<CodeVO> cmmList = codeService.getListCodeVO(cVo);
			if(cmmList != null && cmmList.size() >0){
				for(int j=0; j < cmmList.size(); j++){
					CodeVO cmmVo = cmmList.get(j);
					SrvcVO sVo = new SrvcVO();
					sVo.setSRVC_ID(CmmUtil.getGUID());
					sVo.setRESTAR_ID(_restaurantId);
					sVo.setSRVC_NM(cmmVo.getCD_NM());
					sVo.setIS_USED(1);
					try{
						if(cmmVo.getVALUE1() != null && !cmmVo.getVALUE1().isEmpty())
							sVo.setPRICE(cmmVo.getVALUE1());
						else sVo.setPRICE("0");
						if(cmmVo.getVALUE2() != null && !cmmVo.getVALUE2().isEmpty())
							sVo.setIS_DEFAULT(Integer.parseInt(cmmVo.getVALUE2()));
						else sVo.setIS_DEFAULT(0);
					}catch(Exception e){
						
					}
					srvcDao.createSrvcVO(sVo);
				}
			}
		}catch(Exception e){
			System.out.println("Error create default service");
		}
	}
	@Override
	public SrvcVO getSrvcVO(SrvcVO vo){
		return srvcDao.getSrvcVO(vo);
	}
	@Override
	public int updateStatusStore(SrvcVO vo){
		
		return srvcDao.updateStatusStore(vo); 
	}
	@Override
	public boolean pushInStore(SrvcVO vo, float value){
		value = Math.abs(value);
		if(vo.getSRVC_ID() == null || vo.getSRVC_ID().isEmpty()) return false;
		vo.setSRVC_ID(vo.getSRVC_ID());
		vo.setRESTAR_ID(vo.getRESTAR_ID());
		vo.setIS_USED(1);
		SrvcVO storeVo = this.getSrvcVO(vo);
		if(storeVo != null && value > 0){
			backupSrvcVOToHistory(storeVo);
			storeVo.setAMOUNT_STORE(storeVo.getAMOUNT_STORE() + value);
			storeVo.setREASON(null);
			this.updateStatusStore(storeVo);
		}
		return true;
	}
	@Override
	public boolean popOutStore(SrvcVO vo, float value){
		value = Math.abs(value);
		vo.setSRVC_ID(vo.getSRVC_ID());
		vo.setRESTAR_ID(vo.getRESTAR_ID());
		vo.setIS_USED(1);
		SrvcVO storeVo = this.getSrvcVO(vo);
		if(storeVo != null){
			backupSrvcVOToHistory(storeVo);
			storeVo.setAMOUNT_STORE(storeVo.getAMOUNT_STORE() - value);
			storeVo.setREASON(null);
			this.updateStatusStore(storeVo);
		}
		return true;
	}
	@Override
	public int backupSrvcVOToHistory(SrvcVO vo){
		
		try{
			String timeStamp = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
			vo.setHIS_CHANGE_TIME(timeStamp);
			List<SrvcVO> listHis = getListSrvcVOHistory(vo.getSRVC_ID(), timeStamp);
			String txtReason = "";
			if(listHis != null && listHis.size() > 0){
				SrvcVO sVo = listHis.get(0);
				String textNote = sVo.getHIS_NOTE();
				
				if(vo.getREASON() != null && !vo.getREASON().isEmpty()){
					txtReason = vo.getREASON().trim();
				}
				String amountStore = CmmUtil.formatNumber2Money(vo.getAMOUNT_STORE());
				textNote = textNote +"~"+ amountStore +txtReason;
				sVo.setHIS_NOTE(textNote);
				updateSrvcVOHistory(sVo);
			}
			else {
				vo.setHIS_ID(CmmUtil.getGUID());
				if(vo.getREASON() != null && !vo.getREASON().isEmpty()){
					txtReason = vo.getREASON().trim();
				}
				String amountStore = CmmUtil.formatNumber2Money(vo.getAMOUNT_STORE());
				vo.setHIS_NOTE(amountStore+""+txtReason);
				srvcDao.backupSrvcVOToHistory(vo);
			}
			return 1;
		}catch(Exception e){
			return 0;
		}
	}
	@Override
	public List<SrvcVO> getListSrvcVOHistory(String srvcId, String changeDate){
		SrvcVO vo = new SrvcVO();
		vo.setSRVC_ID(srvcId);
		vo.setHIS_CHANGE_TIME(changeDate);
		return srvcDao.getListSrvcVOHistory(vo);
	}
	@Override
	public int updateSrvcVOHistory(SrvcVO vo){
		return srvcDao.updateSrvcVOHistory(vo);
	}
}
