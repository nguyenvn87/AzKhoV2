package com.kito.madina.test.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.dao.CmmCdUserDAO;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.vo.CmmCdUserVO;


@Service("cmmCdUserService")
public class CmmCdUserServiceImpl implements CmmCdUserService {

	@Autowired
	private CmmCdUserDAO codeDao;
	
	public List getComboList(Map<String, String> params) {
		
		return codeDao.getComboList(params);
	}
	public String getGroupName(String CD_code, String GroupCD, List<HashMap<String, String>> listCode){
		
		String groupName = null;
		HashMap<String, String> mapCd = new HashMap<String, String>();
		mapCd.put("GROUP_CD", GroupCD);
		//List<HashMap<String, String>> listCode = codeDao.getComboList(mapCd);
		for(HashMap<String, String> coMap : listCode){
    		if(coMap.get("VALUE").equalsIgnoreCase(CD_code.trim())){
    			groupName = coMap.get("DISPLAY");
    			groupName = groupName.trim();
    			break;
    		}
    	}
		return groupName;
	}
	public List<CmmCdUserVO> getListCmmCdUserVO(CmmCdUserVO vo){
		return codeDao.getListCmmCdUserVO(vo);
	}
	public CmmCdUserVO getCmmCdUserVO(String _Cd){
		return codeDao.getCmmCdUserVO(_Cd);
	}

	/*
	 * public int createCodeVO(CmmCdUserVO vo){ vo.setUSE_YN(UtilConst.USE_YN_Y);
	 * return codeDao.createCodeVO(vo); }
	 */
	public CmmCdUserVO createCodeVO(CmmCdUserVO vo){
		CmmCdUserVO lastVO = this.getLatestCmmCdUserVOByGroup(vo.getGROUP_CD());
		String newCDI = "100";
		if(lastVO != null && lastVO.getCD_NO()!= null && !lastVO.getCD_NO().isEmpty()) {
			int newCD = Integer.parseInt(lastVO.getCD_NO())+1;
			 newCDI = newCD+"";
		}
		vo.setCD(newCDI);
		vo.setCD_NO(newCDI);
		vo.setUSE_YN("Y");
		return codeDao.createCodeVO(vo);
	}
	public int updateCodeVO(CmmCdUserVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		if(vo.getUSE_YN()==null|| vo.getUSE_YN().isEmpty())
			vo.setUSE_YN(UtilConst.USE_YN_Y);
		else vo.setUSE_YN(UtilConst.USE_YN_N);
		vo.setRESTAR_ID(restarId);
		return codeDao.updateCodeVO(vo);
	}

	/*
	 * public CmmCdUserVO getCmmCdUserVoByCD(List<CmmCdUserVO> _list, int _code){
	 * CmmCdUserVO vo = new CmmCdUserVO();
	 * 
	 * if(_list != null && _list.size() > 0){ for (CmmCdUserVO cVo : _list) {
	 * if(cVo.getCD() == _code){ return cVo; } } } return vo; }
	 */
	public int deleteCmmCdUserVO(int Id){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		return codeDao.deleteCmmCdUserVO(Id);
	}
	public int deleteCmmCdUserVO(String Id){
		return codeDao.deleteCmmCdUserVO(Id);
	}
	public CmmCdUserVO getCmmCdUserVoByCD(List<CmmCdUserVO> _list, String _code){
		CmmCdUserVO vo = new CmmCdUserVO();
		
		if(_list != null && _list.size() > 0){
			for (CmmCdUserVO cVo : _list) {
				//if(cVo.getCD() == _code){
					return cVo;
				//}
			}
		}
		return vo;
	}
	public List<CmmCdUserVO> getListCmmCdUserByGroupCD(String groupCD){
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		CmmCdUserVO vo = new CmmCdUserVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setGROUP_CD(groupCD);
		vo.setUSE_YN("Y");
		return codeDao.getListCmmCdUserVO(vo);
	}
	public String getUnitNameFromList(String codeCD, List<CmmCdUserVO> listDonVi, HashMap<String, String> mapDonVi){
		String nameStr = "";
		try{
			if(codeCD!= null && !codeCD.isEmpty()){
				if(mapDonVi.get(codeCD)!= null){}
				else{
			    	for(CmmCdUserVO coMap : listDonVi){
			    		if(codeCD.toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(codeCD.toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			nameStr = mapDonVi.get(codeCD)!=null?mapDonVi.get(codeCD):"";
		}catch(Exception e){
			
		}
		return nameStr;
	}
	public CmmCdUserVO getLatestCmmCdUserVOByGroup(String groupCD) {
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		CmmCdUserVO vo = new CmmCdUserVO();
		vo.setRESTAR_ID(loginRestautant);
		vo.setGROUP_CD(groupCD);
		vo.setUSE_YN("Y");
		CmmCdUserVO voOut = null;
		List<CmmCdUserVO> list = codeDao.getLatestCmmCdUserVOByGroup(vo);
		if(list != null && list.size() > 0) {
			voOut = list.get(list.size()-1);
		}
		return voOut;
	}
}


