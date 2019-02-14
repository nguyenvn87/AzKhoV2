var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
//var btnLookup11 = Ext.create('MNG.view.popup.BtnTimKiemNangCao');

Ext.define('MNG.controller.XuatNhapTonController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.xuatNhapTonView'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'WEEK',
	startDate: null,
	endDate: null,
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
			'#btnTimKiemNangCao' : {
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
			}
		});
	},
	resetAllButton: function(btn){
		var btn1 = Ext.ComponentQuery.query("#btnToday")[0];
		var btn2 = Ext.ComponentQuery.query("#btnThisYear")[0];
		var btn3 = Ext.ComponentQuery.query("#btnThisMonth")[0];
		var btn4 = Ext.ComponentQuery.query("#btnTimKiemNangCao")[0];
		
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn3.removeCls('buttonCls');
		btn4.removeCls('buttonCls');
		btn.addCls('buttonCls');
	},
	btnToday: function(button, e, eOpts){
		me = this;
		me.resetAllButton(button);
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
	btnThisYear:function(button, e, eOpts){
		me = this;
		me.resetAllButton(button);
		this.startDate = null;
		this.endDate = null;
		this.srvcID = null;
		this.userNm = null;
		var params = {};
		this.submitRequest(params);
	},
	btnThisMonth:function(button, e, eOpts){
		me = this;
		me.resetAllButton(button);
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
	btnTimKiemNangCao:function(button, e, eOpts){
		me = this;
		me.resetAllButton(button);
		if(this.popLookupTime == null){
			//this.popLookupTime = Ext.create('MNG.view.popup.BtnTimKiemNangCao',{});
			this.popLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
			
		}
		this.popLookupTime.show();
	},
	btnSalePDF:function(){
		var param = "?SALE="+LOAI_THONGKE;  
		if(this.startDate != null)param = param + "&STARTDATE="+this.startDate;
		if(this.endDate != null)param = param + "&ENDDATE="+this.endDate;
		
		var location = contextPath + "/statistic/importExport.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnImportPDF:function(){
		var param = "?SALE="+LOAI_THONGKE;  
		if(this.startDate != null)param = param + "&STARTDATE="+this.startDate;
		if(this.endDate != null)param = param + "&ENDDATE="+this.endDate;
		
		var location = contextPath + "/report/ThongKeChiTiet.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnSubmitLookupTime:function(){
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		var params = {
				STARTDATE	: this.startDate,
				ENDDATE		: this.endDate,
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
			storeTmp.getProxy().url = contextPath + '/statistic/ImportExport.json';
			storeTmp.getProxy().extraParams = params;
			storeTmp.currentPage = 1;
			storeTmp.pageSize=12;
			storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        itotalValue = SumObj.itotal;
					        inStoreValue = SumObj.totalValue;
					        totalValue = Math.round(totalValue);
					        itotalValue = Math.round(itotalValue);
					        inStoreValue = Math.round(inStoreValue);
					        value1 = formatSupporter.formatToMoney(totalValue);
					        value2 = formatSupporter.formatToMoney(itotalValue);
					        value3 = formatSupporter.formatToMoney(inStoreValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
					        Ext.ComponentQuery.query('#statis-itotal-id')[0].setText(value2);
					        Ext.ComponentQuery.query('#statis-instore-id')[0].setText(value3);
					     }
					});
	}
})