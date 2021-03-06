var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var paymentOption = null;
var btnAddCustomer = null; 
var btnSearchCustomer = Ext.create('MNG.view.popup.BtnSearchCustomer',{});
var btnTemplate = null;

var utilForm = Ext.create('CMM.form.util',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var popChService = null;
var buttChonDonTra = null;

Ext.define('MNG.controller.retailController', {
	extend : 'Ext.app.Controller',
	views : ['Ext.extCombo.view.SimpleComboBox'],
	popMenu: null,
	popChRoom: null,
	popChService: null,
	roomUseId: null,
	roomNm: null,
	roomId: null,
	hasPayed: false,
	totalMoneyValue: 0,
	payedMoney: 0,
	barcodeNumber: "",
	scannerOn: false, 
	payment:{
		type: PaymentTypeGroup.CASH,
		bankId: ''
	},
	printIframe: null,
	timeON: '00:00',
	init : function() {
		this.control({
			
			'#btnPayment' : {
				click : this.btnPayment
			},
			'#paymentItemId [name=DISCOUNT]' : {
				change: this.ChangeDiscountValue,
				focus: this.BlurDiscount
			},
			'#orderMainContainer [name=DISCOUNT]' : {
				change: this.ChangeDiscountValue
			},
			'#grid-menu-id' :{
				itemclick: this.ClickSelectMenu
			},
			'#btnUpdateService':{
				click: this.btnUpdateService
			},
			'#btnPrintDailyRoom':{
				click: this.btnPrintDaily
			},
			'#idSrvcSearch':{
				click: this.clickSrvcSearch
			},
			'#btnFindCustomer':{
				click: this.btnFindCustomer
			},
			'#btnPaymentId':{
				click: this.btnPaymentSubmit
			},
			'#btnPaymentIdOnlyPrint':{
				click: this.btnPaymentSubmitWithoutPrint	
			},
			'#btnDailyReport':{
				click: this.btnRptDaily
			},
			'#btnXemTonKho':{
				click: this.btnXemTonKho
			},
			'#grid-customer-item' :{
				itemdblclick: this.doubleClickCustomerGrid
			},
			'#PAYED_OPTION':{
				click: this.selectPaymentOption
			},
			'#btnSavePaymentOption':{
				click: this.btnSavePaymentOption
			},
			'#orderMainContainer button[name=submit]':{
				click: this.btnTraHangVeKho
			},
			'#orderMainContainer button[action=cancel]':{
				click: this.btnCancelTraHang
			},
			'#btnTraHang':{
				click: this.btnKichHoatTraHang
			},
			'button[action=scanner]':{
				click: this.btnOnOffScanner,
				afterrender: this.activeBarcodeScanner
			},
			
		});
	},
	btnXemTonKho111:function(){
		var location = contextPath + "/saleReport/baocaotonkho.do"; //+ param;
		utilForm.btn_template_popup(location,"Tồn kho",900,1024,true);
	},
	btnXemTonKho:function(){
		
		var arrDate = formatSupporter.getEnglishDate('TODAY');
		var param = "?SALE=1";  
		if(arrDate[0] != null)param = param + "&STARTDATE="+arrDate[0];
		if(arrDate[1] != null)param = param + "&ENDDATE="+arrDate[1];
		
		var location = contextPath + "/report/ThongKeChiTiet.do" + param;
		utilForm.btn_template_popup(location,"Thống Kê Bán Hàng",600,1024,true);
	},
	btnPayment:function(){
		var parent = this;
		if(parent.roomUseId == null) return;
		var param = "?LIID=" + parent.roomUseId + "&SUPPLYER="+WEB_ADDR; 
		var location = contextPath + "/report/billPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",850,800,true);
	},
	callPrint:function(roomUsedId,type){
		var parent = this;
		if(roomUsedId == null) return;
		var param = "?LIID=" + roomUsedId + "&SUPPLYER="+WEB_ADDR+ "&PRINT_TYPE="+type;
		var location = contextPath + "/report/billRetailPrint.do" + param;
		parent.autoPrint(location);
	},
	openBtnMenu:function(){
		if(this.popMenu==null){
			this.popMenu = Ext.create('MNG.view.popup.BtnAddMenu',{});
		}
		this.popMenu.show();
	},
	BtnSaveMenu:function(){
		this.request();
	},
	reloadListItem:function(){
		var parent = this;
		var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var storeTmp = Grid.getStore();
		storeTmp.loadData([],false);
		storeTmp.commitChanges();
	},
	ClickSelectMenu:function(component, record, index, eOpts){
		parent = this;		
		parent.clickOnMenuItem(component, record, index, eOpts);
	},
	clickOnMenuItem:function(component, record, index, eOpts){
		parent = this;		
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var menuId = record.get('SRVC_ID');
		var menuNm = record.get('SRVC_NM');
		var menuPrice = record.get('PRICE');
		var srvcId = record.get('SRVC_ID');
		var unit = record.get('UNIT');
		var unitNm = record.get('UNIT_NM');
	
		var isExist = false;
		tmpStore = gridTmp.getStore();
		gridTmp.getStore().each(function(record) {		
			if(menuId != null && menuId == record.get('SRVC_ID')){
				isExist = true;
			}
		});
		
		var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
		var reqResoucesData = null;
		
		if(isExist){
			Ext.MessageBox.confirm('Vui lòng xác nhận', 'Đã tồn tại, bạn chắc chắn muốn thêm ?', function(btn){
				if(btn == 'yes'){
					tmpStore.add({
						MENU_ID: menuId,
						PRICE: menuPrice,
						MENU_NM: menuNm,
						SRVC_NM: menuNm,
						AMOUNT: 1,
						UNIT: unit,
						UNIT_NM: unitNm,
						TOTAL_MONEY: menuPrice,
						SRVC_ID: srvcId,
						ACCUMULT :record.get('ACCUMULT')
					});
				}else{
				}
			});
		}
		else{
			tmpStore.add({
				MENU_ID: menuId,
				PRICE: menuPrice,
				MENU_NM: menuNm,
				SRVC_NM: menuNm,
				AMOUNT: 1,
				UNIT: unit,
				UNIT_NM: unitNm,
				TOTAL_MONEY: menuPrice,
				SRVC_ID: srvcId,
				ACCUMULT :record.get('ACCUMULT')
			});
		}
		parent.setPaymentInfo();
	},
	btnUpdateService:function(){
		
		var parent = this;
		var amountValue = Ext.ComponentQuery.query('#chgSrvcContainer #AMOUNT')[0].getValue();
		var priceValue = Ext.ComponentQuery.query('#chgSrvcContainer #PRICE')[0].getValue();
		var unitValue = Ext.ComponentQuery.query('#chgSrvcContainer #UNIT')[0].getValue();
		console.log('parent.popChService.serviceId : '+ popChService.serviceId);
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		
		var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
		
		gridTmp.getStore().each(function(record) {
			if(record.get('SRVC_ID') == popChService.serviceId){
				record.set('PRICE',priceValue);
				record.set('AMOUNT',amountValue);
				record.set('TOTAL_MONEY',(priceValue * amountValue));
				
				parent.setPaymentInfo();
			}
		});
		popChService.hide();
	},
	btnPrintDaily:function(){
		var parent = this;
		if(parent.roomUseId == null) return;
		var param = "?LIID=" + parent.roomUseId+"&ROOM_NM="+parent.roomNm ;
		
		var location = contextPath + "/report/rptDaily.do" + param;
		utilForm.btn_template_popup(location,"Phiếu xuất kho",850,800,true);
	},
	deleteRecord:function(grid, rowIndex, colIndex){
		me = this;
		store = grid.getStore();
		var rec = store.getAt(rowIndex);
		var roomUseId = rec.get('ROOM_USE_ID');
		rec.set('STATUS', 'delete');
		store.remove(rec);
		
		// Calculate
		var items = store.data.items;
		var totalMoney = 0;											
		for(var index = 0 ; index < items.length ; index++){
			totalMoney += (items[index].data.PRICE * items[index].data.AMOUNT);
		}
		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(totalMoney);
		//Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].setValue(totalMoney);
		
	},
	clickSrvcSearch:function(){
		var parent = this;
		var itemSearch = Ext.ComponentQuery.query('#SRVC_NM')[0];
		value = itemSearch.getValue();
		
		/*var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				IS_USED: 1,
				SRVC_NM: value
		};
		storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
		storeTmp.load();*/
		parent.searchServiceByValue(value);
	},
	FilterMenu:function(key, event){
		me = this;
		value = key.getValue();
		var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
			var storeTmp = Grid.getStore();
			
		if(event.getCharCode() == 13){
			console.log('Key Search ');
			storeTmp.clearFilter();
			me.searchServiceByValue(value);
		}
		else{
			console.log('Key Filter ');
			storeTmp.clearFilter();
			storeTmp.filter('SRVC_NM', value);
		}
	},
	searchServiceByValue:function(_value){
		
		var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				IS_USED: 1,
				SRVC_NM: _value
		};
		storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
		storeTmp.currentPage=1;
		storeTmp.load();
		storeTmp.on('load',function (store, records, successful, eOpts ){
			var localStorage = Ext.create('BIZ.utilities.localStorage', {});
			// Init data
			//localStorage.createLocalDabase(records);
		});
		
	},
	btnFindCustomer:function(){
		btnSearchCustomer.show();
	},
	btnAddCustomer:function(){
		var ScreenXY = Ext.getBody().getViewSize();
		var toadoY = ScreenXY.height;
		var toadoX = ScreenXY.width;
		
		componentTarget = Ext.ComponentQuery.query('#customerContainerId')[0];
		if(btnAddCustomer) btnAddCustomer.close();
		btnAddCustomer = Ext.create('MNG.view.popup.BtnAddCustomer'
				,{y: toadoY/2
				, x: toadoX -620
				, componentTarget: componentTarget
				}
			);
		btnAddCustomer.show();
		btnAddCustomer.initNew();
	},
	sendRequestPayment:function(isPrint){
		var parent = this;
		var param = {};
		var timeEnd  = Ext.ComponentQuery.query('#paymentItemId [name=CHANGETIME]')[0].getValue();
		// Get list srvc
		var tmpStoreResource = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore();
		var itemsLength = tmpStoreResource.data.items.length;
		paramData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		
		if(paymentOption!= null){
			payData = Ext.encode(Ext.Array.pluck(paymentOption.paymethodStore.data.items,'data'));
			param['METHOD'] = payData;
		}
		
		param['DATA'] = paramData;
		param['ROOM_ID'] = parent.roomId;
		param['ROOM_USE_ID'] = parent.roomUseId;
		
		var discountValue = Ext.ComponentQuery.query('#paymentItemId [name=DISCOUNT]')[0].getValue();
		var total = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
		var paymoney = Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].getValue();
		var isDeliver = Ext.ComponentQuery.query('#paymentItemId [name=IS_DELIVERED]')[0].getValue();
		var isPayed = Ext.ComponentQuery.query('#paymentItemId [name=HAS_PAYED]')[0].getValue();
		var cusCD = Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].getValue();
		var cusAddr = Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].getValue();
		var cusNM = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getRawValue();
		var userName = Ext.ComponentQuery.query('#customerContainerId [name=USERNAME]')[0].getValue();
		
		// Payment params
		param['CHANGE_DATE'] = timeEnd;
		param['PAYED_MONEY'] = paymoney;
		param['TOTAL_MONEY'] = total;
		param['DISCOUNT'] 	 = discountValue!=null?discountValue:0;
	    param['IS_DEBIT'] 	 = 1;
	    param['HAS_PAYED'] 	 = (isPayed == true)?'1':'0';
	    param['DSCRT'] 		 = '';
	    
	    // Bill info
	    param['IS_DELIVERED'] = (isDeliver == true)?'1':'0';
	    param['IS_ORDER'] = 1;
	    param['BILL_CD'] = 'BILL_CD',
	    param['CUS_CD'] = cusCD;
	    param['CUS_NM'] = cusNM;
	    param['DSCRT'] = cusAddr;
	    param['PAY_METHOD'] = parent.payment.type;
	    param['ID_BANK'] = parent.payment.bankId;
	    param['USER_NAME'] = userName;
	    
	    // Calculate total score
		param['ACCUMULT'] = parent.caculateScore(tmpStoreResource);
	    if(itemsLength > 0){
	    	var url_request = contextPath + '/sale/saveSaleOrderList.json';
	    	parent.submitRequest(param, isPrint, 0);
	    }
	},
	btnPaymentSubmit:function(){
		var parent = this;
		parent.sendRequestPayment(true);
	},
	btnPaymentSubmitWithoutPrint:function(){
		var parent = this;
		parent.sendRequestPayment(false);
	},
	btnRptDaily:function(){
		
		var arrTime = formatSupporter.getEnglishDate('TODAY');
		var STARTDATE = arrTime[0];
		var ENDDATE = arrTime[1];
		var param = "";
		if(STARTDATE != null)
				param = param + "&STARTDATE=" + STARTDATE;
		if(ENDDATE != null)
				param = param + "&ENDDATE=" + ENDDATE;
		
		var location = contextPath + "/saleReport/calculateProfit.do?" + param;
		utilForm.btn_template_popup(location,"Báo cáo ngày",800,1024,true);
	},
	doubleClickCustomerGrid:function(component, record, index, eOpts){
		
		var _name = record.get('NAME');
		var _score = record.get('SCORE');
		var _addr = record.get('ADDR');
		var _cusCD = record.get('CUS_CD');
		
		Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].setValue(_name);
		Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].setValue(_addr);
		Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].setValue(_cusCD);
		btnSearchCustomer.hide();
	},
	submitRequest:function(param, isPrint, isCancel){
		parent = this;
		var url_request = contextPath + '/sale/saveSaleOrderList.json';
		
		data = formatSupporter.formatToMoney(param['TOTAL_MONEY']);
		
		// Customer infomation
		var customerNM = 'Khách lẻ';
		var customerScoreInfo = '';
		if(param['CUS_NM'] !=null){
			customerNM = param['CUS_NM'];
			dataScore = formatSupporter.formatToMoney(param['ACCUMULT']);
			customerScoreInfo = '<br> Tích lũy: <span style="color:#d40e0e;">'+ dataScore+'đ</span>';
		}
		
		swal({
			  title: 'Vui lòng xác nhận !',
			  text: '<span style="color:#d40e0e;font-weight: bold;">'
			  		+ data + 'đ</span>' 
			  		+ '<br> Khách hàng: <span style="color:#1a9bd0;font-weight: bold;">'+ customerNM+'</span>'
			  		//+ customerScoreInfo
			  		//+ '<br> Giao dịch: <span style="color:#1a9bd0;font-weight: bold;">'+ paymentOption.paymentOption.text+'</span>'
			  		+ '<br> Ghi chú: <span style="color:#1a9bd0">'+ param['DSCRT']+'</span>',
			  type: "warning",
			  html: true,
			  showCancelButton: true,
			  closeOnConfirm: true,
			  showLoaderOnConfirm: true,
			},
			function(){
				supportEvent.showLoadingOnprogress('Đang xử lý, vui lòng đợi giây lát !', '');
				Ext.Ajax.request( {
			    	url: url_request,
			    	method:'POST',
			    	params: param,
			    	success: function(response){
			    		supportEvent.hiddeMessageBox();
			    		var text = Ext.JSON.decode(response.responseText);
			    		var tmpRoomTurnId = text.data;
			    		if(isPrint == true){
			    			parent.callPrint(tmpRoomTurnId,'');
			    		}
			    		else{
			    			supportEvent.notiSuccess("Đơn hàng",'Lưu thành công !');
			    		}
			    		parent.reloadListItem();
			    		parent.reloadMenuList();
			    		Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].setValue(null);
			    		your_combo = Ext.ComponentQuery.query('#customerContainerId #comboCustomerId')[0];
			    		your_combo.reset();
			    		Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].setValue("");
			    		Ext.ComponentQuery.query('#paymentItemId [name=HAS_PAYED]')[0].setValue('0');
			    		Ext.ComponentQuery.query('#paymentItemId [name=IS_DELIVERED]')[0].setValue('0');
			    		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(0);
			    		Ext.ComponentQuery.query('#paymentItemId [name=DISCOUNT]')[0].setValue(0);
			    		Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].setValue(0);
			    		if(isCancel==1){
			    			parent.btnCancelTraHang();
			    		}
			    	},
			    	failure: function(response){
			    		supportEvent.hiddeMessageBox();
			    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
			    	}
			 });
			});
	},
	setValueForPay:function(valueTotal){
		
		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(valueTotal);
		
		trahangContainer = Ext.ComponentQuery.query('#orderMainContainer')[0];
		if(trahangContainer) trahangContainer.down('[name=TOTAL_MONEY]').setValue(valueTotal);
	},
	getTotalSumvalue: function(){
		
		var storeTarget = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore(); 
		var valueTotal = gridSupport.calculateMoney(storeTarget);
		return valueTotal;
	},
	setPaymentInfo:function(){
		parent = this;
		var valueTotal = parent.getTotalSumvalue();
		var value = Ext.util.Format.number(valueTotal, '0,')
		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(valueTotal);
		trahangContainer = Ext.ComponentQuery.query('#orderMainContainer')[0];
		if(trahangContainer) trahangContainer.down('[name=TOTAL_MONEY]').setValue(valueTotal);
	},
	setSumValueHaveToPay: function(valueTotal){
		
		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(valueTotal);
		trahangContainer = Ext.ComponentQuery.query('#orderMainContainer')[0];
		if(trahangContainer) trahangContainer.down('[name=TOTAL_MONEY]').setValue(valueTotal);
	},
	caculateScore: function(_store){
		var _value = 0;
		for(var i=0; i < _store.data.items.length; i++){
			item = _store.data.items[i];
			if(item.data.ACCUMULT){
				_value = _value + parseFloat(item.data.ACCUMULT);
			}
		}
		return _value;
	},
	selectPaymentOption: function(){
		var ScreenXY = Ext.getBody().getViewSize();
		var toadoY = ScreenXY.height;
		var toadoX = ScreenXY.width;
		
		paymentOption = Ext.ComponentQuery.query('#addPaymentPopup')[0];
		var _havePayValue = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
		var targetComponent =  Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0];
		var _customerPayValue = Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].getValue();
		if(paymentOption != null) paymentOption.close();
		var totalValue = formatSupporter.formatToMoney(_havePayValue);
		paymentOption = Ext.create('ECNT.view.popup.BtnHinhThucTT'
							,{totalValue: totalValue
							, customerPayValue: _customerPayValue
							, y: toadoY - 310
							, x: toadoX - 540
							, targetComponent: targetComponent});
		paymentOption.show();
	},
	btnSavePaymentOption:function(){
		parent = this;
		isOK = true;
		bankId = Ext.ComponentQuery.query('#btnRoomPayment #comboCustomerId')[0].getValue();
		if(bankId != null && bankId.length > 0){
			parent.payment.bankId = bankId;
			parent.payment.type = paymentOption.paymentOption.type;
		}
		if(paymentOption.paymentOption.type != PaymentTypeGroup.CASH){
			console.info('bankId = '+bankId);
			if(bankId == null || bankId.length < 1){
				isOK = false;
				supportEvent.showWarningTimer('Chưa chọn tài khoản nhận tiền !');
			}
		}
		if(isOK) {
			_text = '';
			parent.payment.type = paymentOption.paymentOption.type;
			Ext.ComponentQuery.query('#PAYED_LABEL')[0].setText('('+paymentOption.paymentOption.text+')');
			paymentOption.hide();
		}
	},
	autoPrint:function(_url){
		me = this;
		 var iframe = me.printIframe;
		 if (!me.printIframe) {
			 console.info('True');
			iframe = me.printIframe = document.createElement('iframe');
			document.body.appendChild(iframe);
			iframe.style.display = 'none';
			iframe.width = '100%';
			iframe.height = '100%';
			iframe.onload = function() {
			    setTimeout(function() {
			    iframe.focus();
			    iframe.contentWindow.print();
			 }, 50);
			};
		 }
		 iframe.src = _url;
	},
	reloadMenuList:function(){
		var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
			IS_USED: 1
		};
		storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
		storeTmp.currentPage = 1;
		storeTmp.pageSize= 100;
		storeTmp.load();
	},
	ChangeDiscountValue: function(field, value){
		
		parent = this;
		var totalValue = parent.getTotalSumvalue();
		var havePayValue = totalValue - value;
		parent.setSumValueHaveToPay(havePayValue);
	},
	BlurDiscount( field, The, eOpts ){
		var ScreenXY = Ext.getBody().getViewSize();
		var toadoY = ScreenXY.height;
		var toadoX = ScreenXY.width;
		
		var _havePayValue = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
		var totalValue = formatSupporter.formatToMoney(_havePayValue);
		
		if(btnTemplate != null) btnTemplate.close();
		btnTemplate = Ext.create('ECNT.view.popup.BtnSetChietKhau'
					,{totalValue: _havePayValue
					, displayValue: totalValue
					, y: toadoY/2
					, x: toadoX -550
					, targetComponent: field});
		btnTemplate.show();
	},
	/**
	 * @author Nguyen
	 * @description Tra hang ve kho 
	 * 
	 * */
	btnTraHangVeKho:function(field){
		
		var parent = this;
		var param = {};
		var timeEnd  = Ext.ComponentQuery.query('#paymentItemId [name=CHANGETIME]')[0].getValue();
		// Get list srvc
		var tmpStoreResource = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore();
		var itemsLength = tmpStoreResource.data.items.length;
		paramData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		
		if(paymentOption!= null){
			payData = Ext.encode(Ext.Array.pluck(paymentOption.paymethodStore.data.items,'data'));
			param['METHOD'] = payData;
		}
		
		param['DATA'] = paramData;
		param['ROOM_ID'] = parent.roomId;
		param['ROOM_USE_ID'] = parent.roomUseId;
		
		var discountValue = field.up('#orderMainContainer').down('[name=DISCOUNT]').getValue();
		var total = field.up('#orderMainContainer').down('[name=TOTAL_MONEY]').getValue();
		var paymoney = field.up('#orderMainContainer').down('[name=PAYED]').getValue();
		var cusCD = Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].getValue();
		var cusAddr = Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].getValue();
		var cusNM = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getRawValue();
		var userName = Ext.ComponentQuery.query('#customerContainerId [name=USERNAME]')[0].getValue();
		
		// Payment params
		param['CHANGE_DATE'] = timeEnd;
		param['PAYED_MONEY'] = paymoney;
		param['TOTAL_MONEY'] = total;
		param['DISCOUNT'] 	 = discountValue!=null?discountValue:0;
	    param['IS_DEBIT'] 	 = 1;
	    param['DSCRT'] 		 = '';
	    
	    // Bill info
	    param['IS_ORDER'] = 1;
	    param['BILL_CD'] = 'BILL_CD',
	    param['CUS_CD'] = cusCD;
	    param['CUS_NM'] = cusNM;
	    param['DSCRT'] = cusAddr;
	    param['PAY_METHOD'] = parent.payment.type;
	    param['ID_BANK'] = parent.payment.bankId;
	    param['USER_NAME'] = userName;
	    param['IS_RETURN'] = 1;
	    
	    if(itemsLength > 0){
	    	parent.submitRequest(param, true, 1);
		}
	},
	btnKichHoatTraHang: function(){
		var parent = this;
		parent.reloadListItem();
		
		var mainPanelPayment = Ext.ComponentQuery.query('#mainPanelPayment')[0];
		if(mainPanelPayment.items.length == 0){
			itemPayment = Ext.create('BS.infoPaymentContainer', {});
			mainPanelPayment.insert(itemPayment);	
			itemNew = Ext.create('BS.infoOrderContainer', {});
			mainPanelPayment.insert(itemNew);
		}
		if(mainPanelPayment.items.length == 1){
			itemNew = Ext.create('BS.infoOrderContainer', {});
			mainPanelPayment.insert(itemNew);
		}
		mainPanelPayment.setActiveTab(1);
		
		if(buttChonDonTra != null) buttChonDonTra.close();
		buttChonDonTra = Ext.create('MNG.view.popup.BtnChonDonTra', {});
		buttChonDonTra.show();
	},
	btnCancelTraHang: function(){
		var parent = this;
		parent.reloadListItem();
		var mainPanelPayment = Ext.ComponentQuery.query('#mainPanelPayment')[0];
		mainPanelPayment.removeAll();
		itemNew = Ext.create('BS.infoPaymentContainer', {});
		mainPanelPayment.insert(itemNew);
		mainPanelPayment.doLayout();
		mainPanelPayment.setActiveTab(0);
	},
	btnOnOffScanner: function(field, event){
		
		if(event.type != 'click') return;
		
		var parent = this;
		if(parent.scannerOn){ 
			field.removeCls('scaner-on');
			field.addCls('scaner-off');
		}
		else {
			field.removeCls('scaner-off');
			field.addCls('scaner-on');
		}
		parent.scannerOn = !parent.scannerOn;
	},
	activeBarcodeScanner:function(){
		var parent = this;
		elementDoc = Ext.getDoc();
		elementDoc.addListener('keydown', function(e, t) {
			if(e.keyCode == e.S && e.shiftKey){
				parent.barcodeNumber = '';
				Ext.ComponentQuery.query('#SRVC_NM')[0].setValue('');
			}else{
				Str = '';
				if(e.keyCode == 16) Str = 'S';
				else Str = String.fromCharCode(e.keyCode).toUpperCase();
				if(parent.scannerOn){
					parent.barcodeNumber = parent.barcodeNumber + Str;
				}
			}
			});
		elementDoc.addListener('keyup', function(e, t) {
			if(parent.barcodeNumber.length > 0 && e.keyCode == e.ENTER){
				if(parent.scannerOn){
					Ext.ComponentQuery.query('#SRVC_NM')[0].setValue(parent.barcodeNumber);
					parent.getProductToBillByCode(parent.barcodeNumber);
					parent.barcodeNumber = '';
				}
			}
		});
		
	},
	AddProductToBillByCode: function(recordResult){
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var isExist = false;
		tmpStore = gridTmp.getStore();
		tmpStore.each(function(record) {		
			if(recordResult.get('SRVC_CD') != null && recordResult.get('SRVC_CD') == record.get('MENU_ID')){
				isExist = true;
			}
		});
		
		if(isExist==false)
			tmpStore.add({
				MENU_ID: recordResult.get('SRVC_CD'),
				PRICE: recordResult.get('PRICE'),
				MENU_NM: recordResult.get('SRVC_NM'),
				SRVC_NM: recordResult.get('SRVC_NM'),
				AMOUNT: 1,
				UNIT: recordResult.get('UNIT'),
				UNIT_NM: recordResult.get('UNIT_NM'),
				TOTAL_MONEY: 100000,
				SRVC_ID: recordResult.get('SRVC_ID'),
				ACCUMULT : 0
			});
		else{
			// Update store
			tmpStore.each(function(record) {		
				if(recordResult.get('SRVC_CD') != null && recordResult.get('SRVC_CD') == record.get('MENU_ID')){
					let newValue = record.get('AMOUNT');
					newValue = newValue + 1;
					record.set('AMOUNT',newValue);
				}
			});
		}
	},
	getProductToBillByCode: function(srvcCd){
		var parent = this;
		var menuStore = Ext.ComponentQuery.query('#grid-menu-id')[0];
		menuStore.getStore().each(function(record) {		
			if(srvcCd != null && srvcCd.trim() == record.get('SRVC_CD').trim()){
				
				parent.AddProductToBillByCode(record);
				return 1;
			}
		});
	}
})