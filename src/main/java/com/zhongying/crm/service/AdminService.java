package com.zhongying.crm.service;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
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

		return adminmapper.queryAllAdmin();
	}
	public List<Admin> queryAllAdmin_able() {

		return adminmapper.queryAllAdmin_able();
	}
	public List<Roles> queryAllRole() {

		return adminmapper.queryAllRole();
	}

	public List<Department> queryAllDepartment() {

		return adminmapper.queryAllDepartment();
	}

	public void saveAdmin(Admin admin) {
		adminmapper.saveAdmin(admin);
		
	}

	public void deleteAdmin(Integer id) {
		
		adminmapper.deleteByPrimaryKey(id);
	}

	public List<Admin> queryByTrueName(String name) {

		return adminmapper.queryByTrueName(name);
	}
	public List<Admin> queryByTrueName_able(String name) {

		return adminmapper.queryByTrueName_able(name);
	}
	//修改用户密码
	public void updateNewPassword(Integer id, String newpassword) {
		Admin record = new Admin();
		record.setPassword(newpassword);
		record.setId(id);
		adminmapper.updateByPrimaryKey(record);
	}

	public Admin updateAdminView(Integer id) {

		return adminmapper.updateAdminView(id);
	}

	public void updateAdminSubmit(Admin admin) {

		adminmapper.updateByPrimaryKey(admin);
	}

	public String selectPassById(Integer id) {
		
		return adminmapper.selectByPrimaryKey(id).getPassword();
	}
	

	/**
	 * APP登录成功之后存入token
	 *
	 * @param admin
	 * @return
	 */
	public Integer setRemarkAsToken(Admin admin) {

		return  adminmapper.updateByPrimaryKeySelective(admin);
	}


	/**
	 * 根据token查询用户
	 *
	 * @param token
	 * @return
	 */
	public Admin selectByToken(String token) {
		if (StringUtils.isBlank(token)){
			return null;
		}
		Admin record = new Admin();
		record.setToken(token);
		return adminmapper.selectOne(record);
	}

	/**
	 * 根据姓名查询用户
	 *
	 * @param trueName
	 * @return
	 */
	public Integer queryAdminIdByTruename(String trueName){

		Admin record = new Admin();
		record.setTrueName(trueName);

		return adminmapper.selectOne(record).getId();
	}


	public Admin checkAdminName(String username) {
		Admin record = new Admin();
		record.setUsername(username);

		return adminmapper.selectOne(record);
	}

	public String queryAdminById(int id) {

		Admin admin = adminmapper.selectByPrimaryKey(id);
		return admin.getUsername();
	}

	public Admin queryByusername(String username) {

		return adminmapper.queryByusername( username);
	}

    public Integer updateByPrimaryKeySelective(Admin admin) {

		return adminmapper.updateByPrimaryKeySelective(admin);
    }

	public Integer updateByPrimaryKey(Admin admin) {

		return adminmapper.updateByPrimaryKey(admin);
	}


}
