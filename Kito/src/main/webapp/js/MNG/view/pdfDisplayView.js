
var useStore = Ext.create('MNG.store.userStore', {});
useStore.load();
Ext.define('MNG.view.pdfDisplayView', {
    extend: 'Ext.form.Panel',
    requires: [
		'Ext.ux.pdf.panel.PDF'	
	],
	id:'main_contentsId',
	config: {
		CADASTRE_ID: ""
	},
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	dockedItems: [
                {
                	xtype: 'toolbar',
                    dock: 'top',
                    height: 85,
                    width: 729,
                    layout: {
                        type: 'hbox',
                        padding: '0 10 0 10'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 77,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margins: '0 5 0 0',
                                    height: 68,
                                    padding: '5 0 0 10',
                                    width: 237,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dateFrom',
                                            width: 208,
                                            submitFormat: 'Y-m-d',
                                            format : 'd-m-Y',
                                            fieldLabel: 'Từ ngày',
                                            labelWidth: 60
                                        },
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dateTo',
                                            format : 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            width: 208,
                                            fieldLabel: 'đến ngày',
                                            labelWidth: 60
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margins: '0 5 0 0',
                                    height: 67,
                                    width: 105,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            margins: '0 0 8 0',
                                            itemId: 'btnItemToday',
                                            width: 77,
                                            text: 'Hôm nay'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnItemMonth',
                                            width: 78,
                                            text: 'Tháng này'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    width: 230,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype : 'combo',
											itemId : 'FULLNAME',
											name : 'FULLNAME',
											emptyText : 'Chọn nhân viên',
											store : useStore,
											displayField : 'FULLNAME',
											valueField : 'USERNAME',
											value : '',
											autoload : false,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    //cls: 'jdvn-main',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            //cls: 'jdvn-main-body',
                            id: 'reportPanelId',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onSearchGCN:function(){
    	
    },
    onSave:function(){
    },
    onRevoke:function(){
    },
    onCancel:function(){
    },
    searchByTimeOption:function( button, e, eOpts){
    	
    	
    }
});