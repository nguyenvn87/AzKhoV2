
Ext.define('MNG.view.thongkeChiTietBanhangView', {
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
                                 id:'grid-srvc',
                                 minHeight: 500,
                                 maxHeight: 800,
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
                                         sortable:false,
                                         align:'left',
                                         hidden: true,
                                         dataIndex: 'SRVC_ID',
                                         text: "SRVC_ID"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'CREATE_DATE',
                                         sortable:true,
                                         text: 'Ngày bán',
                                         width: 100,
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_CD',
                                         width: 100,
                                         text: 'Mã hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_NM',
                                         flex: 1,
                                         text: 'Tên hàng'
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE',
                                         sortable:true,
                                         hidden: true,
                                         align:'right',
                                         text: 'Giá hiện bán',
                                         width: 120,
                                         renderer :function(value, p , r){
                           					data = r.data['PRICE'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TOTAL',
                                         sortable:true,
                                         align:'right',
                                         text: 'Số lượng',
                                         width: 100,
                                         renderer :function(value, p , r){
                           					data = r.data['TOTAL'];
                           					return  data;
                           				}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'UNIT_NM',
                                         sortable:true,
                                         align:'left',
                                         text: 'Đơn vị',
                                         width: 100
                                     },
                                     
                                     {
             							xtype : 'gridcolumn',
             							width : 120,
             							sortable : false,
             							align : 'right',
             							dataIndex: 'TOTAL_MONEY',
             							text : "Tổng tiền",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						},
									{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'NV',
                                         flex: 1
                                          
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
 		                                	itemId: 'btnOther'
 	 		                           }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	itemId: 'btnSalePDF'
 		                                },
 		                                {
	                                	 	text: 'Excel',
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
											text : 'Tổng tiền: ',
											//hidden: true,
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-total-id',
											text : '0.0',
											//hidden: true,
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