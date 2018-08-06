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

Ext.define('BS.authActTree', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],        
    config: {		
    	ROLEGROUP_ID: null
	},	
	id:'authActTree',
    height: 350,
    width: 350,    
    useArrows: true, 
    defaults: {autoScroll: true},
    initComponent: function() {
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
            	storeId: 'authActTreeStore',
                proxy: {
                	type: 'ajax',
                    //url: contextPath + '/ladm/system/auth/role/tree.json',                     
                    reader: {
                        type: 'json',
                        root: 'data',
                    },
            		extraParams: {ROLEGROUP_ID : this.ROLEGROUP_ID}
                },
                root: {
                	text: 'action auth',
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

            		this.makeChkedAuthAct(node,check);
            	}
            }           
        });
        this.callParent();
    },
    chkedAuthActArr: null,  // checked tree items
    makeChkedAuthAct: function(node, check){   // make data for chkedAuthMenuArr
    	
		if( this.chkedAuthActArr == null) {
			this.chkedAuthActArr = new Array();
		}
		
		var params = { ROLE_ID : node.data.id  , USE_YN : node.data.checked ,ROLEGROUP_ID : this.ROLEGROUP_ID};
		
		var chkIndex = -1;
		for( var i=0; i<this.chkedAuthActArr.length; i++) {
			if(this.chkedAuthActArr[i].ROLE_ID==params.ROLE_ID) {
				chkIndex = i;
				//this.chkedAuthActArr[i].USE_YN = params.USE_YN; //값 변경
				this.chkedAuthActArr.splice(i, 1);	// 기존값에 해당하는 노드 삭제
			}
		}
		
		if( chkIndex == -1) {
			this.chkedAuthActArr[this.chkedAuthActArr.length] = params;
		}
    }
});