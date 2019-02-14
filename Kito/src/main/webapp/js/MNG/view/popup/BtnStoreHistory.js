/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var historyStore = Ext.create('MNG.store.srvcStore');

Ext.define('MNG.view.popup.BtnStoreHistory', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 800,
	y: 10,
	title : 'Lịch sử tồn kho',
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
				itemId : 'btnStoreContainerId',
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

								xtype : 'gridpanel',
								flex : 1,
								itemId: 'grid-store-history',
								minHeight : 300,
								maxHeight : 400,
								store : historyStore,
								pageSize : 10,
								columns : [{
                                         xtype: 'gridcolumn',
                                         width: 30,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'rn1',
                                         text: 'TT'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         text: 'Ngày',
                                         width: 90,
                                         renderer :function(value, p , r){
                            					data = r.data['HIS_CHANGE_TIME'];
                            					console.log(data);
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					console.log(data);
                            					return  data;
                            				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'SRVC_NM',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Tên hàng',
                                         width: 120
                                      },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'HIS_NOTE',
                                         sortable:false,
                                         text: 'SL tồn thay đổi trong ngày',
                                         flex: 0.5
                                      },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'AMOUNT_STORE',
                                         sortable:false,
                                         align: 'center',
                                         text: 'Số lượng',
                                         width: 100,
                                         renderer : function(value, p, r) {
											return '<span style="color: red">'+value+'</span>';
										 }
                                     }
								],
								dockedItems: [
			                                     {
			                                         xtype: 'pagingtoolbar',
			                                         dock: 'bottom',
			                                         store: historyStore,
			                                         displayInfo: true
			                                     }
			                                 ]
							}
							]
				} ]
			}
			]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
		}
	},
	loadAndShow:function(_value, _title){
		me = this;
		me.title = _title;
		var Grid = Ext.ComponentQuery.query('#grid-store-history')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				SRVC_ID: _value
		};
		storeTmp.getProxy().url = contextPath + '/srvc/getListSrvcHistory.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=20;
		storeTmp.load();
	},
});
