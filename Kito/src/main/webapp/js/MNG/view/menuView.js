var tmpMenuStore = Ext.create('MNG.store.menuStore',{})

Ext.define('MNG.view.menuView', {
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
                                 minHeight: 300,
                                // maxHeight: 300,
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
                                         dataIndex: 'MENU_ID',
                                         text: "Max"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         sortable:false,
										 hidden: true,
                                         align:'center',
                                         dataIndex: 'SRVC_ID',
                                         text: 'SRVC_ID'
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'PROD_NM',
                                         text: 'Tên sp/dịch vụ',
                                         summaryType: 'count',
                                         summaryRenderer: function(value){
                                             return 'Tổng'; 
                                         }
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Giá (vnđ)',
                                         flex: 1 
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 120,
             							sortable : false,
             							align : 'right',
             							text : "Giá (vnđ)",
             							summaryType: 'sum',
             							renderer :function(value, p , r){
                           					data = r.data['PRICE'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						},
             						{
                                        xtype: 'gridcolumn',
                                        sortable:true,
                                        dataIndex: 'UNIT_NM',
                                        text: 'Đơn vị',
                                        width : 80
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        sortable:false,
                                        hidden: true,
                                        text: 'Đặt mặc định',
                                        dataIndex: 'IS_DEFAULT',
                                        width : 100
                                    },
                                    {
						                menuDisabled: true,
						                sortable: false,
						                text: 'Mặc định',
						                xtype: 'actioncolumn',
						                align : 'center',
						                width: 80,
						                items: [{
						                    iconCls : 'icon-true',
						                    tooltip: 'Đã đặt mặc định',
						                    getClass: function(value,metadata,record){
						                    	var isDefault = record.get('IS_DEFAULT');
						                    	if(isDefault == 0){
						                    		return 'x-hide-display';
						                        }
						                    	else return 'icon-true';
						                    }
						                }]
						            },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ACTIVE',
                                        align : 'center',
                                        sortable:true,
                                        text: 'Sử dụng',
                                        width : 80,
                                        renderer : function(value, p, r) {
											data = r.data['ACTIVE'];
											if (data != '' && data == '1')
												return 'Có'
											return 'Không';
										}
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        sortable:false,
                                        text: 'Ghi chú',
                                        flex: 1
                                    },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'RESTAR_ID',
                                         hidden: true,
                                         sortable:false,
                                         text: 'RESTAR_ID',
                                         flex: 0.5
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-search',
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