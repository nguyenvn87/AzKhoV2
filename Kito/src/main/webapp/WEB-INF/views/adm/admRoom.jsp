<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">


Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.admRoomController' ],
	launch : function() {
		Ext.create('MNG.view.admRoomView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					
				}
			}
		});
		var Grid = Ext.ComponentQuery.query('#grid-room')[0];
			var storeTmp = Grid.getStore();
			console.log(storeTmp);
		storeTmp.load();
	}
});
</script>
<div id="land_contents"></div>
