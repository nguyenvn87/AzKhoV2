package com.kito.madina.cmmn.excel;

import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.lowagie.text.pdf.codec.Base64.OutputStream;

public class ExcelRevenueReportView extends AbstractExcelView{

	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		//Map<String,String> revenueData = (Map<String,String>) model.get("revenueData");
		//create a wordsheet
		//HSSFSheet sheet = workbook.createSheet("Revenue Report");

		/*HSSFRow header = sheet.createRow(0);
		header.createCell(0).setCellValue("Month");
		header.createCell(1).setCellValue("Revenue");
		System.out.println("Revenue Report---------------");
		int rowNum = 1;
		for (Map.Entry<String, String> entry : revenueData.entrySet()) {
			//create the row data
			HSSFRow row = sheet.createRow(rowNum++);
			row.createCell(0).setCellValue(entry.getKey());
			row.createCell(1).setCellValue(entry.getValue());
        }*/
		/////////////////////////////////////////////
		response.setHeader("Content-Type", "application/octet-stream");
	    response.setHeader("Content-Disposition", "attachment; filename=MyExcelSpreadsheet.xls");

	    // Here is where you will want to put the code to build the Excel spreadsheet

	    ServletOutputStream outStream = null;

	    try {
	        outStream = response.getOutputStream();
	        workbook.write(outStream);
	        outStream.flush();
	    } finally {
	        outStream.close();
	    }       
	}
	
}
