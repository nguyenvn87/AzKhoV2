/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
Ext
		.define(
				'BS.infoPaymentContainer',
				{
					extend : 'Ext.container.Container',
					requires:['Ext.custom.common.NumberField'],
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					
					itemId : 'paymentItemId',
					cls: 'payment',//'x-box-payment',
					initComponent : function() {
						var me = this;

						Ext
								.applyIf(
										me,
										{
											items : [
													{
														xtype : 'fieldset',
														columnWidth : 0.5,
														collapsible : true,
														defaultType : 'textfield',
														defaults : {
															anchor : '100%'
														},
														padding : '2 8 8 4',
														layout : 'anchor',
														items : [
																{
																	xtype : 'datefield',
																	itemId : 'CHANGETIME',
																	name : 'CHANGETIME',
																	format : 'd-m-Y H:i',
																	altFormats : 'Ymd',
																	fieldLabel : 'Ngày',
																	value : new Date(),
																	submitFormat : 'Y-m-d H:i:s',
																	emptyText : 'Ngày'
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
																	itemId : 'TOTAL_MONEY',
																	value : 0,
																	cls : 'input-total-money-cls',
																	fieldLabel : "Tổng tiền",
																	readOnly : true
																},
																{
																	xtype : 'numberfield',
																	itemId : 'DISCOUNT',
																	cls : 'input-needpay-money-cls',
																	dataIndex : 'DISCOUNT',
																	fieldLabel : "Giảm giá",
																	value : 0,
																	listeners : {
																		change : function(
																				object) {
																			Ext
																					.getCmp(
																							"NEEDPAYED")
																					.setValue(
																							Ext
																									.getCmp("TOTAL").value
																									- object.value);
																		}
																	}
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
																	itemId : 'NEEDPAYED',
																	fieldLabel : "Tiền cần trả",
																	cls : 'input-pay-money-cls',
																	readOnly : true,
																	value : 0
																},
																{
																	xtype : 'container',
																	layout : {
																		align : 'stretch',
																		type : 'hbox'
																	},
																	cls: 'card-btn',
																	items : [
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
																				itemId : 'PAYED',
																				cls : 'input-needpay-money-cls',
																				fieldLabel : "Khách trả",
																				width: 280,
																				value : 0
																			},
																			{
																				xtype : 'button',
																				itemId : 'PAYED_OPTION',
																				width: 25,
																				height: 25
																			},
																			{
																				xtype : 'label',
																				itemId : 'PAYED_LABEL',
																				text: '(Tiền mặt)',
																				width: 100
																			},
																			{
																				xtype : 'checkbox',
																				labelWith : 60,
																				labelAlign : 'right',
																				fieldLabel : 'Ghi nợ',
																				itemId : 'IS_DEBIT',
																				checked : false,
																				inputValue : '1',
																				listeners : {
																					change : function(
																							checkbox,
																							newVal,
																							oldVal) {
																						if (newVal) {
																							Ext.ComponentQuery
																									.query('#paymentItemId #PAYED')[0]
																									.setValue(0);
																						} else {
																							var value = Ext.ComponentQuery
																									.query('#paymentItemId #NEEDPAYED')[0]
																									.getValue();
																							Ext.ComponentQuery
																									.query('#paymentItemId #PAYED')[0]
																									.setValue(value);
																						}
																					}
																				}
																			} ]
																}

														]
													},
													{
														xtype : 'container',
														layout : {
															align : 'center',
															type : 'hbox'
														},
														defaults : {
															cls : 'inline-button',
															padding : '10 10 10 10',
														},
														padding : '5 5 5 5',
														items : [
																{
																	xtype : 'button',
																	text : 'Lưu',
																	hidden: true,
																	width : 80,
																	iconCls : 'icon-true',
																	style : 'background-color:red',
																	listeners : {
																		click : function() {
																			me
																					.destroyPopup();
																		}
																	}
																},
																{
																	xtype : 'button',
																	iconCls : 'icon-true',
																	itemId : 'btnPaymentId',
																	text : 'Thanh toán & in',
																	flex : 1
																} ]
													} ]
										});

						me.callParent(arguments);
					}
				});