package com.zhongying.crm.model;

import javax.persistence.Entity;
import javax.persistence.Transient;

/**
 * @author feng
 * @version 1.15, 2017年6月19日 下午4:53:46
 * 
 */
@Entity
public class ApproveRecord {

	private Integer id;
	private Integer status;
	private String approveDate;
	@Transient
	private String trueName;
	@Transient
	private String customerName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getApproveDate() {
		return approveDate;
	}

	public void setApproveDate(String approveDate) {
		this.approveDate = approveDate;
	}

	public String getTrueName() {
		return trueName;
	}

	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

}
