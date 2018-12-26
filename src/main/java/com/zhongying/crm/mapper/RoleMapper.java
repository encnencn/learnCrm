package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;
import com.zhongying.crm.util.MyMapper;





/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

public interface RoleMapper extends MyMapper<Roles>{
	
	//通过用户名查询用户
	
		//查询角色列表
		@Select(" select * from role ")
		public List<Roles> getRoleList(Roles roles);
		
		//删除角色关联删除角色拥有的菜单
		//@Select(" delete from role where id = #{id}")
		@Select(" DELETE role.*,rolehasfunction.* FROM role LEFT JOIN rolehasfunction ON role.id= rolehasfunction.roleid WHERE role.id = #{id} ")
		public void deleteRole(Integer id);
		
		//删除本角色拥有的菜单
		@Delete(" DELETE FROM rolehasfunction  WHERE roleid = #{roleId} ")
		public void deleteRoleMenu(Integer roleId);
		
		//查询对应角色父菜单列表
		@Select(" SELECT id,NAME  FROM FUNCTION WHERE id IN(SELECT functionid FROM rolehasfunction WHERE roleid = #{id}) AND ismenu = 0 ")
		public List<Function> getFatherMenu(Integer id);

		//查询所有父菜单列表
		@Select(" SELECT id,NAME  FROM FUNCTION WHERE  ismenu = 0 ")
		public List<Function> getAllFatherMenu();
		
		//查询对应角色子菜单列表
		@Select(" SELECT id,NAME  FROM FUNCTION WHERE functionid = #{id} and ismenu = 1 ")
		public List<Function> getSonMenu(Integer id);

		@Select(" SELECT id,NAME  FROM FUNCTION where ismenu = 1 ")
		public List<Function> getSonMenuList();
		
		//增加角色
		@Select(" INSERT INTO role (name) VALUES (#{rolename}) ")
		public void addRole(String rolename);
		
		//更新角色
		@Update(" UPDATE ROLE SET name = #{name} WHERE id = #{id} ")
		public void updateRole(@Param("name") String name , @Param("id") Integer id);
		
		//查询本角色所拥有的所有菜单
		@Select(" SELECT functionid  FROM rolehasfunction WHERE roleid = #{id} ")
		public List<Integer> getRoleMenuList(Integer id);
		
		
		
		//循环插入本角色设置的菜单
		@Select ("INSERT INTO rolehasfunction (functionid,roleid) VALUES (#{menuid},#{roleid})")
		public void insertRoleMenu(@Param("roleid") Integer roleid, @Param("menuid") Integer menuid);
		
		//根据角色名查询角色ID
		@Select(" SELECT id  FROM role WHERE name = #{rolename} ")
		public Integer findRoleID(String rolename);
		
		//根据角色名查询角色列表
		@Select(" SELECT * FROM role WHERE NAME LIKE concat('%',#{name},'%') ")
		public List<Roles> roleListByName(String name);
		
		
}
