package com.zhongying.crm.service;
/**
 * @author feng
 * @version 1.15, 2017年5月17日 下午2:57:21
 * 
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.RegulationMapper;
import com.zhongying.crm.model.Regulation;

@Service
public class RegulationService {

	@Autowired

	private RegulationMapper regulationMapper;

	public void saveRegulation(Regulation regulation) {

		regulationMapper.saveRegulation(regulation);

	}

	public List<Regulation> queryAllRegulation() {
		// TODO Auto-generated method stub
		return regulationMapper.queryAllRegulation();
	}

	public Boolean updateRegulation(Regulation regulation) {

		return regulationMapper.updateNotice(regulation);

	}

	public Regulation queryByRegulationTitle(String title) {
		// TODO Auto-generated method stub
		return regulationMapper.queryByRegulationTitle(title);
	}

	public Regulation queryRegulationById(Integer id) {
		// TODO Auto-generated method stub
		return regulationMapper.queryRegulationById( id);
	}

}
