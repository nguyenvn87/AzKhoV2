package com.kito.madina.sample.controller;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.PropertyUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.ecount.service.PhieuThuService;
import com.kito.madina.sample.service.SampleRoomSrvcService;
import com.kito.madina.sample.service.SampleRoomTurnService;
import com.kito.madina.session.service.SessionService;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.RoomTurnService;
import com.kito.madina.test.service.SrvcService;
import com.kito.madina.test.service.UserService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.CustomerVO;
import com.kito.madina.test.vo.MenuVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.RoomSrvcVO;
import com.kito.madina.test.vo.RoomTurnVO;
import com.kito.madina.test.vo.RoomVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.UserVO;

@Controller
public class SampleController {
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@Resource(name = "srvcService")
	private SrvcService srvcService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "roomService")
	private RoomService roomService;
	
	@Resource(name = "customerService")
	private CustomerService customerService;
	
	@Resource(name = "sampleRoomTurnService")
	private SampleRoomTurnService sampleRoomTurnService;
	
	@Resource(name = "sampleRoomSrvcService")
	private SampleRoomSrvcService sampleRoomSrvcService;
	
	@Resource(name = "roomTurnService")
	private RoomTurnService roomTurnService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@RequestMapping("/sample/setDefaultInitData.json")
	public ModelAndView setInitData(){
		
		JsonVO jvon = new JsonVO();
		try{
			String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
			if(isNeedToCreateSampleData())
				createDefaultData(restarId);
		}
		catch(Exception e){
			System.out.println("Error when initing default data !");
		}
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
	public void CreateDefaultCmmCd(String groupCd, String _restaurantId, String _restarType){
		
		try{
			
			CodeVO groupVo = new CodeVO();
			groupVo.setGROUP_CD(groupCd);
			groupVo.setUSE_YN("Y");
			groupVo.setRESTAR_TYPE(_restarType);
			
			List<CodeVO> cmmGroupList = codeService.getListCodeVO(groupVo);
			if(cmmGroupList != null && cmmGroupList.size() >0){
				for(int j=0; j < cmmGroupList.size(); j++){
					CodeVO cmmVo = cmmGroupList.get(j);
					CmmCdUserVO sVo = new CmmCdUserVO();
					
					sVo.setRESTAR_ID(_restaurantId);
					sVo.setCD_NM(cmmVo.getCD_NM());
					sVo.setGROUP_NM(cmmVo.getGROUP_NM());
					sVo.setGROUP_CD(groupCd);
					sVo.setUSE_YN("Y");
					cmmCdUserService.createCodeVO(sVo);
				}
			}
		}
		catch(Exception e){
			
		}
	}
	public void createDefaultCustomer(String _restaurantId){
		
		CustomerVO cusVo = new CustomerVO();
		cusVo.setRESTAR_ID(_restaurantId);
		List<CustomerVO> list = customerService.getListCustomerVO(cusVo);
		if(list != null && list.size() > 0) return;
			try{
				CodeVO cVo = new CodeVO();
				cVo.setGROUP_CD(UtilConst.GROUP_KHACH);
				cVo.setUSE_YN("Y");
				List<CodeVO> cmmList = codeService.getListCodeVO(cVo);
				if(cmmList != null && cmmList.size() >0){
					for(int j=0; j < cmmList.size(); j++){
						CodeVO cmmVo = cmmList.get(j);
						CustomerVO vo = new CustomerVO();
						vo.setNAME(cmmVo.getCD_NM());
						vo.setPHONE("0912345612"+j);
						vo.setRESTAR_ID(_restaurantId);
						vo.setADDR(cmmVo.getVALUE1());
						customerService.createCustomerVO(vo);
					}
				}
			}catch(Exception e){
				System.out.println("Error create default service");
			}
	}
	public CustomerVO getRandomCustomer(List<CustomerVO> list){
		Random rand = new Random();
		CustomerVO cVo = null;
		try{
			if(list != null && list.size() > 0){
				int i = rand.nextInt(list.size());
				cVo = list.get(i);
			}
		}catch(Exception e){
			
		}
		return cVo;
	}
	public void createDefaultData(String _restaurantId){
		
		RestaurantVO rVO = restaurantService.getRestaurantVOByID(_restaurantId);
		
		// Create group default
		CreateDefaultCmmCd(UtilConst.GROUP_HANG, _restaurantId, rVO.getRESTAR_TYPE());
		CreateDefaultCmmCd(UtilConst.GROUP_AREA, _restaurantId, rVO.getRESTAR_TYPE());
		
		// Create product
		srvcService.createDefaultSrvc(UtilConst.GROUP_SRVC, _restaurantId, rVO.getRESTAR_TYPE());
		
		// Create list room default
		createRoomSample(_restaurantId);
		
		// Create customer
		createDefaultCustomer(_restaurantId);
		
		// Get customer
		CustomerVO cusVo = new CustomerVO();
		cusVo.setRESTAR_ID(_restaurantId);
		cusVo.setCUS_CD(-1);
		List<CustomerVO> listCus = customerService.getListCustomerVO(cusVo);
		
		// Create room_turn
		for(int i=0; i < 8; i++){
			String newRoomUseId = CmmUtil.getGUID();
			int debit = i%2;
			creatRoomSrvcFromSample(newRoomUseId, _restaurantId, debit, listCus);
		}
		
		// Create phieu thu default
		CreateDefaultCmmCd(UtilConst.ECOUNT_LOAI_PHIEU_THU, _restaurantId, rVO.getRESTAR_TYPE());
		
		// Create phieu chi default
		CreateDefaultCmmCd(UtilConst.ECOUNT_LOAI_PHIEU_CHI, _restaurantId, rVO.getRESTAR_TYPE());
	}
	public void createRoomSample(String _restaurantId){
		
		RoomVO VO = new RoomVO();
		VO.setRESTAR_ID(_restaurantId);
		VO.setIS_USED(1);
		List<RoomVO> listRoom = roomService.getListRoomVoByRoomVO(VO);
		
		if(listRoom != null && listRoom.size() > 1) return;
		
		RestaurantVO rVO = restaurantService.getRestaurantVOByID(_restaurantId);
		CodeVO groupVo = new CodeVO();
		groupVo.setGROUP_CD(UtilConst.GROUP_ROOM);
		groupVo.setUSE_YN("Y");
		groupVo.setRESTAR_TYPE(rVO.getRESTAR_TYPE());
		
		for(int j=0; j < 9; j++){
			int i = j+1;
			RoomVO rVo = new RoomVO();
			rVo.setROOM_ID(CmmUtil.getGUID());
			rVo.setIS_USED(1);
			rVo.setROOM_NO("Phòng "+i);
			rVo.setRESTAR_ID(_restaurantId);
			roomService.CreateRoomVO(rVo);
		}
	}
	public void creatRoomTurnFromSample(String newRoomUseId, String restaurantId, float toltal, int iDebit, List<CustomerVO> listCus){
		String loggedUserId = SessionUtil.getSessionAttribute("loggedUserId").toString();
		Date date= new Date();
		long time = date. getTime();
		Timestamp tmp = new Timestamp(time);
		RoomTurnVO tmpRoomTurn = new RoomTurnVO();
		
		tmpRoomTurn.setROOM_USED_ID(newRoomUseId);
		tmpRoomTurn.setRESTAR_ID(restaurantId);
		tmpRoomTurn.setIS_SAMPLE(1);
		tmpRoomTurn.setTOTAL_MONEY(toltal);
		tmpRoomTurn.setPAYED_MONEY(toltal);
		tmpRoomTurn.setIS_ORDER(1);
		tmpRoomTurn.setHAS_PAYED(0);
		tmpRoomTurn.setIS_DEBIT(iDebit);
		tmpRoomTurn.setCHANGE_DATE(tmp.toString());
		tmpRoomTurn.setCUS_CD("0");
		tmpRoomTurn.setCUS_NM(PropertyUtil.getStringUTF8("info.bill.customer.name"));
		tmpRoomTurn.setTIME_STS(date.getHours()+":"+date.getMinutes());
		tmpRoomTurn.setTIME_END((date.getHours()+2)+":"+date.getMinutes());
		String billCD = roomTurnService.generateBillCode();
		tmpRoomTurn.setBILL_CD(billCD);
		tmpRoomTurn.setUSER_NAME(loggedUserId);
		RoomVO rVo = getRandomRoom(restaurantId);
		tmpRoomTurn.setROOM_ID(rVo != null?rVo.getROOM_ID():"");
		
		CustomerVO cVo = getRandomCustomer(listCus);
		if(cVo != null){
			tmpRoomTurn.setCUS_NM(cVo.getNAME());
			tmpRoomTurn.setCUS_CD(cVo.getCUS_CD()+"");
		}
		roomTurnService.CreateRoomTurnVO(tmpRoomTurn);
	}
	public void creatRoomSrvcFromSample(String newRoomUseId, String restaurantId, int iDebit, List<CustomerVO> listCus){
		Random rand = new Random();

		HashMap<String, String> mapCheck = new HashMap<String, String>();
		double totalMoney = 0;
		for(int i = 0; i < 8 ; i++){
			RoomSrvcVO vo = new RoomSrvcVO();
			float iran = (float)rand.nextInt(20);
			
			int mount = rand.nextInt(100);
			vo.setROOM_USED_ID(newRoomUseId);
			vo.setPRICE(iran*1000);
			SrvcVO sVo = this.getRandomSrvcId(restaurantId, mapCheck);
			if(sVo != null){
				vo.setSRVC_ID(sVo.getSRVC_ID());
				vo.setAMOUNT((float)mount);
				double total = vo.getPRICE()*vo.getAMOUNT();
				vo.setTOTAL_MONEY(total);
				roomSrvcService.CreateRoomSrvcVO(vo);
				totalMoney = totalMoney + total;
			}
		}
		this.creatRoomTurnFromSample(newRoomUseId, restaurantId, (float)totalMoney, iDebit, listCus);

	}
	public SrvcVO getRandomSrvcId(String restaurantId, HashMap<String, String> map){
		SrvcVO sVo = null;
		SrvcVO VO = new SrvcVO();
		VO.setRESTAR_ID(restaurantId);
		VO.setIS_USED(1);
		List<SrvcVO> listSrvc = srvcService.getSrvcVOBySrvcVo(VO);
		if(listSrvc != null && listSrvc.size() > 0)
		for(SrvcVO vo : listSrvc){
			if(map.get(vo.getSRVC_ID()) == null){
				sVo = vo;
				map.put(vo.getSRVC_ID(), "1");
				break;
			}
		}
		return sVo;
	}
	public RoomVO getRandomRoom(String restaurantId){
		RoomVO room = null;
		Random rand = new Random();
		RoomVO VO = new RoomVO();
		VO.setRESTAR_ID(restaurantId);
		VO.setIS_USED(1);
		List<RoomVO> listRoom = roomService.getListRoomVoByRoomVO(VO);
		if(listRoom != null && listRoom.size() > 0){
			int randomRoomIndex = rand.nextInt(listRoom.size());
			room = listRoom.get(randomRoomIndex);
		}
		return room;
	}
	public boolean isNeedToCreateSampleData(){
		
		boolean isNeeded = false;
		String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
		RestaurantVO rvo = restaurantService.getRestaurantVOByID(restarId);
		if(rvo.getHAS_VERIFY()== true){
			isNeeded = false;
		}
		else{
			SrvcVO VO = new SrvcVO();
			VO.setRESTAR_ID(restarId);
			VO.setIS_USED(1);
			List<SrvcVO> listSrvc = srvcService.getSrvcVOBySrvcVo(VO);
			
			if(listSrvc == null || listSrvc.size() == 0) isNeeded = true;
			else{
				int haveRoom = codeService.getHaveRoomInRestaurant(restarId, rvo.getRESTAR_TYPE());
				if(haveRoom == 1){
					RoomVO roomVo = new RoomVO();
					roomVo.setIS_USED(1);
					List<RoomVO> listRoom = roomService.getListRoomVoByRoomVO(roomVo);
					if(listRoom == null || listRoom.size() == 0) isNeeded = true;
				}
				else isNeeded = false;
			}
		}
		
		return isNeeded;
	}
	@RequestMapping(value = "/sample/getResultOfCheckingTrialAccount.json", method = RequestMethod.GET)
	public ModelAndView checkingTrialAccount(HttpServletRequest req) {
		JsonVO jvon = new JsonVO();
		int isOk = 1;
		boolean isValid = isNeedToCreateSampleData();
		if(isValid) isOk = 0;
		if(!isValid) isOk = 1;
		
		jvon.setData(isOk);
		jvon.setSuccess(true);
		return new ModelAndView("jsonView", jvon);
	}
}
