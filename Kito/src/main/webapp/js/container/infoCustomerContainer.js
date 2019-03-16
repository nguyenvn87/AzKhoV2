/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
var customerComboStore = Ext.create('MNG.store.customerStore');
var useStore = Ext.create('MNG.store.userStore', {});
useStore.load();
Ext
		.define(
				'BS.infoCustomerContainer',
				{
					extend : 'Ext.container.Container',
					itemId : 'customerContainerId',
					btnAddCustomer: null,
					isShowNote: true,
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
												//title : 'Khách hàng',
												padding : '0 10 0 10',
												collapsible : true,
												collapsed : false,
												//cls: 'addbtn',
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
																		fieldLabel : "Tên khách",
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
																			Ext.ComponentQuery.query('#customerContainerId [name=DSCRT]')[0].setValue(data['ADDR']);
																			return true;
																		}}
																	},
																	{
																		xtype : 'button',
																		itemId : 'btnAddCustomer',
																		cls: 'addmore',
																		tooltip : 'Thêm khách hàng mới',
																		handler: function(){
																			me.showAddCustomer();
																		}
																	} 
																	]
														},
														{
															xtype : 'textfield',
															fieldLabel : "Ghi chú",
															labelWidth:70,
															hidden: !me.isShowNote,
															emptyText : 'Ghi chú khách hàng',
															name : 'ADDR',
															readOnly : false
														},
														{
															xtype : 'textareafield',
															anchor : '100%',
															hidden: me.isShowNote,
															emptyText : 'Ghi chú khách hàng',
															height : 40,
															name : 'DSCRT',
															labelWidth : 70,
															fieldLabel : 'Ghi chú'
														},
														{
															xtype : 'textfield',
															name : 'CUS_CD',
															hidden : true,
														},{
															xtype : 'combo',
															name : 'USERNAME',
															fieldLabel : 'Người bán',
															labelWidth: 70,
															emptyText : 'Chọn người bán',
															store : useStore,
															displayField : 'FULLNAME',
															valueField : 'USERNAME',
															value : '',
															editable : false,
															autoload : false
														}  ]
											} ]
										});

						me.callParent(arguments);
					},
					showAddCustomer:function(){
						var ScreenXY = Ext.getBody().getViewSize();
						var toadoY = ScreenXY.height;
						var toadoX = ScreenXY.width;
						
						componentTarget = Ext.ComponentQuery.query('#customerContainerId')[0];
						if(this.btnAddCustomer) this.btnAddCustomer.close();
						this.btnAddCustomer = Ext.create('MNG.view.popup.BtnAddCustomer'
								,{y: toadoY/2 - 210
								, x: toadoX - 540
								, componentTarget: componentTarget
								}
							);
						this.btnAddCustomer.show();
						this.btnAddCustomer.initNew();
					},
				});