/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var useStore = Ext.create('Ext.data.Store',{
								fields: ['value', 'name'],
								data : [
								       {"value":1, "name":"Đang kinh doanh"},
								       {"value":0, "name":"Ngừng kinh doanh"}]
								});
var tmpComboStore = Ext.create('MNG.store.cdUserStore',{});

Ext.define('SPRT.view.popup.BtnAddCommonProduct', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 600,
	y: 10,
	//x: 10,
	title : 'Cập nhật sản phẩm/dịch vụ',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	params : null,
	config : {
		isNew : false
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				id : 'btnSrvcContainerId',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'hbox'
					},
					items : [
					         {
					        	xtype : 'fieldset',
					        	title: 'Sản phẩm',
					        	padding : '10 10 10 10',
					        	flex: 1,
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								items:[
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'CD_NM',
								    	   name : 'CD_NM',
								    	   height: 30,
								    	   fieldLabel : 'Tên SP',
								    	   emptyText : 'Nhập tên sản phẩm'
								       },
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'CD',
								    	   name : 'CD',
								    	   height: 30,
								    	   fieldLabel : 'Mã SP',
								    	   emptyText : 'Mã code'
								       },{
											xtype : 'textfield',
											fieldLabel: 'Giá bán (vnđ)',
											itemId:'VALUE1',
											emptyText : 'Giá bán',
											height: 30,
											minValue: 0,
											value: 0,
				                            maxValue: 1000000,
											regex: /^-?\d*\.?\d*$/
								       },{													
											xtype : 'combo',
											itemId:'USE_YN',
											name:'USE_YN',
											fieldLabel : 'Sử dụng',
											emptyText: 'Chọn trạng thái',
											store: Ext.create('Ext.data.Store',{
												fields: ['value', 'name'],
											    data : [
											        {"value":'Y', "name":"Có"},
											        {"value":'N', "name":"Không"}]
											}),
											displayField: 'name',
										    valueField: 'value',
										    value: 'Y',
									},
								]
							} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveSrvc',
				text : 'Lưu',
				itemId : 'BtnSaveSrvc'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			tmpComboStore.getProxy().extraParams = {
						GROUP_CD: 'GRHAG',
					};
			tmpComboStore.load();
		}
	},
	initNew:function(){
		me = this;
		Ext.ComponentQuery.query('#btnSrvcContainerId #CD_NM')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #CD')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #VALUE1')[0].setValue(1);
		Ext.ComponentQuery.query('#btnSrvcContainerId #USE_YN')[0].setValue('');
		me.config.isNew = true;
	}
});
