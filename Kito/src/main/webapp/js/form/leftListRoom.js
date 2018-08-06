/*
 * @Author: Nguyennv
 * Date:  20/06/2014
 * File name: (slide 25)
 * Description: Quản lý đơn sẽ công khai trong danh sách đơn đã tiếp nhận (Chọn công khai)
 * 
 * */
var tmpButton =  Ext.create('LAFORM.containerCommon');

Ext.define('LAFORM.leftListRoom', {
    extend: 'Ext.form.Panel',
	id:'main_contentsId',
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
                            itemId: 'form-list-room',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            defaults:{
                            	xtype : 'button',
								
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
	loadData:function(restaurentId){
		
		var container = Ext.ComponentQuery.query('#form-list-room')[0];
		var roomStore = Ext.create('MNG.store.roomStore',{});
		roomStore.load();
		console.log(roomStore);
		roomStore.on('load',function (store, record, successful, eOpts ){
			
			for(var i = 0; i < record.length; i++){
				var recd = record[i];
				var roomId = recd.get('ROOM_ID');
				var roomNO = recd.get('ROOM_NO');
				console.log(roomId+ ' / '+ roomNO);
				//tmpRoom = tmpButton.getContainer(roomId,roomNO, true);
				//container.add(tmpRoom);
			}
			console.log(record);
			
		});
	}
});