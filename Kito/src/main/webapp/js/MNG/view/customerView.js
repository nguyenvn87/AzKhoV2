var customerStore = Ext.create('MNG.store.customerStore');

Ext.define('MNG.view.customerView', {
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
                                 itemId:'grid-customer-item',
                                 minHeight: 500,
                                 maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: customerStore,
                                 columns: [
                                     {
									xtype : 'rownumberer',
									width : 30,
									align : 'center',
									text : 'TT',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									width : 150,
									dataIndex : 'NAME',
									text : 'Họ tên',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									width : 100,
									editable: true,
									dataIndex : 'PHONE',
									text : 'Điện thoại',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'right',
									width : 170,
									editable: true,
									dataIndex : 'EMAIL',
									text : 'Email',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									flex: 1,
									editable: true,
									dataIndex : 'ADDR',
									text : 'Địa chỉ',
									sortable : true
								},{
									xtype : 'gridcolumn',
									align : 'right',
									width : 120,
									editable: true,
									dataIndex : 'ACCUMULT',
									text : 'Tiền tích lũy',
									sortable : true
								},
								{
					                menuDisabled: true,
					                sortable: false,
					                align:'center',
					                xtype: 'actioncolumn',
					                text: 'Cập nhật',
					                width: 70,
					                items: [{
					                    iconCls : 'icon-edit',
					                    tooltip: 'Sửa dòng này',
					                    handler: function(grid, rowIndex, colIndex) {
					                    	store = grid.getStore();
					                    	var rec = store.getAt(rowIndex);
					                    	var params = {
					                    			cusID: rec.get('CUS_CD'),
					                    			cusName: rec.get('NAME'),
					                    			cusPhone: rec.get('PHONE'),
					                    			cusEmail: rec.get('EMAIL'),
					                    			accumult: rec.get('ACCUMULT'),
					                    			cusAddr: rec.get('ADDR')
					                    	}
					                    	var myController = MANAGER.app.getController('MNG.controller.customerController');
					                    	myController.showAddCustomer(params);
					                    }
					                }]
					            },{
									xtype : 'gridcolumn',
									align : 'left',
									width : 120,
									editable: true,
									dataIndex : 'CHANGE_USER',
									text : 'Người lưu',
									sortable : true
								}
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm khách mới',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'btnAddCustomer',
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
										itemId: 'textSearchSrvc',
										enableKeyEvents: true,
										listeners:{
												'keyup': function(key, event){
													value = key.getValue();
													var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
													var storeTmp = Grid.getStore();
														
													if(event.getCharCode() == 13){
														storeTmp.clearFilter();
														me.searchServiceByValue(value);
													}
													else{
														storeTmp.clearFilter();
														storeTmp.filter('NAME', value);
													}
												}
											}
 	 		                           },
 	 		                           {
 	                                	text: 'Tìm',
 	                                	iconCls: 'icon-search',
 	                                	itemId: 'btnSearchSrvcBtn'
 	 		                           }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: customerStore,
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
    searchServiceByValue:function(_value){
		
		var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				NAME: _value,
				limit: 10
		};
		storeTmp.getProxy().url = contextPath + '/customer/getLisPagingCustomers.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	}
});