/**
 * 
 */
  Ext.define('MNG.store.customerStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.customerModel',
	//autoload: true,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/customer/getLisPagingCustomers.json',		
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