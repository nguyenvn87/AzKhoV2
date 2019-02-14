var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});

Ext.define('MNG.controller.providerController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.providerView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#BtnSaveSrvc' : {
				click : this.BtnSaveUser
			},
			'#addSrvcBtn' : {
				click : this.openBtnUser
			},
			'#delSrvcBtn' : {
				click : this.deleteUser
			},
			'#grid-srvc':{
				itemdblclick: this.doubleClickUser
			},
		});
	},
	deleteUser: function(){
		var me = this;
		var gridTmp = Ext.ComponentQuery.query('#grid-srvc')[0];
		if(gridTmp.getSelectionModel().hasSelection()){	
			var row = gridTmp.getSelectionModel().getSelection()[0];
			param={'PROV_CD': row.get('PROV_CD')};
			param['STATUS'] =  'DELETE';
			Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				me.requestSubmit(param);
			}
			});
		}
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddProvider',{idProvider: null});
		}
		this.popup.initNewProvider();
		this.popup.show();
	},
	doubleClickUser:function(component, record, index, eOpts){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddProvider',{});
		}
		var idProvider = record.get('PROV_CD');
		this.popup.idProvider = idProvider;
		console.log('idProvider = '+idProvider);
		this.popup.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-srvc','#btnSrvcContainerId');
	},
	BtnSaveUser:function(){
		this.request();
	},
	request:function(){
		
		formRoom = this.popup;
		var prvName = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_NM')[0].getValue();
		var prvFone = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_PHONE')[0].getValue();
		var prvUser = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_USER')[0].getValue();
		var prvAddr = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_ADDR')[0].getValue();
		var prvEmail = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_EMAIL')[0].getValue();
		var prvDcsrt = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_DCSRT')[0].getValue();
		
		param={'PROV_CD': formRoom.idProvider};
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
    			console.log( text);
    			if( text.success == true){
    				formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
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
	},
	requestSubmit:function(param){
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveProvider.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			if( text.success == true){
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
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