/********************************************** 
 * Project Name:learnCrm 
 * File Name:LoginController.java  
 * Package Name:com.zhongying.crm.controller.miniprogram 
 * Date:2019年01月11日 13:57
 * Copyright (c) 2019, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.controller.miniprogram;

import com.alibaba.fastjson.JSONObject;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.util.StrUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author yangyingjie
 * @Title: LoginController.java
 * @Package com.zhongying.crm.controller.miniprogram
 * @Description: 小程序登录相关接口
 * @date 2019年01月11日 13:57
 */
@RestController
@RequestMapping(value = "/wx")
public class LoginController {

    @Autowired
    AdminService adminService;
    /**
     * 小程序登录
     *
     * @param admin
     * @return
     */
    @RequestMapping( value = "/login", method = RequestMethod.POST)
    public JSONObject login_xcx(@RequestBody Admin admin) {
        String username = admin.getUsername();
        String password = admin.getPassword();
        System.out.println("<<<<<<<<<<<<wx_login[ username:"+username+";password:"+password+"]>>>>>>>>>>>>>>");
        JSONObject result = new JSONObject();
        result.put("code",400);
        if (StringUtils.isBlank(username)||StringUtils.isBlank(password)){
            result.put("message","账号或密码为空");
            return result;
        }
         admin = adminService.queryByName(username);
        if (admin == null) {
            result.put("message","账号不存在");
            return result;
        } else {
            if (password.equalsIgnoreCase(admin.getPassword())) {
                //生成token更新token返回用户数据
                String token = StrUtils.productRandomStr();
                admin.setToken(token);
                adminService.updateByPrimaryKeySelective(admin);
                admin.setPassword(null);
                result.put("code",200);
                result.put("linktype",1);
                result.put("message","登录成功");
                result.put("userInfo",admin);
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
     * @param admin
     * @return
     */
    @RequestMapping(value = "/mine", method = RequestMethod.POST)
    public JSONObject mine_xcx(@RequestBody Admin admin) {
        JSONObject result = new JSONObject();

        String token = admin.getToken();
        admin  = adminService.selectByToken(token);

        if (admin==null){
            result.put("code",400);
            result.put("message","登录信息不存在");
            return result;
        }
        admin.setPassword(null);
        result.put("code",200);
        result.put("code","登录成功");
        result.put("userInfo",admin);
        return result;
    }


    /**
     * 注销登录
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public JSONObject logout(@RequestBody Admin admin) {
        JSONObject result = new JSONObject();

        admin  = adminService.selectByToken(admin.getToken());

        if (admin==null){
            result.put("code",400);
            result.put("message","登录信息不存在");
            return result;
        }
        admin.setToken(null);
        adminService.updateByPrimaryKey(admin);
        result.put("code",200);
        result.put("message","退出登录");
        return result;
    }


    /**
     * 修改密码
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/updateInfo", method = RequestMethod.POST)
    public JSONObject updateInfo(@RequestBody Admin admin) {
        JSONObject result = new JSONObject();

       Admin record  = adminService.selectByToken(admin.getToken());

        if (record==null){
            result.put("code",400);
            result.put("message","登录信息不存在");
            return result;
        }
        //校验旧密码
        if (StringUtils.isBlank(admin.getOldPassword())||!record.getPassword().equals(admin.getOldPassword())){
            result.put("code",400);
            result.put("message","旧密码错误");
            return result;
        }
        //校验新密码
        if(StringUtils.isBlank(admin.getPassword())){
            result.put("code",400);
            result.put("message","新密码不能为空");
            return result;
        }

        record.setPassword(admin.getPassword());
        adminService.updateByPrimaryKey(admin);
        result.put("code",200);
        result.put("message","修改密码成功");
        return result;
    }



}
