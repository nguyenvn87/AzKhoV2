<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">

Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.pdfDisplayController' ],
	launch : function() {
		Ext.create('MNG.view.pdfDisplayView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){}
			}
		});
		 var mainPanel = Ext.getCmp("reportPanelId"); 
		mainPanel.removeAll();
		
		var param = "?LIID=" + "MONTH" + "&SRVCID=" + "srvcId";
		url_ = contextPath + "/report/rptImportProfit.do" + param;
			
		var pdfPanel = Ext.create('Ext.ux.pdf.panel.PDF',{
	       // title    : 'Thống kê lợi nhuận',
	       // cls: 'jdvn-main-body',
	        pageScale: 1,                                          
	        src      : url_ 
	    });
	
	    mainPanel.add( pdfPanel);
		
		mainPanel.doLayout(); 
	}
});
</script>


<div id="land_contents">
</div>

