<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var paramsRequest = {
			TYPE_STATIS: null,
			STARTDATE: null,
			ENDDATE: null,
			IS_CANCELED: 0,
			DEBIT: 'true',
			HAS_PAYED: 0,
			USERNAME: ''
		};
		
Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.ChuaThanhToanController' ],
	launch : function() {
		Ext.create('MNG.view.ChuaThanhToanView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridTurn = Ext.ComponentQuery.query('#grid-srvc-statistic')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.getProxy().extraParams = paramsRequest;
					var url = contextPath +'/report/getPagingStatistic.json';		
					storeTmp.getProxy().url = url;
					storeTmp.currentPage = 1;
					storeTmp.pageSize=10;
					storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        payedValue = SumObj.payed;
					        value1 = formatSupporter.formatToMoney(totalValue);
					        value2 = formatSupporter.formatToMoney(payedValue);
					        value3 = formatSupporter.formatToMoney(totalValue - payedValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
					        Ext.ComponentQuery.query('#statis-payed-id')[0].setText(value2);
					        Ext.ComponentQuery.query('#statis-debit-id')[0].setText(value3);
					       
					     }
					});
				}
			}
		});
	}
});
</script>
<div id="land_contents"></div>
