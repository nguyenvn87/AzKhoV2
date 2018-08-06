<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">
Ext.onReady(function(){
	formRestarant = Ext.create( 'BS.infoRestaurantContainer', {
		renderTo: 'land_contents'
	});
	formRestarant.loadData('');
});
</script>

<div id="land_contents">
</div>