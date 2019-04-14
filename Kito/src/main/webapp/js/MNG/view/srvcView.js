var srvcStoreTmp = Ext.create('MNG.store.srvcStore',{})

Ext.define('MNG.view.srvcView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    isHideAddNew: false,
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
					itemId: 'mainContainerID',
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
						items : [
							{
								 xtype: 'gridpanel',
                                 id:'grid-srvc',
                                 //flex: 1,
                                 minHeight: 600,
                                 maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: srvcStoreTmp,
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
                                         sortable:false,
                                         align:'left',
                                         hidden: true,
                                         dataIndex: 'SRVC_ID',
                                         text: "SRVC_ID"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_CD',
                                         width: 90,
                                         text: 'Mã hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'SRVC_NM',
                                         width: 180,
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'RESTAR_ID',
                                         sortable:false,
                                         hidden: true,
                                         text: 'RESTAR_ID',
                                         flex: 0.5
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE',
                                         sortable:true,
                                         hidden: true,
                                         text: 'Giá bán',
                                         flex: 0.5
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 100,
             							sortable : false,
             							align : 'right',
             							text : "Giá bán(đ)",
             							renderer :function(value, p , r){
                           					data = r.data['PRICE'];
                           					console.log('data = '+data);
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return '<span style="color: green">'+data+'</span>';
                           				}
             						},
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'UNIT_NM',
                                         width : 80,
                                         text: 'Đơn vị'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'AMOUNT_STORE',
                                         align : 'right',
                                         sortable:false,
                                         text: 'Tồn',
                                         width: 65,
                                         renderer :function(value, p , r){
                           					var data = r.data['AMOUNT_STORE'];
                           					return '<span style="color: red">'+data+'</span>';
                           				}
                                          
                                     },
                                      {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE_IMPORT',
                                         sortable:false,
                                         text: 'Giá nhập',
                                         align : 'right',
                                         width : 100,
                                         renderer :function(value, p , r){
                           					var data = r.data['PRICE_IMPORT'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return '<span style="color: orange">'+data+'</span>';
                           				}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'IS_USED',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Sử dụng',
                                         flex: 0.5
                                     },
                                     {
	                                   	 text: 'Mã vạch',
	                                   	 columns: [{
	 										menuDisabled : true,
	 										sortable : false,
	 										xtype : 'actioncolumn',
	 										align : 'center',
	 										width : 40,
	 										items : [ {
	 											iconCls : 'icon-pdf',
	 											tooltip : 'In mã vạch',
	 											handler : function(grid, rowIndex, colIndex){
	 												var myController = MANAGER.app.getController('MNG.controller.srvcController');
	 												myController.btnPrintBarcode(grid, rowIndex, colIndex, 'pdf', '');
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
												iconCls : 'icon-word',
												tooltip : 'Tải file word',
												handler : function(grid, rowIndex, colIndex){
													var myController = MANAGER.app.getController('MNG.controller.srvcController');
													myController.btnPrintBarcode(grid, rowIndex, colIndex, 'docx', '');
												}
											} ]
										}] 
                                    },
                                     {
										menuDisabled : true,
										sortable : false,
										hidden: true,
										xtype : 'actioncolumn',
										text: 'Mặc định',
										align : 'center',
										width : 80,
										items : [ {
											iconCls : 'icon-true',
											getTip: function (a, b, record) {
												var closed = record.get('IS_DEFAULT');
												if(closed == '1'){
													return 'Đã đặt mặc định';
												}
												else{
													return 'Không sử dụng';
												} 
											},
											getClass : function(value, metadata, record) {
												var closed = record.get('IS_DEFAULT');
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
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         sortable:false,
                                         text: 'Mô tả',
                                         flex: 1
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TYPE_NM',
                                         sortable:false,
                                         text: 'Nhóm hàng',
                                         width : 150,
                                     },
                                     {
										menuDisabled : true,
										sortable : false,
										text : 'Sửa',
										xtype : 'actioncolumn',
										align : 'center',
										width : 60,
										items : [ {
											iconCls : 'icon-edit',
											tooltip : 'Chỉnh sửa dòng này',
											handler : function(grid, rowIndex, colIndex){
												var record = grid.getStore().getAt(rowIndex);
												grid.getSelectionModel().select(rowIndex);
												var myController = MANAGER.app.getController('MNG.controller.srvcController');
												myController.editRowByRecord(record);
											}
										} ]
									},
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'ACCUMULT',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Tích lũy(đ)',
                                         align : 'right',
                                         width : 100,
                                         renderer :function(value, p , r){
                           					data = r.data['ACCUMULT'];
                           					console.log('ACCUMULT = '+data);
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'SORT_NO',
                                         hidden: true,
                                         sortable:false,
                                         text: 'Ưu tiên',
                                         align : 'center',
                                         width : 70
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'IS_USED',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Trạng thái',
                                         width : 120,
                                         renderer : function(value, p, r) {
											data = r.data['IS_USED'];
											if (data == 1){
												return DAT_T_001;
											}
											return DAT_T_002;
                                    	 }
                                     },
                                     {
										menuDisabled : true,
										sortable : false,
										text : 'Xóa',
										xtype : 'actioncolumn',
										align : 'center',
										width : 60,
										items : [ {
											iconCls : 'icon-del',
											tooltip : 'Xóa dòng này',
											handler : function(grid, rowIndex, colIndex){
												var myController = MANAGER.app.getController('MNG.controller.srvcController');
												myController.deleteRecord(grid, rowIndex, colIndex);
											}
										} ]
									}
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới SP',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'addSrvcBtn',
                                	 	hidden: me.isHideAddNew
 		                                },
 		                               {
 	                                	text: 'Xóa',
 	                                	iconCls: 'icon-search',
 	                                	hidden: true,
 	                                	itemId: 'delSrvcBtn'
 	 		                           },
 	 		                           {
 	 		                        	xtype : 'textfield',
										emptyText : 'Tìm kiếm',
										height: 40,
										width: 300,
										itemId: 'textSearchSrvc',
										enableKeyEvents: true,
										listeners:{
												'keyup': me.keyupFilter
											}
 	 		                           },
 	 		                           {
 	                                	text: 'Tìm',
 	                                	height: 40,
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'btnSearchSrvcBtn'
 	 		                           }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	itemId: 'btnPdfPrint'
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	iconCls: 'icon-excel',
	                                	 	itemId: 'btnExcelPrint'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: srvcStoreTmp,
                                         displayInfo: true
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
    keyupFilter: function(key, event){
		value = key.getValue();
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.clearFilter();
		storeTmp.filter('SRVC_NM', value);
		
		if(event.getCharCode() == 13){
			var myController = MANAGER.app.getController('MNG.controller.srvcController');
			myController.clickSrvcSearch();	
		}
	}
});