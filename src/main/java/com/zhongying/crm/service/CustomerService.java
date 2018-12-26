package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.CustomerMapper;
import com.zhongying.crm.model.Customer;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class CustomerService {

	@Autowired
	private CustomerMapper customermapper;

	// 获得客户列表
	public List<Customer> getCustomerList(Customer customer) {
		
		return customermapper.getCustomerList(customer);
	}

	// 删除客户
	public void deleteCustomer(Integer id) {

		customermapper.deleteCustomer(id);
	}

	// 添加客户
	public void addCustomer(Customer customer,Integer adminid) {

		customermapper.addCustomer(customer, adminid);
	}

	// 修改客户
	public void updateCustomer(Customer customer,Integer adminid) {

		customermapper.updateCustomer(customer, adminid);
	}

	public Integer selectAdminIdByTrueName(String truename) {
		
		return customermapper.selectAdminIdByTrueName(truename);
	
	}
	
	//查询用户
	public List<Customer> searchCustomer(String customername) {
			
		return customermapper.searchCustomer(customername);
		
	}
	
	//更新客户展示
	public Customer updateCustomerView(Integer customerid) {
		
		return customermapper.updateCustomerView(customerid);
	}
	
	//通过客户编码查找ID
	public Integer findIdByCode(String customercode) {
		
		return customermapper.findIdByCode(customercode);
	}
	
	//通过客户名称查找ID
	public Integer findIdByName(String customername) {
		
		return customermapper.findIdByName(customername);
	}
	
	//查找所有真实姓名
	public List<String> selectAllTrueName() {
		
		return customermapper.selectAllTrueName();
	}
	
	//客户审核通过
	public void applicationApproved(Integer id) {
		customermapper.applicationApproved(id);
		
	}
	
	//客户审核被拒
	public void applicationRefused(Integer id) {
		customermapper.applicationRefused(id);
		
	}
	
	//有效客户列表
	public List<Customer> getEfficientList(Customer customer) {
		// TODO Auto-generated method stub
		return customermapper.getEfficientList(customer);
	}

	public List<Customer> searchEfficientCustomer(String customername) {
		
		return customermapper.searchEfficientCustomer(customername);
	}
	
	//当前用户所录客户列表
	public List<Customer> getPersonalCustomerList(Integer adminid) {
		
		return customermapper.getPersonalCustomerList(adminid);
	}
public List<Customer> getPersonalCustomerList1(Integer adminid) {
		
		return customermapper.getPersonalCustomerList1(adminid);
	}
	

	public List<Customer> queryByCustomerName(String name) {
		// TODO Auto-generated method stub
		return customermapper.queryByCustomerName(name);
	}
	public Integer queryIdBycustomerName(String customerName){
		return customermapper.queryIdBycustomerName(customerName);
	}

	public Integer existorNot(String customerName) {
		
		return customermapper.existorNot( customerName);
	}
	
	//查询当前用户所录客户
	public List<Customer> searchCustomer_personal(String customername,Integer adminId) {
		// TODO Auto-generated method stub
		return customermapper.searchCustomer_personal(customername,adminId);
	}

	public List<Integer> searchCustomerId(String namechar) {
		// TODO Auto-generated method stub
		return customermapper.searchCustomerId(namechar);
	}

	public Customer queryByCustomerId(Integer id) {
		// TODO Auto-generated method stub
		return customermapper.queryByCustomerId(id);
	}

	public List<Customer> searchCustomerByStr(String customername) {
		// TODO Auto-generated method stub
		return customermapper.searchCustomerByStr(customername);
	}


	public List<Customer> queryByCustomerCode(String name) {

		return customermapper.queryByCustomerCode(name);
	}
}
