/**
 * 
 */
Ext.define('MNG.model.roleGroupModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ROLEGROUP_ID',
						type : 'string'
					}, {
						name : 'DSCR',
						type : 'string'
					}, {
						name : 'USE_YN',
						type : 'string'
					}, {
						name : 'ROLE_TYPE',
						type : 'string'
					}
					]
		});