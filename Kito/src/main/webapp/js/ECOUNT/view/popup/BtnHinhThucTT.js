/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2018/12/01
 */

Ext.define('ECNT.view.popup.BtnHinhThucTT', {
    extend: 'Ext.window.Window',

   requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.custom.common.NumberField'
    ],

    totalValue: 0,
    customerPayValue: 0,
    itemId: 'addPaymentPopup',
    supportEvent: null,
    width: 410,
    resizable: false,
    title: 'Hình thức thanh toán',
    targetComponent: null,
    paymethodStore: Ext.create('ECNT.store.paymentMethodStore',{}),
    initComponent: function() {
        var me = this;
        me.supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    defaults: {
                        minWidth: 100
                    },
                    items: [
                        {
                            xtype: 'component',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'OK',
                            handler: function(){
                            	me.getPaymentMethod(me);
                            	}
                        },
                        {
                            xtype: 'button',
                            text: 'Thoát',
                            handler: function(){
                            	me.close();
                            	}
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    width: 400,
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center',
                        padding: '10 20 0 0'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            fieldLabel: 'TỔNG TRÊN HÓA ĐƠN',
                            name: 'sum',
                            cls: 'sum-text-cls',
                            labelAlign: 'right',
                            labelWidth: 150,
                            padding: 5,
                            value: me.totalValue
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'hinhthucttContainerId',
                    padding: '10 0 20 10',
                    width: 390,
                    title: '',
                    items: [
                         Ext.create('ECNT.view.form.formHinhThucTT',{defaultMethod: PaymentTypeGroup.CASH
                        	 , defaultValue: me.customerPayValue
                        	 , mainParent: '#hinhthucttContainerId', isAdd: true})
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    getPaymentMethod:function(me){
    	var hinhthuctts = Ext.ComponentQuery.query('hinhthuctt');
    	var tmpStore = me.paymethodStore;
    	tmpStore.removeAll();
    	var payedValue = 0;
    	var isValid = true;
    	if(hinhthuctts!= null && hinhthuctts.length>0){
    		
    		for(var i=0; i<hinhthuctts.length; i++){
    			itemTmp = hinhthuctts[i];
    			var account = itemTmp.items.getAt(0).getValue();
    			var name = itemTmp.items.getAt(0).getRawValue();
    			var value = itemTmp.items.getAt(1).getValue();
    			
    			if(account != null && value!=null && account.length > 0 && value >= 0){
    				payedValue = payedValue + value;
	    			tmpStore.add({
	    				ID_BANK: 	account,
	    				VALUE: 		value,
	    				BANK_NM: 	name
	    			})
    			}
    			else{
    				isValid = false;
    				supportEvent.showWarningTimer('Tài khoản thanh toán không được để trống');
    			}
    		}
    	}
    	if(isValid){
    		me.targetComponent.setValue(payedValue);
    		me.hide();
    	}
    }

});