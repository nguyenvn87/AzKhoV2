var phieuThuStore = Ext.create('ECNT.store.phieuThuStore',{});
var LoaiphieuThuStore = Ext.create('MNG.store.cdUserStore',{});
LoaiphieuThuStore.getProxy().extraParams = {
						GROUP_CD: GroupCode.THU,
					};
LoaiphieuThuStore.load();
Ext.define('ECNT.view.phieuThuView', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar'
    ],
    itemId: 'popupPhieuThuMain',
    bodyPadding: 10,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    height: 80,
                    title: 'Bộ lọc',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        padding: '0 0 5 5'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 300,
                            layout: {
                                type: 'vbox',
                                align: 'middle',
                                padding: '0 10 0 0'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    margins: '0 10 0 0',
                                    fieldLabel: 'Từ ngày',
                                    submitFormat : 'Y-m-d H:i:s',
                                    format : 'd/m/Y',
                                    name: 'STARTDATE',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    fieldLabel: 'Đến ngày',
                                    submitFormat : 'Y-m-d H:i:s',
                                    format : 'd/m/Y',
                                    name: 'ENDDATE',
                                    labelWidth: 60
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            width: 469,
                            layout: {
                                type: 'vbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    emptyText: 'Mã phiếu, tham chiếu'
                                },
                                {
                                    xtype : 'combo',
									name:'TYPE',
									store: LoaiphieuThuStore,
									emptyText: 'Chọn loại phiếu thu',
									displayField: 'CD_NM',
									valueField: 'CD',
									value: null 
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'mainGridId',
                    height: 550,
                    store: phieuThuStore,
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'RECEIPT_DATE',
                            format:'d/m/Y',
                            text: 'Ngày thu'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'BILL_CD',
                            hidden: true,
                            text: 'Mã phiếu'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'CHUNGTU_CODE',
                            text: 'Số phiếu',
                            width: 100
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'VALUE',
                            align: 'right',
                            width: 100,
                            text: 'Số tiền',
                            renderer : function(value, p, r) {
								data = r.data['VALUE'];
								if (data != ''){
								var value = Ext.util.Format.number(data, '0');
									data = formatSupporter.formatToMoney(value);
								}
								return '<span style="color: red">'+data+'</span>';
							}
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'BANK_NM',
                            text: 'Tài khoản nhận',
                            width: 120
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'NGUOINOP',
                            text: 'Người nộp',
                            width: 180
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'THU_NAME',
                            text: 'Loại thu'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'RECEPT_NM',
                            text: 'Người nhận'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'DESCRIPTION',
                            text: 'Diễn giải nội dung thu',
                            flex: 1
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'CHANGE_DATE',
                            width: 110,
                            text: 'Ngày cập nhật'
                        }
                    ],
                    dockedItems : [ {
										xtype : 'pagingtoolbar',
										dock : 'bottom',
										store : phieuThuStore,
										displayInfo : true
								} ],
					tbar : [
					        {
                                    xtype: 'button',
                                    itemId: 'addnewBtn',
                                    iconCls: 'icon-addnew',
                                    text: 'Thêm phiếu thu'
                                }
					        ],
                    bbar: [
                                {
                                    xtype: 'button',
                                    iconCls : 'icon-pdf',
                                    text: 'PDF'
                                },
                                {
                                    xtype: 'button',
                                    iconCls : 'icon-excel',
                                    text: 'Excel'
                                }
                        
                    ]
                },
                {
					xtype : 'container',
					layout : {
						align : 'stretch',
						type : 'hbox'
					},
					items : [
							{
								xtype : 'label',
								fieldLabel : 'Tổng thu',
								text : 'Tổng thu: ',
								cls : 'sumary-label'
							},
							{
								xtype : 'label',
								fieldLabel : 'Tổng thu',
								itemId : 'statis-total-id',
								text : '0.0',
								cls : 'sumary-field'
							}
							]
				} 
            ]
        });

        me.callParent(arguments);
    }

});