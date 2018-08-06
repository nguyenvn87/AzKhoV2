/**
 * 
 */
package com.kito.madina.cmmn.util.jasper;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;

import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

/**
 * @author Chau
 *
 */
public class JasperReportsDocxView extends CustomAbstractJasperReportsSingleFormatView{

	public JasperReportsDocxView() {
		setContentType("application/docx");
	}

	@Override
	protected JRExporter createExporter() {
		return new JRDocxExporter();
	}

	@Override
	protected boolean useWriter() {
		return false;
	}
}
