/**
 * @author Nguyen
 * 
 * */

// 1. INNIT

// 2. Main
Ext.define('MNG.view.adminView', {
    extend: 'Ext.form.Panel',
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
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            minHeight: 400,
                            cls: 'jdvn-main',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            items: [
                                    {
										xtype: 'container',
										padding : '0 15 0 15',
										cls: 'jdvn-main-body',
										layout: {
										    align: 'stretch',
										    type: 'vbox'
										},
										items: [
										        //Main 1
												Ext.create('BS.infoUserContainer', {
													title: '1. Người dùng',
													titleContent: 'Quản trị người dùng'}),
												Ext.create('BS.infoMenuContainer', {
													title: '2. Menu',
													titleContent: 'Thiết lập đơn giá'}),
												Ext.create('BS.infoRoomContainer', {
													title: '3. Quản trị phòng',
													titleContent: 'Quản trị, cập nhật phòng hát'}),
												Ext.create('BS.infoRightContainer', {
													title: '4. Phân quyền',
													titleContent: 'Cấp quyền cho người sử dụng'}),
												Ext.create('BS.infoCodeContainer', {
													title: '5. Danh mục mã code',
													titleContent: 'Cập nhật danh mục'}),
												Ext.create('BS.infoSrvcContainer', {
													title: '6. Hàng hóa, dịch vụ',
													titleContent: 'Danh sách hàng hóa, dịch vụ'}),
										       ]
								     }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'jdvn-main-bottom-bar',
                            minHeight: 30,
                            layout: {
                                align: 'stretch',
                                pack: 'end',
                                type: 'hbox'
                            },
                            defaults : {
                            	height : 30
                            },
                            items: [
							]
                        }
                    ]
                }
            ],
            listeners:{
            	
            }
        });
        me.callParent(arguments);
    }
  });