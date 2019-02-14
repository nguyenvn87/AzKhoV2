package com.kito.madina.test.service;

import java.util.HashMap;
import java.util.List;

import com.kito.madina.test.vo.CustomerVO;

public interface CustomerService {
	
	public CustomerVO getCustomerVOByVo(CustomerVO vo);
	public int createCustomerVO(CustomerVO vo);
	public int updateCustomerVO(CustomerVO vo);
	public List<CustomerVO> getListCustomerVO(CustomerVO vo);
	public List<CustomerVO> getSearchListAllCustomer(CustomerVO map);
	public HashMap<String, Object> getListCountSearchCustomer(CustomerVO map);
	public int deleteCustomerByID(CustomerVO vo);
}
