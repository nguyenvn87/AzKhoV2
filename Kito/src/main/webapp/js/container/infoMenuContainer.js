/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");


Ext.define('BS.infoMenuContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'menuContainerID',
	title: '',
	titleContent:'',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
		    items: [
		        {
		            xtype: 'container',
		            cls: 'jdvn-sub-header',
		            layout : {
						align : 'stretch',
						type : 'hbox'
					},
		            items: [{
						xtype : 'container',
						width : 200,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '',
									value : me.title,
									fieldCls : 'x-form-display-field title'
								}]
					}, 
					 {
						xtype : 'container',
						cls : 'description',
						flex : 1,
						items : [{
							xtype : 'displayfield',
							fieldLabel : '',
							value : me.titleContent,
						}
						]
					}, {
						xtype : 'container',
						width : 100,
						layout : {
							align : 'middle',
							pack : 'center',
							type : 'hbox'
						},
						items : [
						         {
									xtype : 'component',
									itemId : 'btnEditPrcInfo',
									autoEl : {
										tag : 'a',
										href : '#',
										html : LA_LK_001
									},
	
									listeners : {
										render : function(c) {
											c.getEl().on({
												click : function() {
													var enableToogle = Ext.ComponentMgr
															.get('enableToogle');
													var isToogle = false;
													if (enableToogle != null
															&& enableToogle.checked) {
														isToogle = true;
													}
													
													collapseExpanseUtil.expanse('menuContainerID', isToogle);
												}
											});
										}
									},
									hidden : false,
									cls : 'fn-link editButton'
	
								}
						     ]
					}]
		        },
		        {
		            xtype: 'container',
		            hidden: true,
		            itemId: 'menuGridContainerID',
		            cls: 'jdvn-sub-body detailData',
		            layout: {
		                align: 'stretch',
		                type: 'vbox'
		            },
		            items: [
		              {
								 xtype: 'gridpanel',
                                 itemId:'grid-menu',
                                 //flex: 1,
                                 minHeight: 200,
                                 maxHeight: 500,
                                // maxHeight: 300,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: Ext.create('MNG.store.menuStore',{}),
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
                                         flex: 0.5,
                                         sortable:false,
                                         align:'center',
										 hidden: true,
                                         dataIndex: 'MENU_ID',
                                         text: "Max"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         sortable:false,
										 hidden: true,
                                         align:'center',
                                         dataIndex: 'SRVC_ID',
                                         text: 'SRVC_ID'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         align:'left',
                                         sortable:false,
                                         dataIndex: 'PROD_NM',
                                         text: 'Tên sp/dịch vụ',
                                         summaryType: 'count',
                                         summaryRenderer: function(value){
                                             return 'Tổng'; 
                                         }
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PRICE',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Giá (vnđ)',
                                         flex: 1 
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 120,
             							sortable : false,
             							align : 'right',
             							text : "Giá (vnđ)",
             							summaryType: 'sum',
             							renderer :function(value, p , r){
                           					data = r.data['PRICE'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						},
             						{
                                        xtype: 'gridcolumn',
                                        sortable:false,
                                        dataIndex: 'UNIT',
                                        hidden: true,
                                        text: 'Đơn vị',
                                        width : 80
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        sortable:true,
                                        dataIndex: 'UNIT_NM',
                                        text: 'Đơn vị',
                                        width : 80
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        sortable:false,
                                        hidden: true,
                                        text: 'Đặt mặc định',
                                        dataIndex: 'IS_DEFAULT',
                                        width : 100
                                    },
                                    {
						                menuDisabled: true,
						                sortable: false,
						                text: 'Mặc định',
						                xtype: 'actioncolumn',
						                align : 'center',
						                width: 80,
						                items: [{
						                    iconCls : 'icon-true',
						                    tooltip: 'Đã đặt mặc định',
						                    getClass: function(value,metadata,record){
						                    	var isDefault = record.get('IS_DEFAULT');
						                    	if(isDefault == 0){
						                    		return 'x-hide-display';
						                        }
						                    	else return 'icon-true';
						                    }
						                }]
						            },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ACTIVE',
                                        align : 'center',
                                        sortable:true,
                                        text: 'Kích hoạt',
                                        width : 60
                                    },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'RESTAR_ID',
                                         hidden: true,
                                         sortable:false,
                                         text: 'RESTAR_ID',
                                         flex: 0.5
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-add',
                                	 	itemId: 'addMenuBtn'
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         displayInfo: true
                                     }
                                 ]
                      },
                      {
  						xtype : 'container',
  						flex : 1,
  						layout : {
  							align : 'stretch',
  							pack : 'end',
  							type : 'hbox'
  						},
  						items : [{
  							itemId : 'btnHidePrcInfo',
  							xtype : 'component',
  							autoEl : {
  								tag : 'a',
  								href : '#',
  								html : LA_LK_002
  							},
  							listeners : {
  								render : function(c) {
  									c.getEl().on({
  										click : function() {
  											collapseExpanseUtil.collapse('menuContainerID');
  										}
  									});
  								}
  							},
  							cls : 'fn-link foldButton'
  						}]
  					}
		            ]
		        }
		        
		    ]
		});
		
		me.callParent(arguments);
	}
});            