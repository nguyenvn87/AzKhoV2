var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
var btnLookup = Ext.create('MNG.view.popup.BtnLookupTime');
//var btnLookup = Ext.create('MNG.view.popup.BtnTimKiemKhac');

Ext.define('MNG.controller.statisticSrvcController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.statisticSrvcView'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'WEEK',
	startDate: formatSupporter.getEnglishDate('MONTH')[0],
	endDate: formatSupporter.getEnglishDate('MONTH')[1],
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
				click : this.btnStatisQuy 
			},
			'#grid-srvc-statistic':{
				itemdblclick: this.doubleClickUser
			},
			'#btnStatisPDF':{
				click : this.btnStatisPDF 
			},
			'#btnExportPrint':{
				click: this.btnExportPrint 
			},
			'#btnStatisExcel':{
				click: this.btnStatisExcel 
			},
			'#btnStoreRemainPrint':{
				click: this.btnStoreStatic
			},
			'#btnSubmitLookupTime':{
				click : this.btnSubmitLookupTime
			},
			'#btnSaveDebitPayment':{
				click: this.btnSaveDebitPayment
			},
			'#btnStatisAllDebit':{
				click: this.btnStatisAllDebit
			},
			'#btnOther':{
				click: this.btnOther
			},'#FULLNAME':{
				select: this.onSelectUsername
			}
		});
	},
	onSelectUsername: function(combo, records, eOpts){
		this.userNm = combo.getValue();
		console.log('combo',combo.getValue());
		var params = {
				STARTDATE: this.startDate,
				ENDDATE:   this.endDate,
				USER_NAME:   this.userNm
		};
		this.submitRequest(params);
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
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
	},
	doubleClickUser:function(compt, record, item, index, e){
		var roomUseId = record.get('ROOM_USED_ID');
		if(roomUseId == null) return;
		var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR; 
		var location = contextPath + "/report/billPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",850,800,true);
	},
	btnThisMonth:function(){
		this.selectButton('MONTH');
		this.statisticType = "MONTH";
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
	},
	btnStatisQuy:function(){
		if(this.popLookupTime == null){
			this.popLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
		}
		this.popLookupTime.show();
	},
	btnStatisPDF:function(){
		if(this.startDate == null){
			var arrDate = formatSupporter.getEnglishDate('MONTH');
			this.statisticType = 'MONTH';
			this.startDate = arrDate[0];
			this.endDate = arrDate[1];
		}
		var param = "?LIID=" + this.statisticType;
		if(this.startDate != null) param = param + "&STARTDATE="+this.startDate
		if(this.endDate != null) param = param + "&ENDDATE="+this.endDate;
		if(this.userNm != null) param = param + "&USER_NAME="+this.userNm;
		
		var location = contextPath + "/report/PrintSaledProduct.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnExportPrint:function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
		var location = contextPath + "/report/exportStore.do" + param;
		utilForm.btn_template_popup(location,"Xuất kho",600,1024,true);
	},
	btnStoreStatic:function(){
		var param = "?LIID="; 
		var location = contextPath + "/report/calculateStore.do" + param;
		utilForm.btn_template_popup(location,"Báo cáo tồn kho",600,1024,true);
	},
	btnSubmitLookupTime:function(){
		this.statisticType = 'OTHER'
		this.selectButton('OTHER');
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		var params = {
				STARTDATE: this.startDate,
				ENDDATE:   this.endDate
		};
		this.submitRequest(params);
	},
	btnSaveDebitPayment: function(){
	},
	request:function(reqType, stsDate, endDate){
		
		
	},
	btnStatisAllDebit:function(){
		
	},
	btnStatisExcel:function(){
		var param = "?LIID="+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
		var _url = contextPath + '/report/excel/exportSaledExcel.do'+param;
		this.downloadFile(_url);
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
		userName = Ext.ComponentQuery.query("#mainContainerID #FULLNAME")[0].getValue();
		if(userName != null && userName != ''){
			this.userNm = userName;
			params.USER_NAME = userName;
			}
		
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
			var storeTmp = Grid.getStore();
			storeTmp.getProxy().url = contextPath + '/getPagingProductHavedSaled.json';
			storeTmp.getProxy().extraParams = params;
			storeTmp.currentPage = 1;
			storeTmp.pageSize=12;
			storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        if(totalValue != null && totalValue != '')
					        	totalValue = Math.round(totalValue);
					        value1 = formatSupporter.formatToMoney(totalValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);					       
					     }
					});
	},
	btnOther:function(){
		btnLookup.show();
	},
	showDetailBill: function(me, record){
		me = this;
		var startDate = me.startDate +' -' + me.endDate;
		var srvcId = record.get('SRVC_NM');
		var title1 = srvcId + ' : '+ startDate;
		if(me.popup != null ) me.popup.close();
		me.popup = Ext.create('MNG.view.popup.BtnChiTietBanHangTheoNgay',{title: title1});
		me.popup.show();
		var params = { 
				STARTDATE: this.startDate,
				ENDDATE: this.endDate,
				SRVC_ID: record.get('SRVC_ID')
				//USER_NAME: userName
		};
		me.popup.loadListBills(params);
	},
})