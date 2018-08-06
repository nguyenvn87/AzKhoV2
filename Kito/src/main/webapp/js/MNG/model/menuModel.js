/**
 * 
 */
Ext.define('MNG.model.menuModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'MENU_ID',
						type : 'string'
					}, {
						name : 'SRVC_ID',
						type : 'string'
					}, {
						name : 'PROD_NM',
						type : 'string'
					}, {
						name : 'PRICE',
						type : 'float'
					}, {
						name : 'RESTAR_ID',
						type : 'string'
					}, {
						name : 'UNIT',
						type : 'string'
					}, {
						name : 'UNIT_NM',
						type : 'string'
					}, {
						name : 'ACTIVE',
						type : 'int'
					}, {
						name : 'IS_DEFAULT',
						type : 'int'
					}, {
						name : 'IS_EXIST',
						type : 'string'
					}
					]
		});