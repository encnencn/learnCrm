package com.zhongying.crm.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.ApproveRecordMapper;
import com.zhongying.crm.model.ApproveRecord;


/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class ApproveRecordService {

	@Autowired
	private ApproveRecordMapper approveRecordMapper;

	public void saveApproveRecord(ApproveRecord approveRecord,Integer adminId,Integer customerId) {
		
		approveRecordMapper.saveApproveRecord(approveRecord,adminId,customerId);
	}

	public List<ApproveRecord> queryAllrizhi() {
		
		return approveRecordMapper.queryAllrizhi();
	}

	public List<ApproveRecord> queryRiZhi(String startDate, String endDate, Integer adminId) {
		// TODO Auto-generated method stub
		return approveRecordMapper.queryRiZhi( startDate,  endDate,  adminId);
	}

	public List<ApproveRecord> queryRiZhi1(String startDate, String endDate, String customerName) {
		// TODO Auto-generated method stub
		return approveRecordMapper.queryRiZhi1( startDate,  endDate, customerName);
	}

	public List<ApproveRecord> queryRiZhi2(String startDate, String endDate, Integer customerId,
			Integer adminId) {
		// TODO Auto-generated method stub
		return approveRecordMapper.queryRiZhi2( startDate,  endDate, customerId,adminId);
	}

	public String queryMinDate() {
		
		return approveRecordMapper.queryMinDate();
	}
	public String queryMaxDate() {
		
		return approveRecordMapper.queryMaxDate();
	}

	public List<ApproveRecord> queryRiZhi4(String startDate, String endDate) {
		// TODO Auto-generated method stub
		return approveRecordMapper.queryRiZhi4( startDate,  endDate);
	}

	
	
}
