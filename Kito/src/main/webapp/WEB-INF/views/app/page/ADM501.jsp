<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
Ext.application({
	name : 'ECOUNT',
	appFolder : contextPath + '/ECOUNT',
	controllers : [ 'ECNT.controller.phieuThuController' ],
	launch : function() {
		Ext.create('ECNT.view.phieuThuView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridTurn = Ext.ComponentQuery.query('#mainGridId')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.pageSize=10;
					storeTmp.currentPage = 1;
					storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        value1 = formatSupporter.formatToMoney(totalValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
					     }
					});
				}
			}
		}); 
	}
});
</script>


<div id="land_contents">
</div>

