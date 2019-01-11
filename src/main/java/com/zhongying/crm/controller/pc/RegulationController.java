package com.zhongying.crm.controller.pc;

import com.alibaba.fastjson.JSONArray;
import com.zhongying.crm.model.Regulation;
import com.zhongying.crm.service.RegulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:54:28
 * 
 */
@RestController
public class RegulationController {

	@Autowired
	private RegulationService regulationService;
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@RequestMapping("/queryAllRegulation")
	public JSONArray queryAllRegulation() {
		System.out.println("********************************************************");
		JSONArray jsonTable = new JSONArray();

		List<Regulation> regulationlist = regulationService.queryAllRegulation();
		for (Regulation regulation : regulationlist) {
			jsonTable.add(regulation);
		}
		return jsonTable;
	}

	@RequestMapping("/updateRegulation")
	public Boolean updateRegulation(String title, String content, Integer id) {
		
		Regulation regulation =regulationService.queryRegulationById(id);
		if(regulation.getTitle().equals(title)){
			regulation.setContent(content);
			regulation.setTitle(title);
			regulation.setId(id);
			return regulationService.updateRegulation(regulation);
		}else{
			if(regulationService.queryByRegulationTitle(title)==null){
				regulation.setContent(content);
				regulation.setTitle(title);
				regulation.setId(id);
				return regulationService.updateRegulation(regulation);
			}else{
				return false;
			}
		}
		
		
	}

	@RequestMapping("/addRegulation")
	public Boolean addRegulation(String title, String content) {
		if(regulationService.queryByRegulationTitle(title)==null){
			Regulation regulation = new Regulation();
	
			regulation.setTitle(title);
			regulation.setContent(content);
	
			regulation.setCreateTime(sdf.format(new Date()));
			regulationService.saveRegulation(regulation);
			return true;
		}else{
			return false;
		}
	}

	@RequestMapping("/queryByRegulationTitle")
	public JSONArray queryByRegulationTitle(String title) {
		JSONArray jsonTable = new JSONArray();

		Regulation regulation = regulationService.queryByRegulationTitle(title);
		if (regulation == null) {			
		} else {
			jsonTable.add(regulation);
		}
		return jsonTable;
	}
	@RequestMapping("/RuleExistOrnot")
	public Boolean RuleExistOrnot(String title){
		if(regulationService.queryByRegulationTitle(title)==null){
			return true;
		}else{
			return false;
		}
		
	}
	
}
