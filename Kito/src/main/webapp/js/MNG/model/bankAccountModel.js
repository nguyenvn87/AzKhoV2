/**
 * 
 */
Ext.define('MNG.model.bankAccountModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ID_BANK', type : 'string'}
					, {
						name : 'ACCOUNT_NO', type : 'string'}
					, {
						name : 'BANK_NM',	type : 'string'}
					, {
						name : 'ACCOUNT_NM',	type : 'string' }
					, {
						name : 'NOTE',	type : 'string' }
					, {
						name : 'RESTAR_ID',	type : 'string' }
					]
		});