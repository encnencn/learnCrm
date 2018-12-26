package com.zhongying.crm;



import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;



/**
 * Hello world!
 *使用@ServletComponentScan 注解后，
 *Servlet、Filter、Listener 可以直接通过 @WebServlet、@WebFilter、@WebListener 注解自动注册，无需其他代码
 */

@ServletComponentScan
@SpringBootApplication
@ComponentScan(basePackages = "com.zhongying.crm")
@MapperScan(basePackages = "com.zhongying.crm.mapper")
@EnableAsync
public class CrmApplication  extends SpringBootServletInitializer{
    
 @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
      return application.sources(CrmApplication.class);
    }

    public static void main(String[] args) {
    	System.out.println( "Hello World!" );  
        SpringApplication.run(CrmApplication.class, args);
      
    }
  
}
