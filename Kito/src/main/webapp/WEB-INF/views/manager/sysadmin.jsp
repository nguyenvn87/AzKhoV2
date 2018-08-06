<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<html>
<head>
<title>System Admin</title>
<script type="text/javascript">
Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.sysAdminController' ],
	launch : function() {
		Ext.create('MNG.view.sysAdminView', {
			renderTo : 'land_contents'
		});
		var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			var storeTmp = Grid.getStore();
			storeTmp.currentPage = 1;
			storeTmp.pageSize=10;
			storeTmp.load();
	}
});
</script>

</head>
<body>
<div id="land_contents"></div>
</body>
</html>