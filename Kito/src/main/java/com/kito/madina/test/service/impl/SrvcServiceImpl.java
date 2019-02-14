package com.kito.madina.test.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.taglibs.standard.tag.common.core.SetSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
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
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return srvcDao.createSrvcVO(vo);
	}
	@Override
	public int updateSrvcVO(SrvcVO vo){
		return srvcDao.updateSrvcVO(vo);
	}
	@Override
	public List<SrvcVO> getSrvcVOBySrvcVo(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return srvcDao.getSrvcVOBySrvcVo(vo);
	}
	@Override 
	public List<SrvcVO> getPagingListSrvc(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		if(vo.getSort()==null||vo.getSort().isEmpty())vo.setSort("TYPE_NM");
		List<SrvcVO> list = srvcDao.getPagingListSrvc(vo);
		return list;
	}
	@Override 
	public HashMap<String, Object> getSrvcListCount(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		HashMap<String, Object> list = srvcDao.getSrvcListCount(vo);
		return list;
	}
	@Override
	public List<HashMap<String, Object>> listImportReport(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		List<HashMap<String, Object>> list = srvcDao.listImportReport(vo);
		return list;
	}
	@Override
	public void createDefaultSrvc(String groupCd, String _restaurantId, String _restarType){
	
		SrvcVO VO = new SrvcVO();
		VO.setRESTAR_ID(_restaurantId);
		VO.setIS_USED(1);
		List<SrvcVO> listSrvc = this.getSrvcVOBySrvcVo(VO);
		if(listSrvc == null || listSrvc.size() == 0){
			try{
				CodeVO cVo = new CodeVO();
				cVo.setGROUP_CD(groupCd);
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
						sVo.setAMOUNT_STORE(10);
						sVo.setPRICE_IMPORT("0");
						sVo.setSRVC_CD("SP0000"+(j+1));
						try{
							if(cmmVo.getVALUE1() != null && !cmmVo.getVALUE1().isEmpty())
								sVo.setPRICE(cmmVo.getVALUE1());
							else sVo.setPRICE("0");
							if(cmmVo.getVALUE2() != null && !cmmVo.getVALUE2().isEmpty())
								sVo.setIS_DEFAULT(Integer.parseInt(cmmVo.getVALUE2()));
							else sVo.setIS_DEFAULT(0);
							if(cmmVo.getVALUE3() != null && !cmmVo.getVALUE3().isEmpty())
								sVo.setUNIT(cmmVo.getVALUE3());
							else sVo.setUNIT(null);
						}catch(Exception e){
							
						}
						srvcDao.createSrvcVO(sVo);
					}
				}
			}catch(Exception e){
				System.out.println("Error create default service");
			}
		}
	}
	@Override
	public SrvcVO getSrvcVO(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return srvcDao.getSrvcVO(vo);
	}
	@Override
	public int updateStatusStore(SrvcVO vo){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(loginRestautant);
		return srvcDao.updateStatusStore(vo); 
	}
	@Override
	public boolean pushInStore(SrvcVO vo, float value){
		value = Math.abs(value);
		// START ADD NEW 2018/11/22
		String price = vo.getPRICE_IMPORT();
		// END ADD NEW 2018/11/22
		if(vo.getSRVC_ID() == null || vo.getSRVC_ID().isEmpty()) return false;
		vo.setSRVC_ID(vo.getSRVC_ID());
		vo.setRESTAR_ID(vo.getRESTAR_ID());
		vo.setIS_USED(1);
		SrvcVO storeVo = this.getSrvcVO(vo);
		if(storeVo != null && value > 0){
			float currentNumber = storeVo.getAMOUNT_STORE() + value;
			backupSrvcVOToHistory(storeVo, currentNumber);
			storeVo.setAMOUNT_STORE(currentNumber);
			storeVo.setREASON(null);
			// START ADD NEW 2018/11/22
			if(price != null && !price.isEmpty()){
				storeVo.setPRICE_IMPORT(price);
			}
			// END ADD NEW 2018/11/22
			this.updateStatusStore(storeVo);
		}
		return true;
	}
	@Override
	public boolean popOutStore(SrvcVO vo, float value){
		value = Math.abs(value);
		// START ADD NEW 2018/11/22
		String price = vo.getPRICE_IMPORT();
		// END ADD NEW 2018/11/22
		vo.setSRVC_ID(vo.getSRVC_ID());
		vo.setRESTAR_ID(vo.getRESTAR_ID());
		vo.setIS_USED(1);
		SrvcVO storeVo = this.getSrvcVO(vo);
		if(storeVo != null){
			float currentNumber = storeVo.getAMOUNT_STORE() - value;
			backupSrvcVOToHistory(storeVo, currentNumber);
			storeVo.setAMOUNT_STORE(currentNumber);
			storeVo.setREASON(null);
			if(price != null && !price.isEmpty()){
				storeVo.setPRICE_IMPORT(price);
			}
			this.updateStatusStore(storeVo);
		}
		return true;
	}
	@Override
	public int backupSrvcVOToHistory(SrvcVO vo, float currentNumber){
		
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
				sVo.setAMOUNT_STORE(currentNumber);
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
				vo.setAMOUNT_STORE(currentNumber);
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
	@Override
	public List<SrvcVO> getSrvcHistoryByDate(SrvcVO vo){
		return srvcDao.getSrvcHistoryByDate(vo);
	}
	@Override
	public List<SrvcVO> getListSrvcHistoryBySrvcId(String srvdId, String restarId){
		return srvcDao.getListSrvcHistoryBySrvcId(srvdId, restarId);
	}
	@Override
	public boolean checkExistInHistoryStore(String srvcID, List<SrvcVO> store){
		for(SrvcVO vo : store){
			if(vo.getSRVC_ID().equalsIgnoreCase(srvcID))
				return true;
		}
		return false;
	}
	@Override
	public HashMap<String, Object> getValueInStore(SrvcVO vo){
		return srvcDao.getValueInStore(vo);
	}
}
