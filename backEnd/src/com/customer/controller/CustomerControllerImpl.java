package com.customer.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.customer.dao.CustomerDAOImpl;
import com.customer.vo.Customer;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.response.Country;
import com.response.Response;

@RestController
@RequestMapping(path = "/customer")
public class CustomerControllerImpl implements CustomerController {
	@Autowired
	private CustomerDAOImpl dao;

	public CustomerDAOImpl getDao() {
		return dao;
	}

	public void setDao(CustomerDAOImpl dao) {
		this.dao = dao;
	}

	@Override
	@RequestMapping(value = "/addCustomer")
	public void addCustomer(@RequestBody Customer customerVO) {
		// TODO Auto-generated method stub
		dao.addCustomer(customerVO);
	}

	@Override
	@RequestMapping(value = "/update")
	public String update(@RequestBody Customer customerVO) {
		// TODO Auto-generated method stub
		return dao.updateCustomer(customerVO);
	}

	@Override
	@RequestMapping(value = "/deleteById")
	@ResponseBody
	public String delete(@RequestBody @Valid Customer customerVO) {

		int id = customerVO.getId();
		return dao.deleteCustomer(id);
	}

	@Override
	@RequestMapping(value = "/getAllCustomer")
	@ResponseBody
	public List<Customer> getAllCustomer() {
		List<Customer> list = new ArrayList<Customer>();
		list = dao.getAllCustomer();
		return list;
	}

	@Override
	@RequestMapping(value = "/validateMobileNumber")
	@ResponseBody
	public Response validateMobileNumber(@RequestBody @Valid String mobile_number) {
		try {
			String url = "https://phonevalidation.abstractapi.com/v1/?api_key=199ad18ee342470a9407f3535bbfa158&phone="
					+ mobile_number;
			Content content = Request.Get(url)

					.execute().returnContent();

//			System.out.println(content);
			String s = content.toString();
			JsonObject convertedObject = new Gson().fromJson(s, JsonObject.class);
			Response response = new Response();
			response.setValid(convertedObject.get("valid").getAsString());
			if (response.getValid().equals("true")) {
				Object object = convertedObject.get("country");
				String country = object.toString();
				JsonObject convertedObject1 = new Gson().fromJson(country, JsonObject.class);
				response.setCountryCode(convertedObject1.get("code").getAsString());
				response.setCountryName(convertedObject1.get("name").getAsString());
				response.setOperatorName(convertedObject1.get("prefix").getAsString());
			}
			return response;
		} catch (IOException error) {
			System.out.println(error);
			Response response = new Response();
			response.setValid("invalid");
			return response;
		}

	}
}
