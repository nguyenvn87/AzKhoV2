var customerStore = Ext.create('MNG.store.customerStore');

Ext.define('MNG.view.customerView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    isHideAddNew: false,
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
                                 itemId:'grid-customer-item',
                                 minHeight: 500,
                                 maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: customerStore,
                                 columns: [
                                     {
									xtype : 'rownumberer',
									width : 30,
									align : 'center',
									text : 'TT',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									width : 150,
									dataIndex : 'NAME',
									text : 'Họ tên',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									width : 100,
									editable: true,
									dataIndex : 'PHONE',
									text : 'Điện thoại',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'right',
									width : 170,
									editable: true,
									dataIndex : 'EMAIL',
									text : 'Email',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									flex: 1,
									editable: true,
									dataIndex : 'ADDR',
									text : 'Địa chỉ',
									sortable : true
								},{
									xtype : 'gridcolumn',
									align : 'right',
									width : 120,
									hidden: true,
									editable: true,
									dataIndex : 'ACCUMULT',
									text : 'Tiền tích lũy',
									sortable : true
								},
								{
					                menuDisabled: true,
					                sortable: false,
					                align:'center',
					                xtype: 'actioncolumn',
					                text: 'Xem biểu đồ',
					                width: 100,
					                items: [{
					                    iconCls : 'icon-chart',
					                    tooltip: 'Xem biểu đồ lịch sử',
					                    handler: function(grid, rowIndex, colIndex) {
					                    	grid.getSelectionModel().select(rowIndex);
					                    	store = grid.getStore();
					                    	var rec = store.getAt(rowIndex);
					                    	me.viewChartAnalysis(rec);
					                    }
					                }]
					            },
								{
					                menuDisabled: true,
					                sortable: false,
					                align:'center',
					                xtype: 'actioncolumn',
					                text: 'Xem theo đơn',
					                width: 110,
					                items: [{
					                    iconCls : 'icon-bill',
					                    tooltip: 'Lịch sử theo đơn',
					                    handler: function(grid, rowIndex, colIndex) {
					                    	grid.getSelectionModel().select(rowIndex);
					                    	store = grid.getStore();
					                    	var rec = store.getAt(rowIndex);
					                    	me.viewHistoryBillInfo(rec);
					                    }
					                }]
					            },
					            {
					                menuDisabled: true,
					                sortable: false,
					                align:'center',
					                xtype: 'actioncolumn',
					                text: 'Theo loại hàng',
					                width: 110,
					                items: [{
					                    iconCls : 'icon-box',
					                    tooltip: 'Xem lịch sử giao dịch theo từng loại hàng',
					                    handler: function(grid, rowIndex, colIndex) {
					                    	grid.getSelectionModel().select(rowIndex);
					                    	store = grid.getStore();
					                    	var rec = store.getAt(rowIndex);
					                    	me.viewHistoryByProduct(rec);
					                    }
					                }]
					            },
								{
					                menuDisabled: true,
					                sortable: false,
					                align:'center',
					                xtype: 'actioncolumn',
					                text: 'Cập nhật',
					                width: 90,
					                items: [{
					                    iconCls : 'icon-edit',
					                    tooltip: 'Sửa dòng này',
					                    handler: function(grid, rowIndex, colIndex) {
					                    	store = grid.getStore();
					                    	var rec = store.getAt(rowIndex);
					                    	me.updateCusomerInfo(rec);
					                    }
					                }]
					            },{
									xtype : 'gridcolumn',
									align : 'left',
									width : 120,
									hidden: true,
									editable: true,
									dataIndex : 'CHANGE_USER',
									text : 'Người lưu',
									sortable : true
								},
								{
									menuDisabled : true,
									sortable : false,
									text : 'Xóa',
									xtype : 'actioncolumn',
									align : 'center',
									width : 60,
									items : [ {
										iconCls : 'icon-del',
										tooltip : 'Xóa dòng này',
										handler : function(grid, rowIndex, colIndex){
											var myController = MANAGER.app.getController('MNG.controller.customerController');
											var rec = grid.getStore().getAt(rowIndex);
											myController.deleteRecordCustomer(rec);
										}
									} ]
								}
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm khách mới',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'btnAddCustomer',
                                	 	hidden: me.isHideAddNew
 		                                },
 		                               {
 	                                	text: 'Xóa',
 	                                	iconCls: 'icon-search',
 	                                	hidden: true,
 	                                	itemId: 'delSrvcBtn'
 	 		                           },
 	 		                           {
 	 		                        	xtype : 'textfield',
										emptyText : 'Tìm kiếm',
										itemId: 'textSearchSrvc',
										enableKeyEvents: true,
										listeners:{
												'keyup': function(key, event){
													value = key.getValue();
													var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
													var storeTmp = Grid.getStore();
														
													if(event.getCharCode() == 13){
														storeTmp.clearFilter();
														me.searchServiceByValue(value);
													}
													else{
														storeTmp.clearFilter();
														storeTmp.filter('NAME', value);
													}
												}
											}
 	 		                           },
 	 		                           {
 	                                	text: 'Tìm',
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'btnSearchSrvcBtn',
 	                                	listeners:{
 	                                		click: function(){
 	                                			var textSearch = Ext.ComponentQuery.query('#textSearchSrvc')[0];
 	                                			value = textSearch.getValue();
												var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
												var storeTmp = Grid.getStore();
														
												storeTmp.clearFilter();
												me.searchServiceByValue(value);
 	                                		}
 	                                	}
 	 		                           }
             						],
             					bbar : [{
											text : 'PDF',
											iconCls : 'icon-pdf',
											height : 35,
											itemId : 'btnPdfPrint'},
										{
											text : 'Excel',
											iconCls : 'icon-excel',
											height : 35,
											itemId : 'btnExcelPrint' } ],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: customerStore,
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
    },
    searchServiceByValue:function(_value){
		
		var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				NAME: _value,
				limit: 10
		};
		storeTmp.getProxy().url = contextPath + '/customer/getLisPagingCustomers.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	},
	updateCusomerInfo:function(rec){
		var params = {
		       			cusID: rec.get('CUS_CD'),
		       			cusName: rec.get('NAME'),
					    cusPhone: rec.get('PHONE'),
					    cusEmail: rec.get('EMAIL'),
					    accumult: rec.get('ACCUMULT'),
					    cusAddr: rec.get('ADDR')
					 };
		var myController = MANAGER.app.getController('MNG.controller.customerController');
		myController.showAddCustomer(params);
	},
	viewHistoryBillInfo:function(rec){
		var myController = MANAGER.app.getController('MNG.controller.customerController');
		myController.viewHistoryByBill(rec);
	},
	viewHistoryByProduct:function(rec){
		var myController = MANAGER.app.getController('MNG.controller.customerController');
		myController.viewHistoryByProduct(rec);
	},
	viewChartAnalysis:function(rec){
		var myController = MANAGER.app.getController('MNG.controller.customerController');
		myController.viewChartAnalysis(rec);
	}
});