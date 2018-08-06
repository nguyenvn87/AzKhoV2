/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var srvcListStore = Ext.create('MNG.store.srvcStore',{});
srvcListStore.load();
Ext.define('MNG.view.popup.BtnPopStore', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	y: 10,
	title : 'Cập nhật kho hàng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	menuId : null,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//xtype: 'form',
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
								xtype : 'combo',
								itemId : 'SRVC_ID',
								name : 'SRVC_ID',
								disabled: true,
								//readOnly: true,
								store: srvcListStore,
								displayField: 'SRVC_NM',
							    valueField: 'SRVC_ID',
								fieldLabel : 'Tên sản phẩm',
								emptyText : 'Nhập tên sp/dịch vụ',
								listeners:{
									'keyup': function(key){
										alert(key.getValue());
										var valueKey = key.getValue();
										srvcListStore.clearFilter();
										console.log(srvcListStore);
										srvcListStore.filter('SRVC_ID', valueKey);
										console.log(srvcListStore);
									}
								}
							},{													
								xtype : 'numberfield',
								fieldLabel: 'Số lượng tồn',
								itemId:'AMOUNT_STORE',
								emptyText : 'Số lượng',
								minValue: 0,
								value: 0,
	                            maxValue: 1000000,
								regex: /^-?\d*\.?\d*$/
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
				text : 'Lưu',
				itemId : 'BtnSaveStore'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').hide();
						
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
		}
	},
	changeType:function(combo, value){
		
	},
	setDeactiveCreate: function(isActive){
	}
});
