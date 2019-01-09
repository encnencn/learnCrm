package com.zhongying.crm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Department;
import com.zhongying.crm.model.Function;
import com.zhongying.crm.model.Roles;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.service.MenuService;
import com.zhongying.crm.util.Md5;
import com.zhongying.crm.util.Sort;
import groovy.util.IFileNameFinder;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping(produces = "application/json; charset=utf-8")
public class AdminController {

	
	@Resource
	private AdminService adminservice;

	@Autowired
	private MenuService menuService;

	@Autowired
	private JavaMailSender mailSender;

	//登录校验
	@RequestMapping("/loginCheck")
	public String login(String username, String password, String verifyCode, HttpServletRequest req) {
		
		Admin admin = adminservice.queryByName(username);
		if (admin == null) {
			return JSON.toJSONString("用户名不存在！");
		} else {
			String code = (String) req.getSession().getAttribute("verify");
		
			if (password.equalsIgnoreCase(admin.getPassword())){
				if( verifyCode.equalsIgnoreCase(code)) {
					req.getSession().setAttribute("admin", admin);
					return JSON.toJSONString("验证码输入正确");
			     } else{
			    	 System.out.println("验证码错误");
			    	 return JSON.toJSONString("验证码输入错误");
			     }
			} else {
				return JSON.toJSONString("用户名与密码不匹配");
			}
		}
	}

	/**
	 * 小程序登录
	 *
	 * @param username
	 * @param password
	 * @param req
	 * @return
	 */
	@RequestMapping("/loginCheck_xcx")
	public JSONObject login_xcx(String username, String password,  HttpServletRequest req) {
		System.out.println("loginCheck_xcx[ username:"+username+";password:"+password+"]");
		JSONObject result = new JSONObject();
		result.put("code",400);
		if (StringUtils.isBlank(username)||StringUtils.isBlank(password)){
			result.put("message","账号或密码为空");
			return result;
		}
		Admin admin = adminservice.queryByName(username);
		if (admin == null) {
			result.put("message","账号不存在");
			return result;
		} else {
			if (password.equalsIgnoreCase(admin.getPassword())) {
				req.getSession().setAttribute("admin", admin);
				result.put("code",200);
				result.put("linktype",1);
				result.put("message","登录成功");
				return result;
			} else {
				result.put("message","账号或密码错误");
				return result;
			}
		}
	}

	/**
	 * 个人信息
	 *
	 * @param req
	 * @return
	 */
	@RequestMapping("/mine_xcx")
	public JSONObject mine_xcx(HttpServletRequest req) {
		JSONObject result = new JSONObject();
		Admin admin = (Admin) req.getSession().getAttribute("admin");
		if (admin==null){
			result.put("code",400);
			return result;
		}
		result.put("code",200);
		result.put("user",admin);
		return result;
	}
	//APP登录校验
	@RequestMapping("/loginCheck-APP")
	public Boolean loginCheckAPP(String username, String password, String token,HttpServletRequest req) {
		System.out.println("进入loginCheck-APP");
		
		Admin admin = adminservice.queryByName(username);
		Boolean flag=false;
		//如果前台传过来账号不为空，根据账号查不到用户
		if (username!=""&&admin == null) {
			System.out.println("前台传来用户账号不存在！");
			//如果传过来账号不为空，根据账号可以查到用户
		} else if(username!=""&&admin != null) {
			System.out.println("前台传过来用户名存在");
			//判断根据账号查的用户的密码和传过来的密码是否一致
			if (password.equals(admin.getPassword())) {
		
				System.out.println("密码一致");
				//如果APP端打开了自动登录，前台传过来username和token
				if(token!=null){
					System.out.println("前台选择了自动保存");
					admin.setRemark(token);
					adminservice.setRemarkAsToken(admin);
				}
				System.out.println("更新session");
				req.getSession().setAttribute("admin", admin);
				Admin admin1=(Admin)req.getSession().getAttribute("admin");
				System.out.println(admin1+"==============");
				flag= true;
			} else{
				System.out.println("输入的密码错误！");
			}
		}else if(username==""&&token!=""){
			System.out.println("前台只传过来token");
			//如果APP打开了自动登录,引导页面直接请求后台,只传过来token
			Admin admin2=adminservice.selectByToken(token);
			if(admin2!=null){
				System.out.println("token存在");
				req.getSession().setAttribute("admin", admin2);
				flag= true;
			}else{
				System.out.println("token不存在");
			}
		}
		System.out.println("return flag:"+flag);
		return flag;
	}
	
	//当前用户左侧菜单加载
	@SuppressWarnings("unchecked")
	@RequestMapping("/permission")
	public JSONArray permission(HttpServletRequest req) {
		HashMap<String,Integer> map = new HashMap<String,Integer>();   
		 
		JSONArray jsonTable = new JSONArray();
		@SuppressWarnings("rawtypes")
		LinkedHashMap linkedHashMap = null;
		JSONObject jsonObj2 = null;
		try{
		//从session中读取当前用户信息
		Admin admin = (Admin) req.getSession().getAttribute("admin");
		// 取到角色ID
		Integer roleid=admin.getRoleId();
		// 取到角色拥有的functionID
		List<Integer> idList = adminservice.queryByRoleId(roleid);
		// 取到角色拥有的function的全部信息
		
		List<Function> functionlist = new ArrayList<Function>();
		/*for (Integer integer : list) {
			functionlist.add(adminservice.queryByfunctionId(integer));
		}*/
		//TODO
			functionlist = menuService.queryByfunctionIdList(idList);
		// 取到角色拥有的function的父级菜单
		List<Function> fujilist = new ArrayList<Function>();
		List<Function> zijilist = new ArrayList<Function>();
		List<Function> zijilist1 = new ArrayList<Function>();
		for (Function function : functionlist) {
			if (function.getIsMenu() == 0) {
				fujilist.add(function);
			} else {
				zijilist.add(function);
			}
		}
       
		for (Function function : zijilist) {
			map.put(function.getName(),function.getPriority());
		}
		Sort bvc = new Sort(map);  
		TreeMap<String,Integer> sorted_map = new TreeMap<String,Integer>(bvc); 
		sorted_map.putAll(map); 
		Set<String> keySet =  sorted_map.keySet();
        Iterator<String> iter = keySet.iterator();
      
        while (iter.hasNext()){
            String key = iter.next();
            for (Function function : zijilist) {
				if(map.get(key)==function.getPriority()){
					zijilist1.add(function);
				}
			}
//           System.out.println(key + ":" + map.get(key));
        }
		

		for (int i = 0; i < fujilist.size(); i++) {
			linkedHashMap = new LinkedHashMap<>();
			jsonObj2 = new JSONObject();
			jsonObj2.put("title", fujilist.get(i).getName());
			jsonObj2.put("icon", fujilist.get(i).getIcon());
			for (int j = 0; j < zijilist1.size(); j++) {	
			
				if (zijilist1.get(j).getFunctionId() == fujilist.get(i).getId()) {					
					linkedHashMap.put(zijilist1.get(j).getName(), zijilist1.get(j).getUrl());
					jsonObj2.put("list", linkedHashMap);
				}
			}
		
			jsonTable.add(jsonObj2);

		}
		}catch(NullPointerException e){
			System.out.println("session空指针异常");
		}
		
		return jsonTable;

	}


	//用户忘记密码
	@RequestMapping("/forgetpassword")
	public void forgetPassword(String phone, String code, HttpServletRequest req) {
		System.out.println(phone + "邮箱");
		req.getSession().setAttribute("email", phone);	
		String email = (String) req.getSession().getAttribute("email");
		System.out.println(email+"===============================");
		Admin admin=adminservice.checkAdminName(phone);		
		String text = "您好！您的验证码为" + code;
		System.out.println(code);
		 /*手机验证*/
		/*String smsSingleRequestServerUrl =
		"http://vsms.253.com/msg/send/json";
		 SmsSendRequest smsSingleRequest = new SmsSendRequest("N8398193",
		 "Ugbalk23AS2", text, phone);
		 String requestJson = JSON.toJSONString(smsSingleRequest);
		 @SuppressWarnings("unused")
		 String response =
		 ChuangLanSmsUtil.sendSmsByPost(smsSingleRequestServerUrl,
		 requestJson);*/

		// 邮箱验证
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(admin.getEmail());
		message.setFrom("lingkong322@163.com");
		message.setSubject("主题：简单邮件");
		message.setText(text);
		mailSender.send(message);
	}
	
	//用户更新密码
	@RequestMapping("/updatepassword")
	public Boolean updatePassword(String password, HttpServletRequest req) {
		// 修改密码
		String email = (String) req.getSession().getAttribute("email");
		System.out.println(email+"===============================");
		Admin admin = adminservice.queryByName(email);
		admin.setPassword(password);
		adminservice.updatePassword(admin);
		return true;
	}
	
	@RequestMapping("/updatepassword_xcx")
	public Boolean updatePassword(String password,String username ) {
		// 修改密码
		
		Admin admin = adminservice.queryByName(username);
		admin.setPassword(password);
		adminservice.updatePassword(admin);
		return true;
	}

	// 返回用户列表
	@RequestMapping("/queryAllAdmin")
	public JSONArray queryAllAdmin() {

		JSONArray jsonTable = new JSONArray();
		List<Admin> adminList = adminservice.queryAllAdmin();
		for (Admin admin : adminList) {
			jsonTable.add(admin);
		}
		return jsonTable;
	}
	
	// 返回启用的用户列表
	@RequestMapping("/queryAllAdmin_able")
	public JSONArray queryAllAdmin_able() {
		System.out.println("进入queryAllAdmin_able");
		JSONArray jsonTable = new JSONArray();
		try{
		List<Admin> adminList = adminservice.queryAllAdmin_able();
		for (Admin admin : adminList) {
			jsonTable.add(admin);
		}
		}catch(Exception e){
			System.out.println("返回启用的用户列表异常！");
		}
		return jsonTable;
	}
	// 更新用户展示
	@RequestMapping("/updateAdminView")
	public String updateAdminView(Integer id) {
		Admin adminList=null;
		try{
		adminList = adminservice.updateAdminView(id);
		}catch(Exception e){
			System.out.println("用户更新异常！");
		}
		return JSON.toJSONString(adminList);
	}
	
	// 更新用户展示
		@RequestMapping("/updateAdminView-APP")
		public String updateAdminView(HttpServletRequest req) {
			Admin adminList=null;
			try{
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			adminList = adminservice.updateAdminView(admin.getId());
			}catch (Exception e){
				System.out.println("更新前展示用户出错！");
			}
			return JSON.toJSONString(adminList);
		}
	
			@RequestMapping("/person_information")
			public String person_information(String username) {
				System.out.println(username+"**************");
				Admin admin=null;
				try{
				admin = adminservice.queryByusername(username);
				}catch (Exception e){
					System.out.println("更新前展示用户出错！");
				}
				return JSON.toJSONString(admin);
			}
			
			
	// 更新用户提交
		@RequestMapping("/updateAdminSubmit")
		public void updateAdminSubmit(Admin admin) {
			//判断用户是否修改过密码，如果修改过，返回到保存到数据库之前要加密
			String inputPassword=admin.getPassword();
			String oldPassword=adminservice.selectPassById(admin.getId());
			if(inputPassword.equals(oldPassword)){
			}else{
				  admin.setPassword(Md5.MD5(inputPassword));
			}
			adminservice.updateAdminSubmit(admin);

		}
		
	// 填充角色下拉列表
	@RequestMapping("/queryAllRole")
	public JSONArray queryAllRole() {

		JSONArray jsonTable = new JSONArray();
		List<Roles> roleList = adminservice.queryAllRole();
		for (Roles role : roleList) {
			jsonTable.add(role);
		}
		return jsonTable;
	}

	// 填充分公司下拉列表
	@RequestMapping("/queryAllDepartment")
	public JSONArray queryAllDepartment() {

		JSONArray jsonTable = new JSONArray();
		List<Department> departmentList = adminservice.queryAllDepartment();
		for (Department department : departmentList) {
			jsonTable.add(department);
		}
		return jsonTable;
	}
	
	// 添加用户时校验用户名是否重复
	@RequestMapping("/addCheckAdminName")
	public Boolean addCheckAdminName(String  username) {
		System.out.println("进入checkAdminName");
		Boolean flag;
		Admin admin=null;
		try{
		admin=adminservice.checkAdminName(username);
		}catch(Exception e){
			System.out.println("校验用户名异常");
		}
		if(admin==null){
			flag=true;
		}else{
			flag=false;
		}
		System.out.println(flag);
		return flag;
	}
	// 修改用户时校验用户名是否重复
		@RequestMapping("/updateCheckAdminName")
		public Boolean updateCheckAdminName(Integer id,String username ) {
			System.out.println("进入updateCheckAdminName");
			Boolean flag;
			Admin admin=null;
			String usernameOriginal=null;
			try{
			usernameOriginal=adminservice.queryAdminById(id);
			admin=adminservice.checkAdminName(username);
			}catch(Exception e){
				System.out.println("校验用户名异常");
			}
		
			if(admin!=null&&(!username.equals(usernameOriginal))){
				//根据输入的用户名查到一个对象，并且不是当前修改的用户对象
				flag=false;
			}else{
				flag=true;
			}
			System.out.println(flag);
			return flag;
		}
	// 添加用户
	@RequestMapping("/addAdmin")
	public Boolean addAdmin(Admin admin) {
		
		try{
		adminservice.saveAdmin(admin);
		}catch(Exception e){
			System.out.println("添加用户异常！");
		}
		return true;
	}

	// 删除用户
	@RequestMapping("/deleteAdmin")
	public Boolean deleteAdmin(Integer id) {
		try{
		adminservice.deleteAdmin(id);
		}catch(Exception e){
			System.out.println("添加用户异常！");
		}
		return true;
	}

	// 根据用户名/真实姓名查询用户
	@RequestMapping("/queryByTrueName")
	public JSONArray queryByTrueName(String name) {

		JSONArray jsonTable = new JSONArray();
		List<Admin> adminlist = adminservice.queryByTrueName(name.replace(" ", ""));
		if (adminlist.size() == 0) {
			return queryAllAdmin();
		} else {
			for (Admin admin2 : adminlist) {
				jsonTable.add(admin2);
			}
			System.out.println(jsonTable);
			return jsonTable;
		}
	}
	// 在启用用户中,根据用户名/真实姓名查询用户
	@RequestMapping("/queryByTrueName_able")
	public JSONArray queryByTrueName_able(String name) {

		JSONArray jsonTable = new JSONArray();
		List<Admin> adminlist = adminservice.queryByTrueName_able(name.replace(" ", ""));
		if (adminlist.size() == 0) {
			return queryAllAdmin();
		} else {
			for (Admin admin2 : adminlist) {
				jsonTable.add(admin2);
			}
			System.out.println(jsonTable);
			return jsonTable;
		}
	}
	// 页面加载的时候右上角显示个人信息
	@RequestMapping("/adminInfo")
	public String adminInfo(HttpServletRequest req) {
		System.out.println("进入adminInfo");
		Admin admin = null;
		try {
			admin = (Admin) req.getSession().getAttribute("admin");
			
		} catch (Exception e) {
			System.out.println("右上角用户信息展示异常");
		}
		return JSON.toJSONString(admin);

	}

	// 验证原密码
	@RequestMapping("/oldPasswordSubmit")
	public Boolean oldPasswordSubmit(String oldpassword, HttpServletRequest req) {
		System.out.println("进入oldPasswordSubmit");
		Boolean flag = false;
		String password = null;
		try {
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			password = admin.getPassword();
			if (password.equals(oldpassword)) {
				flag = true;
			} else {
			}
		} catch (Exception e) {
			System.out.println("原密码提交异常");
		}
		return flag;

	}

	// 验证新密码
	@RequestMapping("/newPasswordSubmit")
	public void newPasswordSubmit(String newpassword, HttpServletRequest req) {
		System.out.println("进入newPasswordSubmit");

		try {
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			Integer id = admin.getId();
			adminservice.updateNewPassword(id, newpassword);

		} catch (Exception e) {
			System.out.println("原密码提交异常");
		}
	}
	
	// 验证新密码
		@RequestMapping("/loggingOut")
		public void loggingOut( HttpServletRequest req) {
			System.out.println("进入loggingOut");

			try {
				//System.out.println("invalidate之前："+req.getSession().getAttribute("admin"));
				req.getSession().invalidate();
				//System.out.println("invalidate之后："+req.getSession().getAttribute("admin"));
			} catch (Exception e) {
				System.out.println("session擦除异常");
			}
		}
}
