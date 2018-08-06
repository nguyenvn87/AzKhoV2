Ext.define('pckg.cmmn.body.Top',{
	extend: 'Ext.container.Container',
	config:	{
		
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		var me = this;
		
		Ext.apply(this,{
			//margin: '5 0 5 0',
			layout: 'hbox',			
			items: [
			   {
				   xtype: 'container',
				   cls: 'main-top-logo',
				   border:false,
				   width: 230,
				   height: 99,
				   listeners : {
            	        click : {
            	            element : 'el',
            	            fn : function(){
            	                window.location = request.getContextPath + '/ladm/system/login/loginForm.do';
            	            }
            	        }
            	   }
			   },{
				   xtype: 'container',
				   cls: 'main-top-middle',
				   border:false,
				   width: 60,
				   height: 99
			   },{
				   xtype: 'component',
				   cls: 'main-top-right',
				   border:false,
				   flex: 1,
				   height: 99,
				   tpl: [
				     '<ul id="topMenuList">',
				     '<tpl for="menu">',
				     	'<li><a class="menuLink{#}{select}" href="{url}"><span>{name}</span></a></li>',
				     '</tpl>',
				     '</ul>',
				     '<ul id="topMenuList">',
				     '<li class="empty">&nbsp;</li><li class=""><a class="userLink" href="javascript:btn_loginPersonalInfo()">{partName} - {userName}</a></li><li class="right"><a class="userLink" href="{logoutUrl}">Logout</a></li>',
				     '</ul>'
				   ],
				   data: me.data,
				   
			   }
				/*{
					xtype: 'image',
					margin: '7 0 0 0',
					width: 250, 
					height: 43,
					src: request.getContextPath + '/images/body/top_logo.jpg',
					listeners : {
             	        click : {
             	            element : 'el',
             	            fn : function(){
             	                window.location = request.getContextPath;
             	            }
             	        }
             	   }
				},{
					flex: 1,
					layout: 'vbox',
					border: false,
					items:[
						{
							layout: 'hbox',
							width: '100%',
							border: false,
							items:[
								{	
									border: false,
									flex: 1 
								},
								menuBtn4,menuBtn5
							]
						},
						TopMenu
					]
				}*/
			]
		});
		this.callParent(arguments);			
	}
	
	
});


		
var TopMenu = Ext.create('pckg.cmmn.layout.TopMenu');

var userInfo;

var menuBtn4 = {
	    xtype: 'button',    
	    text : 'COM_B_023',
	    iconCls: 'icon-lop-user',
	    handler    : function() {		    	
	    	if(userInfo){	    		
	    		userInfo.destroy();
	    	};	    	
	    	userInfo = Ext.create('BIZ.lopPopup.BtnUserInfo',{						    		
				title: 'COM_B_023',		
				height: 400
				,width: 300	
				,user_ID: 'loggedUserId'
				,t_add: false
				,t_edit: true
			});	    	
	    	userInfo.show();	    	
	    }
	};

var menuBtn5 ={
    xtype: 'button',  
    iconCls: 'icon-lop-door_out',
    text : COM_B_024,
    handler    : function() {	    	
    	Ext.MessageBox.confirm('COM_B_022', 'COM_M_001', function(btn){  
    	    if (btn == 'yes') {  
    	    	location.href = request.getContextPath+'/ladm/system/login/logout.do'; 
    	    } else {     	         
    	    }  
    	});
    }
};



