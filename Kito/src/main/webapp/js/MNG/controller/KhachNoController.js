var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var btnListBillCustomer = Ext.create('MNG.view.popup.BtnCustomerBill',{});
var utilForm = Ext.create('CMM.form.util',{});


Ext.define('MNG.controller.KhachNoController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.KhachNoView'
	         ,'Ext.extCombo.view.SimpleComboBox'],
	popMenu: null,
	init : function() {
		this.control({
			'#addMenuBtn' : {
				click : this.openBtnMenu
			},
			'#delMenuBtn' : {
				click : this.deleteMenu
			},
			'#grid-menu':{
				itemdblclick: this.doubleClickCustomer
			},'#btnViewCustomerBill':{
				click : this.viewBill
			}
		});
	},
	deleteMenu: function(){
		alert('Delete');
	},
	openBtnMenu:function(){
		this.popMenu.show();
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