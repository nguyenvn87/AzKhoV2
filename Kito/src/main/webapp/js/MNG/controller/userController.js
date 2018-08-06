var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});

Ext.define('MNG.controller.userController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.userViewManager','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#btnSaveUser' : {
				click : this.BtnSaveUser
			},
			'#addUserBtn' : {
				click : this.openBtnUser
			},
			'#grid-user':{
				itemdblclick: this.doubleClickUser
			},
			'#btnSaveUserRight':{
				click : this.btnSaveUserRight
			}	
		});
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddUser',{});
		}
		this.popup.showForm(false);
		this.popup.isCreate = true;
	},
	doubleClickUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddUser',{});
		}
		this.popup.showForm(true);
		gridSupport.selectGridPopup('#AdminContainerID','#grid-user','#btnUserContainerId');
		this.popup.isCreate = false;
	},
	BtnSaveUser:function(){
		this.request();
	},
	validationCreateUser:function(_userName,_fullName, _cmnd){
		var parent = this;
		var isOk = true;
		if(parent.popup.isCreate ){
			if(_userName.length < 8){
				isOk = false;
				supportEvent.showWarningTimer('Tên đăng nhập ít nhất 8 kí tự');
			}
			if(_fullName.length < 2){
				supportEvent.showWarningTimer('Họ tên không được để trống');
				isOk = false;
			}
		}
		return isOk;
	},
	request:function(){
		var parent = this;
		
		var userName = Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].getValue();
		var fullname = Ext.ComponentQuery.query('#btnUserContainerId #FULLNAME')[0].getValue();
		var addr = Ext.ComponentQuery.query('#btnUserContainerId #ADDRESS')[0].getValue();
		var phone = Ext.ComponentQuery.query('#btnUserContainerId #PHONE')[0].getValue();
		var email = Ext.ComponentQuery.query('#btnUserContainerId #EMAIL')[0].getValue();
		var cmnd = Ext.ComponentQuery.query('#btnUserContainerId #CMND')[0].getValue();
		var enabled = Ext.ComponentQuery.query('#btnUserContainerId #ENABLED')[0].getValue();
		
		if(parent.validationCreateUser(userName,fullname, cmnd)){
		
			param={'USERNAME': userName};
			param['FULLNAME'] = fullname;
			param['ADDRESS'] = addr;
			param['PHONE'] = phone;
			param['EMAIL'] = email;
			param['CMND'] = cmnd;
			param['ENABLED'] = enabled;
			param['STATUS'] = parent.popup.isCreate;
			
			Ext.Ajax.request( {
	    		url: contextPath + '/saveUserVo.json',
	    		method:'POST',
	    		params: param,
	    		success: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log( text);
	    			console.log( text.result);
	    			if( text.success == true){
	    				parent.popup.hide();
	    				// 4. Forest loading
	    				var Grid = Ext.ComponentQuery.query('#grid-user')[0];
	    				var storeTmp = Grid.getStore();
	    				console.log(storeTmp);
	    				storeTmp.load();
	    			}
	    			else{
	    				supportEvent.showWarningTimer(text.message);
	    			}
	    		},
	    		failure: function(response){
	    			var text = Ext.JSON.decode(response.responseText);
	    			console.log( text);   
	    			alert('Save failure' );
	    		}
	    	});
		}
	},
	btnSaveUserRight:function(me){
		me.up('.window').hide();
		var userName = Ext.ComponentQuery.query('#btnUserRightContainerId #USERNAME')[0].getValue();
		var fullname = Ext.ComponentQuery.query('#btnUserRightContainerId #authority')[0].getValue();
		
		param={'USERNAME': userName};
		param['authority'] = fullname;
		
		Ext.MessageBox.show({
				 title: 'Đợi vài giây',
		         msg: 'Đang lưu, please wait...',
		         progressText: 'Saving...',
		         width:300,
		         wait:true,
		         waitConfig: {interval:200},
		         icon:'ext-mb-download', 
		         animateTarget: 'btnEndRunningRoom'
		      });
		
		Ext.Ajax.request( {
    		url: contextPath + '/saveUserAuthority.json',
    		method:'POST',
    		params: param,
    		success: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);
    			setTimeout(function(){
		    				Ext.MessageBox.hide();
		    				if( text.success == true){
		    					supportEvent.hiddeMessageBox();
		    					var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			    				var storeTmp = Grid.getStore();
			    				console.log(storeTmp);
			    				storeTmp.load();
		        			}
		    				else{
		    					// text.data
		    					supportEvent.showMessageError(text.data);
		    					return;
		    				}
		    	        }, 500);
    		},
    		failure: function(response){
    			Ext.MessageBox.hide();
		    	Ext.MessageBox.alert('Status', 'Có lỗi xảy ra !');
    		}
    	});
	},
})