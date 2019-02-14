/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('ECNT.view.popup.BtnAddAccount', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	y: 10,
	title : 'Tài khoản thanh toán',
	maxHeight : 600,
	closeAction : 'close',
	resizable : false,
	isUpdate: true,
	srvdId : null,
	itemId: 'mainbankAccountItemid',
	config : {
		idProvider : null
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype: 'form',
				itemId: 'bankAccountItemid',
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
						padding: '10 10 10 10',
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
								name : 'ID_BANK',
								readOnly: me.isUpdate,
								height: 30,
								fieldLabel : 'Số tài khoản(*)',
								emptyText : 'Nhập số tài khoản'
							},{													
								xtype : 'textfield',
								flex : 1,
								height: 30,
								name:'OWNER',
								fieldLabel : 'Chủ tài khoản',
								emptyText: 'Nhập tên chủ tài khoản'
							},{													
								xtype : 'textfield',
								flex : 1,
								height: 30,
								name:'BANK_NM',
								fieldLabel : 'Ngân hàng(*)',
								emptyText: 'VD: Vietcombank',
								autoload: false
							},{													
								xtype : 'textfield',
								flex : 1,
								height: 30,
								name:'ADDRESS',
								fieldLabel : 'Chi nhánh',
								emptyText: 'VD: Hà Nội'
							},{													
								xtype : 'numberfield',
								minValue: 0,
								maxValue: 100,
								name:'ISSORT',
								fieldLabel : 'Ưu tiên',
								emptyText: ''
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
						this.up('.window').close();
					}
				}
			} ]
		});
		this.callParent(arguments);
	}
});
