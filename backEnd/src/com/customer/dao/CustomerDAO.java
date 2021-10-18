package com.customer.dao;

import java.util.List;

import com.customer.vo.Customer;

public interface CustomerDAO {

	public void addCustomer (Customer customerVO);
	public String updateCustomer (Customer customerVO);
	public String deleteCustomer (int id);
	public List<Customer> getAllCustomer ();
}
