package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


import com.zhongying.crm.model.ApproveRecord;
import com.zhongying.crm.util.MyMapper;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

public interface ApproveRecordMapper extends MyMapper<ApproveRecord>{
@Insert("insert into approverecord(status,approveDate,adminId,customerId) value(#{approveRecord.status},#{approveRecord.approveDate},#{adminId},#{customerId})")
	public void saveApproveRecord(@Param("approveRecord")ApproveRecord approveRecord,@Param("adminId")Integer adminId,@Param("customerId")Integer customerId);

@Select("select approverecord.*,admin.trueName,customer.customerName from approverecord left join admin on "
		+ "approverecord.adminId=admin.id left join customer on approverecord.customerId= customer.id  ")
public List<ApproveRecord> queryAllrizhi();

@Select("select approverecord.*,admin.trueName,customer.customerName from approverecord left join admin on "
		+ "approverecord.adminId=admin.id left join customer on approverecord.customerId= customer.id where "
		+ "approverecord.approveDate BETWEEN #{startDate} AND #{endDate} and approverecord.adminId=#{adminId} ")
public List<ApproveRecord> queryRiZhi(@Param("startDate")String startDate,@Param("endDate") String endDate, @Param("adminId")Integer adminId);

@Select("select approverecord.*,admin.trueName,customer.customerName from approverecord left join admin on "
		+ "approverecord.adminId=admin.id left join customer on approverecord.customerId= customer.id where "
		+ "approverecord.approveDate BETWEEN #{startDate} AND #{endDate} and approverecord.customerId=#{customerId} ")
public List<ApproveRecord> queryRiZhi1(@Param("startDate")String startDate,@Param("endDate") String endDate, @Param("customerId")Integer customerId);

@Select("select approverecord.*,admin.trueName,customer.customerName from approverecord left join admin on "
		+ "approverecord.adminId=admin.id left join customer on approverecord.customerId= customer.id where "
		+ "approverecord.approveDate BETWEEN #{startDate} AND #{endDate} and approverecord.customerId=#{customerId} and approverecord.adminId=#{adminId}  ")
public List<ApproveRecord> queryRiZhi2(@Param("startDate")String startDate,@Param("endDate") String endDate, @Param("customerId")Integer customerId,  @Param("adminId")Integer adminId);

@Select("SELECT  MIN(approveDate) FROM approverecord") 
public String queryMinDate();
@Select("SELECT  max(approveDate) FROM approverecord") 
public String queryMaxDate();
@Select("select approverecord.*,admin.trueName,customer.customerName from approverecord left join admin on "
		+ "approverecord.adminId=admin.id left join customer on approverecord.customerId= customer.id where "
		+ "approverecord.approveDate BETWEEN #{startDate} AND #{endDate}  ")
public List<ApproveRecord> queryRiZhi4(@Param("startDate")String startDate,@Param("endDate") String endDate);	
	
}
