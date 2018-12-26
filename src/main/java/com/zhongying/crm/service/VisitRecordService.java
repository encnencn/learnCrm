package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.VisitRecordMapper;
import com.zhongying.crm.model.VisitRecord;



/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class VisitRecordService {

	@Autowired
	private VisitRecordMapper visitRecordMapper;
	
	public Boolean saveYuebao(VisitRecord visitrecord, Integer adminID, Integer customerId) {
		
		return visitRecordMapper.saveYuebao(visitrecord, adminID,customerId);
	}

	public List<VisitRecord> queryAllYuebao(Integer id) {
		 
		return visitRecordMapper.queryAllYuebao( id);
	}

	public Boolean updateYuebao(VisitRecord visitRecord,Integer CustomerID) {
		
		return visitRecordMapper.updateYuebao( visitRecord,CustomerID);
	}

	public List<VisitRecord> queryYuebaoByDate(String startDate, String endDate,Integer adminID) {
		
		return visitRecordMapper.queryYuebaoByDate( startDate,  endDate,adminID);
	}

	public List<VisitRecord> queryYuebaoByDateandName(String startDate, String endDate, Integer customerId,Integer adminid) {
		
		return visitRecordMapper.queryYuebaoByDateandName( startDate,  endDate,  customerId, adminid);
	}

	public List<VisitRecord> queryAllYuebao1() {
		
		return visitRecordMapper.queryAllYuebao1( );
	}

	public List<VisitRecord> queryYuebaoByDate1(String startDate, String endDate) {
		
		return visitRecordMapper.queryYuebaoByDate1( startDate,  endDate);
	}

	public List<VisitRecord> queryYuebaoByDateandName1(String startDate, String endDate, Integer customerId) {
		
		return visitRecordMapper.queryYuebaoByDateandName1( startDate,  endDate,  customerId);
	}

	public String queryMinDate() {
		// TODO Auto-generated method stub
		return visitRecordMapper.queryMinDate();
	}

	public String queryMaxDate() {
		// TODO Auto-generated method stub
		return visitRecordMapper.queryMaxDate();
	}

	


	
}
