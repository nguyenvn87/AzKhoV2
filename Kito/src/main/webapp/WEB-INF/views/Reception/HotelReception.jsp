<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">
var tmpButton =  Ext.create('LAFORM.containerCommon');
var roomStore = Ext.create('MNG.store.roomStore',{});
var roomComboStore = Ext.create('MNG.store.roomStore',{});

Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.roomManagerController' ],
	launch : function() {
		Ext.create('MNG.view.roomManagerView', {
			renderTo : 'land_contents'
		});
		
		//----------------
		roomComboStore.loadData([],false);
		var container = Ext.ComponentQuery.query('#form-list-room')[0];
		//var roomStore = Ext.create('MNG.store.roomStore',{});
		roomStore.getProxy().extraParams = {
							IS_USED : 1
						};
		roomStore.load();
		console.log('roomStore');
		roomStore.on('load',function (store, record, successful, eOpts ){
			
			roomComboStore.add(record);
			for(var i = 0; i < record.length; i++){
				var recd = record[i];
				var roomId = recd.get('ROOM_ID');
				var roomNO = recd.get('ROOM_NO');
				var status = recd.get('IS_EMPTY');
				var isClose = false;
				if(status != null && status == 0)
					isClose = true;
				var tmpRoom = tmpButton.getContainer(roomId,roomNO, isClose);
				container.add(tmpRoom);
			}
			console.log(record);
			
		});
	}
});
</script>


<div id="land_contents">
</div>

