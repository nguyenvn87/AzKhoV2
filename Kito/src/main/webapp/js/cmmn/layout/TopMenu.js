Ext.define('pckg.cmmn.layout.TopMenu',{
	extend: 'pckg.cmmn.widget.Toolbar',
	config:	{
		
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		this.callParent(arguments);
	},
	listeners : {
		render: function( view, eOpts) {
			var top_menu_store = Ext.create('pckg.ladm.system.menu.MenuListStore');
			top_menu_store.load({
				params: {
					UP_MENU_ID : 'TOP'
	    		},
				callback : function(records, operation, success)	{
//					console.log(records.length);
					for ( i = 0 ; i < records.length ; i++ )	{
						view.add({ 
							text: records[i].get('MENU_NM'),
							menu: Ext.create('pckg.cmmn.widget.Menu',{upMenuId:records[i].get('MENU_ID')})
						});
					}
				}
			});
		}
	}
});
