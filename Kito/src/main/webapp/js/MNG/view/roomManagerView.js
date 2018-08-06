Ext.define('MNG.view.roomManagerView', {
	extend : 'Ext.panel.Panel',
	cls : '',
	flex : 1,
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {

				xtype : 'container',
				flex : 1,
				layout : {
					align : 'stretch',
					type : 'hbox'
				},
				items : [
				// Left side
				{
					xtype : 'panel',
					autoScroll: true,
					maxHeight : 800,
					itemId : 'form-list-room',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					flex : 0.5
				},
				// Right side
				{
					xtype : 'container',
					cls : 'jdvn-sub-body',
					itemId : 'idContainerRoomSrvc',
					flex : 2,
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					defaults : {
						cls : 'row'
					},
					items : [ {
						xtype : 'container',
						layout : {
							align : 'stretch',
							type : 'hbox'
						},
						items : [ {
							xtype : 'label',
							fieldLabel : 'Tổng',
							itemId : 'btnRoomUseId',
							text : '',
							cls : 'sumary-field'
						}, {
							xtype : 'label',
							text : 'Vào lúc: ',
							cls : 'sumary-label'
						}, {
							xtype : 'label',
							itemId : 'btnRoomOnTimeId',
							text : '0.0',
							cls : 'sumary-field'
						}, {
							xtype : 'label',
							text : 'Thanh toán: ',
							cls : 'sumary-label'
						}, {
							xtype : 'label',
							itemId : 'btnRoomPaymentStatusId',
							text : '0',
							cls : 'sumary-field'
						} ]
					}, {
						xtype : 'gridpanel',
						itemId : 'grid-room-turn',
						flex : 1,
						minHeight : 500,
						maxHeight : 800,
						pageSize : 10,
						padding : '10 0 0 0',
						autoScroll : true,
						store : Ext.create('MNG.store.roomSrvcStore', {}),
						viewConfig : {
							getRowClass : function(record, index, rowParams) {
								// tmpId = record.data['ID'];
								// if(tmpId != null && tmpId != '')
								// return 'rowClass1';
							}
						},
						features : [ {
							ftype : 'summary'
						} ],
						columns : [ {
							xtype : 'rownumberer',
							width : 25,
							sortable : false,
							align : 'center',
							text : 'TT'
						}, {
							xtype : 'gridcolumn',
							flex : 1,
							hidden : true,
							sortable : false,
							align : 'left',
							dataIndex : 'MENU_ID',
							text : "Tên"
						}, {
							xtype : 'gridcolumn',
							width : 120,
							sortable : true,
							align : 'left',
							dataIndex : 'MENU_NM',
							text : "Tên"
						}, {
							xtype : 'gridcolumn',
							width : 100,
							hidden : true,
							sortable : false,
							align : 'right',
							dataIndex : 'PRICE',
							text : "Giá",
						}, {
							xtype : 'gridcolumn',
							width : 90,
							sortable : false,
							align : 'right',
							dataIndex : 'PRICE',
							text : "Giá (đ)",
							renderer : function(value, p, r) {
								data = r.data['PRICE'];

								if (data != '')
									data = formatSupporter.formatToMoney(data);
								return data;
							}
						}, {
							xtype : 'gridcolumn',
							width : 40,
							sortable : false,
							align : 'right',
							dataIndex : 'AMOUNT',
							text : 'SL'
						}, {
							xtype : 'gridcolumn',
							width : 70,
							sortable : false,
							//hidden: true,
							align : 'left',
							dataIndex : 'UNIT_NM',
							text : "Đơn vị",
							summaryRenderer : function(value) {
								return 'Tổng:';
							}
						},{
							menuDisabled : true,
							sortable : false,
							xtype : 'actioncolumn',
							align : 'center',
							text : 'Sửa',
							width : 40,
							items : [ {
								iconCls : 'icon-edit',
								tooltip : 'Chỉnh sửa',
								handler : function(grid, rowIndex, colIndex) {
									store = grid.getStore();
									var rec = store.getAt(rowIndex);
									grid.getSelectionModel().select(rowIndex);
									var menuId = rec.get('SRVC_ID');
									if(popChService==null){
										popChService = Ext.create('MNG.view.popup.BtnChangeService',{});
									}
									popChService.serviceId = menuId;
									popChService.show();
									gridSupport.selectGridPopup('#idContainerRoomSrvc','#grid-room-turn','#chgSrvcContainer');
								}
							} ]
						}, {
							xtype : 'gridcolumn',
							width : 115,
							align : 'right',
							sortable : true,
							dataIndex : 'TOTAL_MONEY',
							text : 'Thành tiền',
							summaryType : 'sum',
							renderer : function(value, p, r, rowIndex) {
								// grid.addRowCls(rowIndex, 'rowClass1');
								var data = r.data['TOTAL_MONEY'];
								if (data != '')
									data = formatSupporter.formatToMoney(data);
								return data;
							}
						}, {
							xtype : 'gridcolumn',
							flex : 1,
							hidden : true,
							dataIndex : 'SRVC_ID',
							align : 'center',
							text : 'SRVC_ID'
						}, 
						{
							menuDisabled : true,
							sortable : false,
							text : 'Xóa',
							xtype : 'actioncolumn',
							align : 'center',
							flex : 1,
							items : [ {
								iconCls : 'icon-delete',
								tooltip : 'Xóa mục này',
								handler : function(grid, rowIndex, colIndex){
									me.deleteRecord(grid, rowIndex, colIndex);
								}
							} ]
						}, 
						{
							menuDisabled : true,
							sortable : false,
							xtype : 'actioncolumn',
							align : 'center',
							width : 40,
							items : [ {
								iconCls : 'icon-true',
								tooltip : 'Đã lưu',
								getClass : function(value, metadata, record) {
									var closed = record.get('ID');
									if (closed == null || closed == '') {
										return 'x-hide-display';
									} else
										return 'icon-true';
								}
							} ]
						}],
						bbar : [ {
							text : 'Lưu',
							height : 60,
							hidden: true,
							iconCls : 'icon-save',
							id : 'btnEndRunningRoom',
							itemId : 'btnEndRunningRoom'
						}, {
							text : 'Tính giờ',
							height : 60,
							iconCls : 'icon-payment',
							// cls : 'arrow-box',
							itemId : 'btnCalculate'
						}, {
							text : 'Hidden',
							iconCls : 'icon-search',
							hidden : true,
							cls : 'btn-app',
							itemId : 'btnHidenRunningRoom'
						}, {
							text : 'In hóa đơn',
							height : 60,
							iconCls : 'icon-print',
							itemId : 'btnPayment'
						}, {
							text : 'Phiếu xuất kho',
							height : 60,
							iconCls : 'icon-pdf',
							itemId : 'btnPrintDailyRoom'
						} ],
						tbar : [ {
							text : 'Bắt đầu',
							iconCls : 'icon-stsoff',
							height : 50,
							cls : 'arrow-box',
							itemId : 'btnStartRunningRoom'
						}, {
							text : 'Gọi đồ',
							height : 50,
							iconCls : 'icon-menu',
							cls : 'arrow-box',
							itemId : 'btnCallService'
						}, {
							text : 'Đổi phòng',
							iconCls : 'icon-change',
							height : 50,
							cls : 'arrow-box',
							itemId : 'btnChangeRoom'
						}, {
							text : 'Thanh toán',
							iconCls : 'icon-payment',
							itemId : 'btnPaymentDebit',
							height : 50,
							cls : 'arrow-box'
						}, {
							text : 'Kết thúc',
							iconCls : 'icon-payment',
							hidden: true,
							height : 50,
							cls : 'arrow-box',
							itemId : 'btnCloseSection'
						} ],
						dockedItems : [ {
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							displayInfo : true
						} ]
					}
					]
				} ]
			} ]
		});
		me.callParent(arguments);
	},
	deleteRecord:function(grid, rowIndex, colIndex){
		
		var myController = MANAGER.app.getController('MNG.controller.roomManagerController');
		store = grid.getStore();
		var rec = store.getAt(rowIndex);
		var roomUseId = rec.get('ROOM_USE_ID');
		rec.set('STATUS', 'delete');

		var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
		tmpStoreResource.add(rec);
		reqResoucesData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				myController.btnSavingRequest(reqResoucesData);
			}
		});
	}
});