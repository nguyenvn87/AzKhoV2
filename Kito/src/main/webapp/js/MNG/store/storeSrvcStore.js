/**
 * 
 */
  Ext.define('MNG.store.storeSrvcStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.storeSrvcModel',
	autoload: true,
	proxy: {
		type: 'ajax',	
		url: contextPath +'/store/getListStoreSrvc.json',		
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