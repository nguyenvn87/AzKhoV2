Ext.define('pckg.system.menu.MenuListStore',{
	extend: 'Ext.data.Store',
	fields : [
		{name: 'MENU_ID'	, type: 'string'},
		{name: 'MENU_NM'	, type: 'string'},
		{name: 'UP_MENU_NM'	, type: 'string'},
		{name: 'UP_MENU_ID'	, type: 'string'},
		{name: 'URL'		, type: 'string'},
		{name: 'URL_TYPE'	, type: 'string'},
		{name: 'CHILD_CNT'	, type: 'string'},
		{name: 'MENU_ICON_ID' , type: 'string'}
	],
	proxy: {
		type: 'ajax',
		url: request.getContextPath + '/system/menu/menuList.json',
		//url: request.getContextPath + '/system/menu/getListMenuRoom.json',
		headers: {
			'Content=Type' : 'application/json; charset=utf-8'
		},
		reader: {
		    type: 'json',
		    root: 'data'
		}        
	}
});

