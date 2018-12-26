package com.zhongying.crm.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.Area;
import com.zhongying.crm.service.AreaService;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:54:28
 * 
 */
@RestController
public class AreaController {
	@Resource
	private AreaService areaService;
	
	@RequestMapping("/queryAllArea")
	public JSONArray queryAllArea() {
		
		JSONArray jsonTable = new JSONArray();
		 List<Area> arealist = areaService.queryAllArea();
		for (Area area : arealist) {
			jsonTable.add(area);
		}	
			return jsonTable;

		}
	
	@RequestMapping("/queryByAreaName")
	public JSONArray queryByAreaName(String areaName) {
		
		JSONArray jsonTable = new JSONArray();
		Area area= areaService.queryByAreaName(areaName);
		if(area == null){
			return jsonTable;
		}
		else{
			jsonTable.add(area);
			return jsonTable;
		} 

	}
	@RequestMapping("/deleteArea")
	public Boolean deleteArea(Integer id){
		
		return areaService.deleteArea(id);
	}
	@RequestMapping("/saveArea")
	public Boolean saveArea(String name){
		if(areaService.queryByAreaName(name)==null){
			return areaService.saveArea(name);
		}else{
			return false;
		}
		
	}

	@RequestMapping("/updateAreaSubmit")
	public Boolean updateAreaSubmit(Integer id,String areaName){
		Area area=areaService.queryAreaById(id);
		if(area.getName().equals(areaName)){
			return true;
		}else{
			if(areaService.queryByAreaName(areaName)==null){
			    return areaService.updateAreaSubmit(id,areaName);
			}else{
				return false;
			}
		}
	
	}
	@RequestMapping("/quyuNameExistOrnot")
	public Boolean quyuNameExistOrnot(String name){
		if(areaService.queryByAreaName(name)==null){
			return true;
		}else{
			return false;
		}
	}
}
