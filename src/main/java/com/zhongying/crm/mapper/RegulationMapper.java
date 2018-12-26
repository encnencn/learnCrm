package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Regulation;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午4:59:54
 * 
 */
public interface RegulationMapper extends BaseMapper<Admin> {

	@Insert("insert into regulation(title,content,createTime) values(#{title},#{content},#{createTime})")
	public void saveRegulation(Regulation regulation);

	@Select("select * from regulation")
	public List<Regulation> queryAllRegulation();

	@Update("update regulation set title=#{title},content=#{content} where id=#{id}")
	public Boolean updateNotice( Regulation regulation);

	@Select("select * from regulation where title=#{title}")
	public Regulation queryByRegulationTitle(String title);
	@Select("select * from regulation where id=#{id}")
	public Regulation queryRegulationById(Integer id);

}
