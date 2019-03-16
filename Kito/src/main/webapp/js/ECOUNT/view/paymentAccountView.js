var srvcStoreTmp = Ext.create('ECNT.store.bankAccountStore',{})

Ext.define('ECNT.view.paymentAccountView', {
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
                                         dataIndex: 'ID_BANK',
                                         text: "Số tài khoản",
                                         width: 150,
                                         renderer : function(value,p,r) {
												data = r.data['ID_BANK'];
												if (data == 'CASH'){
													return 'Tiền mặt'
												}
												return data;
											}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         dataIndex: 'BANK_NM',
                                         width: 150,
                                         text: 'Tên tài khoản'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'OWNER',
                                          align:'left',
                                         sortable:false,
                                         text: 'Chủ tài khoản',
                                         width: 150
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'ADDRESS',
                                         text: 'Địa chỉ',
                                         flex: 1,
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'ISSORT',
                                         text: 'Ưu tiên',
                                         width: 80
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