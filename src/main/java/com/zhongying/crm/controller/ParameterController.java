/********************************************** 
 * Project Name:learnCrm 
 * File Name:ParameterController.java  
 * Package Name:com.zhongying.crm.controller 
 * Date:2018年12月20日 15:12
 * Copyright (c) 2018, 西安众盈医疗信息科技有限公司
 *
 *********************************************/

package com.zhongying.crm.controller;

import com.zhongying.crm.model.Parameter;
import com.zhongying.crm.service.ParameterService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author yangyingjie
 * @Title: ParameterController.java
 * @Package com.zhongying.crm.controller
 * @Description: 参数管理
 * @date 2018年12月20日 15:12
 */
@RestController
public class ParameterController {

    @Resource
    private ParameterService parameterService;

    @RequestMapping("/parameterList")
    public List<Parameter> parameterList(String enName) {

        return parameterService.parameterList(enName);
    }

    @RequestMapping(value = "/parameterAdd",   method = RequestMethod.POST)
    public int parameterAdd(Parameter parameter) {

        return parameterService.parameterAdd(parameter);
    }



}
