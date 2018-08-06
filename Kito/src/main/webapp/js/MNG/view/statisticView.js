
var statisticStore = Ext.create('MNG.store.roomTurnStore',{
	sorters: [{
                property: 'CHANGE_DATE',
                direction: 'desc'
            }]
});
Ext.define('MNG.view.statisticView', {
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
                                 itemId:'grid-srvc-statistic',
                                 //flex: 1,
                                 minHeight: 500,
                                 maxHeight: 800,
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
                                         width: 150,
                                         hidden: true,
                                         dataIndex: 'CHANGE_DATE',
                                         text: 'Time'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         text: 'Ngày',
                                         width: 100,
                                         renderer :function(value, p , r){
                            					data = r.data['CHANGE_DATE'];
                            					console.log(data);
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					console.log(data);
                            					return  data;
                            				}
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         align:'right',
                                         sortable:false,
                                         dataIndex: 'TIME_STS',
                                         width: 80,
                                         text: 'Giờ vào'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TIME_END',
                                         align:'right',
                                         sortable:false,
                                         text: 'Giờ ra',
                                         width: 80
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'ROOM_NO',
                                         sortable:false,
                                         text: 'Phòng',
                                         width: 100
                                     },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TOTAL_MONEY',
                                         hidden: true,
                                         sortable:false,
                                         text: 'Số tiền',
                                         flex: 0.5,
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 120,
             							sortable : false,
             							align : 'right',
             							text : "Tổng tiền (vnđ)",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						}, 
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAYED_MONEY',
                                         align:'right',
                                         sortable:false,
                                         text: 'Thanh toán (vnđ)',
                                         width : 120,
                                         renderer :function(value, p , r){
                            					data = r.data['PAYED_MONEY'];
                            					if(data != '')
                            						data = formatSupporter.formatToMoney(data);
                            					return  data;
                            				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'IS_DEBIT',
                                         sortable:true,
                                         text: 'Ghi nợ',
                                         width: 60,
                                         renderer :function(value, p , r){
                         					data = r.data['IS_DEBIT'];
                         					if(data != '' && data == '1')
                         						return 'Nợ'
                         					return  '';
                         				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'HAS_PAYED',
                                         sortable:true,
                                         text: 'Trả nợ',
                                         width: 80,
                                         renderer :function(value, p , r){
                         					data = r.data['HAS_PAYED'];
                         					debit = r.data['IS_DEBIT'];
                         					if(debit != '1'){
                         						return '';
                         					}
                         					if(data != '' && data == '1')
                         						return 'Đã trả'
                         					return  'Chưa trả';
                         				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         sortable:false,
                                         text: 'Ghi chú',
                                         flex: 0.5
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'User',
                                         width: 80
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Hôm nay',
                                	 	iconCls: 'icon-search',
                                	 	itemId: 'btnStatisDaily',
                                	 	//cls: 'buttonCls'
 		                                },
 		                               {
 	                                	text: '2 Ngày qua',
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'btnStatisWeekly'
 	 		                           },
 	 		                           {
 	 	                                text: 'Tháng này',
 	 	                                iconCls: 'icon-search',
 	 	                                cls: 'buttonCls',
 	 	                                hidden: true,
 	 	                                itemId: 'btnStatisMonthly'
 	 	 		                       },
 	 	 		                       {
 	 	 	                            text: 'Khác',
 	 	 	                            hidden: true,
 	 	 	                            iconCls: 'icon-search',
 	 	 	                            itemId: 'btnStatisQuy'
 	 	 	 		                   }
             						],
             					bbar: [{
	                                	 	text: 'In PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	height: 35,
	                                	 	itemId: 'btnStatisPrint',
 		                                },
 		                                {
	                                	 	text: 'Xuất kho',
	                                	 	iconCls: 'icon-pdf',
	                                	 	height: 35,
	                                	 	itemId: 'btnExportPrint',
 		                                },
 		                                {
	                                	 	text: 'Tồn kho',
	                                	 	iconCls: 'icon-pdf',
	                                	 	height: 35,
	                                	 	itemId: 'btnStoreRemainPrint',
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
										},
										{
											xtype : 'label',
											fieldLabel : 'Đã thanh toán',
											text : 'Thanh toán: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-payed-id',
											text : '0.0',
											cls: 'sumary-field'
										},
										{
											xtype : 'label',
											fieldLabel : 'Nợ',
											text : 'Còn nợ: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Nợ',
											itemId: 'statis-debit-id',
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