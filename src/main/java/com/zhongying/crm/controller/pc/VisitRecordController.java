package com.zhongying.crm.controller.pc;


import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.VisitRecord;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.service.CustomerService;
import com.zhongying.crm.service.VisitRecordService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/*import org.apache.poi.ss.usermodel.Workbook;*/
/*import org.jeecgframework.poi.excel.ExcelExportUtil;
import org.jeecgframework.poi.excel.entity.ExportParams;*/
/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:54:28
 * 
 */
@RestController
public class VisitRecordController {
	
	@Resource
	private VisitRecordService visitRecordService;
	@Resource
	private AdminService adminservice;
	@Resource
	private CustomerService customerService;

	//保存月报
	@RequestMapping("/saveYuebao")
	public Boolean saveYuebao(VisitRecord visitrecord,Integer customerId,HttpServletRequest req) {
		 Admin admin=(Admin)req.getSession().getAttribute("admin");	
		 return  visitRecordService.saveYuebao(visitrecord,adminservice.queryAdminIdByTruename(admin.getTrueName()),customerId);
	}
	//展示月报
	@RequestMapping("/queryAllYuebao")
	public JSONArray  queryAllYuebao(HttpServletRequest req){
		JSONArray  jsonarray=new JSONArray();
		 Admin admin=(Admin)req.getSession().getAttribute("admin");	
		List<VisitRecord> visitRecordlist = visitRecordService.queryAllYuebao(admin.getId());
		for (VisitRecord visitRecord : visitRecordlist) {
			jsonarray.add(visitRecord);
		}
		return jsonarray;
		
	}
	@RequestMapping("/queryAllYuebao1")
	public JSONArray  queryAllYuebao1(HttpServletRequest req){
		JSONArray  jsonarray=new JSONArray();
		
		List<VisitRecord> visitRecordlist = visitRecordService.queryAllYuebao1();
		for (VisitRecord visitRecord : visitRecordlist) {
			jsonarray.add(visitRecord);
		}
		return jsonarray;
		
	}
	
	//修改月报
	@RequestMapping("/updateYuebao")
	public Boolean updateYuebao(VisitRecord visitRecord){
		
		return visitRecordService.updateYuebao(visitRecord,customerService.queryIdBycustomerName(visitRecord.getCustomerName()));
	}
	
	@RequestMapping("/queryYuebao")
	public JSONArray queryYuebao(String startDate,String endDate,String CustomerName,HttpServletRequest req){
		if(startDate==null||"".equals(startDate)){
			 startDate =  visitRecordService.queryMinDate();  
		 }
		 if(endDate==null||"".equals(endDate)){
			 endDate =  visitRecordService.queryMaxDate();
		 }
		
		List<VisitRecord> visitRecordlist=new ArrayList<VisitRecord>();
		 Admin admin=(Admin)req.getSession().getAttribute("admin");	
		 
		 
		if("".equals(CustomerName)||CustomerName==null){
			visitRecordlist = visitRecordService.queryYuebaoByDate(startDate,endDate,admin.getId());
		}else{
			visitRecordlist = visitRecordService.queryYuebaoByDateandName(startDate,endDate,customerService.queryIdBycustomerName(CustomerName),admin.getId());
		}
		JSONArray  jsonarry=new JSONArray();
		for (VisitRecord visitRecord : visitRecordlist) {
			jsonarry.add(visitRecord);
			
		}
		
		return jsonarry;
	}
	
	@RequestMapping("/queryYuebao1")
	public JSONArray queryYuebao1(String startDate,String endDate,String CustomerName,HttpServletRequest req){
	/*
		Date date=java.sql.Date.valueOf(startDate);
		Date date1=java.sql.Date.valueOf(endDate);*/
		if(startDate==null||"".equals(startDate)){
			 startDate =  visitRecordService.queryMinDate();  
		 }
		 if(endDate==null||"".equals(endDate)){
			 endDate =  visitRecordService.queryMaxDate();
		 }
		List<VisitRecord> visitRecordlist=new ArrayList<VisitRecord>();
			
		if("".equals(CustomerName)||CustomerName==null){
			visitRecordlist = visitRecordService.queryYuebaoByDate1(startDate,endDate);
		}else{
			visitRecordlist = visitRecordService.queryYuebaoByDateandName1(startDate,endDate,customerService.queryIdBycustomerName(CustomerName));
		}
		JSONArray  jsonarry=new JSONArray();
		for (VisitRecord visitRecord : visitRecordlist) {
			jsonarry.add(visitRecord);
			
		}
		
		return jsonarry;
	}
/*	@RequestMapping("/exportYuebao")
	 public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
	    // 告诉浏览器用什么软件可以打开此文件
	    response.setHeader("content-Type", "application/vnd.ms-excel");
	    // 下载文件的默认名称
	    response.setHeader("Content-Disposition", "attachment;filename=user.xls");
	    List<VisitRecord> list = userRepository.findAll();
	    Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams(), VisitRecord.class, list);
	    workbook.write(response.getOutputStream());
	  }*/
	
	
	
}
