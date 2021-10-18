package com.customer.controller;

import java.util.List;

import com.customer.vo.Customer;
import com.response.Response;

public interface CustomerController {


	public Response validateMobileNumber(String mobile_number);

	public void addCustomer(Customer customerVO);

	public String update(Customer customerVO);

	public String delete(Customer customerVO);

	public List<Customer> getAllCustomer();

}
