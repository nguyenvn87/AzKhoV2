package com.kito.madina.test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kito.madina.test.dao.CustomerDAO;
import com.kito.madina.test.service.CustomerService;
import com.kito.madina.test.vo.CustomerVO;


@Service("customerService")
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerDAO CustomerDAO;
	
	@Override
	public CustomerVO getCustomerVOByVo(CustomerVO vo) {
		CustomerVO restaurantVO = CustomerDAO.getCustomerVOByVo(vo);
		return restaurantVO;
	}
	@Override
	public int createCustomerVO(CustomerVO vo) {
		int i = CustomerDAO.createCustomerVO(vo);
		return i;
	}
	@Override  
	public int updateCustomerVO(CustomerVO vo){
		int i = CustomerDAO.updateCustomerVO(vo);
		return i;
	}
	@Override  
	public List<CustomerVO> getListCustomerVO(CustomerVO vo){
		List<CustomerVO> list = CustomerDAO.getListCustomerVO(vo);
		return list;
	}
	@Override
	public List<CustomerVO> getSearchListAllCustomer(CustomerVO map){
		List<CustomerVO> list = CustomerDAO.getSearchListAllCustomer(map);
		return list;
	}
	@Override
	public HashMap<String, Object> getListCountSearchCustomer(CustomerVO map){
		HashMap<String, Object> list = CustomerDAO.getListCountSearchCustomer(map);
		return list;
	}
}
