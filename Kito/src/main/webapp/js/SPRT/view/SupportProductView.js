var srvcStoreTmp = Ext.create('SPRT.store.CommonCodeStore',{})

Ext.define('SPRT.view.SupportProductView', {
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
                                 minHeight: 300,
                                 height: 500,
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
                                         dataIndex: 'CD',
                                         text: "CD"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'CD_NM',
                                         flex : 1,
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         dataIndex: 'GROUP_NM',
                                         flex : 1,
                                         text: 'Nhóm hàng'
                                     },
                                     {
             							xtype : 'gridcolumn',
             							flex : 1,
             							sortable : false,
             							align : 'right',
             							dataIndex: 'VALUE1',
             							text : "Giá bán(đ)",
             							renderer :function(value, p , r){
                           					data = r.data['VALUE1'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						},
                                     {
										menuDisabled : true,
										sortable : false,
										xtype : 'actioncolumn',
										text: 'Mặc định',
										align : 'center',
										flex : 1,
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
                                     },{
										menuDisabled : true,
										sortable : false,
										text : 'Xóa',
										xtype : 'actioncolumn',
										align : 'center',
										flex : 1,
										items : [ {
											iconCls : 'icon-del',
											tooltip : 'Xóa',
											handler : function(grid, rowIndex, colIndex){
												//me.deleteRecord(grid, rowIndex, colIndex);
												var myController = MANAGER.app.getController('MNG.controller.srvcController');
												myController.deleteRecord(grid, rowIndex, colIndex);
											}
										} ]
									}, {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'RESTAR_TYPE',
                                         sortable:false,
                                         text: 'Type',
                                         width : 120
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới SP',
                                	 	iconCls: 'icon-addnew',
                                	 	itemId: 'addSrvcBtn',
                                	 	hidden: me.isHideAddNew
 		                                },
 	 		                           {													
											xtype : 'simplecombobox',
											itemId:'UNIT',
											name:'UNIT',
											fieldLabel : 'Cửa hàng',
											emptyText: 'Chọn cửa hàng',
											datatype: 'combo',
											scrid: 'RESTA',
											autoload: false
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