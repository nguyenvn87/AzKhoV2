var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var btnAddCustomer = Ext.create('MNG.view.popup.BtnCustomer',{});
var btnListBillCustomer = Ext.create('MNG.view.popup.BtnCustomerBill',{});
var utilForm = Ext.create('CMM.form.util',{});

Ext.define('MNG.controller.customerController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.srvcView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#btnAddCustomer':{
				click: this.btnAddCustomer
			},
			'#BtnSaveSrvc' : {
				click : this.createCustomer
			},
			'#delSrvcBtn' : {
				click : this.deleteUser
			},
			'#grid-customer-item':{
				itemdblclick: this.doubleClickCustomer
			},
			'#grid-customer-bill':{
				itemdblclick: this.doubleClickViewBill
			},
			'#btnViewCustomerBill':{
				click : this.viewBill
			}
		});
	},
	clickSrvcSearch:function(){
		var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				NAME: _value,
				limit: 10
		};
		storeTmp.getProxy().url = contextPath + '/customer/getLisPagingCustomers.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	},
	btnAddCustomer:function(){
		me = this;
		var params = {
				cusName : null,
				cusID: 0,
				cusPhone:'',
				cusEmail:'',
				cusAddr:'',
				score: 0
		};
		me.showAddCustomer(params);
	},
	showAddCustomer:function(params){
		btnAddCustomer.config = params;
		console.info(params);
		btnAddCustomer.show();
		btnAddCustomer.initNew();
	},
	createCustomer:function(){
		var parent = this;
		name = Ext.ComponentQuery.query('#addCustomerId #NAME')[0].getValue();
		phone = Ext.ComponentQuery.query('#addCustomerId #PHONE')[0].getValue();
		email = Ext.ComponentQuery.query('#addCustomerId #EMAIL')[0].getValue();
		addr = Ext.ComponentQuery.query('#addCustomerId #ADDR')[0].getValue();
		score = Ext.ComponentQuery.query('#addCustomerId #ACCUMULT')[0].getValue();
		
		var params = {
				CUS_CD: btnAddCustomer.config.cusID,
				NAME: name,
				PHONE: phone,
				EMAIL: email,
				ADDR: addr,
				ACCUMULT: 0
		};
		parent.submitRequestCustomer(params);
	},
	submitRequestCustomer:function(_params){
		var parent = this;
		var submitFinishUrl = contextPath + '/customer/createCustomer.json';
		supportEvent.showLoadingOnprogress('Đang lưu...', 'BtnSaveSrvc');
		
		Ext.Ajax.request( {
			url: submitFinishUrl,
    		method:'POST',
    		params: _params,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.info(text);
    			if( text.success == true){
    				parent.hasPayed = true;
    				Ext.MessageBox.hide();
    				btnAddCustomer.hide();
    				var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.currentPage = 1;
					storeTmp.pageSize=13;
					storeTmp.getProxy().extraParams = {
								};
					storeTmp.load();
    			}
    			else supportEvent.showMessageError('Có lỗi xảy ra !');
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			supportEvent.showMessageError('Có lỗi xảy ra !');
    		}
		});
	},
	doubleClickCustomer:function(compt, record, item, index, e){
		var idCus = record.get('CUS_CD');
		if(idCus != null){
			btnListBillCustomer.show();
			btnListBillCustomer.loadListBills(idCus+'');
		}
	},
	viewBill:function(){
		userGrid = Ext.ComponentQuery.query('#grid-customer-bill')[0];
		if(userGrid.getSelectionModel().hasSelection()){
			tmpRow = userGrid.getSelectionModel().getSelection()[0];
			roomUseId = tmpRow.get('ROOM_USED_ID');
			var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
			var location = contextPath + "/report/billRetailPrint.do" + param;
			utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
		}
	},
	doubleClickViewBill:function(compt, record, item, index, e){
		console.info(record);
		roomUseId = record.get('ROOM_USED_ID');
		var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
		var location = contextPath + "/report/billRetailPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
	}
})