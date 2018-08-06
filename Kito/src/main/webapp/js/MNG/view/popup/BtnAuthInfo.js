
Ext.define('MNG.view.popup.BtnAuthInfo',{
	extend: 'Ext.window.Window',	
	requires: [
		'Ext.data.Store',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.extCombo.view.SimpleComboBox'
	],
	width:500,
	height:500,
	y: 10,
	config: {		
		ROLEGROUP_ID: null,
		t_edit: false,
		t_view:	false,
		t_add:	false
	},
	
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	       
	initComponent : function() {
		var me = this;		
		var authMenuTree = Ext.create("BS.authMenuTree",{ROLEGROUP_ID:this.ROLEGROUP_ID});
		//var authActTree = Ext.create("BS.authActTree",{ROLEGROUP_ID:this.ROLEGROUP_ID});
		
		Ext.apply(me,{		
			items:[
				{
					xtype: 'form',
					id: 'authInfoForm',
					layout : 'fit',
					//cls : 'jdvn-sub-body',
					frame: true,
					items:[
					       {
					       	xtype: 'container',
					    	layout : {
								align : 'middle',
								type : 'hbox'
							},
							defaults:{
								cls:'input-field',
								flex:1
							},
							items:[
							       authMenuTree
							       //authActTree
				    	         ]
						   }
					]
				}
			],
			buttons: [
			    {
			    	text: 'Lưu',//'수정',
			    	id: 'authUpdate',
			    	hidden: true,
			    	listeners: {
			    		//click: me.windowSubmit,
			    		click: function() {
			    			
			    			Ext.Ajax.request( {
					    		url: contextPath + '/system/auth/changeall.json',
					    		params: {
					    			menu: JSON.stringify(authMenuTree.chkedAuthMenuArr),
					    			//act: JSON.stringify(authActTree.chkedAuthActArr)
					    		},
					    		success: function(response){
					    			//Ext.Msg.alert('Status', 'update success.');
					    			var text = Ext.JSON.decode(response.responseText);
					    			console.log( text);
					    			console.log( text.message);
				    				Ext.Msg.alert('Status', text.message);
					    		},
					    		failure: function(response){
					    			//Ext.Msg.alert('Status', 'update fail.');
					    			var text = Ext.JSON.decode(response.responseText);
					    			console.log( text);   
					    			Ext.Msg.alert('Status', 'update fail.');
					    		}
					    	});
			    			
			    			// temp 값 초기화
			    			authMenuTree.chkedAuthMenuArr = null;
			    			//authActTree.chkedAuthActArr = null;
			    			
			    			//me.onBtnCloseWindow();
			    		},
			    		scope: me
			    	}
			    },
			    {
			    	text: 'Đóng',//'닫기',
			    	listeners: {
			    		click: me.onBtnCloseWindow,
			    		scope: me
			    	}
			    }
			],
			closeAction: 'hide'
		});
		me.callParent(arguments);
		
		
		if(!this.t_add){
		}else{
			
		};
		
		if(this.t_edit){
			Ext.getCmp('authUpdate').show();
		};
	},	
	
	onBtnCloseWindow: function(button, e, eOpts){
		this.removeAll();
		this.close();
	},
	
	windowSubmit: function(button, e, eOpts){
		
		var submitUrl = '/ladm/system/auth/update.json';	
		if(this.t_add){			
			submitUrl  = '/ladm/system/auth/add.json';
		}
		
		Ext.getCmp('authInfoForm').submit({
		    method:'POST',
		    url: contextPath + submitUrl,
		    waitTitle:'Connecting',
		    waitMsg:'Sending data...',
		    success : function(form,action){
	        	var actionObj = Ext.JSON.decode(action.response.responseText);	        	
	        		        		        	
	        	if (actionObj.message) {
					var messageDescription = 'Information'; // title of the alert box
					var messageIcon = Ext.MessageBox.INFO;
					
					if (!actionObj.success)
					{
						var messageDescription = 'Warning';
						var messageIcon = Ext.MessageBox.WARNING;
					}
					
					Ext.MessageBox.show({
						title: messageDescription,
						msg: actionObj.message,
						buttons: Ext.MessageBox.OK,
						icon: messageIcon,
					 	fn: function(buttonId) {
					 		
					 		
                        }
					});
				}
	         },
	         failure : function(form, action){
	        	var messageDescription = 'Information'; // title of the alert box
				var messageIcon = Ext.MessageBox.INFO;
	        	var actionObj = Ext.JSON.decode(action.response.responseText);
	        	
	        	if(action.failureType == 'server'){						
					var messageDescription = 'Error';
					var messageIcon = Ext.MessageBox.ERROR;	
					Ext.MessageBox.show({
						title: messageDescription,
						msg: actionObj.message,
						buttons: Ext.MessageBox.OK,
						icon: messageIcon,
						fn: function(buttonId) {
					 		console.log(buttonId);                    		
                        }
					}); 
					
	            }else{ 
	            	Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
	         	}
	        }	
		})
	},
	
	getTextfield: function(width, fieldLabel, labelWidth, labelAlign, readOnly, id, name)
	{
		return{
				xtype:			'textfield',
				width:			width,
				fieldLabel:		fieldLabel,
				labelWidth: 	labelWidth,
				labelAlign: 	labelAlign,
				readOnly: 		readOnly,
				id:				id,
				name:			name
			}
	},
	
	getCombobox: function(LabelName, scrid, name)
    {
    	return{
    			xtype:		'simplecombobox',
    			fieldLabel: LabelName,
    			labelWidth: 100,
    			scrid:		scrid,
    			name:		name,
    			flex: 		1,
    			initFlag:false    			
    		}
    }
	
});
