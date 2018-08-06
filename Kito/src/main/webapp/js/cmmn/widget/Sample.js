Ext.define('pckg.cmmn.widget.Sample',{
	extend: 'Ext.container.Container',
	config:	{
		
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		Ext.apply(this,{
			items: [
			
			]
		});
		this.callParent(arguments);
	}
});