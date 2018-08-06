
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
            items: [
                {
                    xtype: 'container',
                    cls: 'jdvn-main',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    items: [
						{
							xtype: 'container',
						    text: 'Tìm kiếm GCN',
						    cls: 'jdvn-sub-body',
						    items:[
									{
									    xtype: 'button',
									    cls: 'input-field',
									    text: 'Trong tháng',
									    itemId: 'btnItemMonth'
									},
									{
									    xtype: 'button',
									    cls: 'input-field',
									    text: 'Trong năm',
									    itemId: 'btnItemYear'
									},{
									    xtype: 'button',
									    cls: 'input-field',
									    text: 'Khác',
									    itemId: 'btnItemOther'
									},]
						           
						},   
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