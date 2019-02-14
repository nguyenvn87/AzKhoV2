/**
 * 
 */
  Ext.define('ECNT.store.paymentMethodStore', {
	extend : 'Ext.data.Store',
	model : 'ECNT.model.paymentMethodModel',
	proxy: {
		type: 'ajax',											
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