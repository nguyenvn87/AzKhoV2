var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var btnAddProvider = Ext.create('MNG.view.popup.BtnAddProvider',{});

Ext.define('MNG.controller.importController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.importView'
	         ,'Ext.extCombo.view.SimpleComboBox'],
	popStore: null,
	init : function() {
		this.control({
			
			'#BtnSaveStore' : {
				click : this.BtnSaveStore
			},
			'#addMenuBtn' : {
				click : this.openBtnPopStore
			},
			'#delMenuBtn' : {
				click : this.deleteMenu
			},
			'#grid-store-srvc':{
				itemdblclick: this.doubleClickStore
			},
			'#btnSaveImportDetail':{
				click: this.btnSaveImportDetail
			},
			'#btnAddCustomer':{
				click: this.btnAddCustomer
			},
			'#BtnSaveSrvc' : {
				click : this.btnSaveProvider
			},
		});
	},
	deleteMenu: function(){
		var param;
		var gridTmp = Ext.ComponentQuery.query('#grid-store-srvc')[0];
		if(gridTmp.getSelectionModel().hasSelection()){	
			var row = gridTmp.getSelectionModel().getSelection()[0];
			param= row.get('IMPRT_CD');
		}
		else return;
		Ext.Ajax.request( {
    		url: contextPath + '/store/removeImport.json',
    		method:'POST',
    		params: {IMPRT_CD : param},
    		success: function(response){
    			var Grid = Ext.ComponentQuery.query('#grid-store-srvc')[0];
				var storeTmp = Grid.getStore();
				storeTmp.load();
    		}
		});
	},
	openBtnPopStore:function(){
		
		Ext.Ajax.request( {
    		url: contextPath + '/store/countImport.json',
    		method:'POST',
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			var maxID = text.data + 1;
    			var s = maxID+"";
			    while (s.length < 6) s = "0" + s;
			    if(this.popStore) this.popStore.close();
				this.popStore = Ext.create('MNG.view.popup.BtnImportDetail',
								{
									IMPRT_CD: 0, 
									//IMPRT_BILL: "CD"+s,
									IMPRT_BILL: "",
									DISCOUNT_MONEY: 0,
									TOTAL_MONEY : 0,
									NEEDTOPAYED : 0,
									PAYED_MONEY : 0
								});
				this.popStore.show();
    		},
    		failure: function(response){
    		}
    	});
	},
	exportExcelPrint: function(){

		var param = "?STARTDATE="+ this.startDate+"&ENDDATE="+ this.endDate; 
		var _url = contextPath + '/report/excel/exportExcel.do'+param;
		this.downloadFile(_url);
	},
	doubleClickStore:function(object,record){
		me = this;
		if(me.popStore) me.popStore.close();
		me.popStore = Ext.create('MNG.view.popup.BtnImportDetail',record.raw);
		me.popStore.show();
		//gridSupport.selectGridPopup('#container-store-srvc','#grid-store-srvc','#btnStoreContainerId');
	},
	BtnSaveStore:function(){
		this.request();
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
	request:function(){
		
		var parent = this;
		var srvcId = Ext.ComponentQuery.query('#btnStoreContainerId #SRVC_ID')[0].getValue();
		var unit = Ext.ComponentQuery.query('#btnStoreContainerId #UNIT')[0].getValue();
		var total = Ext.ComponentQuery.query('#btnStoreContainerId #TOTAL_NO')[0].getValue();
		
		param={'SRVC_ID': srvcId};
		param['UNIT'] =  unit;
		param['TOTAL_NO'] = total;
		
		Ext.Ajax.request( {
    		url: contextPath + '/store/saveStore.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			parent.popStore.close();
    			if( text.success == true){
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-store-srvc')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.load();
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			alert('Save failure' );
    		}
    	});
	},
	btnAddCustomer: function(){
		btnAddProvider.show();
	},
	btnSaveProvider:function(){
		
		//formRoom = this.popup;
		var prvName = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_NM')[0].getValue();
		var prvFone = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_PHONE')[0].getValue();
		var prvUser = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_USER')[0].getValue();
		var prvAddr = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_ADDR')[0].getValue();
		var prvEmail = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_EMAIL')[0].getValue();
		var prvDcsrt = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_DCSRT')[0].getValue();
		
		param={};
		param['PROV_NM'] =  prvName;
		param['PROV_PHONE'] = prvFone;
		param['PROV_USER'] = prvUser;
		param['PROV_ADDR'] = prvAddr;
		param['PROV_EMAIL'] = prvEmail;
		param['PROV_DCSRT'] = prvDcsrt;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveProvider.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			btnAddProvider.hide();
    			if( text.success == true){
    				console.log('1111111111111111111');
    				
    				var providerStore = Ext.ComponentQuery.query('#PROV_CD_Item')[0].getStore();
    				providerStore.load();
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			alert('Save failure' );
    		}
    	});
	},
	getExcelFillBill:function(record){
		me = this;
		console.log('record', record);
		var importCd = record.get('IMPRT_CD');
		var param = "?IMPRT_CD="+importCd + "&FILENAME=" + record.get('IMPRT_BILL'); 
		param = param+"&title="+"HÓA ĐƠN NHẬP HÀNG";
		if(importCd == null) return;
		var _url = contextPath + '/store/Excel/ChiTietNhapHang.do'+param;
		me.downloadFile(_url);
	}
})