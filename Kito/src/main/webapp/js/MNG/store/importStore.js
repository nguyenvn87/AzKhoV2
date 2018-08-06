/**
 * 
 */
Ext.define('MNG.store.importStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.importModel',
	autoload : true,
	proxy : {
		type : 'ajax',
		url : contextPath + '/store/getListImport.json',
		reader : {
			type : 'json',
			root : 'data',
			totalProperty : 'totalCount',
			messageProperty : 'message',
			successProperty : 'success'
		},
		listeners : {
			exception : function(proxy, response, options) {
				// requestMessageProcessor(proxy, response);
			}
		},
		afterRequest : function(request, success) {
			// requestMessageProcessor(request.scope,
			// request.operation.response);
		}

	}
});