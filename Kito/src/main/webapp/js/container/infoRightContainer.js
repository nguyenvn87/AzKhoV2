/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");
Ext.define('BS.infoRightContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'rightContainerID',
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
													
													collapseExpanseUtil.expanse('rightContainerID', isToogle);
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
                          id: 'iRightGrid',
                          itemId: 'iRightGrid',
                          //store: Ext.create('CH.store.etcStore'),
                          flex:1,
                          tbar:[{
		                                    xtype: 'button',
		                                    iconCls : 'icon-search',
		                                    action:'addEtc',
		                                    text: 'Thêm'
		                                },
		                                {
		                                    xtype: 'button',
		                                    iconCls : 'icon-delete',
		                                    action:'delEtc',
		                                    text: 'Xóa'
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
                                  dataIndex: 'CADASTRE_ID',
                                  text: 'CADASTRE_ID',
                                  hidden: true,
                                  flex: 0.5
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'SPTLUNIT_ID',
                                  hidden: true,
                                  text: 'SPTLUNIT_ID'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'ETCASSET_ID',
                                  hidden: true,
                                  text: 'ETCASSET_ID'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'ASSETCATAG_TYPE',
                                  hidden: true,
                                  text: 'ASSETCATAG_TYPE'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'SOURC_DSCR',
                                  text: 'SOURC_DSCR'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'AR',
                                  text: 'Diện tích (m2)'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'DTL_ADDR',
                                  flex: 1,
                                  text: 'Địa chỉ'
                              },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex:'MAP_ID',
                                  hidden: true,
                                  text: 'MAP_ID'
                              },{
                                  xtype: 'gridcolumn',
                                  dataIndex:'PARCEL_ID',
                                  hidden: true,
                                  text: 'PARCEL_ID'
                              },{
                                  xtype: 'gridcolumn',
                                  dataIndex:'SHARE_RT',
                                  flex: 0.5,
                                  text: 'SHARE_RT'
                              },
                              {
	                  				xtype : 'gridcolumn',
	                  				text : 'Thời hạn sở hữu',
	                  				flex: 0.5,
	                  				renderer :function(value, p , r){
	                  					data = r.data['FNISHDT'];
	                  					if(data != '' 
	                  						|| data.length == 8)
	                  						data = dateTool.convertToVNDateFromVarchar8(data);
	                  					return  data;
	                  				}
	                  		  },
                              {
                                  xtype: 'gridcolumn',
                                  dataIndex: 'FNISHDT',
                                  hidden: true,
                                  text: 'Thời hạn sở hữu'
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
  											collapseExpanseUtil.collapse('rightContainerID');
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