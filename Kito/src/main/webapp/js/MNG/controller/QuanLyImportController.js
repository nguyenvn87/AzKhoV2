var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});


Ext.define('MNG.controller.QuanLyImportController', {
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
			}
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
			    //if(this.popStore == null)
					this.popStore = Ext.create('MNG.view.popup.BtnImportDetail',
								{
									IMPRT_CD: 0, 
									IMPRT_BILL: "CD"+s,
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
		this.popStore = Ext.create('MNG.view.popup.BtnImportDetail',record.raw);
		this.popStore.show();
		gridSupport.selectGridPopup('#container-store-srvc','#grid-store-srvc','#btnStoreContainerId');
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
    			parent.popStore.hide();
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
	}
})