package com.zhongying.crm.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends BaseEntity {
	@Id
	private Integer id;

	// 用户名
	private String username;
	// 密码
	private String password;
	// 手机号
	private String mobile;
	// 真实姓名
	private String trueName;
	//头像
	private String avatarUrl;
	// 邮箱
	private String email;
	//
	private String token;
	// 是否启用
	private String isDisable;
	//角色ID
	@Transient
	private Integer roleId;
	//部门ID
	@Transient
	private Integer departmentId;
	//角色名称
	@Transient
	private String rolename;
	//部门名称
	@Transient
	private String departmentname;
	


}
