
//var BtnUpdatePayment = Ext.create('MNG.view.popup.BtnUpdatePayment',{});
var statisticStore = Ext.create('MNG.store.roomTurnStore',{
	sorters: [{
                property: 'CHANGE_DATE',
                direction: 'desc'
            }]
});
Ext.define('MNG.view.statisticDebit', {
    extend: 'Ext.panel.Panel',
    cls: '',
    haspayed: null,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
						xtype : 'container',
						cls : 'jdvn-sub-body',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
							cls : 'row'
						},
						items : [
							{
								 xtype: 'gridpanel',
                                 itemId:'grid-srvc-statistic',
                                 //flex: 1,
                                 minHeight: 400,
                                 //maxHeight: 800,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 store: statisticStore,
                                 viewConfig: {
								      getRowClass: function(record, index, rowParams)
								      {
								    	  tmpId = record.data['HAS_PAYED'];
								    	  if(tmpId != null && tmpId == '0')
								    		  return 'rowClass1';
								      }
								   },
                                 columns: [
                                     /*{
                                         xtype: 'rownumberer',
                                         width: 30,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'rn1',
                                         text: 'TT'
                                     },*/
                                     {
                                         xtype: 'gridcolumn',
                                         width: 30,
                                         sortable:false,
                                         align:'center',
                                         dataIndex: 'rn1',
                                         text: 'TT'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:true,
                                         align:'left',
                                         width: 150,
                                         hidden: true,
                                         dataIndex: 'CHANGE_DATE',
                                         text: 'Time'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         sortable:false,
                                         align:'left',
                                         text: 'Ngày nợ',
                                         width: 90,
                                         renderer :function(value, p , r){
                            					data = r.data['CHANGE_DATE'];
                            					console.log(data);
                            					if(data != '')
                            						data = formatSupporter.convertToVNDateFromEngDate(data);
                            					console.log(data);
                            					return  data;
                            				}
                                     },
                                     
                                     {
                                         xtype: 'gridcolumn',
                                         align:'right',
                                         sortable:false,
                                         hidden: true,
                                         dataIndex: 'TIME_STS',
                                         width: 80,
                                         text: 'Giờ vào'
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TIME_END',
                                         align:'right',
                                         hidden: true,
                                         sortable:false,
                                         text: 'Giờ ra',
                                         width: 80
                                          
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'ROOM_NO',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Phòng',
                                         width: 100
                                     },
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'TOTAL_MONEY',
                                         hidden: true,
                                         sortable:false,
                                         text: 'Số tiền',
                                         flex: 0.5,
                                     },
                                     {
             							xtype : 'gridcolumn',
             							width : 100,
             							sortable : false,
             							align : 'right',
             							text : "Tổng tiền",
             							renderer :function(value, p , r){
                           					data = r.data['TOTAL_MONEY'];
                           					if(data != '')
                           						data = formatSupporter.formatToMoney(data);
                           					return  data;
                           				}
             						}, 
									 {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAYED_MONEY',
                                         align:'right',
                                         sortable:false,
                                         text: 'Thanh toán',
                                         width : 100,
                                         renderer :function(value, p , r){
                            					data = r.data['PAYED_MONEY'];
                            					if(data != '')
                            						data = formatSupporter.formatToMoney(data);
                            					return  data;
                            				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'IS_DEBIT',
                                         sortable:true,
                                         text: 'Ghi nợ',
                                         width: 60,
                                         renderer :function(value, p , r){
                         					data = r.data['IS_DEBIT'];
                         					if(data != '' && data == '1')
                         						return 'Nợ'
                         					return  '';
                         				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'HAS_PAYED',
                                         sortable:true,
                                         text: 'Trả nợ',
                                         width: 80,
                                         renderer :function(value, p , r){
                         					data = r.data['HAS_PAYED'];
                         					debit = r.data['IS_DEBIT'];
                         					if(debit != '1'){
                         						return '';
                         					}
                         					if(data != '' && data == '1')
                         						return 'Đã trả'
                         					return  'Chưa trả';
                         				}
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'DSCRT',
                                         sortable:false,
                                         text: 'Ghi chú',
                                         flex: 1
                                     },{
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAY_INFO',
                                         sortable:false,
                                         hidden: true,
                                         text: 'Nội dung trả',
                                         width: 120
                                     },
                                     {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'PAY_DATE',
                                         sortable:false,
                                         text: 'Ngày trả',
                                         width: 90
                                     },
                                     
                                     {
						                menuDisabled: true,
						                sortable: false,
						                align:'center',
						                xtype: 'actioncolumn',
						                text: 'Cập nhật',
						                width: 70,
						                items: [{
						                    iconCls : 'icon-edit',
						                    tooltip: 'Sửa dòng này',
						                    handler: function(grid, rowIndex, colIndex) {
						                    	store = grid.getStore();
						                    	var rec = store.getAt(rowIndex);
						                    	_totalMoney = rec.get("TOTAL_MONEY");
						                    	_payedMoney = rec.get("PAYED_MONEY");
						                    	_hasPayed = rec.get("HAS_PAYED");
						                    	BtnUpdatePayment.roomUseId = rec.get("ROOM_USED_ID");
						                    	BtnUpdatePayment.setDisplayDate('', _totalMoney, _payedMoney, _hasPayed);
						                    	BtnUpdatePayment.show();
						                    }
						                }]
						            },
						            {
                                         xtype: 'gridcolumn',
                                         dataIndex: 'USER_NAME',
                                         sortable:false,
                                         text: 'Người lưu',
                                         width: 80
                                     }
                                 ],
                                 tbar: [
                                        {
	                                	 	text: 'Tất cả',
	                                	 	iconCls: 'icon-search',
	                                	 	itemId: 'btnStatisAllDebit',
	                                	 	hidden: true
 		                                },{
	 	                                	text: '4 Ngày',
	 	                                	iconCls: 'icon-search',
	 	                                	itemId: 'btnStatisWeekly',
	 	                                	hidden: true
 	 		                           },{
	 	 	                                text: 'Tháng',
	 	 	                                iconCls: 'icon-search',
	 	 	                                cls: 'buttonCls',
	 	 	                                itemId: 'btnStatisMonthly',
	 	 	                                hidden: true
 	 	 		                       },{
	 	 	 	                            text: 'Khác',
	 	 	 	                            iconCls: 'icon-search',
	 	 	 	                            itemId: 'btnStatisQuy',
	 	 	 	                            hidden: true
 	 	 	 		                   }
             						],
             					bbar: [{
	                                	 	text: 'PDF',
	                                	 	iconCls: 'icon-pdf',
	                                	 	height: 30,
	                                	 	handler: function(){
	                                	 		me.printStatistic();
	                                	 	}
 		                                },
 		                                {
	                                	 	text: 'Excel',
	                                	 	iconCls: 'icon-excel',
	                                	 	height: 30,
	                                	 	//itemId: 'btnStatisDebitPrint',
	                                	 	handler: function(){
	                                	 		me.printExcel();
	                                	 	}
 		                                }
             						],
                                 dockedItems: [
                                     {
                                         xtype: 'pagingtoolbar',
                                         dock: 'bottom',
                                         store: statisticStore,
                                         displayInfo: true
                                     }
                                 ]
							},{
								xtype : 'container',
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items:[{
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Tổng: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-total-id',
											text : '0.0',
											cls: 'sumary-field'
										},
										{
											xtype : 'label',
											fieldLabel : 'Đã thanh toán',
											text : 'Thanh toán: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'statis-payed-id',
											text : '0.0',
											cls: 'sumary-field'
										},
										{
											xtype : 'label',
											fieldLabel : 'Nợ',
											text : 'Còn nợ: ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Nợ',
											itemId: 'statis-debit-id',
											text : '0.0',
											cls: 'sumary-field'
										}
								]
							}
						]
					}]
                }
            ]
        });
        me.callParent(arguments);
    },
    printStatistic : function(){
    	content = 'Tất cả nợ';
    	if(this.haspayed == '1'){
    		content = 'Nợ đã trả ';
    	}
    	if(this.haspayed == '0'){
    		content = 'Nợ chưa trả ';
    	}
    	var param = "?LIID=" + this.statisticType+"&STARTDATE="+this.startDate+"&ENDDATE="+this.endDate+"&HAS_PAYED="+this.haspayed+'&CONTENT='+content; 
		var location = contextPath + "/report/PrintDebitStatistic.do" + param;
		utilForm.btn_template_popup(location,"Doanh thu",800,1024,true);
    },
    printExcel : function(){
    	var hasPayed = '-1';
    	var content = '';
    	if(this.haspayed == '1'){
    		hasPayed = this.haspayed;
    		content = 'Đã Trả';
    	}
    	else if(this.haspayed == '0'){
    		hasPayed = this.haspayed;
    		content = 'Chưa Trả';
    	}
    	else{
    		hasPayed = '2';
    		content = 'Tất cả nợ';
    	}
    	var param = {
    			title: 'Thông Kê Nợ',
    			type: content
    	};
    	var tmpStore = Ext.create('MNG.store.roomTurnStore',{});
    	tmpStore.getProxy().url = contextPath  + '/getListAllRoomTurn.json';
    	tmpStore.getProxy().extraParams = {
						IS_DEBIT: 1,
						HAS_PAYED: hasPayed
					};
    	tmpStore.load({
    		callback: function(store, records, successful) {
    			console.log('Length = '+store.length);
    			var htmlCode = tablePrinter.printStore(param, store);
    			var win = window.open('data:application/vnd.ms-excel,'+encodeURIComponent(htmlCode));
    			win.focus();
    		}
    	});
		
    },
    printHtml : function(){
    	var param = {};
    	var htmlCode = tablePrinter.printStore(param, this);
		var win = window.open("", '_blank');
		win.document.write(htmlCode);
		win.focus();
    }
});