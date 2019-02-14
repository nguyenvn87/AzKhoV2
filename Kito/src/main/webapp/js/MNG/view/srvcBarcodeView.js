var srvcStoreTmp = Ext.create('MNG.store.srvcStore',{})

Ext.define('MNG.view.srvcBarcodeView', {
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
                                         align:'center',
                                         sortable:false,
                                         dataIndex: 'UNIT_NM',
                                         width : 80,
                                         text: 'Đơn vị'
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
                                         text: 'Nhóm',
                                         flex: 1
                                     },
									{
	                                   	 text: 'In hàng loạt',
	                                   	 columns: [{
	 										menuDisabled : true,
	 										sortable : false,
	 										text : 'Pdf',
	 										xtype : 'actioncolumn',
	 										align : 'center',
	 										width : 60,
	 										items : [ {
	 											iconCls : 'icon-pdf',
	 											tooltip : 'In mã vạch',
	 											handler : function(grid, rowIndex, colIndex){
	 												var myController = MANAGER.app.getController('MNG.controller.srvcBarcodeController');
	 												myController.btnPrintBarcode(grid, rowIndex, colIndex, 'pdf', 'true');
	 											}
	 										} ]
	 									},
	                                     {
											menuDisabled : true,
											sortable : false,
											text : 'Docx',
											xtype : 'actioncolumn',
											align : 'center',
											width : 65,
											items : [ {
												iconCls : 'icon-word',
												tooltip : 'Tải file word',
												handler : function(grid, rowIndex, colIndex){
													var myController = MANAGER.app.getController('MNG.controller.srvcBarcodeController');
													myController.btnPrintBarcode(grid, rowIndex, colIndex, 'docx', 'true');
												}
											} ]
										}] 
                                    },
                                    {
	                                   	 text: 'In lẻ',
	                                   	 columns: [{
	 										menuDisabled : true,
	 										sortable : false,
	 										text : 'Pdf',
	 										xtype : 'actioncolumn',
	 										align : 'center',
	 										width : 50,
	 										items : [ {
	 											iconCls : 'icon-pdf',
	 											tooltip : 'In mã vạch',
	 											handler : function(grid, rowIndex, colIndex){
	 												var myController = MANAGER.app.getController('MNG.controller.srvcBarcodeController');
	 												myController.btnPrintBarcode(grid, rowIndex, colIndex, 'pdf','');
	 											}
	 										} ]
	 									},
	                                     {
											menuDisabled : true,
											sortable : false,
											text : 'Docx',
											xtype : 'actioncolumn',
											align : 'center',
											width : 65,
											items : [ {
												iconCls : 'icon-word',
												tooltip : 'Tải file word',
												handler : function(grid, rowIndex, colIndex){
													var myController = MANAGER.app.getController('MNG.controller.srvcBarcodeController');
													myController.btnPrintBarcode(grid, rowIndex, colIndex, 'docx','');
												}
											} ]
										}] 
                                   }
                                 ],
                                 tbar: [
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
    keyupFilter: function(key){
		value = key.getValue();
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.clearFilter();
		storeTmp.filter('SRVC_NM', value);
	}
});