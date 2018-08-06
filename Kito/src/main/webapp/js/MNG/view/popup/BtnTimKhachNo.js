/*
 * File: app/view/Khanghangnotien.js
 *
 * This file was generated by Sencha Architect version 4.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MNG.view.popup.BtnTimKhachNo', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View'
    ],

    height: 647,
    bodyPadding: 10,
    title: 'Danh sách khách hàng nợ',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    height: 64,
                    title: 'Tìm theo tên / SĐT',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 523,
                    title: 'Danh sách khách hàng',
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 444,
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Tên'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Điện thoại'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Địa chỉ'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'Nợ (đ)'
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