/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var roleManage = {
		roleManage : $("#role-manage-role table tbody"),
		init : function() {
			this.loadRole();
			this.searchRole();//查询角色
			
		},
		rights_allPage : $("#rights_allPage"),
		loadRole : function() {
			var that = this;
			$
					.ajax({
						url : '/roleList',
						dataType : 'json',
						type : "GET",
						success : function(data) {
							var nums = 5; // 每页出现的数量
							var pages = Math.ceil(data.length / nums); // 得到总页数
							var allPages = data.length;
							var thisDate = function(curr) {
								// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
								var str = '', last = curr * nums - 1;
								last = last >= data.length ? (data.length - 1)
										: last;
								for (var i = (curr * nums - nums); i <= last; i++) {
									var id = data[i].id, name = data[i].name, detail = data[i].detail;
									str += '<tr class="role-tr">'
											+ '<td class="rol-num">'
											+ id
											+ '</td>'
											+ '<td class="rol-name">'
											+ name
											+ '</td>'
											+ '</tr>';
								}
								that.rights_allPage.text("显示" + nums + "条记录，共"
										+ allPages + "条");
								return str;
							};

							// 调用分页
							laypage({
								cont : 'rights_page',// 分页id
								pages : pages,
								jump : function(obj) { // 容器id
									document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
								}
							});
						},
						error : function() {
						}
					})

		},
	
		//查询角色
		searchRole : function() {
			var that = this;
			$(".modal-footer").on(
					'click',
					'.btn-primary-search',
					function() {

						var rolename = $(this).parents('.modal-content').find(
								'#form-field-1').val();
						if(rolename==""){
				               $(this).parents('.modal-content').find('#form-field-1').focus();
				                       return false;
				            }
						$.ajax({
							url : "/roleListByName",
							type : "POST",
							dataType : 'json',
							data : {
								"name" : rolename,
							},
							success : function(data) {
								$('#myModal4').hide();
								$('.modal-backdrop').hide();
								
								
								var nums = 5; // 每页出现的数量
								var pages = Math.ceil(data.length / nums); // 得到总页数
								var allPages = data.length;
								var thisDate = function(curr) {
									// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
									var str = '', last = curr * nums - 1;
									last = last >= data.length ? (data.length - 1)
											: last;
									for (var i = (curr * nums - nums); i <= last; i++) {
										var id = data[i].id, name = data[i].name, detail = data[i].detail;
										str += '<tr class="role-tr">'
											
												+ '<td class="rol-num">'
												+ id
												+ '</td>'
												+ '<td class="rol-name">'
												+ name
												+ '</td>'
												
												+ '</tr>';
									}
									that.rights_allPage.text("显示" + nums + "条记录，共"
											+ allPages + "条");
									return str;
								};

								// 调用分页
								laypage({
									cont : 'rights_page',// 分页id
									pages : pages,
									jump : function(obj) { // 容器id
										document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
									}
								});
								
							},
							error : function() {
								
							}
						});
						//删除后要更新数据库，并且更新页面
					});
		},
		
	


	};
	roleManage.init();

});