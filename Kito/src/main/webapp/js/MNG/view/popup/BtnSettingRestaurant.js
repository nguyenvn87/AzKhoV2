/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */


Ext.define('MNG.view.popup.BtnSettingRestaurant', {
	extend : 'Ext.window.Window',
	Height : 300,
	width : 800,
	y: 10,
	//x: 10,
	title : 'Cấu hình thông tin quán',
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
								    	   itemId : 'RESTAR_CODE',
								    	   name : 'RESTAR_CODE',
								    	   height: 30,
								    	   readOnly: true,
								    	   fieldLabel : 'ID'
								       },
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'RESTAR_ID',
								    	   name : 'RESTAR_ID',
								    	   height: 30,
								    	   hidden: true,
								    	   fieldLabel : 'ID'
								       },
								       {
								    	   xtype : 'textfield',
								    	   itemId : 'RESTAR_NM',
								    	   name : 'RESTAR_NM',
								    	   height: 30,
								    	   fieldLabel : 'Tên',
								       },{
										   xtype : 'textfield',
								    	   itemId : 'PHONE',
								    	   name : 'PHONE',
								    	   height: 30,
								    	   fieldLabel : 'Điện thoại',
								        },{
										   xtype : 'datefield',
								    	   itemId : 'CREATE_TIME',
								    	   name : 'CREATE_TIME',
								    	   height: 30,
								    	   format : 'd-m-Y',
								    	   altFormats: 'Ymd',
								    	   submitFormat: 'Y/m/d',
								    	   fieldLabel : 'Ngày đăng kí',
								    	},{
										   xtype : 'datefield',
								    	   itemId : 'EXPIRED_DATE',
								    	   name : 'EXPIRED_DATE',
								    	   format : 'd-m-Y',
								    	   altFormats: 'Ymd',
								    	   submitFormat: 'Y/m/d',
								    	   height: 30,
								    	   fieldLabel : 'Ngày hết hạn',
								        },{													
											xtype : 'simplecombobox',
											flex : 1,
											itemId:'RESTAR_TYPE',
											name:'RESTAR_TYPE',
											fieldLabel : 'Loại cửa hàng',
											emptyText: 'Loại cửa hàng',
											datatype: 'combo',
											scrid: 'RESTA',
											autoload: false
										},{
										   xtype : 'checkbox',
								    	   itemId : 'IS_LOCK',
								    	   name : 'IS_LOCK',
								    	   height: 30,
								    	   fieldLabel : 'Khóa'
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
						me.saveRequest();
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
			
		}
	},
	renderInfo:function(params){
		console.info(params);
		Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_CODE')[0].setValue(params.restarCD);
		Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_ID')[0].setValue(params.restarId);
		Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_NM')[0].setValue(params.restarNm);
		Ext.ComponentQuery.query('#btnSrvcContainerId #PHONE')[0].setValue(params.phone);
		Ext.ComponentQuery.query('#btnSrvcContainerId #CREATE_TIME')[0].setValue(params.creatdate);
		Ext.ComponentQuery.query('#btnSrvcContainerId #EXPIRED_DATE')[0].setValue(params.expdate);
		Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_TYPE')[0].setValue(params.type);
		Ext.ComponentQuery.query('#btnSrvcContainerId #IS_LOCK')[0].setValue(params.lock);
	},
	saveRequest:function(){
		me = this;
		supportEvent.showLoadingOnprogress('Đang xử lý...', 'BtnStartSrvc');
		
		var type = Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_TYPE')[0].getValue();
		
			var submitStartUrl = contextPath + '/store/updateSettingRestaurant.json';
			Ext.Ajax.request( {
	    		url: submitStartUrl,
	    		method:'POST',
	    		params: {
					RESTAR_ID: Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_ID')[0].getValue(),
					RESTAR_CODE: Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_CODE')[0].getValue(),
					RESTAR_TYPE: Ext.ComponentQuery.query('#btnSrvcContainerId #RESTAR_TYPE')[0].getValue(),
					EXPIRED_DATE: Ext.ComponentQuery.query('#btnSrvcContainerId #EXPIRED_DATE')[0].getValue(),
					},
	    		success: function(response){
	    			supportEvent.hiddeMessageBox();
	    			tmpStore = Ext.ComponentQuery.query('#grid-user')[0].getStore();
	    			tmpStore.load();
	    		},
	    		failure: function(response){
	
	    		}
			});
	}
});
