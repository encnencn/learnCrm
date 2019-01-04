/********************************************** 
 * Project Name:learnCrm 
 * File Name:DateFormatTool.java  
 * Package Name:com.zhongying.crm.util 
 * Date:2019年01月04日 15:39
 * Copyright (c) 2019, 西安众盈医疗信息科技有限公司
 *
 *********************************************/
package com.zhongying.crm.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author yangyingjie
 * @Title: DateFormatTool.java
 * @Package com.zhongying.crm.util
 * @Description: 日期工具
 * @date 2019年01月04日 15:39
 */
public class DateFormatTool {

    public static String transferLongToDate(String dateFormat, Long millSec) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        Date date = new Date(millSec);
        return sdf.format(date);
    }

    public static String getFormatCurrentTime(){
        return  transferLongToDate("yyyy-MM-dd HH:mm:ss", new Date().getTime());
    }
}
