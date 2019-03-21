var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var btnLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var btnAddCustomer = Ext.create('MNG.view.popup.BtnCustomer',{});
var btnListBillCustomer = Ext.create('MNG.view.popup.BtnCustomerBill',{});
var btnListProductCustomer = Ext.create('MNG.view.popup.BtnCustomerProduct',{});
var utilForm = Ext.create('CMM.form.util',{});

Ext.define('MNG.controller.customerFavoriteController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.srvcView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	popupAnalysis: null,
	cusId: null,
	init : function() {
		this.control({
			
			'#btnAddCustomer':{
				click: this.btnAddCustomer
			},
			'#BtnSaveSrvc' : {
				click : this.createCustomer
			},
			'#delSrvcBtn' : {
				click : this.deleteUser
			},
			'#btnViewCustomerBill':{
				click : this.viewBill
			},
			'#btnPdfPrint':{
				click: this.btnPdfPrint
			},
			'#btnExcelPrint':{
				click: this.btnExcelPrint
			},
			'#btnHistoryBillPDF':{
				click: this.btnHistoryBillPDF
			},
			'#btnHistoryProductMonth':{
				click: this.btnHistoryProductMonth
			},
			'#btnHistoryProductAll':{
				click: this.btnHistoryProductAll
			},
			'#btnHistoryBillMonth':{
				click: this.btnHistoryBillMonth
			},
			'#btnHistoryBillAll':{
				click: this.btnHistoryBillAll
			},
			'#btnHistoryProductPDF':{
				click: this.btnHistoryProductPDF
			},
			'#btnHistoryBillOther':{
				click: this.btnHistoryBillOther
			},
			'#btnHistoryProductOther':{
				click: this.btnHistoryProductOther
			},
			'#btnSubmitLookupTime':{
				click: this.btnSubmitLookupTime
			}
		});
	},
	btnHistoryPDFPrint:function(){
		var params = 'CUS_CD='+this.cusId+'&page=1&start=0&limit=100';
		var location = contextPath + "/customer/lichsugiaodich.do?"+params;
		utilForm.btn_template_popup(location,"Lịch sử giao dịch",600,1024,true)
	},
	btnPdfPrint: function(){
		var location = contextPath + "/customer/danhsachkhachhang.do?IS_FAVORITE=1";
		utilForm.btn_template_popup(location,"Danh sách khách hàng",600,1024,true)
	},
	btnExcelPrint: function(){
		var param = "?FILENAME="+ "DanhSachKhachHang&IS_FAVORITE=1"; 
		var _url = contextPath + '/customer/khachhangexcel.do'+param;
		this.downloadFile(_url);
	},
	clickSrvcSearch:function(){
		var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				NAME: _value,
				limit: 10,
				IS_FAVORITE:1
		};
		storeTmp.getProxy().url = contextPath + '/customer/getLisPagingCustomers.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize=10;
		storeTmp.load();
	},
	btnAddCustomer:function(){
		me = this;
		var params = {
				cusName : null,
				cusID: 0,
				cusPhone:'',
				cusEmail:'',
				cusAddr:'',
				score: 0
		};
		me.showAddCustomer(params);
	},
	showAddCustomer:function(params){
		btnAddCustomer.config = params;
		console.info(params);
		btnAddCustomer.show();
		btnAddCustomer.initNew();
	},
	createCustomer:function(){
		var parent = this;
		name = Ext.ComponentQuery.query('#addCustomerId #NAME')[0].getValue();
		phone = Ext.ComponentQuery.query('#addCustomerId #PHONE')[0].getValue();
		email = Ext.ComponentQuery.query('#addCustomerId #EMAIL')[0].getValue();
		addr = Ext.ComponentQuery.query('#addCustomerId #ADDR')[0].getValue();
		score = Ext.ComponentQuery.query('#addCustomerId #ACCUMULT')[0].getValue();
		isFavorite = Ext.ComponentQuery.query('#addCustomerId [name=IS_FAVORITE]')[0].getValue();
		var params = {
				CUS_CD: btnAddCustomer.config.cusID,
				NAME: name,
				PHONE: phone,
				EMAIL: email,
				ADDR: addr,
				ACCUMULT: 0,
				IS_FAVORITE: isFavorite==true?1:0
		};
		parent.submitRequestCustomer(params);
	},
	submitRequestCustomer:function(_params){
		var parent = this;
		var submitFinishUrl = contextPath + '/customer/createCustomer.json';
		supportEvent.showLoadingOnprogress('Đang lưu...', 'BtnSaveSrvc');
		
		Ext.Ajax.request( {
			url: submitFinishUrl,
    		method:'POST',
    		params: _params,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.info(text);
    			if( text.success == true){
    				parent.hasPayed = true;
    				Ext.MessageBox.hide();
    				btnAddCustomer.hide();
    				var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.currentPage = 1;
					storeTmp.pageSize=13;
					storeTmp.getProxy().extraParams = {
						IS_FAVORITE:1
								};
					storeTmp.load();
    			}
    			else supportEvent.showMessageError('Có lỗi xảy ra !');
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			supportEvent.showMessageError('Có lỗi xảy ra !');
    		}
		});
	},
	doubleClickCustomer:function(compt, record, item, index, e){
		var idCus = record.get('CUS_CD');
		this.cusId = idCus;
		if(idCus != null){
			btnListBillCustomer.show();
			btnListBillCustomer.loadListBills(idCus+'');
		}
	},
	viewBill:function(){
		userGrid = Ext.ComponentQuery.query('#grid-customer-bill')[0];
		if(userGrid.getSelectionModel().hasSelection()){
			tmpRow = userGrid.getSelectionModel().getSelection()[0];
			roomUseId = tmpRow.get('ROOM_USED_ID');
			var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
			var location = contextPath + "/report/billRetailPrint.do" + param;
			utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
		}
	},
	doubleClickViewBill:function(compt, record, item, index, e){
		console.info(record);
		roomUseId = record.get('ROOM_USED_ID');
		var param = "?LIID=" + roomUseId+ "&SUPPLYER="+WEB_ADDR+'&PRINT_TYPE=1'; 
		var location = contextPath + "/report/billRetailPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
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
	viewHistoryByBill: function(record){
		var idCus = record.get('CUS_CD');
		this.cusId = idCus;
		if(idCus != null){
			btnListBillCustomer.params.STARTDATE = null;
			btnListBillCustomer.params.ENDDATE = null;
			btnListBillCustomer.params.CUS_CD = idCus+'';
			btnListBillCustomer.loadListBills();
			btnListBillCustomer.display(record.get('NAME')+' - ĐT:'+record.get('PHONE'))
		}
	},
	viewHistoryByProduct: function(record){
		var idCus = record.get('CUS_CD');
		this.cusId = idCus;
		if(idCus != null){
			btnListProductCustomer.params.STARTDATE = null;
			btnListProductCustomer.params.ENDDATE = null;
			btnListProductCustomer.params.CUS_CD = idCus+'';
			btnListProductCustomer.loadListBills();
			btnListProductCustomer.display(record.get('NAME')+' - ĐT:'+record.get('PHONE'));
		}
	},
	getRequestProductCustomer:function(){
		var storeTmp = Grid.getStore();
			storeTmp.getProxy().url = contextPath + '/getPagingProductHavedSaled.json';
			storeTmp.getProxy().extraParams = params;
			storeTmp.currentPage = 1;
			storeTmp.pageSize=12;
			storeTmp.load({
						 callback: function (records, operation, success) {
					        var data = Ext.JSON.decode(operation.response.responseText);
					        SumObj = data.SumObj;
					        console.log('SumObj', SumObj);
					        totalValue = SumObj.total;
					        if(totalValue != null && totalValue != '')
					        	totalValue = Math.round(totalValue);
					        value1 = formatSupporter.formatToMoney(totalValue);
					        alert(value1);
					        Ext.ComponentQuery.query('#statis-total-id1')[0].setText(value1);					       
					     }
					});
	},
	btnHistoryProductMonth: function(){
		arrTime = formatSupporter.getEnglishDate('MONTH');
		btnListProductCustomer.params.STARTDATE = arrTime[0];
		btnListProductCustomer.params.ENDDATE = arrTime[1];
		var btn1 = Ext.ComponentQuery.query("#btnHistoryProductMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryProductAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn1.addCls('buttonCls');
		btnListProductCustomer.loadListBills();
	},
	btnHistoryProductAll: function(){
		btnListProductCustomer.params.STARTDATE = null;
		btnListProductCustomer.params.ENDDATE = null;
		var btn1 = Ext.ComponentQuery.query("#btnHistoryProductMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryProductAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn2.addCls('buttonCls');
		btnListProductCustomer.loadListBills();
	},
	btnHistoryBillMonth: function(){
		arrTime = formatSupporter.getEnglishDate('MONTH');
		btnListBillCustomer.params.STARTDATE = arrTime[0];
		btnListBillCustomer.params.ENDDATE = arrTime[1];
		var btn1 = Ext.ComponentQuery.query("#btnHistoryBillMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryBillAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn1.addCls('buttonCls');
		btnListBillCustomer.loadListBills();
	},
	btnHistoryBillAll: function(){
		btnListBillCustomer.params.STARTDATE = null;
		btnListBillCustomer.params.ENDDATE = null;
		var btn1 = Ext.ComponentQuery.query("#btnHistoryBillMonth")[0];
		var btn2 = Ext.ComponentQuery.query("#btnHistoryBillAll")[0];
		btn1.removeCls('buttonCls');
		btn2.removeCls('buttonCls');
		btn2.addCls('buttonCls');
		btnListBillCustomer.loadListBills();
	},
	btnHistoryProductPDF:function(){
		var param = "?CUS_CD=" + btnListProductCustomer.params.CUS_CD;
		if(btnListProductCustomer.params.STARTDATE != null) param = param + "&STARTDATE="+btnListProductCustomer.params.STARTDATE;
		if(btnListProductCustomer.params.ENDDATE != null) param = param + '&ENDDATE='+btnListProductCustomer.params.ENDDATE;
		var location = contextPath + "/report/PrintSaledProduct.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",800,1024,true);
	},
	btnHistoryBillPDF:function(){
		var param = 'CUS_CD='+btnListBillCustomer.params.CUS_CD+'&page=1&start=0&limit=100';
		if(btnListBillCustomer.params.STARTDATE != null) param = param + "&STARTDATE="+btnListBillCustomer.params.STARTDATE;
		if(btnListBillCustomer.params.ENDDATE != null) param = param + '&ENDDATE='+btnListBillCustomer.params.ENDDATE;
		var location = contextPath + "/customer/lichsugiaodich.do?"+param;
		utilForm.btn_template_popup(location,"Lịch sử giao dịch",600,1024,true)
	},
	btnHistoryBillOther:function(){
		btnLookupTime.show();
		btnLookupTime.config.parentObj = btnListBillCustomer;
	},
	btnHistoryProductOther:function(){
		btnLookupTime.show();
		btnLookupTime.config.parentObj = btnListProductCustomer;
	},
	btnSubmitLookupTime: function(){
		var parentObj = btnLookupTime.config.parentObj;
		if(parentObj != null){
			var startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
			var endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
			parentObj.params.STARTDATE = formatSupporter.getTimeStempDateFormat(startDate);
			parentObj.params.ENDDATE = formatSupporter.getTimeStempDateFormat(endDate);
			parentObj.loadListBills();
		}
		btnLookupTime.hide();
	},
	viewChartAnalysis: function(rec){
		me = this;
		var tmpCmpt = Ext.ComponentQuery.query('#customerChartAnalysisID')[0];
		if(tmpCmpt)me.popupAnalysis.close();
		me.popupAnalysis = Ext.create('MNG.view.popup.BtnCustomerChartAnalysis',{
			customerID: rec.get('CUS_CD'),
			title: rec.get('NAME')
		});
		me.popupAnalysis.show();
	},
	deleteRecordCustomer:function(rec){
		var cusID = rec.get('CUS_CD');
		
		Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request( {
		    		url: contextPath + '/customer/deleteCustomer.json',
		    		method:'POST',
		    		params : {	CUS_CD : cusID},
		    		success: function(response){
		    			var text = Ext.JSON.decode(response.responseText);
		    			if( text.success == true){
		    				var Grid = Ext.ComponentQuery.query('#grid-customer-item')[0];
		    				var storeTmp = Grid.getStore();
		    				storeTmp.load();
		    				//supportEvent.showMessageSuccess('Xóa thành công !');
		    			}
		    		},
		    		failure: function(response){
		    			var text = Ext.JSON.decode(response.responseText);
		    			console.log( text);   
		    			alert('Save failure' );
		    		}
		    	});
			}
		});
		
	}
})