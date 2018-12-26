package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zhongying.crm.mapper.LogMapper;
import com.zhongying.crm.model.OperatorLog;

/**
* @author yangyingjie E-mail:931526599@qq.com
* @version 创建时间：2017年6月5日 下午2:21:37
* 类说明
*/
@Service
public class LogService {
	
	@Autowired
	private LogMapper logmapper;
	
	//日志列表
	public List<OperatorLog> getLogList(OperatorLog operatorLog) {
		 
		return logmapper.getLogList(operatorLog);
	}
	
	//日志列表2pageHelper
		public PageInfo<OperatorLog> getLogList2(Integer pageNum) {
			 /*  
	         * 第一个参数是第几页；第二个参数是每页显示条数。  
	         */  
			PageHelper.startPage(pageNum, 10);
			List<OperatorLog> logList = null;
			logList = logmapper.getLogList2(pageNum);
			return new PageInfo<OperatorLog>(logList);
		}

	
	//日志查询
	public PageInfo<OperatorLog> searchLog(String select1,String select2,String input1,String input2,Integer pageNum) {
		
		PageHelper.startPage(pageNum, 10);
		List<OperatorLog> logList = null;
		logList = logmapper.searchLog(select1,select2,input1,input2,pageNum);
		return new PageInfo<OperatorLog>(logList);
	}
	
	//日志添加
	public  void addLog(OperatorLog operatorLog) {
	
		 logmapper.addLog(operatorLog);
	}

	

	public String selectDesctitionByAction(String action) {
		return logmapper.selectDesctitionByAction(action);
		
	}
	

}
