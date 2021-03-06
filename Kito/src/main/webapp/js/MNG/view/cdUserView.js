var srvcStoreTmp = Ext.create('MNG.store.cdUserStore',{})

Ext.define('MNG.view.cdUserView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    groupCD: null,
    groupNM: null,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

					xtype : 'container',
					itemId : 'mainContainerID',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
						xtype : 'container',
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
						        	 xtype:'hidden',
						        	 name:'GROUP_CD',
						        	 itemId: 'GROUP_CD',
						        	 value: me.groupCD
						         },
						         {
						        	 xtype:'hidden',
						        	 name:'GROUP_NM',
						        	 itemId: 'GROUP_NM',
						        	 value: me.groupNM
						         },
						         {
								 xtype: 'gridpanel',
                                 id:'grid-srvc',
                                 //flex: 1,
                                 minHeight: 400,
                                 maxHeight: 600,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: srvcStoreTmp,
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
                                         sortable:false,
                                         align:'left',
                                         hidden: true,
                                         dataIndex: 'CD',
                                         text: "Mã",
                                         width: 30
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         dataIndex: 'CD_NM',
                                         text: "Tên",
                                         flex: 1
                                     },
                                     {
 										menuDisabled : true,
 										sortable : false,
 										text : 'Chỉnh sửa',
 										xtype : 'actioncolumn',
 										align : 'center',
 										width : 90,
 										items : [ {
 											iconCls : 'icon-edit',
 											tooltip : 'Chỉnh sửa dòng này',
 											handler : function(grid, rowIndex, colIndex){
 												var record = grid.getStore().getAt(rowIndex);
 												grid.getSelectionModel().select(rowIndex);
 												var myController = ADM.app.getController('MNG.controller.cdUserController');
 												myController.showToEditForm(record);
 											}
 										} ]
 									},
                                     {
										menuDisabled : true,
										sortable : false,
										text : 'Xóa',
										xtype : 'actioncolumn',
										align : 'center',
										width : 90,
										items : [ {
											iconCls : 'icon-del',
											tooltip : 'Xóa dòng này',
											handler : function(grid, rowIndex, colIndex){
												var record = grid.getStore().getAt(rowIndex);
												grid.getSelectionModel().select(rowIndex);
 												var myController = ADM.app.getController('MNG.controller.cdUserController');
 												//myController.deleteUser();
 												myController.updateDeleteUser(record);
											}
										} ]
									}
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'addSrvcBtn'
 		                                },
 		                               {
 	                                	text: 'Xóa',
 	                                	hidden: true,
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'delSrvcBtn'
 	 		                           }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: srvcStoreTmp,
                                         displayInfo: true
                                     }
                                 ]
							}
						]
					}]
                }
            ]
        });
        me.callParent(arguments);
    }
});