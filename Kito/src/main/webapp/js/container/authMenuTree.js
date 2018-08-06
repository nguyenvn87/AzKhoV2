Ext.define('SelectedModel', {
 extend: 'Ext.data.Model',
 fields: [
    {name: 'text', type: 'string' ,mapping:'TEXT'},
    {name: 'id',  type: 'string' ,mapping:'ID'},
    {name: 'leaf', type: 'bool',mapping:'LEAF'},
    {name: 'children',  type: 'auto',mapping:'CHILDREN'},    
    {name: 'status',  type: 'int',mapping:'STATUS'},
    {name: 'nodetype',  type: 'string',mapping:'NODETYPE'},
    {name: 'iconCls',  type: 'string',mapping:'ICONCLS'},   
    {name: 'checked', type: 'boolean',mapping:'CHECKED'},
    {name: 'expanded', type: 'boolean',mapping:'EXPANDED'}
 ]
});
Ext.define('BS.authMenuTree', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ], 
    config: {		
    	ROLEGROUP_ID: null
	},	
	id:'authMenuTree',
    height: 500,
    width: 350,    
    useArrows: true, 
    defaults: {autoScroll: true},
    initComponent: function() {
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
            	storeId: 'authMenuTreeStore',
                proxy: {
                	type: 'ajax',
                    url: contextPath + '/system/auth/menu/tree.json', 
                    
                    reader: {
                        type: 'json',
                        root: 'data',
                    },
            		extraParams: {ROLEGROUP_ID : this.ROLEGROUP_ID}
                },
                root: {
                	text: 'Tất cả menu',                   
                    expanded: true
                },
                folderSort: true,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }],
                model: 'SelectedModel'
            }),           
            viewConfig: {
            	loadMask: new Ext.LoadMask(this, {
            		msg: "loading,Please wait..."
            		})                
            },
            listeners : { 
            	checkchange : function(node,check){

            		this.makeChkedAuthMenu(node,check);
            	}
            }           
        });
        this.callParent();        
    },
    chkedAuthMenuArr: null,  // checked tree items
    makeChkedAuthMenu: function(node, check){   // make data for chkedAuthMenuArr
    	console.info('Node');
    	console.info(node);
    	console.info(check);
		if( this.chkedAuthMenuArr == null) {
			this.chkedAuthMenuArr = new Array();
		}
		
		var params = { MENU_ID : node.data.id  , USE_YN : node.data.checked ,ROLEGROUP_ID : this.ROLEGROUP_ID};
		
		var chkIndex = -1;
		for( var i=0; i<this.chkedAuthMenuArr.length; i++) {
			if(this.chkedAuthMenuArr[i].MENU_ID==params.MENU_ID) {
				chkIndex = i;
				this.chkedAuthMenuArr.splice(i, 1);	
			}
		}
		
		if( chkIndex == -1) {
			this.chkedAuthMenuArr[this.chkedAuthMenuArr.length] = params;
		}
    }
});