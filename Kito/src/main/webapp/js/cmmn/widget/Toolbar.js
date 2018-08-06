Ext.define('pckg.cmmn.widget.Toolbar',{
	extend: 'Ext.toolbar.Toolbar',
	
	flex: 1,
	margin: '5 5 5 30',
	style: 'background: #ffffff;',
	border: false,
	
	config:	{
		items : ''
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		Ext.apply(this,{
			items: [
				this.items
			]
		});
		this.callParent(arguments);
	}
});