var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
var startEvent = Ext.create('MNG.view.popup.BtnStart',{});
var stopEvent = Ext.create('MNG.view.popup.BtnClose',{});
var paymentEvent = Ext.create('MNG.view.popup.BtnPayment',{});

var utilForm = Ext.create('CMM.form.util',{});
var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var popChService = null;

Ext.define('MNG.controller.roomManagerController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.roomManagerView'
	,'Ext.extCombo.view.SimpleComboBox'],
	popMenu: null,
	popChRoom: null,
	popChService: null,
	roomUseId: null,
	roomNm: null,
	roomId: null,
	hasPayed: false,
	totalMoneyValue: 0,
	payedMoney: 0,
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
			'#form-list-room container[cls=leftmenu-room-btn] > button[name=roombtn]' : {
				click : this.onClickRoom
			},
			'#grid-menu-id' :{
				itemdblclick: this.doubleClickSelectMenu
			},
			'#btnSaveSrvc':{
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
			'#editIconItem':{
				click: this.btnEditIconItem
			}
		});
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
			var hiddenField = Ext.ComponentQuery.query('#btnHidenRunningRoom')[0];
			console.log(hiddenField.name);
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
	    				Ext.ComponentQuery.query('#btnRoomOnTimeId')[0].setText(timeTmp);
	    				
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
		var param = "?LIID=" + parent.roomUseId 
		var location = contextPath + "/report/billPrint.do" + param;
		utilForm.btn_template_popup(location,"Hóa đơn",850,800,true);
		supportEvent.autoPrint(location);
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
		storeTmp.getProxy().extraParams = {
							ROOM_ID : parent.roomId,
							ROOM_USED_ID: parent.roomUseId
						};
		storeTmp.load();
		storeTmp.commitChanges();
	},
	onClickRoom:function(me){
		
		var parent = this;
		this.resetNotiStatus();
		var roomId = me.getItemId();
		parent.roomUseId = null;
		parent.hasPayed = false;
		
		var textRoomName = Ext.ComponentQuery.query('#btnRoomUseId')[0];
		textRoomName.setText(me.text);
		parent.roomNm = me.text;
		
		var stsOnOff = Ext.ComponentQuery.query('#btnStartRunningRoom')[0];
		
		var hiddenField = Ext.ComponentQuery.query('#btnHidenRunningRoom')[0];
		hiddenField.setText(roomId);
		hiddenField.name = roomId;
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
    					
    					parent.showNotificationRoom();
    					if(sumMoney > 0){
    						parent.hasPayed = true;
    					}
    					parent.roomUseId = roomUseId;
    					
    					stsOnOff.setIconCls('icon-stson');
    					// 2. Get list service of this room
						storeTmp.getProxy().extraParams = {
							ROOM_ID : roomId,
							ROOM_USED_ID: roomUseId
						};
						storeTmp.load();
						storeTmp.commitChanges();
    				}else{
    					stsOnOff.setIconCls('icon-stsoff');
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
		
		var gridTmp = Ext.ComponentQuery.query('#grid-room-turn')[0];
		var menuId = record.get('SRVC_ID');
		var menuNm = record.get('PROD_NM');
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
			tmpStoreResource.add({
				MENU_ID: menuId,
				PRICE: menuPrice,
				MENU_NM: menuNm,
				AMOUNT: 1,
				TOTAL_MONEY: menuPrice,
				SRVC_ID: srvcId
			});
			reqResoucesData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
			if(reqResoucesData != null){
				this.btnSavingRequest(reqResoucesData);
			}
		}
	},
	selectMenuItem : function(){
		
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
			var tmpStoreResource = Ext.create('MNG.store.roomSrvcStore', {});
			var reqResoucesData = null;
			if(!isExist){
				tmpStoreResource.add({
					PRICE: row.get('PRICE'),
					AMOUNT: amountValue.getValue(),
					TOTAL_MONEY: row.get('PRICE')*amountValue.getValue(),
					SRVC_ID: row.get('SRVC_ID')
				});
				reqResoucesData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
			}
			this.popMenu.hide();
			if(reqResoucesData != null){
				this.btnSavingRequest(reqResoucesData);
			}
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
				
				//save
				tmpStoreResource.add(record);
				reqResoucesData = Ext.encode(Ext.Array.pluck(tmpStoreResource.data.items,'data'));
				parent.btnSavingRequest(reqResoucesData);
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
    				if(text.message != null && text.message == 'permission'){
		    			supportEvent.showMessageWarning('Hóa đơn đã in, bạn không thể cập nhật. Hãy liên hệ với quản lý !')
		    		}
    				else alert(text.message);
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
	    			Ext.ComponentQuery.query('#btnRoomPaymentStatusId')[0].setText(parent.payedMoney);
	    			paymentEvent.hide();
	    			var Grid = Ext.ComponentQuery.query('#grid-room-turn')[0];
					var storeTmp = Grid.getStore();
	    			if( text.success == true){
	    				parent.hasPayed = true;
	    				Ext.MessageBox.hide();
	    				storeTmp.loadData([],false);
	    				var buttonTmp = Ext.ComponentQuery.query('#'+parent.roomId)[0];
	    				buttonTmp.removeCls('arrow-box-occupy');
	    				buttonTmp.addCls('arrow-box-empty');
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
		//utilForm.btn_template_popup(location,"Phiếu xuất kho",850,800,true);
		supportEvent.autoPrint(location);
	},
	resetNotiStatus:function(){
		var parent = this;
		parent.timeON = 'X';
    	parent.payedMoney = 'X';
    	parent.roomNm = '';
    	
    	Ext.ComponentQuery.query('#btnRoomOnTimeId')[0].setText(parent.timeON);
    	Ext.ComponentQuery.query('#btnRoomPaymentStatusId')[0].setText(parent.payedMoney);
    	Ext.ComponentQuery.query('#btnRoomUseId')[0].setText(parent.roomNm);
	},
	showNotificationRoom:function(){
		var parent = this;
		value1 = formatSupporter.formatToMoney(parent.payedMoney);
		Ext.ComponentQuery.query('#btnRoomOnTimeId')[0].setText(parent.timeON);
    	Ext.ComponentQuery.query('#btnRoomPaymentStatusId')[0].setText(value1);
    	Ext.ComponentQuery.query('#btnRoomUseId')[0].setText(parent.roomNm);
	},
	btnEditIconItem:function(){
		alert('2344');
	},
	btnSavingRequest:function(paramData){
		
		var parent = this;
		var param = {};
		
		param['DATA'] = paramData;
		param['ROOM_ID'] = parent.roomId;
		param['ROOM_USE_ID'] = parent.roomUseId;
		    
				
		url_request = contextPath + '/room/saveTurnRoomServices.json';
		Ext.Ajax.request( {
		    	url: url_request,
		    	method:'POST',
		    	params: param,
		    	success: function(response){
		    		var text = Ext.JSON.decode(response.responseText);
		    		parent.reloadListItem();
		    	},
		    	failure: function(response){
		    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
		    	}
		 });	
	},
	checkingStatusMenu:function(mainStore, menuStore){
		//console.log(mainStore);
		console.log(menuStore);
		mainStore.each(function(record) {
			menuStore.each(function(recordMenu) {
				if(record.get('SRVC_ID').trim() == recordMenu.get('SRVC_ID').trim()){
					recordMenu.set('IS_EXIST','1');
				}
				//else recordMenu.set('IS_EXIST','0');
			});
		});
	},
	btnCancel:function(){
		alert(1);
		parent = this; 
		url_request = contextPath + '/deleteBillOrder.json';
		var param = {};
		if(parent.roomUseId != null){
			param['ROOM_USED_ID'] = parent.roomUseId;
			Ext.Ajax.request( {
			    	url: url_request,
			    	method:'POST',
			    	params: param,
			    	success: function(response){
			    		var text = Ext.JSON.decode(response.responseText);
			    		parent.reloadListItem();
			    	},
			    	failure: function(response){
			    		Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
			    	}
			 });
		}
	}
})