<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/ext-4.2.1.883/ext-all.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/ext-4.2.1.883/src/ux/iframe/IFrame.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/pdf.js/pdf.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/common/locate/biz-lang-vn.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/CustomAngular/sweetalert.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/jquery/jquery-2.1.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/lib/CustomAngular/sweetalert.min.css" >
<%-- <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/ext-4.2.1.883/resources/css/ext-all.css" />  --%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/ext-4.2.1.883/resources/ext-theme-neptune/ext-theme-neptune-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/theme.css" />
 <%-- <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/common-style.css" /> --%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/business-support.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/all-common.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/form.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/custom.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/custom-left-menu.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/search.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/lib/export/PrintPDF.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/support/globalConfig.js" charset="utf-8"></script>


<script>
var simpleComboBoxStoreUrl = '<c:url value="/code/getComboList.json" />';
	Ext.define('request',{
		getContextPath: '<%=request.getContextPath()%>'
	});
	var request = Ext.create('request');	
	var contextPath = '<%=request.getContextPath()%>';	
	var gridPageSize	= 15;
	var WEB_ADDR = 'www.azkho.com';
	
	Ext.require(['*']);
	Ext.require('Ext.ux.IFrame');
	Ext.Loader.setPath({
		'CMM' 	: contextPath + '/js/lib/common',
		'MNG' 	: contextPath + '/js/MNG',
		'ECNT'	: contextPath + '/js/ECOUNT',
		'SPRT' 	: contextPath + '/js/SPRT',
		'LAFORM': contextPath + '/js/form',
		'BIZ' 	: contextPath + '/js/support',
		'Ext.extCombo'	: contextPath + '/js/lib/extCombo',
		'Ext.ux'		: contextPath + '/js/ext-4.2.1.883/ux',
		'BS' 			: contextPath + '/js/container',
		'pckg.cmmn' 	: contextPath + '/js/cmmn',
		'pckg.system'	: contextPath + '/js/system',
		'Ext.custom.common' : contextPath + '/js/ext-4.2.1.883/custom/common'
	}); 
</script>