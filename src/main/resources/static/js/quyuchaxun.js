/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var departmentManager = {
		departmentManager : $("#role-manage-role table tbody"),
		init : function() {
			this.loadArea();
			
			this.searchDepartment();// 查询分公司
			// this.modalclose();//点击关闭刷新页面

		},
		rights_allPage : $("#rights_allPage"),
		loadArea : function() {
			var that = this;
					$.ajax({
						url : '/queryAllArea',
						dataType : 'json',
						type : "post",
						success : function(data) {
							// alert("从后台传过来data:"+JSON.stringify(data));
							var nums = 5; // 每页出现的数量
							var pages = Math.ceil(data.length / nums); // 得到总页数
							var allPages = data.length;
							var thisDate = function(curr) {
								// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
								var str = '', last = curr * nums - 1;
								last = last >= data.length ? (data.length - 1)
										: last;
								for (var i = (curr * nums - nums); i <= last; i++) {

									var id = data[i].id,
									name = data[i].name;
									str += '<tr class="role-tr">'
											+ '<td class="cus-id">'
											+ id
											+ '</td>'
											+ '<td class="cus-name">'
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

		

		// 查询分公司
		searchDepartment : function() {
			var that = this;
			$(".modal-footer-search").on('click','.btn-customer-search',function() {
				var areaName = $(this).parents('.modal-content-search').find('#form-field-1').val();
				if(areaName==""){
					   $("#myModal3").find('#quyuName').text("不能为空");
					   $("#myModal3").find('#form-field-1').focus();
				}else if(areaName.split(" ").length != 1){
				　   $("#myModal3").find('#quyuName').text("不能包含空格");
				   $("#myModal3").find('#form-field-1').focus();
				　　return false;
				}else{
								$.ajax({
											url : "/queryByAreaName",
											dataType : 'json',
											type : "POST",
											data : {
												"areaName" : areaName,
											},
											success : function(data) {

												$('#myModal3').hide();
												$('.modal-backdrop').hide();

												// alert("从后台传过来data:"+JSON.stringify(data));
												var nums = 5; // 每页出现的数量
												var pages = Math
														.ceil(data.length
																/ nums); // 得到总页数
												var allPages = data.length;
												var thisDate = function(curr) {
													// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
													var str = '', last = curr
															* nums - 1;
													last = last >= data.length ? (data.length - 1)
															: last;
													for (var i = (curr * nums - nums); i <= last; i++) {

														var id = data[i].id, 
													
														name = data[i].name;

														str += '<tr class="role-tr">'
															+ '<td class="cus-id">'
															+ id
															+ '</td>'
															+ '<td class="cus-name">'
															+ name
															+ '</td>'
															/*+ '<td>'
															+ '<div class="hidden-sm hidden-xs btn-group">'

															+ '<button class="btn btn-xs btn-info btn-update-view" data-toggle="modal" data-target="#myModal2">'
															+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
															+ '修改'
															+ '</button>'
															+ '<button class="btn btn-xs btn-danger btn-delete">'
															+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
															+ '删除' + '</button>'

															+ '</div>' + '</td>'*/

															+ '</tr>';
													}
													that.rights_allPage
															.text("显示" + nums
																	+ "条记录，共"
																	+ allPages
																	+ "条");
													return str;
												};

												// 调用分页
												laypage({
													cont : 'rights_page',// 分页id
													pages : pages,
													jump : function(obj) { // 容器id
														document
																.getElementById('rights_list').innerHTML = thisDate(obj.curr);
													}
												});

											},
											error : function() {
											}
										});
				}
							});
		},




	};
	departmentManager.init();

});