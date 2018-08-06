var tablePrinter = {
	head : false,
	cols : 0,
	printStore: function(param,store){
		var html = "<html>"
			+"<head>"
			+"<meta charset='UTF-8'>"
			+"<title>Danh sách nợ</title>"
			+"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
			+this.printCss()
			+"</head>"
			+"<body>"
			+"<a href=\"javascript:void(0);\" onclick=\"window.print();\"><img src='/S01LOP/lib/extjs/custom/icons/fam/printer.png' style='padding-top: 20px; padding-left: 20px; width: 20px; height: 20px;' /><span style='padding-left: 6px;font-size: 18px;'>In PDF</span></a>"
			+this.printParam(param)
			+this.printTable(store)
			+"</body>"
			+"</html>";
		return html;
	},
	printParam: function(param){
		var p = "<div id=\"page-wrap\">"
			+"<h1>"+ param.title +"</h1>"
			+"<p>Theo loại: <b>"+ param.type +"</b></p>"
			+"<p>Từ ngày <b>"+'param.fromDate'+"</b> đến ngày <b>"+'param.toDate'+"</b> </p>"
			+"<p><br/></p>";
		return p;
	},
	printCss: function(){
		var css = "<style>" +
			"* {margin: 0; padding: 0; }"+
			"body {  font: 14px/1.4 Georgia, Serif; }"+
			"#page-wrap { margin: 50px; }"+
			"p {margin: 20px 0;  }"+
			"table {  width: 100%;  border-collapse: collapse;  }"+
			"tr:nth-of-type(odd) { background: #eee; }"+
			"th { background: #333; color: white; font-weight: bold; }"+
			"td, th { padding: 6px; border: 1px solid #ccc; text-align: left;}"+
		"</style>";
		return css;
	},
	printTable: function(store){

		var tbody = "";
		for (var i=0; i < store.length; i++) {
			var item = store[i].data;
			tbody += "<tr>";
			tbody += "<td>"+ (i+1)+"</td>";
			tbody += "<td>"+ item.CHANGE_DATE +"</td>";
			tbody += "<td>"+ item.TOTAL_MONEY +"</td>";
			tbody += "<td>"+ item.PAYED_MONEY +"</td>";
			tbody += "<td>"+ item.IS_DEBIT +"</td>";
			tbody += "<td>"+ item.HAS_PAYED +"</td>";
			tbody += "<td>"+ item.DSCRT +"</td>";
			tbody += "<td>"+ item.PAY_DATE +"</td>";
			tbody += "<td>"+ item.USER_NAME +"</td>";
			tbody += "</tr>";
		};
		
		var table = "<table>"+
						"<thead>"+
							"<tr>"+
								"<th>STT</th>"+
								"<th>Ngày</th>"+
								"<th>Tổng tiền</th>"+
								"<th>Thanh toán</th>"+
								"<th>Ghi nợ</th>"+
								"<th>Trả nợ</th>"+
								"<th>Ghi chú</th>"+
								"<th>Ngày trả</th>"+
								"<th>Người lưu</th>"+
							"</tr>"+
						"</thead>";
		table += "<tbody>"+tbody+"</tbody>";
		table += "</table>";
		return table;
	}, 
	printData: function(param,store){
		var html = "<html>"
			+"<head>"
			+"<meta charset='UTF-8'>"
			+"<title></title>"
			+"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
			+this.printCss()
			+"</head>"
			+"<body>"
			+"<a href=\"javascript:void(0);\" onclick=\"window.print();\"><img src='/S01LOP/lib/extjs/custom/icons/fam/printer.png' style='padding-top: 20px; padding-left: 20px; width: 20px; height: 20px;' /><span style='padding-left: 6px;font-size: 18px;'>In PDF</span></a>"
			+this.printTableData(param,store)
			+"</body>"
			+"</html>";
		return html;
	},
	printTableParam: function(param){
		var thread = "<thread><tr><th>STT</th>";
		for (var k in param) {
			thread += ("<th>"+param[k]+"</th>");
		}
		thread += ("</tr>"+"</thead>");
		return thread;
	},
	printTableData: function(param,store){
		var items = store.data.items;		
		var tbody = "";
		for (var i=0; i < items.length; i++) {
			var item = items[i];
			tbody += "<tr>";
			tbody += "<td>"+(i+1)+"</td>";
			for (var k in param) {
				if (item.data.hasOwnProperty(param[k])) {
					tbody += "<td>"+item.data[param[k]]+"</td>";
				}
			}
			
			tbody += "</tr>";
		};
		
		var table = "<table>";
		table += this.printTableParam(param);
		table += "<tbody>"+tbody+"</tbody>";
		table += "</table>";
		return table;
	}
};