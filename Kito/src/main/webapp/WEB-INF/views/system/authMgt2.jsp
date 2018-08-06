<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script>


var authInfo;
var authGroupInfo;
var historyWindow;

Ext.define('mainPanel',{
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.extCombo.view.SimpleComboBox',
		'Ext.grid.Panel'
	],
	
	config: {},	
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	       
	initComponent : function() {
		var me = this;		
		Ext.apply(me, {	
			//bodyStyle: 'padding:10px',			
			frame: true,
			items:[					
				{
					xtype: 'fieldset',
					padding:10,
					items: [						
						Ext.create( 'Ext.grid.Panel',{
							id:'firstGrid',
							height:400,
							listeners : {
								itemdblclick: function(dv, record, item, index, e) {
							    	if(authInfo){	    		
							    		authInfo.destroy();
							    	};	    	
							    	authInfo = Ext.create('BIZ.lopPopup.BtnAuthInfo',{						    		
										title: 'Phân quyền'	
										,ROLEGROUP_ID:record.get('ROLEGROUP_ID')
										,t_edit: true
										,modal: true
									});	    	
							    	authInfo.show();	
							    }
							},
							store: Ext.create('Ext.data.Store',{
								storeId: 'MyArrayStore',								
					            pageSize:gridPageSize,
					            remoteSort: true,
								fields: [
									{ name: 'ROLEGROUP_ID', type: 'string'},
									{ name: 'DSCR', type: 'string'},
									{ name: 'USE_YN', type: 'string'}												
								],
								proxy: {
									type: 'ajax',											
									url: contextPath + '/ladm/system/auth/list.json',
									reader: {
										type: 'json',
										root: 'data', 						
										totalProperty: 'totalCount',						
										messageProperty: 'message',
							            successProperty: 'success'
									},
									listeners: { 
										exception: function(proxy, response, options) {
											requestMessageProcessor(proxy, response);
										}
									},
									afterRequest: function(request, success) {
										requestMessageProcessor(request.scope, request.operation.response);
									}
									
								}
							}),
							columns: [
								{
									text: 'Mã quyền',
									dataIndex: 'ROLEGROUP_ID',
									align:'center',
									width    : 200
								},
								{
									text: 'Mô tả'	,
									flex:1,
									dataIndex: 'DSCR'
								},{
									text: 'Có sử dụng ?',
									width:80,
									align:'center',
									dataIndex: 'USE_YN',
									renderer : function(value, p, r) {
										if(r.data['USE_YN']) {
											if(r.data['USE_YN'].trim()=='Y'){
												return SM_YNText_Y;
											}
											if(r.data['USE_YN'].trim()=='N'){
												return SM_YNText_N;
											}
										}
										else
											return '';
									}
								},{
									text: 'Sửa',
									value: 'V',
									listeners: {
										click : this.onBtnRegEdit,
										scope: this  
									},
									align: 'center',
									renderer: function(){
										return '<img src="../../../images/icon/viewinfo.png"/>';	
									}
								},
								{
									text: 'history',
									value: 'V',
									listeners: {
										click : this.onBtnHistory,
										scope: this  
									},
									align: 'center',
									renderer: function(){
										return '<img src="../../../images/icon/clock_go.png"/>';	
									}
								}
								
							],
							dockedItems: [
									{
									    xtype: 'pagingtoolbar',
									    dock: 'bottom',
									    id: 'gridPagingToolbar',
									    displayInfo: true,
									    store: 'MyArrayStore',
									},
									{
										xtype: 'toolbar',
										margin: '0 0 5 0',
										dock: 'top',
										layout:{
											type: 	'hbox',
											align:	'middle',
											pack: 'end'
										},
										items: [
// 												'->'
												{
													xtype: 'button',
													text: 'Thêm quyền',
													id: 'BtnReg',
													cls: 'x-btn-default-small',
													listeners: {
														click: this.onBtnReg,
														scope: this  
													}
												},
												{
													xtype: 'button',
													text: 'Xóa',
													cls: 'x-btn-default-small',
													listeners: {
														click : this.onBtnDelEdit,
														scope: this  
													}
												}
										]
									}
							]		
						})
						
					]
				}
			]			
		});
		
		me.callParent(arguments);			
	},	
	
	
	onBtn_search: function(){				
		Ext.getCmp('firstGrid').getStore().currentPage=1;		                        	
		Ext.getCmp('firstGrid').getStore().getProxy().extraParams = {			
		};		
		Ext.getCmp('firstGrid').getStore().load();	 
	}, 
	
	onBtnReg: function(){		
		if(authGroupInfo){	    		
			authGroupInfo.destroy();
    	};	    	
    	authGroupInfo = Ext.create('BIZ.lopPopup.BtnAuthGroupInfo',{						    		
			title: 'Thêm thông tin quyền'				
			,t_add: true
			,modal: true			
		});	    	
    	authGroupInfo.show();	
	},
	
	onBtnRegEdit: function(ths, e, eOpts){
		var row = null;
		row = ths.getSelectionModel().getSelection()['0'];		
		authGroupInfo = Ext.create('BIZ.lopPopup.BtnAuthGroupInfo',{						    		
			title: 'Sửa thông tin quyền'					
			,ROLEGROUP_ID: row.get('ROLEGROUP_ID')
			,t_edit: true
			,modal: true			
		});
		
    	authGroupInfo.show();	
	},
	
	onBtnDelEdit: function(ths, e, eOpts){
		var gr = Ext.getCmp('firstGrid').getSelectionModel().getSelection()[0];
		Ext.MessageBox.confirm('Xác nhận', 'Bạn có muốn xóa không?', function(btn){
			   if(btn === 'yes'){
					var id  = gr.get('ROLEGROUP_ID');
					Ext.Ajax.request({
					    url: contextPath + '/ladm/system/authgroup/delete.json',
					    params: {
					    	ROLEGROUP_ID: id
					    },
					    success: function(response){
					        var text = response.responseText;
					        // process server response here
						}
					});
					Ext.getCmp('firstGrid').getStore().reload();
				}
		});
			
	},
	
	
	onBtnHistory: function() {		
		
		var authListGrid_select = Ext.getCmp('firstGrid').getSelectionModel().getSelection()[0];
		
		console.log(authListGrid_select);
		
		if(historyWindow){
			historyWindow.destroy();
		}		
		   	
		historyWindow = Ext.create('BIZ.lopPopup.BtnAuthHistory',{						    		
			title: 'History',				
			height: 500,
			width: 900,
			ROLEGROUP_ID: authListGrid_select.get("ROLEGROUP_ID"),			
		});	    	
		historyWindow.show();	
	}
});


Ext.onReady(function(){
	Ext.create( 'mainPanel', {
		height: 600,		
		renderTo: 'land_contents',
		id:'mainPanel',
		listeners: {
            beforerender: function () {            		
                Ext.EventManager.onWindowResize(function () {
                    Ext.getCmp('mainPanel').setSize(Ext.getBody().getViewSize().width, null);
                });
                
                this.onBtn_search();
            }
        }
	});
	
}); 
</script>
</head>

<body>
	<br>
	<!-- <center><h3>Quản lý quyền hạn</h3></center> -->
	<div id="land_contents"></div>
</body>
</html>