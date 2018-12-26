/********************************************** 
 * Project Name:learnCrm 
 * File Name:GoodsPriceAddVO.java  
 * Package Name:com.zhongying.crm.model 
 * Date:2018年06月13日 14:51
 * Copyright (c) 2018, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yangyingjie
 * @Title: GoodsPriceAddVO.java
 * @Package com.zhongying.crm.model
 * @Description: 物品价格信息类
 * @date 2018年06月13日 14:51
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoodsPriceAddVO {
    /**
     * 店铺
     */
    private Integer shopId;
    /**
     * 物品1的价格
     */
    private Integer good_1_price;
    /**
     * 物品2的价格
     */
    private Integer good_2_price;
    /**
     * 物品3的价格
     */
    private Integer good_3_price;
    /**
     * 物品4的价格
     */
    private Integer good_4_price;
    /**
     * 物品5的价格
     */
    private Integer good_5_price;
    /**
     * 物品6的价格
     */
    private Integer good_6_price;
    /**
     * 物品7的价格
     */
    private Integer good_7_price;
    /**
     * 物品8的价格
     */
    private Integer good_8_price;

}
