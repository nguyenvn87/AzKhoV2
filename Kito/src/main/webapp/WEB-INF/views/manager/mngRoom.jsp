<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/include.jsp" %>
<style>
#header {
    background-color:black;
    color:white;
    text-align:center;
    padding:5px;
}
#nav {
    line-height:30px;
    background-color:#eeeeee;
    height:300px;
    width:20%;
    float:left;
    padding:5px;
}
#section {
    width:70%;
    height: 80%;
    float:left;
    padding:10px;
}
#footer {
    background-color:black;
    color:white;
    clear:both;
    text-align:center;
    padding:5px;
}
</style>
<!-- </head>
<body> -->
<script type="text/javascript">
Ext.onReady(function(){
	Ext.create( 'LAFORM.formRoom', {
		renderTo: Ext.getElementById("section")
	});
	var listRoom = Ext.create( 'LAFORM.leftListRoom', {
		renderTo: Ext.getElementById("nav")
	});
	listRoom.loadData();
});
</script>
<div id="header" style="display:none">
<h1>City Gallery</h1>
</div>

<div id="nav">

</div>

<div id="section">
</div>

<div id="footer">
Copyright � W3Schools.com
</div>
<!-- 
</body>
</html> -->

