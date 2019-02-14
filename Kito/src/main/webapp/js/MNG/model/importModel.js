/**
 * 
 */
Ext.define('MNG.model.importModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'DATE_IMPORT',
						type : 'string'
					}, {
						name : 'PRICE_IMPORT',
						type : 'string'
					}, {
						name : 'IMPRT_CD',
						type : 'string'
					}, {	
						name : 'IMPRT_BILL',
						type : 'string'
					}, {
						name : 'RESTAR_ID',
						type : 'string'
					}, {
						name : 'USER_NAME',
						type : 'string'
					}, {
						name : 'CHANGETIME',
						type : 'string'
					}, {
						name : 'PROV_CD',
						type : 'string'
					}, {
						name : 'PROV_NM',
						type : 'string'
					}, {
						name : 'TOTAL_MONEY',
						type : 'float'
					}, {
						name : 'DISCOUNT_MONEY',
						type : 'string'
					}, {
						name : 'NEEDTOPAYED',
						type : 'float'
					}, {
						name : 'PAYED_MONEY',
						type : 'string'
					},
					{
						name : 'DESCRIPTION',
						type : 'string'
					},
					]
		});