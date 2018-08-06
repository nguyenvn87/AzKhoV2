//var srvcStoreTmp = Ext.create('MNG.store.cdUserStore',{})

Ext.define('ADM.view.cdUserView', {
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
                                 //store: srvcStoreTmp,
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
                                         flex: 1
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         dataIndex: 'PROV_PHONE',
                                         width: 100,
                                         text: 'Số phone'
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'PROV_USER',
                                         text: 'Người đại diện',
                                         flex: 1
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PROV_ADDR',
                                          align:'left',
                                         sortable:false,
                                         text: 'Địa chỉ',
                                         flex: 1
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PROV_EMAIL',
                                         sortable:false,
                                         text: 'Email',
                                         width: 150
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-search',
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
                                         //store: srvcStoreTmp,
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