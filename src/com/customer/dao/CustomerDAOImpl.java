package com.customer.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

import com.customer.vo.Customer;

@Transactional
public class CustomerDAOImpl implements CustomerDAO {

	private SessionFactory sessionFactory;


	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
//	@Transactional
	public void addCustomer(Customer customerVO) {
		sessionFactory.getCurrentSession().persist(customerVO);
	}

	@Override
	public String updateCustomer(Customer customerVO) {
		Customer s = sessionFactory.getCurrentSession().find(Customer.class, customerVO.getId());
		if (s != null) {
			s.setName(customerVO.getName());
			s.setAddress(customerVO.getAddress());
			s.setMobile_number(customerVO.getMobile_number());
			sessionFactory.getCurrentSession().update(s);
			return "done";
		}else {
			return "incorrect id ";
		}

	}

	@Override
	public String deleteCustomer(int id) {
		Customer s = sessionFactory.getCurrentSession().find(Customer.class, id);
		if (s != null) {
			sessionFactory.getCurrentSession().delete(s);
			return "done";
		} else {
			return "incorrect id ";
		}

	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Customer> getAllCustomer() {
		try {
			List<Customer> listCustomer = sessionFactory.getCurrentSession().createQuery("from Customer").list();
			return listCustomer;
		} catch (HibernateException e) {
			return null;
		}
	}
}
