/**
 * 
 */
Ext.define('MNG.model.srvcModel', {
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
						name : 'PRICE',
						type : 'float'
					}, {
						name : 'PRICE_IMPORT',
						type : 'float'
					}, {
						name : 'DISCOUNT',
						type : 'float'
					},{
						name : 'IS_USED',
						type : 'string' 
					},{
						name : 'ACTIVE',
						type : 'string' 
					},{
						name : 'IS_DEFAULT',
						type : 'string' 
					},{
						name : 'GROUP_CD',
						type : 'string' 
					},{
						name : 'GROUP_NM',
						type : 'string' 
					},{
						name : 'SORT_NO',
						type : 'string' 
					},{
						name : 'ACCUMULT',
						type : 'string' 
					},{
						name : 'AMOUNT_STORE',
						type : 'float'
					},{
						name : 'CHANGE_DATE',
						type : 'string' }
					,{
						name : 'HIS_CHANGE_TIME',
						type : 'string' }
					,{
						name : 'HIS_NOTE',
						type : 'string' }
					,{
						name : 'IS_SERVICE',
						type : 'string' }
					]
		});