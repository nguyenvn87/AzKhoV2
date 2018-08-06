/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");


Ext.define('BS.infoSrvcContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'srvcContainerID',
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
													
													collapseExpanseUtil.expanse('srvcContainerID', isToogle);
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
		            itemId: 'srvcGridContainerID',
		            cls: 'jdvn-sub-body detailData',
		            layout: {
		                align: 'stretch',
		                type: 'vbox'
		            },
		            items: [
		              {
							 xtype: 'gridpanel',
                             itemId:'grid-srvc',
                             minHeight: 150,
                             maxHeight: 300,
                             pageSize:10,
                             padding:'10 0 0 0',
                             autoScroll: true,
                             store: Ext.create('MNG.store.srvcStore',{}),
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
                                     sortable:false,
                                     align:'center',
                                     hidden: true,
                                     dataIndex: 'SRVC_ID',
                                     text: "SRVC_ID"
                                 },
                                 {
                                     xtype: 'gridcolumn',
                                     sortable:true,
                                     align:'left',
                                     flex: 0.5,
                                     dataIndex: 'SRVC_NM',
                                     text: 'Tên'
                                 },
                                 
                                 {
                                     xtype: 'gridcolumn',
                                     align:'center',
                                     sortable:true,
                                     hidden: true,
                                     dataIndex: 'UNIT',
                                     text: 'Đơn vị'
                                 },
                                 {
                                     xtype: 'gridcolumn',
                                     align:'center',
                                     sortable:true,
                                     dataIndex: 'UNIT_NM',
                                     text: 'Đơn vị'
                                 },
								 {
                                     xtype: 'gridcolumn',
                                     dataIndex: 'TYPE_NM',
                                     sortable:true,
                                     text: 'Nhớm hàng/dịch vụ',
                                     flex: 0.3
                                 },
                                 {
                                     xtype: 'gridcolumn',
                                     dataIndex: 'DSCRT',
                                     sortable:false,
                                     text: 'Mô tả',
                                     flex: 1
                                      
                                 },
                                 {
                                     xtype: 'gridcolumn',
                                     dataIndex: 'RESTAR_ID',
                                     sortable:false,
                                     hidden: true,
                                     text: 'RESTAR_ID',
                                     flex: 0.5
                                 }
                             ],
                             tbar: [{
                            	 	text: 'Thêm mới',
                            	 	iconCls: 'icon-add',
                            	 	itemId: 'addSrvcBtn'
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
  											collapseExpanseUtil.collapse('srvcContainerID');
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