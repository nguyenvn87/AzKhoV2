/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

var tmpComboStore = Ext.create('MNG.store.cdUserStore', {});
customerComboStore = Ext.create('MNG.store.customerStore');

Ext
		.define(
				'MNG.view.popup.BtnBillInfo',
				{
					extend : 'Ext.window.Window',
					height : 250,
					width : 700,
					y : 10,
					title : 'Thông tin đơn hàng',
					maxHeight : 800,
					closeAction : 'hide',
					resizable : false,
					srvdId : null,
					config : {
						ROOM_USED_ID : '',
						name : "",
						isdeliver : '',
						phone : '',
						addr : '',
						addrship : '',
						score : 0,
						shipfee : 0,
						totalMoney : 0,
						payedMoney : 0,
						hasPayed : 0,
						cusCd: null
					},
					initComponent : function() {
						var me = this;

						Ext
								.applyIf(
										me,
										{
											items : [ {
												xtype : 'container',
												cls : 'jdvn-main',
												itemId : 'btnSrvcContainerId',
												layout : {
													align : 'stretch',
													type : 'vbox'
												},
												items : [
														{
															xtype : 'container',
															layout : {
																align : 'stretch',
																type : 'hbox'
															},
															items : [
																	{
																		xtype : 'fieldset',
																		title : 'Khách hàng',
																		padding : '10 10 10 10',
																		flex : 1,
																		layout : {
																			align : 'stretch',
																			type : 'vbox'
																		},
																		items : [
																				{
																					xtype : 'combo',
																					fieldLabel : "Khách hàng",
																					store : customerComboStore,
																					name : 'CUS_NM',
																					itemId : 'CUS_NM',
																					displayField : 'NAME',
																					valueField : 'CUS_CD',
																					anchor : '100%',
																					emptyText : 'Tên hoặc ĐT khách hàng',
																					minChars : 1,
																					flex : 1,
																					listConfig : {
																						loadingText : 'Searching...',
																						emptyText : 'No matching posts found.',
																						getInnerTpl : function() {
																							return '<a class="search-item"'
																									+ '<h3>{NAME}<br />ĐT: <span>{PHONE}</span></h3>'
																									+ '{excerpt}'
																									+ '</a>';
																						}
																					},
																					pageSize : 10,
																					listeners : {
																						select : function(
																								obj,
																								record) {
																							var data = record[0].raw;
																							me.config.cusCd = data['CUS_CD'];
																							
																							return true;
																						}
																					}
																				},
																				{
																					xtype : 'numberfield',
																					itemId : 'SCORE',
																					name : 'SCORE',
																					hidden : true,
																					minValue : 0,
																					maxValue : 1000000,
																					regex : /^-?\d*\.?\d*$/,
																					fieldLabel : 'Điểm tích lũy'
																				},
																				{
																					xtype : 'textfield',
																					itemId : 'PHONE',
																					name : 'PHONE',
																					fieldLabel : 'Điện thoại'
																				},
																				{
																					xtype : 'textfield',
																					fieldLabel : 'Địa chỉ',
																					itemId : 'ADDR'
																				} ]
																	},
																	{
																		xtype : 'fieldset',
																		title : 'Thanh toán',
																		flex : 0.8,
																		layout : {
																			align : 'stretch',
																			type : 'vbox'
																		},
																		padding : '10 10 10 10',
																		defaults : {
																			cls : 'jdvn-sub-body'
																		},
																		items : [
																				{
																					xtype : 'numberfield',
																					itemId : 'TOTAL_MONEY',
																					name : 'TOTAL_MONEY',
																					minValue : 0,
																					value : 0,
																					readOnly : true,
																					maxValue : 100000000,
																					fieldLabel : 'Tổng tiền'
																				},
																				{
																					xtype : 'numberfield',
																					itemId : 'PAYED_MONEY',
																					name : 'PAYED_MONEY',
																					minValue : 0,
																					value : 0,
																					maxValue : 100000000,
																					fieldLabel : 'Khách trả'
																				},
																				{
																					xtype : 'checkbox',
																					fieldLabel : 'Đã trả',
																					itemId : 'HAS_PAYED',
																					name : 'HAS_PAYED',
																					fieldLabel : 'Đã trả tiền',
																					flex : 1,
																					listeners: {
													                                	change: function (checkbox, newVal, oldVal) {
													                                		if(newVal){
													                                			value_ = Ext.ComponentQuery.query('#btnSrvcContainerId #TOTAL_MONEY')[0].getValue();
													                                			Ext.ComponentQuery.query('#btnSrvcContainerId #PAYED_MONEY')[0].setValue(value_);
													                                		}
													                                		else{
													                                			Ext.ComponentQuery.query('#btnSrvcContainerId #PAYED_MONEY')[0].setValue(0);
													                                		}
													                                	}
													                                }
																				} ]
																	} ]
														},
														// Add ship info here
														{
															xtype : 'fieldset',
															title : 'Giao hàng',
															hidden: true,
															flex : 1,
															layout : {
																// align :
																// 'stretch',
																type : 'hbox'
															},
															// padding : '10 0 0
															// 0',
															items : [
																	{
																		xtype : 'textfield',
																		fieldLabel : 'Ghi chú',
																		itemId : 'DSCRT',
																		flex : 1,
																		padding : '0 10 10 0',
																	},
																	{
																		xtype : 'checkbox',
																		itemId : 'IS_DELILVER',
																		name : 'IS_DELILVER',
																		fieldLabel : 'Đã giao hàng'
																	} ]
														} ]
											}

											],
											buttons : [
													{
														xtype : 'button',
														cls : 'button',
														hidden: true,
														iconCls : 'icon-delete',
														text : 'Hủy đơn',
														itemId : 'BtnCancelBill'
													},
													{
														xtype : 'button',
														cls : 'button',
														iconCls : 'icon-save',
														action : 'saveSrvc',
														text : 'Lưu',
														itemId : 'BtnSaveBill'
													},
													{
														xtype : 'button',
														cls : 'button',
														height : 25,
														text : 'Đóng',
														listeners : {
															click : function() {
																this
																		.up(
																				'.window')
																		.hide();
															}
														}
													} ]
										});
						this.callParent(arguments);
					},
					listeners : {
						afterrender : function() {
							tmpComboStore.getProxy().extraParams = {
								GROUP_CD : 'GRHAG',
							};
							tmpComboStore.load();
						}
					},
					initNew : function() {
						Ext.ComponentQuery.query('#btnSrvcContainerId #CUS_NM')[0]
								.setValue('');
						Ext.ComponentQuery.query('#btnSrvcContainerId #TYPE')[0]
								.setValue(null);
						Ext.ComponentQuery
								.query('#btnSrvcContainerId #IS_USED')[0]
								.setValue(1);
						Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0]
								.setValue('');
					},
					renderValue : function() {
						me = this;
						Ext.ComponentQuery
								.query('#btnSrvcContainerId #TOTAL_MONEY')[0]
								.setValue(me.config.totalMoney);
						Ext.ComponentQuery
								.query('#btnSrvcContainerId #PAYED_MONEY')[0]
								.setValue(me.config.payedMoney);
						Ext.ComponentQuery.query('#btnSrvcContainerId #CUS_NM')[0]
								.setValue(me.config.name);
						Ext.ComponentQuery
								.query('#btnSrvcContainerId #IS_DELILVER')[0]
								.setValue(parseInt(me.config.isdeliver));
						Ext.ComponentQuery.query('#btnSrvcContainerId #PHONE')[0]
								.setValue(me.config.phone);

						Ext.ComponentQuery.query('#btnSrvcContainerId #ADDR')[0]
								.setValue(me.config.addr);
						Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0]
								.setValue(me.config.addrship);
						Ext.ComponentQuery.query('#btnSrvcContainerId #SCORE')[0]
								.setValue(me.config.score);
						Ext.ComponentQuery
								.query('#btnSrvcContainerId #HAS_PAYED')[0]
								.setValue(me.config.hasPayed);

					}
				});
