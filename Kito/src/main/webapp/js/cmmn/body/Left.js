Ext.define('pckg.cmmn.body.Left',{
	extend: 'Ext.container.Container',	
	
	config:	{
		UP_MENU_ID : null
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		Ext.apply(this,{
			autoScroll:true,
			items: [
			       // Ext.create('pckg.cmmn.layout.LeftMenu',{UP_MENU_ID:this.UP_MENU_ID})
			        Ext.create('BS.menuUpContainer',{UP_MENU_ID:this.UP_MENU_ID})
			]
		});
		this.callParent(arguments);
	}
});


