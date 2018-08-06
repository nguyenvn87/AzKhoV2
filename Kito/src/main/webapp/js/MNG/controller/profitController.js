var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});
var btnLookup = Ext.create('MNG.view.popup.BtnLookupTime');

Ext.define('MNG.controller.profitController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.statisticProfit','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	startDate: null,
	endDate: null,
	init : function() {
		this.control({
			
			'#BtnSaveSrvc' : {
				click : this.BtnSaveUser
			},
			'#addSrvcBtn' : {
				click : this.openBtnUser
			},
			'#btnStatisPrint' : {
				click : this.btnStatisPrint
			},
			'#btnExcelPrint':{
				click: this.btnExcelPrint
			},
			'#grid-srvc':{
				itemdblclick: this.doubleClickUser
			},
			'#btnStatisMonthly':{
				click: this.btnStatisMonthly
			},
			'#btnStatisYear':{
				click: this.btnStatisYear
			},
			'#btnStatisDaily':{
				click: this.btnStatisDaily
			},
			'#btnOther':{
				click: this.btnOther
			},
			'#btnSubmitLookupTime':{
				click : this.btnSubmitLookupTime
			}
		});
	},
	btnExcelPrint: function(){

		var param = "?STARTDATE="+ this.startDate+"&ENDDATE="+ this.endDate; 
		var _url = contextPath + '/report/excel/exportExcel.do'+param;
		this.downloadFile(_url);
	},
	btnStatisPrint: function(){
		if(this.startDate == null){
			var arrDate = formatSupporter.getEnglishDate('MONTH');
			this.startDate = arrDate[0];
			this.endDate = arrDate[1];
		}
		var param = "?LIID=WEEK"+"&STARTDATE="+ this.startDate+"&ENDDATE="+ this.endDate; 
		var location = contextPath + "/report/PrintImportProduct.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Nhập Hàng",600,1024,true);
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddProvider',{idProvider: null});
		}
		this.popup.initNewProvider();
		this.popup.show();
	},
	doubleClickUser:function(component, record, index, eOpts){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddProvider',{});
		}
		var idProvider = record.get('PROV_CD');
		this.popup.idProvider = idProvider;
		console.log('idProvider = '+idProvider);
		this.popup.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-srvc','#btnSrvcContainerId');
	},
	BtnSaveUser:function(){
		this.request();
	},
	request:function(){
		
		formRoom = this.popup;
		var prvName = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_NM')[0].getValue();
		var prvFone = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_PHONE')[0].getValue();
		var prvUser = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_USER')[0].getValue();
		var prvAddr = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_ADDR')[0].getValue();
		var prvEmail = Ext.ComponentQuery.query('#btnSrvcContainerId #PROV_EMAIL')[0].getValue();
		
		param={'PROV_CD': formRoom.idProvider};
		param['PROV_NM'] =  prvName;
		param['PROV_PHONE'] = prvFone;
		param['PROV_USER'] = prvUser;
		param['PROV_ADDR'] = prvAddr;
		param['PROV_EMAIL'] = prvEmail;
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveProvider.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			//console.log( text.result);
    			if( text.success == true){
    				formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
    				var storeTmp = Grid.getStore();
    				console.log(storeTmp);
    				storeTmp.load();
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
	},
	downloadFile:function(_url){
		
		 method = 'POST';
         params = {};
	    // Create form panel. It contains a basic form that we need for the file download.
	    var form = Ext.create('Ext.form.Panel', {
	        standardSubmit: true,
	        url: _url,
	        method: method
	    });
	    // Call the submit to begin the file download.
	    form.submit({
	        target: '_blank', // Avoids leaving the page. 
	        params: params
	    });
	},
	btnStatisMonthly:function(){
		var arrDate = formatSupporter.getEnglishDate('MONTH');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
		this.selectButton('MONTH');
	},
	btnStatisYear:function(){
		var arrDate = formatSupporter.getEnglishDate('YEAR');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
		this.selectButton('YEAR');
	},
	btnStatisDaily:function(){
		var arrDate = formatSupporter.getEnglishDate('TODAY');
		this.startDate = arrDate[0];
		this.endDate = arrDate[1];
		var params = {
				STARTDATE: arrDate[0],
				ENDDATE:   arrDate[1]
		};
		this.submitRequest(params);
		this.selectButton('TODAY');
	},
	btnOther:function(){
		btnLookup.show();
	},
	btnSubmitLookupTime:function(){
		this.statisticType = 'OTHER'
		this.selectButton('OTHER');
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		var params = {
				STARTDATE: this.startDate,
				ENDDATE:   this.endDate
		};
		this.submitRequest(params);
	},
	selectButton: function(buttonType){
		this.statisticType = buttonType;
		var btn1 = Ext.ComponentQuery.query("#btnStatisDaily")[0];
		var btn2 = Ext.ComponentQuery.query("#btnStatisMonthly")[0];
		var btn3 = Ext.ComponentQuery.query("#btnStatisYear")[0];
		var btn4 = Ext.ComponentQuery.query("#btnOther")[0];
		
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn3.removeCls('buttonCls');
		if(buttonType == 'TODAY'){
			btn1.addCls('buttonCls');
		}
		else if(buttonType == 'YEAR'){
			btn3.addCls('buttonCls');
		}
		else if(buttonType == 'MONTH'){
			btn2.addCls('buttonCls');
		}
		else if(buttonType == 'OTHER'){
			btn4.addCls('buttonCls');
		}
	},
	submitRequest:function(params){
		
		var Grid = Ext.ComponentQuery.query('#grid-list-item')[0];
			var storeTmp = Grid.getStore();
			storeTmp.getProxy().url = contextPath + '/getListStatisticImportProfit.json';
			storeTmp.getProxy().extraParams = params;
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
})