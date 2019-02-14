/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddUser', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	y: 10,
	title : 'Cập nhật người dùng',
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
				itemId : 'btnUserContainerId',
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
								itemId:'FULLNAME',
								name:'FULLNAME',
								fieldLabel : 'Họ tên',
								emptyText: 'Họ tên'
							},{
								xtype : 'textfield',
								itemId : 'ADDRESS',
								hidden: true,
								emptyText : 'Nhập địa chỉ',
								name : 'ADDRESS',
								flex : 1,
								fieldLabel : 'Địa chỉ',
							},{
								xtype : 'textfield',
								itemId : 'PHONE',
								hidden: true,
								emptyText : 'Nhập số điện thoại',
								name : 'PHONE',
								flex : 1,
								fieldLabel : 'Điện thoại',
							},{
								xtype : 'textfield',
								itemId : 'EMAIL',
								name : 'EMAIL',
								emptyText : 'Thư điện tử (nếu có)',
								flex : 1,
								fieldLabel : 'Email',
							},{
								xtype : 'textfield',
								itemId : 'USERNAME',
								name : 'USERNAME',
								fieldLabel : 'Tên đăng nhập',
								emptyText : 'Username'
							},{
								xtype : 'textfield',
								itemId : 'CMND',
								name : 'CMND',
								emptyText : 'Password',
								flex : 1,
								fieldLabel : 'Mật khẩu',
							},{													
								xtype : 'combo',
								flex : 1,
								itemId:'ENABLED',
								name:'ENABLED',
								fieldLabel : 'Khóa',
								emptyText: 'Khóa',
								store: Ext.create('Ext.data.Store',{
									fields: ['value', 'name'],
								    data : [
								        {"value":"1", "name":"Kích hoạt"},
								        {"value":"0", "name":"Khóa"}]
								}),
								displayField: 'name',
							    valueField: 'value',
							    value: "1",
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
				itemId : 'btnSaveUser'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Đóng',
				listeners : {
					click : function() {
						me.hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	showForm:function(isUpdate){
		Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].setReadOnly(isUpdate);
		Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].setDisabled(isUpdate);
		this.show();
	},
	createNew:function(){
		Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].setReadOnly(false);
		Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].setDisabled(false);
		Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #FULLNAME')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #ADDRESS')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #PHONE')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #EMAIL')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #CMND')[0].setValue('');
		Ext.ComponentQuery.query('#btnUserContainerId #ENABLED')[0].setValue('1');
		this.show();
	}
});
