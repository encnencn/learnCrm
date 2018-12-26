package com.zhongying.crm.service;
/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:57:21
 * 
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.NoticeMapper;
import com.zhongying.crm.model.Notice;

@Service
public class NoticeService {

	@Autowired
	private NoticeMapper noticeMapper;

	public List<Notice> queryAllNotice() {
		return noticeMapper.queryAllNotice();
	}

	public String queryByadminId(Integer id) {
		return noticeMapper.queryByadminId(id);
	}

	public Integer queryAdminId(Integer id) {
		return noticeMapper.queryAdminId(id);
	}

	public void saveNotice(Notice notice, Integer id) {

		noticeMapper.saveNotice(notice, id);

	}

	public Notice queryByTitle(String title) {

		return noticeMapper.queryByTitle(title);
	}
	public Notice queryByTitle1(String title) {

		return noticeMapper.queryByTitle1(title);
	}

	public Boolean updateNotice(Notice notice) {

		return noticeMapper.updateNotice(notice);

	}

	public List<Notice> queryNotice1() {
		// TODO Auto-generated method stub
		return noticeMapper.queryNotice1();
	}

	public Notice queryLastNotice() {
		// TODO Auto-generated method stub
		return noticeMapper.queryLastNotice();
	}

	public Notice queryNoticeById(Integer id) {
		// TODO Auto-generated method stub
		return noticeMapper.queryNoticeById(id);
	}

}
