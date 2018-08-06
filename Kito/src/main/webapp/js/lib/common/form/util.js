Ext.define('CMM.form.util', {
	mnths : { 
	        Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
	        Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
	},
	getSimpleDateFormat: function(str) {
	    var date = str.split(" ");
	
	    return date;
	},
	
	convertToVarchar8: function(str) {
		var date = this.getSimpleDateFormat(str);
	    return [ date[3], this.mnths[date[1]], date[2] ].join("");
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
	convertToDateFromVarchar8:function(str){
		var y=str.substr(0,4);
		var m=str.substr(4,2);
		var d=str.substr(6,2);
		return new Date(y+'-'+m+'-'+d);		
	},
	test:function(){
		/*function fnIFrameSrc(url)	{
			Ext.getCmp('SubIFrame').load(url);
		};*/
	},
    btn_template_popup:function(url,title,height,width,modal){			
		
		if(!height){height = 600;}		
		if(!width){width = 1024;}			
		window.open(url, title, "width="+width + " height="+height);		
	}
});
