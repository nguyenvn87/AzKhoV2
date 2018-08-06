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
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.kito.madina.cmmn.util.PropertyUtil;


public class MappingExcelView extends AbstractExcelView  {
	

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
	    
	    // create style for header cells
	    CellStyle style = workbook.createCellStyle();
	    Font font = workbook.createFont();
	    font.setFontName("Arial");
	    //font.setFontHeight((short)(7.5*30));
	    style.setFillForegroundColor(HSSFColor.ROYAL_BLUE.index);
	    style.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	    font.setColor(HSSFColor.WHITE.index);
	    style.setFont(font);
	    
	    CellStyle styleMoney = workbook.createCellStyle();
	    Font font1 = workbook.createFont();
	    font1.setFontName("Arial");
	    font1.setFontHeightInPoints((short) 12);
	    styleMoney.setFont(font1);
	    DataFormat df = workbook.createDataFormat();
	    styleMoney.setDataFormat(df.getFormat("#,#0.00"));
	    
	    CellStyle styleNumber = workbook.createCellStyle();
	   
	    font1.setFontName("Arial");
	    styleNumber.setFont(font1);
	    styleNumber.setDataFormat(df.getFormat("#,#0"));
	    
	    CellStyle styleString = workbook.createCellStyle();
	    font1.setFontName("Times New Roman");
	    styleString.setFont(font1);
	    
	    // create header row
	    HSSFRow header = sheet.createRow(0);
	    
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
	    int rowCount = 1;
	    
	    for (HashMap<String, String> listItem : list) {
	    	int RowTmp = rowCount++;
	    	HSSFRow aRow = sheet.createRow( RowTmp );	    
	    	
	    	for( int k=0; k<column_arr.length; k++  ) {
	    		String field = column_arr[ k ];
	    		Object type  = listItem.get(field);
	    		if(type == null) {
	    			aRow.createCell( k ). setCellValue("");
	    		}
	    		else if(type.getClass().getName()=="java.lang.Double"){
	    			Double abc = (Double)type;
	    			HSSFCell cell = aRow.createCell( k );
	    			cell.setCellValue(abc);
	    			cell.setCellStyle(styleMoney);
	    		}
	    		else if(type.getClass().getName()=="java.lang.Float"){
	    			Float abc = (Float)type;
	    			HSSFCell cell = aRow.createCell( k );
	    			cell.setCellValue(abc);
	    			cell.setCellStyle(styleNumber);
	    		}
	    		else {
	    			//aRow.createCell( k ).setCellValue(type.toString());
	    			//aRow.createCell( k ).setCellStyle(styleString);
	    			HSSFCell cell = aRow.createCell( k );
	    			cell.setCellValue(type.toString());
	    			cell.setCellStyle(styleNumber);
	    		}
	    	}
	    	
	    }
	    
	    String comment = (String) (model.get( "comment"));
	    HSSFRow bottom = sheet.createRow(rowCount + 1);
	    bottom.createCell(0).setCellValue("Ghi chú: " + comment);
	    bottom.getCell(0).setCellStyle(style);
	}

}
