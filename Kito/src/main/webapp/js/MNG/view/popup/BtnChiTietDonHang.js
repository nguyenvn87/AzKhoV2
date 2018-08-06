var srvcListStore = Ext.create('MNG.store.srvcStore', {});
var customerComboStore = Ext.create('MNG.store.customerStore');
var srvcRoomStore = Ext.create('MNG.store.roomSrvcStore', {});
srvcListStore.getProxy().url = contextPath + '/getSearchListMenu.json';
var customContainer = Ext.create('BS.infoCustomerContainer', {});

Ext
		.define(
				'MNG.view.popup.BtnChiTietDonHang',
				{
					extend : 'Ext.window.Window',
					Height : 700,
					width : 960,
					y : 10,
					// x: 10,
					title : 'Chi tiết đơn hàng',
					maxHeight : 700,
					closeAction : 'hide',
					resizable : false,
					srvdId : null,
					config : {
						ROOM_USED_ID : ''
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
													type : 'hbox',
													align : 'stretch'
												},
												items : [
														{
															xtype : 'container',
															flex : 1,
															margins : '5 5 5 5',
															items : [
																	{
																		xtype : 'combo',
																		cls : 'input-search-cls',
																		height : 30,
																		width : 560,
																		store : srvcListStore,
																		displayField : 'title',
																		valueField : 'SRVC_ID',
																		anchor : '100%',
																		emptyText : 'Nhập nội dung tìm kiếm',
																		minChars : 1,
																		pageSize : 10,
																		listConfig : {
																			loadingText : 'Searching...',
																			emptyText : 'No matching posts found.',
																			getInnerTpl : function() {
																				return '<a class="search-item">'
																						+ '<h3>{SRVC_NM}<br /><span>{PRICE}</span></h3>'
																						+ '{DSCRT}'
																						+ '</a>';
																			}
																		},
																		listeners : {
																			select : me.addMoreProduct
																		}
																	},
																	{
																		xtype : 'gridpanel',
																		itemId : 'gridListProductID',
																		store : srvcRoomStore,
																		height : 439,
																		plugins : [ Ext
																				.create(
																						'Ext.grid.plugin.CellEditing',
																						{
																							clicksToEdit : 1,
																							listeners: {
																								'edit': function(e) {
																					                console.log('record ',e.record);
																					              }
																							}
																						}) ],
																		flex : 1,
																		title : '',
																		features : [ {
																			ftype : 'summary'
																		} ],
																		columns : [
																				{
																					xtype : 'rownumberer'
																				},
																				{
																					xtype : 'gridcolumn',
																					width : 80,
																					defaultWidth : 80,
																					hidden : true,
																					dataIndex : 'SRVC_CD',
																					text : 'Mã hàng'
																				},
																				{
																					xtype : 'gridcolumn',
																					flex : 1,
																					text : 'Tên hàng',
																					dataIndex : 'MENU_NM'
																				},
																				{
																					xtype : 'numbercolumn',
																					width : 100,
																					dataIndex : 'PRICE',
																					align: 'right',
																					editable : true,
																					text : 'Giá',
																					editor : {
																						xtype : 'numberfield',
																						allowBlank : false
																					}
																				},
																				{
																					xtype : 'numbercolumn',
																					width : 70,
																					text : 'SL',
																					align: 'right',
																					editable : true,
																					dataIndex : 'AMOUNT',
																					editor : {
																						xtype : 'numberfield',
																						allowBlank : false
																					}
																				},
																				{
																					xtype : 'gridcolumn',
																					text : 'Đơn vị',
																					width : 65,
																					dataIndex : 'UNIT_NM'
																				},
																				{
																					xtype : 'gridcolumn',
																					text : 'Tổng tiền',
																					width : 100,
																					align: 'right',
																					dataIndex : 'TOTAL_MONEY',
																					renderer : function(value, p, r, rowIndex) {
																						var items = srvcRoomStore.data.items;
																						var totalMoney = 0;
																						
																						var data = r.data['TOTAL_MONEY'];
																						money = parseFloat(r.get('AMOUNT')) * parseFloat(r.get('PRICE'));
																						data = formatSupporter.formatToMoney(money);
																						
																						for(var index = 0 ; index < items.length ; index++){
																							totalMoney += (items[index].data.PRICE * items[index].data.AMOUNT);
																						}
																						Ext.ComponentQuery.query('#TOTAL_MONEY')[0].setValue(totalMoney);
																						return data;
																					}
																				},
																				{
																					menuDisabled : true,
																					sortable : false,
																					hidden : true,
																					xtype : 'actioncolumn',
																					align : 'center',
																					text : 'Sửa',
																					width : 50,
																					items : [ {
																						iconCls : 'icon-edit',
																						tooltip : 'Chỉnh sửa',
																						handler : function(
																								grid,
																								rowIndex,
																								colIndex) {

																						}
																					} ]
																				},
																				{
																					xtype : 'actioncolumn',
																					width : 50,
																					align : 'center',
																					text : 'Xóa',
																					items : [ {
																						iconCls : 'icon-delete',
																						tooltip : 'Xóa mục này',
																						handler : me.deleteRecord
																					} ]
																				} ]
																	} ]
														},
														{
															xtype : 'container',
															margin : '5 5 5 5',
															height : 454,
															width : 311,
															items : [
																	{
																		xtype : 'fieldset',
																		height : 126,
																		title : 'Thanh toán',
																		itemId : 'paymentContainerInfo',
																		items : [
																				{
																					xtype : 'textfield',
																					anchor : '100%',
																					fieldLabel : 'Tổng tiền',
																					itemId: 'TOTAL_MONEY',
																					name: 'TOTAL_MONEY',
																					labelWidth : 70
																				},
																				{
																					xtype : 'textfield',
																					anchor : '100%',
																					fieldLabel : 'Đã trả',
																					itemId: 'PAYED_MONEY',
																					name: 'PAYED_MONEY',
																					labelWidth : 70
																				},
																				{
																					xtype : 'checkboxfield',
																					anchor : '100%',
																					fieldLabel : 'Đã thanh toán',
																					name: 'HAS_PAYED',
																					itemId: 'HAS_PAYED',
																					labelWidth : 70,
																					boxLabel : '',
																					listeners: {
													                                	change: function (checkbox, newVal, oldVal) {
													                                		if(newVal){
													                                			value_ = Ext.ComponentQuery.query('#paymentContainerInfo #TOTAL_MONEY')[0].getValue();
													                                			Ext.ComponentQuery.query('#paymentContainerInfo #PAYED_MONEY')[0].setValue(value_);
													                                		}
													                                		else{
													                                			Ext.ComponentQuery.query('#paymentContainerInfo #PAYED_MONEY')[0].setValue(0);
													                                		}
													                                	}
													                                }
																				} ]
																	},
																	customContainer,
																	{
																		xtype : 'fieldset',
																		height : 105,
																		itemId : 'deliveryContainerInfo',
																		title : 'Giao hàng',
																		items : [
																				{
																					xtype : 'textareafield',
																					anchor : '100%',
																					height : 40,
																					name : 'DSCRT',
																					itemId: 'DSCRT',
																					labelWidth : 70,
																					fieldLabel : 'Ghi chú'
																				},
																				{
																					xtype : 'checkboxfield',
																					anchor : '100%',
																					name : 'IS_DELILVER',
																					itemId: 'IS_DELILVER',
																					labelWidth : 70,
																					fieldLabel : 'Đã xuất kho',
																					boxLabel : ''
																				} ]
																	},
																	{
																		xtype : 'container',
																		height : 40,
																		layout : {
																			type : 'hbox',
																			align : 'middle',
																			pack : 'center'
																		},
																		items : [
																				{
																					xtype : 'container',
																					flex : 1,
																					layout : {
																						type : 'hbox',
																						align : 'stretch',
																						pack : 'end'
																					},
																					items : [ {
																						xtype : 'button',
																						width : 76,
																						itemId : 'BtnCancelBill',
																						iconCls : 'icon-delete',
																						text : 'Hủy đơn'
																					} ]
																				},
																				{
																					xtype : 'container',
																					flex : 1,
																					width : 124,
																					layout : {
																						type : 'hbox',
																						align : 'stretch',
																						pack : 'center'
																					},
																					items : [ {
																						xtype : 'button',
																						iconCls : 'icon-save',
																						itemId : 'saveBtnBill',
																						width : 93,
																						text : 'Lưu'
																					} ]
																				},
																				{
																					xtype : 'container',
																					flex : 1,
																					layout : {
																						type : 'hbox',
																						align : 'stretch'
																					},
																					items : [ {
																						xtype : 'button',
																						width : 75,
																						text : 'Cancel'
																					} ]
																				} ]
																	} ]
														} ]
											}

											]
										});
						this.callParent(arguments);
					},
					listeners : {
						afterrender : function() {
							me = this;
							roomUsedId = me.config.ROOM_USED_ID;
							srvcRoomStore.getProxy().extraParams = {
								ROOM_USED_ID : roomUsedId
							};
							srvcRoomStore.load();
						}
					},
					initNew : function() {

					},
					createCustomer : function() {

					},
					deleteRecord: function(grid,rowIndex,colIndex) {
						// Remove
						store = grid.getStore();
						var rec = store.getAt(rowIndex);
						store.remove(rec);
						
						// Calculate
						var items = store.data.items;
						var totalMoney = 0;											
						for(var index = 0 ; index < items.length ; index++){
							totalMoney += (items[index].data.PRICE * items[index].data.AMOUNT);
						}
						Ext.ComponentQuery.query('#TOTAL_MONEY')[0].setValue(totalMoney);
					},
					submitRequest : function(_params) {
						var parent = this;

					},
					reloadListProduct : function(roomUsedId) {
						me = this;
						srvcRoomStore.getProxy().extraParams = {
							ROOM_USED_ID : roomUsedId
						};
						srvcRoomStore.load();
						srvcRoomStore.commitChanges();
					},
					isDupplicateRecord : function(menuId) {
						var isExist = false;
						srvcRoomStore.each(function(record) {
							if (menuId != null
									&& menuId == record.get('SRVC_ID')) {
								isExist = true;
								return isExist;
							}
						});
						return isExist;
					},
					addMoreProduct : function(obj, record) {
						me = this;
						var data = record[0].raw;
						var myController = MANAGER.app
								.getController('MNG.controller.saleStatisticController');
						if (myController.isDupplicateRecord(data.SRVC_ID,
								srvcRoomStore)) {
							supportEvent
									.showWarningTimer('Đơn hàng đã có mặt hàng này !');
							return 1;
						} else {
							srvcRoomStore.insert(srvcRoomStore.getCount(), {
								SRVC_ID : data.SRVC_ID,
								MENU_NM : data.SRVC_NM,
								UNIT_NM : data.UNIT_NM,
								UNIT : data.UNIT,
								PRICE : data.PRICE,
								AMOUNT : 0,
								TOTAL_MONEY : 0

							});
						}
						return false;
					},
					renderValue : function() {
						me = this;
						Ext.ComponentQuery
								.query('#paymentContainerInfo #TOTAL_MONEY')[0]
								.setValue(me.config.totalMoney);
						Ext.ComponentQuery
								.query('#paymentContainerInfo #PAYED_MONEY')[0]
								.setValue(me.config.payedMoney);
						Ext.ComponentQuery.query('#customerContainerId #comboCustomerId')[0]
								.setValue(me.config.cusCd);
						Ext.ComponentQuery.query('#customerContainerId #comboCustomerId')[0]
								.setRawValue(me.config.name);
						Ext.ComponentQuery
								.query('#deliveryContainerInfo #IS_DELILVER')[0]
								.setValue(parseInt(me.config.isdeliver));
						Ext.ComponentQuery
								.query('#paymentContainerInfo #HAS_PAYED')[0]
								.setValue(me.config.hasPayed);

					}
				});
