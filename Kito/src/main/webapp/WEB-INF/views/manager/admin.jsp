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
	controllers : [ 'MNG.controller.adminController' ],
	launch : function() {
		Ext.create('MNG.view.adminView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridUser = Ext.ComponentQuery.query('#grid-user')[0];
					var storeUser = GridUser.getStore();
					storeUser.load();
					
					var GridRoom = Ext.ComponentQuery.query('#grid-room')[0];
					var storeRoom = GridRoom.getStore();
					storeRoom.load();
					
					var GridMenu = Ext.ComponentQuery.query('#grid-menu')[0];
					var storeMenu = GridMenu.getStore();
					storeMenu.getProxy().extraParams = {
						ACTIVE_STS : true
					};
					storeMenu.load();
					
					var GridMenu = Ext.ComponentQuery.query('#grid-srvc')[0];
					var storeMenu = GridMenu.getStore();
					storeMenu.load();
				}
			}
		});
	}
});
</script>


<div id="land_contents">
</div>

