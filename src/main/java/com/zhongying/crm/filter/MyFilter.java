package com.zhongying.crm.filter;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import com.zhongying.crm.model.Admin;
import com.zhongying.crm.model.OperatorLog;
import com.zhongying.crm.service.LogService;

/**
 * 
 * * 使用注解标注过滤器
 * 
 * @WebFilter将一个实现了javax.servlet.Filter接口的类定义为过滤器 
 * 属性filterName声明过滤器的名称,可选
 * 属性urlPatterns指定要过滤
 * 的URL模式,也可使用属性value来声明.(
 * 指定要过滤的URL模式是必选属性)
 * 
 * @author yangyingjie E-mail:931526599@qq.com
 * @version 创建时间：2017年6月1日 上午9:06:11 类说明
 */
@WebFilter(filterName = "myFilter", urlPatterns = "/html/*")
public class MyFilter implements Filter {
	
	@Resource
	private LogService logService;
	
	@Override
	public void destroy() {
		System.out.println("过滤器销毁");
	}
	
	
	
	//对于访问/HTML/*的操作进行过滤，检查session中是否含有登录信息，否则重定向到登录页面
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("执行过滤操作");

		HttpServletRequest request2 = (HttpServletRequest) request;
		HttpServletResponse response2 = (HttpServletResponse) response;
		// 获取session中的用户名
		HttpSession session = request2.getSession();
		
		String path = request2.getContextPath();
		String basePath = request2.getScheme() + "://" + request2.getServerName() + ":" + request2.getServerPort()
				+ path;
		
		//获取客户端远程IP
		String url = request.getRemoteAddr();//192.168.4.234
		//System.out.println("path:" + path); //打印结果 path:
		//System.out.println("basePath:" + basePath); //打印结果 basePath:http://localhost:8080
		
		//截取访问地址
	     String uri = request2.getRequestURI();
	     String action=uri.split("/")[2] ;
	     //System.out.println("action:"+action);  //打印结果   html/index.html
	     
	     //创建生成时间
	     Date date = new Date();
		Timestamp timeStamp = new Timestamp(date.getTime());
		
		//获取用户ID
		Object admin1 = session.getAttribute("admin");
		Admin admin2=(Admin) admin1;
		//System.out.println("session中的admin:" + JSON.toJSONString(admin1));

		if (admin1 == null) {
			// 如果判断没有登录，就重定向到登录首页
			System.out.println("重定向到登录首页:"+basePath + "/login.html");
			//response2.sendRedirect(basePath + "/index_x.html");
			response2.sendRedirect(basePath + "/login.html");
		} else {
			// 不把以下访问记录到日志中
			if(!(action.equals("index.html")||action.equals("operatorLog.html")||action.equals("favicon.ico")||action.equals("index_v.html"))){
				OperatorLog operator=new OperatorLog();
				operator.setAction(action);
				operator.setUrl(url);
				operator.setCreateTime(timeStamp);
				operator.setAdminid(admin2.getId());
				String description=logService.selectDesctitionByAction(action);
				operator.setDescription(description);
				
				//System.out.println("增加日志文件operator:"+JSON.toJSONString(operator));
				logService.addLog(operator);
			}else{
				
			}
			
			
			chain.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		System.out.println("过滤器初始化");
	}

}
