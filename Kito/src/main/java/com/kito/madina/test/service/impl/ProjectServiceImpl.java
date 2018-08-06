package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kito.madina.test.service.ProjectService;
import com.kito.madina.test.vo.ProjectVO;


@Service("ProjectService")
public class ProjectServiceImpl implements ProjectService{
	
	@Override
	public List<ProjectVO> selectAllProject() {
		List<ProjectVO> list = new ArrayList<ProjectVO>();
		
		return list;
	}
}
