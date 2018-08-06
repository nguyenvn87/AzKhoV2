var userStore = Ext.create('MNG.store.userStore',{});
var btnUserRight = Ext.create('MNG.view.popup.BtnSetUserRight');
var btnUserChangePasswd = Ext.create('MNG.view.popup.BtnSetUserPasswd');

Ext.define('MNG.view.userViewManager', {
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
	                                         dataIndex: 'USERNAME',
	                                         text: "ID"
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         width: 150,
	                                         sortable:true,
	                                         align : 'left',
	                                         dataIndex: 'FULLNAME',
	                                         text: 'Họ tên'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         width: 90,
	                                         sortable:false,
	                                         align : 'left',
	                                         dataIndex: 'CMND',
	                                         text: 'Số CMND'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         align : 'left',
	                                         sortable:false,
	                                         dataIndex: 'ADDRESS',
	                                         //hidden: true,
	                                         text: 'Địa chỉ',
	                                         flex: 0.5
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'PHONE',
	                                         align : 'left',
	                                         sortable:false,
	                                         text: 'Điện thoại',
	                                         width: 90
	                                          
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'EMAIL',
	                                         sortable:false,
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
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         hidden: true,
	                                         text: 'Enabled',
	                                         width: 100,
	                                         renderer :function(value, p , r){
	 	                       					data = r.data['ENABLED'];
	 	                       					if(data == '0')
	 	                       						data = 'Đang khóa';
	 	                       					else if(data == '1')
 	                       						data = 'Kích hoat'; 
	 	                       					return  data;
	 	                       				}
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
												tooltip : 'Trạng thái',
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
												handler: me.deleteUserVO
													//me.deleteUserVO();
												//}
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
	 		                                },
	 		                               {
	 	                                	text: 'Xóa',
	 	                                	hidden: true,
	 	                                	iconCls: 'icon-search',
	 	                                	itemId: 'delUserBtn'
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
	    	
	    	console.info(_username + ' / ' + _authority);
	    	Ext.ComponentQuery.query('#btnUserRightContainerId #USERNAME')[0].setValue(_username);
	    	Ext.ComponentQuery.query('#btnUserRightContainerId #authority')[0].setValue(_authority);
			Ext.ComponentQuery.query('#btnUserRightContainerId #FULLNAME')[0].setValue(_fullName);
	    	btnUserRight.show();
	    },
	    showChangePasswd:function(_username, _fullName, _passwd){
	    	
	    	Ext.ComponentQuery.query('#btnUserRePasswdContainerId #USERNAME')[0].setValue(_username);
			Ext.ComponentQuery.query('#btnUserRePasswdContainerId #FULLNAME')[0].setValue(_fullName);
	    	btnUserChangePasswd.show();
	    },
	    deleteUserVO:function(grid, rowIndex, colIndex){
	    	
	    	store = grid.getStore();
			var rec = store.getAt(rowIndex);
			grid.getSelectionModel().select(rowIndex);
			
	    	param={'USERNAME': rec.get('USERNAME')};
			param['authority'] = rec.get('authority');
			
			Ext.MessageBox.confirm('Confirm', 'Chắc chắn muốn xóa ?', function(btn){
			
				if(btn == 'yes'){
			    	Ext.Ajax.request( {
			    		url: contextPath + '/deleteUserVo.json',
			    		method:'POST',
			    		params: param,
			    		success: function(response){
			    			var text = Ext.JSON.decode(response.responseText);
			    			console.log( text);
			    			console.log( text.result);
			    			if( text.success == true){
			    				// 4. Forest loading
			    				var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			    				var storeTmp = Grid.getStore();
			    				storeTmp.load();
			    			}
			    			else{
			    				supportEvent.showWarningTimer(text.message);
			    			}
			    		},
			    		failure: function(response){
			    			var text = Ext.JSON.decode(response.responseText);
			    			console.log( text);   
			    			alert('Save failure' );
			    		}
			    	});
				}
			});
	    }
	});