/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");


Ext.define('BS.infoUserContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'userContainerID',
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
													
													collapseExpanseUtil.expanse('userContainerID', isToogle);
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
		            itemId: 'AdminContainerID',
		            cls: 'jdvn-sub-body detailData',
		            layout: {
		                align: 'stretch',
		                type: 'vbox'
		            },
		            items: [
		              {
									 xtype: 'gridpanel',
	                                 itemId:'grid-user',
	                                 minHeight: 100,
	                                 maxHeight: 300,
	                                 pageSize:10,
	                                 padding:'10 0 0 0',
	                                 autoScroll: true,
	                                 store: Ext.create('MNG.store.userStore',{}),
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
	                                         sortable:true,
	                                         align : 'left',
	                                         dataIndex: 'USERNAME',
	                                         text: "User"
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         flex: 0.5,
	                                         sortable:true,
	                                         align : 'left',
	                                         dataIndex: 'FULLNAME',
	                                         text: 'Họ tên'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         width: 90,
	                                         sortable:false,
	                                         align : 'left',
	                                         dataIndex: 'CMND',
	                                         text: 'Số CMND'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         align : 'left',
	                                         sortable:false,
	                                         dataIndex: 'ADDRESS',
	                                         hidden: true,
	                                         text: 'Địa chỉ'
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'PHONE',
	                                         align : 'left',
	                                         sortable:false,
	                                         text: 'Điện thoại',
	                                         width: 90
	                                          
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'EMAIL',
	                                         sortable:false,
	                                         text: 'Email',
	                                         flex: 0.5
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         dataIndex: 'ENABLED',
	                                         sortable:false,
	                                         hidden: true,
	                                         text: 'Enabled',
	                                         width: 90
	                                     },
	                                     {
	                                         xtype: 'gridcolumn',
	                                         sortable:true,
	                                         text: 'Enabled',
	                                         width: 90,
	                                         renderer :function(value, p , r){
	 	                       					data = r.data['ENABLED'];
	 	                       					if(data == '0')
	 	                       						data = 'Đang khóa';
	 	                       					else if(data == '1')
 	                       						data = 'Kích hoat'; 
	 	                       					return  data;
	 	                       				}
	                                     },
	                                     
	                                 ],
	                                 tbar: [{
	                                	 	text: 'Thêm mới',
	                                	 	iconCls: 'icon-add',
	                                	 	itemId: 'addUserBtn'
	 		                                },
	 		                               {
	 	                                	text: 'Xóa',
	 	                                	hidden: true,
	 	                                	iconCls: 'icon-search',
	 	                                	itemId: 'delUserBtn'
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
  											collapseExpanseUtil.collapse('userContainerID');
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