package com.kito.madina.test.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.CodeDAO;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.vo.CodeVO;


@Service("codeService")
public class CodeServiceImpl implements CodeService {

	@Autowired
	private CodeDAO codeDao;
	
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
	public List<CodeVO> getListCodeVO(CodeVO vo){
		return codeDao.getListCodeVO(vo);
	}
	public int getHaveRoomInRestaurant(String restaurantId, String restarType){
		try{
		CodeVO groupVo = new CodeVO();
		groupVo.setGROUP_CD("RESTA");
		groupVo.setUSE_YN("Y");
		groupVo.setCD(restarType);
		
		List<CodeVO> cmmGroupList = this.getListCodeVO(groupVo);
		if(cmmGroupList != null && cmmGroupList.size() > 0){
			CodeVO cVo = cmmGroupList.get(0);
			if(cVo.getVALUE1() != null && cVo.getVALUE1().trim().equalsIgnoreCase("1")){
				return 1;
			}
			else if(cVo.getVALUE1() != null && cVo.getVALUE1().trim().equalsIgnoreCase("0")){
				return 0;
			}
		}
		else return -1;
	}catch(Exception e){
		System.out.println("Error when get CD code !");
	}
	return -1;
	}
	public int createCodeVO(CodeVO vo){
		return codeDao.createCodeVO(vo);
	}
	public int updateCodeVO(CodeVO vo){
		return codeDao.updateCodeVO(vo);
	}
	public String getUnitNameFromList(String codeCD, List<CodeVO> listDonVi, HashMap<String, String> mapDonVi){
		String nameStr = "";
		try{
			if(codeCD!= null && !codeCD.isEmpty()){
				if(mapDonVi.get(codeCD)!= null){}
				else{
			    	for(CodeVO coMap : listDonVi){
			    		if(codeCD.toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
			    			mapDonVi.put(codeCD.toString(), coMap.getCD_NM());
			    			break;
			    		}
			    	}
				}
		    }
			nameStr = mapDonVi.get(codeCD);
		}catch(Exception e){
			
		}
		return nameStr;
	}
}


