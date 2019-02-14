/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
Ext.require([
    'Ext.chart.*',
    'Ext.Window', 
    'Ext.fx.target.Sprite', 
    'Ext.layout.container.Fit', 
    'Ext.window.MessageBox'
]);
var exportStore = Ext.create('MNG.store.exportStore');

Ext.define('MNG.view.popup.BtnCustomerProductAnalys', {
	extend : 'Ext.window.Window',
    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View'
    ],

    height: 560,
    width: 804,
    title: 'My Panel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: 'Theo đơn',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 394,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'number',
                                            text: 'Number'
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'date',
                                            text: 'Date'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'bool',
                                            text: 'Boolean'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Theo mặt hàng',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 478,
                                    store : exportStore,
									pageSize : 10,
									columns : [{
	                                         xtype: 'rownumberer'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align:'left',
	                                         flex: 1,
	                                         dataIndex: 'SRVC_NM',
	                                         text: 'Tên hàng'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align:'left',
	                                         width: 90,
	                                         dataIndex: 'SRVC_CD',
	                                         text: 'Mã hàng'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align:'left',
	                                         width: 90,
	                                         dataIndex: 'AMOUNT',
	                                         text: 'SL'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         align:'left',
	                                         width: 90,
	                                         dataIndex: 'UNIT_NM',
	                                         text: 'Đ/V'
	                                     },
										 {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'TOTAL_MONEY',
	                                         sortable:false,
	                                         hidden: true,
	                                         text: 'Số tiền',
	                                         width : 100
	                                     },
	                                     {
	             							xtype : 'gridcolumn',
	             							width : 150,
	             							sortable : false,
	             							align : 'right',
	             							text : "Tổng (đ)",
	             							renderer :function(value, p , r){
	                           					data = r.data['TOTAL_MONEY'];
	                           					if(data != '')
	                           						data = formatSupporter.formatToMoney(data);
	                           					return  data;
	                           				}
	             						}]
                                }
                            ]
                        },
                         /*{
                            xtype: 'panel',
                            height: 623,
                            title: 'Biểu đồ',
                            items: chart
                        }*/
                       
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});