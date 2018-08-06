var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var startEvent = Ext.create('MNG.view.popup.BtnStart',{});
var stopEvent = Ext.create('MNG.view.popup.BtnClose',{});
var paymentEvent = Ext.create('MNG.view.popup.BtnPayment',{});
var paymentOption = Ext.create('MNG.view.popup.BtnPaymentOption',{});
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
			
			'#btnStartRunningRoom' : {
				click : this.btnStartRunningRoom
			},
			'#btnEndRunningRoom' : {
				click : this.btnSaveRunningRoom
			},
			'#btnCallService' : {
				click : this.btnCallService
			},
			'#btnChangeRoom' : {
				click : this.btnChangeRoom
			},
			'#btnPayment' : {
				click : this.btnPayment
			},
			'#btnCancel':{
				click: this.btnCancel
			},
			'#btnCloseSection' : {
				click : this.btnCloseSection
			},
			'#form-list-room > button[name=roombtn]' : {
				click : this.onClickRoom
			},
			'#btnRoomPayment button[action=pay]' : {
				click : this.onSelectPaymentType
			},
			'#grid-menu-id' :{
				itemdblclick: this.doubleClickSelectMenu
			},
			'#idSrvcSelect':{
				click : this.selectMenuItem
			},
			'#BtnStartSrvc':{
				click: this.BtnOnOffSrvc
			},
			'#grid-room-turn':{
				itemdblclick: this.doubleClickTurnSrvc
			},
			'#btnUpdateService':{
				click: this.btnUpdateService
			},
			'#btnSaveChangeRoom':{
				click: this.btnSaveChangeRoom
			},
			'#btnCalculate':{
				click: this.btnCalculate
			},
			'#btnCloseToCalculate':{
				click: this.btnCloseToCalculate
			},
			'#btnPaymentDebit' :{
				click: this.btnPaymentDebit
			},
			'#btnSaveSrvcPayment':{
				click: this.btnSaveSrvcPayment
			},
			'#btnDeleteService':{
				click: this.btnDeleteService
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
			'#btnDailyReport':{
				click: this.btnRptDaily
			},
			'#btnXemTonKho':{
				click: this.btnXemTonKho
			},
			'#btnSelectCustomer':{
				click: this.btnSelectCustomer
			},
			'#grid-customer-item' :{
				itemdblclick: this.doubleClickCustomerGrid
			},
			//For order
			'#orderMainContainer [name=submit]':{
				click: this.submitOrder
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
	BtnOnOffSrvc:function(){
		
		var parent = this;
		var btnHours = Ext.ComponentQuery.query('#btnOpenCloseRoom numberfield[name=HOUSE]')[0].getValue();
		var btnMinutes = Ext.ComponentQuery.query('#btnOpenCloseRoom numberfield[name=MINUTES]')[0].getValue();
		var btnDate = Ext.ComponentQuery.query('#btnOpenCloseRoom datefield[name=CHANGETIME]')[0].getValue();
		var pmstr = 'PM';
		if(btnHours > 12) pmstr = 'PM';
		else pmstr = 'AM';
		
		if(btnMinutes < 10){
			btnMinutes = '0'+btnMinutes;
		}
		var timeTmp = btnHours + ':' + btnMinutes+' '+pmstr;
		console.log('timeTmp = '+timeTmp+ '/ '+parent.roomUseId);
		var submitStartUrl = contextPath + '/manager/startRoom.json';
		var submitFinishUrl = contextPath + '/room/closeRoomServices.json';
		var submitUrl = null;
		if(startEvent.isActive == true){
			submitUrl = submitStartUrl;
		}
		else submitUrl = submitFinishUrl;
		
		supportEvent.showLoadingOnprogress('Đang xử lý...', 'BtnStartSrvc');
			console.log('START');
			Ext.Ajax.request( {
	    		url: submitUrl,
	    		method:'POST',
	    		params: {
					ROOM_ID: parent.roomId,
					ROOM_USED_ID: parent.roomUseId,
					TIMEON_OFF: timeTmp,
					CHANGEDATE: btnDate,
					TOTAL_MONEY: 900000,
	    			IS_DEBIT: 0
					},
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log( text);
	    			supportEvent.hiddeMessageBox();
	    			if( text.success == true){
	    				//parent.reloadListRoom();
	    				var buttonTmp = Ext.ComponentQuery.query('#'+parent.roomId)[0];
	    				buttonTmp.removeCls('arrow-box-empty');
	    				buttonTmp.addCls('arrow-box-occupy');
	    				
	    				supportEvent.notiSuccess(parent.roomNm,' Đã kích hoạt phòng này');
	    				//timeTmp
	    				//Ext.ComponentQuery.query('#btnRoomOnTimeId')[0].setText(timeTmp);
	    				
						var data = text.data;
						console.log(data);
						console.log(data.ROOM_USED_ID);
						parent.roomUseId = data.ROOM_USED_ID;
						var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
						var storeTmp = Grid.getStore();
						// 2. Get list service of this room
						storeTmp.getProxy().extraParams = {
							ROOM_ID : parent.roomId,
							ROOM_USED_ID: parent.roomUseId
						};
						storeTmp.load();
	    			}
	    		},
	    		failure: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log( text);   
	    			alert('Save failure' );
	    		}
			});
			startEvent.hide();
	},
	btnStartRunningRoom:function(){
		var parent = this;
		if(parent.roomNm == null || parent.roomNm == ''){ 
			supportEvent.showWarningTimer('Chưa chọn phòng cần kích hoạt');
			return;
		}
		else {
			startEvent.title = 'Kích hoạt phòng '+ parent.roomNm;
			startEvent.isActive = true;
			startEvent.show();
		}
	},
	btnSaveRunningRoom:function(){
		
		var parent = this;
		var tmpRoomStore = Ext.ComponentQuery.query("#grid-room-turn")[0].getStore();
		var checkChangeLandResource = tmpRoomStore.getModifiedRecords();
		var removedResourceRecord = tmpRoomStore.getRemovedRecords();
		var reqResoucesData = null;
		var isChange = false;
		var param = {};
		if(checkChangeLandResource.length > 0 || removedResourceRecord.length > 0) {
			
			console.log(checkChangeLandResource.length + ' / '+removedResourceRecord.length);
			var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
			if(checkChangeLandResource.length > 0)
				Ext.each(checkChangeLandResource, function(record){
		    		tmpStoreResource.add(record);
		    		console.log('Change: '+'i');
				},this);
			
			if(removedResourceRecord.length > 0)
			    Ext.each(removedResourceRecord, function(record){
			    		record.set('STATUS', 'delete');
			    		console.log('Delete: '+'i');
			    		tmpStoreResource.add(record);
			    	});
		    reqResoucesData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		    isChange = true;
		    param['DATA'] = reqResoucesData;
		    param['ROOM_ID'] = parent.roomId;
		    param['ROOM_USE_ID'] = parent.roomUseId;
		}
		
		if(!isChange) return;
			Ext.MessageBox.show({
				 title: 'Đợi vài giây',
		         msg: 'Đang lưu, please wait...',
		         progressText: 'Saving...',
		         width:300,
		         wait:true,
		         waitConfig: {interval:200},
		         icon:'ext-mb-download', 
		         animateTarget: 'btnEndRunningRoom'
		      });
				url_request = contextPath + '/room/saveTurnRoomServices.json';
				Ext.Ajax.request( {
		    		url: url_request,
		    		method:'POST',
		    		params: param,
		    		success: function(response){
		    			var text = Ext.JSON.decode(response.responseText);
		    			console.log( text);
		    			
		    			parent.reloadListItem();
		    			//tmpRoomStore.commitChanges();
		    			// Notify
		    			setTimeout(function(){
		    				Ext.MessageBox.hide();
		    				if( text.success == true){
		    					supportEvent.hiddeMessageBox();
		        			}
		    				else{
		    					// text.data
		    					supportEvent.showMessageError(text.data);
		    					return;
		    				}
		    	        }, 500);
		    		},
		    		failure: function(response){
		    			Ext.MessageBox.hide();
		    			//text = Ext.JSON.decode(response.responseText);
		    			Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
		    		}
		    	});	
	},
	btnCallService:function(){
		var parent = this;
		if(this.popMenu==null){
			this.popMenu = Ext.create('MNG.view.popup.BtnSelectMenu',{});
		}
		if(parent.roomUseId)
			this.popMenu.show();
	},
	btnChangeRoom:function(){
		var parent = this;
		if(this.popChRoom==null){
			this.popChRoom = Ext.create('MNG.view.popup.BtnChangeRoom',{});
		}
		if(parent.roomUseId){
			this.popChRoom.show();
			this.popChRoom.setFromRoom('RoomID', parent.roomNm);
			}
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
		//utilForm.btn_template_popup(location,"Hóa đơn",850,800,true);
		//supportEvent.autoPrint(location);
		parent.autoPrint(location);
	},
	btnCloseSection:function(){
		parent = this;
		var isChangeBill = false;
		if(parent.roomUseId == null) return;
		
		// Payment checking
		if(parent.hasPayed == false){ 	
			supportEvent.showWarningTimer("Bạn chưa làm thủ tục thanh toán !");
			return ;
		}
		// Bill change checking
		var tmpRoomStore = Ext.ComponentQuery.query("#grid-room-turn")[0].getStore();
		isChangeBill = gridSupport.checkGridIsChanged(tmpRoomStore);
		if(isChangeBill){
			supportEvent.showWarningTimer("Hóa đơn cập nhật chưa lưu !");
			return ;
		}
		
		Ext.MessageBox.confirm('Confirm', 'Chắc chắn muốn kết thúc ?', function(btn){
			console.log('btn');
			console.log(btn);
			if(btn == 'yes'){
				console.log('parent.roomUseId  = '+parent.roomUseId );
				if(parent.roomUseId == null) return;
				Ext.MessageBox.show({
					   title: 'Please wait',
			           msg: 'Đang lưu...',
			           progressText: 'Lưu...',
			           width:300,
			           wait:true,
			           waitConfig: {interval:200},
			           icon:'ext-mb-download', 
			           animateTarget: 'btnEndRunningRoom'
			       });
				Ext.Ajax.request( {
		    		url: contextPath + '/room/closeRoomServices.json',
		    		method:'POST',
		    		params: {
		    			'ROOM_USED_ID': parent.roomUseId,
		    			'ROOM_ID':  parent.roomId
		    			},
		    		success: function(response){
		    			parent.roomUseId = null;
		    			var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
						var storeTmp = Grid.getStore();
						
		    			var text = Ext.JSON.decode(response.responseText);
		    			console.log( 'text');
		    			console.log( text);
		    			if( text.success == true){
		    				
		    				storeTmp.loadData([],false);
		    				var buttonTmp = Ext.ComponentQuery.query('#'+parent.roomId)[0];
		    				buttonTmp.removeCls('arrow-box-occupy');
		    				buttonTmp.addCls('arrow-box-empty');
		    				supportEvent.hiddeMessageBox();
		    				parent.resetNotiStatus();
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
		//storeTmp.getProxy().extraParams = {
		//					ROOM_ID : parent.roomId,
		//					ROOM_USED_ID: parent.roomUseId
		//				};
		storeTmp.loadData([],false);
		storeTmp.commitChanges();
	},
	onClickRoom:function(me){
		
		var parent = this;
		this.resetNotiStatus();
		var roomId = me.getItemId();
		parent.roomUseId = null;
		parent.hasPayed = false;
		
		Ext.ComponentQuery.query('#idContainerRoomSrvc')[0].setTitle(me.text);
		parent.roomNm = me.text;
		parent.roomId = roomId;
		var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var storeTmp = Grid.getStore();
		storeTmp.loadData([],false);
		
		// 1.Checking room
		Ext.Ajax.request( {
    		url: contextPath + '/room/checkRoomRunningStatus.json',
    		method:'POST',
    		params: {
    			'ROOM_ID': roomId
    			},
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			if( text.success == true){
    			
    				if(text.data != null && text.data.IS_ON == 1){
    					var roomUseId = text.data.ROOM_USED_ID;
    					var sumMoney = text.data.TOTAL_MONEY;
    					parent.timeON = text.data.TIME_STS;
    					parent.payedMoney = text.data.PAYED_MONEY;
    					Ext.ComponentQuery.query('#idContainerRoomSrvc')[0].setTitle(me.text+' : '+text.data.TIME_STS);
    					parent.showNotificationRoom();
    					if(sumMoney > 0){
    						parent.hasPayed = true;
    					}
    					parent.roomUseId = roomUseId;
    					
    					//stsOnOff.setIconCls('icon-stson');
    					// 2. Get list service of this room
						storeTmp.getProxy().extraParams = {
							ROOM_ID : roomId,
							ROOM_USED_ID: roomUseId
						};
						storeTmp.load();
						storeTmp.commitChanges();
    				}else{
    					//stsOnOff.setIconCls('icon-stsoff');
    					parent.roomUseId = null;
    					storeTmp.loadData([],false);
    					storeTmp.commitChanges();
    				}
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
	},
	doubleClickSelectMenu:function(component, record, index, eOpts){
		
		parent = this;
		//if(parent.roomUseId == null) return;
		
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var menuId = record.get('SRVC_ID');
		var menuNm = record.get('SRVC_NM');
		var menuPrice = record.get('PRICE');
		var srvcId = record.get('SRVC_ID');
		
		var isExist = false;
		tmpStore = gridTmp.getStore();
		gridTmp.getStore().each(function(record) {
			
			if(menuId != null && menuId == record.get('SRVC_ID')){
				isExist = true;
			}
		});
		
		var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
		var reqResoucesData = null;
		
		if(!isExist){
			tmpStore.add({
				MENU_ID: menuId,
				PRICE: menuPrice,
				MENU_NM: menuNm,
				SRVC_NM: menuNm,
				AMOUNT: 1,
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
	reloadListRoom:function(){
		var container = Ext.ComponentQuery.query('#form-list-room')[0];
		container.removeAll();
		roomStore.load();
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
	btnSaveChangeRoom:function(){
		var parent = this;
		var roomTo = Ext.ComponentQuery.query('#changeRoomContainerId #TO_ROOM')[0].getValue();
		var roomFrom = parent.roomId;
		
		if(roomTo != null && roomTo != roomFrom)
		Ext.Ajax.request( {
    		url: contextPath + '/room/saveChangeRoom.json',
    		method:'POST',
    		params: {
    			'ROOM_ID': roomFrom,
				'ROOM_USE_ID': parent.roomUseId,
				'ROOM_TO': roomTo
    			},
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			parent.popChRoom.hide();
    			parent.reloadListRoom();
    			if( text.success == true){
    				alert(text.message);
    			}
    			else{
    				alert(text.message);
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
	},
	btnCalculate:function(){
		parent = this;
		if(parent.roomUseId == null) return;
		stopEvent.title = 'Kết thúc '+ parent.roomNm;
		stopEvent.show();
		stopEvent.resetTime();
	},
	btnCloseToCalculate:function(){
		var parent = this;
		console.info('ROOM_USED_ID: '+parent.roomUseId);
		var submitFinishUrl = contextPath + '/room/saveToCalculate.json';
		var btnHours = Ext.ComponentQuery.query('#btnCalucalatorRoom numberfield[name=HOUSE]')[0].getValue();
		var btnMinutes = Ext.ComponentQuery.query('#btnCalucalatorRoom numberfield[name=MINUTES]')[0].getValue();
		var btnDate = Ext.ComponentQuery.query('#btnCalucalatorRoom datefield[name=CHANGETIME]')[0].getValue();
		var pmstr = 'PM';
		if(btnHours > 12) pmstr = 'PM';
		else pmstr = 'AM';
		var timeTmp = btnHours + ':' + btnMinutes+' '+pmstr;
		
		
		var gridTarget = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var sumMoney = 0;
		gridTarget.getStore().each(function(record) {
			var tmpMoney = record.get('TOTAL_MONEY');
			if(tmpMoney){
				sumMoney = sumMoney + tmpMoney;
			}
			console.log('sumMoney = '+sumMoney);
		});
		
		//if(sumMoney != 0){
			stopEvent.hide();
			supportEvent.showLoadingOnprogress('Đang tính...', 'btnCloseToCalculate');
			Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: {
					ROOM_ID: parent.roomId,
					ROOM_USED_ID: parent.roomUseId,
					TIMEON_OFF: timeTmp,
					TOTAL_MONEY: sumMoney,
	    			IS_DEBIT: 0
					},
	    		success: function(response){
	    			supportEvent.hiddeMessageBox();
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log(text.data);
	    			console.log(text);
	    			if( text.success == true){
	    				
						var data = text.data;
						var hours = data.hours+' giờ';
						var srvcIdHous = data.SRVCID;
						gridTarget.getStore().each(function(record) {
							var menuId = record.get('SRVC_ID');
							if(srvcIdHous != null 
									&& menuId != null
									&& menuId == srvcIdHous){
								priceTmp = record.get('PRICE');
								record.set('AMOUNT',data.hours);
								total = priceTmp * data.hours;
								record.set('TOTAL_MONEY',total);
							}
						});
						swal(hours, "You clicked the button!", "success")
	    			}
	    		},
	    		failure: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log( text);   
	    			alert('Save failure' );
	    		}
			});
		startEvent.hide();
		//}
	},
	btnPaymentDebit:function(){
		var parent = this;
		if(parent.roomUseId == null) return;
		var storeTarget = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore(); 
		var valueTotal = gridSupport.calculateMoney(storeTarget)
		var value = Ext.util.Format.number(valueTotal, '0,000.00')
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY_NM')[0].setValue(value);
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY')[0].setValue(valueTotal);
		Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].setValue(valueTotal);
		paymentEvent.show();
	},
	btnSaveSrvcPayment:function(){
		var parent = this;
		if(parent.roomUseId == null) return;
		
		var valueTotal = Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY')[0].getValue();
		var valuePayed = Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].getValue();
		var valueDebit = Ext.ComponentQuery.query('#btnRoomPayment #IS_DEBIT')[0].getValue();
		var dscrValue  = Ext.ComponentQuery.query('#btnRoomPayment #DSCRT')[0].getValue();
		var timeEnd  = Ext.ComponentQuery.query('#btnRoomPayment #TIME_END')[0].getSubmitValue();
		
		var submitFinishUrl = contextPath + '/room/saveTurnRoomPayment.json';
		
		supportEvent.showLoadingOnprogress('Đang lưu...', 'btnEndRunningRoom');
		
			Ext.Ajax.request( {
				url: submitFinishUrl,
	    		method:'POST',
	    		params: {
					ROOM_USED_ID: parent.roomUseId,
					TIME_END: timeEnd,
					PAYED_MONEY: valuePayed,
					TOTAL_MONEY: valueTotal,
	    			IS_DEBIT: valueDebit,
	    			DSCRT: dscrValue
					},
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			parent.payedMoney = text.data.PAYED_MONEY;
	    			paymentEvent.hide();
	    			var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
					var storeTmp = Grid.getStore();
	    			if( text.success == true){
	    				parent.hasPayed = true;
	    				Ext.MessageBox.hide();
	    				storeTmp.loadData([],false);
	    				var buttonTmp = Ext.ComponentQuery.query('#'+parent.roomId)[0];
	    				buttonTmp.removeCls('arrow-box-occupy');
	    				parent.resetNotiStatus();
	    				supportEvent.notiSuccess('Xin cám ơn',' Thanh toán thành công');
        			}
	    			else supportEvent.showMessageError('Có lỗi xảy ra !');
	    		},
	    		failure: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			supportEvent.showMessageError('Có lỗi xảy ra !');
	    		}
			});
	},
	btnDeleteService:function(){
		var parent = this;
		var menuId = popChService.serviceId ;
		var roomUseId = parent.roomUseId;
		popChService.hide();
		var gridTarget = Ext.ComponentQuery.query('#grid-room-turn')[0]; 
		var deletedRecord = gridTarget.getSelectionModel().getSelection();
		gridTarget.getStore().remove(deletedRecord);
		
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
	checkingStatusMenu:function(mainStore, menuStore){
		console.log(menuStore);
		mainStore.each(function(record) {
			menuStore.each(function(recordMenu) {
				if(record.get('SRVC_ID').trim() == recordMenu.get('SRVC_ID').trim()){
					recordMenu.set('IS_EXIST','1');
				}
			});
		});
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
		Ext.ComponentQuery.query('#paymentItemId #TOTAL_MONEY')[0].setValue(totalMoney);
		Ext.ComponentQuery.query('#paymentItemId #PAYED')[0].setValue(totalMoney);
		Ext.ComponentQuery.query('#paymentItemId #NEEDPAYED')[0].setValue(totalMoney);
		
		Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].setValue(totalMoney);
		Ext.ComponentQuery.query('#orderMainContainer [name=NEEDPAYED]')[0].setValue(totalMoney);
		
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
	btnCancel:function(){
		parent = this; 
		url_request = contextPath + '/deleteBillOrder.json';
		var param = {};
		if(parent.roomUseId != null){
			param['ROOM_USED_ID'] = parent.roomUseId;
			Ext.MessageBox.confirm('Xác nhận', 'Chắc chắn muốn hủy ?', function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request( {
				    	url: url_request,
				    	method:'GET',
				    	params: param,
				    	success: function(response){
				    		var text = Ext.JSON.decode(response.responseText);
				    		parent.reloadListItem();
				    		var buttonTmp = Ext.ComponentQuery.query('#'+parent.roomId)[0];
		    				buttonTmp.removeCls('arrow-box-occupy');
				    	},
				    	failure: function(response){
				    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
				    	}
				 });
			}});
		}
	},
	btnFindCustomer:function(){
		btnSearchCustomer.show();
	},
	btnAddCustomer:function(){
		btnAddCustomer.show();
		btnAddCustomer.initNew();
	},
	sendRequestPayment:function(){
		
	},
	btnPaymentSubmit:function(){
	
		var parent = this;
		var param = {};
		var timeEnd  = Ext.ComponentQuery.query('#paymentItemId #CHANGETIME')[0].getValue();
		// Get list srvc
		var tmpStoreResource = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore();
		var itemsLength = tmpStoreResource.data.items.length;
		paramData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		
		param['DATA'] = paramData;
		param['ROOM_ID'] = parent.roomId;
		param['ROOM_USE_ID'] = parent.roomUseId;
		
		total = Ext.ComponentQuery.query('#paymentItemId #TOTAL_MONEY')[0].getValue();
		paymoney = Ext.ComponentQuery.query('#paymentItemId #PAYED')[0].getValue();
		needPay = Ext.ComponentQuery.query('#paymentItemId #NEEDPAYED')[0].getValue();
		isDebit = Ext.ComponentQuery.query('#paymentItemId #IS_DEBIT')[0].getValue();
		cusCD = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getValue();
		cusAddr = Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].getValue();
		cusNM = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getRawValue();
		
		// Payment params
		param['CHANGE_DATE'] = timeEnd;
		param['PAYED_MONEY'] = paymoney;
		param['TOTAL_MONEY'] = total;
	    param['IS_DEBIT'] = (isDebit == true)?'1':'0';
	    param['DSCRT'] = '';
	    
	    // Bill info
	    param['IS_DELIVERED'] = 1,
	    param['IS_ORDER'] = 0;
	    param['BILL_CD'] = 'BILL_CD',
	    param['CUS_CD'] = cusCD;
	    param['CUS_NM'] = cusNM;
	    param['DSCRT'] = cusAddr;
	    param['PAY_METHOD'] = parent.payment.type;
	    param['ID_BANK'] = parent.payment.bankId;
	    // Calculate total score
		param['ACCUMULT'] = parent.caculateScore(tmpStoreResource);
	    if(itemsLength > 0)
		parent.submitRequest(param, true);
	},
	btnRptDaily:function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		currentDate = yyyy+'-'+mm+'-'+dd;
		var subParam1 = currentDate+ ' 00:00:00';
		var subParam2 = currentDate+ ' 23:59:59';
		var param = "?STARTDATE=" + subParam1+'' + "&ENDDATE="+subParam2;
		var location = contextPath + "/report/PrintDailyStatistic.do" + param;
		utilForm.btn_template_popup(location,"Báo cáo ngày",850,800,true);
	},
	btnSelectCustomer:function(){
		
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
			  		+ '<br> Giao dịch: <span style="color:#1a9bd0;font-weight: bold;">'+ paymentOption.paymentOption.text+'</span>'
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
			    			parent.callPrint(tmpRoomTurnId,'');
			    		}
			    		parent.reloadListItem();
			    		parent.reloadMenuList();
			    		Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].setValue(null);
			    		your_combo = Ext.ComponentQuery.query('#customerContainerId #comboCustomerId')[0];
			    		your_combo.reset();
			    		Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].setValue("");
			    	},
			    	failure: function(response){
			    		supportEvent.hiddeMessageBox();
			    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
			    	}
			 });
			});
	},
	submitOrder:function(){
		
		var parent = this;
		var param = {};
		var timeEnd  = Ext.ComponentQuery.query('#orderMainContainer [name=CHANGETIME]')[0].getValue();
		// Get list srvc
		var tmpStoreResource = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore();
		var itemsLength = tmpStoreResource.data.items.length;
		paramData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
		
		param['DATA'] = paramData;
		param['ROOM_ID'] = parent.roomId;
		param['ROOM_USE_ID'] = parent.roomUseId;
		
		total = Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].getValue();
		needPay = Ext.ComponentQuery.query('#orderMainContainer [name=NEEDPAYED]')[0].getValue();
		cusCD = Ext.ComponentQuery.query('#customerContainerId [name=CUS_CD]')[0].getValue();
		cusAddr = Ext.ComponentQuery.query('#customerContainerId [name=ADDR]')[0].getValue();
		cusNM = Ext.ComponentQuery.query('#customerContainerId [name=NAME]')[0].getRawValue();
		isDebit = Ext.ComponentQuery.query('#orderMainContainer [name=IS_DEBIT]')[0].getValue();
	
		// Payment params
		param['CHANGE_DATE'] = timeEnd;
		param['PAYED_MONEY'] = 0;
		param['TOTAL_MONEY'] = total;
	    param['IS_DEBIT'] = (isDebit == true)?'1':'0';;
	    param['IS_ORDER'] = 1;
	    param['DSCRT'] = '';
	    
	    // Bill info
	    param['IS_DELIVERED'] = '0',
	    param['BILL_CD'] = 'BILL_CD',
	    param['CUS_CD'] = cusCD;
	    param['CUS_NM'] = cusNM;
	    param['DSCRT'] = cusAddr;
		param['ACCUMULT'] = parent.caculateScore(tmpStoreResource);
	    if(itemsLength > 0)
	    	parent.submitRequest(param, false);
	},
	setPaymentInfo:function(){
		
		var storeTarget = Ext.ComponentQuery.query('#grid-room-turn')[0].getStore(); 
		var valueTotal = gridSupport.calculateMoney(storeTarget)
		var value = Ext.util.Format.number(valueTotal, '0,')
		
		Ext.ComponentQuery.query('#paymentItemId #TOTAL_MONEY')[0].setValue(valueTotal);
		Ext.ComponentQuery.query('#paymentItemId #NEEDPAYED')[0].setValue(valueTotal);
		Ext.ComponentQuery.query('#paymentItemId #PAYED')[0].setValue(valueTotal);
		
		Ext.ComponentQuery.query('#orderMainContainer [name=TOTAL_MONEY]')[0].setValue(valueTotal);
		Ext.ComponentQuery.query('#orderMainContainer [name=NEEDPAYED]')[0].setValue(valueTotal);
	},
	sendRequestInitData: function(){
		Ext.Ajax.request( {
    		url: contextPath + '/setDefaultInitData.json',
    		method:'POST',
    		params: {},
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			swal("Thành công !");
    			window.location.reload();
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			swal("Thất bại !");
    		}
    	});
	},
	setInitDataDefault:function(){
		me = this;
		swal({
				title: "Tạo dữ liệu mẫu ?",
				text: "Click 'OK' để tạo, 'Cancel' để hủy",
				type: "info",
				showCancelButton: true,
				closeOnConfirm: false,
				showLoaderOnConfirm: true,
			},
			function(){
				me.sendRequestInitData();
		});
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
		paymentOption.show();
		_havePayValue = Ext.ComponentQuery.query('#paymentItemId #TOTAL_MONEY')[0].getValue();
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY_NM1')[0].setValue(_havePayValue);
		 
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