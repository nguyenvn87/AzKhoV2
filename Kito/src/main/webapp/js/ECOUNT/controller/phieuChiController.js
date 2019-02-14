var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var utilForm = Ext.create('CMM.form.util',{});
var btnPhieuChi = null;

Ext.define('ECNT.controller.phieuChiController', {
	extend : 'Ext.app.Controller',
	views : ['ECNT.view.phieuChiView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	params:{
		STARTDATE: null,
		ENDDATE: null,
		BILL_CD: null,
		CHI_TYPE: null
	}, 
	init : function() {
		this.control({
			
			'#popupPhieuChiMain #addnewBtn' : {
				click : this.addnewBtn
			},
			'#popupPhieuChiMain [name=STARTDATE]' : {
				change : this.onStartDatefieldChange
			},
			'#popupPhieuChiMain [name=ENDDATE]' : {
				change : this.onEndDatefieldChange
			},
			'#popupPhieuChiMain [name=TYPE]' : {
				select : this.onSelectLoaiPhieu
			},
			'#popupPhieuChi [action=save]' : {
				click : this.onClickSaveBill
			},
			'#popupPhieuChi [action=create]' : {
				click : this.onClickCreateNewLoaiChi
			},
			'#mainGridIdChi' : {
				itemdblclick : this.itemdblclickPhieuChi
			},
			'#BtnSaveMenu' : {
				click : this.onClickSaveCmd
			},
		});
	},
	onSelectLoaiPhieu: function(){
		me = this;
		me.submitSearch(me.params);
	},
	onStartDatefieldChange : function(field, newValue, oldValue, eOpts){
    	me = this;
    	me.params.STARTDATE = field.getSubmitValue();
    	me.submitSearch(me.params);
    },
    onEndDatefieldChange : function(field, newValue, oldValue, eOpts){
    	me = this;
    	me.params.ENDDATE = field.getSubmitValue();
    	me.submitSearch(me.params);
    },
	addnewBtn: function(){
		var me = this;
		me.popup = Ext.ComponentQuery.query("#popupPhieuChi")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnPhieuChi',{});
		me.popup.show();
	},
	submitForm: function(form){
		var me = this;
		form.submit({
				method : 'POST',
				url : contextPath + '/phieuthu/savePhieuChi.json',
				success : function(form, action) {
					supportEvent.notiSuccess('Thành công !', 'Cập nhật thành công');
					var GridTurn = Ext.ComponentQuery.query('#mainGridIdChi')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.load();
					me.popup.close();
				},
				failure : function(form, action) {
					Ext.Msg.alert('Failed', '');
				}
		});
	},
	ajaxSubmitForm: function(me,_param){
		Ext.Ajax.request( {
    		url: contextPath + '/phieuthu/savePhieuChi.json',
    		method:'POST',
    		params: _param,
    		success: function(response){
    			supportEvent.notiSuccess('Thành công !', 'Cập nhật thành công');
					var GridTurn = Ext.ComponentQuery.query('#mainGridIdChi')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.load();
					me.popup.close();
    		},
    		failure: function(response){
    			alert('Save failure' );
    		}
    	});
	},
	getDataPhieuChi:function(record){
		var btnPopup = Ext.ComponentQuery.query("#popupPhieuChi")[0];
		var form = btnPopup.down('form');
		form.getForm().load({
				url : contextPath + '/phieuthu/getPhieuChi.json',
				waitMsg : 'Loading',
				method : 'GET',
				params : {
					BILL_CD : record.get('BILL_CD')
						},
				success : function(form, actions) {
					var text = Ext.JSON.decode(actions.response.responseText);
					var data = text.data;
				}
		});
	},
	itemdblclickPhieuChi:function(compt, record, item, index, e){
		me = this;
		me.popup = Ext.ComponentQuery.query("#popupPhieuChi")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnPhieuChi',{});
		me.popup.show();
		me.getDataPhieuChi(record);
	},
	onClickSaveBill: function(field){
		me = this;
		var form = field.up('#popupPhieuChi').down('form');
		_value = Ext.ComponentQuery.query("#popupPhieuChi [name=VALUE]")[0].getValue();
		var params = form.getForm().getValues();
		params.VALUE = _value;
		params.CHI_NAME = field.up('#popupPhieuChi').down('[name=CHI_TYPE]').getRawValue();
		me.ajaxSubmitForm(me,params);
	},
	submitSearch:function(params){
		var GridTurn = Ext.ComponentQuery.query('#mainGridIdChi')[0];
		var storeTmp = GridTurn.getStore();
		
		var param = {
			STARTDATE: params.STARTDATE!=null?params.STARTDATE:'',
			ENDDATE: params.ENDDATE!=null?params.ENDDATE:'',
			BILL_CD: params.BILL_CD!=null?params.BILL_CD:'',
			CHI_TYPE: params.CHI_TYPE!=null?params.CHI_TYPE:''
		}
		storeTmp.getProxy().extraParams = param;
		storeTmp.load();
	},
	onClickCreateNewLoaiChi: function(){
		var btnCreateType = Ext.ComponentQuery.query('#btnMenuContainerId')[0];
		var storeTmp = Ext.ComponentQuery.query('#popupPhieuChi [name=CHI_TYPE]')[0].getStore();
		if(btnCreateType) btnCreateType.up('window').close();
		var tmpPopup = Ext.create('MNG.view.popup.BtnAddCmdUserCommon'
				,{title: 'Thêm mới loại chi',groupCD: GroupCode.CHI,groupNM: 'Loại chi', targetStore:storeTmp});
		tmpPopup.show();
	},
	onClickSaveCmd: function(){
		alert(1);
	}
})