var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var restaurantStore = Ext.create('MNG.store.restaurantStore',{});
var btnUserRight = Ext.create('MNG.view.popup.BtnSetUserRight');
var btnUserChangePasswd = Ext.create('MNG.view.popup.BtnSetUserPasswd');
var btnSettingRestaurant = Ext.create('MNG.view.popup.BtnSettingRestaurant');

Ext.define('MNG.view.sysAdminView', {
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
	                                 store: restaurantStore,
	                                 columns: [
	                                     {
	                                         xtype: 'rownumberer',
	                                         width: 35,
	                                         sortable:false,
	                                         align:'center',
	                                         text: 'No'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         width: 100,
	                                         sortable:false,
	                                         align : 'left',
	                                         dataIndex: 'CREATE_TIME',
	                                         text: 'Date',
	                                         renderer :function(value, p , r){
                            					data = r.data['CREATE_TIME'];
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					return  data;
                            				}
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align : 'left',
	                                         width: 120,
	                                         dataIndex: 'CONTACT_NM',
	                                         text: "Người đăng kí"
	                                     },
	                                      {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'RESTAR_CODE',
	                                         sortable:false,
	                                         text: 'Code',
	                                         width: 70
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         align : 'left',
	                                         sortable:false,
	                                         dataIndex: 'ADDR',
	                                         text: 'Address',
	                                         flex: 0.5
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'PHONE',
	                                         align : 'left',
	                                         sortable:false,
	                                         text: 'Phone',
	                                         width: 100
	                                          
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
	                                         dataIndex: 'CHANGE_DATE',
	                                         sortable:false,
	                                         text: 'Recent Date',
	                                         flex: 0.5,
	                                         renderer :function(value, p , r){
                            					data = r.data['CHANGE_DATE'];
                            					console.log(data);
                            					if(data != null && data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					return  data;
                            				}
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
	                                         dataIndex: 'RESTAR_TYPE',
	                                         text: 'Loại',
	                                         width: 90
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         text: 'State',
	                                         width: 80,
	                                         renderer :function(value, p , r){
	 	                       					data = r.data['IS_LOCK'];
	 	                       					if(data == '0')
	 	                       						data = 'Active';
	 	                       					else if(data == '1')
 	                       						data = 'Deactive'; 
	 	                       					return  data;
	 	                       				}
	                                     },
										{
											menuDisabled : true,
											sortable : false,
											xtype : 'actioncolumn',
											align : 'center',
											text : 'Block',
											width: 100,
											items : [ {
												iconCls : 'icon-edit',
												tooltip : 'Chỉnh sửa',
												handler : function(grid, rowIndex, colIndex) {
													store = grid.getStore();
													var rec = store.getAt(rowIndex);
													grid.getSelectionModel().select(rowIndex);
													var params = {
														restarId: rec.get('RESTAR_ID'),
														restarCD: rec.get('RESTAR_CODE'),
														restarNm: rec.get('RESTAR_NM'),
														phone: rec.get('PHONE'),
														creatdate: rec.get('CREATE_TIME'),
														expdate: rec.get('EXPIRED_DATE'),
														type: rec.get('RESTAR_TYPE'),
														lock: rec.get('IS_LOCK'),
													};
													btnSettingRestaurant.show();
													btnSettingRestaurant.renderInfo(params);
												}
											} ]
										}
	                                     
	                                 ],
	                                 dockedItems: [
	                                     {
	                                         xtype: 'pagingtoolbar',
	                                         dock: 'bottom',
	                                         store: restaurantStore,
	                                         displayInfo: true
	                                     }
	                                 ],
	                                 tbar: [{
	                                	 	text: 'Thêm người dùng',
	                                	 	hidden: true,
	                                	 	iconCls: 'icon-search',
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
	    }
	});