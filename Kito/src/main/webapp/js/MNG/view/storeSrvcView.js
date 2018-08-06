
var statisticStore = Ext.create('MNG.store.storeSrvcStore',{});
Ext.define('MNG.view.storeSrvcView', {
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
                                 minHeight: 300,
                                 maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: statisticStore, //Ext.create('MNG.store.storeSrvcStore',{}),
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
                                         width: 120,
                                         dataIndex: 'SRVC_CD',
                                         text: 'Mã hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         flex: 1,
                                         dataIndex: 'SRVC_NM',
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'right',
                                         sortable: true,
                                         dataIndex: 'AMOUNT_STORE',
                                         width: 120,
                                         text: 'Số lượng tồn'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'right',
                                         hidden: true,
                                         sortable:false,
                                         dataIndex: 'TOTAL_NO',
                                         width: 80,
                                         text: 'Số lượng',
                                         renderer :function(value, p , r){
						              			data = r.data['TOTAL_NO'];
						              		if(data != '')
						              			data = formatSupporter.formatToMoney(data);
						              		return  data;
						              	}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'UNIT_NM',
                                         width: 80,
                                         text: 'Đơn vị'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         align:'left',
                                         hidden: true,
                                         sortable:false,
                                         dataIndex: 'TYPE_NM',
                                         width: 150,
                                         text: 'Nhóm hàng'
                                     },
                                      {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'center',
                                         text: 'Cập nhật ngày',
                                         width: 120,
                                         renderer :function(value, p , r){
                            					data = r.data['CHANGETIME'];
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					return  data;
                            				}
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USERNAME',
                                         sortable:false,
                                         text: 'Người cập nhật',
                                         width: 150
                                     }
                                 ],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: statisticStore,
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