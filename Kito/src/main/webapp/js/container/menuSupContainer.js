/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */

Ext.define('BS.menuSupContainer',{
	extend : 'Ext.panel.Panel',
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
	/*initComponent : function() {
		var me = this;		
		Ext.applyIf(me, {
		    items: [
		            {
						xtype : 'button',
						text : 'Item',
						listeners : {
							click: function(){
								alert('Click');
							},
							scope : this
						}
					}
		            ]
		});
		me.callParent(arguments);
	},*/
	listeners : {
		render: function(ths, eOpts) {
			var store = Ext.create('pckg.system.menu.MenuListStore');
			store.load({
				params: {
					//UP_MENU_ID : this.upMenuId
					UP_MENU_ID : this.upMenuId
	    		},
				callback : function(records, operation, success)	{
					//console.log(records.length);
					for ( i = 0 ; i < records.length ; i++ )	{
						var cMenu = Ext.create('Ext.button.Button', {
							width: 280,
							border: false,
							cls: 'left_sub_menu_button',							
							textAlign: 'left',
							iconCls: 'left_sub_menu_button_icon',
							iconAlign: 'left',
							text: records[i].get('MENU_NM'),
							name: records[i].get('URL_TYPE'),
							//URL: records[i].get('URL'),
							//URL_TYPE: records[i].get('URL_TYPE'),
							//UP_MENU_NM: records[i].get('UP_MENU_NM'),
							listeners: {
								click:function(ths, e, eOpts){
									//alert(ths.name);
									//mainPanel.goURL('/adm/storemanager.do', ths.name);
									var buttons = ths.up('panel[cls=main_left_menu]').query('button[iconCls=left_sub_menu_button_icon_select]');
									if( buttons.length > 0){
										Ext.Array.each( buttons, function( button, index, buttonsItSelf){
											button.removeCls('left_sub_menu_button_select');
											button.addCls('left_sub_menu_button');
											button.setIconCls('left_sub_menu_button_icon');
										});
									}
									ths.removeCls('left_sub_menu_button');
									ths.addCls('left_sub_menu_button_select');
									ths.setIconCls('left_sub_menu_button_icon_select');
									
									Ext.getCmp('CenterLayout').setTitle(ths.text);
									Ext.getCmp('SubIFrame').load(request.getContextPath + ths.name);
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
				}
			});
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