/**
 * @author: Nguyennv
 * Date:  27/11/2015
 * Ext.define('BS.view.laForm.infoPartyContainer')
 * Description: Display receiver party 
 * 
 **/
Ext.define('BS.menuUpContainer',{
	extend : 'Ext.container.Container',
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
			console.log("this.UP_MENU_ID");
			//console.log(ths.config.UP_MENU_ID);
			var store = Ext.create('pckg.system.menu.MenuListStore');
			store.load({
				params: {
					UP_MENU_ID : ths.UP_MENU_ID
					//UP_MENU_ID : 'LEFT_ADMIN'
	    		},
				callback : function(records, operation, success)	{
					var collapsed = false;
					var menu_cls = 'main_left_sub_menu_background_select';					 
					for ( var i = 0 ; i < records.length ; i++ )	{
						var cPanel = Ext.create('BS.menuSupContainer', {
							parent: ths,
							collapsed: collapsed,
							header: {
								xtype: 'header',
								title: records[i].get('MENU_NM'),
								cls:   menu_cls,//records[i].get('MENU_ICON_ID'),
								border: false
							},
							upMenuId: records[i].get('MENU_ID')
						});
						ths.add(cPanel);
						ths.add(Ext.create('Ext.Component',{
							width: 290,
							height: 5,
							cls: 'main_left_menu_border_bottom',
							border: false,
							autoEl: 'div'							
						}));
						collapsed = true;
						menu_cls = 'main_left_sub_menu_background';
					}
				}
			});
		}
	}
});            