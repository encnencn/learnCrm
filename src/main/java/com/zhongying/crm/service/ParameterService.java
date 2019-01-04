package com.zhongying.crm.service;

import com.zhongying.crm.mapper.ParameterMapper;
import com.zhongying.crm.model.Parameter;
import com.zhongying.crm.util.DateFormatTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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


    public int parameterAdd(Parameter parameter) {
		parameter.setId(null);
		parameter.setModifydatetime(null);
		parameter.setCreatedatetime(DateFormatTool.getFormatCurrentTime());
		return   parameterMapper.insert(parameter);

    }

	public int parameterEdit(Parameter parameter) {
		parameter.setCreatedatetime(null);
		parameter.setModifydatetime(DateFormatTool.getFormatCurrentTime());
		return   parameterMapper.updateByPrimaryKeySelective(parameter);
	}

	public int parameterDelete(Parameter parameter) {

		return parameterMapper.delete(parameter);
	}

	public Parameter parameterOne(Integer id) {
		return parameterMapper.selectByPrimaryKey(id);
	}

	public Integer checkParameterName(Parameter parameter) {
		Parameter record = new Parameter();
		record.setId(parameter.getId());
		record.setEnName(parameter.getEnName());
        return parameterMapper.checkParameterName(parameter);


	}
}
