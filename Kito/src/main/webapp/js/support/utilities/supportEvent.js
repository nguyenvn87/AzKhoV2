/** 
 * @author Nguyen
 * BIZ.utilities.supportEvent
 */
Ext.require([
             'Ext.window.MessageBox',
             'Ext.tip.*'
         ]);

Ext.define('BIZ.utilities.supportEvent', {
	ObjectActive: null,
	isEdit: true,
	STATE : 0,
	POPUP : null,
	isValidation: false,
	reset:function(){
		STATE = ACTION_STATE.NONE;
		POPUP : null;
	},
	setState:function(State){
		this.STATE = State;
	},  
	getState:function(){
		return this.STATE;
	},
	setPopup:function(popup){
		this.POPUP = popup;
	},
	getPopup:function(){
		return this.POPUP;
	},
	setEditableObject:function(object_, isEdit){
		tmpObject = Ext.ComponentQuery.query(object_);
		if(tmpObject != null && tmpObject != undefined)
			for(var i = 0; i < tmpObject.length; i++){
				tmpObject[i].setVisible(isEdit);
			}
	},
	getValidation:function(){
		return this.isValidation;
	},
	setValidation:function(_value){
		this.isValidation = _value;
	},
	showMessageError:function(txtMassage){
		Ext.MessageBox.show({
	           title: 'Thông báo',
	           msg: txtMassage,
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       });
	},
	showMessageSuccess:function(txtMassage){
		Ext.MessageBox.show({
	           title: 'Thông báo',
	           msg: txtMassage,
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.INFO
	       });
	},
	showMessageWarning:function(txtMsg){
		Ext.MessageBox.show({
	           title: 'Thông báo',
	           msg: txtMsg,
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       });
	},
	showLoadingOnprogress:function(txtMsg, idButton){
		Ext.MessageBox.show({
			   title: 'Đợi giây lát...',
	           msg: txtMsg,
	           progressText: 'Loading...',
	           width:300,
	           wait:true,
	           waitConfig: {interval:200},
	           icon:'ext-mb-download', 
	           animateTarget: idButton
	       });
	},
	hiddeMessageBox:function(){
		Ext.MessageBox.hide();
	},
	showWarningTimer:function(message){
		swal({   
			title: "<small>Cảnh báo</small>!",   
			text: "<span style='color:#F08080'>"+message,  
			timer: 1000,   
			showConfirmButton: false,
			html: true 
			});
	},
	notiSuccess: function(txtTitle, txtMsg){
		swal({   
			title: txtTitle,   
			text: txtMsg,   
			timer: 800,   
			imageUrl: contextPath+"/images/thumbs-up.jpg" 
			});
	},
	autoPrint:function(_url){
		 var W = window.open(_url);   
		 W.window.print(); 
	},
	downloadFile:function(_url){
		
		 method = 'POST';
         params = {};
	    // Create form panel. It contains a basic form that we need for the file download.
	    var form = Ext.create('Ext.form.Panel', {
	        standardSubmit: true,
	        url: _url,
	        method: method
	    });
	    // Call the submit to begin the file download.
	    form.submit({
	        target: '_blank', // Avoids leaving the page. 
	        params: params
	    });
	},
});