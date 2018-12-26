package com.zhongying.crm.util;

import java.util.Comparator;
import java.util.Map;

/**
 * @author feng
 * @version 1.15, 2017年6月28日 上午11:34:51
 * 
 */
public class Sort2 implements Comparator<String>{
	
	 Map<String, Integer> base;
	    public Sort2(Map<String, Integer> base) {  
	        this.base = base;  
	    }  
	    public int compare(String a, String b) {  
	        if (base.get(a) <= base.get(b)) {  
	            return 1;  
	        } else {  
	            return -1;  
	        } 
	    }  

}
