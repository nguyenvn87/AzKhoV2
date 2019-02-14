/*package com.kito.madina.config;

import java.nio.charset.StandardCharsets;
import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;


import com.kito.madina.config.servlet.SwaggerServletConfig;
*/
/*
public class AzKhoWebApplicationInitializer implements WebApplicationInitializer {
	private static final String SPRING_PROFILES_ACTIVE = "SPRING_PROFILES_ACTIVE";

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// Create the 'root' Spring application context
		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		rootContext.register(WebMvcConfig.class);
		// Manage the lifecycle of the root application context
		servletContext.addListener(new ContextLoaderListener(rootContext));
		servletContext.addListener(new HttpSessionEventPublisher());

		createFilter(servletContext);

		createDispatcherServlet(servletContext, rootContext);

		configProfile(servletContext);
	}

	private void createDispatcherServlet(ServletContext servletContext, WebApplicationContext context) {
		// Create do servlet

		ServletRegistration.Dynamic otherwiseServlet = servletContext.addServlet("swaggerServletConfig", new DispatcherServlet());
		otherwiseServlet.setLoadOnStartup(1);
		otherwiseServlet.addMapping("/");
		otherwiseServlet.setInitParameter("listings", "false");
		otherwiseServlet.setInitParameter("contextClass", AnnotationConfigWebApplicationContext.class.getName());
		otherwiseServlet.setInitParameter("contextConfigLocation", SwaggerServletConfig.class.getName());
	}

	private void configProfile(ServletContext servletContext) {
		String profile = "default";
		if (null != System.getenv(SPRING_PROFILES_ACTIVE) && !System.getenv(SPRING_PROFILES_ACTIVE).isEmpty()) {
			profile = System.getenv(SPRING_PROFILES_ACTIVE);
		} else if (null != System.getProperty(SPRING_PROFILES_ACTIVE) && !System.getProperty(SPRING_PROFILES_ACTIVE).isEmpty()) {
			profile = System.getProperty(SPRING_PROFILES_ACTIVE);
		}

		servletContext.setInitParameter("spring.profiles.active", profile);
	}

	private void createFilter(ServletContext servletContext) {
		//Filter encodingFilter = new CharacterEncodingFilter(StandardCharsets.UTF_8.name());
		//servletContext.addFilter("encodingFilter", encodingFilter).addMappingForServletNames(EnumSet.of(DispatcherType.REQUEST), true, "report");
	}
}
*/