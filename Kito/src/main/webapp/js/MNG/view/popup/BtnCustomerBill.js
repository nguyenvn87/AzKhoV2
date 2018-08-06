/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var roomTurnStore = Ext.create('MNG.store.roomTurnStore');

Ext.define('MNG.view.popup.BtnCustomerBill', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 800,
	y: 10,
	//x: 10,
	title : 'Lịch sử mua hàng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	srvdId : null,
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				itemId : 'itemSearchContainerId',
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
								itemId: 'grid-customer-bill',
								minHeight : 300,
								maxHeight : 400,
								store : roomTurnStore,
								pageSize : 10,
								columns : [{
                                         xtype: 'gridcolumn',
                                         width: 30,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'rn1',
                                         text: 'TT'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 150,
                                         hidden: true,
                                         dataIndex: 'CHANGE_DATE',
                                         text: 'Time'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         text: 'Ngày',
                                         width: 90,
                                         renderer :function(value, p , r){
                            					data = r.data['CHANGE_DATE'];
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
                                         width: 90,
                                         dataIndex: 'BILL_CD',
                                         text: 'Số HĐ'
                                     },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TOTAL_MONEY',
                                         hidden: true,
                                         sortable:false,
                                         text: 'Số tiền',
                                         flex: 0.5,
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 90,
             							sortable : false,
             							align : 'right',
             							text : "Tổng tiền",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						}, 
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAYED_MONEY',
                                         align:'right',
                                         sortable:false,
                                         text: 'Thanh toán',
                                         width : 100,
                                         renderer :function(value, p , r){
                            					data = r.data['PAYED_MONEY'];
                            					if(data != '')
                            						data = formatSupporter.formatToMoney(data);
                            					return  data;
                            				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'IS_DEBIT',
                                         sortable:true,
                                         hidden: true,
                                         text: 'Ghi nợ',
                                         width: 60,
                                         renderer :function(value, p , r){
                         					data = r.data['IS_DEBIT'];
                         					if(data != '' && data == '1')
                         						return 'Nợ'
                         					return  '';
                         				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'HAS_PAYED',
                                         sortable:true,
                                         text: 'Ghi chú nợ',
                                         width: 120,
                                         renderer :function(value, p , r){
                         					data = r.data['HAS_PAYED'];
                         					debit = r.data['IS_DEBIT'];
                         					if(debit != '1'){
                         						return '';
                         					}
                         					if(data != '' && data == '1')
                         						return ''
                         					return  'Chưa thanh toán';
                         				}
                                    
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'CUS_NM',
                                         sortable:false,
                                         text: 'Khách hàng',
                                         width: 120
                                      },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         sortable:false,
                                         text: 'Ghi chú',
                                         flex: 0.5
                                     },
								],
								dockedItems: [
			                                     {
			                                         xtype: 'pagingtoolbar',
			                                         dock: 'bottom',
			                                         store: roomTurnStore,
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
	loadListBills:function(_value){
		
		var Grid = Ext.ComponentQuery.query('#grid-customer-bill')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				CUS_CD: _value
		};
		storeTmp.getProxy().url = contextPath + '/customer/getListBillByCustomer.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	},
});
