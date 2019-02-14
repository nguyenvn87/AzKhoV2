/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
var convertToVNDateFromEngDate = Ext.create("BIZ.utilities.formatSupporter");
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");
Ext
		.define(
				'BS.infoRestaurantContainer',
				{
					extend : 'Ext.form.Panel',
					// cls : 'jdvn-main',
					itemId : 'rightContainerID',
					title : '',
					titleContent : 'Thiết lập hóa đơn',
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
											items : [
													{
														xtype : 'container',
														cls : 'jdvn-sub-header',
														//hidden : true,
														layout : {
															align : 'stretch',
															type : 'hbox'
														},
														items : [
																{
																	xtype : 'container',
																	width : 200,
																	items : [ {
																		xtype : 'displayfield',
																		fieldLabel : ''
																	} ]
																},
																{
																	xtype : 'container',
																	cls: 'hight-light-label',
																	// 'description',
																	flex : 1,
																	items : [ {
																		xtype : 'displayfield',
																		itemId: 'ItemTextNotify',
																		fieldLabel : '',
																		value : me.titleContent,
																	} ]
																} ]
													},
													{
														xtype : 'container',
														cls : 'jdvn-main',
														layout : {
															align : 'stretch',
															type : 'vbox'
														},
														items : [
														         {
																	xtype : 'fieldset',
																	title : 'Tên công ty/cửa hàng',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : true,
																	// flex: 1,
																	layout : {
																		align : 'stretch',
																		type : 'vbox'
																	},
																	fieldDefaults: {
																        labelAlign: 'right',
																        msgTarget: 'side'
																    },
																	items : [
																			{
																				xtype : 'textfield',
																				readOnly : true,
																				fieldLabel : 'Mã Code',
																				name : 'RESTAR_CODE',
																				itemId : 'RESTAR_CODE'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tên cửa hàng ',
																				name : 'RESTAR_NM',
																				itemId : 'RESTAR_NM'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Email liên hệ ',
																				name : 'EMAIL',
																				itemId : 'EMAIL'
																			} 
																			]
																},
																{
																	xtype : 'fieldset',
																	title : 'Tiêu đề hóa đơn',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : false,
																	layout : {
																		align : 'stretch',
																		type : 'vbox'
																	},
																	fieldDefaults: {
																        labelAlign: 'right',
																        msgTarget: 'side'
																    },
																	items : [
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tiêu đề hóa đơn',
																				name : 'BILL_TITLE',
																				itemId : 'BILL_TITLE'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tiêu đề chính',
																				name : 'BILL_SLOGAN',
																				itemId : 'BILL_SLOGAN'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tiêu đề 1',
																				name : 'ADDR',
																				itemId : 'ADDR'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tiêu đề 2',
																				name : 'ADDR2',
																				itemId : 'ADDR2'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Tiêu đề 3',
																				name : 'BILL_TITLE3',
																				itemId : 'BILL_TITLE3'
																			}]
																},
																{
																	xtype : 'fieldset',
																	title : 'Cuối trang hóa đơn',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : true,
																	layout : {
																		align : 'stretch',
																		type : 'hbox'
																	},
																	fieldDefaults: {
																        labelAlign: 'right',
																        msgTarget: 'side'
																    },
																	items : [
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Nhãn trái',
																				name : 'BILL_BOTTOM1',
																				flex: 1,
																				itemId : 'BILL_BOTTOM1'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Nhãn giữa',
																				padding : '0 0 0 10',
																				flex: 1,
																				name : 'BILL_BOTTOM2',
																				itemId : 'BILL_BOTTOM2'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Nhãn phải',
																				padding : '0 0 0 10',
																				flex: 1,
																				name : 'BILL_BOTTOM3',
																				itemId : 'BILL_BOTTOM3'
																			}
																			]
																},
																{
																	xtype : 'fieldset',
																	title : 'Thanh toán',
																	padding : '10 10 10 10',
																	collapsible : true,
																	hidden: true,
																	collapsed : false,
																	layout : {
																		align : 'stretch',
																		type : 'hbox'
																	},
																	items : [
																			{
																				xtype : 'hiddenfield',
																				//name : 'IS_PRINT_PAYMENT'
																			},
																			{
																				xtype : 'hiddenfield',
																				//name : 'IS_PRINT_PAYMETHOD'
																			},
																			]
																},
																{
																	xtype : 'fieldset',
																	title : 'Nội dung thanh toán',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : true,
																	layout : {
																		align : 'stretch',
																		type : 'vbox'
																	},
																	items : [
																			{
																				xtype: 'checkboxfield',
											                                    fieldLabel: '',
											                                    boxLabel: 'In kết quả thanh toán',
											                                    name: 'IS_PRINT_PAYMENT',
											                                    checked : false,
											                                    inputValue : 1
																			},
																			{
																				xtype: 'checkboxfield',
											                                    fieldLabel: '',
											                                    boxLabel: 'In hình thức thanh toán',
											                                    name: 'IS_PRINT_PAYMETHOD',
											                                    checked : false,
											                                    inputValue : 1
																			},
																			]
																},
																{
																	xtype : 'fieldset',
																	title : 'Khổ giấy in',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : true,
																	// flex: 1,
																	layout : {
																		//align : 'stretch',
																		type : 'vbox'
																	},
																	fieldDefaults: {
																        labelAlign: 'right',
																        msgTarget: 'side'
																    },
																	items : [
																			{
																				xtype : 'combo',
																				itemId : 'IS_PRINT_BIG',
																				name : 'IS_PRINT_BIG',
																				fieldLabel : 'Cỡ hóa đơn',
																				emptyText : 'Chọn khổ giấy hóa đơn',
																				store : Ext
																						.create(
																								'Ext.data.Store',
																								{
																									fields : [
																											'value',
																											'name' ],
																									data : [
																											{
																												"value" : '1',
																												"name" : "Giấy A4"
																											},
																											{
																												"value" : '0',
																												"name" : "Giấy A8"
																											} ]
																								}),
																				displayField : 'name',
																				valueField : 'value'
																			},
																			{
																				xtype : 'combo',
																				itemId : 'USER_EDIT_BILL',
																				name : 'USER_EDIT_BILL',
																				fieldLabel : 'Người sửa HĐ',
																				value: "ROLE_ADMIN",
																				hidden: true,
																				emptyText : 'Chọn người được phép sửa hóa đơn',
																				store: Ext.create('Ext.data.Store',{
																					fields: ['value', 'name'],
																				    data : [
																				        {"value":"ROLE_USER", "name":"Nhân viên"},
																				        {"value":"ROLE_MANAGER", "name":"Quản lý"},
																				        {"value":"ROLE_ADMIN", "name":"Admin"}]
																				}),
																				displayField : 'name',
																				valueField : 'value'
																			},
																			{
																				xtype : 'container',
																				hidden: true,
																				layout : {
																					align : 'stretch',
																					type : 'hbox'
																				},
																				items : [
																						{
																							xtype : 'numberfield',
																							fieldLabel : 'Điểm qui đổi',
																							itemId : 'COIN_EXCHANGE',
																							name : 'COIN_EXCHANGE',
																							emptyText : 'Điểm quy đổi',
																							minValue : 0,
																							maxValue : 1000000,
																							regex : /^-?\d*\.?\d*$/
																						},
																						{
																							xtype : 'label',
																							text : '(1 điểm = ? VNĐ)'
																						},
																						{
																							xtype : 'label',
																							text : '(dùng để tích điểm cho khách hàng thân thiết dựa trên số tiền trên mỗi hóa đơn)'
																						} ]
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
																				xtype : 'container',
																				flex : 1
																			},
																			{
																				xtype : 'button',
																				text : 'Lưu ',
																				height : 40,
																				handler : this.submitForm
																			},
																			{
																				xtype : 'container',
																				flex : 1
																			} ]
																} ]
													}

											]
										});

						me.callParent(arguments);
					},
					submitForm : function() {
						var form = this.up('form').getForm();
						form.submit({
							method : 'POST',
							url : contextPath + '/store/updateRestaurant.json',
							success : function(form, action) {
								Ext.Msg.alert('Thông báo', 'Đã lưu');
							},
							failure : function(form, action) {
								Ext.Msg.alert('Failed', '');
							}
						});
					},
					loadData : function(_restaurId) {

						Ext.ComponentQuery.query('#rightContainerID')[0]
								.getForm()
								.load(
										{
											url : contextPath
													+ '/store/getRestaurantInfo.json',
											waitMsg : 'Loading',
											method : 'GET',
											params : {
												RESTAR_ID : _restaurId
											},
											success : function(form, actions) {
												var text = Ext.JSON.decode(actions.response.responseText);
												var data = text.data;
												var item = Ext.ComponentQuery.query('#ItemTextNotify');
												if(item){ 
													var textExt = convertToVNDateFromEngDate.convertToVNDateFromEngDate(data.EXPIRED_DATE);
													item[0].setValue('Hạn sử dụng phần mềm đến ngày: '+textExt);
												}
											}
										});
					},
				});