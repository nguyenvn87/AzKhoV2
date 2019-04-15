/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnInMaVach', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    height: 480,
    width: 700,
    SRVC_ID: null,
    title: 'In mã vạch',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Cuộn giấy in 2 nhãn',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 177,
                                                    src: contextPath + '/images/icon/giayinbarcode72x22.png'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '- Mẫu giấy cuộn 2 nhãn'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '- Khổ giấy: 72x22 mm'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'icon-pdf',
                                                            margin: 5,
                                                            text: 'PDF',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"pdf"+"&list=";
                                                            	utilForm.btn_template_popup(location,"Mã vạch",850,800,true);
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls : 'icon-word',
                                                            margin: 5,
                                                            text: 'Word',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"doc"+"&list=";
                                                            	let myController = MANAGER.app.getController('MNG.controller.srvcController');
                                                            	myController.downloadFile(location);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Cuộn giấy in 2 nhãn',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 177,
                                                    src: contextPath + '/images/icon/giayinbarcode72x22.png'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '- Mẫu giấy cuộn 2 nhãn'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '- Khổ giấy: 74x22 mm'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            margin: 5,
                                                            iconCls: 'icon-pdf',
                                                            text: 'PDF',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"pdf"+"&list=2";
                                                            	utilForm.btn_template_popup(location,"Mã vạch",850,800,true);
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: 5,
                                                            iconCls : 'icon-word',
                                                            text: 'Word',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"doc"+"&list=2";
                                                            	let myController = MANAGER.app.getController('MNG.controller.srvcController');
                                                            	myController.downloadFile(location);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                    	{
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Cuộn giấy in 3 nhãn',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 177,
                                                    src: contextPath + '/images/icon/giayinbarcode104x22.JPG'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '- Mẫu giấy cuộn 3 nhãn'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '- Khổ giấy: 104x22 mm'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'icon-pdf',
                                                            margin: 5,
                                                            text: 'PDF',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"pdf"+"&list=3";
                                                            	utilForm.btn_template_popup(location,"Mã vạch",850,800,true);
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls : 'icon-word',
                                                            margin: 5,
                                                            text: 'Word',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"doc"+"&list=3";
                                                            	let myController = MANAGER.app.getController('MNG.controller.srvcController');
                                                            	myController.downloadFile(location);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Cuộn giấy in A4',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 177,
                                                    src: contextPath + '/images/icon/giayinbarcodeA4.jpg'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '- Mẫu giấy cuộn 2 nhãn'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '- Khổ giấy: A4'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'column',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            iconCls: 'icon-pdf',
                                                            margin: 5,
                                                            text: 'PDF',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"pdf"+"&list=4";
                                                            	utilForm.btn_template_popup(location,"Mã vạch",850,800,true);
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            iconCls : 'icon-word',
                                                            margin: 5,
                                                            text: 'Word',
                                                            handler: function(){
                                                            	var location = contextPath + "/report/barcode.do?SRVC_ID="+me.SRVC_ID+"&type="+"doc"+"&list=4";
                                                            	let myController = MANAGER.app.getController('MNG.controller.srvcController');
                                                            	myController.downloadFile(location);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
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