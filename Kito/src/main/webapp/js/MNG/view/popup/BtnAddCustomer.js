/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

var tmpComboStore = Ext.create('MNG.store.cdUserStore',{});

Ext.define('MNG.view.popup.BtnAddCustomer', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 600,
	y: 10,
	//x: 10,
	title : 'Cập nhật TT khách hàng',
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
					        	title: 'Thông tin cá nhân',
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
											name:'SCORE',
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
				cls : 'button',
				action : 'saveSrvc',
				text : 'Lưu',
				itemId : 'BtnSaveSrvc',
				listeners : {
					click : function() {
						me.createCustomer();
					}
				}
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
		Ext.ComponentQuery.query('#addCustomerId #NAME')[0].setValue('');
		Ext.ComponentQuery.query('#addCustomerId #PHONE')[0].setValue(null);
		Ext.ComponentQuery.query('#addCustomerId #EMAIL')[0].setValue('');
		Ext.ComponentQuery.query('#addCustomerId #ADDR')[0].setValue('');
	},
	createCustomer:function(){
		name = Ext.ComponentQuery.query('#addCustomerId #NAME')[0].getValue();
		phone = Ext.ComponentQuery.query('#addCustomerId #PHONE')[0].getValue();
		email = Ext.ComponentQuery.query('#addCustomerId #EMAIL')[0].getValue();
		addr = Ext.ComponentQuery.query('#addCustomerId #ADDR')[0].getValue();
		
		var params = {
				NAME: name,
				PHONE: phone,
				EMAIL: email,
				ADDR: addr
		};
		this.submitRequest(params);
	},
	submitRequest:function(_params){
		var parent = this;
		
		var submitFinishUrl = contextPath + '/customer/createCustomer.json';
		
		supportEvent.showLoadingOnprogress('Đang lưu...', 'BtnSaveSrvc');
		Ext.Ajax.request( {
			url: submitFinishUrl,
    		method:'POST',
    		params: _params,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.info(text);
    			if( text.success == true){
    				parent.hasPayed = true;
    				Ext.MessageBox.hide();
    				parent.hide();
    			}
    			else supportEvent.showMessageError('Có lỗi xảy ra !');
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			supportEvent.showMessageError('Có lỗi xảy ra !');
    		}
		});
	}
});
