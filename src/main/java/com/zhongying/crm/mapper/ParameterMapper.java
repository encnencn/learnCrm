package com.zhongying.crm.mapper;

import com.zhongying.crm.model.Area;
import com.zhongying.crm.model.Parameter;
import com.zhongying.noscan.MyMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface ParameterMapper extends MyMapper<Parameter>{


	 List<Parameter> parameterList(@Param("enName") String enName);


}
