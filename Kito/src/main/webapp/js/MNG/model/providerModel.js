/**
 * 
 */
Ext.define('MNG.model.providerModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'PROV_CD',
						type : 'string'
					}, {
						name : 'PROV_NM',
						type : 'string'
					}, {
						name : 'PROV_PHONE',
						type : 'string'
					}, {
						name : 'PROV_USER',
						type : 'string'
					}, {
						name : 'PROV_ADDR',
						type : 'string'
					}, {
						name : 'PROV_EMAIL',
						type : 'string'
					}, {
						name : 'RESTAR_ID',
						type : 'string'
					},{
						name:'PROV_DCSRT',
						type: 'string'
					}
					]
		});