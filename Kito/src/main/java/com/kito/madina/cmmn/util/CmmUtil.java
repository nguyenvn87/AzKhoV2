package com.kito.madina.cmmn.util;

import java.io.Reader;
import java.lang.reflect.Type;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.kito.madina.ecount.vo.PaymentMethodVO;
import com.kito.madina.test.vo.RoomSrvcVO;

public class CmmUtil {

	private static Gson gson = null; 
	public static final String patternRegex = "\\{\\d+\\}";
	
	public static Gson getGsonInstance(){
		
		if( gson == null){
			gson = new GsonBuilder().serializeNulls().setPrettyPrinting().create();
			//.addDeserializationExclusionStrategy(new GsonSerializedExcludeCustom()).create();
		}
		return gson;
	}
	
	public static String getGUID()	{
		return UUID.randomUUID().toString();
	}
	
	public static boolean isNull(Object str) {

        if (str == null || str.toString().toLowerCase().equals("null")
                || str.toString().trim().equals("")) {
            return true;
        } else {
            return false;
        }
    }
	
	public static Object jsonToObject(String json, Type objType){		
		
		return getGsonInstance().fromJson(json, objType);
	}
	
	public static Object jsonToObject(Reader json, Type objType){		
		
		return getGsonInstance().fromJson(json, objType);
	}
	
	public static String objToJson( Object obj){
		
		return getGsonInstance().toJson(obj);
	}
	
	public static String StringMatchBind(String str, Object[] obj){
		
		Pattern pattern = Pattern.compile(patternRegex);
		Matcher matcher = pattern.matcher(str);
		
		int i=0;
		try{
			while( matcher.find()){
				str = 	str.replace( matcher.group(), obj[i].toString());
				i++;
			}
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
		return str;
	}
	public static List<RoomSrvcVO> jsonToRoomSrvcList(JsonReader json) {
		Gson gson = new Gson();
		return gson.fromJson(json, new TypeToken<List<RoomSrvcVO>>(){}.getType());
	}
	/*public static List<ForstVO> jsonToFList(JsonReader json) {
		Gson gson = new Gson();
		return gson.fromJson(json, new TypeToken<List<ForstVO>>(){}.getType());
	}*/
	
	/*public static float genSNKeyForSrvcDtlVO(List<SrvcDtlVO> list) {
		float serialNum = 0;
		boolean isCheck = false;
		Random rn = new Random();
		
		while(!isCheck)
		{
			isCheck = true;
			serialNum = rn.nextInt(1000);	
			for(SrvcDtlVO vo : list)
			{
				if(serialNum == vo.getSN())
				{
					isCheck = false;
					break;
				}
			}
		}
			
		return serialNum;
	}*/
	public static String formatNumber2Money(double num){
		String quantityOut = "";
		Locale currentLocale = new Locale.Builder().setLanguage("en").setRegion("US").build();
		NumberFormat numberFormatter;
		numberFormatter = NumberFormat.getNumberInstance(currentLocale);
		quantityOut = numberFormatter.format(num);
		return quantityOut;
	}
	public static String MD5Hash(String md5) {
		   try {
		        java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
		        byte[] array = md.digest(md5.getBytes());
		        StringBuffer sb = new StringBuffer();
		        for (int i = 0; i < array.length; ++i) {
		          sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1,3));
		       }
		        return sb.toString();
		    } catch (java.security.NoSuchAlgorithmException e) {
		    }
		    return null;
		}

	public static List<PaymentMethodVO> jsonToPayMethodList(JsonReader json) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		return gson.fromJson(json, new TypeToken<List<PaymentMethodVO>>(){}.getType());
	}
	public static String generateBillCode(String code, int length){
		String strCD = code;
		if(code != null && code.length() > 0){
			int iTmp = 6 - code.length();
			for(int i=0; i < iTmp; i++){
				strCD = "0" + strCD;
			}
		}
		return strCD;
	}
}
