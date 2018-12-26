package com.zhongying.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongying.crm.mapper.MenuMapper;

import com.zhongying.crm.model.Function;

/**
 * 
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

@Service
public class MenuService {

	@Autowired
	private MenuMapper menumapper;

	// 获得客户列表
	public List<Function> getMenuList(Function function) {
		
		return menumapper.getMenuList(function);
	}
	
	//查询所有父菜单列表
	public List<String> selectAllFatherMenu() {
		
		return menumapper.selectAllFatherMenu();
	}
	
	//通过客户编码查找ID
		public Integer findIdByCode(String menucode) {
			
			return menumapper.findIdByCode(menucode);
	}
		
	//通过客户名称查找ID
	public Integer findIdByName(String name) {
			
			return menumapper.findIdByName(name);
	}
	
	// 添加客户
		public void addMenu(Function function) {

			menumapper.addMenu(function);
		}
	
	// 删除客户
	public void deleteMenu(Integer id) {

		menumapper.deleteMenu(id);
	}
	
	//更新客户展示
		public Function updateMenuView(Integer id) {
			
			return menumapper.updateMenuView(id);
		}
	

	// 修改客户
	public void updateMenu(Function function) {

		menumapper.updateMenu(function);
	}

	
	
	//查询菜单
	public List<Function> searchMenu(String functionname) {
			
		return menumapper.searchMenu(functionname);
		
	}


    public List<Function> queryByfunctionIdList(List<Integer> idList) {

		return menumapper.queryByfunctionIdList(idList);
    }
}
