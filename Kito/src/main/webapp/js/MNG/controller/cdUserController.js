var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});

Ext.define('MNG.controller.cdUserController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.cdUserView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#BtnSaveMenu' : {
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
		var gridTmp = Ext.ComponentQuery.query('#grid-srvc')[0];
		if(gridTmp.getSelectionModel().hasSelection()){	
			var row = gridTmp.getSelectionModel().getSelection()[0];
			param={'CD': row.get('CD')};
			param['STATUS'] =  'DELETE';
			this.request(param);
		}
	},
	updateDeleteUser: function(record){
		var gridTmp = Ext.ComponentQuery.query('#grid-srvc')[0];
		if(gridTmp.getSelectionModel().hasSelection()){	
			var row = gridTmp.getSelectionModel().getSelection()[0];
			param={'CD': record.get('CD')};
			param['STATUS'] =  'DELETE';
			param['CD_NM'] =  record.get('CD_NM');
			this.request(param);
		}
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddCmdUser',{
				idProvider: null
				,title: 'Cập nhật thông tin'});
		}
		this.popup.config.code = -1;
		this.popup.initNew();
		this.popup.show();
	},
	doubleClickUser:function(component, record, index, eOpts){
		/*var idCD = record.get('CD');
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddCmdUser',{
				 config:{
					groupcd: '',
					code: idCD,
					name: 'Tên',
					value: '',
					emptytxt: 'Nhập tên'
				 },
				 title: 'Cập nhật nhóm'});
		}
		
		this.popup.idProvider = idCD;
		this.popup.config.code = idCD;
		this.popup.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-srvc','#btnMenuContainerId');*/
		this.showToEditForm(record);
	},
	showToEditForm: function(record){
		var idCD = record.get('CD');
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddCmdUser',{
				 config:{
					groupcd: '',
					code: idCD,
					name: 'Tên',
					value: '',
					emptytxt: 'Nhập tên'
				 },
				 title: 'Cập nhật nhóm'});
		}
		
		this.popup.idProvider = idCD;
		this.popup.config.code = idCD;
		this.popup.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-srvc','#btnMenuContainerId');
	},
	BtnSaveUser:function(){
		formRoom = this.popup;
		var prvName = Ext.ComponentQuery.query('#btnMenuContainerId #CD')[0].getValue();
		var prvFone = Ext.ComponentQuery.query('#btnMenuContainerId #CD_NM')[0].getValue();
		var groupCd = Ext.ComponentQuery.query('#mainContainerID #GROUP_CD')[0].getValue();
		var groupNm = Ext.ComponentQuery.query('#mainContainerID #GROUP_NM')[0].getValue();
		
		if(groupCd == 'GRHAG'){
			 prvFone = prvFone.toUpperCase();
		}
		param={'CD': formRoom.config.code};
		param['CD_NM'] =  prvFone;
		param['GROUP_CD'] = groupCd;
		param['GROUP_NM'] = groupNm;
		formRoom.hide();
		this.request(param);
	},
	request:function(param){
		
		Ext.Ajax.request( {
    		url: contextPath + '/setting/createCDUser.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
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