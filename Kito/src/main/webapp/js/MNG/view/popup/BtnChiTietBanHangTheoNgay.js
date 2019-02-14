/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var exportStore = Ext.create('Ext.data.Store',{
          autoLoad: false, 
          fields: [
           			{ name: 'SRVC_NM', 	type: 'string'},
           			{ name: 'SRVC_CD', 	type: 'string'},
           			{ name: 'SRVC_ID', 	type: 'string'},
                    { name: 'DSCRT', 	type: 'string'},
                    { name: 'BILL_CD', 	type: 'string'},
                    { name: 'UNIT_NM', 	type: 'string'},
                    { name: 'UNIT', 	type: 'string'},
                    { name: 'USER_NAME', type: 'string'},
                    { name: 'AMOUNT', 	type: 'string'},
                    { name: 'ROOM_USED_ID', type: 'string'},
                    { name: 'TOTAL_MONEY', 	type: 'string'},
                    { name: 'CREATE_DATE', 	type: 'string'}
                 ],
                  proxy: {
                          type: 'ajax',											
                          reader: {
                          type: 'json',
                          root: 'data', 						
                          totalProperty: 'totalCount',						
                          messageProperty: 'message',
                          successProperty: 'success'
                         },
                  listeners: { 
                  			exception: function(proxy, response, options) {
                  				//requestMessageProcessor(proxy, response);
                  			}
                     	},
                     	afterRequest: function(request, success) {
                           //requestMessageProcessor(request.scope, request.operation.response);
                       }
                        }
                  });

Ext.define('MNG.view.popup.BtnChiTietBanHangTheoNgay', {
	extend : 'Ext.window.Window',
	Height : 700,
	width : 700,
	y: 10,
	//x: 10,
	title : 'Lịch sử mua hàng theo loại hàng',
	maxHeight : 800,
	closeAction : 'hide',
	resizable : true,
	srvdId : null,
	params:{
		STARTDATE: null,
		ENDDATE: null,
		SRVC_ID: null
	},
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				itemId : 'itemSearchContainerId1',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [
					        {

								xtype : 'gridpanel',
								flex : 1,
								itemId: 'grid-customer-product',
								minHeight : 400,
								maxHeight : 500,
								store : exportStore,
								pageSize : 10,
								columns : [{
                                         xtype: 'rownumberer'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 90,
                                         dataIndex: 'CREATE_DATE',
                                         text: 'Ngày'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 90,
                                         dataIndex: 'BILL_CD',
                                         text: 'Đơn hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         //width: 150,
                                         flex: 1,
                                         dataIndex: 'SRVC_NM',
                                         text: 'Tên hàng'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'right',
                                         width: 65,
                                         dataIndex: 'AMOUNT',
                                         text: 'SL'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'right',
                                         width: 65,
                                         dataIndex: 'UNIT_NM',
                                         text: 'Đ/V'
                                     },
                                     {
						                menuDisabled: true,
						                sortable: false,
						                align:'center',
						                xtype: 'actioncolumn',
						                text: '',
						                width: 40,
						                items: [{
						                    iconCls : 'icon-pdf',
						                    tooltip: 'Xem đơn hàng',
						                    handler: function(grid, rowIndex, colIndex) {
						                    	grid.getSelectionModel().select(rowIndex);
						                    	var rec = grid.getStore().getAt(rowIndex);
						                    	me.viewBillInfo(rec);
						                    }
						                }]
						            },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         hidden: true,
                                         align:'left',
                                         flex: 1,
                                         dataIndex: 'DSCRT',
                                         text: 'Ghi chú'
                                     }
								],
								dockedItems: [
			                                     {
			                                         xtype: 'pagingtoolbar',
			                                         dock: 'bottom',
			                                         store: exportStore,
			                                         displayInfo: true
			                                     }
			                                 ]
							}
							]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				hidden: true,
				cls : 'button',
				action : 'saveSrvc',
				text : 'Xem đơn',
				itemId : 'btnViewCustomerBill'
			}]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
		}
	},
	loadListBills:function(params){
		me = this;
		/*var startDate = record.get('CREATE_DATE');
		var srvcId = record.get('SRVC_ID');
		var userName = record.get('USER_NAME');
		
		var params = { 
				STARTDATE: startDate,
				ENDDATE: startDate+ ' 23:59:59',
				SRVC_ID: srvcId,
				USER_NAME: userName
		};*/
		var Grid = Ext.ComponentQuery.query('#grid-customer-product')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams = params;
		storeTmp.getProxy().url = contextPath + '/sale/getChitietbanhangtheongay.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	},
	viewBillInfo: function(record){
		var myController = MANAGER.app.getController('MNG.controller.ThongKeChiTietController');
		myController.printViewBill(record);
	}
});
