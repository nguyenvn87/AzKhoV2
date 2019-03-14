/**
 * @author: Nguyennv Date: 27/11/2015
 *          Ext.define('BS.view.laForm.infoPartyContainer') Description: Display
 *          receiver party
 * 
 */
Ext.define('BS.infoOrderContainer', {
	extend : 'Ext.container.Container',
	requires: [
        'Ext.custom.common.NumberField'
    ],
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	itemId : 'orderMainContainer',
	iconCls: 'icon-return',
	title: 'Thanh toán trả hàng',
	padding : '5 5 5 5',
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [
					{
						xtype : 'fieldset',
						columnWidth : 0.5,
						collapsible : false,
						collapsed: false,
						border: false,
						padding: '0 5 0 5',
						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'anchor',
						items : [
								{
									xtype : 'datefield',
									name : 'CHANGETIME',
									format : 'd-m-Y H:i:s',
									altFormats : 'Ymd',
									fieldLabel : 'Ngày',
									value : new Date(),
									submitFormat : 'Y-m-d H:i:s',
									emptyText : 'Ngày',
									editable : false
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
                                    labelWidth: 100
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
                                    labelWidth: 100
                                },
                                {
                                    xtype: 'numericfield',
                                    fieldLabel: 'Tiền trả khách',
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
                                    labelWidth: 100
                                }

						]
					}, {
						xtype : 'container',
						layout : {
							align : 'center',
							type : 'hbox'
						},
						defaults : {
							//cls : 'inline-button'
						},
						items : [ {
							xtype : 'button',
							iconCls : 'icon-delete',
							action : 'cancel',
							margin: '0 5 0 0',
							height: 25,
							width: 100,
							text : 'Hủy trả'
						},{
							xtype : 'button',
							iconCls : 'icon-true',
							name : 'submit',
							height: 25,
							text : 'Lưu & In hóa đơn',
							flex : 1
						} ]
					} ]
		});

		me.callParent(arguments);
	}
});