package com.kito.madina.test.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.service.CodeService;
import com.kito.madina.test.vo.CodeVO;
import com.kito.madina.test.vo.RoomVO;

@Controller
//@RequestMapping(value = "/code")
public class CodeController {
  private Logger logger = LoggerFactory.getLogger(CodeController.class);

  @Autowired
  private CodeService codeService;

 /* @RequestMapping(value = "/ladm/system/code/getComboList.json", method = RequestMethod.GET)
  public String getAddressList(Model model) {
    return "project/list";
  }*/

  @RequestMapping("/code/getComboList.json")
  public ModelAndView getComboList(@RequestParam Map<String, String> param){
		
	  //param.put( "LOCALE", SsnInfo.getLanquage());
	  System.out.println("param");
	  param.put("RESTAR_ID", "1234134");
	  return new ModelAndView("jsonView", new JsonVO(codeService.getComboList(param)));
	}
  @RequestMapping("/code/getCommonCodeList.json")
  public ModelAndView getCommonCodeList(@RequestParam Map<String, String> param){
		
	  	CodeVO groupVo = new CodeVO();
		groupVo.setGROUP_CD(param.get("GROUP_CD"));
		groupVo.setRESTAR_TYPE(param.get("RESTAR_TYPE"));
		groupVo.setUSE_YN("Y");
		
		List<CodeVO> cmmGroupList = codeService.getListCodeVO(groupVo);
	  return new ModelAndView("jsonView", new JsonVO(cmmGroupList));
	}
  @RequestMapping(value = "/code/saveCodeList.json", method = RequestMethod.POST)
	public ModelAndView saveRoom(HttpServletRequest req, CodeVO _code) {
	  JsonVO jvon = new JsonVO();
		try{
			if(_code.getSTATUS() != null && _code.getSTATUS().equalsIgnoreCase("create")){
					codeService.createCodeVO(_code);
				}
			else{
					codeService.updateCodeVO(_code);
				}
			jvon.setSuccess(true);
			jvon.setMessage("Saving common code successful");
		}catch(Exception e){
			jvon.setSuccess(false);
			jvon.setMessage("Error when saving common code");
		}		
		return new ModelAndView("jsonView", jvon);
	}
}
