/**
 * 
 */
  Ext.define('SPRT.store.CommonCodeStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.codeModel',
	proxy: {
		type: 'ajax',											
		url: contextPath +'/code/getCommonCodeList.json',		
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