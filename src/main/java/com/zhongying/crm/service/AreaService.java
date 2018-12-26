package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.AreaMapper;
import com.zhongying.crm.model.Area;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class AreaService {

	@Autowired
	private AreaMapper areamapper;

	public List<Area> queryAllArea() {
		
		return areamapper.queryAllArea();
	}

	public Area queryByAreaName(String name) {
		
		return areamapper.queryByAreaName(name);
	}

	public Boolean deleteArea(Integer id) {
	
		return areamapper.deleteArea(id);
		
	}

	public Boolean saveArea(String areaName) {
		// TODO Auto-generated method stub
	
		    return areamapper.saveArea( areaName);
		    
		
	}

	public Boolean updateAreaSubmit(Integer id, String areaName) {
		// TODO Auto-generated method stub
		return areamapper.updateAreaSubmit( id,  areaName);
	}

	
	public Area queryAreaById(Integer id){
		
		return areamapper.queryAreaById(id);
	}	
	


	
}
