Ext.define('BIZ.utilities.validatorSupport', {
	partyCheckIDIsExist : function(idType, id) {
		Ext.Ajax.request({
			url : '/ladm/system/party/partyCheckIDIsExist.json',
			params : {
				"idType": idType,
				"id"	: id
			},
			scope : textfield,
			success : function(response) {
				if (response.responseText) {
					
				} else {
					
				}
			}
		});
	}
});