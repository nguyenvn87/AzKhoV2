Ext.define('BIZ.utilities.collapseExpanseSupport', {
	setHideShow : function(mainContainerId, showObjItem, hideObjItem, showButtonItem, hideButtonItem) {
		var showObjsSelector = '#' + mainContainerId + ' [cls*="' + showObjItem + '"]';
		var hideObjsSelector = '#' + mainContainerId + ' [cls*="' + hideObjItem + '"]';
		var showButtonsSelector = '#' + mainContainerId + ' [cls*="' + showButtonItem + '"]';
		var hideButtonsSelector = '#' + mainContainerId + ' [cls*="' + hideButtonItem + '"]';
		
		var showObjs = Ext.ComponentQuery.query(showObjsSelector);
		var hideObjs = Ext.ComponentQuery.query(hideObjsSelector);
		var showButtons = Ext.ComponentQuery.query(showButtonsSelector);
		var hideButtons = Ext.ComponentQuery.query(hideButtonsSelector);
		
		if(showObjs.length == 0) {
			var showObjsSelector = '#' + mainContainerId + ' container[cls="' + showObjItem + '"]';
			var showObjs = Ext.ComponentQuery.query(showObjsSelector);
		}
		
		if(hideObjs.length == 0) {
			var hideObjsSelector = '#' + mainContainerId + ' container[cls="' + hideObjItem + '"]';
			var hideObjs = Ext.ComponentQuery.query(hideObjsSelector);
		}

		if(showButtons.length == 0) {
			var showButtonsSelector = '#' + mainContainerId + ' container[cls="' + showButtonItem + '"]';
			var showButtons = Ext.ComponentQuery.query(showButtonsSelector);
		}
		
		if(hideButtons.length == 0) {
			var hideButtonsSelector = '#' + mainContainerId + ' container[cls="' + hideButtonItem + '"]';
			var hideButtons = Ext.ComponentQuery.query(hideButtonsSelector);
		}
		
		var i;
		for (i = 0; i < showObjs.length; i++) {
			showObjs[i].setVisible(true);			
		}

		for (i = 0; i < hideObjs.length; i++) {
			hideObjs[i].setVisible(false);
		}

		for (i = 0; i < showButtons.length; i++) {
			showButtons[i].setVisible(true);
		}

		for (i = 0; i < hideButtons.length; i++) {
			hideButtons[i].setVisible(false);
		}
	},
	setGridShow : function(mainContainerId){
		
		var showObjsSelector = '#' + mainContainerId + ' > container > gridpanel';
		var hideObjsSelector = '#' + mainContainerId + ' > container';
		
		var showObjs = Ext.ComponentQuery.query(showObjsSelector);
		
		var hideObjs = Ext.ComponentQuery.query(hideObjsSelector);
		var i;
		for (i = 0; i < showObjs.length; i++) {
			hideObjs[i].setVisible(false);			
		}
		
		for (i = 0; i < showObjs.length; i++) {
			showObjs[i].setVisible(true);			
		}
		
	},
	expanse : function(mainContainerId, isToogleView) {
		if(isToogleView) {
			this.collapseAll();
		}
		this.setHideShow(mainContainerId, 'detailData', 'summaryData', 'foldButton', 'editButton');
		
	},

	collapse : function(mainContainerId) {
		this.setHideShow(mainContainerId, 'summaryData', 'detailData', 'editButton', 'foldButton');		
	},
	
	 

	collapseAll : function() {
		this.setHideShow('main_contentsId', 'summaryData', 'detailData', 'editButton', 'foldButton');
	},

	expanseAll : function() {
		this.setHideShow('main_contentsId', 'detailData', 'summaryData', 'foldButton', 'editButton');
	},

	showSummaryInfoOnly : function(mainContainerId) {
		var selector = '#' + mainContainerId + ' [cls=summaryContent]';
		var summaryInfoField = Ext.ComponentQuery.query(selector);
		
		if(summaryInfoField.length == 0)
		{
			var selector = '#' + mainContainerId + ' [cls*=summaryContent]';
			var summaryInfoField = Ext.ComponentQuery.query(selector);
		}
		var infoData = '';
		var summaryString = '(';
		for (var i = 0; i < summaryInfoField.length; i++) {
			infoData = summaryInfoField[i].getValue();
			
			if(infoData == '' || infoData == null) {
				continue;
			}
			
			if(i != summaryInfoField.length-1) {
				summaryString += infoData + " / ";
			}
			else {
				summaryString += infoData + ')';
			}
		}
		if(summaryString == '(') {
			summaryString = '';
		}
		
		return summaryString;
	},
	
	showSummaryInfoWithLabel : function(mainContainerId) {
		var selector = '#' + mainContainerId + ' [cls=summaryContent]';
		var summaryInfoField = Ext.ComponentQuery.query(selector);
		var labelData = '';
		var infoData = '';
		var temp = '';
		var summaryString = '( ';
		for (i = 0; i < summaryInfoField.length; i++) {
			//labelData = summaryInfoField[i].labelEl.dom.innerHTML;
			labelData = summaryInfoField[i].getFieldLabel();
			infoData = summaryInfoField[i].getValue();
			temp = labelData + ': ' + infoData;
			
			if(infoData == '' || infoData == null) {
				continue;
			}
			
			if(i != summaryInfoField.length-1) {
				summaryString += temp + " / ";
			}
			else {
				summaryString += temp + ")";
			}
		}
		if(summaryString == '( ') {
			summaryString = '';
		}
		summaryString = summaryString.trim();
		if(summaryString.substring(summaryString.length - 1) == '/') {
			var replacement = ')';
			summaryString = summaryString.replace(/\/([^\/]*)$/,replacement+'$1');
		}
		return summaryString;
	},
	
	showSummaryInfoAttachedDocs : function() {
		var summaryString = '( ';
		var grid = Ext.getCmp('id-grid-hstn');
        var store = grid.getStore();
        var recordes = store.data.items;
        recordes.forEach(function(entry) {
			if(entry.data.SUBMITTED == true) {
        		summaryString += entry.data.ORGINL_FILE_NM + ' / ';
        	}
		});
		if(summaryString == '( ') {
			summaryString = '';
		}
		summaryString = summaryString.trim();
		if(summaryString.substring(summaryString.length - 1) == '/') {
			var replacement = ')';
			summaryString = summaryString.replace(/\/([^\/]*)$/,replacement+'$1');
		}
		return summaryString;
	},
	
	showSummaryInfoLands : function() {
		var summaryString = '( ';
		var grid = Ext.getCmp('grid-parcel-list');
        var store = grid.getStore();
        var recordes = store.data.items;
        recordes.forEach(function(entry) {
    		summaryString += 'Số tờ: ' + entry.data.MAP_ID + ' - ';
    		summaryString += 'Số thửa: ' + entry.data.PARCEL_ID + ' - ';
    		summaryString += 'Tỉ lệ: ' + entry.data.PARCEL_ID + ' / ';
		});
		if(summaryString == '( ') {
			summaryString = '';
		}
		summaryString = summaryString.trim();
		if(summaryString.substring(summaryString.length - 1) == '/') {
			var replacement = ')';
			summaryString = summaryString.replace(/\/([^\/]*)$/,replacement+'$1');
		}
		return summaryString;
	},
	
	showSummaryInfoOfGrid : function(gridId) {
		var summaryString = '( ';
		var grid = Ext.ComponentQuery.query('#'+gridId)[0];
        var store = grid.getStore();
        //hasCls( className )
		var itemData = store.model.prototype.fields.keys;
		
        var recordes = store.data.items;
        
        recordes.forEach(function(entry) {	
        	for (var i = 0; i < grid.columns.length; i++) {
        		var colum = grid.columns[i];
        		
        		if(colum && colum.hasCls('summaryContent')) {
        			var trueKey;
	        		for(var key in itemData) {
	        			if(colum.dataIndex == itemData[key]) {
	        				trueKey = key;
	        			}
	        		}
					var labelData = colum.text;
					var infoData = entry.get(itemData[trueKey]);
					if (infoData) {
						summaryString += labelData + ': ' + infoData + ' - ';
					}
        		}
			}
    		summaryString = summaryString.trim();
			if(summaryString.substring(summaryString.length - 1) == '-') {
				var replacement = '/ ';
				summaryString = summaryString.replace(/-([^-]*)$/,replacement+'$1');
			}
		});
		
		
		if(summaryString == '( ') {
			summaryString = '';
		}
		summaryString = summaryString.trim();
		if(summaryString.substring(summaryString.length - 1) == '/') {
			var replacement = ')';
			summaryString = summaryString.replace(/\/([^\/]*)$/,replacement+'$1');
		}
		return summaryString;
	},
	/* START NGUYENN ADD NEW */
	hideAll:function(arrContainer){
		
		for(var i = 0; i < arrContainer.length ; i++){
			//alert(arrContainer[i]);
			var pnl = Ext.ComponentQuery.query('#'+arrContainer[i])[0];
			util.collapse(arrContainer[i]);
			pnl.doLayout();
		}
	}
	/* START NGUYENN ADD NEW */
});