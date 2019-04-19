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

    title: 'Cập nhật danh mục hàng bằng excel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'fieldset',
                            border: '1 0 1 0',
                            flex: 1,
                            title: 'Lưu ý khi nhập bằng file excel',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    disabled: true,
                                    name : 'type',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'Trùng mã sẽ báo lỗi và dừng lại'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'Chỉ cập nhật mã hàng mới'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'Không cập nhật tồn kho'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'Không cập nhật tồn kho'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'File không nặng quá 5M'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'group2',
                                            boxLabel: 'Mẫu file excel tải về và up lên phải cùng 1 định dạng'
                                        }
                                    ]
                                }
                            ]
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
             url: contextPath+'/importfromexcel.json',
             headers: {'Content-Type':'multipart/form-data; charset=UTF-8'},
             success: function (form, action) {
                     Ext.Msg.alert('Cập nhật thành công', action.result.message);
                 },
             failure: function (form, action) {
                     Ext.Msg.alert('Lỗi', action.result ? action.result.message : 'No response');
             }
         })
    }

});