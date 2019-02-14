<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
	<title>Kara Home</title>
	
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/foundation/css/app.css" type="text/css"> --%>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/scss/app.css" type="text/css">
    
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/foundation/css/app-ext.css" type="text/css">
    <link href="<%=request.getContextPath()%>/resources/foundation/fonts/foundation-icons.css" rel="stylesheet" />
    <!-- <script type="application/javascript" src="/GDSS/resources/foundation/js/vendor/modernizr.js"></script> -->
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=latin,vietnamese' type='text/css'>
    
    <script src="<%=request.getContextPath()%>/js/lib/jquery/jquery-2.1.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/resources/angular/angular.min.js"></script>
    <script src="<%=request.getContextPath()%>/resources/angular/angular-validation-match.js"></script>
    <script src="<%=request.getContextPath()%>/js/lib/angular-pageslide-directive.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/support/globalConfig.js"></script>	
    <script>
    	var contextPath = '<%=request.getContextPath()%>';
    	(function() {
    		var app = angular.module("projectViewer", ["validation.match"])
    	}());
    </script>	
    
	<!-- <script src="/GDSS/resources/js/services/AccountService.js"></script> -->
	<script src="<%=request.getContextPath()%>/js/controllers/signup/main.js"></script>	
	<!-- <script src="/GDSS/resources/js/controllers/account/forgotpassword.js"></script>  -->

</head>

<body ng-app="projectViewer">

	<section id="registration" class="registration page" >
    <div class="reg-content-wrapper row">
        <div class="logo top"></div>
        <div class="registration-content" ng-controller="signupForm">
         	<h3>TẠO TÀI KHOẢN</h3>
                <p>Chỉ mất 1 phút</p>
            <br />
            <form data-abide class="registration-form" name="signupform" ng-submit="signupform.$valid" novalidate >
                <div class="row">
                	<div class="login-item columns login-username item">
                        <label for="fullname">
                            <input type="text" 
	                            	placeholder="Họ tên"
	                            	id="fullname" 
	                            	name="fullname"
	                            	ng-model="fullname"
	                            	ng-model-options="{updateOn:'blur'}"
	                            	required
	                            	 />
                        </label>
                        <div class="error show" ng-show="signupform.fullname.$dirty && signupform.fullname.$invalid">
                        	<span ng-show="signupform.fullname.$error.required">Bắt buộc</span>
                        </div>
                    </div>
                    
                    <div class="login-item columns login-username item">
                        <label for="username">
                            <input type="text" 
	                            	placeholder="Email" 
	                            	id="email" 
	                            	name="email"
	                            	ng-model="email"
	                            	ng-model-options="{updateOn:'blur'}"
	                            	ng-pattern="/\S+@\S+\.\S+/" 
	                            	required
	                            	 />
                        </label>
                        <div class="error show" ng-show="signupform.email.$dirty && signupform.email.$invalid">
                        	<span ng-show="signupform.email.$error.required">Bắt buộc</span>
                        	<span ng-show="signupform.email.$error.pattern">Không hợp lệ</span>
                        	<span ng-show="signupform.email.$error.nonexist">Đã đăng ký</span>
                        </div>
                    </div>
                    
                    <div class="login-item columns login-password item">
                        <label for="password">
                            <input type="password" 
                            	placeholder="Mật khẩu"
                            	id="password" name="password" aria-invalid="true"
                            	ng-model="password" ng-minlength="6" ng-model-options="{updateOn:'blur'}" required />
                        </label>
                        <div class="error show" ng-show="signupform.password.$dirty && signupform.password.$invalid">
                        	<span ng-show="signupform.password.$error.required">Bắt buộc</span>
                        	<span ng-show="signupform.password.$error.minlength">Độ dài ít nhất 6 kí tự</span>
                        </div>
                    </div>
                    <div class="login-item columns login-password item">
                        <label for="password">
                            <input type="password" placeholder="Xác nhận mật khẩu" id="password_c" name="password_c" aria-invalid="true" 
                            	ng-model="password_c" ng-minlength="6" ng-model-options="{updateOn:'blur'}" match="password" required />
                        </label>
                        <div class="error show" ng-show="signupform.password_c.$dirty && signupform.password_c.$invalid">
                        	<span ng-show="signupform.password_c.$error.required">Bắt buộc</span>
                        	<span ng-show="signupform.password_c.$error.minlength">Quá ngắn</span>
                        	<span ng-show="signupform.password_c.$error.match">Không khớp</span>
                        </div>
                    </div>
                    
                    <div class="login-item columns login-password item">
                        <label for="phone">
                            <input type="text" placeholder="Số điện thoại" id="phone" name="phone" aria-invalid="true"
                            	ng-model="phone" required />
                        </label>
                        <div class="error show" ng-show="signupform.phone.$dirty && signupform.phone.$invalid">
                        	<span ng-show="signupform.phone.$error.required">Bắt buộc</span>
                        </div>
                    </div>
                    
                    <button type="button" ng-click="create()" ng-disabled="signupform.$invalid" class="reg-action green-btn">Đăng ký</button>
                    
                	<input type="hidden" ng-model="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" id="${_csrf.parameterName}" />
                </div>
            </form>
             <p>
                <!-- <a class="linktologin" href="/GDSS/login.do" title="Already have account">Quên mật khẩu</a> -->
             </p>
        </div>
    </div>
</section>

</body>
</html>
