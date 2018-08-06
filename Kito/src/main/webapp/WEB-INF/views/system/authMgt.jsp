<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>
<script>

var tmpMenuStore = Ext.create('MNG.store.menuStore',{})
var authInfo;

Ext.define('MNG.view.groupView', {
    extend: 'Ext.panel.Panel',
    cls: '',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

					xtype : 'container',
					itemId: 'mainContainerID',
					layout : {
						align : 'stretch',
						type : 'vbox'
					},
					items : [{
						xtype : 'container',
						cls : 'jdvn-sub-body',
						layout : {
							align : 'stretch',
							type : 'vbox'
						},
						defaults : {
							cls : 'row'
						},
						items : [
							{
								 xtype: 'gridpanel',
                                 itemId: 'grid-menu',
                                 //flex: 1,
                                 minHeight: 300,
                                // maxHeight: 300,
                                 pageSize:10,
                                 padding:'10 0 0 0',
                                 autoScroll: true,
                                 height:400,
								 listeners : {
								 itemdblclick: function(dv, record, item, index, e) {
								    	if(authInfo){	    		
								    		authInfo.destroy();
								    	};	    	
								    	authInfo = Ext.create('MNG.view.popup.BtnAuthInfo',{						    		
											title: 'Phân quyền'	
											,ROLEGROUP_ID:record.get('ROLEGROUP_ID')
											,t_edit: true
											,modal: true
										});	    	
								    	authInfo.show();	
								    }
								},
                                 store: Ext.create('MNG.store.RoleGroupStore',{}),
                                 columns: [
                                     {
									text: 'Mã quyền',
									dataIndex: 'ROLEGROUP_ID',
									hidden: true,
									align:'center',
									width    : 200
								},
								{
									menuDisabled : true,
									sortable : false,
									xtype : 'actioncolumn',
									text: 'Vai trò',
									align : 'center',
									width : 90,
									items : [ {
										iconCls : 'icon-true',
										getTip: function (a, b, record) {
											var closed = record.get('ROLEGROUP_ID');
											if(closed.trim() == 'ROLE_MANAGER'){
												return 'Quản lý';
											}
											else if(closed.trim() == 'ROLE_ADMIN'){
												return 'Quản trị phần mềm';
											}
											else if(closed.trim() == 'ROLE_USER'){
												return 'Nhân viên';
											} 
										},
										getClass : function(value, metadata, record) {
											var closed = record.get('ROLEGROUP_ID');
											
											if(closed == 'ROLE_MANAGER'){
												return 'icon-manager';
											}
											else if(closed == 'ROLE_ADMIN'){
												return 'icon-admin';
											}
											else if(closed == 'ROLE_USER'){
												return 'icon-staff';
											} 
										}
									} ]
								},
								{
									text: 'Mô tả'	,
									flex:1,
									dataIndex: 'DSCR',
									renderer : function(value, p, record) {
										var closed = record.get('ROLEGROUP_ID');
											if(closed.trim() == 'ROLE_MANAGER'){
												return 'Quản lý';
											}
											else if(closed.trim() == 'ROLE_ADMIN'){
												return 'Quản trị phần mềm';
											}
											else if(closed.trim() == 'ROLE_USER'){
												return 'Nhân viên';
											} 
									}
								},{
									text: 'Có sử dụng ?',
									width:120,
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
										//click : this.onBtnRegEdit,
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
										//click : this.onBtnHistory,
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
									    //store: 'MyArrayStore',
									},
									{
										xtype: 'toolbar',
										//margin: '0 0 5 0',
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
													hidden: true,
													id: 'BtnReg',
													cls: 'x-btn-default-small',
													listeners: {
														//click: this.onBtnReg,
														scope: this  
													}
												},
												{
													xtype: 'button',
													text: 'Xóa',
													hidden: true,
													cls: 'x-btn-default-small',
													listeners: {
														//click : this.onBtnDelEdit,
														scope: this  
													}
												}
										]
									}
                                 ]
							}
						]
					}]
                }
            ]
        });
        me.callParent(arguments);
    }
});


Ext.onReady(function(){
	Ext.create( 'MNG.view.groupView', {
		height: 600,		
		renderTo: 'land_contents',
		id:'mainPanel',
		listeners: {
            beforerender: function () {            		
                Ext.EventManager.onWindowResize(function () {
                    Ext.getCmp('mainPanel').setSize(Ext.getBody().getViewSize().width, null);
                });
            }
        }
	});
	var Grid = Ext.ComponentQuery.query('#grid-menu')[0];
	var storeTmp = Grid.getStore();
	storeTmp.load();
}); 
</script>

<div id="land_contents"></div>
