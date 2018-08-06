/**
 * 
 */
  Ext.define('MNG.store.roomTurnStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.roomTurnModel',
	proxy: {
		type: 'ajax',											
		url: contextPath +'/manager/getListRoomTurn.json',		
		reader: {
			type: 'json',
			root: 'data', 						
			totalProperty: 'totalCount',						
			messageProperty: 'message',
            successProperty: 'success'
		},
		listeners: { 
			exception: function(proxy, response, options) {
			}
		},
		afterRequest: function(request, success) {
		}
		
	}
});