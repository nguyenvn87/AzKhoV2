var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var startEvent = Ext.create('MNG.view.popup.BtnStart',{});
var stopEvent = Ext.create('MNG.view.popup.BtnClose',{});
var paymentEvent = Ext.create('MNG.view.popup.BtnPayment',{});
var paymentOption = null;
var btnAddCustomer = Ext.create('MNG.view.popup.BtnAddCustomer',{});
var btnSearchCustomer = Ext.create('MNG.view.popup.BtnSearchCustomer',{});

var utilForm = Ext.create('CMM.form.util',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var popChService = null;

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
			'#btnRoomPayment button[action=pay]' : {
				click : this.onSelectPaymentType
			},
			'#grid-menu-id' :{
				itemdblclick: this.doubleClickSelectMenu
			},
			'#grid-menu-id' :{
				itemclick: this.ClickSelectMenu
			},
			'#idSrvcSelect':{
				click : this.selectMenuItem
			},
			'#grid-room-turn':{
				itemdblclick: this.doubleClickTurnSrvc
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
			'#btnAddCustomer':{
				click: this.btnAddCustomer
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
			}
			
		});
	},
	btnXemTonKho:function(){
		var location = contextPath + "/saleReport/baocaotonkho.do"; //+ param;
		utilForm.btn_template_popup(location,"Tồn kho",900,1024,true);
	},
	testClick: function(){
		var location = contextPath + "/report/testreport.do"; //+ param;
		utilForm.btn_template_popup(location,"Giấy chứng nhận",600,1024,true);
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
	doubleClickMenu:function(){
		if(this.popMenu==null){
			this.popMenu = Ext.create('MNG.view.popup.BtnAddMenu',{});
		}
		this.popMenu.show();;
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
	doubleClickSelectMenu:function(component, record, index, eOpts){
		
		parent = this;		
		//parent.clickOnMenuItem(component, record, index, eOpts);
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
	selectMenuItem : function(){
		parent = this;
		var gridTarget = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var gridTmp = Ext.ComponentQuery.query('#grid-menu-id')[0];
		
		if(gridTmp.getSelectionModel().hasSelection()){	
			var amountValue = Ext.ComponentQuery.query('#menu_amount_id')[0];
			var row = gridTmp.getSelectionModel().getSelection()[0];
			var menuId = row.get('SRVC_ID');
			var isExist = false;
			gridTarget.getStore().each(function(record) {
				if(menuId != null && menuId == record.get('SRVC_ID')){
					isExist = true;
				}
			});
			var tmpStoreResource = gridTarget.getStore();
			var reqResoucesData = null;
			if(!isExist){
				tmpStoreResource.add({
					PRICE: row.get('PRICE'),
					AMOUNT: amountValue.getValue(),
					TOTAL_MONEY: row.get('PRICE')*amountValue.getValue(),
					SRVC_ID: row.get('SRVC_ID'),
					SRVC_NM: row.get('SRVC_NM'),
					MENU_NM: row.get('SRVC_NM'),
				});
			}
			Ext.ComponentQuery.query('#menu_amount_id')[0].setValue(1);
			parent.setPaymentInfo();
		}
	},
	doubleClickTurnSrvc:function(){
		if(popChService==null){
			popChService = Ext.create('MNG.view.popup.BtnChangeService',{});
		}
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var row = gridTmp.getSelectionModel().getSelection()[0];
		var menuId = row.get('SRVC_ID');
		popChService.serviceId = menuId;
		popChService.show();
		gridSupport.selectGridPopup('#idContainerRoomSrvc','#grid-room-turn','#chgSrvcContainer');
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
	btnStoreStatic:function(){
		var param = "?LIID="; 
		var location = contextPath + "/report/calculateStore.do" + param;
		utilForm.btn_template_popup(location,"Báo cáo tồn kho",400,800,true);
	},
	btnPrintDaily:function(){
		var parent = this;
		if(parent.roomUseId == null) return;
		var param = "?LIID=" + parent.roomUseId+"&ROOM_NM="+parent.roomNm ;
		
		var location = contextPath + "/report/rptDaily.do" + param;
		utilForm.btn_template_popup(location,"Phiếu xuất kho",850,800,true);
	},
	resetNotiStatus:function(){
		var parent = this;
		parent.timeON = 'X';
    	parent.payedMoney = 'X';
    	parent.roomNm = '';
	},
	showNotificationRoom:function(){
		var parent = this;
		value1 = formatSupporter.formatToMoney(parent.payedMoney);
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
		var itemSearch = Ext.ComponentQuery.query('#SRVC_NM')[0];
		value = itemSearch.getValue();
		
		var Grid = Ext.ComponentQuery.query('#grid-menu-id')[0];
		var storeTmp = Grid.getStore();
		storeTmp.getProxy().extraParams={
				IS_USED: 1,
				SRVC_NM: value
		};
		storeTmp.getProxy().url = contextPath + '/getSearchListMenu.json';
		storeTmp.load();
	},
	FilterMenu:function(key, event){
		me = this;
		value = key.getValue();
		console.log('Key = '+value + ' / '+event.getCharCode());
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
	},
	btnFindCustomer:function(){
		btnSearchCustomer.show();
	},
	btnAddCustomer:function(){
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
		
		var total = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
		var paymoney = Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].getValue();
		var isDeliver = Ext.ComponentQuery.query('#paymentItemId [name=IS_DELIVERED]')[0].getValue();
		var isPayed = Ext.ComponentQuery.query('#paymentItemId [name=HAS_PAYED]')[0].getValue();
		var cusCD = Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].getValue();
		var cusAddr = Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].getValue();
		var cusNM = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getRawValue();
		// Payment params
		param['CHANGE_DATE'] = timeEnd;
		param['PAYED_MONEY'] = paymoney;
		param['TOTAL_MONEY'] = total;
	    param['IS_DEBIT'] = 1;
	    param['HAS_PAYED'] = (isPayed == true)?'1':'0';
	    param['DSCRT'] = '';
	    
	    // Bill info
	    param['IS_DELIVERED'] = (isDeliver == true)?'1':'0';
	    param['IS_ORDER'] = 1;
	    param['BILL_CD'] = 'BILL_CD',
	    param['CUS_CD'] = cusCD;
	    param['CUS_NM'] = cusNM;
	    param['DSCRT'] = cusAddr;
	    param['PAY_METHOD'] = parent.payment.type;
	    param['ID_BANK'] = parent.payment.bankId;
	    // Calculate total score
		param['ACCUMULT'] = parent.caculateScore(tmpStoreResource);
	    if(itemsLength > 0)
		parent.submitRequest(param, isPrint);
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
	submitRequest:function(param, isPrint){
		parent = this;
		url_request = contextPath + '/sale/saveSaleOrderList.json';
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
			  		+ customerScoreInfo
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
		
		Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].setValue(valueTotal);
	},
	setPaymentInfo:function(){
		
		var storeTarget = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore(); 
		var valueTotal = gridSupport.calculateMoney(storeTarget)
		var value = Ext.util.Format.number(valueTotal, '0,')
		
		Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].setValue(valueTotal);
		
		Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].setValue(valueTotal);
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
		
		paymentOption = Ext.ComponentQuery.query('#addPaymentPopup')[0];
		var _havePayValue = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
		var targetComponent =  Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0];
		var _customerPayValue = Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].getValue();
		if(paymentOption != null) paymentOption.close();
		var totalValue = formatSupporter.formatToMoney(_havePayValue);
		paymentOption = Ext.create('ECNT.view.popup.BtnHinhThucTT',{totalValue: totalValue
							, customerPayValue: _customerPayValue
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
	onSelectPaymentType:function(button){
		parent = this;
		payType = button.name;
		bankObject = Ext.ComponentQuery.query('#btnRoomPayment #comboCustomerId')[0];
		_content = "Thanh toán";
		if(payType == 'ebank'){
			paymentOption.paymentOption.type = PaymentTypeGroup.EBANK;
			paymentOption.paymentOption.text = 'chuyển khoản';
			_content = _content + ' chuyển khoản TK số '+bankObject.getRawValue();
			bankObject.show();
		}else if(payType == 'card'){
			paymentOption.paymentOption.type = PaymentTypeGroup.CARD;
			paymentOption.paymentOption.text = 'qua thẻ';
			_content = _content + ' qua thẻ TK số '+bankObject.getRawValue();
			bankObject.show();
		}else if(payType == 'cash'){
			paymentOption.paymentOption.type = PaymentTypeGroup.CASH;
			_content = _content + ' tiền mặt';
			paymentOption.paymentOption.text = 'tiền mặt';
			bankObject.hide();
		}
		Ext.ComponentQuery.query('#btnRoomPayment #PAY_DSCRT')[0].setValue(_content);
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
	}
})