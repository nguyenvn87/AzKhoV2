/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddRoomService', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	title : 'Cập nhật sản phẩm/dịch vụ',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isUseShare : true,
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//xtype: 'form',
				cls : 'jdvn-main',
				id : 'btnSrvcContainerId',
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
								xtype : 'textfield',
								itemId : 'PROD_NM',
								name : 'PROD_NM',
								fieldLabel : 'Tên',
								emptyText : 'Nhập tên'
							},{													
								xtype : 'simplecombobox',
								flex : 1,
								itemId:'UNIT',
								name:'UNIT',
								fieldLabel : 'Đơn vị',
								emptyText: 'Chọn đơn vị',
								datatype: 'combo',
								scrid: 'DONVI',
								autoload: false
							},{													
								xtype : 'simplecombobox',
								flex : 1,
								itemId:'TYPE',
								name:'TYPE',
								fieldLabel : 'Loại',
								emptyText: 'Chọn loại',
								datatype: 'combo',
								scrid: 'DIHVU',
								autoload: false
							},{
								xtype : 'textfield',
								itemId : 'DSCRT',
								name : 'DSCRT',
								flex : 1,
								autoLoad : false,
								mode : 'local',
								editable : true,
								fieldLabel : 'Mô tả',
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
				itemId : 'BtnSaveSrvc'
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
	}
});
