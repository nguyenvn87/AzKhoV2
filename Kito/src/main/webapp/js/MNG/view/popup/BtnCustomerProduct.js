/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var exportStore = Ext.create('MNG.store.exportStore');

Ext.define('MNG.view.popup.BtnCustomerProduct', {
	extend : 'Ext.window.Window',
	Height : 800,
	width : 700,
	y: 10,
	//x: 10,
	title : 'Lịch sử mua hàng theo loại hàng',
	maxHeight : 1000,
	closeAction : 'hide',
	resizable : true,
	srvdId : null,
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
								minHeight : 500,
								maxHeight : 600,
								store : exportStore,
								pageSize : 10,
								columns : [{
                                         xtype: 'rownumberer'
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
                                         sortable:true,
                                         align:'left',
                                         width: 90,
                                         dataIndex: 'SRVC_CD',
                                         text: 'Mã hàng'
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
                                         align:'left',
                                         width: 90,
                                         dataIndex: 'UNIT_NM',
                                         text: 'Đ/V'
                                     },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TOTAL_MONEY',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Số tiền',
                                         width : 100
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 150,
             							sortable : false,
             							align : 'right',
             							text : "Tổng (đ)",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						}
								],
								bbar : [ {
											text : 'PDF',
											iconCls : 'icon-pdf',
											height : 30,
											itemId : 'btnHistoryProductPDF' },
										 {
											text : 'Excel',
											iconCls : 'icon-excel',
											hidden: true,
											height : 30,
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
														itemId : 'statis-total-id',
														text : '0.0',
														cls : 'sumary-field'
													}]}],
								tbar : [ 
								         {
											text : 'Tất cả',
											iconCls : 'icon-search',
											name: 'button',
											cls: 'buttonCls',
											height : 25,
											itemId : 'btnHistoryProductAll' },
								         {
											text : 'Tháng này',
											iconCls : 'icon-search',
											name: 'button',
											height : 25,
											itemId : 'btnHistoryProductMonth' },
										{
											text : 'Khác',
											iconCls : 'icon-search',
											name: 'button',
											height : 25,
											itemId : 'btnHistoryProductOther' } ],
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
	loadListBills:function(){
		me = this;
		var Grid = Ext.ComponentQuery.query('#grid-customer-product')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams = me.params;
		storeTmp.getProxy().url = contextPath + '/getPagingProductHavedSaled.json';
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
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);					       
					     }
					});
	},
	display:function(title){
		me = this;
		me.setTitle(title);
		var btn1 = Ext.ComponentQuery.query("#btnHistoryProductMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryProductAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn2.addCls('buttonCls');
		me.show();
	}
});
