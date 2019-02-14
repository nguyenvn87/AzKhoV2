/**
 * 
 */
  Ext.define('ECNT.store.phieuChiStore', {
	extend : 'Ext.data.Store',
	model : 'ECNT.model.phieuChiModel',
	autoload: false,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/phieuthu/getPagingPhieuChi.json',		
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