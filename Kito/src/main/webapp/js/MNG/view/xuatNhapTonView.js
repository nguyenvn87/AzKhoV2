
Ext.define('MNG.view.xuatNhapTonView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    tmpStore: null,
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
                                 itemId:'grid-srvc',
                                 minHeight: 400,
                                 maxHeight: 600,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: me.tmpStore,
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
                                         dataIndex: 'SRVC_CD',
                                         width: 90,
                                         text: 'Mã hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_NM',
                                         width: 180,
                                         text: 'Tên hàng'
                                     },{
                                    	 text: 'Nhập',
                                    	 columns: [{
						                    xtype: 'gridcolumn',
						                    sortable:true,
						                    align:'right',
						                    dataIndex: 'IAMOUNT',
						                    width: 100,
						                    text: 'SL nhập'
						                 },{
						                    xtype: 'gridcolumn',
						                    sortable:true,
						                    align:'right',
						                    dataIndex: 'PRICE_IMPORT',
						                    width: 100,
						                    text: 'Giá nhập gần đây',
						                    renderer :function(value, p , r){
	                           					data = r.data['PRICE_IMPORT'];
	                           					if(data != '')
	                           						data = formatSupporter.formatToMoney(data);
	                           					return '<span style="color: red">'+data+'</span>';
	                           				}
						                 },{
						                	 xtype: 'gridcolumn',
						                	 sortable:true,
						                	 align:'right',
						                	 dataIndex: 'ITOTAL',
						                	 width: 140,
						                	 text: 'Tổng nhập $',
	                                         renderer :function(value, p , r){
	                           					data = r.data['ITOTAL'];
	                           					if(data != '')
	                           						data = formatSupporter.formatToMoney(data);
	                           					return '<span style="color: red">'+data+'</span>';
	                           				}
						                 }] 
                                     },
                                     {
                                    	 text: 'Xuất',
                                    	 columns: [{
						                     xtype: 'gridcolumn',
						                     dataIndex: 'AMOUNT',
						                     sortable:true,
						                     align:'right',
						                     text: 'SL xuất',
						                     width: 100
						                 },{
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'UNIT_NM',
	                                         sortable:true,
	                                         align:'left',
	                                         text: 'Đơn vị',
	                                         width: 100
	                                     },
	                                     {
	             							xtype : 'gridcolumn',
	             							width : 140,
	             							sortable : false,
	             							align : 'right',
	             							dataIndex: 'TOTAL',
	             							text : "Tổng xuất $",
	             							renderer :function(value, p , r){
	                           					data = r.data['TOTAL'];
	                           					if(data != '')
	                           						data = formatSupporter.formatToMoney(data);
	                           					return '<span style="color: red">'+data+'</span>';
	                           				}
	             						}] 
                                     },{
                                    	 text: 'Tồn',
                                    	 columns: [{
                                    		 xtype: 'gridcolumn',
	                                         dataIndex: 'AMOUNT_STORE',
	                                         align : 'right',
	                                         sortable:false,
	                                         text: 'SL tồn',
	                                         width: 100
                                    	 },{
                                    		 xtype: 'gridcolumn',
	                                         dataIndex: 'MONEY_REMAIN',
	                                         align : 'right',
	                                         sortable:false,
	                                         text: 'Giá trị tồn',
	                                         width: 100,
	                                         renderer :function(value, p , r){
		                           					data = r.data['MONEY_REMAIN'];
		                           					if(data != '')
		                           						data = formatSupporter.formatToMoney(data);
		                           					return '<span style="color: red">'+data+'</span>';
		                           				}
                                    	 }]
                                     }
                                 ],
                                 tbar: [{
                                	 		text: 'Hôm nay',
                                	 		iconCls: 'icon-search',
                                	 		itemId: 'btnToday'
 		                                },
 	 		                           {
 		                                	text: 'Tháng này',
 		                                	iconCls: 'icon-search',
 		                                	itemId: 'btnThisMonth'
 	 		                           },
 	 		                           {
 		                                	text: 'Tất cả',
 		                                	iconCls: 'icon-search',
 		                                	cls: 'buttonCls',
 		                                	itemId: 'btnThisYear'
 	 		                           },
 	 		                           {
 		                                	text: 'Tìm kiếm nâng cao',
 		                                	iconCls: 'icon-search',
 		                                	itemId: 'btnTimKiemNangCao'
 	 		                           }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	itemId: 'btnSalePDF'
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	hidden: true,
	                                	 	iconCls: 'icon-excel',
	                                	 	itemId: 'btnStatisExcel'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: me.tmpStore,
                                         displayInfo: true
                                     }
                                 ]
							},
							{
								xtype : 'container',
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items:[{
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Tổng nhập: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-itotal-id',
											text : '0.0',
											cls: 'sumary-field'
										},{
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Tổng xuất: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-total-id',
											text : '0.0',
											cls: 'sumary-field'
										},{
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Giá trị tồn: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-instore-id',
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