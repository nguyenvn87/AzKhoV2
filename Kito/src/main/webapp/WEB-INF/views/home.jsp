<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>
<html>
	<head><title>Phần mềm quản lý bán hàng trực tuyến-AzKho</title></head>

    <script type="text/javascript">
    
    var roomStore = Ext.create('MNG.store.roomStore',{});
    var roomComboStore = Ext.create('MNG.store.roomStore',{});
    var menuStore = Ext.create('MNG.store.menuStore', {});
        Ext.require('*');
        Ext.application({
            requires    : ['Ext.container.Viewport'],
            name : 'MANAGER',
            appFolder   : 'MNG',
            controllers : ['MNG.controller.saleManagerController'],
            launch      : function() {

                Ext.create('Ext.Viewport', {
                    layout:'border',

                    items: [{
                        itemId: 'form-list-room',
                        title: 'Danh sách phòng',
                        collapsible: true,
                        region:'west',
                        split:true,
                        width:150,
                        minHeight: 500,
                        minWidth: 100,
                        maxWidth: 250,
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
                        //cls:'x-panel-header-extent',
                        cls: 'toolbar-content',
                        title: 'Bạn chưa chọn phòng...',
                        itemId:'idContainerRoomSrvc',
                        margin: '0 5 5 0',
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
                                    itemId : 'btnRptDaily',
                                    iconCls : 'icon-pdf'
                                },
                                    {
    	                            xtype:'button',
    	                            text: 'Tính giờ',
    	                            itemId: 'btnCalculate',
    	                            iconCls : 'icon-timer'
                            	},
                            	{
                                    xtype:'button',
                                    text: 'In hóa đơn',
                                    itemId : 'btnPayment',
                                    iconCls : 'icon-print'
                                },
                                {
	                            	xtype:'container',
	                            	flex: 1,
	                            	layout: {
	                                        type: 'hbox',
	                                        padding:'5',
	                                        pack:'end'
	                                    },
	                            	items:[
	                            	       {
	                            	    	   xtype:'button',
				                               text: 'Hủy',
				                               height: 40,
				                               iconCls : 'icon-delete',
				                               itemId : 'btnCancel'
	                            	       }
	                            	       ]
	                            }
                            	]
                        },{
                            xtype: 'toolbar',
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
                                text: 'Kích hoạt',
                                iconCls : 'icon-stsoff',
                                itemId : 'btnStartRunningRoom',
                                handler: function(){
                                }
                            },{
                                xtype:'button',
                                text: 'Đổi phòng',
                                iconCls : 'icon-change',
                                itemId : 'btnChangeRoom'
                            },{
                                xtype:'button',
                                iconCls : 'icon-payment',
								itemId : 'btnPaymentDebit',
                                text: 'Thanh toán'
                            },{
                            	xtype:'container',
                            	flex: 1,
                            	layout: {
                                        type: 'hbox',
                                        padding:'5',
                                        pack:'end'
                                    },
                            	items:[
                            	       {
                            	    	   xtype:'button',
                            	    	   //html : 'Quản trị',
			                               text: 'Quản trị',
			                               iconCls : 'icon-admin',
			                               handler: function(){
			                                	window.location.href=contextPath + "/mainStatistic.do"; 
			                               }
                            	       }
                            	       ]
                            }]
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
									store : Ext.create('MNG.store.roomSrvcStore', {}),
									viewConfig : {
										getRowClass : function(record, index, rowParams) {
											// tmpId = record.data['ID'];
											// if(tmpId != null && tmpId != '')
											// return 'rowClass1';
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
									},{
										xtype : 'gridcolumn',
										width : 50,
										sortable : false,
										align : 'right',
										dataIndex : 'AMOUNT',
										text : 'SL'
									},{
										xtype : 'gridcolumn',
										width : 70,
										sortable : false,
										//hidden: true,
										align : 'left',
										dataIndex : 'UNIT_NM',
										text : "Đơn vị",
										summaryRenderer : function(value) {
											return 'Tổng:';
										}
									},  {
										xtype : 'gridcolumn',
										width : 100,
										hidden : true,
										sortable : false,
										align : 'right',
										dataIndex : 'PRICE',
										text : "Giá",
									}, {
										xtype : 'gridcolumn',
										width : 100,
										sortable : false,
										align : 'right',
										dataIndex : 'PRICE',
										text : "Đơn giá (đ)",
										renderer : function(value, p, r) {
											data = r.data['PRICE'];
								
											if (data != '')
												data = formatSupporter.formatToMoney(data);
											return data;
										}
									}, {
										menuDisabled : true,
										sortable : false,
										xtype : 'actioncolumn',
										align : 'center',
										text : 'Sửa',
										width : 50,
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
										xtype : 'gridcolumn',
										width : 115,
										align : 'right',
										sortable : true,
										dataIndex : 'TOTAL_MONEY',
										text : 'Thành tiền',
										summaryType : 'sum',
										renderer : function(value, p, r, rowIndex) {
											var data = r.data['TOTAL_MONEY'];
											if (data != '')
												data = formatSupporter.formatToMoney(data);
											return data;
										}
									}, {
										xtype : 'gridcolumn',
										flex : 1,
										hidden : true,
										dataIndex : 'SRVC_ID',
										align : 'center',
										text : 'SRVC_ID'
									}, 
									{
										menuDisabled : true,
										sortable : false,
										text : 'Xóa',
										xtype : 'actioncolumn',
										align : 'center',
										width : 45,
										items : [ {
											iconCls : 'icon-remove',
											tooltip : 'Xóa mục này',
											handler : function(grid, rowIndex, colIndex){
												//me.deleteRecord(grid, rowIndex, colIndex);
												var myController = MANAGER.app.getController('MNG.controller.saleManagerController');
												myController.deleteRecord(grid, rowIndex, colIndex);
											}
										} ]
									}]
								}
                             ]
                        
                    },{
                        region:'east',
                        title: 'Tìm kiếm hàng hóa',
                        collapsible: true,
                        split:true,
                        flex: 0.5,
                        layout: {
                            type:'vbox',
                            padding:'2',
                            align:'stretch'
                        },
                        items:[{
                        			xtype : 'container',
                        			cls: 'input-special-cls',
                        			layout: {
			                            type:'hbox',
			                            align:'stretch'
			                        },
			                        items:[
			                               {
				                        		xtype : 'textfield',
									    	    itemId : 'SRVC_NM',
									    	    name : 'SRVC_NM',
									    	    height: 50,
									    	    flex: 1,
									    	    enableKeyEvents: true,
												listeners:{
													'keyup': function(field, event){
														
														//console.log('key = '+e.keyCode+ ' / '+e.getKey());
														var myController = MANAGER.app.getController('MNG.controller.saleManagerController');
														myController.FilterMenu(field, event);	
													} 
												},
									    	    emptyText : 'Nhập nội dung tìm kiếm'
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
	    						minHeight: 300,
	    						flex : 1,
	    						pageSize : 20,
	    						autoScroll : true,
								store : menuStore,
	    						columns : [ {
	    							xtype : 'rownumberer',
	    							width : 30,
	    							sortable : false,
	    							align : 'center',
	    							text : 'TT'
	    						},
	    						{
					                text: 'Tên hàng',
					                dataIndex: 'title',
					                flex: 1,
					                renderer: function(value, p, record){
								        return Ext.String.format('<div class="topic"><b>'+record.get('SRVC_NM')+'</b><br><span class="author">'+record.get('DSCRT')+'</span></div>', value, record.get('SRVC_NM') || "Unknown");
								    }
					            },
	    						{
									xtype : 'gridcolumn',
									sortable : true,
									hidden: true,
									align : 'left',
									dataIndex : 'SRVC_CD',
									width : 80,
									text : 'Mã SP'
								},{
									xtype : 'gridcolumn',
									sortable : true,
									hidden: true,
									align : 'left',
									dataIndex : 'SRVC_NM',
									flex: 1,
									text : 'Tên'
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
									width : 95,
									sortable : true,
									text : 'Giá (vnđ)',
										renderer :function(value, p , r){
			              					data = r.data['PRICE'];
			              					if(data != '')
			              					data = formatSupporter.formatToMoney(data);
			              					return  data;
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
	                        },{
                    			xtype : 'container',
                    			cls: 'input-special-cls',
                    			layout: {
		                            type:'hbox',
		                            align:'stretch'
		                        },
		                        items:[{
											xtype : 'container',
											flex: 1,
											layout : {
												align : 'stretch',
												type : 'hbox'
											},
											items:[
											       
												{													
												xtype : 'component',
												width : 40,
												autoEl: {
											        tag: 'img',
											        src: contextPath+'/images/icon/minus48.png'
											    },
											    listeners: {
											         el: {
											             click: function() {
											            	 var cpmObj = Ext.ComponentQuery.query('#menu_amount_id')[0];
											            	 _value = parseInt(cpmObj.getValue());
											            	 if(_value >= 1){
											            		 cpmObj.setValue(_value - 1);
											            	 }
											              },
											              scope: this
											             }
											     }
											},
											     {
				                        		xtype : 'numberfield',
				                        		itemId : 'menu_amount_id',
									    	    height: 50,
									    	    minValue: 0,
									    	    maxValue: 9000000,
									    	    flex: 1,
									    	    value: 1
				                        	},{													
													xtype : 'component',
													width : 40,
													autoEl: {
												        tag: 'img',
												        src: contextPath+'/images/icon/plus48.png'
												    },
												    listeners: {
												         el: {
												             click: function() {
												            	 var cpmObj = Ext.ComponentQuery.query('#menu_amount_id')[0];
												            	 _value = parseInt(cpmObj.getValue())  + 1;
												            	 cpmObj.setValue(_value);
												              },
												              scope: this
												             }
												     }
												}
											]
									  },
		                               ,
			                        	{
			                        		xtype : 'button',
			                        		cls:'x-btn-small-extent',
			                        		text: 'Chọn',
			                        		width: 80,
			                        		itemId : 'btnSaveSrvc'
			                        	}
		                               ]
                    	  }]
                       }]
                      
                });
                // Load room list
                roomStore.getProxy().extraParams = {
					IS_USED : 1
				};
                var container = Ext.ComponentQuery.query('#form-list-room')[0];
                var myController = MANAGER.app.getController('MNG.controller.saleManagerController');
				myController.reloadRoomInit(roomStore);
				/* roomStore.load();
				roomStore.on('load',function (store, record, successful, eOpts ){
					for(var i = 0; i < record.length; i++){
						var recd = record[i];
						var roomId = recd.get('ROOM_ID');
						var roomNO = recd.get('ROOM_NO');
						var status = recd.get('IS_EMPTY');
						var isClose = false;
						if(status != null && status == 0)
							isClose = true;
						var tmpRoom = tmpButton.getContainer(roomId,roomNO, isClose);
						container.add(tmpRoom);
					}
					// Init data
					if(record.length < 1){
						var myController = MANAGER.app.getController('MNG.controller.saleManagerController');
						myController.setInitDataDefault();
					}
				}); */
				
				// Load menu
				var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
				var storeTmp = Grid.getStore();
				storeTmp.getProxy().extraParams={
					IS_USED: 1
				};
				storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
				storeTmp.currentPage = 1;
				storeTmp.pageSize= 15;
				storeTmp.load();
            }
        });
        
    </script>
</html>