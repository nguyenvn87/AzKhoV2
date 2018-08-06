

Ext.define('LAFORM.testForm', {
    extend: 'Ext.panel.Panel',
    cls: '',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'jdvn-main',
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: '',
                            items: [
                                {
                                    xtype: 'container',

                                    cls: 'jdvn-main-body',
                                    items: [
                                           
	                                    ]
                                },
                                
                                {
                                    xtype: 'container',
                                    cls: 'jdvn-main-bottom-bar',
                                    layout: {
                                        align: 'middle',
                                        pack: 'end',
                                        type: 'hbox'
                                    },
                                    defaults:{
                                    	cls: 'button'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',                                            
                                            text: 'Lưu',
                                            itemId: 'btnSave',
                                            listeners: {
                                        		//click: this.onSaveCommet
                                        	}
                                        },
                                        {
                                        	xtype: 'button',
                                        	text: '2343',
                                        	itemId: 'complete',
                                        	listeners: {
                                        		//click: this.onComplete,
                                        		scope: this
                                        	}
                                        },{
                                        	xtype: 'button',
                                        	text: 'Hủy',
                                        	itemId: 'cancel',
                                        	listeners: {
                                        		//click: this.cancel,
                                        		scope: this
                                        	}
                                        },{
                                        	xtype: 'button',
                                        	text: '2314234',
                                        	itemId: 'w_list',
                                        	listeners: {
                                        		//click: this.w_list,
                                        		scope: this
                                        	}
                                        }
                                    ]
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