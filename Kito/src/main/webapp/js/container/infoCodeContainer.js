/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");
Ext.define('BS.infoCodeContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'codeContainerID',
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
													
													collapseExpanseUtil.expanse('codeContainerID', isToogle);
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
		            cls: 'jdvn-sub-body detailData',
		            layout: {
		                align: 'stretch',
		                type: 'vbox'
		            },
		            items: [
		              {
                          xtype: 'gridpanel',
                          id: 'icodeGrid',
                          itemId: 'icodeGrid',
                          //store: Ext.create('CH.store.etcStore'),
                          flex:1,
                          tbar:[{
		                                    xtype: 'button',
		                                    iconCls : 'icon-add',
		                                    action:'addEtc',
		                                    text: 'Thêm'
		                                }
										],
                          columns: [
                              {
                            	  xtype: 'rownumberer',
                                  text: 'STT',
                                  align: 'center',
                          	      width: 50
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'GROUP_CD',
                                  text: 'GROUP_CD',
                                 // hidden: true,
                                  flex: 0.5
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'GROUP_NM',
                                 // hidden: true,
                                  text: 'GROUP_NM'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'CD_NM',
                                 // hidden: true,
                                  text: 'CD_NM'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'USE_YN',
                                 // hidden: true,
                                  text: 'USE_YN'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'DSCR',
                                  text: 'DSCR'
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
  											collapseExpanseUtil.collapse('codeContainerID');
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