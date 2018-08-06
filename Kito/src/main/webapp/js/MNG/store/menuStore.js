/**
 * 
 */
  Ext.define('MNG.store.menuStore', {
	extend : 'Ext.data.Store',
	//model : 'MNG.model.menuModel',srvcModel
	model : 'MNG.model.srvcModel',
	autoload: true,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/getListMenu.json',		
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