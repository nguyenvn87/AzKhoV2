package com.kito.madina.cmmn.util.jasper;

import java.io.ByteArrayOutputStream;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.ui.jasperreports.JasperReportsUtils;
import org.springframework.util.CollectionUtils;

public abstract class CustomAbstractJasperReportsSingleFormatView extends
		CustomAbstractJasperReportsView {
	protected boolean generatesDownloadContent() {
		return !useWriter();
	}

	protected void renderReport(JasperPrint populatedReport,
			Map<String, Object> model, HttpServletResponse response)
			throws Exception {
		JRExporter exporter = createExporter();

		Map mergedExporterParameters = getConvertedExporterParameters();
		if (!CollectionUtils.isEmpty(mergedExporterParameters)) {
			exporter.setParameters(mergedExporterParameters);
		}
		if (useWriter()) {
			renderReportUsingWriter(exporter, populatedReport, response);
		} else {
			renderReportUsingOutputStream(exporter, populatedReport, response);
		}
	}

	protected void renderReportUsingWriter(JRExporter exporter, JasperPrint populatedReport, HttpServletResponse response) throws Exception {
		String contentType = getContentType();
		String encoding = (String) exporter.getParameter(JRExporterParameter.CHARACTER_ENCODING);
		if (encoding != null) {
			if ((contentType != null) && (!contentType.toLowerCase().contains(";charset="))) {
				contentType = contentType + ";charset=" + encoding;
			}
		}
		response.setContentType(contentType);

		JasperReportsUtils.render(exporter, populatedReport, response.getWriter());
	}

	protected void renderReportUsingOutputStream(JRExporter exporter, JasperPrint populatedReport, HttpServletResponse response) throws Exception {
		ByteArrayOutputStream baos = createTemporaryOutputStream();
		JasperReportsUtils.render(exporter, populatedReport, baos);
		writeToResponse(response, baos);
	}

	protected abstract JRExporter createExporter();

	protected abstract boolean useWriter();
}
