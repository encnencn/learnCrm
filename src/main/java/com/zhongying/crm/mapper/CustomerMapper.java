package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.zhongying.crm.model.Customer;
import com.zhongying.noscan.MyMapper;





/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Mapper
public interface CustomerMapper extends MyMapper<Customer>{
	
	//通过用户名查询用户
	
		//查询客户列表
		@Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer LEFT JOIN admin ON customer.adminID=admin.ID order by customer.createTime desc")
		public List<Customer> getCustomerList(Customer customer);
		
		//删除客户
		@Delete(" delete customer.*,approverecord.* from customer,approverecord  where customer.id= approverecord.customerId and customer.id = #{id} ")
		public void deleteCustomer(Integer id);
		
	
		//增加客户
		@Insert(" INSERT INTO customer (customername,customercode,district,linkPersonName,linkPersonDuty,tel,address,fax,email,compayUrl,product,equipment,technique,deviceProblem,requirement,features,planDate,signDate,produceDate,deviceArriveDate,budgetAmount,budgetStatus,modelName,num,otherDevice,workProcess,transport,clamp,cutter,drawing,sampleParts,scheme, takt, priceList,remark,expect,status,createTime,adminid)  VALUES (#{customer.customerName},#{customer.customerCode},#{customer.district},#{customer.linkPersonName},#{customer.linkPersonDuty},#{customer.tel},#{customer.address},#{customer.fax},#{customer.email},#{customer.compayUrl},#{customer.product},#{customer.equipment},#{customer.technique},#{customer.deviceProblem},#{customer.requirement},#{customer.features},#{customer.planDate,jdbcType=VARCHAR},#{customer.signDate,jdbcType=VARCHAR},#{customer.produceDate,jdbcType=VARCHAR},#{customer.deviceArriveDate,jdbcType=VARCHAR},#{customer.budgetAmount},#{customer.budgetStatus},#{customer.modelName},#{customer.num},#{customer.otherDevice},#{customer.workProcess},#{customer.transport},#{customer.clamp},#{customer.cutter},#{customer.drawing},#{customer.sampleParts},#{customer.scheme},#{customer.takt},#{customer.priceList},#{customer.remark},#{customer.expect},0,#{customer.createTime},#{adminid})")
		public void addCustomer(  @Param("customer") Customer customer,@Param("adminid") Integer adminid);
		
		//更新客户
		@Update(" UPDATE customer SET "
				+ "customerName = #{customer.customerName},"//1
				+ "customerCode = #{customer.customerCode},"//2
				+ "district = #{customer.district},"//3
				+ "linkPersonName = #{customer.linkPersonName},"//4
				+ "linkPersonDuty = #{customer.linkPersonDuty},"//5
				+ "tel = #{customer.tel},"//6
				+ "address = #{customer.address},"//7
				+ "fax = #{customer.fax},"//8
				+ "email = #{customer.email},"//9
				+ "compayUrl = #{customer.compayUrl},"//10
				+ "product = #{customer.product},"//11
				+ "equipment = #{customer.equipment},"//12
				+ "technique = #{customer.technique},"//13
				+ "deviceProblem = #{customer.deviceProblem},"//14
				+ "requirement = #{customer.requirement},"//15
				+ "features = #{customer.features},"//16
				+ "planDate = #{customer.planDate},"//17
				+ "signDate = #{customer.signDate},"//18
				+ "produceDate = #{customer.produceDate},"//19
				+ "deviceArriveDate = #{customer.deviceArriveDate},"//20
				+ "budgetAmount = #{customer.budgetAmount},"//21
				+ "budgetStatus = #{customer.budgetStatus},"//22
				+ "modelName = #{customer.modelName},"//23
				+ "num = #{customer.num},"//24
				+ "otherDevice = #{customer.otherDevice},"//25
				+ "workProcess = #{customer.workProcess},"//26
				+ "transport = #{customer.transport},"//27
				+ "clamp = #{customer.clamp},"//28
				+ "cutter = #{customer.cutter},"//29
				+ "drawing = #{customer.drawing},"//30
				+ "sampleParts = #{customer.sampleParts},"//31
				+ "scheme = #{customer.scheme},"//32
				+ "takt = #{customer.takt},"//33
				+ "priceList = #{customer.priceList},"//34
				+ "remark = #{customer.remark},"//35
				+ "expect = #{customer.expect},"//36
				+ "status = 0,"//37
				+ "createTime = #{customer.createTime},"//38
				+ "adminid = #{adminid}  WHERE id = #{customer.id} ")
		public void updateCustomer( @Param("customer") Customer customer,@Param("adminid") Integer adminid);
		
		//根据用户真实名字，查询ID
		@Select(" select id from admin where truename = #{truename} ")
		public Integer selectAdminIdByTrueName(String truename);
		
		//根据输入用户名查询用户列表
		@Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.customername like concat('%',#{customername},'%') or customer.customerCode = #{customername} or customer.linkPersonName = #{customername} or admin.truename = #{customername} ")
		public List<Customer> searchCustomer(String customername);
		
		//修改客户展示
		@Select(" select customer.id,customer.customername,customer.customercode,customer.district,customer.linkPersonName,customer.linkPersonDuty,customer.tel,customer.address,customer.fax,customer.email,customer.compayUrl,customer.product,customer.equipment,customer.technique,customer.deviceProblem,customer.requirement,customer.features,customer.planDate,customer.signDate,customer.produceDate,customer.deviceArriveDate,customer.budgetAmount,customer.budgetStatus,customer.modelName,customer.num,customer.otherDevice,customer.workProcess,customer.transport,customer.clamp,customer.cutter,customer.drawing,customer.sampleParts,customer.scheme, customer.takt, customer.priceList,customer.remark,customer.expect,customer.status,customer.createTime,admin.truename from customer LEFT JOIN admin ON customer.adminID=admin.ID where customer.id = #{customerid} ")
		public Customer updateCustomerView(Integer customerid);
		
		//根据客户名称或者客户编号查询用户ID
		@Select(" select id from customer where customercode = #{customercode} ")
		public Integer findIdByCode(String customercode);
		
		//根据客户名称或者客户编号查询用户名称
		@Select(" select id from customer where customername = #{customername} ")
		public Integer findIdByName(String customername);
		
		//查询所有admin表中的trueName，用来填充添加客户时，事物担当者的下拉列表
		@Select(" select truename from admin  ")
		public List<String> selectAllTrueName();
		
		//客户申请通过
		@Update(" update  customer set status = 1 where id = #{id} ")
		public void applicationApproved(Integer id);
		
		//客户申请被拒绝
		@Update(" update  customer set status = 2 where id = #{id} ")
		public void applicationRefused(Integer id);
		
		//有效客户列表
		@Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer LEFT JOIN admin ON customer.adminID=admin.ID where customer.status = 1 ")
		public List<Customer> getEfficientList(Customer customer);
		
		//根据输入用户名查询有效用户列表
		@Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.status = 1 and (customer.customername = #{customername} or customer.customerCode = #{customername} or customer.linkPersonName = #{customername} or admin.truename = #{customername} )")
		public List<Customer> searchEfficientCustomer(String customername);
		
		//当前用户所录客户列表
		@Select(" select customer.*,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.adminid =#{adminid} and customer.status <>1  ")
		public List<Customer> getPersonalCustomerList(Integer adminid);
		
		@Select(" select customer.*,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.adminid =#{adminid}   ")
		public List<Customer> getPersonalCustomerList1(Integer adminid);
		//APP端根据客户名模糊查询客户
		@Select("select customer.*,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.status =1 and customer.customerName  LIKE CONCAT(CONCAT('%',#{name},'%')) ")
		public List<Customer> queryByCustomerName(String name);
		
		//根据客户名查询客户
		@Select("select id from customer where customerName=#{customerName}")
		public Integer queryIdBycustomerName(String customerName);
		
        @Select("select id from customer where customerName=#{customerName} and status=1")
		public Integer existorNot(String customerName);
        
       //根据输入客户名查询当前用户所录列表
       @Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where (customer.customername like concat('%',#{customername},'%') or customer.customerCode = #{customername} or customer.linkPersonName = #{customername} or admin.truename = #{customername}) and customer.adminId =#{adminId}")
      	public List<Customer> searchCustomer_personal(@Param("customername") String customername,@Param("adminId") Integer adminId);

       //根据输入截取所得字符查询用户ID
       @Select(" select customer.id from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.customername like concat('%',#{customername},'%') or customer.customerCode like concat('%',#{customername},'%') or customer.linkPersonName like concat('%',#{customername},'%') or admin.truename like concat('%',#{customername},'%') ")
       public List<Integer> searchCustomerId(String namechar);
     
     	
     	//根据ID查询客户
   		@Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer LEFT JOIN admin ON customer.adminID=admin.ID where customer.id= #{id} ")
   		public Customer queryByCustomerId(Integer id);
   		
   		//根据输入字符串查询用户列表
        @Select(" select customer.id,customer.customerName,customer.customerCode,customer.linkPersonName,customer.status,customer.createTime,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.customername like concat('%',#{customername},'%') or customer.customerCode like concat('%',#{customername},'%') or customer.linkPersonName like concat('%',#{customername},'%') or admin.truename like concat('%',#{customername},'%') ")
       	public List<Customer> searchCustomerByStr(String customername);

	@Select("select customer.*,admin.truename from customer   LEFT JOIN admin ON customer.adminID=admin.ID where customer.status =1 and customer.customerCode  LIKE CONCAT(CONCAT('%',#{name},'%')) ")
    List<Customer> queryByCustomerCode(String name);
}
