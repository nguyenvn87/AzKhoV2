/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnUpdatePayment', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	title : 'Thanh Toán',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isActive : false,
	y: 0,
	config : {
		idOfGrid : ""
	},
	roomUseId: null,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				cls : 'jdvn-main',
				itemId : 'btnDebitPayment',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [ {
						xtype : 'container',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
								cls : 'jdvn-sub-body',
								flex : 1
							},
						items : [
						        {
						        	xtype : 'container',
									layout : {
										align : 'stretch',
										type : 'hbox'
									},
									items:[
									       {
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Tổng tiền (vnđ): ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'TOTAL_MONEY_NM',
											text : '0.0',
											cls: 'sumary-field'
										}]
								},
								{
						        	xtype : 'container',
									layout : {
										align : 'stretch',
										type : 'hbox'
									},
									items:[
									       {
											xtype : 'label',
											fieldLabel : 'Tổng',
											text : 'Đã thanh toán (vnđ): ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'PAYED_MONEY_NM',
											text : '0.0',
											cls: 'sumary-field'
										}]
								},
								{
						        	xtype : 'container',
									layout : {
										align : 'stretch',
										type : 'hbox'
									},
									items:[
									       {
											xtype : 'label',
											fieldLabel : 'Tổng(vnđ)',
											text : 'Còn thiếu (vnđ): ',
											cls: 'sumary-label'
										},
										{
											xtype : 'label',
											fieldLabel : 'Tổng',
											itemId: 'LACK_MONEY',
											text : '0.0',
											cls: 'sumary-field'
										}]
								},
								{
									xtype : 'datefield',
									itemId:'PAY_DATE',
									name:'PAY_DATE',
									format : 'd/m/Y',
									altFormats: 'Ymd',
									fieldLabel : 'Ngày trả',
									value: new Date(),
									submitFormat: 'dd/mm/YYYY',
									emptyText : 'Ngày'
						        },
								{
									xtype : 'textfield',
									fieldLabel: 'Số tiền trả(vnđ)',
									itemId:'PAYED_MONEY',
									value: 0,
									readOnly: false,
								},{
									xtype: 'checkbox',
									fieldLabel: 'Ghi nợ',
									itemId:'IS_DEBIT',
	                                checked: false,
	                                hidden: true,
	                                inputValue: '1',
	                                listeners: {
	                                	change: function (checkbox, newVal, oldVal) {
	                                		if(newVal){
	                                			Ext.ComponentQuery.query('#btnDebitPayment #PAYED_MONEY')[0].setValue(0);
	                                			Ext.ComponentQuery.query('#btnDebitPayment #DSCRT')[0].setValue("Họ tên:......số ĐT:......Địa chỉ:......ghi nợ");
	                                		}
	                                		else{
	                                			var value = Ext.ComponentQuery.query('#btnDebitPayment #TOTAL_MONEY')[0].getValue();
	                                			Ext.ComponentQuery.query('#btnDebitPayment #DSCRT')[0].setValue("Đã thanh toán");
	                                			Ext.ComponentQuery.query('#btnDebitPayment #PAYED_MONEY')[0].setValue(value);
	                                		}
	                                	}
	                                }
	                            },{
	                            	xtype: 'checkbox',
	                            	fieldLabel: 'Đã trả',
	                            	itemId:'HAS_PAYED',
	                            },
	                            {
									xtype : 'textarea',
									fieldLabel: 'Nội dung',
									itemId:'PAY_INFO',
									emptyText : 'Nhập nội dung ghi chú',
								}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				text : 'Ok',
				itemId : 'btnSaveDebitPayment'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Cancel',
				listeners : {
					click : function() {
						this.up('.window').hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	setDisplayDate: function(_date, _totalMoney, _payedMoney, _hasPayed ){
		
		// 1. Date
		// 2. Total money
		var value1 = Ext.util.Format.number(_totalMoney, '0,000.00');
		Ext.ComponentQuery.query('#btnDebitPayment #TOTAL_MONEY_NM')[0].setText(value1);
		// 3. Payed money
		var value2 = Ext.util.Format.number(_payedMoney, '0,000.00');
		Ext.ComponentQuery.query('#btnDebitPayment #PAYED_MONEY_NM')[0].setText(value2);
		// 4. Nội dung 
		tmpMoney = _totalMoney - _payedMoney;
		var value3 = Ext.util.Format.number(tmpMoney, '0,000.00');
		Ext.ComponentQuery.query('#btnDebitPayment #LACK_MONEY')[0].setText(value3);
		// 5. Trạng thái nợ
		Ext.ComponentQuery.query('#btnDebitPayment #HAS_PAYED')[0].setValue(_hasPayed);
	}
});
