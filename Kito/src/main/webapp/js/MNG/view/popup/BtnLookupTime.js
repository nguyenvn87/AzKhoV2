/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnLookupTime', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	y: 55,
	title : 'Chọn ngày tìm kiếm',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isActive : false,
	config : {
		idOfGrid : "",
		parentObj: null
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
								labelWidth : 80,
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
								labelWidth : 80,
								value: new Date(),
								emptyText : 'Ngày'
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
