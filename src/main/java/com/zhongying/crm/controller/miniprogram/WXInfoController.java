/********************************************** 
 * Project Name:learnCrm 
 * File Name:InfoController.java  
 * Package Name:com.zhongying.crm.controller.miniprogram 
 * Date:2019年01月18日 16:50
 * Copyright (c) 2019, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.controller.miniprogram;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author yangyingjie
 * @Title: InfoController.java
 * @Package com.zhongying.crm.controller.miniprogram
 * @Description: 微信业务信息相关接口
 * @date 2019年01月18日 16:50
 */
@RestController
@RequestMapping(value = "/wx")
public class WXInfoController {

    @Autowired
    AdminService adminService;

    @Autowired
    NoticeService noticeService;
    /**
     * 按照时间排序查询规则及公告管理列表
     *
     * @param
     * @return
     */
    @RequestMapping( value = "/infoList", method = RequestMethod.GET)
    public JSONObject infoList() {
        JSONObject result = new JSONObject();

        result.put("code",200);
        result.put("data", noticeService.getWxInfoList());
        return result;
    }

}
