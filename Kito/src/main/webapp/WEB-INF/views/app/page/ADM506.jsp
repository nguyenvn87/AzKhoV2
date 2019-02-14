<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">

Ext.application({
	name : 'ECOUNT',
	appFolder : contextPath + '/ECOUNT',
	controllers : [ 'ECNT.controller.paymentAccountController' ],
	launch : function() {
		Ext.create('ECNT.view.paymentAccountView', {
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

