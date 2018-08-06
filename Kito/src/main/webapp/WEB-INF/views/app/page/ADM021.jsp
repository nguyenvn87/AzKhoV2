
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">

var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.profitController' ],
	launch : function() {
		Ext.create('MNG.view.statisticProfit', {
			renderTo : 'land_contents'
		});
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		var Grid = Ext.ComponentQuery.query('#grid-list-item')[0];
			var storeTmp = Grid.getStore();
			storeTmp.getProxy().url = contextPath + '/getListStatisticImportProfit.json';
			storeTmp.getProxy().extraParams = {
				LIID: 'MONTH',
				STARTDATE: arrDate[0],
				ENDDATE: arrDate[1]
			};
			storeTmp.currentPage = 1;
			storeTmp.pageSize=12;
			storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        console.log(data);
					        SumObj = data.SumObj;
					        totalValue = SumObj.TOTAL_MONEY;
					        value1 = formatSupporter.formatToMoney(totalValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);					       
					     }
					});
	}
});
</script>
<div id="land_contents"></div>
