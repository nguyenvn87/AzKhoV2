Ext.define('pckg.cmmn.layout.LeftMenu',{
	extend: 'Ext.container.Container',
	
	config:	{
		UP_MENU_ID : null
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		this.callParent(arguments);
	},

	listeners : {
		render: function(ths, eOpts) {
			var store = Ext.create('pckg.ladm.system.menu.MenuListStore');
			store.load({
				params: {
					UP_MENU_ID : this.UP_MENU_ID
	    		},
				callback : function(records, operation, success)	{
					var collapsed = false;
					var menu_cls = 'main_left_sub_menu_background_select';					 
					//for ( var i = 0 ; i < records.length ; i++ )	{
					for ( var i = 0 ; i < 5 ; i++ )	{
						var cPanel = Ext.create('LeftMenu', {
							parent: ths,
							collapsed: collapsed,
							header: {
								xtype: 'header',
								title: 'Menu '+i, //records[i].get('MENU_NM'),
								cls:   menu_cls,//records[i].get('MENU_ICON_ID'),
								border: false
							},
							upMenuId: i //records[i].get('MENU_ID')
						});
						//ths.add(cPanel);
						/*ths.add(Ext.create('Ext.Component',{
							width: 290,
							height: 5,
							cls: 'main_left_menu_border_bottom',
							border: false,
							autoEl: 'div'							
						}));*/
						collapsed = true;
						menu_cls = 'main_left_sub_menu_background';
					}
				}
			});
		}
	}
});

Ext.define('LeftMenu',{
	extend: 'Ext.panel.Panel',
	config:	{
		parent: null, 
		upMenuId: '',
		targetFN: null
	},
	collapsible: true,
	border: false,
	cls: 'left_sub_menu',
	titleCollapse: true,
	layout: {
		type: 'vbox',
	    align: 'right'
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		this.callParent(arguments);
	},
	listeners : {
		render: function(ths, eOpts) {
			/*var store = Ext.create('pckg.ladm.system.menu.MenuListStore');
			store.load({
				params: {
					UP_MENU_ID : this.upMenuId
	    		},*/
				//callback : function(records, operation, success)	{
					//console.log(records.length);
					//for ( i = 0 ; i < records.length ; i++ )	{
					for ( i = 0 ; i < records.length ; i++ )	{
						var cMenu = Ext.create('Ext.button.Button', {
							width: 280,
							border: false,
							cls: 'left_sub_menu_button',							
							textAlign: 'left',
							iconCls: 'left_sub_menu_button_icon',
							iconAlign: 'left',
							text: 'Menu '+i,//records[i].get('MENU_NM'),
							URL: '',//records[i].get('URL'),
							URL_TYPE: '',//records[i].get('URL_TYPE'),
							UP_MENU_NM: i, //records[i].get('UP_MENU_NM'),
							listeners: {
								click: function(ths, e, eOpts) {
									
									var buttons = ths.up('panel[cls=main_left_menu]').query('button[iconCls=left_sub_menu_button_icon_select]');
									if( buttons.length > 0){
										Ext.Array.each( buttons, function( button, index, buttonsItSelf){
											button.removeCls('left_sub_menu_button_select');
											button.addCls('left_sub_menu_button');
											button.setIconCls('left_sub_menu_button_icon');
										});
									}
									//console.log(ths);
									ths.removeCls('left_sub_menu_button');
									ths.addCls('left_sub_menu_button_select');
									ths.setIconCls('left_sub_menu_button_icon_select');
									
									//console.log(ths);
									
									//console.log(ths.up('panel').up('panel').query('button[cls=left_sub_menu_button_select]').length);
									//console.log(ths.parent.text);
									
									if ( ths.URL != '' )	{
										
										if( ths.URL.indexOf('amp;') > 0){
											ths.URL = ths.URL.split('amp;').join('');
										}
										
										if ( ths.URL_TYPE == 'C1001')	{
											
											location.href = request.getContextPath + ths.URL;
											
										} else if ( ths.URL_TYPE == 'C1002') {
											mainPanel.goURL(ths.URL,ths.UP_MENU_NM ,' > '+ths.text);											
										}
										
//										if ( mainPanel != null )	{
//											mnu.targetFN(ths.URL);
//										}
									}
								}
							}
						});
						ths.add(cMenu);
						
						ths.add(Ext.create('Ext.Component',{
							width: 280,
							height: 4,
							cls: 'main_left_sub_menu_border_bottom',
							border: false,
							autoEl: 'div'							
						}));
					}
					//test menu insert
					/*if( ths.upMenuId == '2030000'){
						var testBtn = Ext.create('Ext.button.Button',{
							width: '100'
							, border: false
							, margin: '3 3 3 3'
							, textAlign: 'left'
							, text: 'Test'
							, URL : '/ladm/system/menu/spatialTest.do'
							, listeners: {
								click: function(ths, e, eOpts){
									mainPanel.goURL(ths.URL, ths.text);
								}
							}
						});
						
						ths.add(testBtn);
					}*/
				//}
			//});
		},
		afterrender: function( ths, eOpts){
			
			console.log( ths.header.cls);
			ths.header.el.on('click', function(){
				if( ths.collapsed) {
					ths.expand();
				}
			});
		},
		beforecollapse: function( ths, direction, animate, eOpts){
			console.log( 'beforeCollapse');
			ths.getHeader().removeCls('main_left_sub_menu_background_select');
			ths.getHeader().addCls('main_left_sub_menu_background');
		},
		beforeexpand: function(ths, eOpts)	{
			var items = ths.parent.items;
			for ( var i = 0 ; i < items.length ; i++ )	{
				if( i%2 == 0){
					items.items[i].collapse();
				}				
			}
			ths.getHeader().removeCls('main_left_sub_menu_background');
			ths.getHeader().addCls('main_left_sub_menu_background_select');
		}
	}
});


