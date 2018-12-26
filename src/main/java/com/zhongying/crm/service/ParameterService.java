package com.zhongying.crm.service;

import com.zhongying.crm.mapper.ParameterMapper;
import com.zhongying.crm.model.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class ParameterService {

	@Autowired
	private ParameterMapper parameterMapper;

	// 获得客户列表
	public List<Parameter> parameterList(String enName) {
		
		return parameterMapper.parameterList(enName);
	}
	

}
