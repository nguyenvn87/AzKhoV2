var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});

Ext.define('MNG.controller.admRoomController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.admRoomView'
	         ,'Ext.extCombo.view.SimpleComboBox' ],
	popRoom: null,
	init : function() {
		this.control({
					
			'#BtnSaveRooom' : {
				click : this.BtnSaveRooom
			},
			'#btnRoomForm' : {
				click : this.openBtnRoom
			},
			'#grid-room':{
				itemdblclick: this.doubleClickRoom
			},
		});
	},
	openBtnRoom:function(){
		if(this.popRoom==null){
			this.popRoom = Ext.create('MNG.view.popup.BtnAddRoom',{});
		}
		this.popRoom.roomId = null;
		this.popRoom.show();
		this.popRoom.initNew();
	},
	doubleClickRoom:function(compt, record, item, index, e){
		var roomId = record.get('ROOM_ID');
		if(this.popRoom==null){
			this.popRoom = Ext.create('MNG.view.popup.BtnAddRoom',{});
		}
		this.popRoom.roomId = roomId;
		this.popRoom.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-room','#btnRoomContainerId');
	},
	BtnSaveRooom:function(){
		this.request();
	},
	request:function(){
		var RoomFlor = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_FLOR')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_NO')[0].getValue();
		//var RoomType = Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_TYPE')[0].getValue();
		var isUsedRoom = Ext.ComponentQuery.query('#btnRoomContainerId #IS_USED')[0].getValue();
		var formRoom = this.popRoom;
		
		param={'ROOM_FLOR': RoomFlor};
		param['ROOM_NO'] =  RoomNo;
		//param['ROOM_TYPE'] = RoomType;
		param['IS_USED'] = isUsedRoom;
		param['ROOM_ID'] =  this.popRoom.roomId;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveRoom.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    		
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