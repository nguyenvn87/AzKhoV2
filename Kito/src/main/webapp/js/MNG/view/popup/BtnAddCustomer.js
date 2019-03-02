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
	y: 200,
	title : 'Thêm mới khách hàng, thành viên',
	maxHeight : 600,
	closeAction : 'close',
	resizable : false,
	srvdId : null,
	componentTarget: null,
	config : {
		idOfGrid : ""
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
				iconCls : 'icon-true',
				action : 'saveSrvc',
				text : 'Lưu',
				itemId : 'BtnSaveSrvc',
				listeners : {
					click : function(field) {
						me.createCustomer(field);
					}
				}
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
	createCustomer:function(field){
		name = field.up('window').down('#NAME').getValue();
		phone = field.up('window').down('#PHONE').getValue();
		email = field.up('window').down('#EMAIL').getValue();
		addr = field.up('window').down('#ADDR').getValue();
		alert(name);
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
    			if( text.success == true){
    				parent.hasPayed = true;
    				Ext.MessageBox.hide();
    				parent.hide();
    				data = text.data;
    				if(componentTarget){
    					componentTarget.down('[name=CUS_CD]').setValue(data.CUS_CD+'');
    					componentTarget.down('[name=NAME]').setRawValue(_params.NAME);
    				}
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
