      google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);
      
      var CURRENT_YEAR ;
      function drawChart() {
    	  var today = new Date();
    	  var currentYear = today.getFullYear();
    	  CURRENT_YEAR = currentYear;
    	  var currentMonth = today.getMonth()+1;
    	  loadDataInfoByYear(currentYear);
    	  loadDailyDataProfit({YEAR: currentYear, MONTH: currentMonth});
    	  document.getElementById('comboSelectYear').value = currentYear;
    	  document.getElementById('comboSelectMonth').value = currentMonth;
      }
      function loadDataInfoByYear(_year){
    	  var _url = contextPath +'/getListMonthlyProfit.json';
    
    	  $.ajax({
			  method: "GET",
			  url: _url,
			  data: { YEAR: _year}
			})
			  .done(function( obj ) {
				  var arrTmp = obj.data;
				  var monthArray = [];
				  
				  for(var i= 0; i < 12; i++){
					  object = {
							  month: 0,
							  year: 0,
							  total: 0,
							  expense: 0,
							  profit: 0
					  };
					  for(var j=0; j < arrTmp.length; j++){
						  month = parseInt(arrTmp[j].MONTH);
						  monthLy = i + 1;
						  if(month == monthLy){
							  object.month = month;
							  object.total = arrTmp[j].TOTAL;
							  object.year = arrTmp[j].YEAR;
							  object.expense = arrTmp[j].EXPENSE;
							  if(object.total > object.expense){
								  object.profit = object.total - object.expense;
							  }
						  }
					  }
					  monthArray.push(object);
				  }
				  drawChartBar(monthArray, _year);
				  // Tesst 
				  //drawChartBarDaily(monthArray, _year);
				  });
      }
      function drawChartBar(objList, _year){
        var data = google.visualization.arrayToDataTable([
          ['Tháng', RPT_CH_001, RPT_CH_002, RPT_CH_003],
          ['T1', objList[0].total, objList[0].expense, objList[0].profit],
          ['T2', objList[1].total, objList[1].expense, objList[1].profit],
          ['T3', objList[2].total, objList[2].expense, objList[2].profit],
          ['T4', objList[3].total, objList[3].expense, objList[3].profit],
          ['T5', objList[4].total, objList[4].expense, objList[4].profit],
          ['T6', objList[5].total, objList[5].expense, objList[5].profit],
          ['T7', objList[6].total, objList[6].expense, objList[6].profit],
          ['T8', objList[7].total, objList[7].expense, objList[7].profit],
          ['T9', objList[8].total, objList[8].expense, objList[8].profit],
          ['T10', objList[9].total, objList[9].expense, objList[9].profit],
          ['T11', objList[10].total, objList[10].expense, objList[10].profit],
          ['T12', objList[11].total, objList[11].expense, objList[11].profit]
        ]);

        var options = {
          chart: {
            title: CHRT_Y_TIL+' '+_year,
            subtitle: RPT_CH_001+', '+RPT_CH_002+', và '+RPT_CH_003+': '+_year,
          },
          bars: 'vertical',
          vAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
      function drawChartBarDaily(objList, _params){
        var data = google.visualization.arrayToDataTable(objList);
        var options = {
          chart: {
            title: CHRT_M_TIL +' '+ _params.MONTH+'/'+_params.YEAR
          },
          bars: 'vertical',
          vAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div1'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

      }
      function onchangeTargetYear(_year){
    	  CURRENT_YEAR = _year;
    	  loadDataInfoByYear(_year);
    	  // load profit
    	  var today = new Date();
    	  var currentMonth = today.getMonth()+1;
    	  loadDailyDataProfit({
    		  	YEAR: _year,
    			MONTH: currentMonth});
      }
      
      function loadDataImportByYear(_param){
    	  var _url = contextPath +'/getListMonthlyImport.json';
    	  
    	  $.ajax({
			  method: "GET",
			  url: _url,
			  data: _param
			})
			 .done(function( obj ) {
				  var arrTmp = obj.data;
				  				  
			});
      }
      function loadDailyDataProfit(_param){
    	  var _url = contextPath +'/getListDailyProfit.json';
    	  
    	  $.ajax({
			  method: "GET",
			  url: _url,
			  data: _param
			})
			  .done(function( obj ) {
				  var arrTmp = obj.data;
				  var tmpArray = [];
				  tmpArray[0] = ['Ngày', 'Doanh thu'];
				  
				  for(var i= 0; i < 30; i++){
					  h = i+1;
					  var arr = [h+'',0];
					  for(var j=0; j < arrTmp.length; j++){
						  date = parseInt(arrTmp[j].DAY);
						  daily = i + 1;
						  if(date == daily){
							  arr = [date+'',arrTmp[j].TOTAL];
						  }
					  }
					  tmpArray.push(arr);
				  }	
				  drawChartBarDaily(tmpArray, _param);
				  });
      }
      function onchangeTargetMonth(_month){
    	  loadDailyDataProfit({
    		  	YEAR: CURRENT_YEAR,
    			MONTH: _month});
      }