/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddBankAccount', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	y: 10,
	title : 'Cập nhật tài khoản ngân hàng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	srvdId : null,
	config : {
		ID_BANK : null
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
								flex : 1,
								itemId:'BANK_NM',
								name:'BANK_NM',
								fieldLabel : 'Tên ngân hàng',
								emptyText: 'VD: Vietcombank'
							},{
								xtype : 'textarea',
								itemId : 'NOTE',
								name : 'NOTE',
								flex : 1,
								emptyText: 'Ghi chú',
								fieldLabel : 'Ghi chú'
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
				itemId : 'BtnSaveBank'
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
	initNewObject:function(){
		var parent = this;
		parent.ID_BANK = null;
		
		Ext.ComponentQuery.query('#btnSrvcContainerId #BANK_NM')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #NOTE')[0].setValue('');
	},
	renderData:function(data){
		Ext.ComponentQuery.query('#btnSrvcContainerId #BANK_NM')[0].setValue(data.BANK_NM);
		Ext.ComponentQuery.query('#btnSrvcContainerId #NOTE')[0].setValue(data.NOTE);
	}
});
