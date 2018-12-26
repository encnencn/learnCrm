package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.DepartmentMapper;
import com.zhongying.crm.model.Area;
import com.zhongying.crm.model.Department;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class DepartmentService {

	@Autowired
	private DepartmentMapper departmentService;

	// 获得分公司列表
	public List<Department> getDepartmentList(Department department) {
		
		return departmentService.getDepartmentList(department);
	}
	
	//查询所有父菜单列表
	public List<Area> selectAllArea() {
		
		return departmentService.selectAllArea();
	}
	
	// 删除分公司
	public void deleteDepartment(Integer id) {

		departmentService.deleteDepartment(id);
		}
		
	//更新分公司展示
	public Department updateDepartmentView(Integer id) {
			
		 return departmentService.updateDepartmentView(id);
		}
		
	// 修改分公司提交
		public Boolean updateDepartmentSubmit(Department department) {

			return departmentService.updateDepartmentSubmit(department);
		}
		
		// 添加分公司
		public Boolean addDepartment(Department department) {

			return departmentService.addDepartment(department);
		}
		
		//查询分公司
		public List<Department> searchDepartment(String departmentname) {
				
			return departmentService.searchDepartment(departmentname);
			
		}

		public Department queryByAreaName(String name) {
			// TODO Auto-generated method stub
			return departmentService.queryByAreaName(name);
		}

		public Department querydepartmentById(Integer id) {
			// TODO Auto-generated method stub
			return departmentService.querydepartmentById(id);
		}
	
}
