<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>
<html>
	<head><title>Phần mềm quản lý bán hàng trực tuyến-AzKho</title></head>
    <script type="text/javascript">
    var tmpButton =  Ext.create('LAFORM.containerCommon');
    var roomStore = Ext.create('MNG.store.roomStore',{});
    var roomComboStore = Ext.create('MNG.store.roomStore',{});
    var menuStore = Ext.create('MNG.store.menuStore', {});
    var paymentContainer1 = Ext.create('BS.infoPaymentContainer', {});
    var customContainer = Ext.create('BS.infoCustomerContainer', {});
    var orderContainer = Ext.create('BS.infoOrderContainer', {});
    
    var paymentContainer =  Ext.create('Ext.tab.Panel', {
    						cls: 'tab-conent-cls',
						    items: [
						        {
						            title: 'Thanh toán',
						            //hidden: true,
						            items: [paymentContainer1]
						        },
						        {
						            title: 'Thanh toán trả hàng',
						            items: [orderContainer]
						        }
						    ],
						});
    
        Ext.require('*');
        Ext.application({
            requires    : ['Ext.container.Viewport'],
            name : 'MANAGER',
            appFolder   : 'MNG',
            controllers : ['MNG.controller.retailController'],
            launch      : function() {

                Ext.create('Ext.Viewport', {
                    layout:'border',

                    items: [{
                        itemId: 'form-list-room',
                        hidden: true,
                        collapsed: true,
                        title: 'Danh sách phòng',
                        collapsible: true,
                        region:'west',
                        split:true,
                        width:150,
                        minWidth: 100,
                        maxWidth: 350,
                        layout: {
                            type:'vbox',
                            padding:'2',
                            align:'stretch'
                        },
                        defaults:{
                        	margin:'0 0 2 0',
                        	flex: 1
                        	},
                        items:[]
                   }, {
                        region:'center',
                        title: 'Chi tiết đơn hàng',
                        cls: 'toolbar-content',
                        itemId:'idContainerRoomSrvc',
                        margin: '0 5 5 5',
                        layout: {
                            type:'hbox',
                            align:'stretch'
                        },
                        dockedItems:[{
                            xtype: 'toolbar',
                            
                            enableOverflow: true,
                            dock: 'bottom',
                            defaults:{
                                margin:'0 5 0 0',
                                pressed: false,
                                height: 40,
                                allowDepress: true
                            },
                            items: [
                            	{
                                    xtype:'button',
                                    text: 'Báo cáo ngày',
                                    itemId : 'btnDailyReport',
                                    iconCls : 'icon-print'
                                },
                                {
                                    xtype:'button',
                                    text: 'Xem tồn kho',
                                    itemId : 'btnXemTonKho',
                                    iconCls : 'icon-print'
                                },
                                {
	                            	xtype:'container',
	                            	
	                            	flex: 1,
	                            	layout: {
	                                        type: 'hbox',
	                                        pack:'end'
	                                    },
	                            	items:[{
	                            	    	   xtype:'button',
				                               text: 'Hủy',
				                               hidden: true,
				                               //height: 40,
				                               iconCls : 'icon-delete',
				                               itemId : 'btnCancel'
	                            	       },{
			                            	    xtype:'button',
			                            	    hidden: true,
						                        text: 'Tạo dữ liệu mẫu',
						                        itemId : 'btnCreateTemplate'
		                            	  }]
	                            }]
                        },{
                            xtype: 'toolbar',
                            cls: 'toolbar-content',
                            enableOverflow: true,
                            dock: 'top',
                           
                            defaults:{
                                margin:'0 5 0 0',
                                height: 30,
                                pressed: false,
                                toggleGroup:'btns',
                                allowDepress: false
                            },
                            items: [{
                                xtype:'button',
                                iconCls : 'icon-admin',
								itemId : 'btnPaymentDebit',
								scale: 'medium',
                                text: 'Quản Lý',
                                handler:function(){
                                	window.location.href=contextPath+"/mainStatistic.do"; 
                                }
                            }
                           ,{
	                            xtype:'container',
	                            flex: 1,
	                            layout: {
	                                 type: 'hbox',
	                                 pack:'end'
	                            },
	                            items:[{
	                            	    xtype:'button',
				                        text: 'Tạo dữ liệu mẫu',
				                        hidden: true,
				                        itemId : 'btnCreateTemplate'
	                            	  }]
	                            }
                            ]
                        }],
                        items:[
								{
									xtype : 'gridpanel',
									itemId : 'grid-room-turn',
									flex : 1,
									minHeight : 500,
									pageSize : 10,
									padding : '10 0 0 0',
									autoScroll : true,
									plugins: [
										Ext.create('Ext.grid.plugin.CellEditing', {
										    clicksToEdit: 1
										})
									],
									store : Ext.create('MNG.store.roomSrvcStore', {}),
									viewConfig : {
										getRowClass : function(record, index, rowParams) {
										}
									},
									features : [ {
										ftype : 'summary'
									} ],
									columns : [ {
										xtype : 'rownumberer',
										width : 30,
										sortable : false,
										align : 'center',
										text : 'TT'
									}, {
										xtype : 'gridcolumn',
										flex : 1,
										hidden : true,
										sortable : false,
										align : 'left',
										dataIndex : 'MENU_ID',
										text : "Tên"
									}, {
										xtype : 'gridcolumn',
										flex : 1,
										sortable : true,
										align : 'left',
										dataIndex : 'MENU_NM',
										text : "Tên"
									}, {
										xtype : 'gridcolumn',
										width : 80,
										sortable : false,
										align : 'right',
										dataIndex : 'AMOUNT',
										editor: {
											xtype: 'numberfield',
											minValue : 0,
											allowBlank: false
										},
										text : 'SL'
									},{
										xtype : 'gridcolumn',
										width : 100,
										hidden : true,
										sortable : false,
										align : 'right',
										dataIndex : 'PRICE',
										text : "Đơn giá",
									}, {
										xtype : 'gridcolumn',
										width : 70,
										sortable : false,
										align : 'left',
										dataIndex : 'UNIT_NM',
										text : "Đ/V",
										summaryRenderer : function(value) {
											return 'Tổng:';
										}
									}, {	
										xtype : 'gridcolumn',
										width : 95,
										sortable : false,
										align : 'right',
										dataIndex : 'PRICE',
										text : "Đơn giá",
										editor: {
											xtype: 'numberfield',
											allowBlank: false
										},
										renderer : function(value, p, r) {
											data = r.data['PRICE'];
											r.data['TOTAL_MONEY'] = r.data['PRICE']*r.data['AMOUNT'];
											if (data != '')
												data = formatSupporter.formatToMoney(data);
											return '<span style="color: green">'+data+'</span>';
										}
									},{
										xtype : 'gridcolumn',
										width : 125,
										align : 'right',
										sortable : true,
										dataIndex : 'TOTAL_MONEY',
										text : 'Thành tiền',
										summaryType : 'sum',
										renderer : function(value, p, r, rowIndex) {
											data = r.data['TOTAL_MONEY'];
											if (data != '')
												data = formatSupporter.formatToMoney(data);
											return '<span style="color: red">'+data+'</span>';;
										},
										summaryRenderer: function(value, summaryData, dataIndex){
											tmpStore = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore();
											var totalValue = 0;
											var sumValue = 0;
											tmpStore.each(function(record,id){
											    totalValue = totalValue + (record.data['PRICE']*record.data['AMOUNT']);
											});
											if (totalValue != ''){
												sumValue = formatSupporter.formatToMoney(totalValue);
												var myController = MANAGER.app.getController('MNG.controller.retailController');
												myController.setValueForPay(totalValue);
											}
										    return sumValue;
										},
									}, {
										xtype : 'gridcolumn',
										flex : 1,
										hidden : true,
										dataIndex : 'SRVC_ID',
										align : 'center',
										text : 'SRVC_ID'
									}, {
										menuDisabled : true,
										sortable : false,
										xtype : 'actioncolumn',
										align : 'center',
										text : 'Sửa',
										width : 60,
										items : [ {
											iconCls : 'icon-edit',
											tooltip : 'Chỉnh sửa',
											handler : function(grid, rowIndex, colIndex) {
												store = grid.getStore();
												var rec = store.getAt(rowIndex);
												grid.getSelectionModel().select(rowIndex);
												var menuId = rec.get('SRVC_ID');
												if(popChService==null){
													popChService = Ext.create('MNG.view.popup.BtnChangeService',{});
												}
												popChService.serviceId = menuId;
												popChService.show();
												gridSupport.selectGridPopup('#idContainerRoomSrvc','#grid-room-turn','#chgSrvcContainer');
											}
										} ]
									}, {
										menuDisabled : true,
										sortable : false,
										text : '',
										xtype : 'actioncolumn',
										align : 'center',
										width : 60,
										items : [ {
											iconCls : 'icon-delete',
											tooltip : 'Xóa mục này',
											handler : function(grid, rowIndex, colIndex){
												var myController = MANAGER.app.getController('MNG.controller.retailController');
												myController.deleteRecord(grid, rowIndex, colIndex);
											}
										} ]
									}]
								}
                             ]
                        
                    },{
                        region:'east',
                        title: 'Danh mục hàng hóa, dịch vụ',
                        autoScroll: true,
                        collapsible: true,
                        split:true,
                        flex: 0.5,
                        //minWidth : 450,
                        layout: {
                            type:'vbox',
                            padding:'2 5 5 5',
                            align:'stretch'
                        },
                        items:[{
                        			xtype : 'container',
                        			layout: {
			                            type:'hbox',
			                            align:'stretch'
			                        },
			                        items:[
			                               {
				                        		xtype : 'textfield',
				                        		cls: 'input-special-cls',
									    	    itemId : 'SRVC_NM',
									    	    name : 'SRVC_NM',
									    	    height: 50,
									    	    flex: 1,
									    	    enableKeyEvents: true,
												listeners:{
													'keyup': function(field, event){
														
														var myController = MANAGER.app.getController('MNG.controller.retailController');
														myController.FilterMenu(field, event);	
													} 
												},
									    	    emptyText : 'Tìm kiếm...'
				                        	},
				                        	{
				                        		xtype : 'button',
				                        		hidden: true,
				                        		text: 'Tìm kiếm',
				                        		itemId : 'idSrvcSearch',
				                        	}
			                               ]
                        	  },
                               {
	                        	xtype : 'gridpanel',
	    						itemId : 'grid-menu-id',
	    						flex : 1,
	    						minHeight: 250,
	    						pageSize : 20,
	    						autoScroll : true,
								store : menuStore,
	    						columns : [ {
	    							xtype : 'rownumberer',
	    							width : 20,
	    							sortable : false,
	    							hidden: true,
	    							align : 'center',
	    							text : ''
								},{
									xtype : 'gridcolumn',
									sortable : true,
									hidden: true,
									align : 'left',
									dataIndex : 'SRVC_NM',
									width : 160,
									text : 'Tên'
								},{
					                text: 'Tên hàng',
					                dataIndex: 'title',
					                minWidth : 180,
					                flex: 1,
					                renderer: function(value, p, record){
					                	dscrs = record.get('DSCRT');
					                	if(dscrs != null && dscrs.length > 0){
					                		dscrs = ' ('+dscrs+')';
					                	}
								        return Ext.String.format('<div class="topic"><b>'+record.get('SRVC_NM')+'</b><br><span class="author">'+record.get('SRVC_CD')+dscrs+'</span></div>', value, record.get('SRVC_NM') || "Unknown");
								    }
					            }, {
									xtype : 'gridcolumn',
									dataIndex : 'PRICE',
									align : 'right',
									hidden: true,
									width : 100,
									sortable : true,
								},{
									xtype : 'gridcolumn',
									dataIndex : 'PRICE',
									align : 'right',
									width : 90,
									sortable : true,
									text : 'Đơn giá',
									renderer :function(value, p , r){
			              					data = r.data['PRICE'];
			              					unit = r.data['UNIT_NM'];
			              					if(data != '')
			              					data = formatSupporter.formatToMoney(data);
			              					return '<span style="color: green">'+data+'</span>';
			              			}
								},{
									xtype : 'gridcolumn',
									sortable : true,
									align : 'left',
									dataIndex : 'UNIT_NM',
									width : 60,
									text : 'Đ/V'
								},{
									xtype : 'gridcolumn',
									sortable : true,
									hidden: true,
									align : 'left',
									dataIndex : 'SRVC_CD',
									flex : 1,
									text : 'Mã SP'
								},{
									xtype : 'gridcolumn',
									sortable : true,
									align : 'left',
									dataIndex : 'AMOUNT_STORE',
									width : 50,
									text : 'Tồn',
									renderer :function(value, p , r){
			              					data = r.data['AMOUNT_STORE'];
			              					return '<span style="color: red">'+data+'</span>';
			              			}
								}], 
								dockedItems: [
				                    {
				                         xtype: 'pagingtoolbar',
				                         dock: 'bottom',
				                         store: menuStore,
				                         displayInfo: true
				                     }
				                 ]
	                        },
                        	  customContainer,
                        	  paymentContainer
                        	  ]
                       }]
                      
                });
				
				// Load menu
				var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
				var storeTmp = Grid.getStore();
				storeTmp.getProxy().extraParams={
					IS_USED: 1
				};
				storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
				storeTmp.currentPage = 1;
				storeTmp.pageSize= 100;
				storeTmp.load();
				storeTmp.on('load',function (store, records, successful, eOpts ){
					// Init data
					if(records.length < 1){
						var myController = MANAGER.app.getController('MNG.controller.retailController');
						//myController.setInitDataDefault();
					}
				});
				formatSupporter.checkingTrialAccount();
            }
        });
        
    </script>
</html>