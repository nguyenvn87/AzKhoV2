/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var srvcListStore = Ext.create('MNG.store.srvcStore', {});
srvcListStore.getProxy().url = contextPath +'/getSearchListMenu.json',

Ext.define('MNG.view.popup.BtnTimKiemNangCao', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 500,
	y: 10,
	title : 'Tìm kiếm nâng cao',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isActive : false,
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				itemId : 'btnLookupTime',
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
					items : [ {
						xtype : 'container',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
								cls : 'jdvn-sub-body',
								flex : 1
							},
						items : [{
								xtype : 'datefield',
								itemId:'STARTTIME',
								name:'STARTTIME',
								format : 'd-m-Y',
								altFormats: 'Ymd',
								submitFormat: 'Y/m/d',
								fieldLabel : 'Từ ngày',
								//labelWidth : 80,
								value: new Date(),
								emptyText : 'Ngày'
							},
							{
								xtype : 'datefield',
								itemId:'ENDTIME',
								name:'ENDTIME',
								format : 'd-m-Y',
								altFormats: 'Ymd',
								fieldLabel : 'Đến ngày',
								submitFormat: 'Y/m/d',
								//labelWidth : 80,
								value: new Date(),
								emptyText : 'Ngày'
							},{
								xtype : 'combo',
								itemId : 'USERNAME',
								name : 'USERNAME',
								fieldLabel : 'Nhân viên',
								emptyText : 'Chọn nhân viên',
								store : useStore,
								displayField : 'FULLNAME',
								valueField : 'USERNAME',
								value : '',
								autoload : false
							},{
								xtype : 'combo',
								fieldLabel : "Tên mặt hàng",
								store : srvcListStore,
								name : 'SRVC_ID',
								displayField : 'SRVC_NM',
								valueField : 'SRVC_ID',
								anchor : '100%',
								emptyText : 'Tìm mặt hàng theo tên hoặc mã code',
								minChars : 1,
								flex : 1,
								listConfig : {
											loadingText : 'Searching...',
											emptyText : 'No matching posts found.',
											getInnerTpl : function() {
												return '<a class="search-item">' 
								                        + '<h3>{SRVC_NM}<br /><span>Mã: {SRVC_CD}</span></h3>'
								                        + '{UNIT_NM}-{DSCRT}.' 
								                        + '</a>';
											}
										},
								pageSize : 10,
								listeners : {
									select: function(obj,record){
										var data = record[0].raw;
										var tmpValue = data['CUS_CD'];
										return true;
									}}
								}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveSrvc',
				text : 'Ok',
				itemId : 'btnSubmitLookupTime'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Cancel',
				listeners : {
					click : function() {
						this.up('.window').hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
	}
});
