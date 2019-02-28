/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('ECNT.view.popup.BtnSetChietKhau', {
	extend : 'Ext.window.Window',
	requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.custom.common.NumberField'
    ],
	Height : 400,
	width : 500,
	y: 20,
	title : 'Chiết khấu',
	maxHeight : 600,
	closeAction : 'close',
	resizable : false,
	isUpdate: true,
	targetComponent: null,
	totalValue: 0,
	outputValue: 0,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype: 'form',
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
						padding: '10 10 10 10',
						cls : 'my-btn',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
								//cls : 'jdvn-sub-body',
								flex : 1
							},
						items : [{
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
				                            value: me.displayValue
				                        }
				                    ]
			                },
			                {
			                	xtype : 'container',
			                	layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items:[
									{													
										xtype : 'numberfield',
										width: 190,
										padding: '0 20 0 0',
										minValue: 0,
										value: 0,
										labelWidth: 100,
										maxValue: 100,
										name:'chietkhauratio',
										fieldLabel : 'Chiết khấu %',
										listeners : {
											change : function(field,newVal,oldVal) {
												var total = 0;
												if(newVal==0) total = 0;
												else{
													total = newVal* me.totalValue/100;
												} 
												var objValue = field.up('form').down('[name=chietkhauvalue]');
												me.outputValue = total;
												objValue.setValue(total);
											}
										}
									},
									{
										xtype : 'numericfield',
										fieldLabel : "",
										value: 0,
										flex: 1,
										name:'chietkhauvalue',
										useThousandSeparator: true,
										decimalPrecision: 0,
										hideTrigger:true,
										alwaysDisplayDecimals: false,
										allowNegative: false,
										currencySymbol:'',
										thousandSeparator: ',',
										cls: 'input-total-money-cls'
									}
								]
			                },
			                
							{
								xtype : 'container',
								padding: '10 10 10 10',
								layout : {
									align: 'center',
									pack: 'center',
									type : 'hbox'
								},
								defaults : {
									padding: '0 10 0 0',
								},
								items : [
									{
										xtype : 'button',
										text: '5%',
										handler: function(field){
											me.selectPercent(field, 0.05);
										}
									},
									{
										xtype : 'button',
										text: '10%',
										handler: function(field){
											me.selectPercent(field, 0.10);
										}
									},
									{
										xtype : 'button',
										text: '15%',
										handler: function(field){
											me.selectPercent(field, 0.15);
										}
									},
									{
										xtype : 'button',
										text: '20%',
										handler: function(field){
											me.selectPercent(field, 0.20);
										}
									},
									{
										xtype : 'button',
										text: '25%',
										handler: function(field){
											me.selectPercent(field, 0.25);
										}
									},
									{
										xtype : 'button',
										text: '30%',
										handler: function(field){
											me.selectPercent(field, 0.30);
										}
									},
								]
							}
						]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				iconCls : 'icon-true',
				text : 'OK',
				handler: function(){
					me.okChietKhau(me);
				}
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				iconCls : 'icon-delete',
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').close();
					}
				}
			} ]
		});
		this.callParent(arguments);
	},
	selectPercent: function(me, value){
		var parent = this;
		valueTmp = value * this.totalValue;
		var objRatio = me.up('form').down('[name=chietkhauratio]');
		var objValue = me.up('form').down('[name=chietkhauvalue]');
		percent = value * 100;
		objRatio.setValue(percent);
		var totalValue = formatSupporter.formatToMoney(valueTmp);
		this.outputValue = valueTmp;
		objValue.setValue(totalValue);
	},
	okChietKhau: function(me){
		if(me.targetComponent!= null){
			me.targetComponent.setValue(me.outputValue);
		}
		var ScreenXY = Ext.getBody().getViewSize();
		var toadoY = ScreenXY.height;
		var toadoX = ScreenXY.width;
		this.x = toadoY/2;
		this.close();
	}
});
