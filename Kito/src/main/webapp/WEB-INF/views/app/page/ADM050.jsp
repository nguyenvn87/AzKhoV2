<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<script type="text/javascript">
var URL_PAGING_THONGKECHITIET = '/sale/getChitietbanhang.json';
var LOAI_THONGKE = '1';
var useStore = Ext.create('MNG.store.userStore', {});
useStore.load();

var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var statisticStore = Ext.create('Ext.data.Store',{
          autoLoad: false, 
          fields: [
           			{ name: 'SRVC_NM', 	type: 'string'},
           			{ name: 'SRVC_CD', 	type: 'string'},
           			{ name: 'SRVC_ID', 	type: 'string'},
                    { name: 'PRICE', 	type: 'float'},
                    { name: 'UNIT', 	type: 'string'},
                    { name: 'UNIT_NM', 	type: 'string'},
                    { name: 'USER_NAME', 	type: 'string'},
                    { name: 'TOTAL', 	type: 'string'},
                    { name: 'ITOTAL', 	type: 'string'},
                    { name: 'IAMOUNT', 	type: 'string'},
                    { name: 'AMOUNT', 	type: 'string'},
                    { name: 'AMOUNT_STORE',	type: 'string'},
                    { name: 'MONEY_REMAIN', 	type: 'float'},
                    { name: 'PRICE_IMPORT', 	type: 'float'},                    
                 ],
                  proxy: {
                          type: 'ajax',											
                          reader: {
                          type: 'json',
                          root: 'data', 						
                          totalProperty: 'totalCount',						
                          messageProperty: 'message',
                          successProperty: 'success'
                         },
                  listeners: { 
                  			exception: function(proxy, response, options) {
                  				//requestMessageProcessor(proxy, response);
                  			}
                     	},
                     	afterRequest: function(request, success) {
                           //requestMessageProcessor(request.scope, request.operation.response);
                       }
                        }
                  });

Ext.application({
	name : 'MANAGER',
	appFolder : contextPath + '/MNG',
	controllers : [ 'MNG.controller.XuatNhapTonController' ],
	launch : function() {
		Ext.create('MNG.view.xuatNhapTonView', {
			renderTo : 'land_contents',
			tmpStore: statisticStore,
			listeners:{
				afterrender:function(){
					var arrDate = formatSupporter.getEnglishDate('MONTH');
					var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
					tmpStore = Grid.getStore();
					tmpStore.currentPage = 1;
					tmpStore.pageSize = 10;
					tmpStore.getProxy().url = contextPath  + '/statistic/ImportExport.json';
					tmpStore.getProxy().extraParams = {};
					tmpStore.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        totalValue = SumObj.total;
					        itotalValue = SumObj.itotal;
					        inStoreValue = SumObj.totalValue;
					        totalValue = Math.round(totalValue);
					        itotalValue = Math.round(itotalValue);
					        inStoreValue = Math.round(inStoreValue);
					        value1 = formatSupporter.formatToMoney(totalValue);
					        value2 = formatSupporter.formatToMoney(itotalValue);
					        value3 = formatSupporter.formatToMoney(inStoreValue);
					        Ext.ComponentQuery.query('#statis-total-id')[0].setText(value1);
					        Ext.ComponentQuery.query('#statis-itotal-id')[0].setText(value2);
					        Ext.ComponentQuery.query('#statis-instore-id')[0].setText(value3);
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

