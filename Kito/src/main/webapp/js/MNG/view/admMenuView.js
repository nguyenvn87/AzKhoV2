

Ext.define('MNG.view.admMenuView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
						xtype : 'container',
						cls : 'jdvn-sub-body',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
							cls : 'row'
						},
						items : [
							{
								 xtype: 'gridpanel',
                                 id:'grid-parcel-search',
                                 //flex: 1,
                                 minHeight: 300,
                                 maxHeight: 300,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 listeners : {
                             	    itemdblclick: function(dv, record, item, index, e) {
                             	    }
                             	},
                                 store: Ext.create('Ext.data.Store',{
                             		storeId: 'ParcelSearchStore',
                             		autoLoad: false, 
                             		fields: [
                             			{ name: 'DTL_ADDR', 	type: 'string'},
                             			{ name: 'TENCHU', 		type: 'string'},
                             			{ name: 'COMMUNE_ID', 	type: 'number'},
                             			{ name: 'MAP_ID', 		type: 'number'},
                             			{ name: 'PARCEL_ID', 	type: 'number'},
                             			{ name: 'AR', 			type: 'number'},
                             			{ name: 'LANDUSE_TP', 	type: 'string'},
                             			{ name: 'SCALE_TYPE', 	type: 'string'},
                             			{ name: 'PARTY_NM', 	type: 'string'},
                             			{ name: 'ADMZONE_ID', 	type: 'string'}
                             		],
                             		 proxy: {
                             				type: 'ajax',											
                             				url: contextPath +'/SpatialUnit/SptlUnit/Cadamap.json',
                             				//extraParams : { COMMUNE_ID : loggedUserCMU_CD },
                             				reader: {
                             					type: 'json',
                             					root: 'data', 						
                             					totalProperty: 'totalCount',						
                             					messageProperty: 'message',
                             		            successProperty: 'success'
                             				},
                             				listeners: { 
                             					exception: function(proxy, response, options) {
                             						requestMessageProcessor(proxy, response);
                             					}
                             				},
                             				afterRequest: function(request, success) {
                             					requestMessageProcessor(request.scope, request.operation.response);
                             				}
                             				
                             			}
                                 }),
                                 columns: [
                                     {
                                         xtype: 'gridcolumn',
                                         width: 50,
                                         sortable:false,
                                         align:'center',
                                         text: 'Số TT'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'PARCEL_ID',
                                         text: "Nhóm"
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'SCALE_TYPE',
                                         text: 'Họ Tên'
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         flex: 0.5,
                                         align:'center',
                                         sortable:false,
                                         dataIndex: 'AR',
                                         text: 'Ngày sinh'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DTL_ADDR',
                                         sortable:false,
                                         text: 'Địa chỉ',
                                         flex: 1
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PARTY_NM',
                                         sortable:false,
                                         text: 'Điện thoại',
                                         flex: 0.5
                                     }
                                 ],
                                 tbar: [{
                                	 	text: 'Thêm mới',
                                	 	iconCls: 'icon-search',
                                	 	listeners: {
                                	 		click:  function() {
                                	 			
 		                                	}
 		                                	}
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: 'ParcelSearchStore',
                                         displayInfo: true
                                     }
                                 ]
							}
						]
					}]
                }
            ]
        });
        me.callParent(arguments);
    }
});