package com.zhongying.crm.mapper;

import com.zhongying.crm.model.*;
import org.apache.ibatis.annotations.*;
import tk.mybatis.mapper.common.BaseMapper;

import java.util.List;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

public interface WsgoodsMapper extends BaseMapper<Wsgoods> {



	// 通过用户名查询用户(包含用户角色和所属公司名)
	@Select("select a.*,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id where username=#{username} and isDisable=0")
	public Admin queryByName(String username);



}
