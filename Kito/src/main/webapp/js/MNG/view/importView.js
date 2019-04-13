
var importStore = Ext.create('MNG.store.importStore',{});
Ext.define('MNG.view.importView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

					xtype : 'container',
					itemId:'container-store-srvc',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
						xtype : 'container',
						cls : 'jdvn-sub-body',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
							cls : 'row'
						},
						items : [{
							
																			xtype : 'fieldset',
																			title : 'Thời gian',
																			hidden: true,
																			padding : '0 10 0 10',
																			collapsible : false,
																			flex : 1,
																			minWidth : 450,
																			layout : {
																							type : 'hbox',
																							flex : 1
																						},
																			height : 100,
																			items : [
																					{
																						xtype : 'radiogroup',
																						itemId : 'radiotime',
																						name : 'radiotime',
																						width : 120,
																						layout : {
																							type : 'vbox',
																						},
																						items : [
																								{
																									inputValue : 'Month',
																									checked : true,
																									name : 'time',
																									boxLabel : 'Tháng này'
																								},
																								{
																									inputValue : 'Other',
																									checked : false,
																									name : 'time',
																									boxLabel : 'Khác'
																								}
																								]
																					},{
																						xtype : 'container',
																						itemId: 'containerTimeId',
																						hidden: true,
																						layout : {
																							align : 'stretch',
																							type : 'vbox'
																						},
																						items:[
																						       {
																									xtype : 'datefield',
																									itemId:'CHANGETIME1',
																									name:'CHANGETIME',
																									format : 'd-m-Y',
																									altFormats: 'Ymd',
																									labelWidth: 60,
																									fieldLabel : 'Từ ngày',
																									value: new Date(),
																									submitFormat: 'Y/m/d',
																									emptyText : 'Từ ngày'
																								},
																								{
																									xtype : 'datefield',
																									itemId:'CHANGETIME2',
																									name:'CHANGETIME',
																									format : 'd-m-Y',
																									altFormats: 'Ymd',
																									labelWidth: 60,
																									fieldLabel : 'Đến ngày',
																									value: new Date(),
																									submitFormat: 'Y/m/d',
																									emptyText : 'Đến ngày'
																								}
																						       ]
																					}
																					]
																		}
						
							,{
								 xtype: 'gridpanel',
                                 itemId:'grid-store-srvc',
                                 //flex: 1,
                                 minHeight: 550,
                                 maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: importStore, 
                                 columns: [
                                     {
                                         xtype: 'rownumberer',
                                         width: 30,
                                         sortable:false,
                                         align:'center',
                                         text: 'TT'
                                     },
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 60,
                                         dataIndex: 'IMPRT_CD',
                                         hidden: true,
                                         text: 'ID'
                                     },
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 100,
                                         text: 'Ngày nhập',
                                         renderer :function(value, p , r){
                            					data = r.data['DATE_IMPORT'];
                            					console.log(data);
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					console.log(data);
                            					return  data;
                            				}
                                     },
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 100,
                                         dataIndex: 'IMPRT_BILL',
                                         text: 'Mã hóa đơn'
                                     },
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         hidden: true,
                                         align:'right',
                                         width: 120,
                                         dataIndex: 'TOTAL_MONEY',
                                         text: 'Tổng tiền'
                                     },
                                    {
                                    	 xtype : 'gridcolumn',
                                    	 width : 120,
                                    	 sortable : false,
                                    	 align : 'right',
                                    	 text : "Tổng tiền",
                                    	 renderer : function(value, p, r) {
											data = r.data['TOTAL_MONEY'];
											console.log('data = '+data);
											if (data != ''){
												data = formatSupporter.formatToMoney(data);
											}
											return data;
                                    	 }
									},
									{                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         hidden: true,
                                         align:'right',
                                         width: 80,
                                         dataIndex: 'DISCOUNT_MONEY',
                                         text: 'Giảm giá'
                                     },
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         flex: 1,
                                         dataIndex: 'PROV_NM',
                                         text: 'Đơn vị cung cấp'
                                     },
                                     {
											menuDisabled : true,
											sortable : false,
											text : 'Chỉnh sửa',
											xtype : 'actioncolumn',
											align : 'center',
											width : 100,
											items : [ {
												iconCls : 'icon-edit',
												tooltip : 'Sửa dòng này',
												handler : function(grid,rowIndex,colIndex) {
													var record = grid.getStore().getAt(rowIndex);
													grid.getSelectionModel().select(rowIndex);
													me.showDetail(grid,rowIndex,colIndex);
												}
											} ]
									},
                                     {                                     
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         flex: 1,
                                         dataIndex: 'DESCRIPTION',
                                         text: 'Ghi chú'
                                     },
                                     {
										menuDisabled : true,
										sortable : false,
										text : '',
										xtype : 'actioncolumn',
										align : 'center',
										width : 50,
										items : [ 
											   { 
												iconCls : 'icon-excel',
												tooltip : 'Xuất excel',
												handler : me.exportExcelFile
											   } 
											]
									},
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'Người lưu',
                                         width: 100
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Nhập mới',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'addMenuBtn'
 		                                },
 		                               {
 	                                	text: 'Xóa',
 	                                	hidden: true,
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'delMenuBtn'
 	 		                           }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf'
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	iconCls: 'icon-excel'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: importStore,
                                         displayInfo: true
                                     }
                                 ],
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
																			fieldLabel : 'Tổng',
																			text : 'Tổng: ',
																			cls : 'sumary-label'
																		},
																		{
																			xtype : 'label',
																			fieldLabel : 'Tổng',
																			itemId : 'statis-total-id',
																			text : '0.0',
																			cls : 'sumary-field'
																		}
																		]
															}
						]
					}]
                }
            ]
        });
        me.callParent(arguments);
    },
    exportExcelFile: function(grid,rowIndex,colIndex){
    	grid.getSelectionModel().select(rowIndex);
		var myController = MANAGER.app
								.getController('MNG.controller.importController');
		myController.getExcelFillBill(grid.getStore().getAt(rowIndex));
    },
    showDetail: function(grid, rowIndex, colIndex){
    	store = grid.getStore();
		rec = store.getAt(rowIndex);
    	var myController = MANAGER.app.getController('MNG.controller.importController');
    	myController.showBtnImport(rec.raw);
    }
});