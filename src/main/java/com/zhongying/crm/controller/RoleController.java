package com.zhongying.crm.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;
import com.zhongying.crm.service.RoleService;

/**
 * @author yangyingjie E-mail:931526599@qq.com
 * @version 创建时间：2017年5月16日 下午2:15:36 类说明
 */
@RestController

public class RoleController {
	@Resource
	private RoleService roleService;
	private JSONObject jsonObjFather = new JSONObject();
	private JSONObject jsonObjSon = new JSONObject();
	JSONArray jsonTable = new JSONArray();

	// 角色管理界面显示角色列表
	@RequestMapping("/roleList")
	public String roleList2(Roles roles) {
		System.out.println("进入roleList");
		List<Roles> rolesList = null;
		try {
			rolesList = roleService.getRoleList(roles);
		} catch (Exception e) {
			System.out.println("角色列表异常");
		}

		return JSON.toJSONString(rolesList);
	}
	
	// 添加/修改时角色名称校验名称是否重复
	@RequestMapping("/checkRoleName")
	public Boolean checkRoleName(Integer id,String  name) {
		System.out.println("进入checkRoleName");
		Boolean flag;
		Integer idByName=null;
		try{
			idByName=roleService.findRoleID(name);
		}catch(Exception e){
			System.out.println("校验角色名异常");
		}
		if((idByName==null)||(idByName!=null&&idByName.equals(id))){
			flag=true;
		}else{
			flag=false;
		}
		System.out.println(flag);
		return flag;
	}
	
	//查询角色
	@RequestMapping("/roleListByName")
	public String roleListByName(String name) {
		System.out.println("进入roleListByName");
		List<Roles> rolesList = null;
		try {
			rolesList = roleService.roleListByName(name.replace(" ", ""));
		} catch (Exception e) {
			System.out.println("根据角色名查询角色列表异常");
		}

		return JSON.toJSONString(rolesList);
	}
	
	// 删除角色
	@RequestMapping(value = "/deleteRole", method = RequestMethod.POST)

	public void deleteRole(@RequestParam Integer id) {
		System.out.println("进入deleteRole");

		try {
			//删除角色及删除角色拥有的菜单
			roleService.deleteRole(id);
			
		} catch (Exception ex) {
		}
	}

	// 修改角色
	@RequestMapping(value = "/updateRoleSubmit", method = RequestMethod.POST)

	public Boolean updateRoleSubmit(@RequestParam String name, Integer id) {
		System.out.println("进入updateRole");
		Boolean flag = false;
		try {
			Integer roleid = roleService.findRoleID(name);
			if (roleid != null || "".equals(name)) {
				System.out.println("判断用户名已存在!");
			} else {
				roleService.updateRole(name, id);
				flag = true;
			}
		} catch (Exception ex) {
			System.out.println("修改角色异常");
		}
		return flag;
	}

	// 增加角色
	@RequestMapping(value = "/addRole", method = RequestMethod.POST)

	public Boolean addRole(@RequestParam String rolename) {
		System.out.println("进入addRole");
		Boolean flag = false;
		try {
			Integer roleid = roleService.findRoleID(rolename);
			if (roleid != null || "".equals(rolename)) {
				System.out.println("判断用户名已存在!");
			} else {
				roleService.addRole(rolename);
				flag = true;
			}
		} catch (Exception ex) {
			System.out.println("添加角色异常");
		}
		return flag;

	}

	// 修改功能权限后提交
	@RequestMapping(value = "/updateMenuSubmit", method = RequestMethod.POST)

	public void updateMenuSubmit(@RequestParam Integer roleid, String ids) {
		
		try {
			roleService.deleteRoleMenu(roleid);
			String[] ss = ids.split(",");
			for (String menuid : ss) {
				System.out.println("分割从页面读取来的ID字符串:" + menuid);
				roleService.insertRoleMenu(roleid, Integer.parseInt(menuid));
			}

		} catch (Exception ex) {
			System.out.println("修改角色权限异常");
		}
	}

	// 查询角色权限
	@RequestMapping(value = "/updatePrimaryView", method = RequestMethod.POST)

	public JSONArray updatePrimaryView(@RequestParam Integer id) {
		System.out.println("进入权限管理方法 updatePrimaryView");
		Integer fatherMenuId;
		Integer sonMenuId;
		String fatherMenuName;
		String sonMenuName;
		try {
			// 查询本角色所有菜单
			List<Integer> roleMenuList = roleService.getRoleMenuList(id);
			// 查询所有父菜单
			List<Function> fatherMenuList = roleService.getFatherMenuList();

			// 循环查询父菜单
			jsonTable = new JSONArray();
			for (int i = 0; i < fatherMenuList.size(); i++) {
				fatherMenuId = fatherMenuList.get(i).getId();
				fatherMenuName = fatherMenuList.get(i).getName();
				// 根据每个父菜单查询子菜单列表
				List<Function> sonMenuList = roleService.getSonMenu(fatherMenuId);

				jsonObjFather = new JSONObject();
				// jsonObj中放入三个键值对，父菜单名称、父菜单ID、父菜单是否选中
				jsonObjFather.put("FatherMenuName", fatherMenuName);
				jsonObjFather.put("id", fatherMenuId);
				// 如果当前父菜单ID包含在之前查出的本角色ID中就在jsonObj中说明（父菜单被选中）
				if (roleMenuList.contains(fatherMenuId)) {
					jsonObjFather.put("checked", "checked='checked'");
				} else {
					jsonObjFather.put("checked", "");
				}
				// 新建一个Obj对象用来保存子菜单的相关信息
				jsonObjSon = new JSONObject();
				// 循环查询子菜单
				for (int j = 0; j < sonMenuList.size(); j++) {
					sonMenuId = sonMenuList.get(j).getId();
					sonMenuName = sonMenuList.get(j).getName();
					String checked = new String();
					// 查询当前子菜单是否在本角色菜单列表中
					if (roleMenuList.contains(sonMenuId)) {
						checked = "checked='checked'";
					} else {
						checked = "";
					}
					// 在jsonObjSon中添加一个值为数组的map
					String[] idAndChecked = new String[] { sonMenuId.toString(), checked };
					jsonObjSon.put(sonMenuName, idAndChecked);

					jsonObjFather.put("sonMenuList", jsonObjSon);
				}

				jsonTable.add(jsonObjFather);
			}

		} catch (Exception e) {
			System.out.println("查询角色权限列表异常");
		}

		return jsonTable;

	}

}
