var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var util = Ext.create('BIZ.utilities.collapseExpanseSupport', {});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});


Ext.define('MNG.controller.adminController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.adminView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	popRoom: null,
	popMenu: null,
	popSrvc: null,
	init : function() {
		this.control({
			// 1.USER
			'#grid-user' : {
				afterrender : this.gridUserRender
			},
			'#btnSaveUser' : {
				click : this.BtnSaveUser
			},
			'#addUserBtn' : {
				click : this.openBtnUser
			},
			'#delUserBtn' : {
				click : this.deleteUser
			},
			'#grid-user':{
				itemdblclick: this.doubleClickUser
			},
			// 2.ROOM
			'#BtnSaveRooom' : {
				click : this.BtnSaveRooom
			},
			'#btnRoomForm' : {
				click : this.openBtnRoom
			},
			'#grid-room':{
				itemdblclick: this.doubleClickRoom
			},
			// 3.MENU
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
			// 4. Service
			'#addSrvcBtn':{
				click: this.addSrvcBtn
			},
			'#BtnSaveSrvc' : {
				click : this.BtnSaveGoods
			},
			'#grid-srvc':{
				itemdblclick: this.doubleClickGoods
			},
		});
	},
	gridUserRender:function(){
		alert('1234');
		var Grid = Ext.ComponentQuery.query('#grid-user')[0];
		var storeTmp = Grid.getStore();
		console.log(storeTmp);
		storeTmp.load();
	},
	deleteUser: function(){
		alert('Delete');
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddUser',{});
		}
		this.popup.show();
		this.popup.isCreate = true;
	},
	doubleClickUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddUser',{});
		}
		this.popup.show();
		gridSupport.selectGridPopup('#AdminContainerID','#grid-user','#btnUserContainerId');
		this.popup.isCreate = false;
	},
	BtnSaveUser:function(){
		this.request();
	},
	request:function(){
		var parent = this;
		
		var userName = Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].getValue();
		var fullname = Ext.ComponentQuery.query('#btnUserContainerId #FULLNAME')[0].getValue();
		var addr = Ext.ComponentQuery.query('#btnUserContainerId #ADDRESS')[0].getValue();
		var phone = Ext.ComponentQuery.query('#btnUserContainerId #PHONE')[0].getValue();
		var email = Ext.ComponentQuery.query('#btnUserContainerId #EMAIL')[0].getValue();
		var cmnd = Ext.ComponentQuery.query('#btnUserContainerId #CMND')[0].getValue();
		var enabled = Ext.ComponentQuery.query('#btnUserContainerId #ENABLED')[0].getValue();
		
		
		param={'USERNAME': userName};
		param['FULLNAME'] = fullname;
		param['ADDRESS'] = addr;
		param['PHONE'] = phone;
		param['EMAIL'] = email;
		param['CMND'] = cmnd;
		param['ENABLED'] = enabled;
		param['STATUS'] = parent.popup.isCreate;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveUserVo.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			//console.log( text.result);
    			if( text.success == true){
    				parent.popup.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-user')[0];
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
	// ROOM
	openBtnRoom:function(){
		if(this.popRoom==null){
			this.popRoom = Ext.create('MNG.view.popup.BtnAddRoom',{});
		}
		this.popRoom.roomId = null;
		this.popRoom.show();
	},
	doubleClickRoom:function(compt, record, item, index, e){
		var roomId = record.get('ROOM_ID');
		if(roomId){
			if(this.popRoom==null){
				this.popRoom = Ext.create('MNG.view.popup.BtnAddRoom',{});
			}
			gridSupport.selectGridPopup('#roomGridContainerID','#grid-room','#btnRoomContainerId');
			this.popRoom.roomId = roomId;
			this.popRoom.show();
		}
	},
	BtnSaveRooom:function(){
		this.requestRoom();
	},
	requestRoom:function(){
		var RoomFlor = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_FLOR')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_NO')[0].getValue();
		var RoomType = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_TYPE')[0].getValue();
		var formRoom = this.popRoom;
		
		param={'ROOM_FLOR': RoomFlor};
		param['ROOM_NO'] =  RoomNo;
		param['ROOM_TYPE'] = RoomType;
		param['ROOM_ID'] = this.popRoom.roomId;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveRoom.json',
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
	},
	// 3. MENU
	deleteMenu: function(){
		alert('Delete');
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
			gridSupport.selectGridPopup('#menuGridContainerID','#grid-menu','#btnMenuContainerId');
			this.popMenu.menuId = menuId;
			this.popMenu.setDeactiveCreate(true);
			this.popMenu.show();
		}
	},
	BtnSaveMenu:function(){
		
		var srvcId = Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0].getValue();
		var menuNM = Ext.ComponentQuery.query('#btnMenuContainerId #PROD_NM')[0].getRawValue();
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
	},
	addSrvcBtn:function(){
		if(this.popSrvc==null){
			this.popSrvc = Ext.create('MNG.view.popup.BtnAddSrvc',{});
		}
		this.popSrvc.srvdId = null;
		this.popSrvc.show();
	},
	BtnSaveGoods:function(){
		formRoom = this.popSrvc;
		var srvcNm = Ext.ComponentQuery.query('#btnSrvcContainerId #SRVC_NM')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnSrvcContainerId #TYPE')[0].getValue();
		var RoomType = Ext.ComponentQuery.query('#btnSrvcContainerId #UNIT')[0].getValue();
		var Dscrt = Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].getValue();
		
		param={'SRVC_NM': srvcNm};
		param['TYPE'] =  RoomNo;
		param['UNIT'] = RoomType;
		param['DSCRT'] = Dscrt;
		param['SRVC_ID'] = this.popSrvc.srvdId;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveService.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			if( text.success == true){
    				formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
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
	},
	doubleClickGoods:function(compt, record, item, index, e){
		var srvdId = record.get('SRVC_ID');
		if(srvdId){
			if(this.popSrvc==null){
				this.popSrvc = Ext.create('MNG.view.popup.BtnAddSrvc',{});
			}
			gridSupport.selectGridPopup('#srvcGridContainerID','#grid-srvc','#btnSrvcContainerId');
			this.popSrvc.srvdId = srvdId;
			this.popSrvc.show();
		}
	}
})