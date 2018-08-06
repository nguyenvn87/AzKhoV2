<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phần mềm quản lý bán hàng AzKho</title>
    
    <!-- css -->
    <link href="/madina/resources/css/foundation-icons.css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=latin,vietnamese' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/scss/app.css" type="text/css">
    
    <!-- javascript -->
    <script type="application/javascript" src="<%=request.getContextPath()%>/resources/vendor/modernizr.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/angular/angular.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/angular-pageslide-directive.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/vendor/jquery.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/vendor/fastclick.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/vendor/placeholder.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/angular/app.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/angular/foundation.js"></script>
    
    <script>
    var app = angular.module("app", ["pageslide-directive"]);

    app.controller('pageslideCtrl', ['$scope', function ($scope) {

        $scope.checked = false; // This will be binded using the ps-open attribute

        $scope.toggle = function () {
            $scope.checked = !$scope.checked
        }

    }]);

    angular.element(document).ready(function () {

        c = angular.element(document.querySelector('#controller-demo')).scope();
    });
    </script>
</head>
<body ng-app="app">
    <!-- body content start -->
    <section id="login" class="login page">
        <div class="login-content-wrapper row">
            <div class="logo top"></div>
            <div class="login-content">
                <form data-abide class="login-form" name="myform"  action="<c:url value='/login' />" method='POST'>
                    <div class="row">
                        <div class="login-item columns login-username">
                        <label for="username">
                            <input type="text" 
	                            	id="username" 
	                            	name="username" 
                            		ng-model="username" 
                            		placeholder="Email" 
	                            	 />
	                            	<!-- validator="usernameValidator(username)" --> 
                        </label>
	                        <!-- <div class="error hidden">
	                            <spring:message code="index.textbox.username.msg.error"/>
	                        </div> -->
                    	</div>
                        <div class="login-item columns login-password">
	                        <label for="password">
	                            <input type="password" 
	                            		id="password" 
	                            		name="password"
	                            		placeholder="Password"  
	                            		aria-invalid="true" />
	                        </label>
	                        <div class="error hidden">
	                        	<!-- <spring:message code="index.textbox.password.msg.error"/> -->
	                        </div>
                    	</div>
                        <div class="login-item columns">
                            <div class="login-helpers">
                                <div class="remember-me">
                                    <input type="checkbox" id="checkbox1" value="" data-invalid />
                                    Remember me
                                </div>
                                <div class="forgot-my-password">
                                    <!-- <a href="/recover-password" class="password-link"> -->
                                    <a class="password-link">
                                        <span>Forgot your Password?</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="login-item columns">
                            <button type="submit" class="login-action green-btn">Đăng nhập</button>
                        </div>
                    </div>
                </form>
                <div class="form-helper-actions">
                    <nav>
                        <a href="https://www.facebook.com/Ph%E1%BA%A7n-m%E1%BB%81m-qu%E1%BA%A3n-l%C3%BD-Karaoke-Cafe-531208190403660/"
                        	target="_blank" class="need-help-btn">
                            <span class="need-help-text">Cần hỗ trợ ?</span>
                            <span class="need-help-text need-help--text-bold">Liên hệ chúng tôi</span>
                        </a>
                        <a href="banhang.do" class="need-help-btn">
                            <span class="need-help-text">Chưa có tài khoản ?</span>
                            <span class="need-help-text need-help--text-bold">Đăng ký miễn phí</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</body>
</html>