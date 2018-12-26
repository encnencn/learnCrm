package com.zhongying.crm.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.zhongying.crm.util.RegExp;
import org.apache.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.ApproveRecord;
import com.zhongying.crm.model.Customer;
import com.zhongying.crm.service.AdminService;
import com.zhongying.crm.service.ApproveRecordService;
import com.zhongying.crm.service.CustomerService;
import com.zhongying.crm.util.ChineseCharToEn;
import com.zhongying.crm.util.Sort;
import com.zhongying.crm.util.Sort2;

/**
 * @author yangyingjie E-mail:931526599@qq.com
 * @version 创建时间：2017年5月16日 下午2:15:36 类说明
 */
@RestController

public class CustomerController {
	@Resource
	private CustomerService customerService;
	@Resource
	private ApproveRecordService approveRecordService;
	@Resource
	private AdminService adminservice;

	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	JSONArray jsonTable = new JSONArray();

	// 客户查询界面显示客户列表
	@RequestMapping("/customerList")
	public String customerList(Customer customer) {
		System.out.println("进入customerList");
		List<Customer> customerList = null;
		try {
			customerList = customerService.getCustomerList(customer);
			//System.out.println(JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("客户列表异常");
		}
		return JSON.toJSONString(customerList);
	}
	
	// 添加/修改时客户名称校验名称是否重复,并取得客户名称首字母，来自动填充客户编码
		@RequestMapping("/CheckCustomerName")
		public JSONObject CheckCustomerName(Integer id,String  customerName) {
			System.out.println("进入CheckCustomerName");
			Boolean flag = null;
			Integer idByName=null;
			JSONObject jsonObject1=new JSONObject();
			
			try{
				idByName=customerService.findIdByName(customerName.replace(" ", ""));
			}catch(Exception e){
				System.out.println("校验客户名异常");
			}
			//System.out.println("idByName:"+idByName+";id"+id);
			if((idByName==null)||(idByName!=null&&idByName.equals(id))){
				//取得客户名称首字母，来自动填充客户编码,去掉干扰查询的选项
				if(customerName.contains("股份有限公司")){
					String[] customerNameSplit =customerName.split("股份有限公司");
					customerName=customerNameSplit[0];
				}else if(customerName.contains("有限公司")){
					String[] customerNameSplit =customerName.split("有限公司");
					customerName=customerNameSplit[0];
				}else if(customerName.contains("公司")){
					String[] customerNameSplit =customerName.split("公司");
					customerName=customerNameSplit[0];
				}
				
				ChineseCharToEn cte=new ChineseCharToEn();
				String firstName= cte.getAllFirstLetter(customerName);
				flag=true;
				jsonObject1.put("firstName", firstName);
				
			}else{
				flag=false;
			}
			jsonObject1.put("flag", flag);
			
			System.out.println(flag);
			return jsonObject1;
		}
	
	// 有效客户列表
	@RequestMapping("/efficientList")
	public String efficientList(Customer customer) {
		System.out.println("进入efficientList");
		List<Customer> customerList = null;
		try {
			customerList = customerService.getEfficientList(customer);
			//System.out.println(JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("有效客户列表异常");
		}
		return JSON.toJSONString(customerList);
	}

	// 当前用户所录客户列表
	@RequestMapping(value ="/personalCustomerList_pc", method = RequestMethod.POST)
	public JSONArray personalCustomerList1(HttpServletRequest req) {
		System.out.println("进入personalCustomerList");
		JSONArray jsonarray = new JSONArray();
		List<Customer> customerList = null;
		try {
			// 从session中读取当前用户ID
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			Integer adminid = admin.getId();

			customerList = customerService.getPersonalCustomerList1(adminid);
			for (Customer customer : customerList) {
				jsonarray.add(customer);
			}

			//System.out.println("当前用户所录客户列表：" + JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("当前用户所录客户列表异常");
		}
		return jsonarray;
	}
	//手机端个人客户列表
	@RequestMapping(value ="/personalCustomerList", method = RequestMethod.POST)
	public JSONArray personalCustomerList(HttpServletRequest req) {
		System.out.println("进入personalCustomerList");
		JSONArray jsonarray = new JSONArray();
		List<Customer> customerList = null;
		try {
			// 从session中读取当前用户ID
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			Integer adminid = admin.getId();

			customerList = customerService.getPersonalCustomerList(adminid);
			for (Customer customer : customerList) {
				jsonarray.add(customer);
			}

			//System.out.println("当前用户所录客户列表：" + JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("当前用户所录客户列表异常");
		}
		return jsonarray;
	}

	
	@RequestMapping(value ="/personalCustomerList_xcx", method = RequestMethod.POST)
	public JSONArray personalCustomerList_xcx(String username) {
		System.out.println("进入personalCustomerList");
		JSONArray jsonarray = new JSONArray();
		List<Customer> customerList = null;
		try {
			// 从session中读取当前用户ID
//			Admin admin = (Admin) req.getSession().getAttribute("admin");
//			Integer adminid = admin.getId();

			customerList = customerService.getPersonalCustomerList(adminservice.checkAdminName(username).getId());
			for (Customer customer : customerList) {
				jsonarray.add(customer);
			}

			//System.out.println("当前用户所录客户列表：" + JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("当前用户所录客户列表异常");
		}
		return jsonarray;
	}

	
	
	
	// 删除客户
	@RequestMapping(value = "/deleteCustomer", method = RequestMethod.POST)

	public void deleteCustomer(@RequestParam Integer id) {
		System.out.println("进入deleteCustomer");
		try {
			customerService.deleteCustomer(id);
			
		} catch (Exception ex) {
			
		}
	}

	// 修改客户展示
	@RequestMapping(value = "/updateCustomerView", method = RequestMethod.POST)

	public String updateCustomerView(@RequestParam Integer customerid) {
		System.out.println("进入updateCustomerView");
		System.out.println("传过来的ID：" + customerid);
		Customer customerView = new Customer();
		try {
			customerView = customerService.updateCustomerView(customerid);
			//System.out.println(JSON.toJSONString(customerView));
		} catch (Exception e) {
			System.out.println("修改客户展示异常");
		} 
		System.out.println(JSON.toJSONString(customerView));
		return JSON.toJSONString(customerView);
	}

	// 修改客户提交
	@RequestMapping(value = "/updateCustomerSubmit", method = RequestMethod.POST)

	public Boolean updateCustomerSubmit(Customer customer) {
		System.out.println("进入updateCustomerSubmit");
		// String flag = "nullExist";

//		try {
			// 获取客户ID、客户名称、客户编码、事物担当者
			int id = customer.getId();
			
			System.out.println("页面传过来ID：" + id);
			// 检查用户名和用户编码是否存在
			Integer customerid1 = customerService.findIdByName( customer.getCustomerName());
			// 插入修改时间
			Date date = new Date();
			Timestamp timeStamp = new Timestamp(date.getTime());
			System.out.println("timeStamp:" + timeStamp);
			customer.setCreateTime(timeStamp);
			customer.setCustomerName(customer.getCustomerName().replace(" ", ""));//替换客户名称中的空格
			Integer adminid = null;	
		if(customerid1==null){
			adminid = customerService.selectAdminIdByTrueName(customer.getTruename());
			customerService.updateCustomer(customer, adminid);
			return true;
		}else{
			if(customerid1==id){
				adminid = customerService.selectAdminIdByTrueName(customer.getTruename());
				customerService.updateCustomer(customer, adminid);
				return true;
			}
			else{
				return false;
			}
		}


//		} catch (Exception ex) {
//			System.out.println("修改角色异常");
//		}

//		return true;
	}

	// 增加客户
	@RequestMapping(value = "/addCustomerSubmit", method = RequestMethod.POST)
	public String addCustomerSubmit(Customer customer, HttpServletRequest req) {

		System.out.println("进入addCustomerSubmit");
		String flag = "flase";

		try {
			// 获取客户ID、客户名称、事物担当者
			String customerName = customer.getCustomerName();
			String trueName = customer.getTruename();
			// 手机端返回过来的事物担当为空，从session中读取放入其中
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			trueName = admin.getTrueName();
			customer.setTruename(trueName);
			// 检查用户名和用户编码是否存在
			Integer customerid1 = customerService.findIdByName(customerName);
			// 插入修改时间
			Date date = new Date();
			Timestamp timeStamp = new Timestamp(date.getTime());
			System.out.println("timeStamp:" + timeStamp);
			customer.setCreateTime(timeStamp);
			Integer adminid = null;
			if (customerid1 != null || customerName == null) {
				System.out.println("判断用户名已存在");
				flag = "false";
			} else {
				adminid = customerService.selectAdminIdByTrueName(trueName);
				customerService.addCustomer(customer, adminid);

				ApproveRecord approveRecord = new ApproveRecord();
				approveRecord.setApproveDate(sdf.format(new Date()));
				approveRecord.setStatus(0);
				
				approveRecordService.saveApproveRecord(approveRecord,
						adminservice.queryAdminIdByTruename(admin.getTrueName()),
						customerService.queryIdBycustomerName(customerName));

				flag = "true";
				System.out.println("添加成功,判断客户名称不与之前所录信息重复");
			}

		} catch (Exception ex) {
			System.out.println("添加客户异常");
		}

		return flag;

	}

	// 增加客户
	@RequestMapping(value = "/addCustomerSubmit-APP", method = RequestMethod.POST)
	public Boolean addCustomerSubmitAPP(Customer customer, HttpServletRequest req) {
		System.out.println(customer);
		System.out.println("进入addCustomerSubmit-APP");
		Boolean flag = false;

//		 try {
		// 获取客户ID、客户名称、事物担当者
		String customerName = customer.getCustomerName();
		String trueName = null;
		// 手机端返回过来的事物担当为空，从session中读取放入其中
		
//		Admin admin = (Admin) req.getSession().getAttribute("admin");
//		trueName = admin.getTrueName();
//		customer.setTruename(trueName);
		
		// 检查用户名和用户编码是否存在
		Integer customerid1 = customerService.findIdByName(customerName);

		// 插入修改时间
		Date date = new Date();
		Timestamp timeStamp = new Timestamp(date.getTime());
		System.out.println("客户添加时间timeStamp:" + timeStamp);
		customer.setCreateTime(timeStamp);

		Integer adminid = null;
		if (customerid1 != null) {
			System.out.println("判断用户名已存在");

		} else {
			adminid = customerService.selectAdminIdByTrueName(trueName);
			customerService.addCustomer(customer, adminid);
			flag = true;
			System.out.println("APP添加客户成功");
		}

		
//		  } catch (Exception ex) { System.out.println("APP添加客户异常"); }
		 

		return flag;

	}

	// 在所有客户中查询客户
	@RequestMapping(value = "/searchCustomer", method = RequestMethod.POST)

	public JSONArray searchCustomer(String customername) {
		System.out.println("进入searchCustomer");
		
		Map<String, Integer> customerIdMap = new HashMap<String, Integer>();
		JSONArray	jsonarray=new JSONArray();
		Integer charNum=1;
		try {
			//去掉前台传来查询字符串中的空格
			customername=customername.replace(" ", "");
			//未分割前先查是否有匹配连续字符串的情况
			/*List<Customer> customerList=customerService.searchCustomerByStr(customername);
			jsonarray.add(customerList);*/
			
			//将字符串分割成单个字符
			String[] nameChar=customername.split("");
			charNum=nameChar.length;
			for (String namechar : nameChar) {
				System.out.println("输入字符串分割:"+namechar);
				//查询包含单个字符的客户的ID的List
				List<Integer>	customerIdList=customerService.searchCustomerId(namechar);
				for (Integer customerid : customerIdList) {
					Integer count=1;
					//把客户ID的的List放入HashMap中，并计算出现次数
					if(customerIdMap.containsKey(customerid.toString())){
						count=customerIdMap.get(customerid.toString())+1;
						System.out.println("map中已存在的字符value值:"+customerIdMap.get(customerid.toString()));
					}
					System.out.println("key:"+customerid.toString()+";count:"+count);
					customerIdMap.put(customerid.toString(), count);
				}
			}
			//Map根据value值排序
			Sort2 bvc = new Sort2(customerIdMap);  
		    TreeMap<String,Integer> sorted_map = new TreeMap<String,Integer>(bvc); 
			sorted_map.putAll(customerIdMap);
			//Map中的Key值放到set集合中
			Set<String> keySet =  sorted_map.keySet();
	        Iterator<String> iter = keySet.iterator();
	        Boolean bingo=false;
	        while (iter.hasNext()) {
	          String key = iter.next();
	          System.out.println("Key:"+key + ";Value:" + customerIdMap.get(key));
	          //判断是否有一个一条数据匹配所有字符
	          if(charNum<=customerIdMap.get(key)){
	        	  bingo=true;
	        	  System.out.println("bingo:"+bingo);
	          }
	          //如果有全部匹配的情况，就只显示全部匹配的对象
	          if(bingo){
	        	  if(charNum <= customerIdMap.get(key)){
	        		Customer customer=customerService.queryByCustomerId(Integer.parseInt(key));
	  	            jsonarray.add(customer);
	  	          System.out.println("全部匹配字符的客户有："+JSON.toJSONString(customer));
	        	  }else{
	        		  break;
	        	  }
	          }else{
	        	  Customer customer=customerService.queryByCustomerId(Integer.parseInt(key));
		            jsonarray.add(customer);
	          }
	        } 
		
			//System.out.println(JSON.toJSONString(jsonarray));
		} catch (Exception e) {
			System.out.println("查询客户异常");
		}
		
		return jsonarray;
	};
	
	// 在当前用户的客户中查询客户
		@RequestMapping(value = "/searchCustomer_personal", method = RequestMethod.POST)

		public String searchCustomer_personal(String customername,HttpServletRequest req) {
			System.out.println("进入searchCustomer_personal");

			List<Customer> customerList = null;
			try {
				Admin admin = (Admin) req.getSession().getAttribute("admin");
				customerList = customerService.searchCustomer_personal(customername.replace(" ", ""),admin.getId());
				//System.out.println(JSON.toJSONString(customerList));
			} catch (Exception e) {
				System.out.println("查询当前用户所录客户异常");
			}
			return JSON.toJSONString(customerList);
		};
	// 根据客户名称查询有效客户
	@RequestMapping(value = "/searchEfficientCustomer", method = RequestMethod.POST)

	public String searchEfficientCustomer(String customername) {
		System.out.println("进入searchEfficientCustomer");

		List<Customer> customerList = null;
		try {
			customerList = customerService.searchEfficientCustomer(customername);
			//System.out.println(JSON.toJSONString(customerList));
		} catch (Exception e) {
			System.out.println("查询有效客户异常");
		}
		return JSON.toJSONString(customerList);
	};

	// 查询所有admin的真实姓名
	@RequestMapping(value = "/selectAllTrueName", method = RequestMethod.POST)

	public String selectAllTrueName() {
		System.out.println("进入selectAllTrueName");

		List<String> trueNameList = null;
		try {
			trueNameList = customerService.selectAllTrueName();
			//System.out.println(JSON.toJSONString(trueNameList));
		} catch (Exception e) {
			System.out.println("查询客户异常");
		}
		return JSON.toJSONString(trueNameList);
	}

	// 查询所有admin的真实姓名
	@RequestMapping(value = "/selectAllTrueName2", method = RequestMethod.POST)

	public JSONArray selectAllTrueName2() {
		JSONArray jsonarray = new JSONArray();
		List<String> trueNameList = null;
		try {
			trueNameList = customerService.selectAllTrueName();
			for (String string : trueNameList) {
				jsonarray.add(string);
			}
		} catch (Exception e) {
			System.out.println("查询客户异常");
		}
		return jsonarray;
	}

	// 客户审核通过
	@RequestMapping(value = "/applicationApproved", method = RequestMethod.POST)

	public void applicationApproved(@RequestParam Integer id, HttpServletRequest req) {
		System.out.println("进入applicationApproved");

		try {
			customerService.applicationApproved(id);
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			ApproveRecord approveRecord = new ApproveRecord();
			approveRecord.setApproveDate(sdf.format(new Date()));
			approveRecord.setStatus(1);
			approveRecordService.saveApproveRecord(approveRecord,
					adminservice.queryAdminIdByTruename(admin.getTrueName()), id);

		} catch (Exception ex) {
		}
	}

	// 客户审核被拒
	@RequestMapping(value = "/applicationRefused", method = RequestMethod.POST)

	public void applicationRefused(@RequestParam Integer id, HttpServletRequest req) {
		System.out.println("进入applicationRefused");
		try {
			customerService.applicationRefused(id);
			Admin admin = (Admin) req.getSession().getAttribute("admin");
			ApproveRecord approveRecord = new ApproveRecord();
			approveRecord.setApproveDate(sdf.format(new Date()));
			approveRecord.setStatus(2);
			approveRecordService.saveApproveRecord(approveRecord,
					adminservice.queryAdminIdByTruename(admin.getTrueName()), id);
		} catch (Exception ex) {
		}
	}

	// 模糊查询
	@RequestMapping("/queryByCustomerName")
	public List<Customer> queryByCustomerName(String name, HttpServletRequest req) {

		List<Customer> customerList = new ArrayList<Customer>();
		if (RegExp.checkEnglish(name)){
			customerList = customerService.queryByCustomerCode(name);
		}else {
			customerList = customerService.queryByCustomerName(name);
		}
		return customerList;
		/*HashMap<String,Integer> map = new HashMap<String,Integer>();
		ChineseCharToEn cte = new ChineseCharToEn();
		JSONArray jsonarray = new JSONArray();
		//查询所有客户名称列表
		List<Customer> customerList = customerService.queryByCustomerName();
		//把输入的查询条件分割成单个字符数组ss
		String[] ss = name.split("");
		for (String string : ss) {
			System.out.println(string+"===========================");
		}
		//从输入汉字字符串中取得首字母cte.getAllFirstLetter(name)//后面的看不懂了
		for (Customer customer : customerList) {
			
			if(name.trim().equals(customer.getCustomerName())||cte.getAllFirstLetter(name).trim().equals(cte.getAllFirstLetter(customer.getCustomerName()).trim())){
				 map.put(customer.getCustomerName(),30);
				 break;
			}else{
				int count = 0;
			for (int i = 0; i < ss.length; i++) {
				if(ss[i].equals("")){
					continue;
				}
				
				String abc = cte.getAllFirstLetter(ss[i]);
				if (cte.getAllFirstLetter(customer.getCustomerName()).trim().indexOf(abc) != -1) {
					count = count + 1;
				}
			}
			if(count<2){
				
			}else{
			  map.put(customer.getCustomerName(),count);		
			}
			}
		}
		Sort bvc = new Sort(map);  
	    TreeMap<String,Integer> sorted_map = new TreeMap<String,Integer>(bvc); 
		sorted_map.putAll(map); 
		
		Set<String> keySet =  sorted_map.keySet();
        Iterator<String> iter = keySet.iterator();
        while (iter.hasNext()) {
            String key = iter.next();
            for (Customer customer : customerList) {
            	if(map.get(key)==30){
            		jsonarray=new JSONArray();
            		jsonarray.add(customer);
            		break;
            	}
            	else if(key.equals(customer.getCustomerName())){
					jsonarray.add(customer);
				}
			}
          System.out.println(key + ":" + map.get(key));
        }
		return jsonarray;*/
	}

	// 查询用户是否已经存在
	@RequestMapping("/existorNot")
	public Boolean existorNot(String customerName) {
		if (customerService.existorNot(customerName) == null) {
			return true;
		} else {
			return false;
		}

	}

}
