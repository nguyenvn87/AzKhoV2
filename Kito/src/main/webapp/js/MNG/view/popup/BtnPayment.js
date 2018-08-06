/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnPayment', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	title : 'Thanh Toán',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isActive : false,
	y: 100,
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
				itemId : 'btnRoomPayment',
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
									xtype : 'datefield',
									itemId:'TIME_END',
									name:'TIME_END',
									format : 'H:i',
									hidden: true,
									altFormats: 'Ymd',
									fieldLabel : 'Giờ ra',
									value: new Date(),
									submitFormat: 'H:i',
									emptyText : 'Giờ ra'
						        },
								{
									xtype : 'textfield',
									fieldLabel: 'Tổng số tiền',
									itemId:'TOTAL_MONEY_NM',
									cls: 'input-total-money-cls',
									height: 30,
									readOnly: true
								},
						        {
									xtype : 'numberfield',
									itemId:'TOTAL_MONEY',
									minValue: 0,
									height: 30,
									hidden: true,
									value: 0,
			                        maxValue: 100000000
								},{
									xtype : 'numberfield',
									itemId:'PAYED_MONEY',
									minValue: 0,
									height: 30,
									hidden: true,
									value: 0,
			                        maxValue: 100000000
								},{
									xtype : 'textfield',
									fieldLabel: 'Khách trả',
									cls: 'input-pay-money-cls',
									itemId:'PAYED_MONEY_NM',
									height: 30,
									listeners: {
										render: function( component ) {
							                component.getEl().on('click', function( event, el ) {
							                    console.log('click = ');
							                    payMoney = Ext.ComponentQuery.query('#PAYED_MONEY')[0].getValue();
							                    Ext.ComponentQuery.query('#PAYED_MONEY_NM')[0].setValue(payMoney);
							                });
							            },
										change: function(field) {
											payMoney = Ext.ComponentQuery.query('#PAYED_MONEY')[0].getValue();
											refun = payMoney - Ext.ComponentQuery.query("#btnRoomPayment #TOTAL_MONEY")[0].getValue();
											_value = Ext.util.Format.number(refun, '0,00/i');
											Ext.ComponentQuery.query('#REFUN_MONEY')[0].setValue((refun > 0)?_value:0);
											Ext.ComponentQuery.query('#PAYED_MONEY')[0].setValue(field.value);
										},
										blur: function(field) {											
											tmpValue = field.value;
											if(field.value == null || field.value == ''){
												tmpValue = 0;
											}
											
											refun = field.value ;
											_value = Ext.util.Format.number(refun, '0,000');
											Ext.ComponentQuery.query('#PAYED_MONEY_NM')[0].setValue(_value);
											Ext.ComponentQuery.query('#PAYED_MONEY')[0].setValue(tmpValue);
										}
									}
								},{
									xtype : 'textfield',
									fieldLabel: 'Tiền thừa',
									cls: 'input-needpay-money-cls',
									itemId:'REFUN_MONEY',
									minValue: 0,
									height: 30,
									value: 0,
									readOnly: true
								},{
									xtype: 'checkbox',
									fieldLabel: 'Ghi nợ',
									itemId:'IS_DEBIT',
	                                checked: false,
	                                inputValue: '1',
	                                listeners: {
	                                	change: function (checkbox, newVal, oldVal) {
	                                		if(newVal){
	                                			Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].setValue(0);
	                                			Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY_NM')[0].setValue('0');
	                                			Ext.ComponentQuery.query('#btnRoomPayment #DSCRT')[0].setValue("Họ tên:......số ĐT:......Địa chỉ:......ghi nợ");
	                                		}
	                                		else{
	                                			var value = Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY')[0].getValue();
	                                			Ext.ComponentQuery.query('#btnRoomPayment #DSCRT')[0].setValue("Đã thanh toán");
	                                			Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].setValue(value);
	                                			var valueNM = Ext.util.Format.number(value, '0,000');
	                                			Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY_NM')[0].setValue(valueNM);
	                                		}
	                                	}
	                                }
	                            },{
									xtype : 'textarea',
									fieldLabel: 'Ghi chú',
									itemId:'DSCRT',
									value:'Đã thanh toán',
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
				itemId : 'btnSaveSrvcPayment'
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
	initNew:function(){
		Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY_NM')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY_NM')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #REFUN_MONEY')[0].setValue(0);
		
		Ext.ComponentQuery.query('#btnRoomPayment #IS_DEBIT')[0].setValue(false);
		Ext.ComponentQuery.query('#btnRoomPayment #DSCRT')[0].setValue('');
		
		
	}
});
