
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
						items : [
							{
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
                                         //dataIndex: 'DATE_IMPORT',
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
                                         hidden: true,
                                         align:'right',
                                         width: 100,
                                         dataIndex: 'NEEDTOPAYED',
                                         text: 'Cần trả',
                                         renderer : function(value, p, r) {
											data = r.data['NEEDTOPAYED'];
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
                                         width: 120,
                                         dataIndex: 'PAYED_MONEY',
                                         text: 'Đã thanh toán'
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
	                                	 	//itemId: 'btnStatisPrint'
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	iconCls: 'icon-excel'
	                                	 	//itemId: 'btnExcelPrint'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: importStore,
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
    }
});