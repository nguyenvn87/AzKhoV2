/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnSetUserPasswd', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	title : 'Tạo mật khẩu mới',
	maxHeight : 600,
	closeAction : 'hide',
	y: 10,
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
				itemId : 'btnUserRePasswdContainerId',
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
								readOnly: true,
								fieldLabel : 'Tên đăng nhập',
								emptyText : 'Nhập tên'
							},{													
								xtype : 'textfield',
								flex : 1,
								itemId:'FULLNAME',
								name:'FULLNAME',
								readOnly: true,
								fieldLabel : 'Họ tên',
								emptyText: 'Họ tên'
							},{
								xtype : 'textfield',
								itemId : 'PASSWORD',
								emptyText : 'Mật khẩu mới',
								name : 'PASSWORD',
								flex : 1,
								fieldLabel : 'Mật khẩu mới',
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
				itemId : 'btnSaveUserPasswd'
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
