package com.zhongying.crm.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Transient;

/**
* @author yangyingjie E-mail:931526599@qq.com
* @version 创建时间：2017年6月5日 下午2:25:33
* 类说明
*/
@Entity
public class OperatorLog extends BaseEntity{
	private Integer id;
	private String action;//操作
	private String url;//访问地址
	private String description;//操作描述
	private Timestamp createTime;//访问时间
	private Integer adminId;//对应用户
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public Integer getAdminid() {
		return adminId;
	}
	public void setAdminid(Integer adminid) {
		this.adminId = adminid;
	}
	public String getTruename() {
		return truename;
	}
	public void setTruename(String truename) {
		this.truename = truename;
	}
	@Transient
	private String truename;

	
}
