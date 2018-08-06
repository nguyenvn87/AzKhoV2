/**
 * 
 */
Ext.define('MyApp.model.MyModel1', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'a1',
		type : 'string'
	}, {
		name : 'a2',
		type : 'string'
	}, {
		name : 'a3',
		type : 'string'
	} ]
});
Ext.define('BIZ.utilities.testStore',{
	storeId:'testStore',
	model : 'MyApp.model.MyModel1',
	data : [ [ 'MDSDD test 1', ' ', ' ' ],
	        [ 'MDSDD test 2', ' ', ' ' ]
	          ]
});