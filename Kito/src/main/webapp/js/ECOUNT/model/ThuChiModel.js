/**
 * 
 */
Ext.define('ECNT.model.ThuChiModel', {
			extend : 'Ext.data.Model',
			fields: [{name:'rn1', 		type:'string'},
			        {name: 'PAYDATE', 		type:'string'},
					{name:'BILL_CD', 		type:'string'},
					{name:'VALUE', 			type:'string'},
					{name:'BANK_ID', 		type:'string'},
					{name:'PAY_METHOD', 	type:'string'},
					{name:'THUCHI_TYPE', 	type:'string'},
					{name:'TYPE', 			type:'string'},
					{name:'PERSON', 		type:'string'},
					{name:'DESCRIPTION', 	type:'string'}]
		});