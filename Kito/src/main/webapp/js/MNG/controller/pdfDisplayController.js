var gridSupport = Ext.create('BIZ.utilities.GridSupporter',{});
var formatSupporter = Ext.create('BIZ.utilities.formatSupporter',{});

var LookupType = {
		month : 'MONTH',
		year: 'YEAR',
		other: 'OTHER'
};

Ext.define('MNG.controller.pdfDisplayController', {
	extend : 'Ext.app.Controller',
	views : ['MNG.view.pdfDisplayView','Ext.extCombo.view.SimpleComboBox'],
	popup: null,
	popLookupTime: null,
	lookupType: LookupType.month,
	params:{
		startDate: null,
		endDate: null,
		username: null
	},
	init : function() {
		this.control({
			
			'#btnItemMonth' : {
				click : this.onClickItemMonth
			},
			'#btnItemToday' : {
				click : this.onclickToday
			},
			'#dateFrom' : {
				change : this.onclickDateFrom
			},
			'#dateTo' : {
				change : this.onclickDateTo
			},
			'#btnSubmitLookupTime':{
				click: this.SubmitLookupTime
			},
			'#FULLNAME':{
				select: this.selectUsername
			}
		});
	},
	selectUsername: function(field){
		me = this;
		me.params.username = field.getValue();
		me.sendRequest();
	},
	onclickDateFrom: function(field, newValue, oldValue, eOpts){
		this.params.startDate = field.getSubmitValue();
		console.log('startDate', this.params.startDate);
		this.sendRequest();
	},
	onclickDateTo: function(field, newValue, oldValue, eOpts){
		this.params.endDate = field.getSubmitValue();
		this.sendRequest();
	},
	onclickToday:function(){
		var me = this;
		var arrTime = formatSupporter.getEnglishDate('TODAY');
		this.params.startDate = arrTime[0];;
		this.params.endDate = arrTime[1];;
		this.sendRequest();
	},
	onClickItemMonth:function(){
		var me = this;
		var arrTime = formatSupporter.getEnglishDate('MONTH');
		this.params.startDate = arrTime[0];;
		this.params.endDate = arrTime[1];;
		this.sendRequest();
	},
	SubmitLookupTime:function(){
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
	},
	sendRequest:function(){
		
		var me = this;
		var mainPanel = Ext.getCmp("reportPanelId"); 
		mainPanel.removeAll();
		
		var param = "?";
		if(this.params.startDate) param = param + "STARTDATE=" + this.params.startDate;
		if(this.params.endDate)	param = param + "&ENDDATE="+this.params.endDate;
		if(this.params.username) param = param + '&USERNAME='+this.params.username;
		var url_ = contextPath + "/report/rptImportProfit.do" + param;
			
		var pdfPanel = Ext.create('Ext.ux.pdf.panel.PDF',{
	        pageScale: 1,                                          
	        src      : url_ 
	    });
	
	    mainPanel.add( pdfPanel);
		mainPanel.doLayout(); 
	},
	onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        
    },
})