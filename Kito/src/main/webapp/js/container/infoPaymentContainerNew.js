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
        'Ext.button.Button'
    ],

    height: 164,
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
                    height: 106,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0 5 0 0',
                            height: 108,
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
									itemId : 'CHANGETIME',
									name : 'CHANGETIME',
									format : 'd-m-Y H:i:s',
									altFormats : 'Ymd',
									fieldLabel : 'Ngày',
									value : new Date(),
									submitFormat : 'Y-m-d H:i:s',
									emptyText : 'Ngày',
									editable : false,
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'textfield',
                                    width: 253,
                                    fieldLabel: 'Tổng tiền',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Khách trả',
                                    labelWidth: 60
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margins: '0 5 0 0',
                            height: 99,
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
                                    boxLabel: 'Đã xuất hàng'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    boxLabel: 'Đã thanh toán'
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
                                            cls: 'card-btn',
                                            flex: 1,
                                            height: 23,
                                            width: 65,
                                            text: 'Edit',
                                            tooltip: 'Hình thuc thanh toan'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 45,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            height: 31,
                            margin: '0 5 0 0',
                            width: 123,
                            iconCls : 'icon-true',
                            text: 'Lưu'
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            iconCls : 'icon-true',
                            height: 31,
                            width: 306,
                            text: 'Lưu & In'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});