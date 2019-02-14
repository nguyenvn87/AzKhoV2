<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">
var tmpButton =  Ext.create('LAFORM.containerCommon');
var roomStore = Ext.create('MNG.store.roomStore',{});
var roomComboStore = Ext.create('MNG.store.roomStore',{});

Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.importController' ],
	launch : function() {
		Ext.create('MNG.view.importView', {
			renderTo : 'land_contents',
			listeners:{
				afterrender:function(){
					var GridUser = Ext.ComponentQuery.query('#grid-store-srvc')[0];
					var storeTmp = GridUser.getStore();
					storeTmp.currentPage = 1;
					storeTmp.pageSize=10;
					storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        console.log('SumObj', SumObj);
					        value3 = formatSupporter.formatToMoney(SumObj.total);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value3);
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
