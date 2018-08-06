var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
var btnLookup = Ext.create('MNG.view.popup.BtnTimKiemNangCao');

Ext.define('MNG.controller.ThongKeChiTietController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.statisticSrvcView'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'WEEK',
	startDate: null,
	endDate: null,
	srvcID: null,
	userNm: null,
	init : function() {
		this.control({
			
			'#btnToday' : {
				click : this.btnToday
			},
			'#btnThisYear' : {
				click : this.btnThisYear
			},
			'#btnThisMonth' : {
				click : this.btnThisMonth 
			},
			'#btnStatisQuy' : {
				click : this.btnTimKiemNangCao 
			},
			'#btnSalePDF':{
				click : this.btnSalePDF 
			},
			'#btnImportPDF':{
				click : this.btnImportPDF 
			},
			'#btnStatisExcel':{
				click: this.btnStatisExcel 
			},
			'#btnSubmitLookupTime':{
				click : this.btnSubmitLookupTime
			},
			'#btnOther':{
				click: this.btnOther
			}
		});
	},
	selectButton: function(buttonType){
		this.statisticType = buttonType;
		var btn1 = Ext.ComponentQuery.query("#btnToday")[0];
		var btn2 = Ext.ComponentQuery.query("#btnThisYear")[0];
		var btn3 = Ext.ComponentQuery.query("#btnThisMonth")[0];
		var btn4 = Ext.ComponentQuery.query("#btnOther")[0];
		
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn3.removeCls('buttonCls');
		btn4.removeCls('buttonCls');
		if(buttonType == 'DAY'){
			btn1.addCls('buttonCls');
		}
		else if(buttonType == 'WEEK'){
			btn2.addCls('buttonCls');
		}
		else if(buttonType == 'MONTH'){
			btn3.addCls('buttonCls');
		}
		else if(buttonType == 'OTHER'){
			btn4.addCls('buttonCls');
		}
		btn2.addCls(null);
		btn3.addCls(null);
	},
	btnToday: function(){
		this.selectButton('DAY');
		this.statisticType = "DAY";
		var arrDate = formatSupporter.getEnglishDate('TODAY');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		this.srvcID = null;
		this.userNm = null;
		
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
	},
	btnThisYear:function(){
		this.selectButton('WEEK');
		this.statisticType = "WEEK";
		var arrDate = formatSupporter.getEnglishDate('YEAR');
		this.startDate = null;
		this.endDate = null;
		this.srvcID = null;
		this.userNm = null;
		var params = {};
		this.submitRequest(params);
	},
	btnThisMonth:function(){
		this.selectButton('MONTH');
		this.statisticType = "MONTH";
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		this.srvcID = null;
		this.userNm = null;
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
	},
	btnTimKiemNangCao:function(){
		if(this.popLookupTime == null){
			this.popLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
		}
		this.popLookupTime.show();
	},
	btnSalePDF:function(){
		var param = "?SALE="+LOAI_THONGKE;  
		if(this.startDate != null)param = param + "&STARTDATE="+this.startDate;
		if(this.endDate != null)param = param + "&ENDDATE="+this.endDate;
		if(this.srvcID != null)param = param + "&SRVC_ID="+this.srvcID;
		if(this.userNm != null)param = param + "&USER_NAME="+this.userNm;
		
		var location = contextPath + "/report/ThongKeChiTiet.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnImportPDF:function(){
		var param = "?SALE="+LOAI_THONGKE;  
		if(this.startDate != null)param = param + "&STARTDATE="+this.startDate;
		if(this.endDate != null)param = param + "&ENDDATE="+this.endDate;
		if(this.srvcID != null)param = param + "&SRVC_ID="+this.srvcID;
		if(this.userNm != null)param = param + "&USER_NAME="+this.userNm;
		
		var location = contextPath + "/report/ThongKeChiTiet.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnSubmitLookupTime:function(){
		this.statisticType = 'OTHER'
		this.selectButton('OTHER');
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.srvcID = Ext.ComponentQuery.query("#btnLookupTime [name=SRVC_ID]")[0].getValue();
		this.userNm = Ext.ComponentQuery.query("#btnLookupTime [name=USERNAME]")[0].getValue();
		var params = {
				STARTDATE	: this.startDate,
				ENDDATE		: this.endDate,
				SRVC_ID		: this.srvcID,
				USER_NAME	: this.userNm
		};
		this.submitRequest(params);
	},
	request:function(reqType, stsDate, endDate){
		
		
	},
	btnStatisExcel:function(){
		/*var param = "?LIID="+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
		var _url = contextPath + '/report/excel/exportSaledExcel.do'+param;
		this.downloadFile(_url);*/
	},
	downloadFile:function(_url){
		
		 method = 'POST';
         params = {};
	    // Create form panel. It contains a basic form that we need for the file download.
	    var form = Ext.create('Ext.form.Panel', {
	        standardSubmit: true,
	        url: _url,
	        method: method
	    });
	    // Call the submit to begin the file download.
	    form.submit({
	        target: '_blank', // Avoids leaving the page. 
	        params: params
	    });
	},
	submitRequest:function(params){
		
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
			var storeTmp = Grid.getStore();
			storeTmp.getProxy().url = contextPath + URL_PAGING_THONGKECHITIET;
			storeTmp.getProxy().extraParams = params;
			storeTmp.currentPage = 1;
			storeTmp.pageSize=12;
			storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        value1 = formatSupporter.formatToMoney(totalValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);					       
					     }
					});
	},
	btnOther:function(){
		btnLookup.show();
	}
})