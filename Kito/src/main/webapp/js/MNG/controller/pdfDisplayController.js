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
	lookupType: LookupType.month, // {MONTH, YEAR, OTHER}
	startDate: null,
	endDate: null,
	init : function() {
		this.control({
			
			'#btnItemMonth' : {
				click : this.onClickItemMonth
			},
			'#btnItemYear' : {
				click : this.onclickItemYear
			},
			'#btnItemOther' : {
				click : this.onclickItemOther
			},
			'#btnSubmitLookupTime':{
				click: this.SubmitLookupTime
			}
		});
	},
	onclickItemOther: function(){
		var me = this;
		me.lookupType = LookupType.other;
		
		if(this.popLookupTime == null){
				this.popLookupTime = Ext.create('MNG.view.popup.BtnLookupTime',{});
			}
		this.popLookupTime.show();
		
	},
	onclickItemYear:function(){
		var me = this;
		me.lookupType = LookupType.year;
		if(me.popLookupTime != null){
			me.popLookupTime.hide();
		}
		console.info(me.lookupType);
		this.startDate = null;
		this.endDate = null;
		this.sendRequest();
	},
	onClickItemMonth:function(){
		var me = this;
		me.lookupType = LookupType.month;
		if(me.popLookupTime != null){
			me.popLookupTime.hide();
		}
		console.info(me.lookupType);
		this.startDate = null;
		this.endDate = null;
		this.sendRequest();
	},
	SubmitLookupTime:function(){
		var me = this;
		me.lookupType = LookupType.other;
		this.startDate = Ext.ComponentQuery.query("#btnLookupTime #STARTTIME")[0].getValue();
		this.endDate = Ext.ComponentQuery.query("#btnLookupTime #ENDTIME")[0].getValue();
		
		this.startDate = formatSupporter.getTimeStempDateFormat(this.startDate);
		this.endDate = formatSupporter.getTimeStempDateFormat(this.endDate);
		this.sendRequest();
	},
	sendRequest:function(){
		
		var me = this;
		console.info(me.lookupType);
		var mainPanel = Ext.getCmp("reportPanelId"); 
		mainPanel.removeAll();
		
		var param = "?LIID=" + me.lookupType + "&STARTDATE=" + this.startDate + "&ENDDATE="+this.endDate;
		var url_ = contextPath + "/report/rptImportProfit.do" + param;
			
		var pdfPanel = Ext.create('Ext.ux.pdf.panel.PDF',{
	        pageScale: 1,                                          
	        src      : url_ 
	    });
	
	    mainPanel.add( pdfPanel);
		mainPanel.doLayout(); 
	}
})