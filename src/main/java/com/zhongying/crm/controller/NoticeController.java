package com.zhongying.crm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.Notice;
import com.zhongying.crm.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:54:28
 * 
 */
@RestController
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	//公告管理页面查询所有公告
	@RequestMapping("/queryAllNotice")
	public JSONArray queryAllNotice() {
	
		JSONArray jsonTable = new JSONArray();
		List<Notice> noticeList = noticeService.queryAllNotice();
		for (Notice notice : noticeList) {

			jsonTable.add(notice);
		}
		return jsonTable;
	}

	//查询已发布的公告
	@RequestMapping("/queryNotice1")
	public JSONArray queryNotice1() {
		
		JSONArray jsonTable = new JSONArray();

		List<Notice> noticeList = noticeService.queryNotice1();
		for (Notice notice : noticeList) {
			jsonTable.add(notice);
		}
		return jsonTable;
	}
	
	//主页显示最新公告
	@RequestMapping("/queryLastNotice")
	public String queryLastNotice() {
		Notice notice=null;
		try{
		notice = noticeService.queryLastNotice();
		}catch(Exception e){
			System.out.println("查询最新公告异常！");
		}
		return JSON.toJSONString(notice);
	}
	
	@RequestMapping("/updateNotice")
	public Boolean updateNotice(String title, String content, Integer status, Integer id) {
		Notice notice=noticeService.queryNoticeById(id);
		
		if(notice.getTitle().equals(title)){
			notice.setContent(content);
			notice.setStatus(status);
			notice.setTitle(title);
			notice.setId(id);
			return noticeService.updateNotice(notice);
		}else{
			if(noticeService.queryByTitle(title)==null){
				notice.setContent(content);
				notice.setStatus(status);
				notice.setTitle(title);
				notice.setId(id);
				System.out.println(noticeService.updateNotice(notice)+"====================");
				return noticeService.updateNotice(notice);
			}else{
				return false;
			}
		}
	}

	@RequestMapping("/addNotice")
	public Boolean addNotice(String title, String content, Integer status, HttpServletRequest req) {
		if(noticeService.queryByTitle(title)==null){
			Admin admin = (Admin) req.getSession().getAttribute("admin");		
			Notice notice = new Notice();
			notice.setTitle(title);
			notice.setContent(content);
			notice.setStatus(status);
			notice.setCreateTime(sdf.format(new Date()));
			noticeService.saveNotice(notice, admin.getId());		
			return true;
		}else{
			return false;
		}
	}

	@RequestMapping("/queryByTitle")
	public JSONArray queryByTitle(String title) {
		
		JSONArray jsonTable = new JSONArray();
		Notice notice = noticeService.queryByTitle(title);
		if (notice == null) {			
		} else {
			jsonTable.add(notice);
		}		
		return jsonTable;
	}
	@RequestMapping("/queryByTitle1")
	public JSONArray queryByTitle1(String title) {
		
		JSONArray jsonTable = new JSONArray();
		Notice notice = noticeService.queryByTitle1(title);
		if (notice == null) {
//			return queryAllNotice();
		
		} else {
			jsonTable.add(notice);
		}
		return jsonTable;
	}
	@RequestMapping("/noticeExistOrnot")
	public Boolean noticeExistOrnot(String title){
		if(noticeService.queryByTitle(title)==null){
			return true;
		}else{
			return false;
		}
		
	}
}
