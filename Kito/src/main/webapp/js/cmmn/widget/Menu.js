Ext.define('pckg.cmmn.widget.Menu',{
	extend: 'Ext.menu.Menu',
	style: {
        overflow: 'visible'     // For the Combo popup
    },
    config:	{
		upMenuId : '',
		targetFN : null
	},
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		this.addItems(this, this.upMenuId);
		this.callParent(arguments);
	},
	addItems: function(mnu, id)	{
		var store = Ext.create('pckg.ladm.system.menu.MenuListStore');
		store.load({
			params: {
				UP_MENU_ID : id
    		},
			callback : function(records, operation, success)	{
				for ( i = 0 ; i < records.length ; i++ )	{
					var cMenu = Ext.create('pckg.cmmn.widget.Menu',{upMenuId:records[i].get('MENU_ID')});
//					console.log(records[i].get('CHILD_CNT'));
					if ( records[i].get('CHILD_CNT') > '0' )	{
						mnu.add({ 
							text: records[i].get('MENU_NM'),
							menu: cMenu
						});
					} else {
						mnu.add({ 
							text: records[i].get('MENU_NM'),
							URL: records[i].get('URL'),
							URL_TYPE: records[i].get('URL_TYPE'),
							listeners: {
								click: function(ths, e, eOpts) {
									if ( ths.URL != '' )	{
										if ( ths.URL_TYPE == 'C1001')	{
											location.href = request.getContextPath + ths.URL;
										} else if ( ths.URL_TYPE == 'C1002') {
											mainPanel.goURL(ths.URL);
										}
										
//										if ( mainPanel != null )	{
//											mnu.targetFN(ths.URL);
//										}
									}
								}
							}
						});
					}
				}
			}
		});
	}
});