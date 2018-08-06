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
	public int createCodeVO(CmmCdUserVO vo);
	public int updateCodeVO(CmmCdUserVO vo);
	public CmmCdUserVO getCmmCdUserVoByCD(List<CmmCdUserVO> _list, int _code);
	public int deleteCmmCdUserVO(int Id);
	//public List getAdmZoneComboList(Map<String, String> params);
	//public List getUsersComboList(Map<String, String> params);
	//public List getPartsComboList(Map<String, String> params);
	
	//public List<Object> getCodePagingList(CodeVO vo);
	//public int getCodeListCount(CodeVO vo);
	//public CodeVO getCodeVO(CodeVO vo);//codeDtlInfo
	//public int updateCodeVO(CodeVO vo);//codeUpdate
	//public int deleteCodeVO(CodeVO vo);//codeDelete
	//public int createCodeVO(CodeVO vo);//codeInsert
	
	//public List getHistoryList(CodeVO vo);
	//public CodeVO getHistoryVO(CodeVO vo);
	
	//public List<HashMap<String,String>> getGroupNmList();
	//public List getNotaryComboList();
	//public List getAgencyComboList(String CDCode);
	
	//use for change right processes - check if an combine code is existed
	//public CodeVO getCombineCodeVO(CodeVO vo);
}
