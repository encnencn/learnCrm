/********************************************** 
 * Project Name:learnCrm 
 * File Name:RegExp.java  
 * Package Name:com.zhongying.crm.util 
 * Date:2018年12月17日 14:46
 * Copyright (c) 2018, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.util;

import org.apache.commons.lang.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author yangyingjie
 * @Title: RegExp.java
 * @Package com.zhongying.crm.util
 * @Description: 正则表达式
 * @date 2018年12月17日 14:46
 */
public class RegExp {

    /**
     *
     * @param mobile
     * @return
     * 正则表达式验证手机号是否正确
     */
    public static boolean checkMobile(String mobile){
        boolean result=false;
        if (StringUtils.isNotBlank(mobile)) {
            String regExp="^((13[0-9])|(15[^4,\\D])|(18[0,2-9]))\\d{8}$";
            Pattern p=Pattern.compile(regExp);
            Matcher m=p.matcher(mobile);
            result=m.find();
        }
        return result;

    }

    /**
     *
     * @param str
     * @return
     * 正则表达式验证字符串是不是全英文
     */
    public static boolean checkEnglish(String str){
        boolean result=false;
        if (StringUtils.isNotBlank(str)) {
            String regExp="^[A-Za-z]+$";
            Pattern p=Pattern.compile(regExp);
            Matcher m=p.matcher(str);
            result=m.find();
        }
        return result;

    }

}
