/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
var collapseExpanseUtil = Ext.create("BIZ.utilities.collapseExpanseSupport");


Ext.define('BS.infoRoomContainer',{
	extend : 'Ext.container.Container',
	cls : 'jdvn-sub',
	itemId : 'roomContainerID',
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
													
													collapseExpanseUtil.expanse('roomContainerID', isToogle);
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
		            itemId: 'roomGridContainerID',
		            cls: 'jdvn-sub-body detailData',
		            layout: {
		                align: 'stretch',
		                type: 'vbox'
		            },
		            items: [
		              {
														xtype : 'gridpanel',
														itemId : 'grid-room',
														// flex: 1,
														//minHeight : 200,
														maxHeight : 300,
														pageSize : 10,
														padding : '10 0 0 0',
														autoScroll : true,
														store : Ext
																.create(
																		'MNG.store.roomStore',
																		{}),
														columns : [
																{
																	xtype : 'rownumberer',
																	sortable : false,
																	width: 30,
																	align : 'center',
																	text : 'TT'
																},
																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	sortable : false,
																	align : 'center',
																	hidden: true,
																	dataIndex : 'ROOM_ID',
																	text : "ROOM_ID"
																},
																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	sortable : true,
																	align : 'left',
																	dataIndex : 'ROOM_NO',
																	text : 'Số phòng '
																},

																{
																	xtype : 'gridcolumn',
																	flex : 0.5,
																	align : 'center',
																	sortable : false,
																	dataIndex : 'ROOM_FLOR',
																	text : 'Tầng số'
																},
																{
																	xtype : 'gridcolumn',
																	dataIndex : 'ROOM_TYPE',
																	sortable : false,
																	hidden: true,
																	text : 'Loại phòng',
																	flex : 1

																},
																{
																	xtype : 'gridcolumn',
																	dataIndex : 'ROOM_TYPE_NM',
																	sortable : true,
																	text : 'Loại phòng',
																	flex : 1

																},
																{
																	xtype : 'gridcolumn',
																	dataIndex : 'RESTAR_ID',
																	sortable : false,
																	text : 'RESTAR_ID',
																	flex : 0.5
																} ],
														tbar : [ {
															text : 'Thêm mới',
															iconCls : 'icon-add',
															itemId: 'btnRoomForm',
														}],
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
  											collapseExpanseUtil.collapse('roomContainerID');
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