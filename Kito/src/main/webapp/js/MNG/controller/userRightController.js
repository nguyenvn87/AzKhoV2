var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var supportEvent = Ext.create('BIZ.utilities.supportEvent',{});

Ext.define('MNG.controller.userRightController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.userRightView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	init : function() {
		this.control({
			
			'#btnSaveUser' : {
				click : this.BtnSaveUser
			},
			'#addUserBtn' : {
				click : this.openBtnUser
			},
			'#delUserBtn' : {
				click : this.deleteUser
			},
			'#grid-user':{
				itemdblclick: this.doubleClickUser
			},
			'#btnSaveUserRight':{
				click : this.btnSaveUserRight
			},
			'#btnSaveUserPasswd':{
				click : this.btnSaveUserPasswd
			}	
		});
	},
	deleteUser: function(grid, rowIndex, colIndex){
		store = grid.getStore();
			var rec = store.getAt(rowIndex);
			grid.getSelectionModel().select(rowIndex);
			
	    	param={'USERNAME': rec.get('USERNAME')};
			param['authority'] = rec.get('authority');
			
			Ext.MessageBox.confirm('Confirm', 'Chắc chắn muốn xóa ?', function(btn){
			
				if(btn == 'yes'){
			    	Ext.Ajax.request( {
			    		url: contextPath + '/deleteUserVo.json',
			    		method:'POST',
			    		params: param,
			    		success: function(response){
			    			var text = Ext.JSON.decode(response.responseText);
			    			console.log( text);
			    			console.log( text.result);
			    			if( text.success == true){
			    				// 4. Forest loading
			    				alert(text.message)
			    				var Grid = Ext.ComponentQuery.query('#grid-user')[0];
			    				var storeTmp = Grid.getStore();
			    				storeTmp.load();
			    			}
			    			else{
			    				alert(text.message)
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
			});
	},
	openBtnUser:function(){
		if(this.popup==null){
			this.popup = Ext.create('MNG.view.popup.BtnAddUser',{});
		}
		this.popup.createNew();
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
	request:function(){
		var parent = this;
		
		var userName = Ext.ComponentQuery.query('#btnUserContainerId #USERNAME')[0].getValue();
		var fullname = Ext.ComponentQuery.query('#btnUserContainerId #FULLNAME')[0].getValue();
		var addr = Ext.ComponentQuery.query('#btnUserContainerId #ADDRESS')[0].getValue();
		var phone = Ext.ComponentQuery.query('#btnUserContainerId #PHONE')[0].getValue();
		var email = Ext.ComponentQuery.query('#btnUserContainerId #EMAIL')[0].getValue();
		var cmnd = Ext.ComponentQuery.query('#btnUserContainerId #CMND')[0].getValue();
		var enabled = Ext.ComponentQuery.query('#btnUserContainerId #ENABLED')[0].getValue();
		
		
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
    			if( text.success == true){
    				parent.popup.hide();
    				alert('Cập nhật thành công');
    				// 4. Forest loading
    				var Grid = Ext.ComponentQuery.query('#grid-user')[0];
    				var storeTmp = Grid.getStore();
    				storeTmp.load();
    			}else{
    				alert(text.message)
    			}
    		},
    		failure: function(response){
    			var text = Ext.JSON.decode(response.responseText);
    			console.log( text);   
    			alert('Save failure' );
    		}
    	});
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
	btnSaveUserPasswd:function(me){
		
		var userName = Ext.ComponentQuery.query('#btnUserRePasswdContainerId #USERNAME')[0].getValue();
		var passwd = Ext.ComponentQuery.query('#btnUserRePasswdContainerId #PASSWORD')[0].getValue();
		
		if(passwd == null || passwd == '' || passwd.length < 8){
			supportEvent.showWarningTimer('Mật khẩu quá ngắn !');
			return;
		}
		var re = /[a-z]/;
		if(!re.test(passwd)){
			supportEvent.showWarningTimer('Mật khẩu phải chứa ít nhất 1 kí tự !');
			return;
		}
		var re = /[0-9]/;
		if(!re.test(passwd)){
			supportEvent.showWarningTimer('Mật khẩu phải chứa ít nhất 1 chữ số !');
			return;
		}
		else{
			me.up('.window').hide();
			
			param={'USERNAME': userName};
			param['PASSWORD'] = passwd;
			
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
	    		url: contextPath + '/updateUserPasswd.json',
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
		}
	}
})