package com.zhongying.crm.controller;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.ApproveRecord;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.service.ApproveRecordService;
import com.zhongying.crm.service.CustomerService;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:54:28
 * 
 */
@RestController
public class ApproverecordController {
	
	@Resource
	private ApproveRecordService approveRecordService;
	@Resource
	private AdminService adminservice;
	@Resource
	private CustomerService customerService;

	
	//展示月报
	@RequestMapping("/queryAllrizhi")
	public JSONArray  queryAllrizhi(HttpServletRequest req){
		JSONArray  jsonarray=new JSONArray();
		List<ApproveRecord> approveRecordlist = approveRecordService.queryAllrizhi();
		for (ApproveRecord approveRecord : approveRecordlist) {
			jsonarray.add(approveRecord);		
		}
		return jsonarray;
		
	}
	

	//查询日志
	@RequestMapping("/queryRizhi")
	public JSONArray queryRizhi(String startDate,String endDate,String CustomerName,String trueName, HttpServletRequest req){
	
		JSONArray  jsonarray=new JSONArray();
		List<ApproveRecord> approveRecordlist=new ArrayList<ApproveRecord>();
		 if(startDate==null||"".equals(startDate)){
			 startDate =  approveRecordService.queryMinDate();  
		 }
		 if(endDate==null||"".equals(endDate)){
			 endDate =  approveRecordService.queryMaxDate();
		 }
		 
		 /*if((startDate==null||"".equals(startDate))&&(endDate==null||"".equals(endDate))){
			 startDate =  approveRecordService.queryMinDate();
			 endDate =  approveRecordService.queryMaxDate();
		 }*/
		 
		 if("".equals(CustomerName)||CustomerName==null){
			 if("".equals(trueName)||trueName==null){
				 approveRecordlist = approveRecordService.queryRiZhi4(startDate,endDate);
			 }else{
				 approveRecordlist = approveRecordService.queryRiZhi(startDate,endDate,adminservice.queryAdminIdByTruename(trueName));
			 }	
		 }else {
			 if("".equals(trueName)||trueName==null){
					approveRecordlist = approveRecordService.queryRiZhi1(startDate,endDate,CustomerName);
			 }else{
					approveRecordlist = approveRecordService.queryRiZhi2(startDate,endDate,customerService.queryIdBycustomerName(CustomerName),adminservice.queryAdminIdByTruename(trueName));
			 }	
		 }
		for (ApproveRecord approveRecord : approveRecordlist) {
			jsonarray.add(approveRecord);		
		}
		
		return jsonarray;
	}
	
}
