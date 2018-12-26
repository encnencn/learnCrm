package com.zhongying.crm.mapper;

import com.zhongying.crm.model.*;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.BaseMapper;

import java.util.List;

/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */
@Repository
public interface WsgoodspriceMapper extends BaseMapper<Wsgoodsprice> {
	


	// 新增价格
	@Insert(" INSERT INTO ws_goodsprice(shopId,goodsId,price,createTime)\n" +
			"VALUES (#{shopId},1,#{good_1_price},now()),\n" +
			"(#{shopId},2,#{good_2_price},now()),\n" +
			"(#{shopId},3,#{good_3_price},now()),\n" +
			"(#{shopId},4,#{good_4_price},now()),\n" +
			"(#{shopId},5,#{good_5_price},now()),\n" +
			"(#{shopId},6,#{good_6_price},now()),\n" +
			"(#{shopId},7,#{good_7_price},now()),\n" +
			"(#{shopId},8,#{good_8_price},now())")
	Integer addPrice(GoodsPriceAddVO goodsPriceAddVO);

	// 某个商品在店铺的出现价格及几率
	@Select(" SELECT wp.goodsId,g.goodsName,wp.shopId,s.shopName,ROUND(AVG(wp.price)) AS priceAvg,MAX(wp.price) AS priceMax,MIN(wp.price) AS priceMin," +
			" (SELECT COUNT(*) FROM ws_goodsprice wp1 WHERE  wp1.shopId = wp.shopId AND wp1.goodsId = #{goodsId})/" +
			" (SELECT COUNT(DISTINCT wp2.createtime) FROM ws_goodsprice wp2 WHERE wp2.shopId = wp.shopId) AS goodsAppearPercent" +
			" FROM ws_goodsprice wp " +
			" LEFT JOIN ws_goods g ON g.id = wp.goodsId " +
			" LEFT JOIN ws_shop s ON s.id = wp.shopId " +
			" WHERE wp.goodsId =#{goodsId} GROUP BY wp.shopId")
	List<GoodsAppearInShopVO> goodsAppearInShopByGoods(@Param("goodsId") Integer goodsId);

	//商品在商铺出现几率
	@Select(" SELECT wp.goodsId,g.goodsName,wp.shopId,s.shopName,ROUND(AVG(wp.price)) AS priceAvg,MAX(wp.price) AS priceMax,MIN(wp.price) AS priceMin," +
			" (SELECT COUNT(*) FROM ws_goodsprice wp1 WHERE  wp1.goodsId = wp.goodsId AND wp1.shopId =  #{shopId})/" +
			" (SELECT COUNT(DISTINCT wp2.createtime) FROM ws_goodsprice wp2 WHERE wp2.shopId =  #{shopId}) AS goodsAppearPercent" +
			" FROM ws_goodsprice wp " +
			" LEFT JOIN ws_goods g ON g.id = wp.goodsId " +
			" LEFT JOIN ws_shop s ON s.id = wp.shopId " +
			" WHERE wp.shopId = #{shopId} GROUP BY wp.goodsId")
	List<GoodsAppearInShopVO> goodsAppearInShopByShop(@Param("shopId") Integer shopId);

	//物品价格列表
	@Select("SELECT gp.*,g.goodsName,s.shopName FROM ws_goodsprice gp\n" +
			"LEFT JOIN ws_goods g ON gp.goodsId = g.id\n" +
			"LEFT JOIN ws_shop s ON gp.shopId = s.id\n" +
			"ORDER BY gp.createTime DESC ")
    List<Wsgoodsprice> goodsPriceList();

	@Delete("delete from ws_goodsprice where id =#{id}")
	Integer deletePrice(Integer id);
}
