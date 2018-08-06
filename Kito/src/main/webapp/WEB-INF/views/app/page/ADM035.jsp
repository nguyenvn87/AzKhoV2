<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">


Ext.application({
	name : 'SUPPORT',
	appFolder : contextPath + '/SPRT',
	controllers : [ 'SPRT.controller.SupportProductController' ],
	launch : function() {
		Ext.create('SPRT.view.SupportProductView', {
			renderTo : 'land_contents'
		});
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.currentPage = 1;
		storeTmp.pageSize=13;
		storeTmp.getProxy().extraParams = {
						GROUP_CD: 'HGHOA',
						RESTAR_TYPE: 'QH100'
					};
		storeTmp.load();
	}
});
</script>
<div id="land_contents"></div>
