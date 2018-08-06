var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});

Ext.define('MNG.controller.menuController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.menuView'
	         ,'Ext.extCombo.view.SimpleComboBox'],
	popMenu: null,
	srvcId: null,
	init : function() {
		this.control({
			
			'#BtnSaveMenu' : {
				click : this.BtnSaveMenu
			},
			'#addMenuBtn' : {
				click : this.openBtnMenu
			},
			'#delMenuBtn' : {
				click : this.deleteMenu
			},
			'#grid-menu':{
				itemdblclick: this.doubleClickMenu
			},
		});
	},
	deleteMenu: function(){
		alert('Delete 123');
	},
	openBtnMenu:function(){
		
		if(this.popMenu==null){
			this.popMenu = Ext.create('MNG.view.popup.BtnAddMenu',{});
		}
		this.popMenu.menuId = null;
		this.popMenu.setDeactiveCreate(false);
		this.popMenu.show();
	},
	doubleClickMenu:function(compt, record, item, index, e){
		
		var menuId = record.get('MENU_ID');		
		if(menuId){
			if(this.popMenu==null){
				this.popMenu = Ext.create('MNG.view.popup.BtnAddMenu',{});
			}
			gridSupport.selectGridPopup('#mainContainerID','#grid-menu','#btnMenuContainerId');
			this.popMenu.menuId = menuId;
			this.popMenu.setDeactiveCreate(true);
			this.popMenu.show();
		}
	},
	BtnSaveMenu:function(){
		
		if(this.popMenu.menuId == null){
			
			var isExist = false;
			var srvcId = Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0].getValue();
			var gridTmp = Ext.ComponentQuery.query('#grid-menu')[0];
			
			gridTmp.getStore().each(function(record) {
				if(srvcId != null && srvcId == record.get('SRVC_ID')){
					isExist = true;
					supportEvent.showWarningTimer('Đã tồn tại trong menu');
				}
			});
			if(isExist == false)
				this.request();
		}
		else this.request();
	},
	request:function(){
		
		var srvcId = Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0].getValue();
		var menuNM = Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0].getRawValue();
		var price = Ext.ComponentQuery.query('#btnMenuContainerId #PRICE')[0].getValue();
		var type = Ext.ComponentQuery.query('#btnMenuContainerId #UNIT')[0].getValue();
		var active = Ext.ComponentQuery.query('#btnMenuContainerId #ACTIVE')[0].getValue();
		var isDefault = Ext.ComponentQuery.query('#btnMenuContainerId #IS_DEFAULT')[0].getValue();
		
		var formRoom = this.popMenu;
		
		param={'PRICE': price};
		param['PROD_NM'] =  menuNM;
		param['SRVC_ID'] =  srvcId;
		param['UNIT'] =  type;
		param['MENU_ID'] = this.popMenu.menuId;
		param['ACTIVE'] = active;
		param['IS_DEFAULT'] = isDefault;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveMenu.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			//console.log( text.result);
    			if( text.success == true){
    				formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-menu')[0];
    				var storeTmp = Grid.getStore();
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