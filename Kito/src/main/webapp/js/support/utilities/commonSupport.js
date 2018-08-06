/**
 * @author Nguyen
 * @description: common support
 * @createdate: 2014/08/26 
 */
var dateTool = Ext.create('BIZ.utilities.formatSupporter');
Ext.define("JungdoUIT.Temp.CadastreChangeObj", {
	SRVC_ID: "",
	TABLE_NAME: "",
	COLUMN_NAME: "",
	TARGET_ID: "",
	TARGET_ID_NM: "",
	TARGET_VALUE: "",
	ROWIDENTIFIER: "",
	ROWVERSION: "",
	CHANGE_ACTION: "",
	CHANGE_USER: ""
});
var mangso = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];

Ext.define('BIZ.utilities.commonSupport', {
	
	resetInputForm : function(container, gridId){
		var tmpGrid = Ext.ComponentQuery.query(gridId)[0];
		var model = tmpGrid.getStore().getProxy().getModel();
		
		var tmpModelFieldsName = model.getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container+' #' + id)[0];
				if (cmp != null) {
					if(cmp.getXType()=='radiogroup') {								
						cmp.setValue(false);
					}
					else {
						cmp.setValue('');
					}
				}
			}
		}			
	},
	loadingGridBySptUnit:function(storeTmp, sptUnitId){
		storeTmp.getProxy().extraParams = {
			SPTLUNIT_ID : sptUnitId
		};
		storeTmp.load();
		storeTmp.commitChanges();
	}, 
	reloadStoreAsset:function(sptUnitId, srvcId, idGrid,extInfType){
		
		var OwnerShipStore = Ext.getCmp(idGrid).getStore();
		OwnerShipStore.getProxy().extraParams = {
			SPTLUNIT_ID : sptUnitId,
			SRVC_ID: srvcId,
			EXT_INF_TYPE: extInfType
		};
		OwnerShipStore.load();
		OwnerShipStore.on('load',function (store, records, successful, eOpts ){
			
		});
		OwnerShipStore.commitChanges();
	},
	updateField:function(containerId, gridId){
		
		var resGrid = Ext.ComponentQuery.query(containerId+' '+gridId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		var record = tmpModel.data;
		
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel()
				.getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(containerId+' #' + id)[0];
				if (cmp != null) {
					if(cmp.getXType()=='radiogroup') {								
						tmpModel.set(id,cmp.getChecked()[0].inputValue);
					}
					else if(cmp.getXType() == 'datefield' && cmp.getValue() != null ){
						var dateField = dateTool.convertToVarchar8(cmp.getValue().toString());
						tmpModel.set(id, dateField);
					}
					else if (cmp.getXType() == 'simplecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
						}
					else {
						tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		
		if(record['STATUS'] == "CREATE"){
			
		}else{
			tmpModel.set('STATUS', 'UPDATED');
		}
		tmpModel.endEdit();
	},
	getModifiedDataFromGrid:function(storeTmp){
		
		var shareData = null;
		var recordsToSend = [];
		
		//var shareGrid = Ext.getCmp(idGrid).getStore();
		storeTmp.clearFilter(true);
		
		removedRecord = storeTmp.getRemovedRecords();
	    Ext.each(removedRecord, function(record){
	    	console.log('Test test');
	    	record.data['STATUS'] = "DELETED";
	        console.log(record);
	        recordsToSend.push(record.data);
	    });
	    
		var modified = storeTmp.getModifiedRecords();

	    
	    Ext.each(modified, function(record){
	        recordsToSend.push(record.data);
//	        console.log('Test test');
//	        console.log(record);
	    });
	    
	    
	    
	   // shareGrid.commitChanges();
	    shareData = Ext.encode(recordsToSend);
	    return shareData;
	},
	/* START NGUYENNV ADD NEW */
	updateFieldPopup:function(containerId, gridId){
		
		var resGrid = Ext.ComponentQuery.query(gridId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		var record = tmpModel.data;
		
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel()
				.getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(containerId+' #' + id)[0];
				if (cmp != null) {
					if(cmp.getXType()=='radiogroup') {								
						tmpModel.set(id,cmp.getChecked()[0].inputValue);
					}
					else if(cmp.getXType() == 'datefield' && cmp.getValue() != null ){
						var dateField = dateTool.convertToVarchar8(cmp.getValue().toString());
						tmpModel.set(id, dateField);
					} 
					else if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					}
					else {
						tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		tmpModel.endEdit();
	},
	/**
	 * @author Nguyen
	 * @parameter1 gridId
	 * @parameter2 idSummary
	 * @parameter3 Type (Land, Owner, House, Build, Forest, Etc...)
	 */
	showSummaryTxt:function(idGrid, idSummary, type){
		
		var gridObect = Ext.getCmp(idGrid);
		tempStore = gridObect.getStore();
		var displayTxt = '';
		
		if(tempStore.getCount() > 0){
		
			switch(type){
			
				case STRUCT_OBJECT.LAND : 
					break;
				case STRUCT_OBJECT.OWNER: 
					break;
				case STRUCT_OBJECT.HOUSE: 
					var txtSmr = Ext.ComponentQuery.query('#'+idSummary)[0];
					txtSmr.removeAll();			
					tempStore.findBy (function(rec) {
						
								 
						 displayTxt = '- ' 	+ rec.data['HOUS_APT_TYPE_NM'] 
						 				   	+ '; Diện tích: '+ rec.data['FLOR']
						 				   	+ '; Địa chỉ: '+ rec.data['DTL_ADDR']
						 					+ '; HT sở hữu: '+ rec.data['SHARE_RT'];
						 lable = Ext.create('Ext.form.Label',{ 
								cls: 'desc-text-display',
								text: displayTxt });
						 txtSmr.add(lable);
				    });
					break;
				case STRUCT_OBJECT.FOREST : 
					var txtSmr = Ext.ComponentQuery.query('#'+idSummary)[0];
					txtSmr.removeAll();	
					tempStore.findBy (function(rec) {
						
										 
						 displayTxt = '- ' 	+ rec.data['ASSET_TYPE'] 
						 				   	+ '; Diện tích: '+ rec.data['FORST_AR']
						 				   	+ '; Địa chỉ: '+ rec.data['DTL_ADDR']
						 					+ '; Thời hạn: '+ rec.data['FNISHDT']
						 					+ '; HT sở hữu: '+ rec.data['SHARE_RT'];
						 lable = Ext.create('Ext.form.Label',{ 
								cls: 'desc-text-display',
								text: displayTxt });
						 txtSmr.add(lable);
				    });
					break;
				case STRUCT_OBJECT.BUILD:
					var txtSmr = Ext.ComponentQuery.query('#'+idSummary)[0];
					txtSmr.removeAll();	
					tempStore.findBy (function(rec) {
						
										 
						 displayTxt = '- ' 	+ rec.data['BULDG_NM'] 
						 				   	+ '; Diện tích XD: '+ rec.data['AR']
						 				   	+ '; Diện tích sàn: '+ rec.data['FLOR']
						 					+ '; Thời hạn: '+ rec.data['FNISHDT']
						 					+ '; Địa chỉ: '+ rec.data['DTL_ADDR'];
						 lable = Ext.create('Ext.form.Label',{ 
								cls: 'desc-text-display',
								text: displayTxt });
						 txtSmr.add(lable);
				    });
					break;
					break;
				case STRUCT_OBJECT.ETC: 
					
					tempStore.findBy (function(rec) {
						
						var txtSmr = Ext.ComponentQuery.query('#'+idSummary)[0];
						txtSmr.removeAll();					 
						 displayTxt = '- ' 	+ rec.data['ASSETCATAG_TYPE'] 
						 				   	+ '; Diện tích: '+ rec.data['AR']
						 				   	+ '; Địa chỉ: '+ rec.data['DTL_ADDR']
						 					+ '; Thời hạn: '+ rec.data['FNISHDT']
						 					+ '; HT sở hữu: '+ rec.data['SHARE_RT'];
						 lable = Ext.create('Ext.form.Label',{ 
								cls: 'desc-text-display',
								text: displayTxt });
						 txtSmr.add(lable);
				    });
					break;
			}
		}
	},
	checExistInStore:function(assetId, store){
		
		var isExist = false;
		store.findBy (function(rec) {
			 extInfoId = rec.get('EXT_INFO_ID') ;
	         if(extInfoId.trim() == assetId.trim())
	           	   {
	                  	isExist = true;
	                  	console.log('Exist = '+isExist);
	               }
	               else {
	                    	console.log('Exist = '+isExist);
	                    }
              });
		return isExist;
	},
	/* END NGUYENNV ADD NEW */
	
	/*ManhNH add */
	generateJsonStringByGridItemId: function(itemId){
		var grid = Ext.ComponentQuery.query(itemId)[0];
		store=grid.getStore();
		if(store.isFiltered()) store.clearFilter();
//		for(i=0;i<delShDList.length;i++){			
//			shdStore.add(delShDList[i]);
//		}		
		//remove all records which not be modified
		var p=store.data.items;				
		var noActionList=[];
		for(var i in p){
			if(p[i].get('action')==''){
				Ext.Array.include(noActionList,p[i]);
			}
		}
		var p1=Ext.Array.difference(p,noActionList);		
		var jsonDataString = Ext.encode(Ext.Array.pluck(p1,'data'));
		return jsonDataString;
	},
	generateJsonStringByStoreZA210: function(store){
		if(store.isFiltered()) store.clearFilter();
		//remove all records which not be modified
		var p=store.data.items;				
		var noActionList=[];
		for(var i in p){
			if(p[i].get('action')==''){
				Ext.Array.include(noActionList,p[i]);
			}
		}
		var p1=Ext.Array.difference(p,noActionList);		
		var jsonDataString = Ext.encode(Ext.Array.pluck(p1,'data'));
		return jsonDataString;
	},
	generateJsonStringByStore: function(store){
		if(store.isFiltered()) store.clearFilter();
		var p=store.data.items;		
		var jsonDataString = Ext.encode(Ext.Array.pluck(p,'data'));
		return jsonDataString;
	},
	/*End ManhNH add */
	
	getCadastreChangeInfoByGridId: function(gridId, id_column_name, table_name, srvcId) {
		
		var changeList = [];
		var grid = Ext.ComponentQuery.query('#'+gridId)[0];
		var updatedRecords = grid.getStore().getUpdatedRecords();
		var deletedRecords = grid.getStore().getRemovedRecords();
		var insertedRecords = grid.getStore().getNewRecords();
		
		for(var i = 0; i < updatedRecords.length; i++) {
			if(updatedRecords[i].get(id_column_name).indexOf('add-')>-1) {
				var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
		    	temp.CHANGE_ACTION = 'I';
				temp.SRVC_ID = srvcId;
				temp.TABLE_NAME = table_name;
				temp.TARGET_ID_NM = id_column_name;
				temp.TARGET_ID = updatedRecords[i].get(id_column_name);
			    temp.COLUMN_NAME = id_column_name;
			    temp.TARGET_VALUE = updatedRecords[i].get(id_column_name);
				changeList.push(temp);
			}
			else {
				var changes = updatedRecords[i].getChanges();
				for(var key in changes) {
					if(key != 'action' && key != 'rowIndex') {
						var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
						var isNMField = false;
						if(key.substring(key.length-3, key.length) == '_NM') {
							for (var k in updatedRecords[i].data) {
								if(k == key.substring(0,key.length-3)) {
									isNMField = true;
								}
							}
						}
						if(isNMField) {
				    		temp.CHANGE_ACTION = 'O';
						}
						else {
							temp.CHANGE_ACTION = 'U';
						}					
						temp.SRVC_ID = srvcId;
						temp.TABLE_NAME = table_name;
						temp.TARGET_ID_NM = id_column_name;
						temp.TARGET_ID = updatedRecords[i].get(id_column_name);
					    temp.COLUMN_NAME = key;
					    temp.TARGET_VALUE  = changes[key];
						changeList.push(temp);
					}
				}
			}
		}
		for(var i = 0; i < insertedRecords.length; i++) {
			var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
	    	temp.CHANGE_ACTION = 'I';
			temp.SRVC_ID = srvcId;
			temp.TABLE_NAME = table_name;
			temp.TARGET_ID_NM = id_column_name;
			temp.TARGET_ID = insertedRecords[i].get(id_column_name);
		    temp.COLUMN_NAME = id_column_name;
		    temp.TARGET_VALUE = insertedRecords[i].get(id_column_name);
			changeList.push(temp);
		}
		for(var i = 0; i < deletedRecords.length; i++) {
			var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
	    	temp.CHANGE_ACTION = 'D';
			temp.SRVC_ID = srvcId;
			temp.TABLE_NAME = table_name;
			temp.TARGET_ID_NM = id_column_name;
			temp.TARGET_ID = deletedRecords[i].get(id_column_name);
		    temp.COLUMN_NAME = id_column_name;
		    temp.TARGET_VALUE = deletedRecords[i].get(id_column_name);
			changeList.push(temp);
		}
		return changeList;
	},
	
	getCadastreChangeShareInfo: function(store, id_column_name, table_name, srvcId) {
		
		var changeList = [];
		var updatedRecords = store.getModifiedRecords();
		for(var i = 0; i < updatedRecords.length; i++) {
			if(updatedRecords[i].get('action')!='add'&&updatedRecords[i].get('action')!='del'){
				var changes = updatedRecords[i].getChanges();
				for(var key in changes) {
					if(key != 'action' && key != 'rowIndex') {
						var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
						var isSHARE_PC = false;
						if(key == "SHARE_PC") {
							isSHARE_PC = true;
						}
						if(isSHARE_PC) {
				    		temp.CHANGE_ACTION = 'O';
						}
						else {
							temp.CHANGE_ACTION = 'U';
						}					
						temp.SRVC_ID = srvcId;
						temp.TABLE_NAME = table_name;
						temp.TARGET_ID_NM = id_column_name;
						temp.TARGET_ID = updatedRecords[i].get(id_column_name);
					    temp.COLUMN_NAME = key;
					    temp.TARGET_VALUE  = changes[key];
						changeList.push(temp);
					}
				}
			}
		}
		return changeList;
	},
	getDeleteChangeInfoByStore:function(store,id_column_name, table_name, srvcId){
		var delList=[];
		var delRecords=store.query('action','del').items;
		for(var i in delRecords) {
//			console.log('delRec:',delRecords[i]);
			var temp = Ext.create("JungdoUIT.Temp.CadastreChangeObj");
			temp.CHANGE_ACTION = 'D';
			temp.SRVC_ID = srvcId;
			temp.TABLE_NAME = table_name;
			temp.TARGET_ID_NM = id_column_name;
			temp.TARGET_ID = delRecords[i].get(id_column_name);
			temp.TARGET_VALUE = delRecords[i].get(id_column_name);
			temp.COLUMN_NAME = id_column_name;
			delList.push(temp);
		}
		return delList;
	},
	
	applyCadastreChangeInfoToGrid: function(grid, changeData, tableName, idColumnName) {
		for(var i = 0; i < changeData.length; i++) {
			if(changeData[i].TABLE_NAME === tableName) {
				if(changeData[i].CHANGE_ACTION === 'U' || changeData[i].CHANGE_ACTION === 'O' ) {
					var gridStore = grid.getStore();
					var allRecords = gridStore.snapshot || gridStore.data;
					allRecords.each(function(record)  
					{  
						if(record.get(idColumnName) === changeData[i].TARGET_ID) {
							record.set(changeData[i].COLUMN_NAME, changeData[i].TARGET_VALUE)
						}
					});
				}
			}
		}
	},
	//
	applyCadastreChangeInfoToStore: function(store, changeData, tableName, idColumnName) {
		for(var i = 0; i < changeData.length; i++) {
			if(changeData[i].TABLE_NAME === tableName) {				
				if(changeData[i].CHANGE_ACTION === 'U' || changeData[i].CHANGE_ACTION === 'O') {
					var gridStore = store;
					var allRecords = gridStore.snapshot || gridStore.data;					
					allRecords.each(function(record)  
					{  
						if(record.get(idColumnName) === changeData[i].TARGET_ID) {
							record.set(changeData[i].COLUMN_NAME, changeData[i].TARGET_VALUE)
						}
					});
				}
			}
		}
	},
	filterStore:function(store, _property, _value){
		
		store.clearFilter(true);
		store.filter({
			  property: _property,
			  value: _value
			});
	},
	getTempIdKey:function(){
		var d = new Date();
		var tempId = "add-"+d.getHours()+"" + d.getMinutes() + d.getSeconds()  ;
		return tempId;
	},
	clearStore:function(store){
		
		count =  store.getCount();
		for(var i = 0 ; i < count ; i++){
			store.removeAt(0);
		}
	},
	fillStoreToStore:function(storeS, storeT){
		
		storeS.each(function(record)  
				{  
			storeT.add(record);
				});
	},
	loadStoreByCadastreId:function(storeTarget, CadastreId, srvcId){
		
		storeTarget.getProxy().extraParams = {
			CADASTRE_ID: CadastreId,
			SRVC_ID: srvcId
		};
		storeTarget.load();
		storeTarget.commitChanges();

	},
	dochangchuc : function(so, daydu) {
		var chuoi = "";
		chuc = Math.floor(so / 10);
		donvi = so % 10;
		if (chuc > 1) {
			chuoi = " " + mangso[chuc] + " mươi";
			if (donvi == 1) {
				chuoi += " mốt";
			}
		} else if (chuc == 1) {
			chuoi = " mười";
			if (donvi == 1) {
				chuoi += " một";
			}
		} else if (daydu && donvi > 0) {
			chuoi = " lẻ";
		}
		if (donvi == 5 && chuc > 1) {
			chuoi += " lăm";
		} else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
			chuoi += " " + mangso[donvi];
		}
		return chuoi;
	},
	docblock : function(so, daydu) {
		var chuoi = "";
		tram = Math.floor(so / 100);
		so = so % 100;
		if (daydu || tram > 0) {
			chuoi = " " + mangso[tram] + " trăm";
			chuoi += this.dochangchuc(so, true);
		} else {
			chuoi = this.dochangchuc(so, false);
		}
		return chuoi;
	},
	dochangtrieu : function(so, daydu) {
		var chuoi = "";
		trieu = Math.floor(so / 1000000);
		so = so % 1000000;
		if (trieu > 0) {
			chuoi = this.docblock(trieu, daydu) + " triệu";
			daydu = true;
		}
		nghin = Math.floor(so / 1000);
		so = so % 1000;
		if (nghin > 0) {
			chuoi += this.docblock(nghin, daydu) + " nghìn";
			daydu = true;
		}
		if (so > 0) {
			chuoi += this.docblock(so, daydu);
		}
		return chuoi;
	},
	docso : function(so) {
		if (so == 0)
			return mangso[0];
		var chuoi = "", hauto = "";
		do {
			ty = so % 1000000000;
			so = Math.floor(so / 1000000000);
			if (so > 0) {
				chuoi = this.dochangtrieu(ty, true) + hauto + chuoi;
			} else {
				chuoi = this.dochangtrieu(ty, false) + hauto + chuoi;
			}
			hauto = " tỷ";
		} while (so > 0);
		return chuoi;
	},
	docPhanThapPhan : function(so) {
		var result = "";
		for (var i in so) {
			result += " " + mangso[so[i]];
		}
		return result;
	},
	
	docSoCoPhanThapPhan : function (so) {
		var index1 = so.indexOf(','); 
		var index2 = so.indexOf('.');
		
		if(index1 != -1) {
			var string1 = so.substring(0, index1);
			var string2 = so.substring(index1 + 1, so.length);
			
			return this.docso(string1) + ' phẩy' + this.docPhanThapPhan(string2);
		}
		else if(index2 != -1) {
			var string1 = so.substring(0, index2);
			var string2 = so.substring(index2 + 1, so.length);
			
			return this.docso(string1) + ' phẩy' + this.docPhanThapPhan(string2);
		}
		else {
			return this.docso(so);
		}
	},
	msgWarning:function(title, content){
		Ext.Msg.alert(title, content);
	}
});