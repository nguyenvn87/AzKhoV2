/**
 * 
 */
Ext.define('MNG.model.storeSrvcModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'SRVC_ID',
						type : 'string'},
					{
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
						name : 'USERNAME',
						type : 'string'
					}, {
						name : 'STORE_ID',
						type : 'string'
					}, {
						name : 'UNIT_NM',
						type : 'string'
					}, {
						name : 'TOTAL_NO',
						type : 'float'
					}, {
						name : 'REMAIN_NO',
						type : 'string'
					}, {
						name : 'CHANGETIME',
						type : 'string'
					}, {
						name : 'TYPE',
						type : 'string'
					}, {
						name : 'TYPE_NM',
						type : 'string'
					}
					]
		});