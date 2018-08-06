<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">

Ext.application({
	name : 'ADM',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.cdUserController' ],
	launch : function() {
		Ext.create('MNG.view.cdUserView', {
			renderTo : 'land_contents',
			groupCD: 'KHUVC',
			groupNM: 'Khu vực',
			listeners:{
				afterrender:function(){
					var GridUser = Ext.ComponentQuery.query('#grid-srvc')[0];
					var storeTmp = GridUser.getStore();
					storeTmp.getProxy().extraParams = {
						GROUP_CD: 'KHUVC',
					};
					storeTmp.currentPage = 1;
					storeTmp.pageSize=10;
					storeTmp.load();
				}
			}
		});
	}
});
</script>


<div id="land_contents">
</div>

