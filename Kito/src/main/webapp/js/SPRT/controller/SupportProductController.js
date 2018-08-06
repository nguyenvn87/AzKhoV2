var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});
var restarantType = '';
Ext.define('SPRT.controller.SupportProductController', {
	extend : 'Ext.app.Controller',
	views : ['SPRT.view.SupportProductView','Ext.extCombo.view.SimpleComboBox'],
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
			'#UNIT' : {
				select: this.onSelectRestaurantType
			}
		});
	},
	deleteRecord: function(grid, rowIndex, colIndex){
		me = this;
		var rec = grid.getStore().getAt(rowIndex);
		var srvc_id = rec.get('CD');
		
		Ext.MessageBox.confirm('Confirm', 'Chắc chắn muốn xóa ?', function(btn){
			if(btn == 'yes'){
				param={'CD': srvc_id};
				param['IS_USED'] =  0;
				me.sendRequest(param);
			}
		});
	},
	openBtnUser:function(){
		
		if(this.popup==null){
			this.popup = Ext.create('SPRT.view.popup.BtnAddCommonProduct',{});
		}
		this.popup.params = restarantType;
		this.popup.initNew();
		this.popup.show();
		//this.createSrvcCode(this);
	},
	doubleClickUser:function(compt, record, item, index, e){
		
		var srvdId = record.get('CD');
		if(this.popup==null){
			this.popup = Ext.create('SPRT.view.popup.BtnAddCommonProduct',{});
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
		var cdNM = Ext.ComponentQuery.query('#btnSrvcContainerId #CD_NM')[0].getValue();
		var srvcCd = Ext.ComponentQuery.query('#btnSrvcContainerId #CD')[0].getValue();
		var RoomNo = Ext.ComponentQuery.query('#btnSrvcContainerId #VALUE1')[0].getValue();
		var isUsed = Ext.ComponentQuery.query('#btnSrvcContainerId #USE_YN')[0].getValue();
				
		param={'CD_NM': cdNM};
		param['CD'] =  srvcCd;
		param['VALUE1'] =  RoomNo;
		param['USE_YN'] =  'Y';
		param['SYS_USE_YN'] =  'Y';
		param['GROUP_CD'] = 'HGHOA';
		param['GROUP_NM'] = 'Hàng hóa';
		param['SORT_SN'] = 1;
		param['RESTAR_TYPE'] = me.popup.params;
		param['STATUS'] = (formRoom.config.isNew==true)?'create':'update';
		me.sendRequest(param);
	},
	sendRequest:function(_param){
		formRoom = this.popup;
		Ext.Ajax.request( {
    		url: contextPath + '/code/saveCodeList.json',
    		method:'POST',
    		params: _param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			if( text.success == true){
    				if(formRoom != null)
    					formRoom.hide();
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
    				var storeTmp = Grid.getStore();
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
		 var URL = "http://localhost:8080/madina/report/billPrint.do?LIID=4b7e671e-83a3-4372-844d-9117e0aa1815&SUPPLYER=www.azkho.com&PRINT_TYPE=1";
		   // var W = window.open(URL);   
		   // W.window.print(); 
		    
		/*$("<iframe>")                            
        .hide()                              
        .attr("src", URL)
        .appendTo("body");  
		window.print(); */
		 
		  iframe = this._printIframe = document.createElement('iframe');
		    document.body.appendChild(iframe);
		    iframe.src = URL;
		    iframe.style.display = 'none';
		    iframe.onload = function() {
		      setTimeout(function() {
		        iframe.focus();
		        iframe.contentWindow.print();
		      }, 10);
		    };
		/*var WindowPrint = window.open(URL);  
		WindowPrint.document.close();
        WindowPrint.print();*/
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
	requestList:function(_type){
		var Grid = Ext.ComponentQuery.query('#grid-srvc')[0];
		var storeTmp = Grid.getStore();
		storeTmp.currentPage = 1;
		storeTmp.pageSize=13;
		storeTmp.getProxy().extraParams = {
						GROUP_CD: 'HGHOA',
						RESTAR_TYPE: _type
					};
		storeTmp.load();
	},
	onSelectRestaurantType:function(combo, records){
		me = this;
		restarantType = combo.getValue();
		me.requestList(restarantType);
	}
})