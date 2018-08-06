/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddProvider', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	y: 0,
	title : 'Cập nhật nhà cung cấp',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	srvdId : null,
	config : {
		idProvider : null
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//xtype: 'form',
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
						type : 'vbox'
					},
					items : [ {
						xtype : 'container',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
								cls : 'jdvn-sub-body',
								flex : 1
							},
						items : [{
								xtype : 'textfield',
								itemId : 'PROV_NM',
								name : 'PROV_NM',
								fieldLabel : 'Tên',
								emptyText : 'Nhập tên'
							},{													
								xtype : 'textfield',
								flex : 1,
								itemId:'PROV_PHONE',
								name:'PROV_PHONE',
								fieldLabel : 'Điện thoại',
								emptyText: 'Điện thoại liên hệ'
							},{													
								xtype : 'textfield',
								flex : 1,
								itemId:'PROV_EMAIL',
								name:'PROV_EMAIL',
								fieldLabel : 'Email',
								emptyText: 'Email',
								autoload: false
							},{													
								xtype : 'textfield',
								flex : 1,
								itemId:'PROV_USER',
								name:'PROV_USER',
								fieldLabel : 'Người liên hệ',
								emptyText: 'Tên người liên hệ'
							},{
								xtype : 'textfield',
								itemId : 'PROV_ADDR',
								name : 'PROV_ADDR',
								emptyText: 'Địa chỉ',
								flex : 1,
								fieldLabel : 'Địa chỉ',
							},{
								xtype : 'textarea',
								itemId : 'PROV_DCSRT',
								name : 'PROV_DCSRT',
								flex : 1,
								emptyText: 'Mô tả ngắn gọn',
								editable : true,
								fieldLabel : 'Mô tả'
							}
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
	initNewProvider:function(){
		
		Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_NM')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_PHONE')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_USER')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_ADDR')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_EMAIL')[0].setValue('');
	}
});
