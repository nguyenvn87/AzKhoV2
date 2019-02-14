/**
 * 
 */
package com.kito.madina.cmmn.util.jasper;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JasperPrint;

import org.springframework.beans.BeanUtils;
import org.springframework.util.CollectionUtils;

/**
 * @author Chau
 * 
 */
public class CustomJasperReportsDocxFormatView extends CustomAbstractJasperReportsView {
	public static final String DEFAULT_FORMAT_KEY = "format";
	private String formatKey = "format";
	private Map<String, Class<? extends CustomAbstractJasperReportsView>> formatMappings;
	private Properties contentDispositionMappings;

	public CustomJasperReportsDocxFormatView() {
		this.formatMappings = new HashMap(1);
		this.formatMappings.put("docx", JasperReportsDocxView.class);
	}

	public void setFormatKey(String formatKey) {
		this.formatKey = formatKey;
	}

	public void setFormatMappings(
			Map<String, Class<? extends CustomAbstractJasperReportsView>> formatMappings) {
		if (CollectionUtils.isEmpty(formatMappings)) {
			throw new IllegalArgumentException(
					"'formatMappings' must not be empty");
		}
		this.formatMappings = formatMappings;
	}

	public void setContentDispositionMappings(Properties mappings) {
		this.contentDispositionMappings = mappings;
	}

	public Properties getContentDispositionMappings() {
		if (this.contentDispositionMappings == null) {
			this.contentDispositionMappings = new Properties();
		}
		return this.contentDispositionMappings;
	}

	protected boolean generatesDownloadContent() {
		return true;
	}

	protected void renderReport(JasperPrint populatedReport,
			Map<String, Object> model, HttpServletResponse response)
			throws Exception {
		String format = (String) model.get(this.formatKey);
		String fileName = (String) model.get("filename");
		if (format == null) {
			throw new IllegalArgumentException("No format format found in model");
		}
		if (this.logger.isDebugEnabled()) {
			this.logger.debug("Rendering report using format mapping key [" + format + "]");
		}
		Class<? extends CustomAbstractJasperReportsView> viewClass = (Class) this.formatMappings.get(format);
		if (viewClass == null) {
			throw new IllegalArgumentException("Format discriminator [" + format + "] is not a configured mapping");
		}
		if (this.logger.isDebugEnabled()) {
			this.logger.debug("Rendering report using view class [" + viewClass.getName() + "]");
		}
		CustomAbstractJasperReportsView view = (CustomAbstractJasperReportsView) BeanUtils.instantiateClass(viewClass);

		view.setExporterParameters(getExporterParameters());
		view.setConvertedExporterParameters(getConvertedExporterParameters());
		if(fileName!=null && !fileName.isEmpty()) {
			String fileNames = fileName + ".docx";
			response.setHeader("content-disposition", "attachment; filename=\""+fileNames+"\"");
		}
		else
			populateContentDispositionIfNecessary(response, format);
		
		view.renderReport(populatedReport, model, response);
	}

	private void populateContentDispositionIfNecessary(HttpServletResponse response, String format) {
		Date date = new Date() ;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss") ;
		String fileName = dateFormat.format(date) + ".docx";
		response.setHeader("content-disposition", "attachment; filename=\""+fileName+"\"");
	}
}
