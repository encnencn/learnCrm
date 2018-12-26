package com.zhongying.crm.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * swagger初始化类
 * API查看地址：http://localhost:8080/swagger-ui.html
 * 
 * @author SUNF
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    
    /**
     * 
     * 创建API应用
     * apiInfo() 增加API相关信息
     * 通过select()函数返回一个ApiSelectorBuilder实例,用来控制哪些接口暴露给Swagger来展现，
     * 本例采用指定扫描的包路径来定义指定要建立API的目录。
     * @return
     */
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                 //扫描路径为com.zhongying.api.controller下
                 //.apis(RequestHandlerSelectors.basePackage("com.zhongying.wz.api.doctor.controller.v1;"))
                .apis(RequestHandlerSelectors.any()) // 对所有API进行监控
                .paths(PathSelectors.any()) // 对所有路径进行监控
                .build();
    }
    
    /**
     * 创建该API的基本信息（这些基本信息会展现在文档页面中）
     * 访问地址：http://项目实际地址/swagger-ui.html
     * @return
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("CRM-RESTful APIs")
                .description("")
                .termsOfServiceUrl("")
                .contact("sun.f")
                .version("1.0")
                .build();
    }
}
