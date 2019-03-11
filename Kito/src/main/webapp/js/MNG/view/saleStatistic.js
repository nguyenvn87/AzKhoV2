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
				'MNG.view.saleStatistic',
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
																			width : 95,
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
																				return data;
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
																				return data;
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
																			dataIndex : 'HAS_PAYED',
																			sortable : true,
																			text : 'Ghi chú nợ',
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
																					return 'Nợ, đã trả'
																				return 'Chưa thanh toán';
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
																			text : 'Chỉnh sửa',
																			xtype : 'actioncolumn',
																			align : 'center',
																			width : 100,
																			items : [ {
																				iconCls : 'icon-edit',
																				tooltip : 'Sửa',
																				handler : function(
																						grid,
																						rowIndex,
																						colIndex) {
																					me
																							.showDetail(
																									grid,
																									rowIndex,
																									colIndex);
																				}
																			} ]
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
																					return 'Đã xuất';
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
																			dataIndex : 'USER_NAME',
																			sortable : false,
																			text : 'Người lập',
																			width : 85
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
																			emptyText : 'Chọn người bán',
																			store : useStore,
																			displayField : 'FULLNAME',
																			valueField : 'USERNAME',
																			value : '',
																			autoload : false,
																			listener: {
																				onChange: function(){
																					alert(1);
																				}
																			}
																		} ],
																bbar : [
																		{
																			text : 'PDF',
																			iconCls : 'icon-pdf',
																			height : 35,
																			itemId : 'btnStatisPrint',
																		},
																		/*
																		 * {
																		 * text:
																		 * 'Xuất
																		 * kho',
																		 * iconCls:
																		 * 'icon-pdf',
																		 * height:
																		 * 35,
																		 * itemId:
																		 * 'btnExportPrint', }, {
																		 * text:
																		 * 'Tồn
																		 * kho',
																		 * iconCls:
																		 * 'icon-pdf',
																		 * height:
																		 * 35,
																		 * itemId:
																		 * 'btnStoreRemainPrint', },
																		 */
																		{
																			text : 'Excel',
																			iconCls : 'icon-excel',
																			height : 35,
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
					showDetail : function(grid, rowIndex, colIndex) {
						var myController = MANAGER.app
								.getController('MNG.controller.saleStatisticController');
						store = grid.getStore();
						rec = store.getAt(rowIndex);
						var isDeliver = rec.get('IS_DELIVERED');
						var dscrt = rec.get('DSCRT');
						console.info(rec);
						var param = {
							name : rec.get('CUS_NM'),
							cusCd : rec.get('CUS_CD'),
							phone : '',
							addr : '',
							addrship : dscrt,
							score : 600,
							isdeliver : parseInt(isDeliver),
							ROOM_USED_ID : rec.get('ROOM_USED_ID'),
							totalMoney : rec.get('TOTAL_MONEY'),
							payedMoney : rec.get('PAYED_MONEY'),
							hasPayed : rec.get('HAS_PAYED')
						};
						myController.showCustomerInfo(param);
					}
				});