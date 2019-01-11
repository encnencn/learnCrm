/********************************************** 
 * Project Name:learnCrm 
 * File Name:StringUtils.java  
 * Package Name:com.zhongying.crm.util 
 * Date:2019年01月11日 13:47
 * Copyright (c) 2019, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.util;

import java.util.Date;
import java.util.Random;

/**
 * @author yangyingjie
 * @Title: StringUtils.java
 * @Package com.zhongying.crm.util
 * @Description: 字符串工具
 * @date 2019年01月11日 13:47
 */
public class StrUtils {

    public static  String productRandomStr() {
        char [] ch=new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
                'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z'};
        StringBuffer sb=new StringBuffer();
        Random ra=new Random();
        for(int i=0;i<32;i++){
            sb.append(ch[ra.nextInt(61)]);
        }
        return sb.toString();
    }

}
