/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnImportFileExcel', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.File',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    height: 400,
    width: 400,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 350,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'fieldset',
                            border: '1 0 0 0',
                            height: 72,
                            title: 'Cập nhật tồn kho ?',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'group1',
                                            boxLabel: 'Có (cập nhật tất cả)'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group1',
                                            boxLabel: 'Không (chỉ cập nhật thông tin hàng hóa)'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            border: '1 0 1 0',
                            height: 87,
                            title: 'Xử lý trùng mã hàng ?',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    //name : 'type',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            inputValue : '0',
                                            boxLabel: 'Báo lỗi và dừng lại'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            inputValue : '0',
                                            boxLabel: 'Thay thế tên hàng cũ bằng tên hàng mới'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            cls: 'cls-note',
                            height: 66
                        },
                        {
                            xtype: 'filefield',
                            anchor: '100%',
                            fieldLabel: '',
                            name: 'fileUpload',
                            buttonText: 'Chọn file'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    width: 130,
                                    text: 'OK',
                                    handler: me.submitFormData
                                }
                            ]
                        }
                    ]
                }
            ],
           
        });

        me.callParent(arguments);
    },
    submitFormData: function(field){
    	var form = field.up('form');
    	fileTmp = form.down('[name=fileUpload]');
    	if(fileTmp.lastValue.endsWith('.xls')==false){ 
    		supportEvent.showMessageWarning('Chỉ chấp nhận file Excel (*.xls)');
    	}
    	else
    	form.getForm().submit({
    		 method: 'POST',
    		 waitMsg: 'Uploading your file...',
             url: contextPath+'/importfromexcel',
             headers: {'Content-Type':'multipart/form-data; charset=UTF-8'},
         })
    }

});