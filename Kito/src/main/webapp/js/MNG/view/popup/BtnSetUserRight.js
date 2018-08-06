/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnSetUserRight', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	y: 10,
	title : 'Thiết lập quyền truy cập',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isCreate : true, // true: create/ false: update
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//xtype: 'form',
				cls : 'jdvn-main',
				itemId : 'btnUserRightContainerId',
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
								itemId : 'USERNAME',
								name : 'USERNAME',
								fieldLabel : 'Tên đăng nhập',
								emptyText : 'Nhập tên',
								readOnly: true
							},{													
								xtype : 'textfield',
								flex : 1,
								itemId:'FULLNAME',
								name:'FULLNAME',
								fieldLabel : 'Họ tên',
								emptyText: 'Họ tên',
								readOnly: true
							},{													
								xtype : 'combo',
								flex : 1,
								itemId:'authority',
								name:'authority',
								fieldLabel : 'Quyền hạn',
								emptyText: 'Chọn quyền',
								store: Ext.create('Ext.data.Store',{
									fields: ['value', 'name'],
								    data : [
								        {"value":"ROLE_USER", "name":"Nhân viên"},
								        {"value":"ROLE_MANAGER", "name":"Quản lý"},
								        {"value":"ROLE_ADMIN", "name":"Admin"}]
								}),
								displayField: 'name',
							    valueField: 'value',
							    value: "0",
								scrid: 'DONVI',
								autoload: false
							}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveUser',
				text : 'Lưu',
				itemId : 'btnSaveUserRight'
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
	}
});
