package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.zhongying.crm.model.VisitRecord;
import com.zhongying.noscan.MyMapper;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface VisitRecordMapper extends MyMapper<VisitRecord>{
	
	@Insert("insert into visitrecord(visitTitle,content,visitDate,visitType,customerId,adminId)"
			+ "value(#{visitrecord.visitTitle},#{visitrecord.content},#{visitrecord.visitDate},"
			+ "#{visitrecord.visitType},#{customerId},#{id})")
	public Boolean saveYuebao(@Param("visitrecord")VisitRecord visitrecord,@Param("id") Integer adminID,@Param("customerId") Integer customerId);

	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id where visitrecord.adminId=#{id} ")
	public List<VisitRecord> queryAllYuebao(Integer id);

	@Update("update visitrecord set visitTitle=#{visitRecord.visitTitle},content=#{visitRecord.content},"
			+ "visitDate=#{visitRecord.visitDate},visitType=#{visitRecord.visitType} where customerId=#{customerID}")
	public Boolean updateYuebao(@Param("visitRecord")VisitRecord visitRecord,@Param("customerID")Integer customerID);

	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id where "
			+ "visitrecord.adminId=#{id} and visitrecord.visitDate BETWEEN #{startDate} AND #{endDate}")
	public List<VisitRecord> queryYuebaoByDate(@Param("startDate")String startDate,@Param("endDate") String endDate,@Param("id")Integer id);
	
	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id where "
			+ "visitrecord.adminId=#{id} and visitrecord.visitDate BETWEEN #{startDate} AND #{endDate} and visitrecord.customerId=#{customerId} ")
	public List<VisitRecord> queryYuebaoByDateandName(@Param("startDate")String startDate,@Param("endDate") String endDate, @Param("customerId")Integer customerId,@Param("id")Integer id);
	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id  ")
	public List<VisitRecord> queryAllYuebao1();
	
	
	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id where "
			+ "visitrecord.visitDate BETWEEN #{startDate} AND #{endDate}")
	public List<VisitRecord> queryYuebaoByDate1(@Param("startDate")String startDate,@Param("endDate") String endDate);
	@Select("select visitrecord.*,admin.trueName,customer.customerName from visitrecord left join admin on "
			+ "visitrecord.adminId=admin.id left join customer on visitrecord.customerId= customer.id where "
			+ "visitrecord.visitDate BETWEEN #{startDate} AND #{endDate} and visitrecord.customerId=#{customerId} ")
	public List<VisitRecord> queryYuebaoByDateandName1(@Param("startDate")String startDate,@Param("endDate") String endDate, @Param("customerId")Integer customerId);
	@Select("SELECT  MIN(visitDate) FROM visitrecord") 
	public String queryMinDate();
	@Select("SELECT  Max(visitDate) FROM visitrecord") 
	public String queryMaxDate();
		

}
