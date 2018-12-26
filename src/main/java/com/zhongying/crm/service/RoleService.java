package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.RoleMapper;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;

/**

 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class RoleService {
   
	  @Autowired
     private RoleMapper rolemapper;
     
	     //获得角色列表
		public List<Roles> getRoleList(Roles roles) {
			return rolemapper.getRoleList(roles);
		}
		
		//删除角色
		public void deleteRole(Integer id) {
			rolemapper.deleteRole(id);
		}
		
		//当前用户父菜单列表
		public List<Function> getFatherMenu(Integer id) {
			return rolemapper.getFatherMenu(id);
			
		}
		//子菜单列表
		public List<Function> getSonMenu(Integer id) {
		return rolemapper.getSonMenu(id);
					
		}
		//查询所有子菜单
		public List<Function> getSonMenuList() {
		return rolemapper.getSonMenuList();
					
		}
				
		//全部父菜单列表
		public List<Function> getFatherMenuList() {
					
		return rolemapper.getAllFatherMenu();
		}
				
		//添加角色
		public void addRole(String rolename) {
					
		rolemapper.addRole(rolename);
		}
		
		//更新角色
		public void updateRole(String name,Integer id) {
				
			rolemapper.updateRole(name,id);
		}
		
		//过得角色菜单列表
		public List<Integer> getRoleMenuList(Integer id) {
					
			return rolemapper.getRoleMenuList(id);
		}
		
		//删除角色菜单
		public void deleteRoleMenu(Integer roleId) {
				
			rolemapper.deleteRoleMenu(roleId);
		}
		
		//插入角色菜单
		public void insertRoleMenu(Integer roleid, Integer menuid) {
					
			rolemapper.insertRoleMenu(roleid,menuid);
		}
		
		//根据角色名查询角色ID
		public Integer findRoleID(String rolename) {
		
		return rolemapper.findRoleID(rolename);
		}
		
		//根据角色名查询角色列表
		public List<Roles> roleListByName(String name) {
			
			return rolemapper.roleListByName(name);
		}

	
		


		
}
