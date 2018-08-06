/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
var customerComboStore = Ext.create('MNG.store.customerStore');

Ext
		.define(
				'BS.infoCustomerContainer',
				{
					extend : 'Ext.container.Container',
					itemId : 'customerContainerId',
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
												xtype : 'fieldset',
												title : 'Khách hàng',
												padding : '0 10 0 10',
												collapsible : true,
												collapsed : false,
												cls: 'addbtn',
												layout : {
													align : 'stretch',
													type : 'vbox'
												},
												items : [
														{
															xtype : 'container',
															flex : 1,
															defaults : {
																anchor : '100%'
															},
															padding : '0 0 5 0',
															layout : {
																align : 'stretch',
																type : 'hbox'
															},
															items : [
																	{
																		xtype : 'combo',
																		fieldLabel : "Họ tên",
																		labelWidth:70,
																		store : customerComboStore,
																		itemId: 'comboCustomerId',
																		name : 'NAME',
																		displayField : 'NAME',
																		valueField : 'CUS_CD',
																		anchor : '100%',
																		emptyText : 'Tìm theo tên hoặc số ĐT',
																		minChars : 1,
																		flex : 1,
																		listConfig : {
																			loadingText : 'Searching...',
																			emptyText : 'No matching posts found.',
																			getInnerTpl : function() {
																				return '<a class="search-item">' 
																                         + '<h3>{NAME} - {ACCUMULT}đ<br /><span>ĐT: {PHONE}</span></h3>'
																                         + ' Đ/C:{ADDR}.' 
																                         + '</a>';
																			}
																		},
																		pageSize : 10,
																		listeners : {
																			select: function(obj,record){
																			var data = record[0].raw;
																			var tmpValue = data['CUS_CD'];
																			Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].setValue(tmpValue);
																			Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].setValue(data['ADDR']);
																			return true;
																		}}
																	},
																	{
																		xtype : 'button',
																		itemId : 'btnAddCustomer'
																	} 
																	]
														},
														{
															xtype : 'textfield',
															fieldLabel : "Ghi chú",
															labelWidth:70,
															emptyText : 'Nhập nội dung ghi chú',
															name : 'ADDR',
															readOnly : false
														},
														{
															xtype : 'textfield',
															name : 'CUS_CD',
															hidden : true,
														} ]
											} ]
										});

						me.callParent(arguments);
					}
				});