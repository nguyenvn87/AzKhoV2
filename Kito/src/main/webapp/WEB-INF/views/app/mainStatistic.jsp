<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>
<html>
	<head>
	<title>Phần mềm quản lý bán hàng AzKho</title>
		<script>		
		var loggedUserId = '${model.loggedUserId}';
		var haveRoom = '${model.haveRoom}';
		var main_top	= Ext.create('pckg.cmmn.body.Top',{
			data: {
				clsName: 'icon_main_top_menu',
				userName: loggedUserId,
				partName: HELLO_USR,
				logoutUrl: request.getContextPath + '/logout',
				menu: [	]
			}
		});		
		
		main_top.data.menu = [
			                  	{ name: MEN_T_001, url:'home.do' , select:''},
			                  	{ name: MEN_T_004, url:'mainDebit.do' , select:''},	
			                  	{ name: MEN_T_003, url:'mainStore.do', select:''},
								{ name: MEN_T_002, url:'mainStatistic.do' , select:'_select'},								
								{ name: MEN_T_005, url:'mainAdmin.do' , select:''}
							]; 		
		
		var main_left	= Ext.create('pckg.cmmn.body.Left',{UP_MENU_ID:'LEFT_STATIS'});
		
		Ext.onReady(function() {
			var urlTmp = '/application/get/ADM026.do';
			if(haveRoom ==  'true')
				urlTmp = '/report/statistic.do';
			
			mainPanel = Ext.create('pckg.cmmn.body.Main', {
				top : main_top,
				left : main_left,
				width:'100%',
				height:'100%',
				main: request.getContextPath + urlTmp, 
				renderTo : 'main_contents',
				listeners:{
					afterrender:function(){
					}
				}
			});	
		
		});
		</script>
	</head>

	<body id="main_contents"></body>
</html>
