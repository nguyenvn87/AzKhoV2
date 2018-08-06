
var statisticStore = Ext.create('Ext.data.Store', {
    fields: [
        		{ name: 'SRVC_NAME', type: 'string'},
        		{ name: 'SRVC_CD', type: 'string'},
        		{ name: 'AMOUNT', type: 'float'},
        		{ name: 'TOTAL_MONEY', type: 'float'},
        		{ name: 'TYPE', type: 'string'},
        		{ name: 'TYPE_NM', type: 'string'}
        	],
    autoLoad: false,
   /* data: [
        { SRVC_NM: 'Cowper' },
        { SRVC_NM: 'Everett' },
        { SRVC_NM: 'University' },
        { SRVC_NM: 'Forest' }
    ], */    
    proxy: {
		type: 'ajax',											
		url: contextPath +'/getListStatisticImportProfit.json',		
		reader: {
			type: 'json',
			root: 'data', 						
			totalProperty: 'totalCount',						
			messageProperty: 'message',
            successProperty: 'success'
		},
		listeners: { 
			exception: function(proxy, response, options) {
				//requestMessageProcessor(proxy, response);
			}
		},
		afterRequest: function(request, success) {
			//requestMessageProcessor(request.scope, request.operation.response);
		}
		
	}
 });


Ext.define('MNG.view.statisticProfit', {
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
                                 itemId:'grid-list-item',
                                 //flex: 1,
                                 minHeight: 600,
                                 //maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: statisticStore,
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
                                         align:'left',
                                         width: 200,
                                         dataIndex: 'SRVC_NAME',
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 100,
                                         dataIndex: 'SRVC_CD',
                                         text: 'Mã hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'right',
                                         dataIndex: 'AMOUNT',
                                         text: 'SL',
                                         width: 60
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'right',
                                         sortable:false,
                                         dataIndex: 'TOTAL_MONEY',
                                         //width: 150,
                                         flex: 1,
                                         text: 'Tổng tiền',
                                         renderer : function(value, p, r) {
											data = r.data['TOTAL_MONEY'];
											if (data != '')
												data = formatSupporter.formatToMoney(data);
											return data;
										}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TYPE_NM',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Nhóm',
                                         flex: 1
                                     }
                                 ],
                                 tbar: [
                                        {
	                                	 	text: 'Hôm nay',
	                                	 	iconCls: 'icon-search',
	                                	 	itemId: 'btnStatisDaily',
	                                	 	hidden: false 		                               
 	 		                           },{
	 	 	                                text: 'Tháng này',
	 	 	                                iconCls: 'icon-search',
	 	 	                                cls: 'buttonCls',
	 	 	                                itemId: 'btnStatisMonthly',
	 	 	                                hidden: false
	 	 	                            },{
	 	                                	text: 'Năm nay',
	 	                                	iconCls: 'icon-search',
	 	                                	itemId: 'btnStatisYear',
	 	                                	hidden: false
 	 	 		                       },{
	 	 	 	                            text: 'Khác',
	 	 	 	                            iconCls: 'icon-search',
	 	 	 	                            itemId: 'btnOther',
	 	 	 	                            hidden: false
 	 	 	 		                   }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	itemId: 'btnStatisPrint'
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	iconCls: 'icon-excel',
	                                	 	itemId: 'btnExcelPrint'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: statisticStore,
                                         displayInfo: true
                                     }
                                 ]
							},{
								xtype : 'container',
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items:[{
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Tổng: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-total-id',
											text : '0.0',
											cls: 'sumary-field'
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