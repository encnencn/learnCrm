/*
package com.zhongying.crm.controller;

import com.github.pagehelper.PageInfo;
import com.zhongying.crm.model.*;
import com.zhongying.crm.service.WSService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Api(value = "WSController-万世接口",tags = "新增参数")
public class WSController {

    @Autowired
    WSService  wsService;

    //页面列表
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "pageNum", value = "页数",defaultValue = "0", required = true, dataType = "int")})
    @ApiOperation(value = "物品价格列表", httpMethod = "GET", notes = "分页显示所有录入的物品价格")
    @RequestMapping(value = "/goodsPriceList",method = RequestMethod.GET)
    public PageInfo<Wsgoodsprice> goodsPriceList(Integer pageNum){

        List<Wsgoodsprice> resultMap = wsService.goodsPriceList(pageNum);

        return new PageInfo<Wsgoodsprice>(resultMap);
    }

    //新增价格接口
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "body", name = "wsgoodsprice", value = "物品价格", required = true, dataType = "Wsgoodsprice")})
    @ApiOperation(value = "物品价格录入", httpMethod = "POST", notes = "wsgoodsprice：要录入的单个物品价格")
    @RequestMapping(value = "/addPrice",method = RequestMethod.POST)
    public ResultMap addPrice( GoodsPriceAddVO goodsPriceAddVO ){

        ResultMap resultMap = new ResultMap("400","保存失败！");

        if(goodsPriceAddVO!=null){

            Integer rows = wsService.addPrice(goodsPriceAddVO);
            if(rows==1)
                resultMap = new ResultMap("200", "保存成功！");
        }
        return resultMap;
    }

    //某个商品在店铺出现几率及平均价格
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "goodsId", value = "物品id", required = true, dataType = "int")})
    @ApiOperation(value = "某个商品在店铺出现几率及平均价格", httpMethod = "GET", notes = "goodsId：物品id")
    @RequestMapping(value = "/goodsAppearInShopByGoods",method = RequestMethod.GET)
    public List<GoodsAppearInShopVO> goodsAppearInShopByGoods(Integer goodsId  ){

        List<GoodsAppearInShopVO> goodsAppearInShopVOList = new ArrayList<GoodsAppearInShopVO>();

        goodsAppearInShopVOList = wsService.goodsAppearInShopByGoods(goodsId);

        return goodsAppearInShopVOList;
    }

    //某个店铺出现商品几率及平均价格
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "shopId", value = "商铺id", required = true, dataType = "int")})
    @ApiOperation(value = "某个商品在店铺出现几率及平均价格", httpMethod = "GET", notes = "shopId：商铺id")
    @RequestMapping(value = "/goodsAppearInShopByShop",method = RequestMethod.GET)
    public List<GoodsAppearInShopVO> goodsAppearInShopByShop(Integer shopId  ){

        List<GoodsAppearInShopVO> goodsAppearInShopVOList = new ArrayList<GoodsAppearInShopVO>();

        goodsAppearInShopVOList = wsService.goodsAppearInShopByShop(shopId);

        return goodsAppearInShopVOList;
    }

    //删除一条物品价格
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "body", name = "id", value = "物品id", required = true, dataType = "int")})
    @ApiOperation(value = "删除一条物品价格", httpMethod = "POST", notes = "id：要删除的物品id")
    @RequestMapping(value = "/deletePrice",method = RequestMethod.POST)
    public ResultMap deletePrice( Integer id ){

        ResultMap resultMap = new ResultMap("400","保存失败！");

        if(id!=null){

            Integer rows = wsService.deletePrice(id);
            if(rows==1)
                resultMap = new ResultMap("200", "保存成功！");
        }
        return resultMap;
    }
}
*/
