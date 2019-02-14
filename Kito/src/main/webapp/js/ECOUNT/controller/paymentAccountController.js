var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});

Ext.define('ECNT.controller.paymentAccountController', {
	extend : 'Ext.app.Controller',
	views : ['ECNT.view.paymentAccountView','Ext.extCombo.view.SimpleComboBox'],
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
			if(row.get('ID_BANK') == PaymentTypeGroup.CASH){
				supportEvent.showMessageError('Tài khoản [' +row.get('BANK_NM')+ '] không thể xóa!');
				return 
			}
			param={'ID_BANK': row.get('ID_BANK')};
			param['STATUS'] =  'DELETE';
			Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				me.deleteRequest(row.get('ID_BANK'));
			}
			});
		}
	},
	openBtnUser:function(){
		var me = this;
		me.popup = Ext.ComponentQuery.query("#mainbankAccountItemid")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnAddAccount',{idProvider: null, isUpdate: false});
		me.popup.show();
	},
	doubleClickUser:function(component, record, index, eOpts){

		var idProvider = record.get('ID_BANK');
		me = this;
		me.popup = Ext.ComponentQuery.query("#mainbankAccountItemid")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnAddAccount',{isUpdate: true,idProvider:idProvider});
		me.popup.show();
		me.loadData(idProvider);
	},
	BtnSaveUser:function(){
		me = this;
		me.requestSubmit();
	},
	requestSubmit:function(param){
		me = this;
		var form = me.popup.down('#bankAccountItemid').getForm();
		form.submit({
			method : 'POST',
			url : contextPath + '/payment/savePaymentAccount.json',
			success : function(form, action) {
				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.load();
    				me.popup.close();
				supportEvent.showMessageSuccess('Lưu thành công !');
			},
			failure : function(form, action) {
				Ext.Msg.alert('Failed', '');
			}
		});
	},
	loadData : function(_idBank) {
		var me = this;
		var form = me.popup.down('#bankAccountItemid').getForm();
		form.load(
				{
					url : contextPath+ '/payment/getPaymentAccount.json',
					waitMsg : 'Loading',
					method : 'GET',
					params : {	ID_BANK : _idBank},
					success : function(form, actions) {
						var text = Ext.JSON.decode(actions.response.responseText);
						var data = text.data;
					}
				});
	},
	deleteRequest:function(_idBank){
		
		Ext.Ajax.request( {
    		url: contextPath + '/payment/deletePaymentAccount.json',
    		method:'POST',
    		params : {	ID_BANK : _idBank},
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			if( text.success == true){
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.load();
    				supportEvent.showMessageSuccess('Xóa thành công !');
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