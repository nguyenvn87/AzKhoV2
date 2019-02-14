<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>


<script type="text/javascript">
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var paramsRequest = {
			ISCHI: 0,
			STARTDATE: '',
			ENDDATE: ''
		};
Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.BankStatisticController' ],
	launch : function() {
		Ext.create('MNG.view.BankStatistic', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridTurn = Ext.ComponentQuery.query('#grid-srvc-statistic')[0];
					var storeTmp = GridTurn.getStore();
					storeTmp.getProxy().extraParams = paramsRequest;
					var url = contextPath +'/phieuthu/getPagingTongQuanThuChi.json';		
					storeTmp.getProxy().url = url;
					storeTmp.currentPage = 1;
					storeTmp.pageSize=10;
					storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        thuValue = SumObj.thu;
					        chiValue = SumObj.chi;
					        value1 = formatSupporter.formatToMoney(thuValue);
					        value2 = formatSupporter.formatToMoney(chiValue);
					        //value3 = formatSupporter.formatToMoney(totalValue - payedValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
					        Ext.ComponentQuery.query('#statis-payed-id')[0].setText(value2);
					       // Ext.ComponentQuery.query('#statis-debit-id')[0].setText(value3); 
					       
					     }
					});
				}
			}
		});
	}
});
</script>
<div id="land_contents"></div>
