package com.zhongying.crm.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel(value="返回对象模型")
public class ResultMap {

    @ApiModelProperty("状态码")
    private String code;

    @ApiModelProperty("信息")
    private String message;


}
