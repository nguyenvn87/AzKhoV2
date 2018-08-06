/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnStart', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	y: 100,
	title : 'Open room',
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
				itemId : 'btnOpenCloseRoom',
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
								xtype : 'container',
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items:[
									{
										xtype : 'numberfield',
										flex : 1,
										itemId:'HOUSE',
										name:'HOUSE',
										labelWidth : 80,
										width: 180,
										minValue: 0,
										maxValue: 24,
										fieldLabel : 'Giờ',
										emptyText: 'Giờ',
										listeners: {
										     afterrender: function(me) {
										    	 var nowTime = new Date();
										         me.setValue(nowTime.getHours());
										     }
										 }
									},{
										xtype : 'numberfield',
										fieldLabel: 'phút',
										emptyText : 'Phút',
										itemId:'MINUTES',
										name:'MINUTES',
										width: 180,
										minValue: 0,
										labelWidth : 80,
			                            maxValue: 60,
										regex: /^-?\d*\.?\d*$/,
										listeners: {
										     afterrender: function(me) {
										    	 var nowTime = new Date();
										         me.setValue(nowTime.getMinutes());
										     }
										 }
									}
								       ]
							},{
								xtype : 'datefield',
								itemId:'CHANGETIME',
								name:'CHANGETIME',
								format : 'd-m-Y',
								altFormats: 'Ymd',
								fieldLabel : 'Ngày',
								labelWidth : 80,
								value: new Date(),
								submitFormat: 'Y/m/d',
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
				itemId : 'BtnStartSrvc'
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
