<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">


Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.userController' ],
	launch : function() {
		Ext.create('MNG.view.userView', {
			renderTo : 'land_contents'
		});
		var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			var storeTmp = Grid.getStore();
			console.log(storeTmp);
		storeTmp.load();
	}
});
</script>
<div id="land_contents"></div>
