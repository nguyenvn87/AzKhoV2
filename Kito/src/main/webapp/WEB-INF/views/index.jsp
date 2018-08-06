<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<html >
  <head>
  	<%@include file="/WEB-INF/views/include.jsp" %>
    <meta charset="UTF-8">
    <title>Sign Up/Login Box</title>
    
    
    
    
        <link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="<c:url value="/js/index.js"/>">
		<script>
			var contextPath = '<%=request.getContextPath()%>';
			function loginFunction(){
				
				var userNM = document.getElementById("name").value;
				var passwd = document.getElementById("pass").value;

				Ext.MessageBox.show({
					   title: 'Xin đợi giây lát',
			           msg: 'Đang kết nối...',
			           progressText: 'Saving...',
			           width:300,
			           wait:true,
			           waitConfig: {interval:200},
			           icon:'ext-mb-download', 
			          // animateTarget: 'btnEndRunningRoom'
			       });
				
				_url = contextPath + '/login.json';
	        	$.ajax(_url, {
	        		type:'POST',
	        		data: { 
						userName: userNM,
						pass: passwd
					},
	        	      success: function(respond) {
	        	    	 console.log('respond');
	        	         console.log(respond);
	        	         Ext.MessageBox.hide();
	        	         if(respond.trim() == "true"){
				 			var test = '<%=request.getScheme()+ "://" + request.getServerName() + ":"  
	        	         					+ request.getServerPort() 
	        	         					+ request.getContextPath()%>/home.do'; 
	        	         	window.location = test;  
	        	         }
	        	         else{
	        	        	 
	        	         }
	        	      },
	        	      error: function() {
	        	    	  Ext.MessageBox.hide();
	        	    	  swal({   title: "Mất kết nối !",   text: "I will close in 2 seconds.",   timer: 1000,   showConfirmButton: false });
	        	      }
	        	   }); 
			}
		</script>
    
    
    
  </head>

  <body>

    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<div id="logmsk" style="display: block;">
    <div id='close'>X</div>
    <div id="userbox">
        <h1 id="signup" style="background-color: rgb(118, 171, 219); background-position: initial initial; background-repeat: initial initial;">Đăng nhập</h1>
        <div id="sumsk" style="display: none;">Sending</div>
        <input id="name" style="opacity: 1; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;">
        <input id="pass" type="password" style="opacity: 1; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;">
        <p id="logint" style="opacity: 1;">Login as an existing user</p>
       <!--  <p id="nameal" style="display: none; opacity: 1;">ID:</p>
        <p id="passal" style="display: none; opacity: 1;">Password:</p> -->
        <button id="signupb" style="opacity: 1; cursor: default;" onclick="loginFunction()">Login</button>
    </div>
</div>
    
        <!-- <script src="js/index.js"></script> -->

    
    
    
  </body>
</html>
