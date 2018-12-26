package com.zhongying.crm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Transient;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoodsAppearInShopVO {



    private Integer shopId;

    //商店名称
    @Transient
    private String shopName;

    private Integer goodsId;

    //物品名称
    @Transient
    private String goodsName;

    //物品在商店平均价格
    @Transient
    private Integer priceAvg;

    //物品在某个商店最高价格
    @Transient
    private Integer priceMax;

    //物品在某个商店最低价格
    @Transient
    private Integer priceMin;

    //物品在某个商店出现几率
    @Transient
    private Double goodsAppearPercent;
}
