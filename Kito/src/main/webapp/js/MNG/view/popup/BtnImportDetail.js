/**
 * @author TRONG
 * @description Add/update ImportDetail popup
 * @date 2016/10/12
 */
//var srvcListStore = Ext.create('MNG.store.srvcStore', {});
var importDetailStore = Ext.create('MNG.store.importDetailStore');
//var providerStore = Ext.create('MNG.store.providerStore');
var messageEvent = Ext.create('BIZ.utilities.supportEvent',{});

//srvcListStore.getProxy().url = contextPath +'/getSearchListMenu.json',

Ext.define('MNG.view.popup.BtnImportDetail', {
	extend : 'Ext.window.Window',
	requires:['Ext.custom.common.NumberField'],
	height : 530,
	width : 850,
	title : 'Cập nhật hoá đơn nhập hàng',
	maxHeight : 700,
	y: 10,
	resizable : false,
	srvcListStore : Ext.create('MNG.store.srvcStore', {}),
	closeAction:'destroy',
	importVO : {},
	initComponent : function() {
		var me = this;
		importVO = me;
		Ext.applyIf(me, {
			items : [{
				xtype : 'container',
				padding: '5 5 0 5',
				itemId : 'btnStoreContainerId',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [{
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
								xtype : 'container',
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								defaults : {
									cls : 'jdvn-sub-body'
									//flex : 1
								},
								items : [{
											xtype : 'container',
											flex : 2,
											layout : {
												align : 'stretch',
												type : 'vbox'
											},	
											items:[
											       {
											            xtype: 'combo',
											            cls: 'input-search-cls',
											            height: 30,
											            store: me.srvcListStore,
											            displayField: 'title',
											            valueField: 'SRVC_ID',
											            anchor: '100%',
											            emptyText: 'Nhập nội dung tìm kiếm',
											            minChars: 1,
											            listConfig: {
											                loadingText: 'Searching...',
											                emptyText: 'No matching posts found.',
											                // Custom rendering template for each item
											                getInnerTpl: function() {
											                    return '<a class="search-item">' 
											                         + '<h3>{SRVC_NM}<br /><span>{PRICE_IMPORT}</span></h3>'
											                         + '{UNIT_NM}  {DSCRT}' 
											                         + '</a>';
											                }
											            },
											            pageSize: 15,
											            listeners: {
											            	select: function(obj,record){
																var data = record[0].raw;
																var price = (data.PRICE_IMPORT != null&&data.PRICE_IMPORT!='')?data.PRICE_IMPORT:0;
																if(me.isDupplicateRecord(data.SRVC_ID)){
																	messageEvent.showWarningTimer('Đơn hàng đã có mặt hàng này !');
																	return 1;
																}
																else{
																	
																	importDetailStore.insert(importDetailStore.getCount(),{
																		SRVC_ID		: data.SRVC_ID,
																		SRVC_NAME	: data.SRVC_NM,
																		UNIT		: data.UNIT,
																		UNIT_NM		: data.UNIT_NM,
																		IMPRT_PRICE	: price,
																		AMOUNT		: 1.0,
																		TOTAL_MONEY : data.IMPRT_PRICE * 1.0
																		
																	});
																	
																}
																return false;
															}
														}
											        },
												{
													xtype : 'gridpanel',
													flex : 1,
													itemId : 'grid-import-srvc',
													minHeight : 340,
													maxHeight : 540,
													height: 440,
													fieldLabel : "Loại mặt hàng",
													store : importDetailStore,
													plugins: [
													   Ext.create('Ext.grid.plugin.CellEditing', {
													      clicksToEdit: 1
													   })
													],
													pageSize : 10,
													columns : [{
														xtype : 'rownumberer',
														width : 20,
														align : 'center',
														text : '',
														sortable : true
													}, {
														xtype : 'gridcolumn',
														align : 'left',
														flex: 1,
														dataIndex : 'SRVC_NAME',
														text : 'Tên hàng',
														sortable : true
													}, {
														xtype : 'numbercolumn',
														align : 'right',
														width : 85,
														editable: true,
														format: '0,000',
														dataIndex : 'IMPRT_PRICE',
														text : 'Giá',
														sortable : true,
														editor: {
												            xtype: 'numberfield',
												            allowBlank: false
												        }
												        /*renderer: function(value, metadata, record){
															var valuePrice = parseFloat(value);
															data = formatSupporter.formatToMoney(valuePrice);
															
															return data;
														}*/
													}, {
														xtype : 'numbercolumn',
														align : 'right',
														width : 70,
														editable: true,
														dataIndex : 'AMOUNT',
														format: '0,000',
														text : 'SL',
														sortable : true,
														editor: {
												            xtype: 'numberfield',
												            allowBlank: false
												        }
												        /*renderer: function(value, metadata, record){
															
															data = formatSupporter.formatToMoney(value);
															return data;
														}*/
												    }, {
														xtype : 'gridcolumn',
														align : 'center',
														width : 60,
														dataIndex : 'UNIT_NM',
														text : 'Đ/V',
													}, {
														xtype : 'numbercolumn',
														align : 'right',
														width : 110,
														dataIndex : 'TOTAL_MONEY',
														text : 'Tổng $',
														sortable : true,
														renderer: function(value, metadata, record){
															var items = importDetailStore.data.items;
															var totalMoney = 0;
															for(var index = 0 ; index < items.length ; index++){
																totalMoney += (items[index].data.IMPRT_PRICE * items[index].data.AMOUNT);
															}
															tmpValue = Number(totalMoney).toLocaleString('en-US');
															Ext.getCmp("TOTAL").setValue(tmpValue);
															Ext.getCmp("TOTAL_VALUE").setValue(totalMoney);
															
															money = parseFloat(record.get('AMOUNT'))*parseFloat(record.get('IMPRT_PRICE'));
															data = formatSupporter.formatToMoney(money);
															return data;
														}
													},{
														xtype : 'gridcolumn',
														align : 'right',
														width : 100,
														editable: true,
														editor: {
												            xtype: 'textfield',
												            allowBlank: true
												        },
														dataIndex : 'NOTE',
														hidden: true,
														text : 'Ghi chú',
														sortable : true,
													}, {
														menuDisabled : true,
														sortable : false,
														text : 'Xóa',
														xtype : 'actioncolumn',
														align : 'center',
														width : 40,
														items : [ {
															iconCls : 'icon-remove',
															tooltip : 'Xóa mục này',
															handler : function(grid, rowIndex, colIndex){
																me.deleteRecord(grid, rowIndex, colIndex);
															}
														} ]
													}
													]
												}
											]
										},
								         {
											xtype : 'container',
											//flex : 1,
											width : 300,
											layout : {
												align : 'stretch',
												type : 'vbox'
											},
											padding : '0 0 0 5',
											items: [
											        {
											    	xtype:'fieldset',
											        columnWidth: 0.5,
											        title: 'Tổng số tiền',
											        collapsible: true,
											        defaultType: 'textfield',
											        defaults: {anchor: '100%'},
											        layout: 'anchor',
											        items :[
											            {
											        		xtype : 'numericfield',
											        		id : 'TOTAL',
											        		labelWidth: 90,
											        		fieldLabel : "",
											        		useThousandSeparator: true,
															decimalPrecision: 0,
															hideTrigger:true,
															alwaysDisplayDecimals: false,
															allowNegative: false,
															currencySymbol:'',
															thousandSeparator: ',',
											        		cls: 'input-total-money-cls',
											        		readOnly : true
											        	},
											        	{
											        		xtype : 'numberfield',
											        		id : 'TOTAL_VALUE',
											        		fieldLabel : "",
											        		cls: 'input-total-money-cls',
											        		hidden : true
														}
											        ]
												},
											      {
											        xtype:'fieldset',
											        columnWidth: 0.5,
											        title: 'Hóa đơn',
											        collapsible: true,
											        defaultType: 'textfield',
											        defaults: {anchor: '100%'},
											        layout: 'anchor',
											        items :[{
														xtype : 'datefield',
														itemId:'DATE_IMPORT',
														name:'DATE_IMPORT',
														labelWidth: 90,
														format : 'd-m-Y',
														altFormats: 'Ymd',
														fieldLabel : 'Ngày',
														value: new Date(),
														submitFormat: 'Y/m/d',
														
											        },
											        {
														xtype : 'textfield',
														id : 'BILL',
														readOnly: true,
														labelWidth: 90,
														fieldLabel : "Số hóa đơn",
														value : me.IMPRT_BILL
											        },
											        {
											        	xtype : 'container',
														flex : 1,
														defaults : {
															anchor : '100%'
														},
														padding : '0 0 5 0',
														layout : {
															align : 'stretch',
															type : 'hbox'
														},
														items : [
														         {
																	xtype : 'combobox',
																	datatype : 'combo',
																	store : Ext.create('MNG.store.providerStore'),
																	labelWidth: 90,
																	fieldLabel : "Đ/V cung cấp",
																	displayField : 'PROV_NM',
																	valueField : 'PROV_CD',
																	itemId: 'PROV_CD_Item',
																	id : 'PROV',
																	flex: 1,
																	enableKeyEvents:true,
																	rawValue : me.PROV_NM,
																	value : me.PROV_CD,
																	editable : true
														        },
														         {
														        	xtype : 'button',
														        	cls: 'addmore',
														        	width: 20,
																	itemId : 'btnAddCustomer'
														         }
																]
											        }
											        ]
											    },
											    {
												        xtype:'fieldset',
												        columnWidth: 0.5,
												        title: 'Ghi chú',
												        collapsible: true,
												        defaultType: 'textfield',
												        defaults: {anchor: '100%'},
												        layout: 'anchor',
												        items :[{
													        	xtype : 'textarea',
																labelWidth: 90,
																name:'DESCRIPTION',
																//fieldLabel : "Ghi chú",
																value : me.DESCRIPTION
												        	}]
											        },
												{
													xtype : 'container',
													layout : {
														align : 'center',
														type : 'hbox'
													},
													defaults : {
														cls : 'inline-button',
														padding : '10 10 10 10'
													},
													padding : '10 0 10 0',
													items : [
														{
															xtype: 'button',
															text : 'Hủy',
															flex: 1,
															iconCls : 'icon-delete',
															style: 'background-color:red',
															listeners: {
																click : function(){
																	me.destroyPopup();
																}
															}
														},
														{
															xtype : 'button',
															itemId: 'btnSaveImportDetail',
															flex: 1,
															iconCls : 'icon-save',
															text : 'Lưu',
															listeners: {
																click : function(){
																	me.saveImport();
																}
															}
														},{
															xtype : 'button',
															flex: 1,
															hidden: true,
															iconCls : 'icon-excel',
															text : 'Excel',
															listeners: {
																click : function(){
																	me.exportExcel();
																}
															}
														}
													]
												}
											]
										}]
							}]
				}]
			}],
		});
		this.callParent(arguments);
	},
	listeners : {
		afterrender : function() {
			importDetailStore.removeAll();
			if(importVO.IMPRT_CD == 0) return;
			if(importVO.IMPRT_CD == null) return;
			this.srvcListStore.getProxy().url = contextPath +'/getSearchListMenu.json',
			importDetailStore.load(
					{
						params:{IMPRT_CD: importVO.IMPRT_CD},
						scope: this,
						callback : function(store,records,success){
							var totalMoney = 0;
							for(var index = 0 ; index < store.length ; index++){
								totalMoney += (store[index].data.IMPRT_PRICE * store[index].data.AMOUNT);
							}
							Ext.getCmp("TOTAL").setValue(totalMoney);
						}
					});
			Ext.ComponentQuery.query('#btnStoreContainerId #PROV_CD_Item')[0].setRawValue(importVO.PROV_NM); 
			if(importVO.DATE_IMPORT != null && importVO.DATE_IMPORT.length > 8){
				var mydate = new Date(importVO.DATE_IMPORT);
				txtDate = formatSupporter.getVNDay(mydate);
				Ext.ComponentQuery.query('#btnStoreContainerId #DATE_IMPORT')[0].setValue(txtDate);
			}
		}
	},
	saveImport : function(){
		var me = this;
		var dateImport = Ext.ComponentQuery.query('#DATE_IMPORT')[0].getSubmitValue();
		if(dateImport == null || dateImport.length < 8)
		 dateImport = importVO.DATE_IMPORT;
		//messageEvent.showLoadingOnprogress('Lưu...', 'btnCloseToCalculate');
		var _importVO = {
			IMPRT_BILL : Ext.getCmp("BILL").value,
			PROV_CD : Ext.getCmp("PROV").value,
			PROV_NM : Ext.getCmp("PROV").getRawValue(),
			TOTAL_MONEY : Ext.getCmp("TOTAL_VALUE").value,
			DISCOUNT_MONEY : 0,
			NEEDTOPAYED : 0,
			PAYED_MONEY : 0,
			IMPRT_CD : importVO.IMPRT_CD,
			DATE_IMPORT: dateImport,
			DESCRIPTION: Ext.ComponentQuery.query('#btnStoreContainerId [name=DESCRIPTION]')[0].getValue()
		}
		importDetailStore.each(function(record){
			amount = record.data.AMOUNT;
			price = record.data.IMPRT_PRICE;
			record.set('TOTAL_MONEY', amount*price);
		});
		var params = {
			importVO: JSON.stringify(_importVO),
			importDetailVO: Ext.encode(Ext.Array.pluck(importDetailStore.data.items, 'data'))
		};
		me.sendSubmitRequest(params);
	},
	destroyPopup : function(){
		this.close();
	},
	changeType : function(combo, value) {

	},
	setDeactiveCreate : function(isActive) {
	},
	deleteRecord:function(grid, rowIndex, colIndex){
		
		store = grid.getStore();
		var rec = store.getAt(rowIndex);
		grid.getStore().remove(rec);
		
		// Update total money
		var items = importDetailStore.data.items;
		var totalMoney = 0;
		for(var index = 0 ; index < items.length ; index++){
			totalMoney += (items[index].data.IMPRT_PRICE * items[index].data.AMOUNT);
		}
		tmpValue = Number(totalMoney).toLocaleString('en-US');
		Ext.getCmp("TOTAL").setValue(tmpValue);
		Ext.getCmp("TOTAL_VALUE").setValue(totalMoney);
		//Ext.getCmp("NEEDPAYED").setValue(Ext.getCmp("TOTAL_VALUE").value - Ext.getCmp("DISCOUNT").value);
	},
	isDupplicateRecord:function(menuId){
		var isExist = false;
		var gridTmp = Ext.ComponentQuery.query('#grid-import-srvc')[0];
		gridTmp.getStore().each(function(record) {
			
			if(menuId != null && menuId == record.get('SRVC_ID')){
				isExist = true;
				return isExist;
			}
		});
		return isExist;
	},
	sendSubmitRequest:function(params){
		me = this;
		swal({
		  title: "Chắc chắn muốn lưu ?",
		  text: "Nhấn OK để lưu nếu mọi thông tin đã chính xác",
		  type: "info",
		  showCancelButton: true,
		  closeOnConfirm: false,
		  showLoaderOnConfirm: true,
		},
		function(){
			  Ext.Ajax.request( {
				url: contextPath + '/store/saveImport.json',
				method:'POST',
				params: params,
				success: function(response){
					
					var text = Ext.JSON.decode(response.responseText);
		    		if(text.message != null && text.message == 'permission'){
		    			swal('Bạn không cấp quyền cập nhật. Hãy liên hệ với quản lý !')
		    			return;
		    		}
					var Grid = Ext.ComponentQuery.query('#grid-store-srvc')[0];
	    				var storeTmp = Grid.getStore().load();
					me.destroy();
					swal("Cập nhật thành công !");
				},
				failure: function(response){
					/*Ext.Msg.show({
	                    title: 'Thông báo',
	                     msg:'Có lỗi xảy ra trong quá trình cập nhật',
	                     buttons: Ext.Msg.OK,
	                     icon: Ext.Msg.QUESTION
	                });
					me.destroy();*/
				}
			});
		});
		
	},
	exportExcel: function(){
		res = importVO.DATE_IMPORT.split(" ");
		var param = "?IMPRT_CD="+ importVO.IMPRT_CD +"&FILENAME="+ 'NhapHang('+res[0]+')'; 
		var _url = contextPath + '/report/excel/ExcelImportDetail.do'+param;
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
});
