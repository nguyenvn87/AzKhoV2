var statisticStore = Ext.create('MNG.store.roomTurnStore', {
	sorters : [ {
		property : 'CHANGE_DATE',
		direction : 'desc'
	} ]
});

var useStore = Ext.create('MNG.store.userStore', {});
useStore.load();
Ext
		.define(
				'MNG.view.saleStatisticAll',
				{
					extend : 'Ext.panel.Panel',
					cls : '',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					initComponent : function() {
						var me = this;

						Ext
								.applyIf(
										me,
										{
											items : [ {

												xtype : 'container',
												layout : {
													align : 'stretch',
													type : 'vbox'
												},
												items : [ {
													xtype : 'container',
													cls : 'jdvn-sub-body',
													itemId : 'MainContainerId',
													layout : {
														align : 'stretch',
														type : 'vbox'
													},
													defaults : {
														cls : 'row'
													},
													items : [
															{
																xtype : 'gridpanel',
																itemId : 'grid-srvc-statistic',
																// flex: 1,
																minHeight : 500,
																maxHeight : 800,
																pageSize : 10,
																padding : '10 0 0 0',
																autoScroll : true,
																store : statisticStore,
																columns : [
																		{
																			xtype : 'gridcolumn',
																			width : 30,
																			sortable : false,
																			align : 'center',
																			dataIndex : 'rn1',
																			text : 'TT'
																		},
																		{
																			xtype : 'gridcolumn',
																			sortable : true,
																			align : 'left',
																			width : 150,
																			hidden : true,
																			dataIndex : 'CHANGE_DATE',
																			text : 'Time'
																		},
																		{
																			xtype : 'gridcolumn',
																			sortable : false,
																			align : 'left',
																			text : 'Ngày',
																			width : 90,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['CHANGE_DATE'];
																				if (data != '')
																					data = formatSupporter
																							.convertToVNDateFromEngDate(data);
																				return data;
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			sortable : true,
																			align : 'left',
																			width : 95,
																			dataIndex : 'BILL_CD',
																			text : 'Hóa đơn số'
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'TOTAL_MONEY',
																			hidden : true,
																			sortable : false,
																			text : 'Số tiền',
																			flex : 0.5,
																		},
																		{
																			xtype : 'gridcolumn',
																			width : 120,
																			sortable : false,
																			align : 'right',
																			text : "Tổng tiền",
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['TOTAL_MONEY'];
																				if (data != '')
																					data = formatSupporter
																							.formatToMoney(data);
																				return '<span style="color: red">'+data+'</span>';
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'PAYED_MONEY',
																			align : 'right',
																			sortable : false,
																			text : 'Thanh toán',
																			width : 110,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['PAYED_MONEY'];
																				if (data != '')
																					data = formatSupporter
																							.formatToMoney(data);
																				return '<span style="color: green">'+data+'</span>';
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'IS_DEBIT',
																			sortable : true,
																			hidden : true,
																			text : 'Ghi nợ',
																			width : 60,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['IS_DEBIT'];
																				if (data != ''
																						&& data == '1')
																					return 'Nợ'
																				return '';
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'CUS_NM',
																			sortable : false,
																			text : 'Khách hàng',
																			width : 120
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'DSCRT',
																			sortable : false,
																			text : 'Ghi chú',
																			flex : 0.5
																		},
																		{
																			menuDisabled : true,
																			sortable : false,
																			text : '',
																			xtype : 'actioncolumn',
																			align : 'center',
																			width : 50,
																			items : [ 
																			   { 
																				iconCls : 'icon-pdf',
																				tooltip : 'In hóa đơn PDF',
																				handler : me.exportPdfFile
																			   }
																			   ]
																		},
																		{
																			menuDisabled : true,
																			sortable : false,
																			text : '',
																			xtype : 'actioncolumn',
																			align : 'center',
																			width : 50,
																			items : [ 
																			   { 
																				iconCls : 'icon-excel',
																				tooltip : 'Xuất excel',
																				handler : me.exportExcelFile
																			   } 
																			   ]
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'HAS_PAYED',
																			sortable : true,
																			align: 'center',
																			text : 'Thanh toán',
																			width : 100,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['HAS_PAYED'];
																				debit = r.data['IS_DEBIT'];
																				if (debit != '1') {
																					return '';
																				}
																				if (data != ''
																						&& data == '1')
																					return ''
																				return 'Chưa';
																			}

																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'IS_DELIVERED',
																			sortable : true,
																			text : 'Xuất kho',
																			width : 90,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['IS_DELIVERED'];
																				debit = r.data['IS_DELIVERED'];
																				if (debit == '1'
																						|| debit == 1) {
																					return '';
																				}
																				return 'Chưa xuất';
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'IS_ORDER',
																			sortable : true,
																			hidden : true,
																			text : 'Loại đơn',
																			width : 80,
																			renderer : function(
																					value,
																					p,
																					r) {
																				debit = r.data['IS_ORDER'];
																				if (debit != '1') {
																					return '';
																				}
																				if (debit == '1'
																						|| debit == 1) {
																					return 'Đặt hàng'
																				}
																				return '';
																			}

																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'SALER',
																			sortable : false,
																			text : 'Người bán',
																			width : 120
																		} ],
																tbar : [
																		{
																			text : 'Hôm nay',
																			iconCls : 'icon-search',
																			itemId : 'btnStatisDaily'
																		},
																		{
																			text : 'Tất cả',
																			iconCls : 'icon-search',
																			cls : 'buttonCls',
																			itemId : 'btnStatisWeekly'
																		},
																		{
																			text : 'Tháng này',
																			iconCls : 'icon-search',
																			itemId : 'btnStatisMonthly'
																		},
																		{
																			text : 'Khác',
																			iconCls : 'icon-search',
																			itemId : 'btnStatisQuy'
																		},
																		{
																			xtype : 'combo',
																			itemId : 'FULLNAME',
																			name : 'FULLNAME',
																			fieldLabel : 'Người bán',
																			labelWidth: 80,
																			emptyText : 'Chọn người bán',
																			store : useStore,
																			displayField : 'FULLNAME',
																			valueField : 'USERNAME',
																			value : '',
																			autoload : false
																		},{
																            xtype: 'radiogroup',
																            hidden: true,
																            itemId : 'typeOfBill',
																            fieldLabel: '',
																            layout : {
																					type : 'hbox',
																					flex : 1
																				},
																            items: [
																                {boxLabel: 'Đã xuất kho', name: 'loaidon', inputValue: 1},
																                {boxLabel: 'Tất cả đơn', name: 'loaidon', inputValue: 0, checked: true}
																            ]
																        } ],
																bbar : [
																		{
																			text : 'PDF',
																			iconCls : 'icon-pdf',
																			height : 22,
																			itemId : 'btnStatisPrint',
																		},
																		{
																			text : 'Excel',
																			iconCls : 'icon-excel',
																			height : 22,
																			itemId : 'btnExcelPrint',
																		} ],
																dockedItems : [ {
																	xtype : 'pagingtoolbar',
																	dock : 'bottom',
																	store : statisticStore,
																	displayInfo : true
																} ]
															},
															{
																xtype : 'container',
																layout : {
																	align : 'stretch',
																	type : 'hbox'
																},
																items : [
																		{
																			xtype : 'label',
																			fieldLabel : 'Tổng',
																			text : 'Tổng: ',
																			cls : 'sumary-label'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Tổng',
																			itemId : 'statis-total-id',
																			text : '0.0',
																			cls : 'sumary-field'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Đã thanh toán',
																			text : 'Thanh toán: ',
																			cls : 'sumary-label'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Tổng',
																			itemId : 'statis-payed-id',
																			text : '0.0',
																			cls : 'sumary-field'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Nợ',
																			text : 'Còn nợ: ',
																			cls : 'sumary-label'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Nợ',
																			itemId : 'statis-debit-id',
																			text : '0.0',
																			cls : 'sumary-field'
																		} ]
															} ]
												} ]
											} ]
										});
						me.callParent(arguments);
	},
	exportPdfFile: function(grid,rowIndex,colIndex){
		grid.getSelectionModel().select(rowIndex);
		var myController = MANAGER.app
								.getController('MNG.controller.saleStatisticController');
		myController.showPopupPdf(grid.getStore().getAt(rowIndex));
	},
	exportExcelFile: function(grid,rowIndex,colIndex){
		grid.getSelectionModel().select(rowIndex);
		var myController = MANAGER.app
								.getController('MNG.controller.saleStatisticController');
		myController.getExcelFillBill(grid.getStore().getAt(rowIndex));
	}
});