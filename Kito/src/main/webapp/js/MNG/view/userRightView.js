var userStore = Ext.create('MNG.store.userStore',{});
var btnUserRight = Ext.create('MNG.view.popup.BtnSetUserRight');
var btnUserChangePasswd = Ext.create('MNG.view.popup.BtnSetUserPasswd');

Ext.define('MNG.view.userRightView', {
	  extend: 'Ext.panel.Panel',
	    cls: '',
	    layout: {
	        align: 'stretch',
	        type: 'vbox'
	    },
	    initComponent: function() {
	        var me = this;

	        Ext.applyIf(me, {
	            items: [
	                {
						xtype : 'container',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						items : [{
							xtype : 'container',
							itemId: 'AdminContainerID',
							cls : 'jdvn-sub-body',
							layout : {
								align : 'stretch',
								type : 'vbox'
							},
							defaults : {
								cls : 'row'
							},
							items : [
								{
									 xtype: 'gridpanel',
	                                 itemId:'grid-user',
	                                 //flex: 1,
	                                 minHeight: 400,
	                                 maxHeight: 500,
	                                 pageSize:10,
	                                 padding:'10 0 0 0',
	                                 autoScroll: true,
	                                 store: userStore,
	                                 columns: [
	                                     {
	                                         xtype: 'rownumberer',
	                                         width: 30,
	                                         sortable:false,
	                                         align:'center',
	                                         text: 'TT'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align : 'left',
	                                         hidden: true,
	                                         dataIndex: 'USERNAME',
	                                         text: "ID"
	                                     },
	                                     {
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											text: 'Vai trò',
											align : 'center',
											width : 90,
											items : [ {
												iconCls : 'icon-true',
												//tooltip : 'Trạng thái',
												getTip: function (a, b, record) {
													var closed = record.get('authority');
													if(closed == 'ROLE_MANAGER'){
														return 'Quản lý';
													}
													else if(closed == 'ROLE_ADMIN'){
														return 'Quản trị phần mềm';
													}
													else if(closed == 'ROLE_USER'){
														return 'Nhân viên';
													} 
												},
												getClass : function(value, metadata, record) {
													var closed = record.get('authority');
													
													if(closed == 'ROLE_MANAGER'){
														return 'icon-manager';
													}
													else if(closed == 'ROLE_ADMIN'){
														return 'icon-admin';
													}
													else if(closed == 'ROLE_USER'){
														return 'icon-staff';
													} 
												}
											} ]
										},
	                                     {
	                                         xtype: 'gridcolumn',
	                                         flex: 1,
	                                         sortable:true,
	                                         align : 'left',
	                                         dataIndex: 'FULLNAME',
	                                         text: 'Họ tên'
	                                     },
	                                      {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'authority',
	                                         sortable:false,
	                                         hidden: true,
	                                         text: 'Quyền hạn',
	                                         width: 150
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         width: 120,
	                                         sortable:false,
	                                         hidden: true,
	                                         align : 'left',
	                                         dataIndex: 'CMND',
	                                         text: 'Số CMND'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         align : 'left',
	                                         hidden: true,
	                                         sortable:false,
	                                         dataIndex: 'ADDRESS',
	                                         hidden: true,
	                                         text: 'Địa chỉ',
	                                         flex: 0.5
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'PHONE',
	                                         align : 'left',
	                                         sortable:false,
	                                         text: 'Điện thoại',
	                                         width: 100
	                                          
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'EMAIL',
	                                         sortable:false,
	                                         hidden: true,
	                                         text: 'Email',
	                                         flex: 0.5
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'ENABLED',
	                                         sortable:false,
	                                         hidden: true,
	                                         text: 'Enabled',
	                                         width: 90
	                                     },
	                                     {
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											align : 'center',
											text : 'Thay mật khẩu',
											width: 120,
											items : [ {
												iconCls : 'icon-edit',
												tooltip : 'Đổi mật khẩu',
												handler : function(grid, rowIndex, colIndex) {
													store = grid.getStore();
													var rec = store.getAt(rowIndex);
													grid.getSelectionModel().select(rowIndex);
													var userName = rec.get('USERNAME');
													var fullName = rec.get('FULLNAME');
													me.showChangePasswd(userName, fullName, '');
												}
											} ]
										},
										{
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											align : 'center',
											text : 'Sửa quyền',
											flex : 1,
											items : [ {
												iconCls : 'icon-edit',
												tooltip : 'Thay đổi quyền truy cập',
												handler : function(grid, rowIndex, colIndex) {
													store = grid.getStore();
													var rec = store.getAt(rowIndex);
													grid.getSelectionModel().select(rowIndex);
													var userName = rec.get('USERNAME');
													var fullName = rec.get('FULLNAME');
													var authority = rec.get('authority');
													me.showPopupUserRight(userName,fullName,authority);
												}
											} ]
										},{
											menuDisabled : true,
											sortable : false,
											hidden: true,
											xtype : 'actioncolumn',
											align : 'center',
											text : 'Sửa thông tin',
											flex : 1,
											items : [ {
												iconCls : 'icon-edit',
												tooltip : 'Cập nhật thông tin người',
												handler : function(grid, rowIndex, colIndex) {
													var myController = MANAGER.app.getController('MNG.controller.userRightController');
													myController.doubleClickUser();
												}
											} ]
										},
										{
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											text: 'Trạng thái',
											align : 'center',
											width : 90,
											items : [ {
												iconCls : 'icon-true',
												getTip: function (a, b, record) {
													var closed = record.get('ENABLED');
													if(closed == '0'){
														return 'Đang bị khóa';
													}
													else if(closed == '1'){
														return 'Đang hoạt động';
													}
												},
												getClass : function(value, metadata, record) {
													var closed = record.get('ENABLED');
													if (closed == '0') {
														return 'icon-lock';
													} else
														return 'icon-true';
												}
											} ]
										 },
	                                     {
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											text: 'Xóa',
											align : 'center',
											width : 90,
											items : [ {
												iconCls : 'icon-true',
												tooltip : 'Xóa người dùng',
												getClass : function(value, metadata, record) {
													var closed = record.get('authority');
													if (closed == 'ROLE_ADMIN') {
														return 'x-hide-display';
													}
													if(record.get('ENABLED') == '0')
														return 'icon-delete';
													else return 'x-hide-display';
												},
												handler: MANAGER.app.getController('MNG.controller.userRightController').deleteUser
											} ]
										 }
	                                 ],
	                                 dockedItems: [
	                                     {
	                                         xtype: 'pagingtoolbar',
	                                         dock: 'bottom',
	                                         store: userStore,
	                                         displayInfo: true
	                                     }
	                                 ],
	                                 tbar: [{
	                                	 	text: 'Thêm người mới',
	                                	 	iconCls: 'icon-addnew',
	                                	 	itemId: 'addUserBtn'
	 		                                }
	             						]
								}
							]
						}]
	                }
	            ]
	        });
	        me.callParent(arguments);
	    },
	    showPopupUserRight:function(_username,_fullName, _authority){
	    	
	    	Ext.ComponentQuery.query('#btnUserRightContainerId #USERNAME')[0].setValue(_username);
	    	Ext.ComponentQuery.query('#btnUserRightContainerId #authority')[0].setValue(_authority);
			Ext.ComponentQuery.query('#btnUserRightContainerId #FULLNAME')[0].setValue(_fullName);
	    	btnUserRight.show();
	    },
	    showChangePasswd:function(_username, _fullName, _passwd){
	    	
	    	Ext.ComponentQuery.query('#btnUserRePasswdContainerId #USERNAME')[0].setValue(_username);
			Ext.ComponentQuery.query('#btnUserRePasswdContainerId #FULLNAME')[0].setValue(_fullName);
	    	btnUserChangePasswd.show();
	    }
	});