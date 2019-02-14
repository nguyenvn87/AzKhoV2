/**
 * 
 */
Ext.define('ECNT.model.bankAccountModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ID_BANK', type : 'string'}
					, {
						name : 'BANK_NM',	type : 'string'}
					, {
						name : 'NOTE',	type : 'string' }
					, {
						name : 'RESTAR_ID',	type : 'string' }
					, {
						name : 'BALANCE',	type : 'string' }
					, {
						name : 'CURRENCY',	type : 'string' }
					, {
						name : 'ADDRESS',	type : 'string' }
					, {
						name : 'OWNER',	type : 'string' }
					, {
						name : 'ISSORT',	type : 'string' }
					]
		});