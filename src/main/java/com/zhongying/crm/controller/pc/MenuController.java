package com.zhongying.crm.controller.pc;


import java.util.List;

import javax.annotation.Resource;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

import com.zhongying.crm.model.Function;

import com.zhongying.crm.service.MenuService;

/**
 * @author yangyingjie E-mail:931526599@qq.com
 * @version 创建时间：2017年5月16日 下午2:15:36 类说明
 */
@RestController
public class MenuController {
	@Resource
	private MenuService menuService;

	JSONArray jsonTable = new JSONArray();

	// 菜单管理界面显示菜单列表
	@RequestMapping("/menuList")
	public String menuList(Function funtion) {
		System.out.println("进入menuList");
		List<Function> menuList = null;
		try {
			
			menuList = menuService.getMenuList(funtion);
			//System.out.println(JSON.toJSONString(menuList));
		} catch (Exception e) {
			System.out.println("菜单列表异常");
		}
		return JSON.toJSONString(menuList);
	}

	
	// 添加、修改菜单时,选取父菜单的下拉列表展示所有父菜单
		@RequestMapping(value = "/selectAllFatherMenu", method = RequestMethod.POST)

		public String selectAllFatherMenu() {
			System.out.println("进入selectAllFatherMenu");

			List<String> fatherMenuList = null;
			try {
				fatherMenuList = menuService.selectAllFatherMenu();
				//System.out.println(JSON.toJSONString(fatherMenuList));
			} catch (Exception e) {
				System.out.println("查询父菜单异常");
			}
			return JSON.toJSONString(fatherMenuList);
		}

	
	// 删除菜单
	@RequestMapping(value = "/deleteMenu", method = RequestMethod.POST)

	public void deleteMenu(@RequestParam Integer id) {
		System.out.println("进入deleteMenu");
		try {
			menuService.deleteMenu(id);
		} catch (Exception ex) {
		}
	}

	// 修改菜单展示
	@RequestMapping(value = "/updateMenuView", method = RequestMethod.POST)

	public String updateMenuView(@RequestParam Integer id) {
		System.out.println("进入updateMenuView");
		System.out.println("传过来的ID：" + id);
		Function menuView = new Function();
		try {
			menuView = menuService.updateMenuView(id);
			System.out.println(JSON.toJSONString(menuView));
		} catch (Exception e) {
			System.out.println("修改菜单展示异常");
		}
		return JSON.toJSONString(menuView);
	}

	// 修改提交
		@RequestMapping(value = "/updateMenuSubmit2", method = RequestMethod.POST)
		public String updateMenuSubmit(Function function) {
			
			System.out.println("进入updateMenuSubmit");
			String flag = "nullExist";

			try {
			// 获取菜单ID、菜单名称、菜单编码、事物担当者
			Integer menuid= function.getId();
			String name = function.getName();
			String menuCode = function.getMenuCode();
			String fatherName=function.getFatherName();
			// 检查用户名和用户编码是否存在
			Integer menuid1 = menuService.findIdByName(name);
			Integer menuid2 = menuService.findIdByCode(menuCode);
			
			Integer functionid = null;
			if ((menuid1 != null && menuid != menuid1)||name==null) {
				System.out.println("判断菜单名已存在");
				flag = "NameExist";
			} else if ((menuid2 != null && menuid != menuid2)||menuCode==null) {
				System.out.println("判断菜单编码已存在");
				flag = "CodeExist";
			}else {
				functionid = menuService.findIdByName(fatherName);
				function.setFunctionId(functionid);
				System.out.println(JSON.toJSONString(function));
				menuService.updateMenu(function);
				flag = "nullExist";
				System.out.println("菜单名称、菜单编码不与之前所录信息重复");
			}
			
			} catch (Exception ex) {
				 System.out.println("添加菜单异常"); 
				 }
			 
			return flag;
			
		}

	// 增加菜单
	@RequestMapping(value = "/addMenuSubmit", method = RequestMethod.POST)
	public String addMenuSubmit(Function function) {
		
		System.out.println("进入addMenuSubmit");
		String flag = "nullExist";

		//try {
		// 获取菜单ID、菜单名称、菜单编码、事物担当者
		String name = function.getName();
		
		String fatherName=function.getFatherName();
		// 检查用户名是否存在
		Integer menuid1 = menuService.findIdByName(name);
		
		
		Integer functionid = null;
		if (menuid1 != null ) {
			System.out.println("菜单名已存在");
			flag = "NameExist";
		} else {
			functionid = menuService.findIdByName(fatherName);
			function.setFunctionId(functionid);
			System.out.println(JSON.toJSONString(function));
			menuService.addMenu(function);
			flag = "nullExist";
			System.out.println("菜单名称、菜单编码不与之前所录信息重复");
		}
		
		/* } catch (Exception ex) {
			 System.out.println("添加菜单异常"); 
			 }*/
		 
		return flag;
		
	}

	// 查询菜单
	@RequestMapping(value = "/searchMenu", method = RequestMethod.POST)

	public String searchMenu(String functionname) {
		System.out.println("进入searchMenu");

		List<Function> menuList = null;
		try {
			System.out.println(functionname);
			System.out.println(functionname.replace(" ", ""));
			menuList = menuService.searchMenu(functionname.replace(" ", ""));
			System.out.println(JSON.toJSONString(menuList));
		} catch (Exception e) {
			System.out.println("查询菜单异常");
		}
		return JSON.toJSONString(menuList);
	};

	// 添加/修改时菜单名称校验名称是否重复
		@RequestMapping("/checkMenuName")
		public Boolean checkAdminName(Integer id,String  name) {
			System.out.println("进入checkMenuName");
			Boolean flag;
			Integer idByName=null;
			try{
				idByName=menuService.findIdByName(name);
			}catch(Exception e){
				System.out.println("校验菜单名异常");
			}
			//System.out.println("idByName:"+idByName+";id"+id);
			if((idByName==null)||(idByName!=null&&idByName.equals(id))){
				flag=true;
			}else{
				flag=false;
			}
			System.out.println(flag);
			return flag;
		}

		// 添加/修改时菜单编码校验编码是否重复
		@RequestMapping("/checkMenuCode")
		public Boolean checkMenuCode(Integer id,String  menuCode) {
			System.out.println("进入checkMenuCode");
			Boolean flag;
			Integer idByCode=null;
			try{
				idByCode=menuService.findIdByCode(menuCode);
			}catch(Exception e){
				System.out.println("校验菜单编码异常");
			}
			
			if((idByCode==null)||(idByCode!=null&&idByCode.equals(id))){
				flag=true;
			}else{
				flag=false;
			}
			System.out.println(flag);
			return flag;
		}
	

}
