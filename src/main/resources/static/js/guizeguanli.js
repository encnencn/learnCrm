/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {

	var noticeManage = {
		noticeManage : $("#role-manage-role table tbody"),
		init : function() {
			this.addNotice();
			this.queryNotice();
			this.updateNotice();
			this.loadRole();
			this.RuleAdd();
	        this.RuleUpdate();
		},
		rights_allPage : $("#rights_allPage"),
		RuleAdd:function(){
			var that = this;
			$("#myModalAdd").on('input', '#form-field-titleadd', function() {
				
				var title=$("#myModalAdd").find('#form-field-titleadd').val();
				if(title==""){
					 $("#myModalAdd").find('#ruleName').text("不能为空");
				}else if(title.split(" ").length != 1){
					
					  $("#myModalAdd").find('#ruleName').text("不能包含空格");
					  return false;
				}else{
					
					$.ajax({
						url : "/RuleExistOrnot",
						type : "POST",
						data : {
							"title" : title, // 上传编号
						},
						success : function(data) {
							if(data){
								  $("#myModalAdd").find('#ruleName').text("");
							}else{	
							    $("#myModalAdd").find('#ruleName').text("已经存在");
								$("#myModalAdd").find('#form-field-titleadd').focus();
								$(".addNotice").find('.btn-primary').disabled=true;
							}
						},
						error : function() {
						}
					});
				}
			});
		},
		RuleUpdate:function(){
			var that = this;
			$("#myModalUpdate").on('input', '#form-field-title', function() {
				
				var title=$("#myModalUpdate").find('#form-field-title').val();
				if(title==""){
					$("#myModalUpdate").find('#ruleName').text("不能为空");
				}else if(title.split(" ").length != 1){
					$("#myModalUpdate").find('#ruleName').text("不能包含空格");
					  return false;
				}else{
					$.ajax({
						url : "/RuleExistOrnot",
						type : "POST",
						data : {
							"title" : title, // 上传编号
						},
						success : function(data) {
							if(data){
								  $("#myModalUpdate").find('#ruleName').text("");					
							}else{
	
							    $("#myModalUpdate").find('#ruleName').text("已经存在");
								$("#myModalUpdate").find('#form-field-title').focus();
								$(".updateNotice").find('.btn-primary').disabled=true;
							}
						},
						error : function() {
						}
					});
				}
			});
		},
		addNotice : function() {
			var that = this;
			$(".addNotice").on('click','.btn-primary',function() {

						var title = $(this).parents('.modal-content').find('#form-field-titleadd').val();
						if(title==""){
							$("#myModalAdd").find('#ruleName').text("标题不允许为空");
							return false;
						}else if(title.split(" ").length != 1){
							$("#myModalAdd").find('#ruleName').text("不能包含空格");
							  return false;
						}else{
							arr1 = getContent();						
							$.ajax({
								url : "/addRegulation",
								type : "POST",
								data : "title=" + title + "&content=" + arr1,
								success : function(data) {
									if(data){
				                		   $('#myModalAdd').hide();
				                           $('.modal-backdrop').hide();
				                           location=location;// 页面刷新
										}else{
											    $("#myModalAdd").find('#ruleName').text("已经存在");
												$("#myModalAdd").find('#form-field-titleadd').focus();
												$(".addNotice").find('.btn-primary').disabled=true;
											}
								},
								error : function() {
								}
							});
						}//删除后要更新数据库，并且更新页面
					});

		},
		loadRole : function() {
			var that = this;
			$.ajax({
						url : '/queryAllRegulation',
						data : 'json',
						type : "post",
						success : function(data) {
							var nums = 5; //每页出现的数量
							var pages = Math.ceil(data.length / nums); //得到总页数
							var allPages = data.length;
							var thisDate = function(curr) {
								//此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
								var str = '', last = curr * nums - 1;
								last = last >= data.length ? (data.length - 1)
										: last;
								for (var i = (curr * nums - nums); i <= last; i++) {

									var title = data[i].title, id = data[i].id, createTime = data[i].createTime, content = data[i].content;

									str += '<tr class="role-tr">'
											+'<td class="title">'+ title+ '</td>'
											+'<td >'+ createTime+ '</td>'
											+ '<td>'
											+ '<div class="hidden-sm hidden-xs btn-group">'
											+ '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '修改'
											+ '</button>'
											+ '</div>'
											+ '</td>'
											+ '<td style="display: none;"><textarea class="content" >'+ content+ '</textarea></td>'
											+ '<td style="display: none;" class="titleid">'+ id + '</td>'
											+ '</tr>';
								}
								that.rights_allPage.text("显示" + nums + "条记录，共"+ allPages + "条");
								return str;
							};
							//调用分页
							laypage({
								cont : 'rights_page',//分页id
								pages : pages,
								jump : function(obj) { //容器id
									document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
								}
							});

						},

					});
		},
		queryNotice : function() {
			var that = this;
			$(".queryNotice").on('click','.btn-primary',function() {

				var title = $(this).parents('.modal-content').find('#form-field-title').val();
				if(title==""){
					$("#myModalQuery").find('#ruleName').text("标题不能为空");
				      $(this).parents('.modal-content').find('#form-field-title').focus();
				          return false;
				}else if(title.split(" ").length != 1){
					$("#myModalQuery").find('#ruleName').text("不能包含空格");
					  return false;
				}else{
								
					$.ajax({
						url : "/queryByRegulationTitle",
						type : "POST",
						data : "title=" + title,
						success : function(data) {
							$('#myModalQuery').hide();
							$('.modal-backdrop').hide();									
							var nums = 5; //每页出现的数量
							var pages = Math.ceil(data.length/ nums); //得到总页数
							var allPages = data.length;
							var thisDate = function(curr) {
								//此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
								var str = '', last = curr* nums - 1;
								last = last >= data.length ? (data.length - 1): last;
								for (var i = (curr * nums - nums); i <= last; i++) {

									var title = data[i].title, id = data[i].id, createTime = data[i].createTime, content = data[i].content;
									str += '<tr class="role-tr">'+'<td class="title">'+ title+ '</td>'
											+'<td >'+ createTime+ '</td>'
											+ '<td>'
											+ '<div class="hidden-sm hidden-xs btn-group">'
											+ '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '修改'
											+ '</button>'
											+ '</div>'
											+ '</td>'
											+ '<td style="display: none;"><textarea class="content" >'+ content+ '</textarea></td>'
											+ '<td style="display: none;" class="titleid">'+ id+ '</td>'
											+ '</tr>';
								}
								that.rights_allPage.text("显示" + nums+ "条记录，共"+ allPages+ "条");
								return str;
							};

							//调用分页
							laypage({
								cont : 'rights_page',//分页id
								pages : pages,
								jump : function(obj) { //容器id
									document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
								},
							});
						},
						error : function() {
						}
					});
				}//删除后要更新数据库，并且更新页面
			});

		},
		updateNotice : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update',function() {
				var title = $(this).parents('.role-tr').find('.title').html();
				var content = $(this).parents('.role-tr').find('.content').html();
				var status = $(this).parents('.role-tr').find('.status').html();
				var id = $(this).parents('.role-tr').find('.titleid').html();
				$('.updatenotice').find('#form-field-title').val(title);
				var content1 = content.replace("\\\"", "\"").replace(/&lt;/g, "<").replace(/&gt;/g,">");
				insertHtml(content1);
				$('.updatenotice').find('#ruleid').val(id);
			});
			$(".updateNotice").on('click','.btn-primary',function() {

					var title = $('.updatenotice').find('#form-field-title').val();						
					var content = getContent1();
					var titleid = $('.updatenotice').find('#ruleid').val();
					if(title==""){
						$("#myModalAdd").find('#ruleName').text("不能为空");
					          return false;
					}else if(title.split(" ").length != 1){
						 $("#myModalAdd").find('#ruleName').text("不能包含空格");
						  return false;
					}else{
						$.ajax({
							url : "/updateRegulation",
							type : "post",
							data : "title=" + title + "&content=" + content+ "&id=" + titleid,
							success : function(data) {
								if(data){		                    		 
		                    		  $('#myModalUpdate').hide();
		                              $('.modal-backdrop').hide();
		                              location=location;// 页面刷新
									}else{
										 $("#myModalAdd").find('#ruleName').text("已经存在");
										 $("#myModalAdd").find('#form-field-title').focus();
										 $(".updateNotice").find('.btn-primary').disabled=true;
									}	
							},
							error : function() {
							}
						});
					}
			});
		}
	};

	noticeManage.init();
});