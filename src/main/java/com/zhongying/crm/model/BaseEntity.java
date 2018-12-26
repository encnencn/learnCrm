package com.zhongying.crm.model;


import javax.persistence.Transient;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
public class BaseEntity {
	
	// 页码
	@Transient
	private Integer pageNum = 1;


	// 每页显示数目
	@Transient
	private Integer pageSize = 5;
	
	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}


	

	

}
