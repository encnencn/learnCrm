package com.zhongying.crm.model;

import javax.persistence.Entity;

@Entity
public class Regulation {

	private Integer id;
	private String title;

	private String content;

	private String createTime;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return "Regulation [id=" + id + ", title=" + title + ", content=" + content + ", createTime=" + createTime
				+ "]";
	}

}
