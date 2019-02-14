/**
 * 
 */
Ext.define('MNG.model.exportModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'SRVC_ID',
						type : 'string'
					}, {
						name : 'SRVC_CD',
						type : 'string'
					}, {
						name : 'SRVC_NM',
						type : 'string'
					}, {
						name : 'UNIT',
						type : 'string'
					}, {
						name : 'DSCRT',
						type : 'string'
					}, {
						name : 'RESTAR_ID',
						type : 'string'
					}, {
						name : 'USER_NAME',
						type : 'string'
					}, {
						name : 'TYPE',
						type : 'string'
					}, {
						name : 'UNIT_NM',
						type : 'string' 
					}, {
						name : 'TYPE_NM',
						type : 'string' 
					}, {
						name : 'AMOUNT',
						type : 'float'
					}, {
						name : 'TOTAL_MONEY',
						type : 'float'
					},{
						name : 'IS_USED',
						type : 'string' 
					}
					]
		});