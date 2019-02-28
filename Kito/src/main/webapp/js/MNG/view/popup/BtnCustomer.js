/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

var tmpComboStore = Ext.create('MNG.store.cdUserStore',{});

Ext.define('MNG.view.popup.BtnCustomer', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 600,
	y: 10,
	//x: 10,
	title : 'Cập nhật thông tin khách hàng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	srvdId : null,
	config : {
		cusName : null,
		cusID: 0,
		cusPhone:'',
		cusEmail:'',
		cusAddr:'',
		accumult: 0
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//cls : 'jdvn-main',
				itemId : 'addCustomerId',
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
					        	//title: 'Thông tin cá nhân',
					        	padding : '10 10 10 10',
					        	flex: 1,
								layout : {
									align : 'stretch',
									type : 'vbox'
								},
								items:[
								       {
								    	   xtype : 'textfield',
								    	   name : 'NAME',
								    	   itemId: 'NAME',
								    	   height: 30,
								    	   fieldLabel : 'Tên khách hàng',
								    	   emptyText : 'Nhập tên khách hàng'
								       },
								        {
								    	   xtype : 'textfield',
								    	   name : 'PHONE',
								    	   itemId: 'PHONE',
								    	   height: 30,
								    	   fieldLabel : 'Điện thoại',
								    	   emptyText : 'Điện thoại'
								    	},
								       {
								    	   xtype : 'textfield',
								    	   name : 'EMAIL',
								    	   itemId: 'EMAIL',
								    	   height: 30,
								    	   fieldLabel : 'Email',
								    	   emptyText : 'Email'
								      
								       },
								       {
											xtype : 'textfield',
											itemId : 'ADDR',
											name : 'ADDR',
											flex : 1,
											fieldLabel : 'Địa chỉ',
											emptyText : 'Nhập địa chỉ'
										},
										{
											xtype : 'numberfield',
											fieldLabel: 'Điểm',
											itemId : 'ACCUMULT',
											name:'ACCUMULT',
											height: 30,
											minValue: 0,
											value: 0,
				                            maxValue: 1000000,
											regex: /^-?\d*\.?\d*$/
								       }
								]
							}
							  ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				action : 'saveSrvc',
				text : 'Lưu',
				iconCls : 'icon-true',
				itemId : 'BtnSaveSrvc'
			}, {
				xtype : 'button',
				iconCls : 'icon-delete',
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
	initNew:function(){
		var me = this;
		Ext.ComponentQuery.query('#addCustomerId #NAME')[0].setValue(me.config.cusName);
		Ext.ComponentQuery.query('#addCustomerId #PHONE')[0].setValue(me.config.cusPhone);
		Ext.ComponentQuery.query('#addCustomerId #EMAIL')[0].setValue(me.config.cusEmail);
		Ext.ComponentQuery.query('#addCustomerId #ADDR')[0].setValue(me.config.cusAddr);
		Ext.ComponentQuery.query('#addCustomerId #ACCUMULT')[0].setValue(me.config.accumult);
	}
});
