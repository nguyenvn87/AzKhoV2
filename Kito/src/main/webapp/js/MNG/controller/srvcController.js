var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var utilForm = Ext.create('CMM.form.util',{});

Ext.define('MNG.controller.srvcController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.srvcView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#BtnSaveSrvc' : {
				click : this.BtnSaveUser
			},
			'#addSrvcBtn' : {
				click : this.openBtnUser
			},
			'#delSrvcBtn' : {
				click : this.deleteUser
			},
			'#grid-srvc':{
				itemdblclick: this.doubleClickUser
			},
			'#btnSearchSrvcBtn':{
				click: this.clickSrvcSearch
			},
			'#btnExcelPrint':{
				click: this.btnExcelPrint
			},
			'#btnPdfPrint':{
				click: this.btnPdfPrint
			}
		});
	},
	deleteRecord: function(grid, rowIndex, colIndex){
		me = this;
		var rec = grid.getStore().getAt(rowIndex);
		var srvc_id = rec.get('SRVC_ID');
		
		Ext.MessageBox.confirm('Confirm', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				param={'SRVC_ID': srvc_id};
				param['IS_USED'] =  0;
				me.sendRequest(param);
			}
		});
	},
	openBtnUser:function(){
		
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddSrvc',{});
		}
		this.popup.srvdId = null;
		this.popup.initNew();
		this.popup.show();
		this.createSrvcCode(this);
	},
	doubleClickUser:function(compt, record, item, index, e){
		
		var srvdId = record.get('SRVC_ID');
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddSrvc',{});
		}
		this.popup.srvdId = srvdId;
		this.popup.show();
		gridSupport.selectGridPopup('#mainContainerID','#grid-srvc','#btnSrvcContainerId');
	},
	BtnSaveUser:function(){
		this.request();
	},
	request:function(){
		me = this;
		formRoom = this.popup;
		var RoomFlor = Ext.ComponentQuery.query('#btnSrvcContainerId #SRVC_NM')[0].getValue();
		var srvcCd = Ext.ComponentQuery.query('#btnSrvcContainerId #SRVC_CD')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnSrvcContainerId #ACCUMULT')[0].getValue();
		var isUsed = Ext.ComponentQuery.query('#btnSrvcContainerId #IS_USED')[0].getValue();
		var Dscrt = Ext.ComponentQuery.query('#btnSrvcContainerId #DSCRT')[0].getValue();
		var isDefault = Ext.ComponentQuery.query('#btnSrvcContainerId #IS_DEFAULT')[0].getValue();
		var price = Ext.ComponentQuery.query('#btnSrvcContainerId #PRICE')[0].getValue();
		var unit = Ext.ComponentQuery.query('#btnSrvcContainerId #UNIT')[0].getValue();
		var type = Ext.ComponentQuery.query('#btnSrvcContainerId #TYPE')[0].getValue();
		var sortNo = Ext.ComponentQuery.query('#btnSrvcContainerId #SORT_NO')[0].getValue();
		
		console.log('sortNo = '+sortNo);
		param={'SRVC_NM': RoomFlor};
		param['SRVC_CD'] =  srvcCd;
		param['SRVC_ID'] =  formRoom.srvdId;
		param['ACCUMULT'] =  RoomNo;
		param['IS_USED'] = isUsed;
		param['TYPE'] = type;
		param['DSCRT'] = Dscrt;
		param['IS_DEFAULT'] = isDefault;
		param['PRICE'] = price;
		param['UNIT'] = unit;
		param['SORT_NO'] = (sortNo != null)?sortNo: 100;
		
		me.sendRequest(param);
	},
	sendRequest:function(_param){
		formRoom = this.popup;
		Ext.Ajax.request( {
    		url: contextPath + '/saveService.json',
    		method:'POST',
    		params: _param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			if( text.success == true){
    				if(formRoom != null)
    					formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
    				var storeTmp = Grid.getStore();
    				console.log(storeTmp);
    				storeTmp.load();
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
	createSrvcCode:function(me){
		Ext.Ajax.request( {
    		url: contextPath + '/getAllSrvcCount.json',
    		method:'GET',
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			if( text.success == true){
    				var count = text.data.COUNT;
    				var srvcCode = me.generateCode(count+'');
    				Ext.ComponentQuery.query('#btnSrvcContainerId #SRVC_CD')[0].setValue(srvcCode);
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
	},
	generateCode:function(_num){
		var code = 'SP';
		if(_num.length < 6){
			for(var i=0; i < (6-_num.length); i++){
				code = code + '0';
			}
		}
		code = code+_num;
		return code;
	},
	clickSrvcSearch:function(){
		var itemSearch = Ext.ComponentQuery.query('#textSearchSrvc')[0];
		value = itemSearch.getValue();
		
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.clearFilter();
		storeTmp.getProxy().extraParams={
				IS_USED: 1,
				SRVC_NM: value
		};
		//storeTmp.getProxy().url = contextPath + '/getListService.json';
		storeTmp.load();
	},
	btnExcelPrint:function(){
		var param = "?FILENAME="+ "Name"; 
		var _url = contextPath + '/report/excel/ExcelStatisticStore.do'+param;
		this.downloadFile(_url);
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
	btnPdfPrint : function(){
		//var param = "?LIID=" + parent.roomUseId + "&SUPPLYER="+WEB_ADDR; 
		var location = contextPath + "/saleReport/baogiabanhang.do";// + param;
		utilForm.btn_template_popup(location,"Báo Giá",850,800,true);
	}
})