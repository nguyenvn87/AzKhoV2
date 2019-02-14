/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddCmdUserCommon', {
	extend : 'Ext.window.Window',
	Height : 500,
	width : 500,
	y: 55,
	maxHeight : 600,
	closeAction : 'destroy',
	resizable : false,
	groupCD: '',
	groupNM: '',
	targetStore: null,
	config:{
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
				itemId : 'btnMainContainerId',
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
									xtype : 'textfield',
									name:'CD_NM',
									emptyText : me.config.emptytxt,
									valueField: me.config.value,
									height: 30
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
				listeners : {
					click : function(){
						me.saveSubmit(me);
					}
				}
			}, {
				xtype : 'button',
				cls : 'button',
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
	saveSubmit: function(me){
		var param = {};
		var value = Ext.ComponentQuery.query('#btnMainContainerId [name=CD_NM]')[0].getValue();
		param={'CD': -1};
		param['CD_NM'] =  value;
		param['GROUP_CD'] = me.groupCD;
		param['GROUP_NM'] = me.groupNM;
		Ext.Ajax.request( {
    		url: contextPath + '/setting/createCDUser.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			if( text.success == true){
    				if(me.targetStore!=null)
    				me.targetStore.load();
    				me.close();
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    		}
    	});
	}
});
