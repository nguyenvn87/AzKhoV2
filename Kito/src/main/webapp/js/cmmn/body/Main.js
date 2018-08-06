Ext.define('pckg.cmmn.body.Main',{
	extend: 'Ext.container.Viewport',
	id: 'fullscreen',
	config:	{
		top: '',
		left: '',
		bottom: '',
		main: ''
	}, 
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	initComponent : function() {
		Ext.apply(this,{
			layout: 'border',
			items: [
				{
			        region: 'north', 
			        height : 100,
			        width: '100%',
			        items: [this.top],
			        border: 0
			    },
			    {
			        region: 'west',
			        xtype: 'panel',
			        autoScroll:true,
//			        height : "100%",
			        cls: 'main_left_menu',
			        header: {
			        	xtype: 'header',
			        	cls: 'main_left_menu_header',
			        	title: 'VietLIS',
			        	border: false
			        },
			        border: 0,
			        titleCollapse: true,
			        collapsible: true,
			        title: 'VietLIS',

			        width: 290,
			        items: [this.left]
			    },
//			    {
//			        region: 'south',
//			        height: 10
//			    },
			    {
			        region: 'center',
			        width : '80%',
				    height : "100%",
				    border: false,
				    header: {
				    	xtype: 'header',
				    	border: false,
				    	title: '',
				    	cls : 'main_center_panel_header'
				    },
			        id: 'CenterLayout',
			        cls: 'main_center_panel',
			        items: [
			        	Ext.create('Ext.ux.iframe.IFrame', {
			        		id: 'SubIFrame',
			        		src: this.main
			        		//src: request.getContextPath+'/report/statistic.do'
			        	})
			        ]
			    }
			]
		});
		this.callParent(arguments);
	},
	goURL: function(url,main,sub)	{
		main_title = main;
		//sub_title  = sub;
		sub  = sub.replace( /<br\/>/g, '');	
		Ext.getCmp('CenterLayout').setTitle(main + sub);
		Ext.getCmp('SubIFrame').load(request.getContextPath + url);
	}	
	
});