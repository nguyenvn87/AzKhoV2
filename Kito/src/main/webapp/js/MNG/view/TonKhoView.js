var btnHistoryStore = Ext.create('MNG.view.popup.BtnStoreHistory',{});
var srvcStoreTmp = Ext.create('MNG.store.srvcStore',{})
Ext.define('MNG.view.TonKhoView', {
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
                                 minHeight: 500,
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
                                         width: 250,
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'AMOUNT_STORE',
                                         align:'right',
                                         sortable:true,
                                         text: 'SL tồn',
                                         width: 80,
                                         renderer :function(value, p , r){
                           					return '<span style="color: red">'+value+'</span>';
                           				}
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
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'UNIT_NM',
                                         width : 80,
                                         text: 'Đơn vị'
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
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         //hidden: true,
                                         sortable:false,
                                         text: 'Ghi chú',
                                         flex: 1
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE_IMPORT',
                                         sortable:false,
                                         text: 'Giá nhập',
                                         align : 'right',
                                         width : 120,
                                         renderer :function(value, p , r){
                           					var data = r.data['PRICE_IMPORT'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
                                     },
                                     {
										menuDisabled : true,
										sortable : false,
										text : 'Xem lịch sử',
										xtype : 'actioncolumn',
										align : 'center',
										width : 100,
										items : [ {
											iconCls : 'icon-timer',
											tooltip : 'Xem lịch sử tồn kho',
											handler : function(grid,rowIndex,colIndex) {
												rec = grid.getStore().getAt(rowIndex);
												var _srvcId = rec.get('SRVC_ID');
												me.showHistory(_srvcId, rec.get('SRVC_NM'));
										}
										} ]
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'CHANGE_DATE',
                                         sortable:false,
                                         text: 'Ngày cập nhật',
                                         width: 160
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'Người lưu',
                                         width: 100
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
 	 		                           },{
										xtype : 'datefield',
										itemId: 'itemSelectDate',
										format : 'd-m-Y',
										altFormats: 'Ymd',
										submitFormat: 'Y/m/d',
										fieldLabel : 'Chọn ngày',
										value: new Date(),
										emptyText : 'Ngày',
										listeners:{
											change: function (btn, newValue, oldValue, eOpts) {
								                var tmpValue = Ext.Date.format(newValue, 'Y-m-d')
								                console.log(tmpValue);
								                var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
												var storeTmp = Grid.getStore();
												storeTmp.currentPage = 1;
												storeTmp.pageSize=1000;
												storeTmp.getProxy().url = 	contextPath + '/store/getStoreHistory.json';
												storeTmp.getProxy().extraParams = {
																datetime: tmpValue
															};
												storeTmp.load();
								            }
										}
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
	},
	showHistory: function(_srvcId, title){
		btnHistoryStore.loadAndShow(_srvcId, title);
		btnHistoryStore.show();
	}
});