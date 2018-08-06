/**
 * 
 */
var dateTool = Ext.create('BIZ.utilities.formatSupporter');

Ext.define('BIZ.utilities.GridSupporter', {
	changeStateCRUDButton : function(container, mode) {

		var addBtn = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=add]')[0];				
		var updBtn = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=update]')[0];
		var updBtn1 = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=update1]')[0];
		var delBtn = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=del]')[0];
		console.log('delBtn',delBtn);
		//Chau Bui adding
		var addBtnParty = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=addParty]')[0];				
		var updBtnParty = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=updateParty]')[0];
		var delBtnParty = Ext.ComponentQuery.query(container + ' container > gridpanel button[action=delParty]')[0];
		var groupType = Ext.getCmp('PARTYGROUP_TYPE');
		var grid = Ext.ComponentQuery.query('#invOwnerGrid')[0];
		//End Chau Bui adding
		
		if (mode == 'select') {
			if (addBtn != null) {
				addBtn.setDisabled(true);
			}
			if (updBtn != null) {
				updBtn.setDisabled(false);
			}
			if (updBtn1 != null) {
				updBtn1.setDisabled(false);
			}
			if (delBtn != null) {
				delBtn.setDisabled(false);
			}
			
			//Chau Bui adding

			if(groupType && addBtnParty && updBtnParty && delBtnParty) {
				var numberOfRecords = grid.getStore().getCount();
				addBtnParty.setDisabled(true);
				updBtnParty.setDisabled(false);
				delBtnParty.setDisabled(false);
			}
			//End of Chau Bui adding

		} else if (mode == 'reset') {
			if (addBtn != null) {
				addBtn.setDisabled(false);
			}
			if (updBtn != null) {
				updBtn.setDisabled(true);
			}
			if (updBtn1 != null) {
				updBtn1.setDisabled(true);
			}
			if (delBtn != null) {
				delBtn.setDisabled(true);
			}
			
			//Chau Bui adding

			if(groupType && addBtnParty && updBtnParty && delBtnParty) {
				var numberOfRecords = grid.getStore().getCount();
				if(groupType.getValue() == 'C1001') { //Cá nhân
					if(numberOfRecords != 0) {
						addBtnParty.setDisabled(true);
						updBtnParty.setDisabled(true);
						delBtnParty.setDisabled(true);						
					} else {
						addBtnParty.setDisabled(false);
						updBtnParty.setDisabled(true);
						delBtnParty.setDisabled(true);
					} 
					
				}
				if(groupType.getValue() == 'C1002') { //Hộ gia đình
					addBtnParty.setDisabled(false);
					updBtnParty.setDisabled(true);
					delBtnParty.setDisabled(true);	
				}
				if(groupType.getValue() == 'C1003') { //Đồng sở hữu
					addBtnParty.setDisabled(false);
					updBtnParty.setDisabled(true);
					delBtnParty.setDisabled(true);	
				}
				if(groupType.getValue() == 'C1004') { //Vợ chồng
					if(numberOfRecords > 1) {
						addBtnParty.setDisabled(true);
						updBtnParty.setDisabled(true);
						delBtnParty.setDisabled(true);						
					} else {
						addBtnParty.setDisabled(false);
						updBtnParty.setDisabled(true);
						delBtnParty.setDisabled(true);
					}
				}
			}
			//End of Chau Bui adding
		}

	},
	cancelSelect : function(container) {
		this.changeStateCRUDButton(container, 'reset');
		var gridList = Ext.ComponentQuery.query(container + ' grid');
		for (var i in gridList) {
			gridList[i].getSelectionModel().deselectAll();
		}
	},
	cancelSelectWithoutChangeState : function(gridItemId) {
		var gridList = Ext.ComponentQuery.query('#' + gridItemId);
		for (var i in gridList) {
			gridList[i].getSelectionModel().deselectAll();
		}
	},
	clearInputField :function(container) {
		var fList = Ext.ComponentQuery.query(container + ' textfield');
		for (var i in fList) {
			if(fList[i].getXType() == 'textfield'||fList[i].getXType() =='hidden') {
				fList[i].setValue('');
			}
		}
	},
	/**
	 * @author Nguyen
	 * @param Store, Store, ExtInfoType, ExtInfoId
	 * @description fill data from source store to target store 
	 */
	setShareListStore:function( sourceStore, targetStore, ext_info_type, ext_info_id){
		sourceStore.each(function(srecord){  
			var isHave = false;
			targetStore.each(function(trecord)  
					{  
						tparty_id = trecord.data["PARTY_ID"];
						sparty_id = srecord.data["PARTY_ID"];
						if(tparty_id == sparty_id){
							isHave = true;
						}
					},this);
			if(!isHave){
				targetStore.add({
					PARTY_ID: srecord.data["PARTY_ID"],
					EXT_INFO_TYPE: ext_info_type,
					EXT_INFO_ID: ext_info_id,
					SHARE_RT: 1,
					PARTY_NM : srecord.data["NM"]
				});
			}
		});
	},
	/**
	 * @author Nguyen
	 * @param Store, Store, ExtInfoType, ExtInfoId
	 * @description init fill data from source store to target store 
	 */
	setInitShareListStore:function( sourceStore, targetStore, ext_info_type, ext_info_id){
		sourceStore.each(function(srecord){  
			var isHave = false;
			targetStore.each(function(trecord)  
					{  
						tparty_id = trecord.data["PARTY_ID"];
						sparty_id = srecord.data["PARTY_ID"];
						if(tparty_id == sparty_id){
							isHave = true;
						}
					},this);
			if(!isHave){
				targetStore.add({
					PARTY_ID: srecord.data["PARTY_ID"],
					EXT_INFO_TYPE: ext_info_type,
					EXT_INFO_ID: ext_info_id,
					SHARE_RT: null,
					PARTY_NM : srecord.data["NM"]
				});
			}
		});
	},
	/**
	 * @author Nguyen
	 * @param Store, Store, ExtInfoType, ExtInfoId
	 * @description fill data from source store to target store 
	 */
	updateShareStore:function( sourceStore, targetStore){
		
		targetStore.clearFilter(true);
		console.log('getCount 1 = '+targetStore.getCount()+"sourceStore : "+sourceStore.getCount());
		var count = 0;
		sourceStore.each(function(trecord)  
					{  
						tparty_id = trecord.data["RRR_ID"];
						console.log('RRR_ID = '+count+" / "+tparty_id);
						count++;
						if(tparty_id.length < 1){
							targetStore.add(trecord);
							console.log('getCount = '+targetStore.getCount());
						}
						else{
							targetStore.each(function(tcord){
								party_id = tcord.data["RRR_ID"];
								if(party_id == tparty_id){
									tcord.set('SHARE_RT',trecord.data['SHARE_RT']) ;
								}
							});  
						}
					});
		removeRecord = sourceStore.getRemovedRecords();
		console.log('length = '+removeRecord.length);
		for(var i = 0; i < removeRecord.length ; i++){
			
			console.log('PARTY_NM = '+removeRecord[i].data['PARTY_NM']);
			targetStore.remove(removeRecord[i]);
		}
	},
	/**
	 * @author Nguyen
	 * @param Store, Store, ExtInfoType, ExtInfoId
	 * @description fill data from source store to target store 
	 */
	updateShareStoreReg:function( sourceStore, targetStore){
		
		targetStore.clearFilter(true);
		console.log('getCount 1 = '+targetStore.getCount()+"sourceStore : "+sourceStore.getCount());
		var count = 0;
		
	    // 1. Update Value
		sourceStore.each(function(trecord)  
					{  
						rrr_id_source = trecord.data["RRR_ID"];
						console.log('RRR_ID = '+count+" / "+rrr_id_source);
						count++;
						if(rrr_id_source.length < 1){
							targetStore.add(trecord);
							console.log('getCount = '+targetStore.getCount());
						}
						else{
							targetStore.each(function(tcord){
								party_id = tcord.data["RRR_ID"];
								if(party_id == rrr_id_source){
									tcord.set('SHARE_RT',trecord.data['SHARE_RT']) ;
								}
							});  
						}
					});
		
		//2. Update deleted record
		removedRecord = sourceStore.getRemovedRecords();
	    Ext.each(removedRecord, function(record){
	    	
	    	rrrId = record.data["RRR_ID"];
	    	if(rrrId != null && rrrId.length > 10){
	    	targetStore.each(function(tcord){
				tRrrId = tcord.data["RRR_ID"];
				if(tRrrId == rrrId){
					tcord.set('STATUS','DELETED') ;
				}
			}); 
	    	}
	    });
	},
	/* START NGUYENNV ADD */
	selectGridReloadShare:function(assetType, idAsset, idGrid, isFilter, shareValue){
		
		var extInfoType = assetType;
		
		var tempStore = Ext.create('LA.store.OwnerStore');
		// 1. FILTER
		var shareRTStore = Ext.getCmp(idGrid).getStore();
		
		if(isFilter == true){
			
			shareRTStore.clearFilter(true);
			console.log("1111 getCount = "+ shareRTStore.getCount());
		    shareRTStore.filter({
				  property: 'EXT_INFO_ID',
				  value: idAsset
				});
		}
		// 3. Request to server to get list party
		tempStore.getProxy().extraParams = {
			srvcId: srvcId
		};
		tempStore.load();
		console.log("2222 getCount = "+ shareRTStore.getCount());
		tempStore.on('load',function (store, records, successful, eOpts ){
			console.log("3333 ");
			var i = 0;
		     //Block of codes
		     Ext.each(records, function(record) {
		    	    i++;
		    	    console.log('iii  = '+i);
		    	    console.log("44444 i =  "+ i);
			    	var partyType = record.data['PARTY_TYPE']  ;
			    	var ownerName = "";
			    	if(partyType != null 
			    			 && partyType.trim() == "C1002"){
			    		ownerName = "[Sở hữu chung]";
			    	 }else{
			    		 ownerName = record.data['NM'];
			    	 }
			    	console.log("55555 ownerName =  "+ ownerName);
		    		 isExist = false;
			    	 var party_id = record.data['PARTY_ID']  ;
			    	 // 3.1. CHECKING EXIST
				    	 shareRTStore.findBy (function(rec) {
					    	 partyId = rec.get('PARTY_ID') ;
							 extInfoId = rec.get('EXT_INFO_ID') ;
					         if(partyId.trim() == party_id.trim() && extInfoId.trim() == idAsset.trim())
					           	   {
					                  	isExist = true;
					                  	console.log('Exist = '+isExist);
					               }
					               else {
					                    	console.log('Exist = '+isExist);
					                    }
				               });
					// 3.2. ADD TO STORE
				    	 console.log("66666  =  "+ party_id+" / "+ownerName+" / "+ idAsset+" / "+extInfoType);
						if(isExist == false){
							shareRTStore.add({
								PARTY_ID: party_id,
								PARTY_NM : ownerName, 
								EXT_INFO_ID: idAsset, 
								EXT_INFO_TYPE: extInfoType,
								SHARE_RT: shareValue
							});
						}
						else console.log('Status = '+'NO');		    	 
             });
		});	
		this.gridFilter(idGrid, '', idAsset);
	},
	checkPartyExistInShareRT:function( _partyId, _shareStore){
		
		var isExist = false;
		_shareStore.findBy (function(rec) {
	    	 partyId = rec.get('PARTY_ID') ;
			 extInfoId = rec.get('EXT_INFO_ID') ;
	         if(_partyId.trim() == partyId.trim())
	           	   {
	                  	isExist = true;
	                  	return isExist;
	                  	console.log('Exist = '+isExist);
	               }
	               else {
	                    	console.log('Exist = '+isExist);
	                    }
              });
		return isExist;
	},
	setShareDefault:function(partyStore, extInfoType, idAsset, shareRTStore, shareValue){
		
		// 1. FILTER
		/*var shareRTStore = Ext.getCmp(idGrid).getStore();
					
		shareRTStore.clearFilter(true);
		shareRTStore.filter({
				  property: 'EXT_INFO_ID',
				  value: idAsset
			});*/
		
		if(shareRTStore.getCount() > 0){
			return;
		}
		
		partyCount = partyStore.getCount();
		if(partyCount == 1){
			partyStore.each(function(record) {
				
				shareRTStore.add({
					PARTY_ID: 	record.data['PARTY_ID'],
					PARTY_NM : 	record.data['NM'], 
					EXT_INFO_ID: idAsset, 
					EXT_INFO_TYPE: extInfoType,
					SHARE_RT: shareValue
				});
			});
			return;
		}
		else if(partyCount > 1){
			partyStore.each(function(record) {
				
				partyType = record.data['PARTY_TYPE']  ;
		    	ownerName = record.data['NM'];
		    	console.log('ownerName = '+record.data['NM']);
		    	if(partyType != null 
		    			 && partyType.trim() == "C1002"){
		    		ownerName = "[Sở hữu chung]";
		    		shareRTStore.add({
						PARTY_ID: 	record.data['PARTY_ID'],
						PARTY_NM : 	ownerName, 
						EXT_INFO_ID: idAsset, 
						EXT_INFO_TYPE: extInfoType,
						SHARE_RT: shareValue
					});
		    	 }
			});
			return;
		}
	},
	selectFilterShare:function(assetType, rcordId, idGrid){
		var idAsset = rcordId;
		var extInfoType = assetType;
		
		
		// 1. FILTER
		var OwnerShipHouseStore = Ext.getCmp(idGrid).getStore();
		OwnerShipHouseStore.clearFilter(true);
	    OwnerShipHouseStore.filter({
			  property: 'EXT_INFO_ID',
			  value: idAsset
			});
	},
	gridFilter:function(gridId, property, values){
		
		var OwnerShipHouseStore = Ext.getCmp(gridId).getStore();
		OwnerShipHouseStore.clearFilter(true);
	    OwnerShipHouseStore.filter({
			  property: 'EXT_INFO_ID',
			  value: values
			});
	},
	
	selectGridAsset : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		var itemData = tmpModel.data;
//		console.log(itemData);
		for (var key in itemData) {
			if(key == 'HOUS_APT_ID'){
				console.log('HOUS_APT_ID = '+key);
				this.gridFilter('ownershipHouseGrid','',itemData[key]);
			}
			else if(key == 'FORST_ID'){
				console.log('FORST_ID = '+key+" / "+itemData[key]);
				this.gridFilter('idForest-SubGrid','',itemData[key]);
			}
			else if(key == 'ETCASSET_ID'){
				console.log('ETCASSET_ID = '+key+" / "+itemData[key]);
				this.gridFilter('idEtc-SubGrid','',itemData[key]);
			}
			
			
			if (Ext.ComponentQuery.query(container + ' #' + key).length > 0) {
				var cmp = Ext.ComponentQuery.query(container + ' #' + key)[0];
				if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
					cmp.setValue(itemData[key].toString().replace(/\s/g, ''));
				} else if (cmp.getXType() == 'radiogroup') {
					if (itemData[key].toString().replace(/\s/g, '') == 'C1001') {
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else if(itemData[key].toString().replace(/\s/g, '') == 'CNC01'){
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else {
						cmp.items.items[0].setValue(false);
						cmp.items.items[1].setValue(true);
					}
				} else if (cmp.getXType() == 'checkboxfield') {
					var flag = false;
					if (itemData[key] == 'Y')
						flag = true;
					else if(itemData[key] == 'true')
						flag = true;
					cmp.setValue(flag);
				} else {
					cmp.setValue(itemData[key]);
				}

			}
		}
	},
	selectGridRecord : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query(gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		var itemData = tmpModel.data;
		console.log(itemData);
		for (var key in itemData) {
			if (Ext.ComponentQuery.query(container + ' #' + key).length > 0) {
				var cmp = Ext.ComponentQuery.query(container + ' #' + key)[0];
				if(cmp.getId() != 'REPRESENTATIVE_YN1' && cmp.getId() != 'MATE_YN1') {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						cmp.setValue(itemData[key].toString().replace(/\s/g, ''));
					} else if (cmp.getXType() == 'radiogroup') {
						if (itemData[key].toString().replace(/\s/g, '') == 'C1001') {
							cmp.items.items[0].setValue(true);
							cmp.items.items[1].setValue(false);
						}
						else if(itemData[key].toString().replace(/\s/g, '') == 'CNC01'){
							cmp.items.items[0].setValue(true);
							cmp.items.items[1].setValue(false);
						}
						else {
							cmp.items.items[0].setValue(false);
							cmp.items.items[1].setValue(true);
						}
					} else if (cmp.getXType() == 'checkboxfield') {
						var flag = false;
						if (itemData[key] == 'Y')
							flag = true;
						cmp.setValue(flag);
					} else {
						if(cmp.getItemId() != 'REPRESENTATIVE_YN1' && cmp.getItemId() != 'MATE_YN1') {
							cmp.setValue(itemData[key]);
						}
					}
	
				}
			}
		}
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'select');
	},
	selectPartyGridRecord : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0];

		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
//		console.log(tmpModel);
		var itemData = tmpModel.data;
		// console.log(itemData);
		if(itemData['MATE_DEPEND'] != null && itemData['MATE_DEPEND'].toString() == 'Y') {
			Ext.MessageBox.alert('Status', 'Nếu muốn thay đổi thông tin vợ/chồng của người đại diện xin hãy chọn người đại diện!');
		}
		for (var key in itemData) {
			
			if (Ext.ComponentQuery.query(container + ' #' + key).length > 0) {
				var cmp = Ext.ComponentQuery.query(container + ' #' + key)[0];
				if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
					cmp.setValue(itemData[key].toString().replace(/\s/g, ''));
				} else if (cmp.getXType() == 'radiogroup') {
					if (itemData[key].toString().replace(/\s/g, '') == 'C1001') {
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else if(itemData[key].toString().replace(/\s/g, '') == 'CNC01'){
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else {
						cmp.items.items[0].setValue(false);
						cmp.items.items[1].setValue(true);
					}
				} else if (cmp.getXType() == 'checkboxfield') {
					var flag = false;
					if (itemData[key] == 'Y')
						flag = true;
					cmp.setValue(flag);
				} else {
					cmp.setValue(itemData[key]);
				}

			}
		}
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'select');
	},	
	updateGridRecord : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'radiogroup') {
						tmpModel.set(id, cmp.getChecked()[0].inputValue);
					} else {
						tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		tmpModel.endEdit();
		tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
	},
	/* START NGUYENNV ADD */
	addGridRecordAssets : function(container, gridItemId, modelName, tempId) {
		
		var tmpStore = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0]
				.getStore();
		var tmpModel = Ext.create(modelName, {});
		//var cmp = null;
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
			if (id != 'id') {
				if (id.indexOf('SPTLUNIT_ID') > -1) {
					tmpModel.set(id,
							Ext.ComponentQuery.query('#spuid_asset')[0]
									.getValue());
				}
				if(modelName == 'LA.model.BuldgModel' && id == 'BULDG_ID'){
					tmpModel.set(id, tempId);
				}
				else if(id == 'HOUS_APT_ID' 
							|| id == 'FORST_ID'
								|| id == 'ETCASSET_ID'
									|| id == 'BULDG_ITEM_ID'){
					tmpModel.set(id, tempId);
				}
				else {
					var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
					if (cmp != null) {
						if (cmp.getXType() == 'datefield'
								&& cmp.getValue() != null) {
							var dateField = dateTool.convertToVarchar8(cmp
									.getValue().toString());
							tmpModel.set(id, dateField);
						}
						else if (cmp.getXType() == 'radiogroup') {
							 cmp = Ext.ComponentQuery.query('#HOUS_APT_TYPE')[0];
							if (cmp && cmp.getChecked().length > 0) {
								tmpModel.set(id, cmp.getChecked()[0].inputValue);
							}
						}
						else if (cmp.getXType() == 'simplecombobox') {
							tmpModel.set(id, cmp.getValue());
							tmpModel.set(id+'_NM', cmp.getRawValue());
							}
						else
							tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		tmpModel.set('STATUS', 'CREATE');
		tmpStore.add(tmpModel);
	},
	/* START NGUYENNV ADD */
	addGridRecord : function(container, gridItemId, modelName) {
		var tmpStore = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0]
				.getStore();
		var tmpModel = Ext.create(modelName, {});
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				if (id.indexOf('SPTLUNIT_ID') > -1) {
					tmpModel.set(id,
							Ext.ComponentQuery.query('#spuid_asset')[0]
									.getValue());
				} else {
					var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
					if (cmp != null) {
						if (cmp.getXType() == 'datefield'
								&& cmp.getValue() != null) {
							var dateField = dateTool.convertToVarchar8(cmp
									.getValue().toString());
							tmpModel.set(id, dateField);
						}
						else if (cmp.getXType() == 'radiogroup') {
							var cmp = Ext.ComponentQuery.query('#HOUS_APT_TYPE')[0];
							if (cmp.getChecked().length > 0) {
								tmpModel.set(id, cmp.getChecked()[0].inputValue);
							}
						}
						else
							tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		tmpModel.set('STATUS', 'CREATE');
		tmpStore.add(tmpModel);
		//tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
	},
	updateGridRecordTab2 : function(container, gridItemId) {

		var resGrid = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0];	
		console.log(resGrid.getStore());
		if(resGrid.getSelectionModel().getSelection().length>0){
			var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		}
		else {
			var tmpModel = resGrid.getStore().getUpdatedRecords()[0];	
			
		}
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'combobox') {
						tmpModel.set(id, cmp.getValue());
						if(id=='PARTY_ID')
							tmpModel.set('NM', cmp.getRawValue());
						else
							tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'datefield' && cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp
								.getValue().toString());
						tmpModel.set(id, dateField);
					} else if (cmp.getXType() == 'radiogroup') {
						tmpModel.set(id, cmp.getChecked()[0].inputValue);
					} else if (cmp.getXType() == 'checkboxfield') {
						if (cmp.getValue() == false) {
							tmpModel.set(id,'N');
						} else
						if (cmp.getValue() == true){
							tmpModel.set(id,'Y');
						}

					} else {
						tmpModel.set(id, cmp.getValue());
					}
				}
				if (id.indexOf('action') > -1) {
					if (tmpModel.get(id) == '') {
						tmpModel.set(id, 'upd');
					}
				}
			}
		}

		tmpModel.endEdit();
		tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');

	},
	addGridRecordTab2 : function(container, gridItemId, modelName) {
		var tmpStore = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0]
				.getStore();
		var tmpModel = Ext.create(modelName, {});
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'combobox') {
						tmpModel.set(id, cmp.getValue());
						if(id=='PARTY_ID')
							tmpModel.set('NM', cmp.getRawValue());
						else
							tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'datefield' && cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp
								.getValue().toString());
						tmpModel.set(id, dateField);
					} else {
						if(cmp.getId() != 'MATE_YN1' && cmp.getId() != 'REPRESENTATIVE_YN1') {
							tmpModel.set(id, cmp.getValue());
						}
					}
				}
			}
		}
		tmpModel.set('action', 'add');
		tmpStore.add(tmpModel);
		tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
		
	},
	updatePartyGridRecord : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query('#' + gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					}
					if (cmp.getXType() == 'radiogroup') {
						var cmp = Ext.ComponentQuery.query('#GENDER_TYPE')[0];
						if (cmp.getChecked().length > 0) {
							tmpModel.set(id, cmp.getChecked()[0].inputValue);
							if (cmp.getChecked()[0].inputValue == 'C1001') {
								tmpModel.set('GENDER_TYPE_NM', 'Nam');
							} else {
								tmpModel.set('GENDER_TYPE_NM', 'Nữ');
							}
						}
					} else if (cmp.getXType() == 'datefield'
							&& cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp
								.getValue().toString());
						tmpModel.set(id, dateField);
					} else if (cmp.getXType() == 'checkboxfield') {
						if(cmp.getValue()) {
							tmpModel.set(id, 'Y');
						}
						else {
							tmpModel.set(id, 'N');
						}
					} else {
						if(cmp.getId() != 'MATE_YN1' && cmp.getId() != 'REPRESENTATIVE_YN1' && cmp.xtype != 'checkcolumn') {
							tmpModel.set(id, cmp.getValue());
						}
					}
				}
			}
		}
		if (tmpModel.get('PARTY_ID')
				&& tmpModel.get('ACTION_STATUS') != 'insert') {
			tmpModel.set('ACTION_STATUS', 'update');
		}
		if (tmpModel.get('PARTY_ID')
				&& tmpModel.get('ACTION_STATUS') == 'insert') {
			tmpModel.set('ACTION_STATUS', 'updateInsert');
		}
		tmpModel.endEdit();
		tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
	},
	updatePartyGridRecordForZA525 : function(container, gridItemId) {
		var resGrid = Ext.ComponentQuery.query('#' + gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						if(cmp.getValue() != null && tmpModel.get(id).trim() != cmp.getValue().trim()) {
							tmpModel.set(id, cmp.getValue());
							tmpModel.set(id+'_NM', cmp.getRawValue());
						}
					}
					else if (cmp.getXType() == 'radiogroup') {
						var cmp = Ext.ComponentQuery.query('#GENDER_TYPE')[0];
						if (cmp.getChecked().length > 0) {
							if(tmpModel.get(id) != cmp.getChecked()[0].inputValue) {
								tmpModel.set(id, cmp.getChecked()[0].inputValue);
								if (cmp.getChecked()[0].inputValue == 'C1001') {
									tmpModel.set('GENDER_TYPE_NM', 'Nam');
								} 
								else {
									tmpModel.set('GENDER_TYPE_NM', 'Nữ');
								}
							}
						}
					} 
					else if (cmp.getXType() == 'datefield'
							&& cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp.getValue().toString());
						if(tmpModel.get(id) != dateField) {
							tmpModel.set(id, dateField);
						}
					} 
					else if (cmp.getXType() == 'checkboxfield') {
						if(cmp.getValue()) {
							if(tmpModel.get(id) != 'Y') {
								tmpModel.set(id, 'Y');
							}
						}
						else {
							if(tmpModel.get(id) != 'N') {
								tmpModel.set(id, 'N');
							}
						}
					} 
					else {
						if(cmp.getId() != 'MATE_YN1' && cmp.getId() != 'REPRESENTATIVE_YN1' && cmp.xtype != 'checkcolumn') {
							if(tmpModel.get(id) != cmp.getValue()) {
								tmpModel.set(id, cmp.getValue());
							}
						}
					}
				}
			}
		}
		if (tmpModel.get('PARTY_ID')
				&& tmpModel.get('ACTION_STATUS') != 'insert') {
			tmpModel.set('ACTION_STATUS', 'update');
		}
		if (tmpModel.get('PARTY_ID')
				&& tmpModel.get('ACTION_STATUS') == 'insert') {
			tmpModel.set('ACTION_STATUS', 'updateInsert');
		}
		tmpModel.endEdit();
		// tmpStore.commitChanges();
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
	},
	convertDate : function(str, mode) {
		var mnths = {
			Jan : "01",
			Feb : "02",
			Mar : "03",
			Apr : "04",
			May : "05",
			Jun : "06",
			Jul : "07",
			Aug : "08",
			Sep : "09",
			Oct : "10",
			Nov : "11",
			Dec : "12"
		}, date = str.split(" ");
		if (mode == 'ymd') {
			return [date[3], mnths[date[1]], date[2]].join("");
		} else if (mode == 'y') {
			return date[3];
		} else
			return null;
	},
	/* START NGUYENNV ADD */
	selectGridPopup : function(container, gridItemId, popupContainer) {
		
//		console.log("container = "+container+' gridItemId='+gridItemId+" popupContainer="+popupContainer);
		var resGrid = Ext.ComponentQuery.query(container + ' ' + gridItemId)[0];
		var tmpModel = resGrid.getSelectionModel().getSelection()[0];
		var itemData = tmpModel.data;
		
		if(gridItemId == '#iHouseGrid'){
			var houseType = itemData['HOUS_APT_TYPE'];
			var cmp = Ext.ComponentQuery.query(popupContainer + ' #HOUS_APT_TYPE')[0];
			cmp.setValue(houseType);
		}
		
		console.log('itemData',itemData);
		for (var key in itemData) {
			if (Ext.ComponentQuery.query(popupContainer + ' #' + key).length > 0) {
				var cmp = Ext.ComponentQuery.query(popupContainer + ' #' + key)[0];
				if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {					
					cmp.setValue(itemData[key]);					
				} else if (cmp.getXType() == 'radiogroup') {
					if (itemData[key].toString().replace(/\s/g, '') == 'C1001') {
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else if(itemData[key].toString().replace(/\s/g, '') == 'CNC01'){
						cmp.items.items[0].setValue(true);
						cmp.items.items[1].setValue(false);
					}
					else {
						cmp.items.items[0].setValue(false);
						cmp.items.items[1].setValue(true);
					}
				} else if (cmp.getXType() == 'checkboxfield') {
					var flag = false;
					if (itemData[key] == 'Y')
						flag = true;
					else if(itemData[key] == 'true')
						flag = true;
					cmp.setValue(flag);
				} else {
					cmp.setValue(itemData[key]);
				}

			}
		}
	},
	addPopupToGrid : function(container, gridItemId, modelName, tempId, sptUnitId) {
		
		var tmpStore = Ext.ComponentQuery.query(gridItemId)[0]
				.getStore();
		var tmpModel = Ext.create(modelName, {});
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				if(id == 'HOUS_APT_ID' 
							|| id == 'FORST_ID'
								|| id == 'ETCASSET_ID'
									|| id == 'BULDG_ID'
										|| id == 'BULDG_ITEM_ID'
											|| id == 'LANDUSEPUPOS_ID'){
					tmpModel.set(id, tempId);
				}
				else {
					var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
					if (cmp != null) {
						if (cmp.getXType() == 'datefield'
								&& cmp.getValue() != null) {
							var dateField = dateTool.convertToVarchar8(cmp
									.getValue().toString());
							tmpModel.set(id, dateField);
						}
						else if (cmp.getXType() == 'radiogroup') {
							var cmp = Ext.ComponentQuery.query('#HOUS_APT_TYPE')[0];
							if (cmp && cmp.getChecked().length > 0) {
								tmpModel.set(id, cmp.getChecked()[0].inputValue);
							}
						}
						else if (cmp.getXType() == 'simplecombobox') {
							tmpModel.set(id, cmp.getValue());
							tmpModel.set(id+'_NM', cmp.getRawValue());
						}
						else
							tmpModel.set(id, cmp.getValue());
					}
				}
			}
		}
		if(modelName == 'CH.model.itemModel'){
			tmpModel.set('BULDG_ID', G_PARENT_ID);
		}
		if(modelName == 'LA.model.LandUsePuposModel'){
			tmpModel.set('LR_ID', G_PARENT_ID);
		}
		tmpModel.set('STATUS', 'CREATE');
		tmpModel.set('SPTLUNIT_ID', sptUnitId);
		tmpStore.add(tmpModel);
		//tmpStore.commitChanges();
	},
	/* END NGUYENN ADD */ 	
	showHideContainerByItemId:function (itemId,flag){
		var luc1=Ext.ComponentQuery.query('#'+itemId)[0];
		luc1.setVisible(flag);		
	},
	//use in ZA525 - add land popup 
	updatePopupRecord:function(container, gridItemId,rowIndex){
		var resGrid = Ext.ComponentQuery.query(gridItemId)[0];
		var tmpModel = resGrid.getStore().getAt(rowIndex);
		console.log(tmpModel);
		tmpModel.beginEdit();
		var tmpStore = resGrid.getStore();
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'combobox') {
						tmpModel.set(id, cmp.getValue());
						if(id=='PARTY_ID')
							tmpModel.set('NM', cmp.getRawValue());
						else
							tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'datefield' && cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp
								.getValue().toString());
						tmpModel.set(id, dateField);
					} else if (cmp.getXType() == 'radiogroup') {
						tmpModel.set(id, cmp.getChecked()[0].inputValue);
					} else if (cmp.getXType() == 'checkboxfield') {
						if (cmp.getValue() == false) {
							tmpModel.set(id,'N');
						} else
						if (cmp.getValue() == true){
							tmpModel.set(id,'Y');
						}

					} else {
						tmpModel.set(id, cmp.getValue());
					}
				}
				if (id.indexOf('action') > -1) {
					if (tmpModel.get(id) == '') {
						tmpModel.set(id, 'upd');
					}
				}
			}
		}
		if (id.indexOf('action') > -1) {
			if(tmpModel.get('action')!='add')
				tmpModel.set('action','upd');
		}

		console.log('tmpModel',tmpModel);
		tmpModel.endEdit();
//		this.clearInputField(container);
	},
	insertPopupRecord:function(container, gridItemId, modelName) {
		var tmpStore = Ext.ComponentQuery.query(gridItemId)[0]
				.getStore();
		var tmpModel = Ext.create(modelName, {});
		var tmpModelFieldsName = tmpStore.getProxy().getModel().getFields();
		for (var i = 0; i < tmpModelFieldsName.length; i++) {
			var id = tmpModelFieldsName[i].name;
			if (id != 'id') {
				var cmp = Ext.ComponentQuery.query(container + ' #' + id)[0];
				if (cmp != null) {
					if (cmp.getXType() == 'simplecombobox' || cmp.getXType() == 'admzonecombobox') {
						tmpModel.set(id, cmp.getValue());
						tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'combobox') {
						tmpModel.set(id, cmp.getValue());
						if(id=='PARTY_ID')
							tmpModel.set('NM', cmp.getRawValue());
						else
							tmpModel.set(id+'_NM', cmp.getRawValue());
					} else
					if (cmp.getXType() == 'datefield' && cmp.getValue() != null) {
						var dateField = dateTool.convertToVarchar8(cmp
								.getValue().toString());
						tmpModel.set(id, dateField);
					} else {
						if(cmp.getId() != 'MATE_YN1' && cmp.getId() != 'REPRESENTATIVE_YN1') {
							tmpModel.set(id, cmp.getValue());
						}
					}
				}
			}
		}
		tmpModel.set('action', 'add');
		tmpStore.add(tmpModel);
		// change state of CRUD buttons
		this.changeStateCRUDButton(container, 'reset');
		
	},
	getModifiedRecords:function(storeTmp){
		
		storeTmp.clearFilter(true);
		modified = storeTmp.getModifiedRecords();
		 recordsToSend = [];
		    Ext.each(modified, function(record){
		       recordsToSend.push(record.data);
		    });
		 shareData = Ext.encode(recordsToSend);
		 return shareData;
	},
	getUpdatedRecords:function(storeTmp){
		
		modified = storeTmp.getUpdatedRecords();
		 recordsToSend = [];
		    Ext.each(modified, function(record){
		       recordsToSend.push(record.data);
		    });
		 shareData = Ext.encode(recordsToSend);
		 return shareData;
	},
	/**
	 * @author Nguyen
	 * @description get list modified record
	 *  
	 */
	getNewRecords:function(storeTmp){
		
		 modified = storeTmp.getNewRecords();
		 recordsToSend = [];
		    Ext.each(modified, function(record){
		       recordsToSend.push(record.data);
		    });
		 shareData = Ext.encode(recordsToSend);
		 return shareData;
	},
	getRemovedRecords:function(storeTmp, recordsToSend){
		// recordsToSend = [];
		removedRecord = storeTmp.getRemovedRecords();
		    Ext.each(removedRecord, function(record){
		       recordsToSend.push(record.data);
		    });
		    shareData = Ext.encode(recordsToSend);
		 return shareData;
	},
	toHexString: function(source){
	    var result = "";
	    for(var i = 0; i < source.length; i++){
	        result += "\\u" + ("000" + source[i].charCodeAt(0).toString(16)).substr(-4);
	    }
	    return result;
	},
	calculateMoney:function(targetStore){
		var totalMoney = 0;
		targetStore.each(function(record)  
		{  
				var price = record.data["PRICE"];
				var amount = record.data["AMOUNT"];
				var total = price * amount;
				totalMoney = totalMoney + total
				
		},this);
		return totalMoney;
	},
	checkGridIsChanged : function(targetStore){
		var modifyRecord = targetStore.getModifiedRecords();
		var removeRecord = targetStore.getRemovedRecords();
		
		if(modifyRecord.length > 0 || removeRecord.length > 0){
			console.info(modifyRecord.length + " / "+removeRecord.length);
			return true;
		}
		return false;
	}
});