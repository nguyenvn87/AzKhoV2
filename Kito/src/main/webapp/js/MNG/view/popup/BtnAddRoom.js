/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var useStore = Ext.create('Ext.data.Store',{
								fields: ['value', 'name'],
								data : [
								       {"value":'1', "name":"Có"},
								       {"value":'0', "name":"Không"}]
								});
var tmpComboStore = Ext.create('MNG.store.cdUserStore',{});
Ext.define('MNG.view.popup.BtnAddRoom', {
	extend : 'Ext.window.Window',
	minHeight : 200,
	width : 500,
	title : 'Cập nhật phòng',
	maxHeight : 600,
	y: 10,
	closeAction : 'hide',
	resizable : false,
	roomId : null,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//xtype: 'form',
				cls : 'jdvn-main',
				id : 'btnRoomContainerId',
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
								itemId : 'ROOM_ID',
								name : 'ROOM_ID',
								fieldLabel : 'Tên phòng',
								regex : /^-?\d*\.?\d*$/,
								emptyText : 'Nhập tên phòng',
								hidden: true
							}, 
							{
								xtype : 'textfield',
								itemId : 'ROOM_NO',
								name : 'ROOM_NO',
								flex : 1,
								autoLoad : false,
								mode : 'local',
								editable : true,
								fieldLabel : 'Tên phòng',
								emptyText : 'Nhập tên phòng'
							},
							{
								xtype : 'combo',
								itemId : 'ROOM_FLOR',
								flex : 1,
								name : 'ROOM_FLOR',
								store: tmpComboStore,
								displayField: 'CD_NM',
								valueField: 'CD',
								fieldLabel : 'Khu vực',
								emptyText : 'Chọn khu vực'
							},
							{													
								xtype : 'combo',
								flex : 1,
								itemId:'IS_USED',
								name:'IS_USED',
								fieldLabel : 'Trạng thái SD',
								emptyText: 'Chọn trạng thái',
								editable: false,
								store: useStore,
								displayField: 'name',
								valueField: 'value',
								value: useStore.first()
							} ]
			}
			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveRoom',
				text : 'Lưu',
				itemId : 'BtnSaveRooom'
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
			tmpComboStore.getProxy().extraParams = {
						GROUP_CD: 'KHUVC',
					};
			tmpComboStore.load();
		}
	},
	initNew:function(){
		 Ext.ComponentQuery.query('#btnRoomContainerId #ROOM_NO')[0].setValue('');
		 Ext.ComponentQuery.query('#btnRoomContainerId #IS_USED')[0].setValue(useStore.first());
	}
});
