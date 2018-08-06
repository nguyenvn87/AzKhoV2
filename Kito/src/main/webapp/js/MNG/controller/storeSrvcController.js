var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});


Ext.define('MNG.controller.storeSrvcController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.storeSrvcView'
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
		});
	},
	deleteMenu: function(){
		alert('Delete');
	},
	openBtnPopStore:function(){
		if(this.popStore==null){
			this.popStore = Ext.create('MNG.view.popup.BtnPopStore',{});
		}
		this.popStore.show();
	},
	doubleClickStore:function(){
		if(this.popStore==null){
			this.popStore = Ext.create('MNG.view.popup.BtnPopStore',{});
		}
		this.popStore.show();
		gridSupport.selectGridPopup('#container-store-srvc','#grid-store-srvc','#btnStoreContainerId');
	},
	BtnSaveStore:function(){
		this.request();
	},
	request:function(){
		
		var parent = this;
		var srvcId = Ext.ComponentQuery.query('#btnStoreContainerId #SRVC_ID')[0].getValue();
		var unit = Ext.ComponentQuery.query('#btnStoreContainerId #UNIT')[0].getValue();
		var total = Ext.ComponentQuery.query('#btnStoreContainerId #AMOUNT_STORE')[0].getValue();
		
		param={'SRVC_ID': srvcId};
		param['IS_USED'] =  1;
		param['AMOUNT_STORE'] = total;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveService.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			parent.popStore.hide();
    			if( text.success == true){
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-store-srvc')[0];
    				var storeTmp = Grid.getStore();
    				console.log(storeTmp);
    				storeTmp.load();
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
	}
})