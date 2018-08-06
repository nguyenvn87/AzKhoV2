/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext
		.define(
				'MNG.view.popup.BtnChangeService',
				{
					extend : 'Ext.window.Window',
					requires:['Ext.custom.common.NumberField'],
					Height : 600,
					width : 500,
					title : 'Cập nhật SL',
					maxHeight : 1500,
					closeAction : 'hide',
					resizable : true,
					isCreate : true, // true: create/ false: update
					serviceId : null,
					y : 100,
					initComponent : function() {
						var me = this;

						Ext
								.applyIf(
										me,
										{
											items : [ {
												xtype : 'container',
												cls : 'jdvn-main',
												itemId : 'chgSrvcContainer',
												layout : {
													align : 'stretch',
													type : 'vbox'
												},
												items : [ {
													xtype : 'container',
													layout : {
														align : 'stretch',
														type : 'vbox'
													},
													items : [ {
														xtype : 'container',
														cls: 'input-special-cls',
														layout : {
															align : 'stretch',
															type : 'vbox'
														},
														defaults : {
															cls : 'jdvn-sub-body',
															flex : 1
														},
														items : [
																{
																	xtype : 'textfield',
																	itemId : 'MENU_NM',
																	readOnly: true,
																	name : 'MENU_NM',
																	fieldLabel : 'Tên mục'
																},
																{
																	xtype : 'numericfield',
																	anchor : '100%',
																	useThousandSeparator: true,
																	decimalPrecision: 0,
																	hideTrigger:true,
																	alwaysDisplayDecimals: false,
																	allowNegative: false,
																	currencySymbol:'',
																	thousandSeparator: ',',
																	flex : 1,
																	align: 'center',
																	itemId : 'PRICE',
																	name : 'PRICE',
																	height : 35,
																	minValue : 0,
																	maxValue : 99000000,
																	fieldLabel : 'Giá bán (đ)'

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
																				text : 'Số lượng',
																				width: 105	
																			},
																			{
																				xtype : 'component',
																				width : 40,
																				autoEl : {
																					tag : 'img',
																					src : contextPath
																							+ '/images/icon/minus48.png'
																				},
																				listeners : {
																					el : {
																						click : function() {
																							var cpmObj = Ext.ComponentQuery
																									.query('#chgSrvcContainer #AMOUNT')[0];
																							_value = parseInt(cpmObj
																									.getValue());
																							if (_value >= 1) {
																								cpmObj
																										.setValue(_value - 1);
																							}
																						},
																						scope : this
																					}
																				}
																			},
																			{
																				xtype : 'numberfield',
																				itemId : 'AMOUNT',
																				name : 'AMOUNT',
																				minValue : 0,
																				align: 'center',
																				maxValue : 1000000,
																				height : 35,
																				flex : 2,
																				listeners : {
																					keyup : function(
																							key1) {
																					}
																				}
																			},

																			{
																				xtype : 'component',
																				width : 40,
																				autoEl : {
																					tag : 'img',
																					src : contextPath
																							+ '/images/icon/plus48.png'
																				},
																				listeners : {
																					el : {
																						click : function() {
																							var cpmObj = Ext.ComponentQuery
																									.query('#chgSrvcContainer #AMOUNT')[0];
																							_value = parseInt(cpmObj
																									.getValue()) + 1;
																							cpmObj
																									.setValue(_value);
																						},
																						scope : this
																					}
																				}
																			},
																			{
																				xtype : 'simplecombobox',
																				width : 50,
																				readOnly : true,
																				hidden: true,
																				itemId : 'UNIT',
																				name : 'UNIT',
																				labelWidth : 30,
																				datatype : 'combo',
																				scrid : 'DONVI',
																				displayField : 'name',
																				valueField : 'value',
																				scrid : 'DONVI',
																				autoload : false
																			}
																			 ]
																},

														]
													} ]
												} ]
											}

											],
											buttons : [
													{
														xtype : 'button',
														cls : 'button',
														iconCls : 'icon-save',
														height : 40,
														text : 'OK',
														itemId : 'btnUpdateService'
													},
													{
														xtype : 'button',
														cls : 'button',
														iconCls : 'icon-delete',
														hidden : true,
														text : 'Xóa',
														itemId : 'btnDeleteService'
													},
													{
														xtype : 'button',
														cls : 'button',
														height : 40,
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
					}
				});
