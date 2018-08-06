/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");
Ext
		.define(
				'BS.infoRestaurantContainer',
				{
					extend : 'Ext.form.Panel',
					// cls : 'jdvn-main',
					itemId : 'rightContainerID',
					title : '',
					titleContent : '',
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
														hidden : true,
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
																	// cls :
																	// 'description',
																	flex : 1,
																	items : [ {
																		xtype : 'displayfield',
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
																	title : 'Thông tin cửa hàng trên hóa đơn',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : false,
																	// flex: 1,
																	layout : {
																		align : 'stretch',
																		type : 'vbox'
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
																				fieldLabel : 'Quận/huyện',
																				name : 'ADDR',
																				itemId : 'ADDR'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Địa chỉ',
																				name : 'ADDR2',
																				itemId : 'ADDR2'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Số điện thoại',
																				name : 'PHONE',
																				itemId : 'PHONE'
																			},
																			{
																				xtype : 'textfield',
																				fieldLabel : 'Email ',
																				name : 'EMAIL',
																				itemId : 'EMAIL'
																			} ]
																},
																{
																	xtype : 'fieldset',
																	title : 'Thiết lập khác',
																	padding : '10 10 10 10',
																	collapsible : true,
																	collapsed : false,
																	// flex: 1,
																	layout : {
																		align : 'stretch',
																		type : 'vbox'
																	},
																	items : [
																			{
																				xtype : 'combo',
																				itemId : 'IS_PRINT_BIG',
																				name : 'IS_PRINT_BIG',
																				fieldLabel : 'Cỡ hóa đơn',
																				emptyText : 'Chọn loại hóa đơn',
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
																												"name" : "Hóa đơn cỡ lớn"
																											},
																											{
																												"value" : '0',
																												"name" : "Hóa đơn cỡ nhỏ"
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
											}
										});
					},
				});