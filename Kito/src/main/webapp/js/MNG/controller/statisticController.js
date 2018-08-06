var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
Ext.define('MNG.controller.statisticController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.statistic'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'MONTH',
	startDate: null,
	endDate: null,
	init : function() {
		this.control({
			
			'#btnStatisDaily' : {
				click : this.btnStatisDaily
			},
			'#btnStatisWeekly' : {
				click : this.btnStatisWeekly
			},
			'#btnStatisMonthly' : {
				click : this.btnStatisMonthly 
			},
			'#btnStatisQuy' : {
				click : this.btnStatisQuy 
			},
			'#grid-srvc-statistic':{
				itemdblclick: this.doubleClickUser
			},
			'#btnStatisPrint':{
				click : this.btnStatisPrint 
			},
			'#btnExportPrint':{
				click: this.btnExportPrint 
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
			}
		});
	},
	selectButton: function(buttonType){
		this.statisticType = buttonType;
		var btn1 = Ext.ComponentQuery.query("#btnStatisDaily")[0];
		var btn2 = Ext.ComponentQuery.query("#btnStatisWeekly")[0];
		var btn3 = Ext.ComponentQuery.query("#btnStatisMonthly")[0];
		
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn3.removeCls('buttonCls');
		if(buttonType == 'DAY'){
			btn1.addCls('buttonCls');
		}
		else if(buttonType == 'WEEK'){
			btn2.addCls('buttonCls');
		}
		else if(buttonType == 'MONTH'){
			btn3.addCls('buttonCls');
		}
		btn2.addCls(null);
		btn3.addCls(null);
	},
	btnStatisDaily: function(){
		var today = new Date();
		this.startDate = formatSupporter.getTimeStempDateFormat(today);
		this.request('DAY', this.startDate, this.startDate);
		this.selectButton('DAY');
		this.statisticType = "DAY";
	},
	btnStatisWeekly:function(){
		var today = new Date();
		this.startDate = formatSupporter.getTimeStempDateFormat(today);
		this.request('WEEK', this.startDate, this.startDate);
		this.selectButton('WEEK');
		this.statisticType = "WEEK";
	},
	doubleClickUser:function(compt, record, item, index, e){
		var roomUseId = record.get('ROOM_USED_ID');
		if(roomUseId == null) return;
		var param = "?LIID=" + roomUseId + "&SUPPLYER="+WEB_ADDR+"&PRINT_TYPE=1"; 
		var location = contextPath + "/report/billPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
	},
	btnStatisMonthly:function(){
		var today = new Date();
		this.startDate = formatSupporter.getTimeStempDateFormat(today);
		this.request('MONTH', this.startDate, this.startDate);
		this.selectButton('MONTH');
		this.statisticType = "MONTH";
	},
	btnStatisQuy:function(){
		if(this.popLookupTime == null){
			this.popLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
		}
		this.popLookupTime.show();
	},
	btnStatisDebitPrint:function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate+"&HAS_PAYED=1"; 
		var location = contextPath + "/report/PrintDebitStatistic.do" + param;
		utilForm.btn_template_popup(location,"Doanh thu",800,1024,true);
	},
	btnStatisPrint: function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
		var location = contextPath + "/report/calculateProfit.do" + param;
		utilForm.btn_template_popup(location,"Doanh thu",800,1024,true);
	},
	btnExportPrint:function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
		var location = contextPath + "/report/exportStore.do" + param;
		utilForm.btn_template_popup(location,"Xuất kho",800,1024,true);
	},
	btnStoreStatic:function(){
		var param = "?LIID="; 
		var location = contextPath + "/report/calculateStore.do" + param;
		utilForm.btn_template_popup(location,"Báo cáo tồn kho",800,1024,true);
	},
	btnSubmitLookupTime:function(){
		this.statisticType = 'OTHER'
		this.selectButton('OTHER');
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		this.request('OTHER', this.startDate, this.endDate);
	},
	btnSaveDebitPayment: function(){
		if(BtnUpdatePayment.roomUseId == null || BtnUpdatePayment.roomUseId == '')
		return;
		var roomUseId = BtnUpdatePayment.roomUseId;
		var hasPayed = Ext.ComponentQuery.query('#btnDebitPayment #HAS_PAYED')[0].getValue();
		var dscrValue  = Ext.ComponentQuery.query('#btnDebitPayment #PAY_INFO')[0].getValue();
		var payDate  = Ext.ComponentQuery.query('#btnDebitPayment #PAY_DATE')[0].getValue();
		
		var submitFinishUrl = contextPath + '/room/saveDebitPayment.json';
		
		supportEvent.showLoadingOnprogress('Đang lưu...', 'btnEndRunningRoom');
		
			Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: {
					ROOM_USED_ID: roomUseId,
	    			HAS_PAYED: hasPayed,
	    			PAY_INFO: dscrValue,
	    			PAY_DATE: payDate
					},
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log(text.data);
	    			BtnUpdatePayment.hide();
	    			var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
	    			statisStore.load();
	    			if( text.success == true){
    					supportEvent.hiddeMessageBox();
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');
	    		},
	    		failure: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	request:function(reqType, stsDate, endDate){
		
		var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
		statisStore.getProxy().url = contextPath + '/report/getPagingStatistic.json';
		statisStore.getProxy().extraParams = {
			TYPE_STATIS: reqType,
			STARTDATE: stsDate,
			ENDDATE: endDate,
		};
		statisStore.currentPage = 1;
		statisStore.pageSize=15;
		statisStore.load({
			 callback: function (records, operation, success) {
		        var data = Ext.JSON.decode(operation.response.responseText);
		        SumObj = data.SumObj;
		        totalValue = SumObj.total;
		        payedValue = SumObj.payed;
		        value1 = formatSupporter.formatToMoney(totalValue);
		        value2 = formatSupporter.formatToMoney(payedValue);
		        value3 = formatSupporter.formatToMoney(totalValue - payedValue);
		        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
		        Ext.ComponentQuery.query('#statis-payed-id')[0].setText(value2);
		        Ext.ComponentQuery.query('#statis-debit-id')[0].setText(value3);
		     }
		});
	},
	btnStatisAllDebit:function(){
		alert('1234');
	}
})