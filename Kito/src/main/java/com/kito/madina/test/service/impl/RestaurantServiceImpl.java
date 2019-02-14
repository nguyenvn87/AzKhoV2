package com.kito.madina.test.service.impl;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.dao.RestaurantDAO;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.UserVO;


@Service("restaurantService")
public class RestaurantServiceImpl implements RestaurantService{

	@Autowired
	private RestaurantDAO restaurantDAO;
	
	@Override
	public RestaurantVO getRestaurantVOByID(String _Id) {
		RestaurantVO restaurantVO = restaurantDAO.getRestaurantVOByID(_Id);
		return restaurantVO;
	}
	@Override
	public int insertRestaurantVO(RestaurantVO vo) {
		vo.setIS_LOCK(0);
		int i = restaurantDAO.insertRestaurantVO(vo);
		return i;
	}
	@Override  
	public int updateRestaurantVO(RestaurantVO vo){
		int i = restaurantDAO.updateRestaurantVO(vo);
		return i;
	}
	@Override  
	public List<RestaurantVO> getListRestaurantVO(RestaurantVO vo){
		List<RestaurantVO> list = restaurantDAO.getListRestaurantVO(vo);
		return list;
	}
	@Override  
	public HashMap<String, Object> getRestaurantListCount(RestaurantVO vo){
		HashMap<String, Object> map = (HashMap<String, Object>)restaurantDAO.getRestaurantListCount(vo);
		return map;
	}
	public RestaurantVO getRestaurantLastUseByID(String Id){
		RestaurantVO restaurantVO = restaurantDAO.getRestaurantLastUseByID(Id);
		return restaurantVO;
	}
	@Override  
	public boolean checkRolePermition(UserVO uVo){
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		RestaurantVO rVO = restaurantDAO.getRestaurantVOByID(restarId);
		boolean isOk = true;
		if(rVO != null && rVO.getUSER_EDIT_BILL() != null) {
			if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_ADMIN)){
				if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_MANAGER)){
					isOk = false;
				}
				else if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_USER)){
					isOk = false;
				}
			}
			else if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_MANAGER)){
				if(uVo.getAuthority().equalsIgnoreCase(UtilConst.ROLE_USER)){
					isOk = false;
				}
			}
			else if(rVO.getUSER_EDIT_BILL().equalsIgnoreCase(UtilConst.ROLE_USER)){
				isOk = true;
			}
		}
		return isOk;
	}
	@Override  
	public String createAccount(UserVO uVo){
		String account = null;
		RestaurantVO vo = new RestaurantVO();
		vo.setCONTACT_NM(uVo.getPHONE());
		
		vo.setADDR(PropertyUtil.getStringUTF8("info.restar.addr"));
		vo.setADDR2(PropertyUtil.getStringUTF8("info.restar.addr1"));
		vo.setRESTAR_NM(PropertyUtil.getStringUTF8("info.restar.name"));
		vo.setBILL_TITLE(PropertyUtil.getStringUTF8("info.restar.title"));
		vo.setBILL_SLOGAN(PropertyUtil.getStringUTF8("info.restar.slogan"));
		vo.setBILL_BOTTOM3(PropertyUtil.getStringUTF8("info.restar.buttom3"));
		vo.setBILL_BOTTOM1(PropertyUtil.getStringUTF8("info.restar.buttom1"));
		vo.setIS_PRINT_BIG(UtilConst.BILL_PAPER_SIZE_A4);
		vo.setUSER_EDIT_BILL(UtilConst.ROLE_ADMIN);
		vo.setBILL_TITLE3("LH: "+uVo.getPHONE());
		vo.setHAS_VERIFY(false);
		vo.setIS_PRINT_PAYMENT(1);
		vo.setIS_PRINT_PAYMETHOD(1);
		boolean isExist = true;

		while(isExist){
			vo.setRESTAR_ID(generateKey());
			RestaurantVO voCk = this.getRestaurantVOByID(vo.getRESTAR_ID());
			if(voCk == null){
				isExist = false;
				vo.setRESTAR_CODE(vo.getRESTAR_ID());
				vo.setRESTAR_TYPE(uVo.getRESTAR_TYPE());
				vo.setEMAIL(uVo.getEMAIL());
				vo.setPHONE(uVo.getPHONE());
				vo.setCONTACT_PHONE(uVo.getPHONE());
				vo.setCONTACT_NM(uVo.getFULLNAME());
				vo.setCREATE_TIME(getCurrentTimestamp());
				vo.setPACKAGE(uVo.getPackageid());
				int i = this.insertRestaurantVO(vo);
				return vo.getRESTAR_ID();
			}
		}
		return account;
	}
	public String generateKey(){
		String key = "";
		Random rand = new Random();
		int  n = rand.nextInt(10000);
		char str = randomSeriesForThreeCharacter();
		key = key+str+n;
		if(key.length() < 5){
			int k = 5-key.length();
			for(int i=0; i< k; i++){
				key = key + "0";
			}
		}
		return key;
	}
	public static char randomSeriesForThreeCharacter() {
		String alphabet = "ABCDEFGHYKLMNOUAIJQPVRWZT";
		char key ;
	    int N = alphabet.length();

	    Random r = new Random();

	    key = alphabet.charAt(r.nextInt(N));
	    return key;
	}
	public String getCurrentTimestamp(){
		java.util.Date dateCrr= new java.util.Date();
		Timestamp eDate = new Timestamp(dateCrr.getTime());
		return eDate.toString();

	}
}
