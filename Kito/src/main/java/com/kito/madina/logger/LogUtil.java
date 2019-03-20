package com.kito.madina.logger;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.TimeZone;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LogUtil {

	public static final String patternRegex = "\\{\\d+\\}";
	
	public static String getGUID()	{
		return UUID.randomUUID().toString();
	}
	 protected static String defaultLogFile = "C:/Users/Nguyen/Documents/msglog.txt";
	 
	 public boolean checkExistFile(String filePath) {
		 
		 File f = new File("/path/to/file"); 
		  if(f.exists() && f.isFile()) {
			  
		  }
		  else {
			  // Create file
		  }
		 return true;
	 }
	 
	 public static void writeLog(String fileLocation, String s){
    	 try {
    		 write(fileLocation, s);
    	 }catch(IOException e) {
    		 
    	 }
	 }
     public static void write(String s){
    	 try {
    		 write(defaultLogFile, s);
    	 }catch(IOException e) {
    		 
    	 }
	 }

     public static void write(String f, String s) throws IOException {
	     TimeZone tz = TimeZone.getTimeZone("EST"); // or PST, MID, etc ...
	     Date now = new Date();
	     DateFormat df = new SimpleDateFormat("yyyy.mm.dd hh:mm:ss ");
	     df.setTimeZone(tz);
	     String currentTime = df.format(now);
	    
	     FileWriter aWriter = new FileWriter(f, true);
	     aWriter.write(currentTime + " " + s + "\n");
	     aWriter.flush();
	     aWriter.close();
	 }
	
}
