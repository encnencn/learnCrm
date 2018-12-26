package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.zhongying.crm.model.Admin;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午4:59:54
 * 
 */
public interface SystemManagementMapper extends BaseMapper<Admin> {

	@Select("select * from admin")
	public List<Admin> queryAllAdmin();

}
