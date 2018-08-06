/**
 * 
 */
  Ext.define('MNG.store.bankAccountStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.bankAccountModel',
	autoload: true,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/bank/getListBankAccount.json',		
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