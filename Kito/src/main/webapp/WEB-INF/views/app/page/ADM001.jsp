<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">


Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.userRightController' ],
	launch : function() {
		Ext.create('MNG.view.userRightView', {
			renderTo : 'land_contents'
		});
		var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			var storeTmp = Grid.getStore();
			storeTmp.currentPage = 1;
			storeTmp.pageSize=15;
			storeTmp.getProxy().extraParams = {
						//ENABLED: '1'
					};
			storeTmp.load();
	}
});
</script>
<div id="land_contents"></div>