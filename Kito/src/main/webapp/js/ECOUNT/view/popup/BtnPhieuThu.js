/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2018/12/01
 */

var loaiPhieuThuComboStore = Ext.create('MNG.store.cdUserStore',{});
loaiPhieuThuComboStore.getProxy().extraParams = {
						GROUP_CD: GroupCode.THU,
					};
loaiPhieuThuComboStore.load();

Ext.define('ECNT.view.popup.BtnPhieuThu', {
	extend : 'Ext.window.Window',
	requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.custom.common.NumberField'
    ],
    y: 10,
    width: 650,
    itemId: 'popupPhieuThu',
    resizable: true,
    billCD: null,
    title: 'Cập nhật phiếu thu',

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
                            action: 'exit',
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
                    flex: 1,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            border: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: '5 5 0 0'
                            },
                            
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margins: '0 10 0 5',
                                    padding: '10 5 5 5',
                                    width: 380,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
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
				                                    name:'THU_TYPE',
				                                    flex: 1,
													fieldLabel : 'Loại thu (*)',
													emptyText: 'Chọn loại phiếu thu',
													store: loaiPhieuThuComboStore,
													displayField: 'CD_NM',
													valueField: 'CD',
													labelWidth: 85,
													value: null 
				                                   },{
				                                    xtype: 'button',
										            width: 25,
										            height: 25,
										            action: 'create',
										            tooltip : 'Thêm nhóm mới',
										            cls: 'addmore'
				                                }
				                             ]
				                           },
                                        {
                                            xtype: 'textfield',
                                            name: 'CUSTOMMER',
                                            labelWidth: 85,
                                            fieldLabel: 'Khách'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'NGUOINOP',
                                            labelWidth: 85,
                                            fieldLabel: 'Người nộp'
                                        },
                                        {
                                            labelWidth: 85,
                                            fieldLabel: 'Phương thức',
                                            name: 'PAY_METHOD',
                                            xtype : 'simplecombobox',
											flex : 1,
											datatype: 'combo',
											value: PaymentTypeGroup.CASH,
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
											fieldLabel: 'Tài khoản',
											name: 'BANK_ID',
											store : Ext.create('ECNT.store.bankAccountStore',{}),
											emptyText : 'Chọn tài khoản nhận tiền',
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
										   value: 0,
										   thousandSeparator: ',',
										   fieldLabel: 'Số tiền',
										   labelWidth: 85,
										   name: 'VALUE',
										   cls : 'input-total-money-cls'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    padding: '10 5 0 5',
                                    width: 235,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    fieldDefaults: {
								        labelAlign: 'right',
								        msgTarget: 'side'
								    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'RECEIPT_DATE',
                                            name: 'RECEIPT_DATE',
                                            labelWidth: 80,
                                            submitFormat : 'Y-m-d H:i:s',
                                            format : 'd/m/Y H:i:s',
                                            value : new Date(),
                                            fieldLabel: 'Ngày thu'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'CHUNGTU_CODE',
                                            name: 'CHUNGTU_CODE',
                                            labelWidth: 80,
                                            fieldLabel: 'Số phiếu thu'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'BOOK_NO',
                                            labelWidth: 80,
                                            name: 'BOOK_NO',
                                            fieldLabel: 'Quyển số'
                                        },
                                        {
                                            xtype: 'datefield',
                                            itemId: 'EXPIRED_DATE',
                                            labelWidth: 80,
                                            name: 'EXPIRED_DATE',
                                            fieldLabel: 'Hạn thu'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'RECEPT_NM',
                                            labelWidth: 80,
                                            name: 'RECEPT_NM',
                                            fieldLabel: 'Người nhận'
                                        },{
                                            xtype: 'hiddenfield',
                                            flex: 1,
                                            fieldLabel: 'Label',
                                            name: 'BILL_CD'
                                        },{
                                            xtype: 'hiddenfield',
                                            flex: 1,
                                            fieldLabel: 'Label',
                                            name: 'THU_NAME'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            border: '0 0 0 0',
                            height: 60,
                            padding: '0 5 0 10',
                            layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    itemId: 'DESCRIPTION',
                                    name: 'DESCRIPTION',
                                    labelAlign: 'right',
                                    labelWidth: 85,
                                    height: 60,
                                    fieldLabel: 'Lý do thu'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 50,
                            hidden: true,
                            padding: '10 10 5 15',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Trạng thái đơn'
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