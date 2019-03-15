var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
var btnViewDetail = null;
var btnUpdateThanhToan = null;
Ext.define('MNG.controller.ChuaThanhToanController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.statistic'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'MONTH',
	startDate: null,
	endDate: null,
	userNm: null,
	paramsRequest:{
			TYPE_STATIS: null,
			STARTDATE: null,
			ENDDATE: null,
			IS_CANCELED: 0,
			DEBIT: 'true',
			HAS_PAYED: 0,
			USERNAME: ''
			},
	billObj:{
		IS_DELIVERED: -1
	},
	init : function() {
		this.control({
			
			'#btnStatisDaily' : {
				click : this.btnStatisDaily
			},
			'#btnStatisWeekly' : {
				click : this.btnStatisAllTime
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
			'#btnExportExcelPrint':{
				click : this.btnExportExcelPrint 
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
			},
			'#BtnSaveBill':{
				click: this.updateBillInfo
			},
			'#BtnCancelBill':{
				click: this.BtnCancelBill
			},
			'#FULLNAME':{
				select: this.onSelectUserName
			}
		});
	},
	onSelectUserName: function(combo, records, eOpts){
		this.userNm = combo.getValue();
		this.paramsRequest.USER_NAME = this.userNm;
		this.sendRequest(this.paramsRequest);
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
		arrTime = formatSupporter.getEnglishDate('TODAY');
		this.paramsRequest.STARTDATE = arrTime[0];
		this.paramsRequest.ENDDATE = arrTime[1];
		console.info(this.paramsRequest);
		this.sendRequest(this.paramsRequest);
		this.selectButton('DAY');
		this.statisticType = "DAY";
	},
	btnStatisAllTime:function(){
		var today = new Date();
		this.startDate = null;//formatSupporter.getTimeStempDateFormat(today);
		this.endDate = null;//
		this.paramsRequest.TYPE_STATIS = null;
		this.paramsRequest.STARTDATE = this.startDate;
		this.paramsRequest.ENDDATE = this.startDate;
		
		this.sendRequest(this.paramsRequest);
		this.selectButton('WEEK');
		this.statisticType = "WEEK";
	},
	doubleClickUser:function(compt, record, item, index, e){
		var roomUseId = record.get('ROOM_USED_ID');
		if(roomUseId == null) return;
		var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
		var location = contextPath + "/report/billRetailPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
	},
	btnStatisMonthly:function(){
		var today = new Date();
		//this.startDate = formatSupporter.getTimeStempDateFormat(today);
		arrTime = formatSupporter.getEnglishDate('MONTH');
		//this.paramsRequest.TYPE_STATIS = 'MONTH';
		this.paramsRequest.STARTDATE = arrTime[0];
		this.paramsRequest.ENDDATE = arrTime[1];
		
		this.sendRequest(this.paramsRequest);
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
		var param = "?LIID=" + this.paramsRequest.TYPE_STATIS;
		if(this.paramsRequest.STARTDATE != null)
				param = param + "&STARTDATE=" + this.paramsRequest.STARTDATE;
		if(this.paramsRequest.ENDDATE != null)
				param = param + "&ENDDATE=" + this.paramsRequest.ENDDATE;
		if(this.paramsRequest.USER_NAME != null)
				param = param + "&USER_NAME=" + this.paramsRequest.USER_NAME;
		if(this.paramsRequest.IS_CANCELED != null)
				param = param + "&IS_CANCELED="+this.paramsRequest.IS_CANCELED; 
		if(this.paramsRequest.DEBIT != null)
				param = param + "&DEBIT="+this.paramsRequest.DEBIT; 
		var location = contextPath + "/saleReport/calculateProfit.do" + param;
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
			this.paramsRequest.TYPE_STATIS = 'OTHER',
			this.paramsRequest.STARTDATE = this.startDate;
			this.paramsRequest.ENDDATE = this.endDate;
		this.sendRequest(this.paramsRequest);
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
	sendRequest:function(_params){
		userName = Ext.ComponentQuery.query("#MainContainerId #FULLNAME")[0].getValue();
		_params.USER_NAME = userName;
		_params.TYPE_STATIS = 'OTHER';
		var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
		statisStore.getProxy().url = contextPath + '/report/getPagingStatistic.json';
		statisStore.getProxy().extraParams = _params;
		statisStore.currentPage = 1;
		statisStore.pageSize=PAGE_SIZE;
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
	},
	getCustomerInfo:function(customerId){
		customerId = 2;
		var submitFinishUrl = contextPath + '/customer/getCustomersVo.json';
		var params = {
				CUS_CD: customerId
		};
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'GET',
	    		params: params,
	    		success: function(response){
	    			/*var text = Ext.JSON.decode(response.responseText);
	    			BtnUpdatePayment.hide();
	    			var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
	    			statisStore.load();
	    			if( text.success == true){
    					supportEvent.hiddeMessageBox();
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');*/
	    		},
	    		failure: function(response){
	    			//var text = Ext.JSON.decode(response.responseText);
	    			//supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	updateBillInfo:function(){
		var params = {
				//IS_DELIVERED: (Ext.ComponentQuery.query('#btnSrvcContainerId #IS_DELILVER')[0].getValue()==true)?1:0,
				//DSCRT: Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].getValue(),
				HAS_PAYED: (Ext.ComponentQuery.query('#btnSrvcContainerId #HAS_PAYED')[0].getValue()==true)?1:0,
				ROOM_USED_ID: btnViewDetail.config.ROOM_USED_ID,
				PAYED_MONEY: Ext.ComponentQuery.query('#btnSrvcContainerId #PAYED_MONEY')[0].getValue(),
				CUS_NM: Ext.ComponentQuery.query('#btnSrvcContainerId #CUS_NM')[0].getRawValue(),
				CUS_CD: btnViewDetail.config.cusCd
				//IS_DELIVERED_OLD: this.billObj.IS_DELIVERED
		};
		this.submitUpdateBill(params);
	},
	showCustomerInfo1:function(param){
    	btnViewDetail.config = param;
    	btnViewDetail.show();
	},
	showCustomerInfo:function(param){
		if(btnViewDetail != null) btnViewDetail.close();
		btnViewDetail = Ext.create('MNG.view.popup.BtnBillInfo',{config:param});
		//btnViewDetail.config = param;
    	//btnViewDetail.config.ROOM_USED_ID = param.ROOM_USED_ID;
    	btnViewDetail.show();
    	btnViewDetail.renderValue();
	},
	BtnCancelBill:function(){
		var parent = this;
		var params = {
				IS_DELIVERED: (Ext.ComponentQuery.query('#deliveryContainerInfo [name=IS_DELILVER]')[0].getValue()==true)?1:0,
				DSCRT: Ext.ComponentQuery.query('#deliveryContainerInfo [name=DSCRT]')[0].getValue(),
				HAS_PAYED: (Ext.ComponentQuery.query('#paymentContainerInfo [name=HAS_PAYED]')[0].getValue()==true)?1:0,
				ROOM_USED_ID: btnViewDetail.config.ROOM_USED_ID,
				IS_CANCELED: 1,
		};
		Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn hủy ?', function(btn){
			if(btn == 'yes'){
				parent.submitUpdateBill(params);
			}
		});
	},
	submitUpdateBill:function(params){
		var storeTmp = btnViewDetail.savePaymentMethod();
		console.log('storeTmp',storeTmp);
		var submitFinishUrl = contextPath + '/customer/updateBillCustomer.json';
		supportEvent.showLoadingOnprogress('Đang cập nhật', '');
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: params,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			btnViewDetail.close();
	    			var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
	    			statisStore.load();
	    			if( text.success == true){
    					supportEvent.hiddeMessageBox();
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');
	    		},
	    		failure: function(response){
	    			//var text = Ext.JSON.decode(response.responseText);
	    			supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	deleteItemRecord:function(grid, rowIndex, colIndex){
		console.info('grid');
		store = grid.getStore();
		var rec = store.getAt(rowIndex);
		console.info(rec);
		_params = {
				ID: rec.get('ID')+'',
				SRVC_ID: rec.get('SRVC_ID')
		};
		this.submitDeleteRequestBill(_params);
	},
	isDupplicateRecord:function(menuId, _srvcRoomStore){
		var isExist = false;
		_srvcRoomStore.each(function(record) {
			if(menuId != null && menuId == record.get('SRVC_ID')){
				isExist = true;
				return isExist;
			}
		});
		return isExist;
	},
	submitDeleteRequestBill:function(_params){
		var submitFinishUrl = contextPath + '/srvc/deleteProductInBill.json';
		supportEvent.showLoadingOnprogress('Đang cập nhật', '');
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: _params,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			btnViewDetail.close();
	    			var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
	    			statisStore.load();
	    			if( text.success == true){
    					supportEvent.hiddeMessageBox();
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');
	    		},
	    		failure: function(response){
	    			//var text = Ext.JSON.decode(response.responseText);
	    			supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	btnSavingRequest:function(paramsData){
				
		url_request = contextPath + '/sale/saveEditSaleOrderList.json';
		Ext.Ajax.request( {
		    	url: url_request,
		    	method:'POST',
		    	params: paramsData,
		    	success: function(response){
		    		var text = Ext.JSON.decode(response.responseText);
		    		btnViewDetail.close();
	    			var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
	    			statisStore.load();
		    		supportEvent.showMessageSuccess('Cập nhật thành công');
		    	},
		    	failure: function(response){
		    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
		    	}
		 });	
	},
	btnExportExcelPrint: function(){
		var param = "?FILENAME="+ "Danh_Sach_Don"; 
		if(this.paramsRequest.STARTDATE != null)
				param = param + "&STARTDATE=" + this.paramsRequest.STARTDATE;
		if(this.paramsRequest.ENDDATE != null)
				param = param + "&ENDDATE=" + this.paramsRequest.ENDDATE;
		if(this.paramsRequest.USER_NAME != null)
				param = param + "&USER_NAME=" + this.paramsRequest.USER_NAME;
		if(this.paramsRequest.IS_CANCELED != null)
				param = param + "&IS_CANCELED="+this.paramsRequest.IS_CANCELED; 
		if(this.paramsRequest.DEBIT != null)
				param = param + "&DEBIT="+this.paramsRequest.DEBIT;
		if(this.paramsRequest.HAS_PAYED != null)
				param = param + "&HAS_PAYED="+this.paramsRequest.HAS_PAYED;
		
		var _url = contextPath + '/saleReport/excel/DanhSachDonHang.do'+param;
		supportEvent.downloadFile(_url);
	},
	updateHinhThucThanhToan:function(record){
		var _targetComponent = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
		
		if(btnUpdateThanhToan) btnUpdateThanhToan.close();
		btnUpdateThanhToan = Ext.create('ECNT.view.popup.BtnUpdateThanhToan'
				,{roomUsedId:record.data.ROOM_USED_ID
				, valueTotal: record.data.TOTAL_MONEY
				, valuePayed: record.data.PAYED_MONEY
				, hasPayed: record.data.HAS_PAYED
				, targetComponent: _targetComponent
				});
		btnUpdateThanhToan.show();
	}
})