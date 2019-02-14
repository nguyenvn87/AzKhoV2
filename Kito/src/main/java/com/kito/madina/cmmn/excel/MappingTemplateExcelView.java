package com.kito.madina.cmmn.excel;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.kito.madina.cmmn.util.PropertyUtil;


public class MappingTemplateExcelView extends AbstractExcelView  {
	

	@Override
	protected void buildExcelDocument(Map<String, Object> model,
			HSSFWorkbook workbook,
			HttpServletRequest req,
			HttpServletResponse res) {
		
		res.setHeader("Content-Disposition", "attachment; filename="+ model.get( "fileName") + ".xls");
		
		List<HashMap<String, String>> list = (List<HashMap<String, String>>) model.get("data");
		String[] column_arr = (String[]) (model.get( "column_arr"));
		String[] column_header = (String[]) (model.get( "column_header"));
		
		// create a new Excel sheet
	    HSSFSheet sheet = workbook.createSheet( (String)(model.get( "fileName")) );
	    sheet.setDefaultColumnWidth(30);
	    
	    // style for title
	    CellStyle styleTitle = workbook.createCellStyle();
	    Font font3 = workbook.createFont();
	    font3.setFontName("Times New Roman");
	    styleTitle.setAlignment(CellStyle.ALIGN_CENTER);
	    font3.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	    font3.setFontHeightInPoints((short) 18);
	    styleTitle.setFont(font3);
	    DataFormat df = workbook.createDataFormat();
	    // create style for header cells
	    CellStyle style = workbook.createCellStyle();
	    Font font = workbook.createFont();
	    font.setFontName("Times New Roman");
	    style.setAlignment(CellStyle.ALIGN_CENTER);
	    font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	    font.setFontHeightInPoints((short) 12);
	    style.setFont(font);
	    style.setBorderTop(CellStyle.BORDER_THIN);
	    style.setBorderBottom(CellStyle.BORDER_THIN);
	    style.setDataFormat(df.getFormat("#,#0"));
	    
	    CellStyle styleMoney = workbook.createCellStyle();
	    Font font1 = workbook.createFont();
	    font1.setFontName("Times New Roman");
	    font1.setFontHeightInPoints((short) 12);
	    styleMoney.setFont(font1);
	    styleMoney.setAlignment(CellStyle.ALIGN_RIGHT);
	    styleMoney.setDataFormat(df.getFormat("#,#0"));
	    styleMoney.setIndention((short)1);
	    
	    CellStyle styleNumber = workbook.createCellStyle();
	    font1.setFontName("Times New Roman");
	    styleNumber.setFont(font1);
	    styleNumber.setAlignment(CellStyle.ALIGN_RIGHT);
	    styleNumber.setDataFormat(df.getFormat("#,#0"));
	    styleNumber.setIndention((short)1);
	    
	    CellStyle styleString = workbook.createCellStyle();
	    font1.setFontName("Times New Roman");
	    styleString.setFont(font1);
	    styleString.setIndention((short)1);
	    
	    // Row 0: create header row / date
	    sheet.createRow(0);
	    
	    // Row 1: Title bill
	    HSSFRow title = sheet.createRow(1);
	    // Row 2: Bill code
	    HSSFRow billCode = sheet.createRow(2);
	    // Row 3: Customer name
	    HSSFRow CustomerRow = sheet.createRow(3);
	    // Row 4: Header table
	    HSSFRow header = sheet.createRow(4);
	    sheet.setColumnWidth(0, 1200);
	    sheet.setColumnWidth(1, 9000);
	    sheet.setColumnWidth(2, 2500);
	    sheet.setColumnWidth(3, 3000);

	    int i = 0;
	    for ( String column : column_header ) {
	    	if(column.indexOf("TO_CHAR") != -1) {
	    		String temp = column_header[i].substring(8, column_header[i].length() - 1);
	    		header.createCell( i ).setCellValue(temp);
	    	}
	    	else {
	    		header.createCell( i ).setCellValue( column_header[ i ] );
	    	}
		    header.getCell( i ).setCellStyle(style);
		    
	    	i++;	    	
	    }	    
	    // create data rows
	    int rowCount = 5;
	    HashMap<String, Object> sumMap = new HashMap<String, Object>();
	    for( int k=0; k<column_arr.length; k++  ) {
	    	String field = column_arr[ k ];
	    	sumMap.put(field, null);
	    }
	    for (HashMap<String, String> listItem : list) {
	    	int RowTmp = rowCount++;
	    	HSSFRow aRow = sheet.createRow( RowTmp );	    
	    	aRow.setHeightInPoints(25);
	    	for( int k=0; k<column_arr.length; k++  ) {
	    		String field = column_arr[ k ];
	    		Object type  = listItem.get(field);
	    		HSSFCell cell = aRow.createCell( k );
	    		if(type == null) {
	    			aRow.createCell( k ). setCellValue("");
	    		}
	    		else if(type.getClass().getName()=="java.lang.Double"){
	    			Double abc = (Double)type;
	    			if(sumMap.get(field) == null) sumMap.put(field, abc);
	    			else{
	    				Double sumVl = (Double)sumMap.get(field);
	    				sumMap.put(field, sumVl+abc);
	    			}
	    			cell.setCellValue(abc);
	    			cell.setCellStyle(styleMoney);
	    		}
	    		else if(type.getClass().getName()=="java.lang.Float"){
	    			Float abc = (Float)type;
	    			sumMap.put(field, null);
	    			cell.setCellValue(abc);
	    			cell.setCellStyle(styleNumber);
	    		}
	    		else {
	    			cell.setCellValue(type.toString());
	    			cell.setCellStyle(styleNumber);
	    		}
	    	}
	    	
	    }
	    int length = column_arr.length;
	    
	    String titleBill = (String)(model.get( "title"));
	    HSSFRow bottom = sheet.createRow(1);
	    bottom.createCell(0).setCellValue(titleBill);
	    bottom.getCell(0).setCellStyle(styleTitle);
	    sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, length-1));
	    
	    // Summary row
	    HSSFRow bottomSum = sheet.createRow(5+list.size());
	    for( int k=0; k<column_arr.length; k++  ) {
	    	String field = column_arr[ k ];
	    	HSSFCell cell = bottomSum.createCell( k );
	    	if(sumMap.get(field)!= null){
	    		Double value = (Double)sumMap.get(field);
	    		cell.setCellValue(value);
	    	}else{
	    		cell.setCellValue("");
	    	}
	    	cell.setCellStyle(style);
	    }
	    
	}

}
