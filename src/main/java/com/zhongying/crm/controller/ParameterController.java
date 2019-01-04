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

    /**
     * 参数列表
     *
     * @param enName
     * @return
     */
    @RequestMapping("/parameterList")
    public List<Parameter> parameterList(String enName) {

        return parameterService.parameterList(enName);
    }

    /**
     * 参数增加
     *
     * @param parameter
     * @return
     */
    @RequestMapping(value = "/parameterAdd",   method = RequestMethod.POST)
    public int parameterAdd(Parameter parameter) {

        return parameterService.parameterAdd(parameter);
    }

    /**
     * 参数修改
     *
     * @param parameter
     * @return
     */
    @RequestMapping(value = "/parameterEdit",   method = RequestMethod.POST)
    public int parameterEdit(Parameter parameter) {

        return parameterService.parameterEdit(parameter);
    }

    /**
     *参数删除
     *
     * @param parameter
     * @return
     */
    @RequestMapping(value = "/parameterDelete",   method = RequestMethod.POST)
    public int parameterDelete(Parameter parameter) {

        return parameterService.parameterDelete(parameter);
    }

    /**
     * 查询一条数据
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/parameterOne",   method = RequestMethod.GET)
    public Parameter parameterOne(Integer id) {

        return parameterService.parameterOne(id);
    }

    @RequestMapping(value = "/checkParameterName",   method = RequestMethod.GET)
    public Integer checkParameterName(Parameter parameter) {

        return parameterService.checkParameterName(parameter);
    }
}
