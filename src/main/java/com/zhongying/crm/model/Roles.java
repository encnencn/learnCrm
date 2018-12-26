package com.zhongying.crm.model;

import javax.persistence.Entity;

/**
 * @author feng
 * @version 1.15, 2017年5月16日 上午11:03:21
 * 
 */

@Entity
public class Roles {
	
	private Integer id;
    

	private String name;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    
    
	
}
