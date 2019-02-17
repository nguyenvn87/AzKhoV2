package com.kito.madina.test.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.SessionUtil;
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
	public int createCodeVO(CmmCdUserVO vo){
		return codeDao.createCodeVO(vo);
	}
	public int updateCodeVO(CmmCdUserVO vo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		vo.setRESTAR_ID(restarId);
		return codeDao.updateCodeVO(vo);
	}
	public CmmCdUserVO getCmmCdUserVoByCD(List<CmmCdUserVO> _list, int _code){
		CmmCdUserVO vo = new CmmCdUserVO();
		
		if(_list != null && _list.size() > 0){
			for (CmmCdUserVO cVo : _list) {
				if(cVo.getCD() == _code){
					return cVo;
				}
			}
		}
		return vo;
	}
	public int deleteCmmCdUserVO(int Id){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		return codeDao.deleteCmmCdUserVO(Id);
	}
}


