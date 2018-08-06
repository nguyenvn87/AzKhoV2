Ext.define('BIZ.utilities.formatSupporter', {
	mnths : { 
	        Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
	        Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
	},
	getSimpleDateFormat: function(str) {
	    var date = str.split(' ');
	
	    return date;
	},
	getTimeStempDateFormat: function(today) {
	    var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){ dd='0'+dd } 
		if(mm<10){ mm='0'+mm } 
		date = yyyy+'-'+mm+'-'+dd;
	    return date;
	},
	getVNDay: function(today) {
	    var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){ dd='0'+dd } 
		if(mm<10){ mm='0'+mm } 
		date = dd+'-'+mm+'-'+yyyy;
	    return date;
	},
	convertToVarchar8: function(str) {
		var date = this.getSimpleDateFormat(str);
	    return [ date[3], this.mnths[date[1]], date[2] ].join('');
	},
	convertToDateLTCSearchPopup: function(str) {
		var date = this.getSimpleDateFormat(str);
	    return  date[1]+'/'+ this.mnths[date[0]]+'/'+date[2];
	},
	convertToYear: function(str) {
		var date = this.getSimpleDateFormat(str);
	    return date[3];
	},
	
	convertToDateInOracle: function(str) {
		var date = this.getSimpleDateFormat(str);
		var dateOnly = [ date[1], this.mnths[date[2]], date[3] ].join("/");
		var dateTime = dateOnly + ' ' + date[4];
	    return date[3];
	},
	
	convertToDateFromVarchar8: function(str){
		var y=str.substr(0,4);
		var m=str.substr(4,2);
		var d=str.substr(6,2);
		if(y!='')
		var dt= Ext.Date.parse(y+'-'+m+'-'+d,'Y-m-d');
		return dt;
	},
	
	convertToSonDate: function(str) {
		var date = this.getSimpleDateFormat(str);
		var dateOnly = [ date[3], this.mnths[date[1]], date[2] ].join("-");
	    return dateOnly;
	},
	convertToVNDateFromVarchar8: function(str){
		var y=str.substr(0,4);
		var m=str.substr(4,2);
		var d=str.substr(6,2);
		if(y!='')
		return d+'/'+m+'/'+y;
	},
	convertVNDateToVarchar8: function(str){
		var d=str.substr(0,2);
		var m=str.substr(3,2);
		var y=str.substr(6,4);
		if(y!='')
		return y+''+m+''+d;
	},
	formatNumber2Decimals: function(number) {
		return parseFloat(Math.round(number * 100) / 100).toFixed(2).toString();
	},
	converDigitsColor3To6: function(color) {
		if(color == '#037') {
			temp = '#003366';
		}
		else {
			var temp = '#' + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);			
		}
	    return temp;
	},
	formatToMoney: function(number){
		if(number != null){
		//return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
		else return number;
	},
	convertToVNDateFromEngDate: function(str){
		var date = this.getSimpleDateFormat(str);
		var vnDate = date[0].split('-');
	    return vnDate[2]+'/'+vnDate[1]+'/'+vnDate[0];
	},
	isNumber: function(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		},
	getEnglishDate:function(param){
		var output = [];
		var currentdate = new Date();
		var days = 0;
		var _month = currentdate.getMonth();
		_month = _month + 1;
		// This month
		if(param == 'MONTH'){
			_year = currentdate.getFullYear();
			days = new Date(_year, _month, 0).getDate();
			if(_month < 10) _month = '0'+_month;
			output[0] = _year + '-' + _month + '-01';
			output[1] = _year + '-' + _month + '-'+ days + ' '+'23:59:59';
		}
		if(param == 'TODAY'){
			_year = currentdate.getFullYear();
			if(_month < 10) _month = '0'+_month;
			output[0] = _year + '-' + _month + '-'+ currentdate.getDate() + ' '+'00:00:01';
			output[1] = _year + '-' + _month + '-'+ currentdate.getDate() + ' '+'23:59:59';
		}
		if(param == 'YEAR'){
			_year = currentdate.getFullYear();
			var noOfday = new Date(_year, 12, 0).getDate();
			output[0] = _year + '-' + '01' + '-'+ '01' + ' '+'00:00:00';
			output[1] = _year + '-' + '12' + '-'+  noOfday + ' '+'23:59:59';
		}
		return output;
	}
});