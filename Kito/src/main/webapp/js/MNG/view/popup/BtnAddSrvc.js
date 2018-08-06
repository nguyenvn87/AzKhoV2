/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var useStore = Ext.create('Ext.data.Store',{
								fields: ['value', 'name'],
								data : [
								       {"value":1, "name":"Đang kinh doanh"},
								       {"value":0, "name":"Ngừng kinh doanh"}]
								});
var tmpComboStore = Ext.create('MNG.store.cdUserStore',{});

Ext.define('MNG.view.popup.BtnAddSrvc', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 800,
	y: 10,
	//x: 10,
	title : 'Cập nhật sản phẩm/dịch vụ',
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
				id : 'btnSrvcContainerId',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'hbox'
					},
					items : [
					         {
					        	xtype : 'fieldset',
					        	title: 'Sản phẩm',
					        	padding : '10 10 10 10',
					        	flex: 1,
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								items:[
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'SRVC_NM',
								    	   name : 'SRVC_NM',
								    	   height: 30,
								    	   fieldLabel : 'Tên SP',
								    	   emptyText : 'Nhập tên sản phẩm'
								       },
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'SRVC_CD',
								    	   name : 'SRVC_CD',
								    	   height: 30,
								    	   fieldLabel : 'Mã SP',
								    	   emptyText : 'Mã code'
								       },{
											xtype : 'numberfield',
											fieldLabel: 'Giá bán (vnđ)',
											itemId:'PRICE',
											emptyText : 'Giá bán',
											height: 30,
											minValue: 0,
											value: 0,
				                            maxValue: 1000000,
											regex: /^-?\d*\.?\d*$/
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
											xtype : 'combo',
											flex : 1,
											itemId:'TYPE',
											name:'TYPE',
											fieldLabel : 'Nhóm hàng',
											emptyText: 'Chọn nhóm',
											store: tmpComboStore,
											displayField: 'CD_NM',
										    valueField: 'CD',
										    value: null
								       	}
								]
							},
							 {
								xtype : 'fieldset',
								title: 'Thiết lập thêm',
								flex: 1,
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								padding : '10 10 10 10',
								defaults : {
										cls : 'jdvn-sub-body'
									},
								items : [{
											xtype : 'numberfield',
											fieldLabel: 'Tích lũy(đ)',
											itemId:'ACCUMULT',
											name:'ACCUMULT',
											emptyText : 'Tích lũy',
											height: 30,
											minValue: 0,
											value: 0,
				                            maxValue: 100000000,
											regex: /^-?\d*\.?\d*$/
								       },
									{													
											xtype : 'combo',
											//flex : 1,
											itemId:'IS_DEFAULT',
											name:'IS_DEFAULT',
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
									},
									{													
										xtype : 'combo',
										//flex : 1,
										itemId:'IS_USED',
										name:'IS_USED',
										fieldLabel : 'Trạng thái KD',
										emptyText: 'Chọn trạng thái',
										store: useStore,
										displayField: 'name',
										valueField: 'value',
										value: useStore.first()
									},
									{
										xtype : 'numberfield',
										itemId : 'SORT_NO',
										name : 'SORT_NO',
										flex : 1,
										minValue: 0,
										value: 100,
										maxValue: 100000000,
										fieldLabel : 'Mức ưu tiên'
									},
									{
										xtype : 'textfield',
										itemId : 'DSCRT',
										name : 'DSCRT',
										flex : 1,
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
	},
	listeners:{
		afterrender:function(){
			tmpComboStore.getProxy().extraParams = {
						GROUP_CD: 'GRHAG',
					};
			tmpComboStore.load();
		}
	},
	initNew:function(){
		Ext.ComponentQuery.query('#btnSrvcContainerId #SRVC_NM')[0].setValue('');
		Ext.ComponentQuery.query('#btnSrvcContainerId #ACCUMULT')[0].setValue(0);
		Ext.ComponentQuery.query('#btnSrvcContainerId #IS_USED')[0].setValue(1);
		Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].setValue('');
	}
});
