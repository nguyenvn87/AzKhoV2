<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="en">
<head>
<meta charset="utf-8">
<link href="<%=request.getContextPath()%>/css/bootstrap.min.css"
	rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/font-awesome.min.css"
	rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/prettyPhoto.css"
	rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/main-custom.css"
	rel="stylesheet">
<link rel="shortcut icon" href="images/ico/favicon.ico">
<link rel="apple-touch-icon-precomposed" sizes="144x144"
	href="<%=request.getContextPath()%>/images/ico/apple-touch-icon-144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114"
	href="<%=request.getContextPath()%>/images/ico/apple-touch-icon-114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72"
	href="<%=request.getContextPath()%>/images/ico/apple-touch-icon-72-precomposed.png">
<link rel="apple-touch-icon-precomposed"
	href="<%=request.getContextPath()%>/images/ico/apple-touch-icon-57-precomposed.png">
<title>Phần mềm quản lý bán hàng trực tuyến</title>
<meta name="description" content="Phần mềm quản lý bán hàng trực tuyến chuyên nghiệp, hiệu quả">
<meta name="keywords" content="Phần mềm AZKho, quản lý bán hàng trực tuyến">
<meta itemprop="image" content="<%=request.getContextPath()%>/images/share-fb2-min.png">
<meta property="og:image" content="<%=request.getContextPath()%>/images/share-fb2-min.png">
<meta property="og:title" content="Phần mềm quản lý bán hàng online chuyên nghiệp, hiệu quả với AZKho.com">
<meta property="og:site_name" content="AZKho.com">
<meta property="og:description" content="AzKho là giải pháp hỗ trợ kinh doanh, quản lý bán hàng trực tuyến trên máy tính, mobile cực kỳ hiệu quả: quản lý trạng thái phòng, thời gian vào ra, in hóa đơn, tính tiền nhanh chóng">
<meta property="og:type" content="website">
</head>

<body data-spy="scroll" data-target="#navbar" data-offset="0">
	<header id="header" role="banner">
		<div class="container">
			<div id="navbar" class="navbar navbar-default">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="index.do"></a>
				</div>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="#main-slider"><i
								class="icon-home"></i></a></li>
						<li><a href="#services">Dịch vụ</a></li>
						<li><a href="#portfolio">Tính năng</a></li>
						<li><a href="#pricing">Bảng giá</a></li>
						<!-- <li><a href="#about-us">Chúng tôi</a></li> -->
						<li><a href="#contact">Liên hệ</a></li>
						<li class="login">
							<a onclick="loginButton()">Đăng nhập</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
	<section id="main-slider" class="carousel">
		<div class="carousel-inner">
			<div class="item active">
				<div class="container">
					<div class="carousel-content">
						<h1>Bạn đã sử dụng phần mềm bán hàng chưa ?</h1>
						<p class="lead">
							Hãy sử dụng ngay AzKho để tận hưởng những tiện ích tốt nhất cho
							cửa hàng của bạn.<br>Dùng thử miễn phí ngay bây giờ !
						</p>
					</div>
				</div>
			</div>
			<!--/.item-->
			<div class="item">
				<div class="container">
					<div class="carousel-content">
						<h1>Thảnh thơi bán hàng, làm việc mọi lúc mọi nơi</h1>
						<p class="lead">Chỉ với 99.000 AzKho sẽ quản lý bán hàng từ A
							đến Z thay bạn
					</div>
				</div>
			</div>
			<div class="item">
				<div class="container">
					<div class="carousel-content">
						<h1>Quản lý cửa hàng chuyên nghiệp</h1>
						<p class="lead">Chỉ 99.000 đ/tháng
					</div>
				</div>
			</div>
		</div>
		<!--/.carousel-inner-->
		<a class="prev" href="#main-slider" data-slide="prev"><i
			class="icon-angle-left"></i></a> <a class="next" href="#main-slider"
			data-slide="next"><i class="icon-angle-right"></i></a>
	</section>
	<section id="portfolio">
		<div class="introduction-content">
		<div class="container">
			<div class="box first">
				<div class="center">
					<!-- <img alt="" src="images/features-icon-maps.png"><br> -->
					<h2>Hơn 5,000 cửa hàng đã tin tưởng sử dụng AzKho </h2>
				</div>
				<div class="row">
						<div class="col-md-6 feature-image">
							<div class="big-box">
								<img alt="" src="images/img-intro-new.png">
							</div>
						</div>
						<div class="col-md-6">
							<ul>
								<li class="advantage-item">
									<div class="advantage-icon">
										<i class="iconsimple"></i>
									</div>
									<div class='advantage-content'>
										<h3>Quản lý bán hàng</h3>
										<p class=''>
										- Tra cứu giá bán theo mã hàng
										<br> - Lên đơn hàng.
										<br> - Bán hàng bằng máy quét mã vạch.
										<br> - Tính tiền và in hóa đơn.</p>
									</div>
								</li>
								<li class="advantage-item">
									<div class="advantage-icon">
										<i class="iconsimple"></i>
									</div>
									<div class='advantage-content'>
										<h3>Quản lý kho</h3>
										<p class=''>- Nhập kho, xuất kho, kiểm kho
											<br>- Thiết lập, tra cứu lịch sử tồn kho
											<br>- Quản lý danh mục, đặc tính hàng hóa
											<br>- Tính toán giá trị tồn kho
										</p>
									</div>
								</li>
								<li class="advantage-item">
									<div class="advantage-icon">
										<i class="iconsimple"></i>
									</div>
									<div class='advantage-content'>
										<h3>Khách hàng</h3>
										<p class=''>- Quản lý lưu trữ hồ sơ khách hàng và đại lý. 
											<br>- Thống kê lịch sử giao dịch của từng khách.
											<br>- Truy xuất lịch sử xuất nhập cho các đại lý, khách hàng. 
										</p>
									</div>
								</li>
								<li class="advantage-item">
									<div class="advantage-icon">
										<i class="iconsimple"></i>
									</div>
									<div class='advantage-content'>
										<h3>Báo cáo, thống kê</h3>
										<p class=''>- Báo cáo doanh thu theo ngày tháng
											<br>- Báo cáo hàng xuất nhập
											<br>- Thống kê lợi nhuận
											<br>- Thống kê nhập hàng của các đại lý
											<br>- Thống kê doanh số theo từng nhân viên bán hàng  
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				<!--/.row-->
			</div>
			<!--/.box-->
		</div>
		</div>
		<!--/.container-->
	</section>
	<section id="introduce">
		<div class="container">
			<div class="box">
				<div class="center">
					<h2>Quản lý bán hàng</h2>
					<p class="lead1">Tính tiền, in hóa đơn, thống kê doanh số theo ngày, tháng. 
						Tính doanh số theo từng nhân viên. 
						<br>Quản lý nợ, xuất nhập kho, tra cứu lịch sử tồn kho 
						<br>và lịch sử giao dịch của khách hàng.</p>
				</div>
				<!--/.center-->
				<div class="center">
					<img alt="" src="images/features-analytics.png">
				</div>
			</div>
		</div>
	</section>
	<section id="visualize">
        <div class="container">
            <div class="sec_bussiness">
                <div class="center">
                	<!-- <img alt="" src="images/features-icon-analytics.png"> -->
                    <h2 class="title-custom">Thống kê</h2>
                    <p class="lead1">Chỉ với 1 cú click chuột, phần mềm sẽ in báo cáo cho ban biết kết quả kinh doanh trong ngày, tháng hoặc quý.
						<br>Thông báo ngay kết quả nhập hàng, bán hàng và tính lợi nhuận trên từng loại hàng theo thời gian bạn muốn</p>
                </div><!--/.center--> 
        		<div class="col-sm-12">
        			<div class="col-sm-6 col-xs-6 sec_buss_col">
        				<h3 class="title-custom">Tối ưu hiệu quả làm việc</h3>
        				<hr class="buss_line l1">
        				<p>Phân chia quyền hạn cho từng nhân viên</p>
        				<p>Tính tiền, in hóa đơn nhanh chóng</p>
        				<p>Rút ngắn thời gian kiểm kê</p>
        				<p>Quản lý giá bán, giá nhập trên từng mặt hàng</p>
        			</div>
        			<div class="col-sm-6 col-xs-6">
        				<h3 class="title-custom">Báo cáo theo đơn hàng</h3>
        				<hr class="buss_line l2">
        				<p>Doanh thu, số lượt phòng trong ngày </p>
        				<p>Doanh thu các ngày trong tháng </p>
        				<p>Nhập hàng, lợi nhuận trong tháng </p>
        				<p>Nợ đã trả chưa trả và thông tin khách nợ</p>
        			</div>
        		</div>
                <br>  
			    <div class="center">
			        <img alt="" src="images/features-visualization.png">
			    </div>
            </div> 
        </div>
    </section>
	<!-- Bang gia -->
	<section id="pricing">
		<div class="container">
			<div class="box">
				<div class="center">
					<h2>Bảng Giá</h2>
				</div>
				<!--/.center-->
				<!-- <div class="big-gap"></div> -->
				<div id="pricing-table" class="row">
					<div class="col-sm-4">
						<ul class="plan">
							<li class="plan-name">STARTER</li>
							<li class="plan-price">150.000<sub>/th</sub></li>
							<li>1 cửa hàng</li>
							<li>1 chi nhánh</li>
							<li>3 người dùng</li>
							<li>Hỗ trợ miễn phí</li>
							<li>Cập nhật miễn phí</li>
							<li class="plan-action"><a href="signup.do?ID=QH100"
								class="btn btn-primary btn-lg">Dùng thử miễn phí</a></li>
						</ul>
					</div>
					<!--/.col-sm-4-->
					<div class="col-sm-4">
						<ul class="plan featured">
							<li class="plan-name">PROFESSIONAL</li>
							<li class="plan-price">220.000<sub>/th</sub></li>
							<li>1 cửa hàng</li>
							<li>1 chi nhánh</li>
							<li>Không giới hạn</li>
							<li>Hỗ trợ miễn phí</li>
							<li>Cập nhật miễn phí</li>
							<li class="plan-action"><a href="signup.do?ID=QH100"
								class="btn btn-primary btn-lg">Dùng thử miễn phí</a></li>
						</ul>
					</div>
					<!--/.col-sm-4-->
					<div class="col-sm-4">
						<ul class="plan">
							<li class="plan-name">ENTERPRISE</li>
							<li class="plan-price">800.000<sub>/th</sub></li>
							<li>1 cửa hàng</li>
							<li>3 chi nhánh</li>
							<li>Không giới hạn</li>
							<li>Hỗ trợ miễn phí</li>
							<li>Được nâng cấp theo yêu cầu</li>
							<li class="plan-action"><a href="signup.do?ID=QH100"
								class="btn btn-primary btn-lg">Dùng thử miễn phí</a></li>
						</ul>
					</div>
					<!--/.col-sm-4-->
				</div>
			</div>
		</div>
	</section>
	<!--/#pricing-->
	<section id="services">
		<div class="container">
			<div class="box">
				<div class="center">
					<!-- <img alt="" src="images/features-icon-apps.png"><br> -->
					<h2>Các sản phẩm khác của chúng tôi</h2>
				</div>
				<!--/.center-->
				<div class="row">
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-microphone icon-md icon-color1"></i> <a
								href="signup.do?ID=QH201" title="Quán Karaoke">
								<h4 href="signup.do?ID=QH201">Karaoke</h4>
							</a>
							<!-- <p>Hiện thị trạng thái các phòng, tính thời gian vào ra, tính tiền, in hóa đơn cho khách.</p> -->
						</div>
					</div>
					<!--/.col-md-4-->
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-umbrella icon-md icon-color2"></i> <a
								href="signup.do?ID=QH100" title="Thời trang">
								<h4>Thời trang</h4>
							</a>
							<!-- <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.</p> -->
						</div>
					</div>
					<!--/.col-md-4-->
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-medkit icon-md icon-color3"></i> <a
								href="signup.do?ID=QH100" title="Quầy thuốc">
								<h4>Quầy thuốc</h4>
							</a>
						</div>
					</div>
					<!--/.col-md-4-->
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-mobile-phone icon-md icon-color4"></i> <a
								href="signup.do?ID=QH100" title="Tạp hóa">
								<h4>Đồ điện tử</h4>
							</a>
						</div>
					</div>
					<!--/.col-md-4-->
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-shopping-cart icon-md icon-color5"></i> <a
								href="signup.do?ID=QH100" title="Siêu thị mini">
								<h4>Siêu thị mini</h4>
							</a>
						</div>
					</div>
					<!--/.col-md-4-->
					<div class="col-md-4 col-sm-6">
						<div class="center">
							<i class="icon-cloud icon-md icon-color6"></i> <a
								href="signup.do?ID=QH100" title="Ngành hàng khác">
								<h4>Tổng kho</h4>
							</a>
						</div>
					</div>
					<!--/.col-md-4-->
				</div>
			</div>
		</div>
	</section>
	<!-- About us -->
	<section id="about-us">
		<div class="container">
			<div class="box">
				<div class="center">
					<h2>Tổng đài: 0820.030.668</h2>
				</div>
				<div class="gap"></div>
				<div id="team-scroller" class="carousel scale">
					<div class="carousel-inner">
						<div class="item active">
							<div class="row">
								 <div class="col-sm-4">
									<div class="member">
										<p>
											<img class="img-responsive img-thumbnail img-circle"
												src="images/team1.jpg" alt="">
										</p>
										<h3>
											Quyền Linh<small class="designation">CEO &amp;
												Founder</small>
										</h3>
									</div>
								</div> 
								<div class="col-sm-4">
									<div class="member">
										<p>
											<img class="img-responsive img-thumbnail img-circle"
												src="images/team2.jpg" alt="">
										</p>
										<h3>
											Hot line: 094.660.8880
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="item">
							<div class="row">
								<div class="col-sm-4">
									<div class="member">
										<p>
											<img class="img-responsive img-thumbnail img-circle"
												src="images/team3.jpg" alt="">
										</p>
										<h3>
											Hot line: 01292.030.668
										</h3>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="member">
										<p>
											<img class="img-responsive img-thumbnail img-circle"
												src="images/team2.jpg" alt="">
										</p>
										<h3>
											Hot line: 094.660.8880
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<a class="left-arrow" href="#team-scroller" data-slide="prev">
						<i class="icon-angle-left icon-4x"></i>
					</a> <a class="right-arrow" href="#team-scroller" data-slide="next">
						<i class="icon-angle-right icon-4x"></i>
					</a>
				</div>
				<!--/.carousel-->
			</div>
			<!--/.box-->
		</div>
		<!--/.container-->
	</section>
	<!--/#Contact-->
	
	<section id="contact">
		<div class="container">
			<div class="box last">
				<div class="row">
					<div class="col-sm-6">
						<h1>Quản lý cửa hàng từ A đến Z</h1>
						<div class="row">
							<div class="col-md-4 col-sm-6">
								<address>
									<strong>AzKho Hà Nội.</strong><br>Xa La, Hà Đông<br>
									<abbr title="Phone">P:</abbr> 094.660.8880
								</address>
							</div>
							<div class="col-md-4 col-sm-6">
								<address>
									<strong>AzKho Huế.</strong><br>60 Phan Chu Trinh<br>
									<abbr title="Phone">P:</abbr>
									0903.951.516
								</address>
							</div>
							<div class="col-md-4 col-sm-6">
								<address>
									<strong>AzKho Lâm Đồng.</strong><br> 288 Lê Hồng Phong<br>
									<abbr title="Phone">P:</abbr>
									0976.847.248
								</address>
							</div>
						</div>
						<h1 style="display: none">Connect with us</h1>
						<div class="row" style="display: none">
							<div class="col-md-6">
								<ul class="social">
									<li><a href="#"><i class="icon-facebook icon-social"></i>
											Facebook</a></li>
									<li><a href="#"><i
											class="icon-google-plus icon-social"></i> Google Plus</a></li>
									<li><a href="#"><i class="icon-pinterest icon-social"></i>
											Pinterest</a></li>
								</ul>
							</div>
							<div class="col-md-6">
								<ul class="social">
									<li><a href="#"><i class="icon-linkedin icon-social"></i>
											Linkedin</a></li>
									<li><a href="#"><i class="icon-twitter icon-social"></i>
											Twitter</a></li>
									<li><a href="#"><i class="icon-youtube icon-social"></i>
											Youtube</a></li>
								</ul>
							</div>
						</div>
					</div>
					<!--/.col-sm-6-->
				</div>
				<!--/.row-->
			</div>
			<!--/.box-->
		</div>
		<!--/.container-->
	</section>
	<!--/#contact-->

	<footer id="footer">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					&copy; 2013 <a target="_blank" href="https://www.facebook.com/phanmemquanlybanhangAzkho/"
						title="Phần mềm quản lý bán hàng chuyên nghiệp">AzKho.com</a>.
					All Rights Reserved.
				</div>
				<div class="fb-share-button" data-href="http://azkho.com/banhang.do" 
						data-layout="button_count" data-size="small" data-mobile-iframe="true">
						<a class="fb-xfbml-parse-ignore" target="_blank" 
							href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fazkho.com%2Fbanhang.do&amp;src=sdkpreparse">
							Chia sẻ
						</a>
				</div>
			</div>
		</div>
	</footer>
	<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9&appId=509927362453600";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
	<!--/#footer-->

	<script src="<%=request.getContextPath()%>/js/lib/bootstrap/jquery.js"></script>
	<script
		src="<%=request.getContextPath()%>/js/lib/bootstrap/bootstrap.min.js"></script>
	<script
		src="<%=request.getContextPath()%>/js/lib/bootstrap/jquery.isotope.min.js"></script>
	<script
		src="<%=request.getContextPath()%>/js/lib/bootstrap/jquery.prettyPhoto.js"></script>
	<script src="<%=request.getContextPath()%>/js/lib/bootstrap/main.js"></script>
	<script>
		function loginButton(){
			window.location.href="index.do"; 
		}
	</script>
</body>
</html>