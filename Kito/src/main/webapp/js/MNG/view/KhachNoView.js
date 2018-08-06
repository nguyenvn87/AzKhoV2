var tmpMenuStore = Ext.create('MNG.store.customerStore',{})

Ext.define('MNG.view.KhachNoView', {
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
					itemId: 'mainContainerID',
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
                                 itemId: 'grid-menu',
                                 //flex: 1,
                                 minHeight: 500,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: tmpMenuStore,
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
                                         flex: 0.5,
                                         sortable:false,
                                         align:'center',
										 hidden: true,
                                         dataIndex: 'CUS_CD',
                                         text: "Max"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'NAME',
                                         text: 'Tên khách'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PHONE',
                                         sortable:false,
                                         text: 'ĐT',
                                         width : 120
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'EMAIL',
                                         sortable:false,
                                         text: 'Email',
                                         width : 120
                                     },
             						{
                                        xtype: 'gridcolumn',
                                        sortable:true,
                                        dataIndex: 'ADDR',
                                        text: 'Địa chỉ',
                                        flex: 1
                                    },{
                                        xtype: 'gridcolumn',
                                        sortable:true,
                                        text: 'Tổng nợ(vnđ)',
                                        flex: 0.5,
                                        renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['TOTAL_MONEY'];
																				if (data != '')
																					data = formatSupporter
																							.formatToMoney(data);
																				return data;
																			}
                                    }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-search',
                                	 	hidden: true,
                                	 	itemId: 'addMenuBtn'
 		                                },
 		                               {
 	                                	text: 'Xóa',
 	                                	hidden: true,
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'delMenuBtn'
 	 		                           }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: tmpMenuStore,
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