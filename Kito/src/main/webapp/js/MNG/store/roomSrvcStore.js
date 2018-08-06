/**
 * 
 */
  Ext.define('MNG.store.roomSrvcStore', {
	extend : 'Ext.data.Store',
	model : 'MNG.model.roomSrvcModel',
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