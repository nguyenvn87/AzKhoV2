/**
 * 
 */
Ext.define('MNG.model.importDetailModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'IMPRT_CD',
						type : 'int'
					},{
						name : 'SRVC_ID',
						type : 'string'
					},{
						name : 'SRVC_NM',
						type : 'string'
					},{
						name : 'SRVC_NAME',
						type : 'string'
					},{
						name : 'IMPRT_PRICE',
						type : 'string'
					},{
						name : 'AMOUNT',
						type : 'string'
					},{
						name : 'TOTAL_MONEY',
						type : 'float'
					},{
						name : 'UNIT',
						type : 'string'
					},{
						name : 'UNIT_NM',
						type : 'string'
					},{
						name : 'RESTAR_ID',
						type : 'string'
					},{
						name : 'USER_NAME',
						type : 'string'
					},{
						name : 'CHANGETIME',
						type : 'string'
					},{
						name : 'NOTE',
						type : 'string'
					},{
						name : 'ID_DETAIL',
						type : 'string'
					}
					]
		});