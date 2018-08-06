/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var customerStore = Ext.create('MNG.store.customerStore');

Ext.define('MNG.view.popup.BtnSearchCustomer', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 500,
	y: 10,
	//x: 10,
	title : 'Tra cứu khách hàng',
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
					        	xtype : 'fieldset',
					        	title: 'Nhập nội dung tìm kiếm',
					        	padding : '10 10 10 10',
					        	flex: 1,
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								items:[
								       {
								    	   xtype : 'textfield',
								    	   name : 'C_NAME',
								    	   height: 30,
								    	   emptyText : 'Nhập tên hoặc số phone',
								    	   enableKeyEvents: true,
										   listeners:{
												'keyup': function(field, event){
													me.FilterMenu(field, event);	
												} 
											}
								       }
								]
							},{

								xtype : 'gridpanel',
								flex : 1,
								itemId: 'grid-customer-item',
								minHeight : 300,
								maxHeight : 400,
								store : customerStore,
								pageSize : 10,
								columns : [{
									xtype : 'rownumberer',
									width : 30,
									align : 'center',
									text : 'TT',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'left',
									width : 120,
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
									width : 70,
									editable: true,
									dataIndex : 'Email',
									text : 'Email',
									sortable : true
								},{
									xtype : 'gridcolumn',
									align : 'right',
									width : 50,
									editable: true,
									dataIndex : 'SCORE',
									text : 'Điểm',
									sortable : true
								}, {
									xtype : 'gridcolumn',
									align : 'right',
									flex: 1,
									editable: true,
									dataIndex : 'ADDR',
									text : 'Địa chỉ',
									sortable : true
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
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveSrvc',
				text : 'Lưu',
				itemId : 'btnSelectCustomer'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
			var storeTmp = Grid.getStore();
			storeTmp.getProxy().extraParams = {};
			storeTmp.currentPage = 1;
			storeTmp.load();
		}
	},
	FilterMenu:function(key, event){
		me = this;
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
	},
});
