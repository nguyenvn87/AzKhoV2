/**
 * @author: Nguyennv Date: 20/06/2014 Description: form display land information
 * 
 */

Ext.define('LAFORM.containerCommon', {
	getContainer : function(idBtn, textNM, isOccupy) {
		//var clsbutton = 'arrow-box-empty';
		var clsbutton = '';
		if(isOccupy == true){
			clsbutton = 'arrow-box-occupy'
		}
		return {
			/*xtype : 'container',
			cls: 'leftmenu-room-btn',
			layout : {
				align : 'stretch',
				type : 'vbox'
					},
			items : [ 
				{*/
					xtype : 'button',
					cls : clsbutton,
					itemId : idBtn,
					minHeight: 25,
					name: 'roombtn',
					text : textNM
				//} 
			//]
		}

	}

});