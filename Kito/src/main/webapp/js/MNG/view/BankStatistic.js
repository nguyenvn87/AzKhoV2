var bankAccountStore = Ext.create('ECNT.store.bankAccountStore');
var thuChiStore = Ext.create('ECNT.store.ThuChiStore', {});

var _height = 90;

Ext
		.define(
				'MNG.view.BankStatistic',
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
																xtype : 'container',
																layout : {
																	type : 'hbox'
																},
																padding : '10 10 10 10',
																items : [
																		{
																			xtype : 'fieldset',
																			title : 'Trạng thái',
																			padding : '0 10 0 10',
																			collapsible : false,
																			height : _height,
																			width : 150,
																			items : [ {
																				itemId : 'STATE_CANCEL',
																				name : 'STATE',
																				xtype : 'radiogroup',
																				layout : {
																					type : 'vbox',
																					flex : 1
																				},
																				items : [
																						{
																							inputValue : '0',
																							checked : true,
																							name : 'isChi',
																							boxLabel : 'Thu'
																						},
																						{
																							inputValue : '1',
																							checked : false,
																							name : 'isChi',
																							boxLabel : 'Chi'
																						} ]
																			} ]
																		},
																		{
																			xtype : 'fieldset',
																			title : 'Loại thanh toán',
																			padding : '0 10 0 10',
																			collapsible : false,
																			width : 350,
																			layout : {
																				align : 'stretch',
																				flex : 1,
																			},
																			height : _height,
																			items : [
																					{
																						xtype : 'radiogroup',
																						itemId : 'HOUS_APT_TYPE',
																						name : 'HOUS_APT_TYPE',
																						layout : {
																							flex : 1
																						},
																						items : [
																								{
																									inputValue : 'ALL',
																									checked : true,
																									name : 'housetype',
																									boxLabel : 'Tất cả'
																								},
																								{
																									inputValue : 'CASH',
																									checked : false,
																									name : 'housetype',
																									boxLabel : 'Tiền mặt'
																								},
																								{
																									inputValue : 'EBANK',
																									checked : false,
																									name : 'housetype',
																									boxLabel : 'Ngân hàng'
																								} ]
																					},
																					{
																						xtype : 'container',
																						itemId : 'containerBankId',
																						hidden: true,
																						layout : {
																							type : 'hbox'
																						},
																						items:[
																						       {
																									xtype : 'combo',
																									fieldLabel : "Tài khoản",
																									store : bankAccountStore,
																									itemId : 'comboBankId',
																									emptyText : 'Chọn tài khoản',
																									displayField : 'BANK_NM',
																									valueField : 'ID_BANK',
																									labelWidth: 65,
																									//width : 300,
																									hidden : true,
																									listConfig : {
																										loadingText : 'Searching...',
																										emptyText : 'Không có bản ghi nào phù hợp.',
																										getInnerTpl : function() {
																											return '<a class="search-item">'
																													+ '{ID_BANK}<br/>'
																													+ '<h3>{BANK_NM}</h3>'
																													+ '</a>';
																										}
																									}
																								},{
																						    	   xtype : 'button',
																						    	   hidden: true,
																						    	   itemId : 'btn-edit-bank',
																						    	   text: 'edit'
																						       },{
																						    	   xtype : 'button',
																						    	   hidden: true,
																						    	   itemId : 'btn-add-bank',
																						    	   text: 'add'
																						       }
																						       ]
																					},
																					]
																		}, 
																		{
																			xtype : 'fieldset',
																			title : 'Thời gian',
																			padding : '0 10 0 10',
																			collapsible : false,
																			flex : 1,
																			minWidth : 450,
																			layout : {
																							type : 'hbox',
																							flex : 1
																						},
																			height : _height,
																			items : [
																					{
																						xtype : 'radiogroup',
																						itemId : 'radiotime',
																						name : 'radiotime',
																						width : 120,
																						layout : {
																							type : 'vbox',
																						},
																						items : [
																								{
																									inputValue : 'Month',
																									checked : true,
																									name : 'time',
																									boxLabel : 'Tháng này'
																								},
																								{
																									inputValue : 'Other',
																									checked : false,
																									name : 'time',
																									boxLabel : 'Khác'
																								}
																								]
																					},{
																						xtype : 'container',
																						itemId: 'containerTimeId',
																						hidden: true,
																						layout : {
																							align : 'stretch',
																							type : 'vbox'
																						},
																						items:[
																						       {
																									xtype : 'datefield',
																									itemId:'CHANGETIME1',
																									name:'CHANGETIME',
																									format : 'd-m-Y',
																									altFormats: 'Ymd',
																									labelWidth: 60,
																									fieldLabel : 'Từ ngày',
																									value: new Date(),
																									submitFormat: 'Y/m/d',
																									emptyText : 'Từ ngày'
																								},
																								{
																									xtype : 'datefield',
																									itemId:'CHANGETIME2',
																									name:'CHANGETIME',
																									format : 'd-m-Y',
																									altFormats: 'Ymd',
																									labelWidth: 60,
																									fieldLabel : 'Đến ngày',
																									value: new Date(),
																									submitFormat: 'Y/m/d',
																									emptyText : 'Đến ngày'
																								}
																						       ]
																					}
																					]
																		}]
															},
															{
																xtype : 'gridpanel',
																itemId : 'grid-srvc-statistic',
																// flex: 1,
																minHeight : 500,
																maxHeight : 800,
																pageSize : 10,
																padding : '10 0 0 0',
																autoScroll : true,
																store : thuChiStore,
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
																			xtype : 'datecolumn',
																			sortable : false,
																			align : 'left',
																			text : 'Ngày',
																			format:'d/m/Y',
																			dataIndex : 'PAYDATE',
																			width : 90
																		},
																		{
																			xtype : 'gridcolumn',
																			sortable : true,
																			align : 'left',
																			width : 100,
																			dataIndex : 'BILL_CD',
																			text : 'Số HĐ'
																		},
																		{
																			xtype : 'numbercolumn',
																			dataIndex : 'VALUE',
																			sortable : false,
																			align: 'right',
																			text : 'Số tiền',
																			width : 120,
																			renderer :function(value, p , r){
									                           					data = r.data['VALUE'];
																				if (data != ''){
																				var value = Ext.util.Format.number(data, '0');
																					data = formatSupporter.formatToMoney(value);
																				}
									                           					return '<span style="color: red">'+data+'</span>';
									                           				}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'TYPE',
																			sortable : true,
																			text : 'Thu/chi',
																			width : 75,
																			renderer : function(
																					value,
																					p,
																					r) {
																				data = r.data['TYPE'];
																				if (data != ''
																						&& data == '1')
																					return 'Chi'
																				return 'Thu';
																			}
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'PERSON',
																			sortable : false,
																			text : 'Người nhận/nộp',
																			width : 140
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'BANK_ID',
																			sortable : false,
																			text : 'Tài khoản',
																			width : 120
																		},
																		{
																			xtype : 'gridcolumn',
																			dataIndex : 'DESCRIPTION',
																			sortable : false,
																			text : 'Lý do',
																			flex : 0.5
																		}
																		],
																tbar : [],
																bbar : [
																		{
																			text : 'PDF',
																			iconCls : 'icon-pdf'
																		},
																		{
																			text : 'Excel',
																			iconCls : 'icon-excel'
																		} ],
																dockedItems : [ {
																	xtype : 'pagingtoolbar',
																	dock : 'bottom',
																	store : thuChiStore,
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
																			fieldLabel : 'Tổng thu',
																			text : 'Tổng thu: ',
																			cls : 'sumary-label'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Tổng thu',
																			itemId : 'statis-total-id',
																			text : '0.0',
																			cls : 'sumary-field'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Đã thanh toán',
																			text : 'Tổng chi: ',
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
																			text : 'Số dư: ',
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
						myController.getCustomerInfo(2);
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