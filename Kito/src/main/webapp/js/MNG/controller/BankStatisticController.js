var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var totalValue = 0;
var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
var BtnAddBankAccount = Ext.create('MNG.view.popup.BtnAddBankAccount',{});

var btnViewDetail = Ext.create('MNG.view.popup.BtnBillInfo',{});

Ext.define('MNG.controller.BankStatisticController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.BankStatistic'],
	roomUseId: null,
	popup: null,
	popLookupTime: null,
	statisticType: 'MONTH',
	startDate: null,
	endDate: null,
	params:{
		startDate: formatSupporter.getEnglishDate('MONTH')[0],
		endDate: formatSupporter.getEnglishDate('MONTH')[1],
		paymentType: null,
		bankID: null,
		isChi: 0
	},
	init : function() {
		this.control({
			
			'#btnStatisMonthly' : {
				click : this.btnStatisMonthly 
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
			},
			'#BtnSaveBill':{
				click: this.updateBillInfo
			},
			'#BtnCancelBill':{
				click: this.BtnCancelBill
			},
			'#comboBankId':{
				change: this.onChangeBank
			},
			'#HOUS_APT_TYPE':{
				change: this.onChangeAccount
			},
			'#radiotime':{
				change: this.onChangeRadiotime
			},
			'#STATE_CANCEL':{
				change: this.onChangeStateCancel
			},
			'#CHANGETIME1':{
				select: this.onSelectDateStart
			},
			'#CHANGETIME2':{
				select: this.onSelectDateEnd
			},
			'#btn-add-bank':{
				click: this.addBankAccount
			},
			'#btn-edit-bank':{
				click: this.edtBankAccount
			},
			'#BtnSaveBank':{
				click: this.saveBankAccount
			}
		});
	},
	edtBankAccount:function(){
		var parent = this;
		if(parent.bankID != null && parent.bankID != ''){
			BtnAddBankAccount.show();
			parent.getBankAccountInfo(BtnAddBankAccount.ID_BANK);
		}
	},
	addBankAccount: function(){
		BtnAddBankAccount.show();
		BtnAddBankAccount.initNewObject();
	},
	onSelectDateStart: function(me){
		var parent = this;
		parent.params.startDate = me.getSubmitValue();
		parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
	},
	onSelectDateEnd: function(me){
		var parent = this;
		parent.params.endDate = me.getSubmitValue();
		parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
	},
	onChangeStateCancel: function(cb, nv, ov){
		var parent = this;
		if(nv.isChi == '1'){
			parent.params.isChi = 1;
		}else{
			parent.params.isChi = 0;
		}
		parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
	},
	onChangeRadiotime:function(cb, nv, ov){
		var parent = this;
		if(nv.time == 'Month'){
			Ext.ComponentQuery.query("#containerTimeId")[0].hide();
			var arrDate = formatSupporter.getEnglishDate('MONTH');
			parent.params.startDate = arrDate[0];
			parent.params.endDate = arrDate[1];
			parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
		}else{
			Ext.ComponentQuery.query("#containerTimeId")[0].show();
		}
	},
	onChangeAccount: function(cb, nv, ov){
		var parent = this;
		bankCombo = Ext.ComponentQuery.query("#comboBankId")[0];
		bankContainer = Ext.ComponentQuery.query("#containerBankId")[0];
		
		bankCombo.hide();
		bankContainer.hide();
		if(nv.housetype == 'ALL'){
			parent.params.paymentType = 'ALL';
			parent.params.bankID = null;
		}else if(nv.housetype == 'CASH'){
			parent.params.paymentType = 'CASH';
			parent.params.bankID = null;
		}else if(nv.housetype == 'EBANK'){
			
			bankCombo.show();
			bankContainer.show();
			parent.params.paymentType = 'EBANK';
			parent.params.bankID = bankCombo.getValue();
		}
		parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
	},
	onChangeBank: function(cb, nv, ov){
		parent = this;
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		bankCombo = Ext.ComponentQuery.query("#comboBankId")[0];
		_value = bankCombo.getValue();
		
		BtnAddBankAccount.ID_BANK = _value;
		var myController = MANAGER.app.getController('MNG.controller.BankStatisticController');
		myController.submiRrequest(arrDate[0],arrDate[1], 'EBANK', _value, parent.params.isChi);
	},
	selectButton: function(buttonType){
		this.statisticType = buttonType;
	},
	doubleClickUser:function(compt, record, item, index, e){
		var roomUseId = record.get('ROOM_USED_ID');
		if(roomUseId == null) return;
		var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
		var location = contextPath + "/report/billRetailPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
	},
	btnStatisMonthly:function(){
		var parent = this;
		var today = new Date();
		this.startDate = formatSupporter.getTimeStempDateFormat(today);
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		
		parent.params.startDate = arrDate[0];
		parent.params.endDate = arrDate[1];
		parent.submiRrequest(parent.params.startDate, parent.params.endDate, parent.params.paymentType, parent.params.bankID, parent.params.isChi);
	},
	btnStatisDebitPrint:function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate+"&HAS_PAYED=1"; 
		var location = contextPath + "/report/PrintDebitStatistic.do" + param;
		utilForm.btn_template_popup(location,"Doanh thu",800,1024,true);
	},
	btnStatisPrint: function(){
		var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate; 
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
		this.submiRrequest(this.startDate, this.endDate, null, null);
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
	submiRrequest:function(stsDate, endDate, paymethod, bankId, isChi){
		
		var statisStore = Ext.ComponentQuery.query("#grid-srvc-statistic")[0].getStore();
		statisStore.getProxy().url = contextPath + '/phieuthu/getPagingTongQuanThuChi.json';
		statisStore.getProxy().extraParams = {
			STARTDATE: stsDate,
			ENDDATE: endDate,
			//PAY_METHOD: paymethod,
			//ID_BANK : bankId,
			ISCHI: isChi
		};
		statisStore.currentPage = 1;
		statisStore.pageSize=10;
		statisStore.load({
			 callback: function (records, operation, success) {
		        var data = Ext.JSON.decode(operation.response.responseText);
		        SumObj = data.SumObj;
		        totalValue = SumObj.total;
		        thuValue = SumObj.thu;
		        chiValue = SumObj.chi;
		        value1 = formatSupporter.formatToMoney(thuValue);
				value2 = formatSupporter.formatToMoney(chiValue);
		        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
		        Ext.ComponentQuery.query('#statis-payed-id')[0].setText(value2);
		        //Ext.ComponentQuery.query('#statis-debit-id')[0].setText(value3);*/
		     }
		});
	},
	btnStatisAllDebit:function(){
		alert('1234');
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
	    		},
	    		failure: function(response){
	    		}
			});
	},
	updateBillInfo:function(){
		var params = {
				IS_DELIVERED: (Ext.ComponentQuery.query('#btnSrvcContainerId #IS_DELILVER')[0].getValue()==true)?1:0,
				DSCRT: Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].getValue(),
				HAS_PAYED: (Ext.ComponentQuery.query('#btnSrvcContainerId #HAS_PAYED')[0].getValue()==true)?1:0,
				ROOM_USED_ID: btnViewDetail.config.turnId,
				CUS_NM: Ext.ComponentQuery.query('#btnSrvcContainerId #CUS_NM')[0].getRawValue(),
				CUS_CD: btnViewDetail.config.cusCd
		};
		this.submitUpdateBill(params);
	},
	showCustomerInfo:function(param){
    	btnViewDetail.config = param;
    	btnViewDetail.show();
    	btnViewDetail.renderValue();
	},
	BtnCancelBill:function(){
		var parent = this;
		var params = {
				IS_DELIVERED: (Ext.ComponentQuery.query('#btnSrvcContainerId #IS_DELILVER')[0].getValue()==true)?1:0,
				DSCRT: Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].getValue(),
				HAS_PAYED: (Ext.ComponentQuery.query('#btnSrvcContainerId #HAS_PAYED')[0].getValue()==true)?1:0,
				ROOM_USED_ID: btnViewDetail.config.turnId,
				IS_CANCELED: 1,
		};
		Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn hủy ?', function(btn){
			if(btn == 'yes'){
				parent.submitUpdateBill(params);
			}
		});
	},
	submitUpdateBill:function(params){
		var submitFinishUrl = contextPath + '/customer/updateBillCustomer.json';
		supportEvent.showLoadingOnprogress('Đang cập nhật', '');
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: params,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			btnViewDetail.hide();
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
	saveBankAccount: function(){
		var bankNM = Ext.ComponentQuery.query('#btnSrvcContainerId #BANK_NM')[0].getValue();
		var accountNote = Ext.ComponentQuery.query('#btnSrvcContainerId #NOTE')[0].getValue();
		
		var params = {
				ID_BANK: BtnAddBankAccount.ID_BANK,
				BANK_NM: bankNM,
				NOTE: accountNote
		};
		
		var submitFinishUrl = contextPath + '/bank/saveBankAccount.json';
		supportEvent.showLoadingOnprogress('Đang cập nhật', '');
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: params,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			BtnAddBankAccount.hide();
	    			var statisStore = Ext.ComponentQuery.query("#comboBankId")[0].getStore();
	    			statisStore.load();
	    			if( text.success == true){
    					supportEvent.hiddeMessageBox();
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');
	    		},
	    		failure: function(response){
	    			supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	getBankAccountInfo:function(bankId){
		var submitFinishUrl = contextPath + '/bank/getBankAccountVO.json';
		var params = {
				ID_BANK: bankId
		};
		Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'GET',
	    		params: params,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.info(text.data);
	    			BtnAddBankAccount.renderData(text.data);
	    		},
	    		failure: function(response){
	    		}
			});
	},
})