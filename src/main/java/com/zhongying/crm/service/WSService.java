package com.zhongying.crm.service;

import com.github.pagehelper.PageHelper;
import com.zhongying.crm.mapper.WsgoodsMapper;
import com.zhongying.crm.mapper.WsgoodspriceMapper;
import com.zhongying.crm.mapper.WsshopMapper;
import com.zhongying.crm.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WSService {
    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private WsshopMapper wsshopMapper;

    @Autowired
    private WsgoodsMapper wsgoodsMapper;

    @Autowired
    private WsgoodspriceMapper wsgoodspriceMapper;

    public Integer addPrice(GoodsPriceAddVO goodsPriceAddVO) {

        Integer row = null;

        row = wsgoodspriceMapper.addPrice(goodsPriceAddVO);

        return row;
    }

    //根据goodId查看商品在商铺出现几率
    public List<GoodsAppearInShopVO> goodsAppearInShopByGoods(Integer goodsId) {


        return wsgoodspriceMapper.goodsAppearInShopByGoods(goodsId);
    }

    //根据shopId查看商品在商铺出现几率
    public List<GoodsAppearInShopVO> goodsAppearInShopByShop(Integer shopId) {

        return wsgoodspriceMapper.goodsAppearInShopByShop(shopId);
    }

    //物品价格列表
    public List<Wsgoodsprice> goodsPriceList(Integer pageNum) {

        if (pageNum ==null)
            pageNum =0;

        PageHelper.startPage(pageNum, 20);
       return wsgoodspriceMapper.goodsPriceList();
    }

    public Integer deletePrice(Integer id) {

        Integer rows = 0;
        rows = wsgoodspriceMapper.deletePrice(id);

        return rows;
    }
}
