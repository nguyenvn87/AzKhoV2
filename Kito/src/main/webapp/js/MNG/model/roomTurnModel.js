/**
 * 
 */
Ext.define('MNG.model.roomTurnModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ROOM_ID',
						type : 'string'
					}, {
						name : 'ROOM_USED_ID',
						type : 'string'
					},{
						name : 'BILL_CD',
						type : 'string'
					}, {
						name : 'TIME_STS',
						type : 'string'
					}, {
						name : 'TIME_END',
						type : 'string'
					}, {
						name : 'TIME_TOTAL',
						type : 'float'
					}, {
						name : 'ID_TURN',
						type : 'string'
					}, {
						name : 'USER_NAME',
						type : 'string'
					}, {
						name : 'IS_ON',
						type : 'string'
					}, {
						name : 'IS_DEBIT',
						type : 'string'
					}, {
						name : 'CHANGE_DATE',
						type : 'string'
					}, {
						name : 'TOTAL_MONEY',
						type : 'float'
					}, {
						name : 'PAYED_MONEY',
						type : 'float'
					}, {
						name : 'CHANGE_USER',
						type : 'string' 
					}, {
						name : 'ROOM_NO',
						type : 'string'  
					}, {
						name : 'DSCRT',  
						type : 'string'  
					}, {
						name : 'HAS_PAYED',
						type : 'string'  
					}, {
						name : 'PAY_DATE',
						type : 'string'  
					}, {
						name : 'PAY_INFO',
						type : 'string'  
					}, {
						name : 'rn1',
						type : 'string' 
					},{
						name : 'IS_DELIVERED',
						type : 'string'
					},{
						name : 'IS_ORDER',
						type : 'string'
					}, {
						name : 'CUS_NM',
						type : 'string' 
					}, {
						name : 'CUS_CD',
						type : 'string' 
					}, {
						name : 'PAY_METHOD',
						type : 'string' 
					}, {
						name : 'ID_BANK',
						type : 'string' 
					},{
						name : 'DISCOUNT',
						type : 'float' 
					}
					]
		});