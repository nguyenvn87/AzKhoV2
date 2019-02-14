/*package com.kito.madina.config.servlet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.google.common.collect.Lists;
import com.kito.madina.config.SwaggerConfig;

@EnableWebMvc
//@ComponentScan(basePackages = {"com.kito.madina"}, includeFilters = { @Filter(type = FilterType.ANNOTATION, classes = Controller.class) }, useDefaultFilters = false)
@Import({ SwaggerConfig.class })
public class SwaggerServletConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String resourceHandlers[] = new String[] {"/resources/**", "swagger-ui.html", "/webjars/**"} ;
		String resourceLocations[] = new String[] {"/resources/", "classpath:/META-INF/resources/", "classpath:/META-INF/resources/webjars/"};
		registry.setOrder(1).addResourceHandler(resourceHandlers).addResourceLocations(resourceLocations);
	}

	@Bean
	ViewResolver contentNegotiatingViewResolver() {
		MappingJackson2JsonView jacksonView = new MappingJackson2JsonView();

		InternalResourceViewResolver internalResource = new InternalResourceViewResolver();
		internalResource.setPrefix("/WEB-INF/jsp/activiti/pages/");
		internalResource.setSuffix(".jsp");

		ContentNegotiatingViewResolver viewResolver = new ContentNegotiatingViewResolver();
		//viewResolver.setViewResolvers(Lists.newArrayList(internalResource));
		//viewResolver.setDefaultViews(Lists.newArrayList(jacksonView));

		return viewResolver;
	}
}
*/