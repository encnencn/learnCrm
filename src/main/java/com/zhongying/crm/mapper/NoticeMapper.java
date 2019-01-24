package com.zhongying.crm.mapper;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhongying.noscan.MyMapper;
import org.apache.ibatis.annotations.*;

import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Notice;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午4:59:54
 * 
 */
@Mapper
public interface NoticeMapper extends MyMapper<Admin> {

	@Select("select notice.*,trueName from notice left join admin on notice.adminid=admin.id")
	public List<Notice> queryAllNotice();

	@Select("select trueName from admin where id=#{id} ")
	public String queryByadminId(Integer id);

	@Select("select adminid from notice where id=#{id}")
	public Integer queryAdminId(Integer id);

	@Insert("insert into notice(title,content,status,createTime,adminId) values(#{notice.title},#{notice.content},#{notice.status},#{notice.createTime},#{id})")
	public void saveNotice(@Param("notice") Notice notice, @Param("id") Integer id);

	@Select("select notice.*,trueName from notice,admin where notice.adminid=admin.id and title LIKE CONCAT(CONCAT('%',#{title},'%'))  ")
	public Notice queryByTitle(String title);
	@Select("select notice.*,trueName from notice,admin where notice.adminid=admin.id and title=#{title} and status=1")
	public Notice queryByTitle1(String title);

	@Update("update notice set title=#{title},content=#{content},status=#{status} where id=#{id}")
	public Boolean updateNotice( Notice notice);

	@Select("select  notice.*,trueName from notice left join admin on notice.adminid=admin.id where status=1")
	public List<Notice> queryNotice1();
	
	@Select("SELECT  notice.*,trueName FROM notice LEFT JOIN admin ON notice.adminid=admin.id WHERE STATUS=1 ORDER BY createTime DESC LIMIT 0 ,1")
	public Notice queryLastNotice();
	@Select("select * from notice where id=#{id}")
	public Notice queryNoticeById(Integer id);


	JSONArray getWxInfoList();
}
