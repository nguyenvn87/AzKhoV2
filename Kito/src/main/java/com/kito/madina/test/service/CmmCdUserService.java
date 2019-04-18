package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;

public interface CmmCdUserService {

	public List getComboList(Map<String, String> params);
	public String getGroupName(String CD_code, String GroupCD, List<HashMap<String, String>> listCode);
	public List<CmmCdUserVO> getListCmmCdUserVO(CmmCdUserVO vo);
	public CmmCdUserVO getCmmCdUserVO(String _Cd);
	public CmmCdUserVO createCodeVO(CmmCdUserVO vo);
	public int updateCodeVO(CmmCdUserVO vo);
	public int deleteCmmCdUserVO(int Id);
	public int deleteCmmCdUserVO(String Id);
	public CmmCdUserVO getCmmCdUserVoByCD(List<CmmCdUserVO> _list, String _code);
	public String getUnitNameFromList(String codeCD, List<CmmCdUserVO> listDonVi, HashMap<String, String> mapDonVi);
	public List<CmmCdUserVO> getListCmmCdUserByGroupCD(String groupCD);
	public CmmCdUserVO getLatestCmmCdUserVOByGroup(String groupCD);
	public String createCodeCDAndGetFromList(String codeNM, List<CmmCdUserVO> listDonVi, HashMap<String, String> mapDonVi, String groupCode);
}
