Ext
		.define(
				'MNG.view.admRoomView',
				{
					extend : 'Ext.panel.Panel',
					cls : '',
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

												xtype : 'container',
												itemId: 'mainContainerID',
												layout : {
													align : 'stretch',
													type : 'vbox'
												},
												items : [ {
													xtype : 'panel',
													width : 400,
													// cls : 'jdvn-sub-body',
													layout : {
														align : 'stretch',
														type : 'vbox'
													},
													defaults : {
														cls : 'row'
													},
													items : [ {
														xtype : 'gridpanel',
														id : 'grid-room',
														// flex: 1,
														minHeight : 300,
														maxHeight : 800,
														pageSize : 10,
														padding : '10 0 0 0',
														autoScroll : true,
														listeners : {
															/*itemdblclick : function(
																	dv, record,
																	item,
																	index, e) {
															}*/
														},
														store : Ext
																.create(
																		'MNG.store.roomStore',
																		{}),
														columns : [
																{
																	xtype : 'rownumberer',
																	sortable : false,
																	width: 30,
																	align : 'center',
																	text : 'TT'
																},
																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	sortable : false,
																	align : 'center',
																	hidden: true,
																	dataIndex : 'ROOM_ID',
																	text : "ROOM_ID"
																},
																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	sortable : false,
																	align : 'left',
																	dataIndex : 'ROOM_NO',
																	text : 'Tên phòng'
																},
																{
							                                        xtype: 'gridcolumn',
							                                        dataIndex: 'IS_USED',
							                                        sortable:false,
							                                        text: 'Trạng thái',
							                                        flex : 1,
							                                        renderer : function(value, p, r) {
																		data = r.data['IS_USED'];
																		if (data == 1 || data == '1'){
																			return 'Đang sử dụng';
																		}
																		return 'Ngừng sử dụng';
							                                    	 }
																},
																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	align : 'center',
																	hidden: true,
																	sortable : false,
																	dataIndex : 'ROOM_FLOR',
																	text : 'Khu vực'
																},
																{
																	xtype : 'gridcolumn',
																	dataIndex : 'ROOM_TYPE',
																	sortable : false,
																	hidden: true,
																	text : 'Loại phòng',
																	flex : 1

																},
																{
																	menuDisabled : true,
																	sortable : false,
																	xtype : 'actioncolumn',
																	hidden: true,
																	text: 'Trạng thái sử dụng',
																	align : 'center',
																	flex : 1,
																	items : [ {
																		iconCls : 'icon-true',
																		getTip: function (a, b, record) {
																			var closed = record.get('IS_USED');
																			if(closed == '1'){
																				return 'Đang sử dụng';
																			}
																			else{
																				return 'Không';
																			} 
																		},
																		getClass : function(value, metadata, record) {
																			var closed = record.get('IS_USED');
																			if(closed == '1'){
																				return 'icon-true';
																			}
																			else{
																				return 'x-hide-display';
																			} 
																		}
																	} ]
																},
																{
																	xtype : 'gridcolumn',
																	dataIndex : 'RESTAR_ID',
																	sortable : false,
																	hidden: true,
																	text : 'RESTAR_ID',
																	flex : 0.5
																} ],
														tbar : [ {
															text : 'Thêm mới',
															iconCls : 'icon-addnew',
															itemId: 'btnRoomForm',
														},{
															text : 'Xoa',
															iconCls : 'icon-search',
															hidden: true,
															itemId: 'btnDelRoomForm',
														} ],
														dockedItems : [ {
															xtype : 'pagingtoolbar',
															dock : 'bottom',
															// store:
															// 'ParcelSearchStore',
															displayInfo : true
														} ]
													} ]
												} ]
											} ]
										});
						me.callParent(arguments);
					}
				});