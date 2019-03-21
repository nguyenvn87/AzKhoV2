Ext.define('MNG.view.popup.BtnChonDonTra', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.grid.column.Action',
        'Ext.button.Button'
    ],
    storeData: Ext.create('MNG.store.roomTurnStore', {
    	sorters : [ {
    		property : 'CHANGE_DATE',
    		direction : 'desc'
    	} ]
    }),
    autoShow: true,
    height: 499,
    width: 789,
    title: 'Chọn đơn cần trả',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'fieldset',
                    dock: 'top',
                    hidden: true,
                    height: 33,
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center',
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            width: 600,
                            fieldLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    dock: 'bottom',
                    height: 49,
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Trả nhanh'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    height: 413,
                    autoScroll: true,
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            width: 900,
                            title: '',
                            itemId : 'grid-srvc-statistic',
                            store: me.storeData,
                            columns: [
                                {
									xtype : 'gridcolumn',
									width : 30,
									sortable : false,
									align : 'center',
									dataIndex : 'rn1',
									text : 'TT'
								},
								{
									xtype : 'datecolumn',
									sortable : true,
									align : 'left',
									width : 90,
									dataIndex : 'CHANGE_DATE',
									format: 'd/m/Y',
									text : 'Ngày'
								},
								{
									xtype : 'gridcolumn',
									sortable : true,
									align : 'left',
									width : 95,
									dataIndex : 'BILL_CD',
									text : 'Hóa đơn số'
								},
								{
									xtype : 'numbercolumn',
									width : 120,
									format: '0,000',
									sortable : false,
									align : 'right',
									text : "Tổng tiền",
									dataIndex : 'TOTAL_MONEY'
								},
								{
									xtype : 'numbercolumn',
									dataIndex : 'PAYED_MONEY',
									format: '0,000',
									align : 'right',
									sortable : false,
									text : 'Thanh toán',
									width : 110,
								},
								{
									xtype : 'gridcolumn',
									dataIndex : 'CUS_NM',
									sortable : false,
									text : 'Khách hàng',
									width : 120
								},
								{
									xtype : 'gridcolumn',
									dataIndex : 'DSCRT',
									sortable : false,
									text : 'Ghi chú',
									flex : 0.5
								},
                                {
                                    xtype: 'actioncolumn',
                                    items: [
                                        {

                                        }
                                    ]
                                }
                            ],
                            dockedItems : [ {
								xtype : 'pagingtoolbar',
								dock : 'bottom',
								store : me.storeData,
								displayInfo : true
							} ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners:{
		afterrender:function(){
			var parent = this;
			parent.loadingData();
		}
	},
	loadingData: function(){
		
		var paramsRequest = {
				TYPE_STATIS: null,
				STARTDATE: null,
				ENDDATE: null,
				IS_CANCELED: 0,
				USERNAME: ''
			};
		var GridTurn = Ext.ComponentQuery.query('#grid-srvc-statistic')[0];
		var storeTmp = GridTurn.getStore();
		storeTmp.getProxy().extraParams = paramsRequest;
		var url = contextPath +'/report/getPagingStatistic.json';		
		storeTmp.getProxy().url = url;
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load({
			 callback: function (records, operation, success) {}
		});
	}
});