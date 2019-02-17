package com.kito.madina.srvc;

import java.awt.Font;
import java.awt.FontMetrics;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;
import net.sourceforge.barbecue.output.OutputException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kito.madina.cmmn.json.JsonVO;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.test.service.CmmCdUserService;
import com.kito.madina.test.service.MenuService;
import com.kito.madina.test.vo.CmmCdUserVO;
import com.kito.madina.test.vo.MenuVO;
import com.lowagie.text.pdf.PdfPCell;

@Controller
public class SettingController {
	
	@Resource(name = "menuService")
	private MenuService menuService;
	
	@Resource(name = "cmmCdUserService")
	private CmmCdUserService cmmCdUserService;
	
	@RequestMapping(value = "/setting/getListCDUser.json", method = RequestMethod.GET)
	public ModelAndView getListCDUser(HttpServletRequest req, CmmCdUserVO vo) {
		
				String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
				vo.setRESTAR_ID(restarId);
				vo.setUSE_YN("Y");
				System.out.println("getListCDUser");
				
				List<CmmCdUserVO> list = cmmCdUserService.getListCmmCdUserVO(vo);
				
				JsonVO jvon = new JsonVO();
				jvon.setData(list);
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping(value = "/setting/createCDUser.json", method = RequestMethod.POST)
	public ModelAndView createCDUser(HttpServletRequest req, CmmCdUserVO vo) {
		
				String restarId = SessionUtil.getSessionAttribute("loginRestautant").toString();
				vo.setRESTAR_ID(restarId);
				System.out.println("getListCDUser");
				if(vo.getCD() > 0){
					if(vo.getSTATUS() != null && vo.getSTATUS().equalsIgnoreCase("DELETE"))
						cmmCdUserService.deleteCmmCdUserVO(vo.getCD());
					else cmmCdUserService.updateCodeVO(vo);
				}
				else{
					cmmCdUserService.createCodeVO(vo);
				}
				
				JsonVO jvon = new JsonVO();
				jvon.setSuccess(true);
				return new ModelAndView("jsonView", jvon);
	}
	@RequestMapping("/setting/renderBarcode.json")
	public void photo1(HttpServletResponse response, String barcodeNumber, String summaryInfo, int height, int with, int fontsize) throws IOException {
		response.setContentType("image/png");
		Barcode barcode = null;
		String number = barcodeNumber;
		response.setHeader("DocNumber", number);
		try {
			String formatNumber = "";
			String[] temp = number.split("(?!^)");
			for (String charTemp : temp) {
				formatNumber += charTemp + " ";
			}
			formatNumber = formatNumber.trim();
			
			barcode = BarcodeFactory.createCode128B(number);
			barcode.setBarHeight(height); // 60
			barcode.setBarWidth(with); // 2
			barcode.setLabel(formatNumber);
			
			int barcodeWidth = barcode.getWidth();
			Font defaultFont = new Font("Times New Roman", Font.PLAIN, 16);
			FontMetrics fontMetrics = barcode.getFontMetrics(defaultFont);
			int stringWidth = fontMetrics.stringWidth(formatNumber);
			//double widthRatio = (double)barcodeWidth / (double)stringWidth;
			//int newFontSize = (int)(16 * widthRatio);
			int newFontSize = fontsize;
			Font newFont = new Font("Times New Roman", Font.PLAIN, newFontSize - 1);
			barcode.setFont(newFont);
			barcode.setDrawingText(true);
		} catch (BarcodeException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			// this is useless ... but it helps get rid of the black line.
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			BarcodeImageHandler.writePNG(barcode, baos);
			BarcodeImageHandler.writePNG(barcode, response.getOutputStream());
		} catch (OutputException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
