/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
Ext.define('PopulationPoint', {
        extend: 'Ext.data.Model',
        fields: ['CHANGE_DATE', 'TOTAL_MONEY']
    });
var store123 =  Ext.create('MNG.store.customerStore', {
	extend : 'Ext.data.Store',
	model : 'PopulationPoint',
	autoload: false,
	proxy: {
		type: 'ajax',											
		url: contextPath +'/customer/getListBillByCustomer.json',		
		reader: {
			type: 'json',
			root: 'data', 						
			totalProperty: 'totalCount',						
			messageProperty: 'message',
            successProperty: 'success'
		},
		listeners: { 
			exception: function(proxy, response, options) {
			}
		},
		afterRequest: function(request, success) {
			
		}
	}
});

Ext.define('MNG.view.popup.BtnCustomerChartAnalysis', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 760,
	y: 10,
	title : '',
	maxHeight : 600,
	closeAction : 'hide',
	customerID: null,
	resizable : false,
	itemId: 'customerChartAnalysisID',
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				//cls : 'jdvn-main',
				padding: '10 10 0 0',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [
					        Ext.create('ECNT.view.form.chartCustomerAnalysis',{store: store123})
							]
				} ],
				
			}
			],
			buttons : [ {
					xtype : 'button',
					cls : 'button',
					text : 'Đóng',
					handler: function(){
						me.close();
					}
				}]
		});
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			me = this;
			store123.getProxy().extraParams = {
				CUS_CD: me.customerID,
				sort: 'ASC'
			};
			store123.load();
		}
	},
	loadData:function(){
		
	}
});
