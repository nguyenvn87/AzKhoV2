/**
 * 
 */
  Ext.define('MNG.store.thongkebanhangStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.thongkebanhangModel',
	proxy: {
		type: 'ajax',											
		url: contextPath +'/getListService.json',
		extraParams:{
			IS_USED: 1
		}, 
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