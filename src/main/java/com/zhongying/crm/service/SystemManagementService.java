package com.zhongying.crm.service;
/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:57:21
 * 
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.SystemManagementMapper;
import com.zhongying.crm.model.Admin;

@Service
public class SystemManagementService {

	@Autowired
	private SystemManagementMapper systemManagementMapper;

	public List<Admin> queryAllAdmin() {
		return systemManagementMapper.queryAllAdmin();
	}
}
