/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnChangeRoom', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 400,
	title : 'Đổi phòng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	roomFrom : null,
	y: 10,
	roomTo: null,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				itemId : 'changeRoomContainerId',
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
									itemId : 'FROM_ROOM',
									name : 'FROM',
									flex : 1,
									readOnly: true,
									fieldLabel : 'Từ phòng',
								},{													
									xtype : 'combo',
									flex : 1,
									itemId:'TO_ROOM',
									name:'TO_ROOM',
									fieldLabel : 'Sang phòng',
									emptyText: 'Chọn phòng chuyển',
									displayField: 'ROOM_NO',
									valueField: 'ROOM_ID',
									store: roomComboStore
								},{
									xtype : 'textfield',
									itemId : 'DSCRT',
									name : 'DSCRT',
									flex : 1,
									mode : 'local',
									editable : true,
									fieldLabel : 'Ghi chú',
								}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'save',
				text : 'Lưu',
				itemId : 'btnSaveChangeRoom'
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
	setFromRoom:function(roomId, roomNm){
		var compnt = Ext.ComponentQuery.query('#FROM_ROOM')[0];
		compnt.setValue(roomNm);
	}
});
