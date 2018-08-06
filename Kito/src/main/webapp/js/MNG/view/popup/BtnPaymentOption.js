/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */
var bankAccountStore = Ext.create('MNG.store.bankAccountStore');
Ext.define('MNG.view.popup.BtnPaymentOption', {
	extend : 'Ext.window.Window',
	Height : 400,
	width : 500,
	title : 'Loại hình thanh toán',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isActive : false,
	y: 100,
	paymentOption : {
		type : PaymentTypeGroup.CASH,
		text : 'tiền mặt',
		bankId: null
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
									itemId:'TOTAL_MONEY_NM1',
									cls: 'input-total-money-cls',
									height: 30
									//readOnly: true
								},{
									xtype : 'container',
									layout : {
										align : 'stretch',
										type : 'hbox'
									},
									items : [
									         {
									        	xtype : 'button',
												cls : 'button',
												action: 'pay',
												name: 'cash',
												flex: 1,
												text : 'Tiền mặt',
												margin: '0 10 0 0'
									         },
									         {
									        	xtype : 'button',
												cls : 'button',
												name: 'card',
												hidden: true,
												action: 'pay',
												flex: 1,
												text : 'Qua thẻ',
									         },
									         {
									        	xtype : 'button',
												cls : 'button',
												action: 'pay',
												name: 'ebank',
												flex: 1,
												text : 'Chuyển khoản',
									         }
									         ]
								},{
									xtype : 'combo',
									fieldLabel : "Tài khoản nhận",
									store : bankAccountStore,
									itemId: 'comboCustomerId',
									emptyText : 'Chọn tài khoản nhận tiền',
									displayField : 'ACCOUNT_NO',
									valueField : 'ID_BANK',
									anchor : '100%',
									listConfig : {
										loadingText : 'Searching...',
										emptyText : 'Không có bản ghi nào phù hợp.',
										getInnerTpl : function() {
											return '<a class="search-item">' 
										           + '{ACCOUNT_NO}<br/>'
										           + '<h3>{BANK_NM}</h3>' 
										           + '</a>';
												}
										}
								},{
									xtype : 'textarea',
									fieldLabel: 'Ghi chú',
									itemId:'PAY_DSCRT',
									value:'',
									readOnly: true,
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
				itemId : 'btnSavePaymentOption'
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
		/*Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY_NM')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY_NM')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #TOTAL_MONEY')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #PAYED_MONEY')[0].setValue(0);
		Ext.ComponentQuery.query('#btnRoomPayment #REFUN_MONEY')[0].setValue(0);
		
		Ext.ComponentQuery.query('#btnRoomPayment #IS_DEBIT')[0].setValue(false);
		Ext.ComponentQuery.query('#btnRoomPayment #DSCRT')[0].setValue('');*/
		
		
	}
});
