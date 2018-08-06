/**
 * @author Nguyen
 * @description Add/update Forest popup
 * @date 2014/11/14
 */

Ext.define('MNG.view.popup.BtnAddForest', {
	extend : 'Ext.window.Window',
	minHeight : 400,
	width : 700,
	title : 'Cập nhật thông tin rừng',
	maxHeight : 600,
	closeAction : 'hide',
	resizable : false,
	isUseShare : true,
	config : {
		idOfGrid : ""
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'container',
				id : 'btnForestContainerId',
				layout : {
					align : 'stretch',
					type : 'vbox'
				},
				items : [ {
					xtype : 'container',
					// cls : 'jdvn-main',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [ {
						xtype : 'container',
						// cls : 'jdvn-sub-body detailData',
						defaults : {
							//cls : 'row'
						},
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						items : [ {
							xtype : 'hidden',
							name : 'FORST_ID',
							itemId : 'FORST_ID'
						}, {
							xtype : 'hidden',
							name : 'SPTLUNIT_ID',
							itemId : 'SPTLUNIT_ID'
						}, {
							xtype : 'container',
							layout : {
								align : 'middle',
								type : 'hbox'
							},
							items : [ {
								xtype : 'container',
								flex : 4,
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items : [ {
									xtype : 'simplecombobox',
									flex : 1,
									itemId : 'FORST_CATAG_TYPE',
									name : 'FORST_CATAG_TYPE',
									fieldLabel : 'LA_F_065',
									emptyText : 'Lựa chọn loại rừng',
									datatype : 'combo',
									scrid : 'G3350',
									autoload : false
								} ]
							} ]
						}, {
							xtype : 'container',
							layout : {
								align : 'middle',
								type : 'hbox'
							},
							items : [ {
								xtype : 'container',
								flex : 4,
								layout : {
									align : 'stretch',
									type : 'hbox'
								},
								items : [ {
									xtype : 'simplecombobox',
									flex : 1,
									itemId : 'FORST_SOURC_TYPE',
									name : 'FORST_SOURC_TYPE',
									fieldLabel : 'LA_F_067',
									emptyText : 'Lựa chọn nguồn gốc rừng',
									datatype : 'combo',
									scrid : 'G3320',
									autoload : false
								} ]
							} ]
						}, {
							xtype : 'container',
							layout : {
								align : 'middle',
								type : 'hbox'
							},
							defaults : {
								cls : 'input-field',
								flex : 1
							},
							items : [ {
								xtype : 'textfield',
								itemId : 'FORST_AR',
								name : 'FORST_AR',
								fieldLabel : 'LA_F_068',
								regex : /^-?\d*\.?\d*$/,
								emptyText : 'Nhập diện tích rừng'
							}, {
								xtype : 'datefield',
								itemId : 'FNISHDT',
								name : 'FNISHDT',
								format : 'd-m-Y',
								altFormats : 'Ymd',
								fieldLabel : 'Thời hạn sở hữu',
								//labelWidth : 140,
								emptyText : 'Nhập thời hạn sở hữu'
							}, {
								xtype : 'combobox',
								itemId : 'PARTY_ID',
								name : 'PARTY_ID',
								displayField : 'NM',
								valueField : 'PARTY_ID',
								//labelWidth : 140,
								fieldLabel : 'LA_F_030',
								//labelWidth : 130
							} ]
						}, {
							xtype : 'combo',
							itemId : 'ETC',
							name : 'ETC',
							autoLoad : false,
							mode : 'local',
							editable : true,
							fieldLabel : 'Hình thức sở hữu',

							displayField : 'name',
						} ]
					} ]
				} ]
			}

			],
			buttons : [ {
				xtype : 'button',
				cls : 'button',
				action : 'saveForest',
				text : 'Lưu',
				itemId : 'BtnSaveForest'
			}, {
				xtype : 'button',
				cls : 'button',
				height : 25,
				text : 'Đóng',
				listeners : {
					click : function() {
						this.up('.window').hide();
					}
				}
			} ]
		});
		this.callParent(arguments);
		// me.callParent(arguments);
	}
});
