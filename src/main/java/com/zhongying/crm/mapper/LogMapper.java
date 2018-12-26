package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.zhongying.crm.model.OperatorLog;
import com.zhongying.noscan.MyMapper;





/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface LogMapper extends MyMapper<OperatorLog>{
	

	
		//初始化日志列表并格式化
		@Select("SELECT r.id,r.action,r.url,r.description,r.createtime,a.truename FROM operatorlogrecords r LEFT JOIN admin a ON r.adminid=a.id ORDER BY createtime desc ")
		public List<OperatorLog> getLogList(OperatorLog operatorLog);
		
		//初始化日志列表并格式化-后台分页
		@Select("SELECT r.id,r.action,r.url,r.description,r.createtime,a.truename FROM operatorlogrecords r LEFT JOIN admin a ON r.adminid=a.id ORDER BY createtime desc ")
		public List<OperatorLog> getLogList2(Integer pageNum);
		
		//搜索日志列表并格式化
		//@Select("SELECT r.id,r.action,r.url,r.description,r.createtime,a.truename FROM operatorlogrecords r LEFT JOIN admin a ON r.adminid=a.id  where ${select1} LIKE concat('%',#{input1},'%')  ")
		@Select("SELECT r.id,r.action,r.url,r.description,r.createtime,a.truename FROM operatorlogrecords r LEFT JOIN admin a ON r.adminid=a.id  where ${select1} LIKE concat('%',#{input1},'%') and ${select2} LIKE concat('%',#{input2},'%')  ORDER BY r.createtime ASC ")
		public List<OperatorLog> searchLog(@Param("select1") String select1,@Param("select2") String select2,@Param("input1") String input1,@Param("input2") String input2,@Param("pageNum") Integer pageNum);
		
		//日志添加
		@Insert(" INSERT INTO operatorlogrecords (action,url,description,createtime,adminid"
				+ ")  VALUES (#{action},#{url},#{description},#{createTime},#{adminId} )")
		public void addLog(OperatorLog operatorLog);
		
		//根据执行操作获取描述
		@Select("select name from function where url = #{action} ")
		public String selectDesctitionByAction(String action);
			
		
}
