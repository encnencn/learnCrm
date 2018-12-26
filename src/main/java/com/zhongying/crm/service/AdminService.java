package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.AdminMapper;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Department;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class AdminService {

	@Autowired
	private AdminMapper adminmapper;

	public Admin queryByName(String username) {

		return adminmapper.queryByName(username);

	}

	public void updatePassword(Admin admin) {

		adminmapper.updatePassword(admin);
	}

	public Integer queryByName2(String username) {

		return adminmapper.queryByName2(username);
	}

	public Function queryByfunctionId(int functionid) {

		return adminmapper.queryByfunctionId(functionid);
	}


	public List<Integer> queryByRoleId(int roleid) {

		return adminmapper.queryByRoleId(roleid);
	}

	public List<Admin> queryAllAdmin() {
		// TODO Auto-generated method stub
		return adminmapper.queryAllAdmin();
	}
	public List<Admin> queryAllAdmin_able() {
		// TODO Auto-generated method stub
		return adminmapper.queryAllAdmin_able();
	}
	public List<Roles> queryAllRole() {
		// TODO Auto-generated method stub
		return adminmapper.queryAllRole();
	}

	public List<Department> queryAllDepartment() {
		// TODO Auto-generated method stub
		return adminmapper.queryAllDepartment();
	}

	public void saveAdmin(Admin admin) {
		adminmapper.saveAdmin(admin);
		
	}

	public void deleteAdmin(Integer id) {
		
		adminmapper.deleteAdmin(id);
	}

	public List<Admin> queryByTrueName(String name) {
		// TODO Auto-generated method stub
		return adminmapper.queryByTrueName(name);
	}
	public List<Admin> queryByTrueName_able(String name) {
		// TODO Auto-generated method stub
		return adminmapper.queryByTrueName_able(name);
	}
	//修改用户密码
	public void updateNewPassword(Integer id, String newpassword) {
		// TODO Auto-generated method stub
		adminmapper.updateNewPassword(id,newpassword);
	}

	public Admin updateAdminView(Integer id) {
		// TODO Auto-generated method stub
		return adminmapper.updateAdminView(id);
	}

	public void updateAdminSubmit(Admin admin) {
		// TODO Auto-generated method stub
		adminmapper.updateAdminSubmit(admin);
	}

	public String selectPassById(Integer id) {
		
		return adminmapper.selectPassById(id);
	}
	
	//APP登录成功之后存入token
	public void setRemarkAsToken(Admin admin) {
		
		adminmapper.setRemarkAsToken(admin);
	}

	

	public Admin selectByToken(String token) {
		// TODO Auto-generated method stub
		return adminmapper.selectByToken(token);
	}

	public Integer queryAdminIdByTruename(String trueName){
		return adminmapper.queryAdminIdByTruename(trueName);
	}
	// 查询所有的普通用户
	// public List<Admin> queryByType(String usertype,Admin user){
	// if(user!=null){
	// if (user.getPage() != null && user.getRows() != null) {
	// PageHelper.startPage(user.getPage(), user.getRows());
	// }
	// }
	// System.out.println("进入查询所有普通用户");
	// return usermapper.queryByType(usertype);
	// }

	public Admin checkAdminName(String username) {
		
		return adminmapper.checkAdminName(username);
	}

	public String queryAdminById(int id) {
	
		return adminmapper.queryAdminById(id);
	}

	public Admin queryByusername(String username) {
		// TODO Auto-generated method stub
		return adminmapper.queryByusername( username);
	}

}
