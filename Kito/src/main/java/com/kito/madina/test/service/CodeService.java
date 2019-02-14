package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.test.vo.CodeVO;

public interface CodeService {

	public List getComboList(Map<String, String> params);
	public String getGroupName(String CD_code, String GroupCD, List<HashMap<String, String>> listCode);
	public List<CodeVO> getListCodeVO(CodeVO vo);
	public int getHaveRoomInRestaurant(String restaurantId, String restarType);
	public int createCodeVO(CodeVO vo);
	public int updateCodeVO(CodeVO vo);//codeUpdate
	public String getUnitNameFromList(String codeCD, List<CodeVO> listDonVi, HashMap<String, String> mapDonVi);
}
