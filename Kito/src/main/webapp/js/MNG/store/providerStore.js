/**
 * 
 */
  Ext.define('MNG.store.providerStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.providerModel',
	proxy: {
		type: 'ajax',											
		url: contextPath +'/getListProvider.json',		
		reader: {
			type: 'json',
			root: 'data', 						
			totalProperty: 'totalCount',						
			messageProperty: 'message',
            successProperty: 'success'
		},
		listeners: { 
			exception: function(proxy, response, options) {
				//requestMessageProcessor(proxy, response);
			}
		},
		afterRequest: function(request, success) {
			//requestMessageProcessor(request.scope, request.operation.response);
		}
		
	}
});