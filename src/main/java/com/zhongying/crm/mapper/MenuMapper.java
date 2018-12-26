package com.zhongying.crm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.zhongying.crm.model.Function;
import com.zhongying.crm.util.MyMapper;





/**
 * @author feng
 * @version 1.15, 2017-04-20
 * 
 */

public interface MenuMapper extends MyMapper<Function>{
	

	
		//查询菜单列表并格式化
		@Select(" SELECT   f1.id , f2.name fatherName , f1.name , f1.menuCode , f1.isMenu , f1.url , f1.action , f1.priority   FROM   FUNCTION   f1 LEFT JOIN FUNCTION f2   ON   f1.functionid=f2.id  ORDER BY priority ASC ")
		public List<Function> getMenuList(Function function);
		
		//查询所有父菜单列表
		@Select(" SELECT NAME FROM FUNCTION WHERE isMenu = 0 ")
		public List<String> selectAllFatherMenu();
		
		//根据菜单名称或者菜单编号查询菜单ID
		@Select(" select id from function where menucode = #{menucode} ")
		public Integer findIdByCode(String menucode);
				
		//根据菜单名称或者菜单编号查询菜单ID
		@Select(" select id from function where name = #{name} ")
		public Integer findIdByName(String name);
		
		//增加菜单
		@Insert(" INSERT INTO FUNCTION ("
				+ "functionId,"
				+ "name,"
				+ "menuCode,"
				+ "isMenu,"
				+ "url,"
				+ "action,"
				+ "priority"
				+ ")  VALUES ("
				+ "#{functionId},"
				+ "#{name},"
				+ "#{menuCode},"
				+ "#{isMenu},"
				+ "#{url},"
				+ "#{action},"
				+ "#{priority} )")
		public void addMenu(  Function function);
		
		//删除菜单
		@Delete(" delete from function where id = #{id}")
		public void deleteMenu(Integer id);
		
		//修改菜单展示
		@Select(" SELECT   f1.id , f2.name fatherName , f1.name , f1.menuCode , f1.isMenu , f1.url , f1.action , f1.priority   FROM   FUNCTION   f1 LEFT JOIN FUNCTION f2   ON   f1.functionid=f2.id where f1.id = #{id} ")
		public Function updateMenuView(Integer id);
				
	
		
		//更新菜单
		@Update(" UPDATE FUNCTION SET "
				+ "name = #{name},"//1
				+ "menuCode = #{menuCode},"//2
				+ "isMenu = #{isMenu},"//3
				+ "url = #{url},"//4
				+ "action = #{action},"//5
				+ "priority = #{priority},"//6
				+ "functionId = #{functionId}"//7
			
				+ "  WHERE id = #{id} ")
		public void updateMenu( Function function);
		
	
		
		//根据输入菜单名查询用户列表
		@Select(" SELECT   f1.id , f2.name fatherName , f1.name , f1.menuCode , f1.isMenu , f1.url , f1.action , f1.priority   FROM   FUNCTION   f1 LEFT JOIN FUNCTION f2   ON   f1.functionid=f2.id  WHERE f1.name LIKE concat('%',#{functionname},'%')   OR   f1.menuCode LIKE concat('%',#{functionname},'%') or f1.functionid =(select id from function where name = #{fuctionname}) ")
		public List<Function> searchMenu(String functionname);

		
		
		
		
		
		
}
