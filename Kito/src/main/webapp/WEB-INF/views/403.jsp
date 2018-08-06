<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>



<style>
#fof {
	display: block;
	width: 100%;
	margin: 100px 0;
	line-height: 2.6em;
	text-align: center;
}

#fof .hgroup {
	text-transform: uppercase;
}

#fof .hgroup h1 {
	margin-bottom: 25px;
	font-size: 80px;
}

#fof .hgroup h1 span {
	display: inline-block;
	margin-left: 5px;
	padding: 2px;
	border: 1px solid #CCCCCC;
	overflow: hidden;
}

#fof .hgroup h1 span strong {
	display: inline-block;
	padding: 20px 20px 20px;
	border: 1px solid #CCCCCC;
	font-weight: normal;
}

#fof .hgroup h2 {
	font-size: 60px;
}

#fof .hgroup h2 span {
	display: block;
	font-size: 30px;
}

#fof p {
	margin: 25px 0 0 0;
	padding: 0;
	font-size: 16px;
}

#fof p:first-child {
	margin-top: 0;
}
</style>
<div class="wrapper row2">
	<div id="container" class="clear">
		<div id="fof" class="clear">
			<div class="hgroup">			
				<h2>
					<span>Bạn không được phép truy cập</span>
				</h2>
			</div>
			<p>Continue <a href="javascript:history.go(-1)">&laquo; Go Back</a></p>
			<p> Nếu thực sự bạn có thẩm quyền, hãy đăng nhập lại!
				<a href='<%=request.getContextPath()%>/index.do'>Login &raquo;</a>
			</p>
		</div>
	</div>
</div>
