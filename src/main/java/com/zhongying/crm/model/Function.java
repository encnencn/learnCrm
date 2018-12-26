package com.zhongying.crm.model;

import javax.persistence.Entity;
import javax.persistence.Transient;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 上午9:20:44
 * 
 */
@Entity
public class Function  {
	
	private Integer id;
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	//父菜单ID
	private Integer functionId;
	
	//父菜单
	@Transient
	private String fatherName;

	// 功能名称
	private String name;
	// 菜单编码
	private String menuCode;
	// 是否子菜单（0：父菜单 1：子菜单）
	private Integer isMenu;
	// 请求命名空间
	private String url;
	// 执行的方法名
	private String action;
	// 菜单显示优先级
	private Integer priority;
	private String icon;
	
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getFunctionId() {
		return functionId;
	}

	public void setFunctionId(Integer functionId) {
		this.functionId = functionId;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public Integer getIsMenu() {
		return isMenu;
	}

	public void setIsMenu(Integer isMenu) {
		this.isMenu = isMenu;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}


}
