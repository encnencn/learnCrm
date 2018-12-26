/********************************************** 
 * Project Name:learnCrm 
 * File Name:Test.java  
 * Package Name:com.zhongying.crm.util 
 * Date:2018年07月04日 10:09
 * Copyright (c) 2018, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.util;

/**
 * @author yangyingjie
 * @Title: Test.java
 * @Package com.zhongying.crm.util
 * @Description: xuexi
 * @date 2018年07月04日 10:09
 */
public class Test {

    public static void main(String[] args) {
        String phone = "18771632488";
        System.out.println(phone.replaceAll("(\\d{3})\\d{4}(\\d{4})","$1****$2"));

        String idCard = "211381199006253216";
        System.out.println(idCard.replaceAll("(\\d{10})\\d{4}(\\d{4})","$1****$2"));
    }
}
