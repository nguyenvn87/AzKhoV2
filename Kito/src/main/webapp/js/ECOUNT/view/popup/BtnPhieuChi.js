/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2018/12/01
 */	
var loaiPhieuThuComboStore = Ext.create('MNG.store.cdUserStore',{});
loaiPhieuThuComboStore.getProxy().extraParams = {
						GROUP_CD: GroupCode.CHI,
					};
loaiPhieuThuComboStore.load();

Ext.define('ECNT.view.popup.BtnPhieuChi', {
	extend : 'Ext.window.Window',
	requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.form.field.Date',
        'Ext.custom.common.NumberField'
    ],
    y: 10,
    width: 650,
    itemId: 'popupPhieuChi',
    resizable: false,
    title: 'Cập nhật phiếu chi',

    initComponent: function() {
        var me = this;

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
                            action: 'save',
                            text: 'OK'
                        },
                        {
                            xtype: 'button',
                            text: 'Đóng',
                            handler:  function(){
                            		me.close();
                            	}
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    bodyPadding: '10 0 0 0',
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            height: 171,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1.6,
                                    margins: '0 10 0 5',
                                    width: 426,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '10 0 0 0'
                                    },
                                    fieldDefaults: {
								        labelAlign: 'right',
								        msgTarget: 'side'
								    },
                                    items: [
                                           {
                                            xtype: 'container',
                                            layout: {
					                             type: 'hbox',
					                             align: 'center',
                                            },
                                            padding: '0 0 5 0',
				                            items:[
				                                  {
				                                    xtype : 'combo',
				                                    name:'CHI_TYPE',
				                                    flex: 1,
													fieldLabel : 'Loại chi (*)',
													emptyText: 'Chọn loại chi',
													store: loaiPhieuThuComboStore,
													displayField: 'CD_NM',
													valueField: 'CD',
													labelWidth: 85,
													value: null 
				                                   },{
				                                    xtype: 'button',
				                                    action: 'create',
										            width: 25,
										            height: 25,
										            tooltip : 'Thêm nhóm mới',
										            cls: 'addmore'
				                                }
				                             ]
				                         },
                                        {
                                            xtype: 'textfield',
                                            labelWidth: 85,
                                            name: 'RECEPTER',
                                            fieldLabel: 'Người nhận'
                                        },
                                        {
                                            labelWidth: 85,
                                            fieldLabel: 'Phương thức',
                                            name: 'PAY_METHOD',
                                            xtype : 'simplecombobox',
											flex : 1,
											value: PaymentTypeGroup.CASH,
											datatype: 'combo',
											scrid: 'PAYMT',
											initFlag: false,
											autoload: false,
											listeners:{
												select:function(field){
													var value_ = field.getValue();
													var mainCpmt = field.up('form').down('[name=BANK_ID]');
													if(value_ == PaymentTypeGroup.CASH){
														mainCpmt.setReadOnly(true);
														mainCpmt.setValue(null);
													}else{
														mainCpmt.setReadOnly(false);
													}
												}
											}
                                        },
                                        {
                                            xtype : 'combo',
                                            labelWidth: 85,
                                            readOnly: true,
											fieldLabel: 'Tài khoản chi',
											store : Ext.create('ECNT.store.bankAccountStore',{}),
											emptyText : 'Chọn tài khoản chi tiền',
											name: 'BANK_ID',
											displayField : 'BANK_NM',
											valueField : 'ID_BANK',
											anchor : '100%',
											listConfig : {
											loadingText : 'Searching...',
											emptyText : 'Không có bản ghi nào phù hợp.',
											getInnerTpl : function() {
												return '<a class="search-item">' 
												           + 'Số TK: {ID_BANK}<br/>'
											           + '<h3>{BANK_NM}</h3>' 
											           + '</a>';
													}
											}
                                        },{
                                            labelWidth: 85,
                                            fieldLabel: 'Số tiền chi',
                                            name: 'VALUE',
                                            xtype : 'numericfield',
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
                                    xtype: 'fieldset',
                                    flex: 1,
                                    width: 266,
                                    margins: '0 5 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '10 0 0 0'
                                    },
                                    fieldDefaults: {
								        labelAlign: 'right',
								        msgTarget: 'side'
								    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Ngày chi',
                                            labelWidth: 80,
                                            submitFormat : 'Y-m-d H:i:s',
                                            format : 'd/m/Y H:i:s',
                                            name: 'HACHTOAN_DATE',
                                            value : new Date()
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            labelWidth: 80,
                                            fieldLabel: 'Số phiếu thu',
                                            name: 'BILL_CD'
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            labelWidth: 80,
                                            fieldLabel: 'Số phiếu thu',
                                            name: 'CHI_NAME'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Số chứng từ',
                                            labelWidth: 80,
                                            name: 'CHUNGTU_CODE'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            name: 'RECEPTER_ADDR',
                                            labelWidth: 80,
                                            height: 55,
                                            fieldLabel: 'Địa chỉ'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 60,
                            layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '0 5 5 15'
                                    },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    name: 'DESCRIPTION',
                                    labelWidth: 85,
                                    labelAlign: 'right',
                                    height: 55,
                                    fieldLabel: 'Lý do chi'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 50,
                            hidden: true,
                            padding: '10 10 5 15',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Trạng thái phiếu'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});