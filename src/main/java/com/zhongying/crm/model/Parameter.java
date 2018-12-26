/********************************************** 
 * Project Name:learnCrm 
 * File Name:Parameter.java  
 * Package Name:com.zhongying.crm.model 
 * Date:2018年12月20日 15:17
 * Copyright (c) 2018, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.model;

import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author yangyingjie
 * @Title: Parameter.java
 * @Package com.zhongying.crm.model
 * @Description: 参数管理模型
 * @date 2018年12月20日 15:17
 */
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Parameter {
    @Id
    private Integer id;

    private String enName;

    private String cnName;

    private String value;

    private String description;

    private Integer status;

    private String  createdatetime;

    private String modifydatetime;
}
