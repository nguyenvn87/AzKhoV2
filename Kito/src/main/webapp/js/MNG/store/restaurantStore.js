/**
 * 
 */
  Ext.define('MNG.store.restaurantStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.restaurantModel',
	proxy: {
		type: 'ajax',											
		url: contextPath +'/system/menu/getListRestaurants.json',		
		reader: {
			type: 'json',
			root: 'data', 						
			totalProperty: 'totalCount',						
			messageProperty: 'message',
            successProperty: 'success'
		},
		listeners: { 
			exception: function(proxy, response, options) {
				/*requestMessageProcessor(proxy, response);*/
			}
		},
		afterRequest: function(request, success) {
			/*requestMessageProcessor(request.scope, request.operation.response);*/
		}
		
	}
});