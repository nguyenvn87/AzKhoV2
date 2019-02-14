Ext.define('ECNT.view.form.formHinhThucTT', {
    extend: 'Ext.container.Container',
    alias: 'widget.hinhthuctt',
   /* requires: [
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],*/
    mainParent: null,
    isAdd: true,
    height: 34,
    layout: 'hbox',
    defaultValue: 0,
    defaultMethod: null,
    store: Ext.create('ECNT.store.bankAccountStore',{}),
    initComponent: function() {
        var me = this;
        me.store.load();
        Ext.applyIf(me, {
            items: [
                {
                    xtype : 'combo',
					store : me.store,
					flex: 1,
					emptyText : 'Chọn tài khoản nhận tiền',
					height: 23,
					name: 'account',
					displayField : 'BANK_NM',
					valueField : 'ID_BANK',
					value: me.defaultMethod,
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
					fieldLabel : "",
					height: 25,
					width: 150,
					name: 'value',
					value: me.defaultValue,
					useThousandSeparator: true,
					decimalPrecision: 0,
					hideTrigger:true,
					alwaysDisplayDecimals: false,
					allowNegative: false,
					currencySymbol:'',
					thousandSeparator: ',',
					cls: 'input-total-money-cls'
                },
                {
                    xtype: 'button',
                    width: 25,
                    hidden: me.isAdd,
                    height: 25,
                    cls: 'recyle-bin',
                    handler: function(field){
                    	items = field.up('hinhthuctt');
                    	var itemid = items.getId();
                    	var parent = Ext.ComponentQuery.query(me.mainParent)[0];
                    	me.removeThisItem(parent, itemid);
                    }
                },
                {
                    xtype: 'button',
                    width: 25,
                    hidden: !me.isAdd,
                    height: 25,
                    cls: 'addmore',
                    handler: function(field){
                    	items = field.up('hinhthuctt');
                    	var parent = Ext.ComponentQuery.query(me.mainParent)[0];
                    	item = Ext.create('ECNT.view.form.formHinhThucTT',{defaultValue: 0, mainParent: '#hinhthucttContainerId', isAdd: false})
                    	parent.add(item);
                    	
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
    removeThisItem: function(parent, itemid){
    	var record = parent.items.items;
    	console.log('record',record);
    	for (var j = 0; j < record.length; j++) {
		    var item = record[j];
		    if(item.getId() == itemid){
		    	parent.remove(item);
		    }
		}
    }

});