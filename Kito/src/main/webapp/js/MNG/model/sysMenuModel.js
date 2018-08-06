/**
 * 
 */
Ext.define('MNG.model.sysMenuModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'MENU_ID',
						type : 'string'
					}, {
						name : 'UP_MENU_ID',
						type : 'string'
					}, {
						name : 'MENU_NM',
						type : 'string'
					}, {
						name : 'MENU_DSCR',
						type : 'float'
					}, {
						name : 'USE_YN',
						type : 'string'
					}, {
						name : 'SORT_NR',
						type : 'int'
					}, {
						name : 'URL_TYPE',
						type : 'string'
					}, {
						name : 'MENU_ICON_ID',
						type : 'string'
					}, {
						name : 'RESTAR_ID',
						type : 'string' 
					}
					]
		});