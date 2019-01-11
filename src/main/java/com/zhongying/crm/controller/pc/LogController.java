package com.zhongying.crm.controller.pc;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.zhongying.crm.model.OperatorLog;
import com.zhongying.crm.service.LogService;

/**
* @author yangyingjie E-mail:931526599@qq.com
* @version 创建时间：2017年6月5日 下午2:19:46
* 类说明
*/

@RestController
public class LogController {
	@Resource
	private LogService logService;

	
	// 操作日志管理界面显示操作日志列表//暂时没有 用这个方法
	@RequestMapping("/logList")
	public String logList(OperatorLog operatorLog) {
		System.out.println("进入logList");
		List<OperatorLog> logList = null;
		try {
			
			logList = logService.getLogList(operatorLog);
			//System.out.println(JSON.toJSONString(operatorLog));
		} catch (Exception e) {
			System.out.println("日志列表异常");
		}
		return JSON.toJSONString(logList);
	}
	
	// 操作日志管理界面显示操作日志列表pageHelper
	@RequestMapping("/logList2/{pageNum}")
	public PageInfo<OperatorLog> logList2(@PathVariable Integer pageNum) {
		System.out.println("进入logList2");
		PageInfo<OperatorLog> logList = null;
		try {
			System.out.println("前台传来pageNum："+pageNum);
			if(pageNum==null){
				pageNum=1;
			}
			logList = logService.getLogList2(pageNum);
			
		} catch (Exception e) {
			System.out.println("日志列表异常");
		}
		//System.out.println("传送到也页面data:"+JSON.toJSONString(logList));
		return logList;
	}
	
	// 查询操作日志-后台分页
		@RequestMapping(value = "/queryLog", method = RequestMethod.POST)

		public PageInfo<OperatorLog> searchLog(String select1,String input1,String select2,String input2,Integer pageNum) {
			System.out.println("进入queryLog");

			PageInfo<OperatorLog> logList = null;
			try {
				if(pageNum==null){
					pageNum=1;
				}
				logList = logService.searchLog(select1,select2,input1,input2,pageNum);
				
			} catch (Exception e) {
				System.out.println("查询操作日志异常");
			}
			return logList;
		};
}
