<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/common/locate/biz-lang-vn.js" charset="utf-8"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/chart/profitChart.js"></script>
<script>	
	var contextPath = "<%=request.getContextPath()%>";	
</script>
	<div>
		<label>Chọn năm</label>
    	<select onchange="onchangeTargetYear(this.value)" id="comboSelectYear">
    		<option>2016</option>
    		<option>2017</option>
    		<option>2018</option>
    		<option>2019</option>
    		<option>2020</option>
    		<option>2021</option>
    		<option>2022</option>
    		<option>2023</option>
    		<option>2024</option>
    		<option>2025</option>
    	</select>
    </div>
    <div id="chart_div"></div>
    <br/>
    <div>
		<label>Chọn tháng</label>
    	<select onchange="onchangeTargetMonth(this.value)" id="comboSelectMonth">
    		<option value="1">Tháng 1</option>
    		<option value="2">Tháng 2</option>
    		<option value="3">Tháng 3</option>
    		<option value="4">Tháng 4</option>
    		<option value="5">Tháng 5</option>
    		<option value="6">Tháng 6</option>
    		<option value="7">Tháng 7</option>
    		<option value="8">Tháng 8</option>
    		<option value="9">Tháng 9</option>
    		<option value="10">Tháng 10</option>
    		<option value="11">Tháng 11</option>
    		<option value="12">Tháng 12</option>
    	</select>
    </div>
    </br>
    <div id="chart_div1"></div>
    
   

