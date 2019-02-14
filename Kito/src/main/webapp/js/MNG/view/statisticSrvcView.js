var useStore = Ext.create('MNG.store.userStore', {});
useStore.load();
Ext.define('MNG.view.statisticSrvcView', {
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
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_NM',
                                         width: 180,
                                         text: 'Tên hàng'
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
                                         dataIndex: 'PRICE',
                                         hidden:true,
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
                                         text: 'SL đã bán',
                                         width: 100,
                                         renderer :function(value, p , r){
                           					data = r.data['TOTAL'];
                           					if(data != ''){
                           						
                           						data = formatSupporter.formatToMoney(data);
                           					}
                           					return  data;
                           				}
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
             							width : 120,
             							sortable : false,
             							align : 'right',
             							dataIndex: 'TOTAL_MONEY',
             							text : "Tổng tiền",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != ''){
                           						data = Math.round(data);
                           						data = formatSupporter.formatToMoney(data);
                           					}
                           					return  data;
                           				}
             						},{
						                menuDisabled: true,
						                sortable: false,
						                align:'center',
						                xtype: 'actioncolumn',
						                text: 'Xem chi tiết',
						                width: 120,
						                items: [{
						                    iconCls : 'icon-bill',
						                    tooltip: 'Xem chi tiết',
						                    handler: function(grid, rowIndex, colIndex) {
						                    	grid.getSelectionModel().select(rowIndex);
						                    	var rec = grid.getStore().getAt(rowIndex);
						                    	var myController = MANAGER.app.getController('MNG.controller.statisticSrvcController');
						                    	myController.showDetailBill(myController, rec);
						                    }
						                }]
						            },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TYPE_NM',
                                         sortable:true,
                                         hidden: true,
                                         text: 'Nhóm hàng',
                                         flex: 0.5
                                     },
									{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'Người lập',
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
 		                                	cls: 'buttonCls',
 		                                	itemId: 'btnThisMonth'
 	 		                           },
 	 		                           {
 		                                	text: 'Năm nay',
 		                                	iconCls: 'icon-search',
 		                                	itemId: 'btnThisYear'
 	 		                           },
 	 		                           {
 		                                	text: 'Khác',
 		                                	iconCls: 'icon-search',
 		                                	itemId: 'btnOther'
 	 		                           },{
											xtype : 'combo',
											itemId : 'FULLNAME',
											name : 'FULLNAME',
											fieldLabel : 'Người phụ trách',
											emptyText : 'Chọn nhân viên',
											store : useStore,
											displayField : 'FULLNAME',
											valueField : 'USERNAME',
											value : '',
											autoload : false
										}
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	itemId: 'btnStatisPDF'
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