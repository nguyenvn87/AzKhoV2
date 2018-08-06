/**
 * 
 */
Ext.define('MNG.model.restaurantModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'RESTAR_ID',
						type : 'string'
					}, {
						name : 'RESTAR_CODE',
						type : 'string'
					}, {
						name : 'RESTAR_NM',
						type : 'string'
					}, {
						name : 'ADDR',
						type : 'string'
					}, {
						name : 'PHONE',
						type : 'string'
					}, {
						name : 'ADDR2',
						type : 'string'
					}, {
						name : 'EMAIL',
						type : 'string'
					}, {
						name : 'RESTAR_TYPE',
						type : 'string'
					}, {
						name : 'USE_TYPE',
						type : 'string'
					}, {
						name : 'CREATE_TIME',
						type : 'string'
					}, {
						name : 'IS_LOCK',
						type : 'string'
					}, {
						name : 'CONTACT_PHONE',
						type : 'string'
					}, {
						name : 'CONTACT_NM',
						type : 'string'
					}, {
						name : 'FULLNAME',
						type : 'string'
					}, {
						name : 'CHANGE_DATE',
						type : 'string' }
					, {
						name : 'IS_PRINT_BIG',
						type : 'string' }
					,{
						name : 'COIN_EXCHANGE',
						type : 'float' }
					,{
						name : 'USER_EDIT_BILL',
						type : 'string' }
					,{
						name : 'PACKAGE',
						type : 'string' }
					]
		});