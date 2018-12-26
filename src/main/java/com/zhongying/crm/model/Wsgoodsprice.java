package com.zhongying.crm.model;

import lombok.*;

import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ws_goodsprice")
public class Wsgoodsprice {

    private Integer id;
    private Integer shopId;
    private Integer goodsId;
    private Integer price;
    private Date createTime;
    @Transient
    private String shopName;
    @Transient
    private String goodsName;
}
