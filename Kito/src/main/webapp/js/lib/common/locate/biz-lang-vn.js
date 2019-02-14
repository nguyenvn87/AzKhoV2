/*layout top menu*/

var HELLO_USR = 'Xin chào ';

var MEN_T_001 = 'Bán hàng';
var MEN_T_002 = 'Thống kê';
var MEN_T_004 = 'Thu chi';
var MEN_T_003 = 'Hàng hóa';
var MEN_T_005 = 'Cài đặt';
var MEN_T_006 = 'menu auth mgt';
var MEN_T_007 = 'action auth mgt';
// Data
var DAT_T_001 = 'Đang kinh doanh';
var DAT_T_002 = 'Ngừng kinh doanh';
var DAT_T_003 = 'Đang hoạt động';
var DAT_T_004 = 'Ngừng hoạt động';

// Chart
var CHRT_Y_TIL = 'Thống Kê Doanh Thu Theo Tháng Của Năm';
var CHRT_M_TIL = 'Thống Kê Doanh Thu Theo Ngày Của Tháng';
var RPT_CH_001 = 'Bán hàng';
var RPT_CH_002 = 'Nhập hàng';
var RPT_CH_003 = 'Lợi nhuận';
var WKL_FS_001 = 'Tìm kiếm' ;
var WKL_FS_002 = 'Kết quả tìm kiếm';

var WKL_F_001 = 'Trường hợp số';
var WKL_F_002 = 'Kiểu quy trình';
var WKL_F_003 = 'Thời gian';
var WKL_F_004 = 'Ngày nộp đơn' ;
var WKL_F_005 = 'Quyền' ;
var WKL_F_006	='tên';
var WKL_F_007 = 'Số tiếp nhận';

var WKL_B_001 = 'Tìm kiếm' ;
var WKL_B_002 = 'Tạo process';


var WKL_C_001 = 'STT';
var WKL_C_002 = 'Ngày nộp đơn';
var WKL_C_003 = 'Ngày sinh';
var WKL_C_004 = 'Số';
var WKL_C_005 = 'Trình tự';
var WKL_C_006 = 'Thứ tự quy trình';
var WKL_C_007 = 'Vị trí đất';
var WKL_C_008 = 'sub location';
var WKL_C_009 = 'Số lô';
var WKL_C_010 = 'scale';
var WKL_C_011 = ' Số lô / điểm ';
var WKL_C_012 = ' Lệ phí ';
var WKL_C_013 = ' Giá ';
var WKL_C_014 = ' giá trị ';
var WKL_C_015 = ' điều tra ';
var WKL_C_016 = ' ngày bắt đầu ';
var WKL_C_017 = ' ngày hoàn thành ';
var WKL_C_018 = ' Tình trạng ';
var WKL_C_019 = 'Họ và tên ';
var WKL_C_020 = 'Liên hệ ';
var WKL_C_021 = 'Địa chỉ';

var COM_B_001 = 'Lưu';
var COM_B_002 = 'yêu cầu cho phép' ;
var COM_B_003 = 'hoàn thành' ;
var COM_B_004 = 'tải file';
var COM_B_005 = 'In';
var COM_B_006 = 'Đóng';
var COM_B_007 = 'Lưu lại';
var COM_B_008 = 'trả lại';
var COM_B_009 = ' đã được phê duyệt' ;
var COM_B_010 = ' nhận việc';
var COM_B_011 = ' xem trước ';
var COM_B_012 = 'Danh sách ';
var COM_B_013 = 'Thêm vị trí' ;
var COM_B_014 = 'Xóa vị trí';
var COM_B_015 = 'Chọn';
var COM_B_016 = ' tiếp tục' ;
var COM_B_017 = 'Quay lại' ;
var COM_B_018 = ' Xóa lựa chọn ';
var COM_B_019 = 'Thêm' ;
var COM_B_020 = 'bpm_chart';
var COM_B_021 = 'Tìm kiếm' ;
var COM_B_022 = 'OK' ;
var COM_B_023 = ' đăng nhập ';
var COM_B_024 = ' Đăng xuất ';
var COM_B_025 = 'phân việc';
var COM_B_026 = 'chưa giao' ;
var COM_B_027 = 'Xóa chủ sở hữu ' ;
var COM_B_028 = 'Xóa tổ chức ' ;

var COM_T_001 = 'Thông tin công ty' ;
var COM_T_002 = 'Chỉ định đại diện' ;

var COM_FS_001 = ' Thông tin của đơn' ;
var COM_FS_002 = 'Địa điểm khảo sát';
var COM_FS_003 = ' trích xuất một danh sách ';
var COM_FS_004 = ' và các văn bản' ;
var COM_FS_005 = 'Thông tin đại lý' ;
var COM_FS_006 = 'File đính kèm' ;
var COM_FS_007 = ' kiểu đích ';
var COM_FS_008 = ' phí ';
var COM_FS_009 = ' yêu cầu thông tin ';
var COM_FS_010 = ' thay đổi thông tin ';
var COM_FS_011 = 'title' ;
var COM_FS_012 = ' thế chấp ';
var COM_FS_013 = ' Thông tin ';
var COM_FS_014 = ' quyền trách nhiệm ' ;
var COM_FS_015 = ' quyền hạn ';
var COM_FS_016 = ' thông tin độc quyền ';
var COM_FS_017 = ' có liên quan thông tin ';
var COM_FS_018 = ' mục kiểm tra ' ;
var COM_FS_019 = ' thông tin ứng dụng ';
var COM_FS_020 = 'Tìm kiếm' ;
var COM_FS_021 = 'Kết quả tìm kiếm ';
var COM_FS_022 = ' Thông tin liên hệ ';

var COM_TB_001 = ' thông tin cơ bản ';
var COM_TB_002 = ' quyền được thông tin ';
var COM_TB_003 = 'Thông tin trách nhiệm ' ;
var COM_TB_004 = ' thông tin bị hạn chế' ;
var COM_TB_005 = ' thông tin độc quyền ';

var COM_F_001 = 'Civil Application' ;
var COM_F_002 = ' tên của đương đơn' ;
var COM_F_003 = ' Ngày sinh ';
var COM_F_004 = ' giới tính ';
var COM_F_005 = 'M' ;
var COM_F_006 = 'F' ;
var COM_F_007 = ' số điện thoại ';
var COM_F_008 = ' Địa chỉ ';
var COM_F_009 = ' người ';
var COM_F_010 = ' quốc tịch 1 ';
var COM_F_011 = ' quốc tịch 2 ';
var COM_F_012 = 'Mục đích của đơn';
var COM_F_013 = ' đơn ';
var COM_F_014 = ' bản sao CMND' ;
var COM_F_015 = 'giấy ủy quyền' ;
var COM_F_016 = ' địa chính ';
var COM_F_017 = ' Địa chỉ ';
var COM_F_018 = ' tổng lệ phí' ;
var COM_F_019 = ' thuế GTGT ';
var COM_F_020 = ' tổng ';
var COM_F_021 = ' thanh toán ';
var COM_F_022 = ' phương thức thanh toán ';
var COM_F_023 = ' người nhận ';
var COM_F_024 = ' điểm tham chiếu máy tính ' ;
var COM_F_025 = ' tiết kiệm cho dù pháp luật' ;
var COM_F_026 = ' diện tích giới hạn dung sai ';
var COM_F_027 = ' bưu kiện xung quanh trận đấu ' ;
var COM_F_028 = ' số nhiều cho phù hợp ';
var COM_F_029 = 'file đo lường phù hợp ';
var COM_F_030 = ' người đại diện ';
var COM_F_031 = ' Tên công ty ';
// var COM_F_032 = ' liên hệ' ;
var COM_F_033 = 'Tên tài liệu';
var COM_F_034 = 'chủ nhân' ;
var COM_F_035 = ' số ';
var COM_F_036 = ' Ngày đăng ký ';
var COM_F_037 = ' lúc trưởng thành ';
var COM_F_038 = ' sở hữu ';
var COM_F_039 = ' thế chấp ';
var COM_F_040 = ' chủ đề' ;
var COM_F_041 = ' thế chấp chín phút ';
var COM_F_042 = ' Số tiền thế chấp ';
var COM_F_043 = ' quan tâm ';
var COM_F_044 = ' bảng xếp hạng thế chấp ';
var COM_F_045 = ' tên ';
var COM_F_046 = ' khu vực ';
var COM_F_047 = ' mối quan hệ với chủ sở hữu ';
var COM_F_048 = 'Tìm kiếm' ;
var COM_F_049 = 'bộ phận' ;
var COM_F_050 = ' Tìm kiếm Địa chỉ ';
var COM_F_051 = ' tìm kiếm địa điểm ' ;
var COM_F_052 = 'Từ tìm kiếm' ;
var COM_F_053	='Id_vn';
var COM_F_054	='Password_vn';
var COM_F_055	='E-mail_vn';
var COM_F_056	='Ngôn ngữ';
var COM_F_057	='Permission_vn';


var COM_C_001 = ' số ';
var COM_C_002 = ' Địa chỉ ';
var COM_C_003 = ' Thửa đất';
var COM_C_004 = ' Sử dụng đất';
var COM_C_005 = ' giá ';
var COM_C_006 = ' khu vực ';
var COM_C_007 = 'chủ sở hữufadf' ;
var COM_C_008 = ' trình tự ';
var COM_C_009 = ' sẵn sàng khai thác phương pháp ';
var COM_C_010 = ' Trích xuất phạm vi ';
var COM_C_011 = ' xây dựng ';
var COM_C_012 = ' chiết xuất ';
var COM_C_013 = ' kiểu file';
var COM_C_014 = ' file';
var COM_C_015 = ' tỷ lệ ';
var COM_C_016 = ' Số lượng ';
var COM_C_017 = ' Giá ';
var COM_C_018 = ' phí ';
var COM_C_019 = ' thuế GTGT ';
var COM_C_020 = ' di chuyển tất cả ';
var COM_C_021 = ' sau khi di chuyển ';
var COM_C_022 = ' major number ';
var COM_C_023 = ' miner number ';
var COM_C_024 = ' scale ';
var COM_C_025 = ' 도호_en ';
var COM_C_026 = ' Họ';
var COM_C_027 = ' tên ';
var COM_C_028 = ' Địa chỉ ';
var COM_C_029 = ' sở hữu ';
var COM_C_030 = ' kiểu' ;
var COM_C_031 = ' thế chấp ';
var COM_C_032 = ' chủ đề' ;
var COM_C_033 = ' tên ';
var COM_C_034 = ' Mã công ty' ;
var COM_C_035 = ' Công ty' ;
var COM_C_036 = 'Mô tả' ;
var COM_C_037 = ' xóa ';
var COM_C_038 = ' đại diện ';
var COM_C_039	='Jurisdiction_vn';
var COM_C_040	='Code_vn';
var COM_C_041	='Người đăng Ký';
var COM_C_042	='ALL';
var COM_C_043	='Cán bộ phụ trách';
var COM_C_044	='Số tiếp nhận';


var USL_C_000 ='Tổ chức';
var USL_C_001 ='num';
var USL_C_002 ='user_number';
var USL_C_003 ='Giới tính';
var USL_C_004 ='Được kích hoạt';
var USL_C_005 ='ID';
var USL_C_006 ='Họ tên';
var USL_C_007 ='Mật khẩu';
var USL_C_008 ='address id';
var USL_C_009 ='Địa chỉ';
var USL_C_010 ='Điện thoại';
var USL_C_011 ='Di động';
var USL_C_012 ='Email';
var USL_C_013 ='belong id';
var USL_C_014 ='Tổ chức';
var USL_C_015 ='dept id';
var USL_C_016 ='dept name';
var USL_C_017 ='Chức vụ';
var USL_C_018 ='dept address id';
var USL_C_019 ='dept address detail';
var USL_C_020 ='dept phone';
var USL_C_021 ='dept fax';
var USL_C_022 ='system id';
var USL_C_023 ='id type';
var USL_C_024 ='Quyền hạn';
var USL_C_025 ='Ngôn ngữ'; 


var COM_M_001 = ' Bạn có chắc chắn bạn muốn thoát ? ';
var COM_M_002 = 'Chào mừng' ;
var COM_M_003 = 'chọn một công việc';
var COM_M_004 = 'Là trường không được để trống';
var COM_M_005	='Select row_vn';
var COM_M_006	='Do you complete?_vn';
var COM_M_007	='Do you return?_vn';
var COM_M_008	='Select target location.';
var COM_M_009	='Please select an item to delete';
var COM_M_010	='Please select property item.';
var COM_M_011	='Vui lòng kiểm tra tên đăng nhập hoặc mật khẩu một lần nữa. Tên đăng nhập <br> không đăng ký, hoặc đã nhập vào tên và mật khẩu không chính xác.';


var SYS_BD_001	= 'Board_vn';
var SYS_BD_002	= 'Write_vn';
var SYS_BD_003	= 'Seq_vn';
var SYS_BD_004	= 'Subject_vn';
var SYS_BD_005	= 'Date_vn';
var SYS_BD_006	= 'Author_vn';
var SYS_BD_007	= 'Time_vn';
var SYS_BD_008	= 'View_vn';
var SYS_BD_009	= 'Search_vn';
var SYS_BD_010	= 'Submit_vn';
var SYS_BD_011	= 'Close_vn';
var SYS_BD_012	= 'Choice..._vn';
var SYS_BD_013	= 'Fill out the Subject, please._vn';
var SYS_BD_014	= 'Delete_vn';
var SYS_BD_015	= 'View comment_vn';
var SYS_BD_016	= 'Add comment_vn';
var SYS_BD_017	= 'There is no comment._vn';
var SYS_BD_018	= 'Comment on_vn';
var SYS_BD_019	= 'Unfolding_vn';

var SYS_NT_001	= 'Notice_vn';


var COM_LK_001 = 'Tìm kiếm ID/Mật khẩu';







/* Map */
var MAP_SEARCH_1 = 'TÌM KIẾM THEO VỊ TRÍ';
var MAP_SEARCH_2 = 'Đơn vị hành chính';
var MAP_SEARCH_3 = 'lựa chọn';
var MAP_SEARCH_4 = 'Tìm';
var MAP_SEARCH_5 = 'Kết quả tìm kiếm';
var MAP_SEARCH_6 = 'Please Choose the Administrative Area.';
var MAP_SEARCH_7 = 'Please Enter a Map ID.';
var MAP_SEARCH_8 = 'No Results Found.';
var MAP_SEARCH_9 = 'Xem GCN';
var MAP_SEARCH_10= 'Please Enter a Price Range.';
var MAP_SEARCH_11= '[Certificate]';
var MAP_SEARCH_12= 'Điều kiện tìm kiếm';
var MAP_SEARCH_13= 'Số tờ';
var MAP_SEARCH_14= 'Số thửa';
var MAP_SEARCH_15= 'Giá đất';
var MAP_SEARCH_16 = 'Kế hoạch';



var LA_T_001 = 'Viết Thông tin Giấy chứng nhận';
var LA_T_002='Thông tin thửa đất';
var LA_T_003='Thông tin thửa đất';
var LA_T_004='Nhập thông tin cơ bản của thửa đất';
var LA_T_005='Thông tin sử dụng đất';
var LA_T_006='Nhập thông tin sử dụng đất của thửa đất và từng phần diện tích đất của các chủ sử dụng/sở hữu theo mục đích sử dụng đất';
var LA_T_007='Tài sản trên đất';
var LA_T_008='Nhà-Căn hộ';
var LA_T_009='Nhập thông tin về Nhà-Căn hộ trong phần Tài sản gắn liền với đất.';
var LA_T_010='Công trình xây dựng';
var LA_T_011='Nhập thông tin về Công trình xây dựng trong phần Tài sản gắn liền với đất.';
var LA_T_012='Hạng mục CTXD';
var LA_T_013='Nhập thông tin về hạng mục chi tiết của công trình xây dựng trong phần tài sản gắn liền với đất';
var LA_T_014='Rừng';
var LA_T_015='Nhập thông tin về rừng (rừng trồng) trong phần Tài sản gắn liền với đất.';
var LA_T_016='Tài sản khác';
var LA_T_017='Nhập thông tin về Tài sản khác trong phần Tài sản gắn liền với đất.';
var LA_T_018='Tìm kiếm thông tin chung cư';
var LA_T_019='Tìm kiếm căn hộ';
/* NguyenNV */
var COM_T_010 = 'Tiếp nhận đơn đăng ký';
var COM_T_011 = 'Hồ sơ đính kèm';
var COM_T_012 = 'Kiểm tra hồ sơ bắt buộc còn thiếu khi đăng ký';
var COM_T_013 =	'Nhập thông tin trong trường hợp người đăng kí là công ty (pháp nhân)';
var COM_T_014 = 'Người đăng ký';
var COM_T_015 = 'Ghi lại nội dung đăng kí để giao xử lý đơn';
var COM_T_016 = 'Danh sách hồ sơ đính kèm với đăng ký mới';
var COM_T_017 = 'Nhập thông tin thửa đất tương ứng với hồ sơ đăng ký';
var COM_T_018 = 'Cá nhân/Hộ GĐ';
var COM_T_019 = 'Đăng ký GCN cho Cá nhân/Hộ GĐ';
/* NguyenNV */

var LA_LK_001='Chỉnh sửa';
var LA_LK_002='Đóng';
var LA_LK_003='Mở';

var LA_B_001='Tìm thửa đất';
var LA_B_002='Tìm chủ sở hữu/sử dụng';
var LA_B_003='Thêm mới chủ sở hữu/sử dụng';
var LA_B_004='Tìm kiếm';
var LA_B_005='Thêm';
var LA_B_006='Xóa';
var LA_B_007='Hoàn thành';
var LA_B_008='Quay lại danh sách tác vụ';

var LA_F_003='Số thửa';
var LA_F_004='Diện tích (Hệ thống)';
var LA_F_005='Số thửa cũ';
var LA_F_006='Số tờ';
var LA_F_007='Diện tích (Pháp lý)';
var LA_F_008='Số tờ cũ';
var LA_F_009='Sử dụng thửa và số đo cũ';
var LA_F_010='Đất đô thị';
var LA_F_011='Đất khu dân cư';
var LA_F_012='Địa chỉ thửa đất';
var LA_F_013='Địa chỉ cũ';
var LA_F_014='Mảnh bản đồ';
var LA_F_015='Hồ sơ đo đạc';
var LA_F_016='Mục đích giao đất';
var LA_F_017='Mục đích khác';
var LA_F_018='Nguồn gốc thửa đất';
var LA_F_021='MĐSDĐ';
var LA_F_022='Kế hoạch SD';
var LA_F_023='Mục đích SD';
var LA_F_024='MĐSD chi tiết';
var LA_F_025='Thời hạn SD';
var LA_F_026='Diện tích';
var LA_F_027='Đồng sở hữu';
var LA_F_028='Đất tranh chấp';
var LA_F_029='Tổng diện tích';
var LA_F_030='Chủ sử dụng/sở hữu';
var LA_F_031='DT thành phần';
var LA_F_032='Tỷ lệ (%)';
var LA_F_033='Căn hộ';
var LA_F_034='Địa chỉ';
var LA_F_035='Địa chỉ cũ';
var LA_F_036='Loại';
var LA_F_037='Số tầng';
var LA_F_038='Cấp';
var LA_F_039='Cấu trúc';
var LA_F_040='Kết cấu';
var LA_F_041='Diện tích xây dựng';
var LA_F_042='Hình thức sở hữu sàn riêng';
var LA_F_043='Hình thức sở hữu sàn chung';
var LA_F_044='Diện tích sàn';
var LA_F_045='Thời điểm xây dựng';
var LA_F_046='Thời điểm hoàn thành';
var LA_F_047='Thời hạn sở hữu';
var LA_F_048='Lý do';
var LA_F_049='Đang xây dựng';
var LA_F_050='Số tờ';
var LA_F_051='Số thửa';
var LA_F_052='Mục đích sử dụng đất';
var LA_F_053='Thời hạn sử dụng';
var LA_F_054='Tên CTXD';
var LA_F_055='Người sở hữu';
var LA_F_058='Thời điểm hoàn thành';
var LA_F_059='Đặc điểm';
var LA_F_060='Nguồn gốc';
var LA_F_061='Tên hạng mục';
var LA_F_062='Cấp công trình';
var LA_F_063='Kết cấu chi tiết';
var LA_F_064='Công suất thiết kế';
var LA_F_065='Loại rừng';
var LA_F_066='MĐSD rừng';
var LA_F_067='Nguồn gốc rừng';
var LA_F_068='Diện tích rừng';
var LA_F_069='Đang hình thành';
var LA_F_070='Tên tài sản';
var LA_F_071='Diện tích tài sản';
var LA_F_072='Loại tài sản';
var LA_F_073='Mục đích tài sản';
var LA_F_074='Tên tài sản';
var LA_F_075='Tên chung cư';
var LA_F_076='Chủ đầu tư';

var LA_C_001='Số nhà';
var LA_C_002='Loại nhà';
var LA_C_003='Cấp nhà';
var LA_C_004='Năm XD';
var LA_C_005='Năm HT';
var LA_C_006='Tên đơn vị HC';
var LA_C_007='STT';
var LA_C_008='Tên CC';
var LA_C_009='Chủ ĐT';
var LA_C_010='CT';
var LA_C_003='Cấp nhà';
var LA_C_004='Năm XD';
var LA_C_005='Năm HT';
var LA_C_006='Tên đơn vị HC';
var LA_C_007='STT';
var LA_C_008='Tên CC';


var COM_F_058='Công ty/Tổ chức đại diện';
var COM_F_059='Là đại diện công ty/tổ chức';
var COM_F_060='Là người đại diện';
var COM_F_061='Tổ chức/Cộng đồng dân cư';
var COM_F_062='Đăng ký mới/Biến động GCN cho Công ty/Tổ chức hoặc cộng đồng dân cư';


/* la_admzone 김한준 설정*/
var admzone_popup_title= 'Thông tin ĐVHC'; 
var admzone_column_01 = 'Tên ĐVHC';
var admzone_column_02 = 'ADMZONE ID';
var admzone_column_03 = 'Mã tỉnh (TP)';
var admzone_column_04 = 'Mã huyện (quận)';
var admzone_column_05 = 'Mã xã (phường)';
var admzone_column_06 = 'Có sử dụng ?';
var admzone_column_07 = 'Địa chỉ';

var COM_COL_001 = 'Đã gửi kèm';
var COM_COL_002 = 'Yêu cầu';
var COM_COL_003 = 'Xem chi tiết';
var COM_COL_004 = 'Chi tiết';

var SM_YNText_Y ='Có';
var SM_YNText_N ='Không';

var BS_COL_CMM = 'Xã';
var BS_COL_AR = 'Diện tích';
var BS_COL_PCOUNT = 'Tổng số thửa';
var BS_COL_LTCCOUNT = 'Tổng số GCN';
var BS_COL_LUP = 'Mục đích sử dụng đất';
var BS_COL_PROC = 'Quy trình';

var POP_MES_COMP = 'Thành công!';
var POP_MES_FAIL='Thất bại!';

var RCL_EPT_PRC='Chọn kiểu quy trình...';
var RCL_MES_FAIL='Xin hãy chọn một kiểu quy trình để tạo !';

var BPM_STAT_1='Hoàn thành';
var BPM_STAT_2='Đang xử lý';