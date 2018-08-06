<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">

Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.providerController' ],
	launch : function() {
		Ext.create('MNG.view.providerView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridUser = Ext.ComponentQuery.query('#grid-srvc')[0];
					var storeTmp = GridUser.getStore();
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

