/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
//Ext.define('BS.infoPaymentContainer2',
Ext.define('BS.infoPaymentContainer', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.custom.common.NumberField'
    ],
    itemId : 'paymentItemId',
    iconCls : 'icon-payment',
    title: 'Thanh toán',
    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 5
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0 5 0 0',
                            width: 200,
                            padding: '',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'end',
                                padding: '0 10 0 0'
                            },
                            items: [
                                {
                                    xtype : 'datefield',
									name : 'CHANGETIME',
									format : 'd-m-Y H:i:s',
									altFormats : 'Ymd',
									fieldLabel : 'Ngày',
									value : new Date(),
									submitFormat : 'Y-m-d H:i:s',
									emptyText : 'Ngày',
									editable : false,
                                    labelWidth: 70
                                },
                                {
                                    xtype : 'numericfield',
									anchor : '100%',
									useThousandSeparator: true,
									decimalPrecision: 0,
									hideTrigger:true,
									alwaysDisplayDecimals: false,
									allowNegative: false,
									currencySymbol:'',
									thousandSeparator: ',',
									name : 'DISCOUNT',
									value : 0,
									cls : 'input-pay-money-cls',
									fieldLabel : "Chiết khấu",
                                    labelWidth: 70
                                },
                                {
                                    xtype : 'numericfield',
									anchor : '100%',
									useThousandSeparator: true,
									decimalPrecision: 0,
									hideTrigger:true,
									alwaysDisplayDecimals: false,
									allowNegative: false,
									currencySymbol:'',
									thousandSeparator: ',',
									name : 'TOTAL_MONEY',
									value : 0,
									cls : 'input-total-money-cls',
									fieldLabel : "Tổng tiền",
									readOnly : true,
                                    labelWidth: 70
                                },
                                {
                                    xtype: 'numericfield',
                                    fieldLabel: 'Khách trả',
                                    anchor : '100%',
									useThousandSeparator: true,
									decimalPrecision: 0,
									hideTrigger:true,
									alwaysDisplayDecimals: false,
									allowNegative: false,
									currencySymbol:'',
									thousandSeparator: ',',
                                    name: 'PAYED',
                                    value : 0,
									cls : 'input-total-money-cls',
                                    labelWidth: 70
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margins: '0 5 0 0',
                            height: 110,
                            width: 100,
                            layout: {
                                type: 'vbox',
                                pack: 'end',
                                padding: ''
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    boxLabel: 'Đã xuất hàng',
                                    name: 'IS_DELIVERED',
                                    checked : false,
                                    inputValue : '1'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'HAS_PAYED',
                                    boxLabel: 'Đã thanh toán',
                                    checked : false,
									inputValue : '1',
									listeners : {
										change : function(checkbox,newVal,oldVal) {
											if (newVal) {
												var total = Ext.ComponentQuery.query('#paymentItemId [name=TOTAL_MONEY]')[0].getValue();
												Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].setValue(total);
											} 
											else {
												Ext.ComponentQuery.query('#paymentItemId [name=PAYED]')[0].setValue(0);
											}
										}
									}
                                },
                                {
                                    xtype: 'container',
                                    height: 33,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'visa',
                                            itemId : 'PAYED_OPTION',
                                            height: 23,
                                            width: 25,
                                            tooltip: 'Hình thức thanh toán'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            height: 25,
                            margin: '0 5 0 0',
                            width: 123,
                            iconCls : 'icon-true',
                            text: 'Lưu',
                            itemId : 'btnPaymentIdOnlyPrint'
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            iconCls : 'icon-true',
                            height: 25,
                            width: 306,
                            text: 'Lưu & In',
                            itemId : 'btnPaymentId'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});