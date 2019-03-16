/**
 * 
 */
  Ext.define('MNG.store.userStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.userModel',
	auLoad: true,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/getListUser.json',		
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