/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnSelectMenu', {
	extend : 'Ext.window.Window',
	Height : 700,
	width : 500,
	y: 10,
	title : 'Chọn dịch vụ',
	maxHeight : 800,
	closeAction : 'hide',
	resizable : true,
	isUseShare : true,
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me,
				{
					items : [ {
						xtype : 'container',
						cls : 'jdvn-main-pop',
						// id : 'btnSrvcContainerId',
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
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								defaults : {
									flex : 1
								},
								items : [
										{
											xtype : 'textfield',
											itemId : 'SRVC_NM',
											name : 'SRVC_NM',
											height: 35,
											emptyText : 'Tìm kiếm',
											enableKeyEvents: true,
											listeners:{
												'keyup': me.keyupFilter
											}
										},
										{
											xtype : 'gridpanel',
											itemId : 'grid-menu-id',
											minHeight : 300,
											maxHeight : 400,
											pageSize : 10,
											padding : '10 0 0 0',
											autoScroll : true,
											store : Ext.create(
													'MNG.store.menuStore', {}),
											columns : [ {
												xtype : 'rownumberer',
												width : '15px',
												sortable : false,
												align : 'center',
												text : 'TT'
											}, {
												xtype : 'gridcolumn',
												sortable : true,
												align : 'left',
												dataIndex : 'SRVC_NM',
												flex: 1,
												text : 'Tên'
											}, {
												xtype : 'gridcolumn',
												dataIndex : 'PRICE',
												align : 'right',
												hidden: true,
												width : 100,
												sortable : true,
											},{
												xtype : 'gridcolumn',
												dataIndex : 'PRICE',
												align : 'right',
												width : 100,
												sortable : true,
												text : 'Giá (vnđ)',
													renderer :function(value, p , r){
						              					data = r.data['PRICE'];
						              					if(data != '')
						              						//data = formatSupporter.formatNumber2Decimals(data);
						              					data = formatSupporter.formatToMoney(data);
						              					return  data;
						              				}
											},{
												xtype : 'gridcolumn',
												align : 'center',
												sortable : false,
												width : '40px',
												dataIndex : 'UNIT_NM',
												text : 'Đơn vị'
											} ,{
												xtype : 'gridcolumn',
												align : 'center',
												hidden: true,
												width : 100,
												dataIndex : 'SRVC_ID',
												text : 'SRVC_ID'
											},{
												xtype : 'actioncolumn',
												align : 'center',
												width : 100,
												//dataIndex : 'SRVC_ID',
												text : 'Chọn',
												items : [ {
													iconCls : 'icon-edit',
													//itemId: 'editIconItem',
													tooltip : 'Chọn',
													handler : function(grid, rowIndex, colIndex) {
														var store = grid.getStore();
														var rec = store.getAt(rowIndex);
														grid.getSelectionModel().select(rowIndex);
													}
												} ]
											}]
										},{
											xtype : 'numberfield',
											fieldLabel: 'Số lượng',
											height: 35,
											itemId : 'menu_amount_id',
											emptyText : 'Số lượng',
											minValue: 0,
											value: 1,
				                            maxValue: 100000,
											regex: /^-?\d*\.?\d*$/
										}, ]
							} ]
						} ]
					} ],
					listeners : {
						afterrender : {
							fn : function() {
								var Grid = Ext.ComponentQuery
										.query('#grid-menu-id')[0];
								var storeTmp = Grid.getStore();
								storeTmp.getProxy().extraParams={
									IS_USED: 1
								};
								storeTmp.load();
							}
						}
					},
					buttons : [ {
									xtype : 'button',
									cls : 'button',
									action : 'saveSrvc',
									text : 'Chọn',
									itemId : 'btnSaveSrvc'
								},{
									xtype : 'button',
									cls : 'button',
									action : 'cancelSrvc',
									text : 'Hủy',
									itemId : 'btnCancelSrvc',
									listeners: {
										click: function(){
											me.hide();
										}
									}
								} ]
				});
		this.callParent(arguments);
	},
	keyupFilter: function(key){
		value = key.getValue();
		var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
		var storeTmp = Grid.getStore();
		storeTmp.clearFilter();
		storeTmp.filter('SRVC_NM', value);
	}
});
