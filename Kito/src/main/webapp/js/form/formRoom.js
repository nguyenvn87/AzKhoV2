/*
 * @Author: Nguyennv
 * Date:  20/06/2014
 * Description: Quản lý đơn sẽ công khai trong danh sách đơn đã tiếp nhận (Chọn công khai)
 * 
 * */

Ext.define('LAFORM.formRoom', {
	extend : 'Ext.form.Panel',
	id : 'main_contentsId',
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'container',
				layout : {
					align : 'stretch',
					pack : 'end',
					type : 'vbox'
				},
				defaults : {
					cls : 'button'
				},
				items : [

				{
					xtype : 'button',
					text : 'Lưu',
					listeners : {
						// click: this.onBtn_submit,
						scope : this
					}
				}, {
					xtype : 'button',
					text : 'Hoàn thành',
					itemId : 'complete',
					listeners : {
						// click: this.onComplete,
						scope : this
					}
				}

				]
			} ]
		});

		me.callParent(arguments);
	}
});