package com.kito.madina.srvc;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.cmmn.util.UtilConst;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.service.ImportService;
import com.kito.madina.test.service.RestaurantService;
import com.kito.madina.test.service.RoomSrvcService;
import com.kito.madina.test.service.StoreSrvcService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.ImportVO;
import com.kito.madina.test.vo.RestaurantVO;
import com.kito.madina.test.vo.SrvcVO;
import com.kito.madina.test.vo.StoreSrvcVO;

@Controller
public class statisticController {
		
	@Resource(name = "importService")
	private ImportService importService;
	
	@Resource(name = "restaurantService")
	private RestaurantService restaurantService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@Resource(name = "roomSrvcService")
	private RoomSrvcService roomSrvcService;
	
	@Resource(name = "codeService")
	private CodeService codeService;
	
	@RequestMapping(value="/sale/getListSaleByDate.json", method = RequestMethod.GET)
	public ModelAndView getListSaleByDate(HttpServletRequest req, SrvcVO vo) {
		
		JsonVO jvon = new JsonVO();
		String userName = req.getParameter("USER_NAME");
		String loginRestautant = SessionUtil.getSessionAttribute("loginRestautant").toString();
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("RESTAR_ID", loginRestautant);
		
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMIN((page - 1) * limit);
		vo.setMAX(((page - 1) * limit) + limit);
		map.put("MIN", vo.getMIN()+"");
		map.put("MAX", vo.getMAX()+"");
		if(userName != null && !userName.isEmpty()){
			map.put("USER_NAME", userName);
		}
		if(vo.getSRVC_ID() != null && !vo.getSRVC_ID().isEmpty()){
			map.put("SRVC_ID", vo.getSRVC_ID());
		}
		CodeVO mVo = new CodeVO();
		mVo.setGROUP_CD("DONVI");
		List<CodeVO> listCode = codeService.getListCodeVO(mVo);
		List<HashMap<String, Object>> list = roomSrvcService.getThongKeBanHang(map);
		
		for(int i=0; i< list.size(); i++){
			int j = i+1;
			HashMap<String, Object> Vo = list.get(i);
			if(Vo.get("UNIT")!= null){
		    	for(CodeVO coMap : listCode){
		    		if(Vo.get("UNIT").toString().trim().equalsIgnoreCase(coMap.getCD()+"")){
		    			Vo.put("UNIT_NM", coMap.getCD_NM());
		    			break;
		    		}
		    	}
		    }
		}
		
		if(userName != null && !userName.isEmpty()){
			for(HashMap<String, Object> mapTmp : list){
				mapTmp.put("USER_NAME", userName);
			}
		}
		HashMap<String, Object> mapResult = roomSrvcService.getThongKeBanHangCount(map);
		int totalCount = 0;
		if (mapResult != null && mapResult.get("COUNT") != null) {
			totalCount = Integer.parseInt(mapResult.get("COUNT").toString());
		}
		
		jvon.setSuccess(true);
		jvon.setData(list);
		jvon.setTotalCount(totalCount);
		return new ModelAndView("jsonView", jvon);
	}
}
