package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.zhongying.crm.model.Area;
import com.zhongying.crm.model.Department;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.util.MyMapper;





/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

public interface DepartmentMapper extends MyMapper<Function>{
	

		//查询部门列表并格式化
		@Select(" SELECT   d.id , d.departmentname , d.address , d.tel , d.areaId , a.name   FROM   Department   d LEFT JOIN Area a   ON   d.areaId=a.id  ")
		public List<Department> getDepartmentList(Department department);
		
		//查询所有父部门列表
		@Select(" SELECT * FROM AREA")
		public List<Area> selectAllArea();
		
		//删除部门
		@Delete(" delete from department where id = #{id}")
		public void deleteDepartment(Integer id);
		
		//修改部门前展示
		@Select(" SELECT   d.id , d.departmentname departmentName, d.address , d.tel , d.areaId , a.name   FROM   Department  d LEFT JOIN Area a   ON   d.areaId=a.id where d.id =#{id} ")
		public Department updateDepartmentView(Integer id);
						
				
		//更新部门
		@Update(" UPDATE DEPARTMENT SET departmentname = #{departmentName},address = #{address},tel = #{tel},areaId = #{areaId} WHERE id = #{id} ")
		public Boolean updateDepartmentSubmit( Department department);
		
		//增加部门
		@Insert(" INSERT INTO DEPARTMENT (departmentname,address,tel,areaId)  VALUES (#{departmentName},#{address},#{tel},#{areaId} )")
		public Boolean addDepartment(  Department department);
			
		//根据输入部门名查询部门列表
		@Select(" SELECT   d.id , d.departmentname , d.address , d.tel , d.areaId , a.name   FROM   Department   d LEFT JOIN Area a   ON   d.areaId=a.id where d.departmentname =#{departmentname} or d.address=#{departmentname} or a.name=#{departmentname}")
		public List<Department> searchDepartment(String departmentname);
		
		@Select("select * from department where departmentName=#{name}")
		public Department queryByAreaName(String name);
		@Select("select * from department where id=#{id}")
		public Department querydepartmentById(Integer id);
		
		
}
