Ext.define('ECNT.view.form.chartCustomerAnalysis', {
	 extend: 'Ext.chart.Chart',
     width: 470,
     height: 400,
     store: null,
	 axes: [
        {
            title: 'Giá trị',
            type: 'Numeric',
            position: 'left',
            fields: ['TOTAL_MONEY'],
        },
        {
            title: 'Ngày giao dịch',
            type: 'Category',
            position: 'bottom',
            fields: ['CHANGE_DATE'],
            grid: true,
            label: {
              rotate: {
                degrees: 60
              }
            }
        }],
    series: [
        {
            type: 'line',
            xField: 'CHANGE_DATE',
            yField: 'TOTAL_MONEY'
        }
    ]
  });