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
	// cls: 'x-box-payment',
	// padding : '2 2 2 2',
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [
					{
						xtype : 'fieldset',
						columnWidth : 0.5,
						collapsible : true,
						collapsed: false,
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
									fieldLabel : 'Ngày đặt',
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
									value : 0,
									name : 'TOTAL_MONEY',
									cls : 'input-total-money-cls',
									fieldLabel : "Tổng tiền",
									readOnly : true
								},
								{
									xtype : 'numberfield',
									cls : 'input-needpay-money-cls',
									fieldLabel : "Giảm giá",
									hidden: true,
									value : 0,
									listeners : {
										change : function(object) {
											Ext.getCmp("NEEDPAYED").setValue(
													Ext.getCmp("TOTAL").value
															- object.value);
										}
									}
								}, {
									xtype : 'numericfield',
									anchor : '100%',
									useThousandSeparator: true,
									decimalPrecision: 0,
									hideTrigger:true,
									alwaysDisplayDecimals: false,
									allowNegative: false,
									currencySymbol:'',
									thousandSeparator: ',',
									name : 'NEEDPAYED',
									hidden: true,
									fieldLabel : "Tiền cần trả",
									cls : 'input-pay-money-cls',
									readOnly : true,
									value : 0
								},{
									xtype : 'checkbox',
									fieldLabel : 'Ghi nợ',
									name : 'IS_DEBIT',
									checked : true,
									inputValue : '1'
								}

						]
					}, {
						xtype : 'container',
						layout : {
							align : 'center',
							type : 'hbox'
						},
						defaults : {
							cls : 'inline-button',
							padding : '10 10 10 10',
						},
						padding : '5 5 5 5',
						items : [ {
							xtype : 'button',
							iconCls : 'icon-true',
							name : 'noprint',
							width : 80,
							text : 'Lưu'
						},{
							xtype : 'button',
							iconCls : 'icon-true',
							name : 'submit',
							text : 'Lưu & In hóa đơn',
							flex : 1
						} ]
					} ]
		});

		me.callParent(arguments);
	}
});