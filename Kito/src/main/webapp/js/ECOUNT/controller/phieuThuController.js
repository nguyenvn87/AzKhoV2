var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var utilForm = Ext.create('CMM.form.util',{});
var btnPhieuThu = null;

Ext.define('ECNT.controller.phieuThuController', {
	extend : 'Ext.app.Controller',
	views : ['ECNT.view.phieuThuView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	params:{
		STARTDATE: null,
		ENDDATE: null,
		BILL_CD: null,
		THU_TYPE: null
	}, 
	init : function() {
		this.control({
			'#popupPhieuThuMain #addnewBtn' : {
				click : this.addnewBtn
			},
			'#popupPhieuThuMain [name=STARTDATE]' : {
				change : this.onStartDatefieldChange
			},
			'#popupPhieuThuMain [name=ENDDATE]' : {
				change : this.onEndDatefieldChange
			},
			'#popupPhieuThuMain [name=TYPE]' : {
				select : this.onSelectLoaiPhieu
			},
			'#popupPhieuThu [action=save]' : {
				click : this.onClickSaveBill
			},
			'#popupPhieuThu [action=create]' : {
				click : this.onClickCreateNewLoaiChi
			},
			'#mainGridId' : {
				itemdblclick : this.itemdblclickPhieuThu
			}
		});
	},
	onSelectLoaiPhieu: function(field){
		me = this;
		me.params.THU_TYPE = field.getValue();
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
		me.popup = Ext.ComponentQuery.query("#popupPhieuThu")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnPhieuThu',{});
		me.popup.show();
	},
	submitForm: function(form, param){
		var me = this;
		form.submit({
				method : 'POST',
				url : contextPath + '/phieuthu/savePhieuThu.json',
				success : function(form, action) {
					supportEvent.notiSuccess('Thành công !', 'Cập nhật thành công');
					var GridTurn = Ext.ComponentQuery.query('#mainGridId')[0];
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
    		url: contextPath + '/phieuthu/savePhieuThu.json',
    		method:'POST',
    		params: _param,
    		success: function(response){
    			supportEvent.notiSuccess('Thành công !', 'Cập nhật thành công');
					var GridTurn = Ext.ComponentQuery.query('#mainGridId')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.load();
					me.popup.close();
    		},
    		failure: function(response){
    			alert('Save failure' );
    		}
    	});
	},
	getDataPhieuThu:function(record){
		var btnPopup = Ext.ComponentQuery.query("#popupPhieuThu")[0];
		var form = btnPopup.down('form');
		form.getForm().load({
				url : contextPath + '/phieuthu/getPhieuThu.json',
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
	itemdblclickPhieuThu:function(compt, record, item, index, e){
		me = this;
		me.popup = Ext.ComponentQuery.query("#popupPhieuThu")[0];
		if(me.popup){me.popup.close();}
		me.popup = Ext.create('ECNT.view.popup.BtnPhieuThu',{billCD: record.get('BILL_CD')});
		me.popup.show();
		me.getDataPhieuThu(record);
	},
	onClickSaveBill: function(field){
		me = this;
		var form = field.up('#popupPhieuThu').down('form');
		_value = Ext.ComponentQuery.query("#popupPhieuThu [name=VALUE]")[0].getValue();
		var params = form.getForm().getValues();
		params.VALUE = _value;
		params.THU_NAME = field.up('#popupPhieuThu').down('[name=THU_TYPE]').getRawValue();
		me.ajaxSubmitForm(me,params);
	},
	submitSearch:function(params){
		var GridTurn = Ext.ComponentQuery.query('#mainGridId')[0];
		var storeTmp = GridTurn.getStore();
		
		var param = {
			STARTDATE: params.STARTDATE!=null?params.STARTDATE:'',
			ENDDATE: params.ENDDATE!=null?params.ENDDATE:'',
			BILL_CD: params.BILL_CD!=null?params.BILL_CD:'',
			THU_TYPE: params.THU_TYPE!=null?params.THU_TYPE:''
		};
		storeTmp.getProxy().extraParams = param;
		storeTmp.load();
	},
	onClickCreateNewLoaiChi: function(){
		var storeTmp = Ext.ComponentQuery.query('#popupPhieuThu [name=THU_TYPE]')[0].getStore();
		var btnCreateType = Ext.ComponentQuery.query('#btnMenuContainerId')[0];
		if(btnCreateType) btnCreateType.up('window').close();
		var tmpPopup = Ext.create('MNG.view.popup.BtnAddCmdUserCommon'
				,{title: 'Thêm mới loại thu',groupCD: GroupCode.THU,groupNM: 'Loại chi', targetStore:storeTmp});
		tmpPopup.show();
	}
})