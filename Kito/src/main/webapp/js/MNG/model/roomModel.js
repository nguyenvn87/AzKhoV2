/**
 * 
 */
Ext.define('MNG.model.roomModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'ROOM_ID', type : 'string'}
					, {
						name : 'ROOM_NO', type : 'string'}
					, {
						name : 'ROOM_FLOR',	type : 'string'}
					, {
						name : 'ROOM_TYPE',	type : 'string' }
					, {
						name : 'ROOM_TYPE_NM',	type : 'string' }
					, {
						name : 'RESTAR_ID',	type : 'string' }
					, {
						name : 'ROOM_STATUS',	type : 'string' }
					, {
						name : 'IS_EMPTY',	type : 'string' }
					, {
						name : 'IS_USED',	type : 'string' }
					]
		});