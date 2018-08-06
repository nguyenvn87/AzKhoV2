<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">


Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.srvcController' ],
	launch : function() {
		Ext.create('MNG.view.srvcView', {
			isHideAddNew: true,
			renderTo : 'land_contents'
		});
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.currentPage = 1;
		storeTmp.pageSize=13;
		storeTmp.getProxy().extraParams = {
						IS_USED: 0
					};
		storeTmp.load();
	}
});
</script>
<div id="land_contents"></div>
