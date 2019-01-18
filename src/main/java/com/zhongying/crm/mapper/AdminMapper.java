package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Department;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface AdminMapper extends BaseMapper<Admin> {



	// 通过用户名查询用户(包含用户角色和所属公司名)
	//@Select("select * from admin where username=#{username} and isDisable=0")
	@Select("select a.*,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id where username=#{username} and isDisable=0")
	public Admin queryByName(String username);

	@Update("update admin set password=#{password} where username=#{username}")
	public void updatePassword(Admin admin);

	@Select("select roleid from admin where username=#{username}")
	public Integer queryByName2(String username);

	// 权限
	@Select("select * from function where id=#{functionid} order by priority desc")
	public Function queryByfunctionId(int functionid);

	@Select("select functionid from rolehasfunction where roleid=#{roleid}")
	public List<Integer> queryByRoleId(int roleid);

	//查询用户列表页面显示信息
	@Select("select a.id,a.username,a.password,a.mobile,a.trueName,a.email,a.remark,a.isDisable,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id")
	public List<Admin> queryAllAdmin();
	
	//加载启用用户列表页面显示信息
	@Select("select a.id,a.username,a.password,a.mobile,a.trueName,a.email,a.remark,a.isDisable,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id WHERE a.isDisable=0")
	public List<Admin> queryAllAdmin_able();
	
    @Select("select * from role")
	public List<Roles> queryAllRole();
    
    @Select("select * from department")
	public List<Department> queryAllDepartment();

    @Insert("insert into admin(username,password,mobile,trueName,email,remark,isDisable,roleId,departmentId) "
    		+ "value(#{username},#{password},#{mobile},#{trueName}"
    		+ ",#{email},#{remark},#{isDisable},#{roleId},#{departmentId})")
	public void saveAdmin(Admin admin);
    

    //用户管理页面在所有用户中查询用户
    @Select("select admin.*,role.name rolename,department.departmentName departmentname from admin left join role on"
			+ " admin.roleid=role.id left join department on admin.departmentid=department.id "
			+ "where   admin.username LIKE concat('%',#{name},'%')  or admin.trueName LIKE concat('%',#{name},'%')  ")
    public List<Admin> queryByTrueName(String name);
    //用户查询页面在启用用户中查询用户
    @Select("select admin.*,role.name rolename,department.departmentName departmentname from admin left join role on"
			+ " admin.roleid=role.id left join department on admin.departmentid=department.id "
			+ "where   (admin.username LIKE concat('%',#{name},'%')  or admin.trueName LIKE concat('%',#{name},'%')) and admin.isDisable=0  ")
    public List<Admin> queryByTrueName_able(String name);
    //更新密码
    @Update("update admin set password=#{newpassword} where id=#{id}")
    public void updateNewPassword(@Param("id")Integer id, @Param("newpassword")String newpassword);
    
    //查询当前用户所有个人信息
  	@Select("select a.id,a.username,a.password,a.mobile,a.trueName,a.email,a.remark,a.isDisable,r.id roleId,d.id departmentId,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id where a.id=#{id} ")
  	public Admin updateAdminView(Integer id);


	@Select("select a.id,a.username,a.password,a.mobile,a.trueName,a.email,a.remark,a.isDisable,r.id roleId,d.id departmentId,r.name rolename,d.departmentName departmentname from (admin a left join role r on a.roleId=r.id) left join department d on a.departmentId=d.id where a.username=#{username} ")
	public Admin queryByusername(String username);



}
