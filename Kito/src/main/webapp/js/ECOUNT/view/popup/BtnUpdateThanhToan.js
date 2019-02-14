/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2018/12/01
 */

Ext.define('ECNT.view.popup.BtnUpdateThanhToan', {
    extend : 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox',
        'Ext.custom.common.NumberField'
    ],
    width: 489,
    y : 10,
    roomUsedId: null,
    valueTotal: 0,
    valuePayed: 0,
    hasPayed: '',
    bodyPadding: 10,
    supportEvent: null,
    targetComponent: null,
    itemId: 'mainComponentPaymentId',
    title: 'Cập nhật thanh toán',

    initComponent: function() {
        var me = this;
        me.supportEvent = Ext.create('BIZ.utilities.supportEvent',{});
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Hóa đơn',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
							name : 'TOTAL_MONEY',
							fieldLabel : 'Tổng hóa đơn',
							xtype : 'numericfield',
							height: 25,
							flex: 1,
							value: me.valueTotal,
							labelWidth: 120,
							useThousandSeparator: true,
							decimalPrecision: 0,
							hideTrigger:true,
							alwaysDisplayDecimals: false,
							allowNegative: false,
							currencySymbol:'',
							thousandSeparator: ',',
							cls: 'input-total-money-cls'
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            name : 'HAS_PAYED',
                            labelWidth: 120,
                            fieldLabel: 'Đã thanh toán',
                            inputValue: '1',
                            checked: me.hasPayed=='1'?true:false,
                            boxLabel: '',
                            listeners:{
                            	change: function(field, nv, ol){
                            		
                            		if(nv){
										value_ = field.up('window').down('[name=TOTAL_MONEY]').getValue();
										me.setPaymentValue(value_);
									}
                            		else {
                            			me.setPaymentValue(0);
                            		}
                            		
                            	}
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'hinhthucttContainerId',
                    padding: 10,
                    title: 'Phương thức thanh toán'
                }
            ],
            buttons : [
						{
							xtype : 'button',
							cls : 'button',
							iconCls : 'icon-save',
							action : 'saveSrvc',
							text : 'Lưu',
							listeners : {
								click : function() {
									me.submitPayment();
								}
							}
						},
						{
							xtype : 'button',
							cls : 'button',
							height : 25,
							text : 'Đóng',
							listeners : {
								click : function() {
									this.up('.window').close();
										}
							}
						} ],
            listeners: {
                afterrender: {
                    fn: me.onFormAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onFormAfterRender: function(component, eOpts) {
    	me = this;
    	me.getRequestMethod(me.roomUsedId);
    },
    setPaymentValue:function(_value){
			var hinhthuctts = Ext.ComponentQuery.query('hinhthuctt');
			if(hinhthuctts!= null && hinhthuctts.length>0){
				for(var i=0; i<hinhthuctts.length; i++){
				   itemTmp = hinhthuctts[i];
				   if(i==0)itemTmp.items.getAt(1).setValue(_value);
				   else itemTmp.items.getAt(1).setValue(0);
				}
			}
	},
    savePaymentMethod:function(){
			var hinhthuctts = Ext.ComponentQuery.query('hinhthuctt');
			var tmpStore = Ext.create('ECNT.store.paymentMethodStore',{});
			tmpStore.removeAll();
			var isValid = true;
			if(hinhthuctts!= null && hinhthuctts.length>0){
				
				  for(var i=0; i<hinhthuctts.length; i++){
					  
				    itemTmp = hinhthuctts[i];
				    var account = itemTmp.items.getAt(0).getValue();
				    var name = itemTmp.items.getAt(0).getRawValue();
				    var value = itemTmp.items.getAt(1).getValue();
				    if(account != null && value!=null && account.length > 0 && value >= 0){
					    tmpStore.add({
					    	ID_BANK: account,
					    	VALUE: value,
					    	BANK_NM: name
					    })
				    }
				    else{
				    	isValid = false;
				    	supportEvent.showWarningTimer('Tài khoản thanh toán không được để trống');
				    	return null;
				    }
				  }
			}
		return tmpStore;
	},
    renderPaymentMethod:function(data){
		var mainContainer = '#hinhthucttContainerId';
		var parent = Ext.ComponentQuery.query(mainContainer)[0];
		var isHaveData = false;
		if(data != null && data.length > 0){
			for(var i=0; i < data.length; i++){
		 		var isAdd = false;
		   		if(i==0) isAdd = true;
		   		var record = data[i];
		   		var item = Ext.create('ECNT.view.form.formHinhThucTT',{mainParent: mainContainer
		   				,defaultValue: record.VALUE
				   		,defaultMethod: record.ID_BANK
				   		, isAdd: isAdd})
				   		parent.add(item);
				   		isHaveData = true;
				   	}
			}
		if(!isHaveData){
			var item = Ext.create('ECNT.view.form.formHinhThucTT',{mainParent: mainContainer
			 			,defaultValue: 0
						,defaultMethod: PaymentTypeGroup.CASH
			 			, isAdd: true})
			parent.add(item);
			   	}
	},
	getRequestMethod: function(roomUsedId){
		me = this;
		Ext.Ajax.request( {
			url: contextPath + '/payment/getPaymentInfo.json',
			method:'GET',
			params: {
				  ROOM_USED_ID: roomUsedId
			},
			success: function(response){
				  var text = Ext.JSON.decode(response.responseText);
				  data = text.data;
				  me.renderPaymentMethod(data);
			},
			failure: function(response){
				  supportEvent.showMessageError('Có lỗi xảy ra !');			
			}
		});
	},
	submitPayment:function(){
		me = this;
		me.hide();
		var param = {};
		var tmpStore = me.savePaymentMethod();
		if(tmpStore == null) return;
		payData = Ext.encode(Ext.Array.pluck(tmpStore.data.items,'data'));
		var hasPayed = me.down('[name=HAS_PAYED]').getValue();
		param['METHOD'] = payData;
		param['HAS_PAYED'] = hasPayed==true?'1':'0';
		param['ROOM_USED_ID'] = me.roomUsedId;
		
		Ext.Ajax.request( {
    		url: contextPath + '/payment/updatePaymentMethod.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			me.close();
    			supportEvent.notiSuccess('Thành công !', 'Cập nhật thành công');
    			if(me.targetComponent != null) me.targetComponent.load();
    		},
    		failure: function(response){
    			supportEvent.showMessageError('Có lỗi xảy ra !');		
    		}
    	});
	}
});