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
	title : 'Lịch sử mua hàng theo đơn',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	params:{
		STARTDATE: null,
		ENDDATE: null,
		CUS_CD: null
	},
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//cls : 'jdvn-main',
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
                                         hidden: true,
                                         text: 'Khách hàng',
                                         width: 120
                                      },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         sortable:false,
                                         text: 'Ghi chú',
                                         flex: 0.5
                                     },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAYED_MONEY',
                                         align:'right',
                                         sortable:false,
                                         text: 'Thanh toán',
                                         width : 110,
                                         renderer :function(value, p , r){
                            					data = r.data['PAYED_MONEY'];
                            					if(data != '')
                            						data = formatSupporter.formatToMoney(data);
                            					return  data;
                            				}
                                     },{
             							xtype : 'gridcolumn',
             							width : 120,
             							sortable : false,
             							align : 'right',
             							text : "Tổng tiền",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						}
								],
								tbar : [ 
								         {
											text : 'Tất cả',
											iconCls : 'icon-search',
											cls: 'buttonCls',
											height : 25,
											itemId : 'btnHistoryBillAll' },
								         {
											text : 'Tháng này',
											iconCls : 'icon-search',
											height : 25,
											itemId : 'btnHistoryBillMonth' },
										{
											text : 'Khác',
											iconCls : 'icon-search',
											height : 25,
											itemId : 'btnHistoryBillOther' }],
								bbar : [ {
											text : 'PDF',
											iconCls : 'icon-pdf',
											height : 35,
											itemId : 'btnHistoryBillPDF' },
										 {
											text : 'Excel',
											iconCls : 'icon-excel',
											hidden: true,
											height : 35,
											itemId : 'btnHistoryExcelPrint' },
										 {
										    xtype : 'container',
										    flex: 1,
											layout : {
													align : 'stretch',
													type : 'hbox'
													},
												items : [
												         {
														xtype : 'container',
														flex: 1,
													},
													{
														xtype : 'label',
														fieldLabel : 'Tổng',
														text : 'Tổng: ',
														cls : 'sumary-label'
													},
													{
														xtype : 'label',
														fieldLabel : 'Tổng',
														itemId : 'statis-total-id2',
														text : '0.0',
														cls : 'sumary-field'
													}]}],
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
	loadListBills:function(){
		me = this;
		var Grid = Ext.ComponentQuery.query('#grid-customer-bill')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams=me.params;
		storeTmp.getProxy().url = contextPath + '/customer/getListBillByCustomer.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        if(totalValue != null && totalValue != '')
					        	totalValue = Math.round(totalValue);
					        value1 = formatSupporter.formatToMoney(totalValue);
					        Ext.ComponentQuery.query('#statis-total-id2')[0].setText(value1);					       
					     }
					});
	},
	display:function(title){
		me = this;
		me.setTitle(title);
		me.show();
		
		var btn1 = Ext.ComponentQuery.query("#btnHistoryBillMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryBillAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn2.addCls('buttonCls');
	}
});
