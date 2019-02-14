var phieuChiStore = Ext.create('ECNT.store.phieuChiStore',{});
var LoaiphieuChiStore = Ext.create('MNG.store.cdUserStore',{});
LoaiphieuChiStore.getProxy().extraParams = {
						GROUP_CD: GroupCode.CHI
					};
LoaiphieuChiStore.load();

Ext.define('ECNT.view.phieuChiView', {
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

    //height: 643,
    bodyPadding: 10,
    itemId: 'popupPhieuChiMain',
    //title: 'Phiếu chi',

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
                        align: 'middle',
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
                                    name: 'STARTDATE',
                                    submitFormat : 'Y-m-d H:i:s',
                                    format : 'd/m/Y',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'datefield',
                                    flex: 1,
                                    fieldLabel: 'Đến ngày',
                                    name: 'ENDDATE',
                                    submitFormat : 'Y-m-d H:i:s',
                                    format : 'd/m/Y',
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
									store: LoaiphieuChiStore,
									emptyText: 'Chọn loại phiếu chi',
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
                    height: 530,
                    itemId: 'mainGridIdChi',
                    store: phieuChiStore,
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'HACHTOAN_DATE',
                            format:'d/m/Y',
                            text: 'Ngày chi'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'CHUNGTU_CODE',
                            text: 'Mã phiếu',
                            width: 100
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'VALUE',
                            text: 'Số tiền',
                            format:'0',
                            align: 'right',
                            width: 120,
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
                            dataIndex: 'RECEPTER',
                            text: 'Người nhận',
                            width: 150
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'CHI_NAME',
                            text: 'Loại chi',
                            width: 150
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'DESCRIPTION',
                            text: 'Diễn giải',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'PAY_METHOD',
                            text: 'Phương thức TT',
                            width: 150
                        },
                        
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'CHANGE_DATE',
                            text: 'Ngày cập nhật'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
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
										xtype : 'pagingtoolbar',
										dock : 'bottom',
										store : phieuChiStore,
										displayInfo : true
								} ,
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'addnewBtn',
                                    iconCls: 'icon-addnew',
                                    text: 'Thêm phiếu chi'
                                }
                            ]
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
								fieldLabel : 'Tổng chi',
								text : 'Tổng chi: ',
								cls : 'sumary-label'
							},
							{
								xtype : 'label',
								fieldLabel : 'Tổng chi',
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