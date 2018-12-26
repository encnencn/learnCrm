package com.zhongying.crm.controller;


import java.util.List;

import javax.annotation.Resource;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.Area;
import com.zhongying.crm.model.Department;

import com.zhongying.crm.service.DepartmentService;

/**
 * @author yangyingjie E-mail:931526599@qq.com
 * @version 创建时间：2017年5月16日 下午2:15:36 类说明
 */
@RestController
public class DepartmentController {
	@Resource
	private DepartmentService departmentService;

	JSONArray jsonTable = new JSONArray();

	// 分公司管理界面显示分公司列表
	@RequestMapping("/departmentList")
	public String departmentList(Department department) {
		System.out.println("进入departmentList");
		List<Department> departmentList = null;
		try {
			departmentList = departmentService.getDepartmentList(department);
			//System.out.println(JSON.toJSONString(departmentList));
		} catch (Exception e) {
			System.out.println("分公司列表异常");
		}
		return JSON.toJSONString(departmentList);
	}

	
	// 添加、修改部门信息时，填充区域下拉列表
	@RequestMapping(value = "/selectAllArea", method = RequestMethod.POST)

		public String selectAllArea() {
			System.out.println("进入selectAllArea");

			List<Area> areaList = null;
			try {
				areaList = departmentService.selectAllArea();
				//System.out.println(JSON.toJSONString(areaList));
			} catch (Exception e) {
				System.out.println("查询父菜单异常");
			}
			return JSON.toJSONString(areaList);
		}

	
	// 删除分公司
	@RequestMapping(value = "/deleteDepartment", method = RequestMethod.POST)

	public void deleteDepartment(@RequestParam Integer id) {
		System.out.println("进入deleteDepartment");
		try {
			departmentService.deleteDepartment(id);
		} catch (Exception ex) {
		}
	}

	// 修改分公司展示
	@RequestMapping(value = "/updateDepartmentView", method = RequestMethod.POST)

	public String updateDepartmentView(@RequestParam Integer id) {
		System.out.println("进入updateDepartmentView");
		System.out.println("传过来的ID：" + id);
		Department department=new Department();
		try {
			department= departmentService.updateDepartmentView(id);
		} catch (Exception e) {
			System.out.println("修改分公司展示异常");
		}
		return JSON.toJSONString(department);
	}

	// 修改提交
		@RequestMapping(value = "/updateDepartmentSubmit", method = RequestMethod.POST)
		public Boolean updateDepartmentSubmit(Department department) {
			System.out.println(department.getId()+"========================");
			if(department!=null){
				Department department1=departmentService.querydepartmentById(department.getId());
				if(department1.getDepartmentName().equals(department.getDepartmentName())){
					return departmentService.updateDepartmentSubmit(department);
				}else{
					if(departmentService.queryByAreaName(department.getDepartmentName())==null){
					    return departmentService.updateDepartmentSubmit(department);
					}else{
						return false;
					}
				}
			}else{
				return false;
			}
		}

	// 增加分公司
	@RequestMapping(value = "/addDepartmentSubmit", method = RequestMethod.POST)
	public Boolean addDepartmentSubmit(Department department) {
		
		System.out.println("进入addDepartmentSubmit");
		
			if(departmentService.queryByAreaName(department.getDepartmentName())==null){
				return departmentService.addDepartment(department);
			}else{
				return false;
			} 
	}

	// 查询分公司
	@RequestMapping(value = "/searchDepartment", method = RequestMethod.POST)

	public String searchDepartment(String departmentname) {
		System.out.println("进入searchDepartment");
		System.out.println("departmentname"+departmentname);
		List<Department> departmentList = null;
		try {
			departmentList = departmentService.searchDepartment(departmentname);
			//System.out.println(JSON.toJSONString(departmentList));
		} catch (Exception e) {
			System.out.println("查询菜单异常");
		}
		return JSON.toJSONString(departmentList);
	};

	@RequestMapping("/departmentExistOrnot")
	public Boolean quyuNameExistOrnot(String name){
		if(departmentService.queryByAreaName(name)==null){
			return true;
		}else{
			return false;
		}
	}

}
