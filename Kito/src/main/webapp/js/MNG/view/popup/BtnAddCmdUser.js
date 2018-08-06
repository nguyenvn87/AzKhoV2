/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var srvcListStore = Ext.create('MNG.store.srvcStore',{});

//srvcListStore.getProxy().url = contextPath + '/getListAllSrvcVo.json';
//srvcListStore.load();

Ext.define('MNG.view.popup.BtnAddCmdUser', {
	extend : 'Ext.window.Window',
	Height : 500,
	width : 600,
	y: 10,
	title : 'Cập nhật menu',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	CD : null,
	config:{
		groupcd: '',
		code: null,
		name: 'Tên',
		value: '',
		emptytxt: 'Nhập tên'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				itemId : 'btnMenuContainerId',
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
						items : [
						         {
									xtype : 'combo',
									itemId : 'SRVC_ID',
									name : 'SRVC_ID',
									height: 30,
									hidden: true,
									//disabled: true,
									//readOnly: true,
									editable: false,
									store: srvcListStore,
									displayField: 'SRVC_NM',
								    valueField: 'SRVC_ID',
									fieldLabel : 'Tên sản phẩm',
									emptyText : 'Nhập tên sp/dịch vụ',
									//enableKeyEvents: true,
									/*listeners:{
										'keyup': function(key){
											alert(key.getValue());
											var valueKey = key.getValue();
											srvcListStore.clearFilter();
											console.log(srvcListStore);
											srvcListStore.filter('SRVC_ID', valueKey);
											console.log(srvcListStore);
										}
									}*/
								},
						        {
									xtype : 'textfield',
									fieldLabel: me.config.name,
									itemId:'CD',
									hidden: true,
									//emptyText : me.config.emptytxt,
									//valueField: me.config.value,
									height: 30
								},{
									xtype : 'textfield',
									fieldLabel: me.config.name,
									itemId:'CD_NM',
									emptyText : me.config.emptytxt,
									valueField: me.config.value,
									height: 30
								},
								{													
									xtype : 'combo',
									flex : 1,
									itemId:'ACTIVE',
									height: 30,
									name:'ACTIVE',
									fieldLabel : 'Sử dụng',
									emptyText: 'Chọn trạng thái',
									store: Ext.create('Ext.data.Store',{
										fields: ['value', 'name'],
									    data : [
									        {"value":1, "name":"Có"},
									        {"value":0, "name":"Không"}]
									}),
									displayField: 'name',
								    valueField: 'value',
								    value: 1,
								},
								{													
									xtype : 'combo',
									flex : 1,
									itemId:'IS_DEFAULT',
									name:'IS_DEFAULT',
									height: 30,
									fieldLabel : 'Đăt mặc định',
									emptyText: 'Chọn trạng thái',
									store: Ext.create('Ext.data.Store',{
										fields: ['value', 'name'],
									    data : [
									        {"value":1, "name":"Kích hoạt"},
									        {"value":0, "name":"Hủy"}]
									}),
									displayField: 'name',
								    valueField: 'value',
								    value: 1,
								}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				height: 40,
				action : 'saveSrvc',
				text : 'Lưu',
				itemId : 'BtnSaveMenu'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 40,
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').hide();
						console.log(srvcListStore);
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			//var storeTmp = Ext.ComponentQuery.query('#btnMenuContainerId #PROD_NM')[0];
			//storeTmp.getStore().load();
			//console.log(srvcListStore);
		}
	},
	changeType:function(combo, value){
		
		Ext.each(srvcListStore, function(record){
    		console.log('1');
    	});
	},
	setDeactiveCreate: function(isActive){
		var comboTmp = Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0];
		comboTmp.readOnly = isActive;
	},
	initNew:function(){
		
		//Ext.ComponentQuery.query('#btnMenuContainerId #SRVC_ID')[0].setValue('');
		Ext.ComponentQuery.query('#btnMenuContainerId #CD')[0].setValue('');
		Ext.ComponentQuery.query('#btnMenuContainerId #CD_NM')[0].setValue('');
		//Ext.ComponentQuery.query('#btnMenuContainerId #ACTIVE')[0].setValue(1);
		//Ext.ComponentQuery.query('#btnMenuContainerId #IS_DEFAULT')[0].setValue(0);
	}
});
