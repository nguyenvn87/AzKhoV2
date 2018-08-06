Ext.define('MyApp.model.MyModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'stt',
            type: 'string'
        },
        {
            name: 'phanLoai',
            type: 'string'
        },
        {
            name: 'danhsach',
            type: 'string'
        },
        {
            name: 'daNop',
            type: 'boolean'
        },
        {
            name: 'batBuoc',
            type: 'boolean'
        }
    ]
});


Ext.define('BIZ.utilities.docAttachedList', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MyModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.MyModel',
            storeId: 'MyArrayStore',
            data: [
                [
                    1,
                    'Đơn đăng ký mới',
                    'Đơn đăng ký mới đất đai',
                    true,
                    true
                ],
                [
                    2,
                    'GCNQSDD tạm thời',
                    'Đơn đăng ký mới đất đai',
                    false,
                    false
                ],
                [
                    3,
                    'Hồ sơ đăng ký mới – giấy tờ chứng nhận của UBND',
                    'Giấy tờ chứng nhận của UBND',
                    true,
                    true
                ],
                [
                    4,
                    'Hồ sơ đăng ký mới – Hồ sơ mua bán',
                    'Giấy tờ về sở hữu nhà ở được thực hiện mua bán nhà ở',
                    true,
                    false
                ],
                [
                    5,
                    'Giấy tờ về quyền sử dụng đất',
                    'Giấy tờ liên quan đến quyền sử dụng đất trước ngày 15 tháng 10 năm 1993',
                    false,
                    false
                ],
                [
                    6,
                    'Giấy tờ chuyển nhượng nhà ở và tài sản khác',
                    'Giấy tờ liên quan đến chuyển nhượng nhà ở và tài sản gắn liền với đất',
                    false,
                    false
                ],
                [
                    7,
                    'Giấy tờ về quyền sử dụng đất',
                    'Giấy tờ về quyền sử dụng đất được chính quyền cấp trước đó',
                    false,
                    false
                ],
                [
                    8,
                    'Chứng từ đã nộp',
                    'Yêu cầu trong trường hợp phải thực hiện nghĩa vụ tài chính',
                    false,
                    false
                ]
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'array'
                }
            }
        }, cfg)]);
    }
});


