/**
 * 
 */
Ext.define('ECNT.model.paymentMethodModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'METHOD_ID', type : 'string'}
					, {
						name : 'ROOM_USED_ID', type : 'string'}
					, {
						name : 'PAY_TYPE',	type : 'string'}
					, {
						name : 'ID_BANK',	type : 'string' }
					, {
						name : 'VALUE',	type : 'string' }
					, {
						name : 'RESTAR_ID',	type : 'string' }
					, {
						name : 'BANK_NM',	type : 'string' }
					]
		});
