/**
 * Created by mingjie on 2017/1/11.
 */

function getUrlParam(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
}

$(function() {
	var pageNum=getUrlParam('pageNum');
	
	if(pageNum==""||pageNum=='undefined'||pageNum==null){pageNum=1}
	
	var logManager = {
		logManager : $("#role-manage-role table tbody"),
		init : function() {
			this.loadLog();
			this.searchLog();// 查询操作日志
			this.select1Blur();
			this.select2Blur();
		},
		
		rights_allPage : $("#rights_allPage"),
		loadLog : function(obj) {
			var that = this;
			var loadPageCount = 0;//加载页面次数  
		    var _html='';  
			$.ajax({
						url : '/logList2/'+pageNum,
						dataType : 'json',
						type : "GET",
						success : function(result) {
							loadPageCount++;
							 if(result.list.length>0){
							   $.each(result.list, function(index, Item){

							       _html += '<tr class="role-tr">'
									+ '<td class="cus-id">'
									+ Item.id
									+ '</td>'
									+ '<td class="cus-action">'
									+ (Item.action == undefined ? " " : Item.action)
									+ '</td>'
									+ '<td class="cus-url">'
									+ (Item.url == undefined ? " " : Item.url)
									+ '</td>'
									+ '<td class="cus-description">'
									+ (Item.description == undefined ? " " : Item.description)
									+ '</td>'
									+ '<td class="cus-createTime">'
									+ (Item.createTime == undefined ? " " : moment(new Date(Item.createTime)).utc(8).format('YYYY年MM月DD日 HH时mm分ss秒'))
									+ '</td>'
									+ '<td class="cus-truename">'
									+ (Item.truename == undefined ? " " : Item.truename)
									+ '</td>'
									+ '</tr>';
							   });

							   if(result.pageNum){
								   //显示分页信息：总页数(pages),当前页数(pageNum),页面大小(pageSize)
					           		$(".nav.page").initPage(result.pages,result.pageNum,result.pageSize,'');

								   //前台分页js:当前页数(pageNum),页面大小(pageSize),总页数(pages)
				                   $(obj).buildPage(result.pageNum,result.pageSize,result.pages);

				           }else{
				                _html='';
				                //如果没有返回数据,或者列表为空,你可能需要有一些提示信息,在此处拼接
				               $(obj).html("");
				               $(obj).buildPage(0,3,0);
				           }

							 };
							 $("#rights_list").html(_html);

						  },
						error : function() {
						}
					})

		},
		//select1框失去焦点事件
		select1Blur : function(){
		$(".modal-top-log-query").on('blur','#form-field-1',function() {
			var that = this;
			var select1 = $(this).parents('.modal-top-log-query').find('#form-field-1').val();
			if(select1=="r.createtime"){
				$(this).parents('.modal-top-log-query').find('#form-field-2').attr("onfocus","HS_setDate(this)");
			}else{
				$(this).parents('.modal-top-log-query').find('#form-field-2').attr("onfocus","");
				
			}
		})
		},
		
		//select2框失去焦点事件
		select2Blur : function(){
		$(".modal-top-log-query").on('blur','#form-field-3',function() {
			var that = this;
			var select2 = $(this).parents('.modal-top-log-query').find('#form-field-3').val();
			if(select2=="r.createtime"){
				$(this).parents('.modal-top-log-query').find('#form-field-4').attr("onfocus","HS_setDate(this)");
			}else{
				$(this).parents('.modal-top-log-query').find('#form-field-4').attr("onfocus","");
				
			}
		})
		},
	
		// 查询日志-后台分页
		searchLog : function(obj) {
			var that = this;
			var loadPageCount = 0;//加载页面次数  
		    var _html='';
			$(".modal-top-log-query").on('click','.btn-success-query',function() {
								
				var select1 = $(this).parents('.modal-top-log-query').find('#form-field-1').val(),
					input1 = $(this).parents('.modal-top-log-query').find('#form-field-2').val(),
					select2 = $(this).parents('.modal-top-log-query').find('#form-field-3').val(),
					input2 = $(this).parents('.modal-top-log-query').find('#form-field-4').val();
				
				if(input1==""&&input2==""){
		               $(this).parents('.modal-top-log-query').find('#form-field-2').focus();
		                       return false;
		            }
				
				if(select1=="r.createtime"){
					var riqi=null;
						riqi=input1.split("-");
					if(riqi[1].length==1){
						 if(riqi[2].length==1){
								input1=riqi[0]+"-0"+riqi[1]+"-0"+riqi[2];
							}else{
								input1=riqi[0]+"-0"+riqi[1]+"-"+riqi[2];	
							}
					}
						
				}
				
				if(select2=="r.createtime"){
					var riqi=null;
					 	riqi=input2.split("-");
					if(riqi[1].length==1){
						if(riqi[2].length==1){
							input2=riqi[0]+"-0"+riqi[1]+"-0"+riqi[2];
						}else{
							input2=riqi[0]+"-0"+riqi[1]+"-"+riqi[2];
						}
					}
				}
				
				
				$.ajax({
							url : "/queryLog",
							dataType : 'json',
							type : "POST",
							data : {
								"select1" : select1,
								"input1" : input1,
								"select2" : select2,
								"input2" : input2,
								"pageNum" : pageNum,
							},
							success : function(result) {

								$('#myModal3').hide();
								$('.modal-backdrop').hide();

								loadPageCount++;  
								 if(result.list.length>0){ 
								   $.each(result.list, function(index, Item){  
									  
									   _html += '<tr class="role-tr">'
										+ '<td class="cus-id">'
										+ Item.id
										+ '</td>'
										+ '<td class="cus-action">'
										+ (Item.action == undefined ? " " : Item.action)
										+ '</td>'
										+ '<td class="cus-url">'
										+ (Item.url == undefined ? " " : Item.url)
										+ '</td>'
										+ '<td class="cus-description">'
										+ (Item.description == undefined ? " " : Item.description)
										+ '</td>'
										+ '<td class="cus-createTime">'
										+ (Item.createTime == undefined ? " " : moment(new Date(Item.createTime)).utc(8).format('YYYY-MM-DD HH:mm:ss'))
										+ '</td>'
										+ '<td class="cus-truename">'
										+ (Item.truename == undefined ? " " : Item.truename)
										+ '</td>'
										+ '</tr>';
								   });
								   
								   if(result.pageNum){ 
									   //显示分页信息：总页数(pages),当前页数(pageNum),页面大小(pageSize)
										$(".nav.page").initPage(result.pages,result.pageNum,result.pageSize,'');
										
									   //前台分页js:当前页数(pageNum),页面大小(pageSize),总页数(pages)
									   $(obj).buildPage(result.pageNum,result.pageSize,result.pages); 
									 
							   }else{  
									_html='';  
									//如果没有返回数据,或者列表为空,你可能需要有一些提示信息,在此处拼接  
								   $(obj).html("");  
								   $(obj).buildPage(0,3,0);  
							   }  
								   
								 };
								 $("#rights_list").html(_html); 

									

							},
							error : function() {
							}
						});
			});
		},

	
		// 点击关闭后刷新页面
		modalclose : function() {
			var that = this;
			$(".modal-content-update").on('click', '.modal-close', function() {

				location.reload();
			});
		},

	
	};
	logManager.init();
	
		

});