package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.zhongying.crm.model.Area;
import com.zhongying.noscan.MyMapper;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface AreaMapper extends MyMapper<Area>{
	
	@Select("select * from area ")
	public List<Area> queryAllArea();
	
	@Select("select * from area where name=#{name}")
	public Area queryByAreaName(String name);

	@Delete("delete  from area where id=#{id}")
	public Boolean deleteArea(Integer id);

	@Insert("insert into area (name) value (#{areaName})")
	public Boolean saveArea(String areaName);
	@Update("update  area set name=#{areaName} where id=#{id}")
	public Boolean updateAreaSubmit(@Param("id")Integer id, @Param("areaName")String areaName);
	
	@Select("select * from area where id=#{id}")
	public Area queryAreaById(Integer id);	

}
