/**
 * 
 */
  Ext.define('MNG.store.RoleGroupStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.roleGroupModel',
	autoload: true,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/system/auth/getlist.json',		
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