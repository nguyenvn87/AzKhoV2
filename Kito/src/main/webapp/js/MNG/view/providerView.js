var srvcStoreTmp = Ext.create('MNG.store.providerStore',{})

Ext.define('MNG.view.providerView', {
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
                                         dataIndex: 'PROV_NM',
                                         text: "Tên",
                                         flex: 0.5
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         dataIndex: 'PROV_PHONE',
                                         width: 100,
                                         text: 'Điện thoại'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PROV_EMAIL',
                                         sortable:false,
                                         text: 'Email',
                                         width: 150
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'PROV_USER',
                                         text: 'Người liên hệ',
                                          width: 120
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PROV_ADDR',
                                          align:'left',
                                         sortable:false,
                                         text: 'Địa chỉ',
                                         flex: 0.5
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PROV_DCSRT',
                                         sortable:false,
                                         text: 'Thông tin thêm',
                                         flex: 1
                                     },
                                     {
 										menuDisabled : true,
 										sortable : false,
 										text : 'Xóa',
 										xtype : 'actioncolumn',
 										align : 'center',
 										width : 60,
 										items : [ {
 											iconCls : 'icon-del',
 											tooltip : 'Xóa dòng này',
 											handler : function(grid, rowIndex, colIndex){
 												grid.getSelectionModel().select(rowIndex);
 												var myController = MANAGER.app.getController('MNG.controller.providerController');
 												myController.deleteUser();
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