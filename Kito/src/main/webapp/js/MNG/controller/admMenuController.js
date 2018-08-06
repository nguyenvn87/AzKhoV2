var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});

Ext.define('MNG.controller.menuController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.menuView'
	         ,'Ext.extCombo.view.SimpleComboBox'],
	popMenu: null,
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
		alert('Delete');
	},
	openBtnMenu:function(){
		this.popMenu.show();
	},
	doubleClickMenu:function(){
		if(this.popMenu==null){
			this.popMenu = Ext.create('MNG.view.popup.BtnAddMenu',{});
		}
		this.popMenu.show();;
	},
	BtnSaveMenu:function(){
		alert('BtnSaveMenu');
		this.request();
	},
	request:function(){
		alert('123');
		var RoomFlor = Ext.ComponentQuery.query('#btnAddMenuContainer #PROD_NM')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnAddMenuContainer #PRICE')[0].getValue();
		var RoomType = Ext.ComponentQuery.query('#btnAddMenuContainer #ROOM_TYPE')[0].getValue();
		var formRoom = this.popRoom;
		
		param={'PRICE': RoomFlor};
		param['PROD_NM'] =  RoomNo;
		param['ROOM_TYPE'] = RoomType;
		
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
    				var Grid = Ext.ComponentQuery.query('#grid-room')[0];
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