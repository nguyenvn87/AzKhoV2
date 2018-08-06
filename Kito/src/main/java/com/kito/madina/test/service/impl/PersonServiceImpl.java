package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.PersonDAO;
import com.kito.madina.test.service.PersonService;
import com.kito.madina.test.vo.PersonVO;


@Service
public class PersonServiceImpl implements PersonService{

	@Autowired
	private PersonDAO personDao;
	@Override
	public List<PersonVO> selectAllPerson() {
		System.out.println("Size = ");
		List<PersonVO> list = personDao.selectAllPerson();
		System.out.println("Size = "+list.size());
		return list;
	}
}
