<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    
    <!-- css -->
    <link href="/madina/resources/css/foundation-icons.css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=latin,vietnamese' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/madina/resources/scss/app.css" type="text/css">
    
    <!-- javascript -->
    <script type="application/javascript" src="/madina/resources/vendor/modernizr.js"></script>
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
                <form data-abide class="login-form" autocomplete="on" aria-label="login form" action="<c:url value='/login' />" method='POST'>
                    <div class="row">
                        <div class="login-item columns">
                            <label for="email">
                                <input type="email" placeholder="Email Address" name="email" required aria-invalid="true" />
                            </label>
                            <div class="error">
                                We need this.
                            </div>
                        </div>
                        <div class="login-item columns">
                            <label for="password">
                                <input type="password" placeholder="Password" name="password" required aria-invalid="true" />
                            </label>
                            <div class="error">Password is incorrect</div>
                        </div>
                        <div class="login-item columns">
                            <div class="login-helpers">
                                <div class="remember-me">
                                    <input type="checkbox" id="checkbox1" required value="" data-invalid />
                                    Remember me
                                </div>
                                <div class="forgot-my-password">
                                    <a href="/recover-password" class="password-link">
                                        <span>Forgot your Password?</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="login-item columns">
                            <button type="submit" class="login-action green-btn">Login to system</button>
                        </div>
                    </div>
                </form>
                <div class="form-helper-actions">
                    <nav>
                        <a href="#" target="_blank" class="need-help-btn">
                            <span class="need-help-text">Need helps?</span>
                            <span class="need-help-text need-help--text-bold">Contact Us Now</span>
                        </a>
                        <a href="signup.do" class="need-help-btn">
                            <span class="need-help-text">Do not have account?</span>
                            <span class="need-help-text need-help--text-bold">Sign Up Now</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <script>
        /*script for draggable draw tool panel*/
        function $(el) {
            return document.getElementById(el);
        }
        var tzdragg = function () {
            return {
                move: function (divid, xpos, ypos) {
                    console.log('1');
                    var a = $(divid);
                    $(divid).style.left = xpos + 'px';
                    $(divid).style.top = ypos + 'px';
                },
                startMoving: function (evt) {

                    evt = evt || window.event;
                    var posX = evt.clientX,
                        posY = evt.clientY,
                        a = $('tool-map-draggable-wrapper'),
                    divTop = a.style.top,
                    divLeft = a.style.left;

                    divTop = divTop.replace('px', '');
                    divLeft = divLeft.replace('px', '');
                    var diffX = posX - divLeft,
                        diffY = posY - divTop;
                    document.onmousemove = function (evt) {
                        evt = evt || window.event;
                        var posX = evt.clientX,
                            posY = evt.clientY,
                            aX = posX - diffX,
                            aY = posY - diffY;
                        var boun = document.getElementById("map-area").offsetWidth - document.getElementById("tool-map-draggable-wrapper").offsetWidth;

                        if ((aX > 0) && (aX < boun) && (aY > 0) && (aY < boun))
                            tzdragg.move('tool-map-draggable-wrapper', aX, aY);
                    }
                },
                stopMoving: function () {
                    var a = document.createElement('script');
                    document.onmousemove = function () { }
                },
            }
        }();
    </script>
</body>
</html>