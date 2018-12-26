/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var areaManger = {
			areaManger : $("#role-manage-role table tbody"),
		init : function() {
			this.displayAllArea();
			this.deleteDepartment();// 删除分公司
			this.addDepartmentView();// 添加客户展示
			this.addDepartmentSubmit(); // 添加客户提交
			this.updateDepartmentSubmit();// 修改提交用户
			this.updateDepartmentView();// 修改展示用户
			this.searchDepartment();// 查询用户
			this.quytuadd();
			this.quytuUpdate();
			// this.modalclose();//点击关闭刷新页面

		},
		rights_allPage : $("#rights_allPage"),
		quytuadd:function(){
			var that = this;
			$("#myModal1").on('input', '#form-field-1', function() {
				var name=$("#myModal1").find('#form-field-1').val();
				if(name==""){
					   $("#myModal1").find('#quyuName').text("不能为空");
					   $("#myModal1").find('#form-field-1').focus();
				}else if(name.split(" ").length != 1){
				　   $("#myModal1").find('#quyuName').text("不能包含空格");
				   $("#myModal1").find('#form-field-1').focus();
				　　return false;
				}else{
				$.ajax({
					url : "/quyuNameExistOrnot",
					type : "POST",
					data : {
						"name" : name, // 上传编号
					},
					success : function(data) {
						if(data){
							  $("#myModal1").find('#quyuName').text("");

						}else{
						
						    $("#myModal1").find('#quyuName').text("已经存在");
							$("#myModal1").find('#form-field-1').focus();
							$(".modal-footer-customer-add").find('.btn-customer-add').disabled=true;
						}
					},
					error : function() {
					}
				});
				}
			});
		},
		quytuUpdate:function(){
			var that = this;
			$("#myModal2").on('input', '#form-field-1', function() {
				var name=$("#myModal2").find('#form-field-1').val();
				if(name==""){
					   $("#myModal2").find('#quyuName').text("不能为空");
					   $("#myModal2").find('#form-field-1').focus();
				}else if(name.split(" ").length != 1){
				　   $("#myModal2").find('#quyuName').text("不能包含空格");
				   $("#myModal2").find('#form-field-1').focus();
				　　return false;
				}else{
				$.ajax({
					url : "/quyuNameExistOrnot",
					type : "POST",
					data : {
						"name" : name, // 上传编号
					},
					success : function(data) {
						if(data){
							  $("#myModal2").find('#quyuName').text("");					
						}else{
						    $("#myModal2").find('#quyuName').text("已经存在");
							$("#myModal2").find('#form-field-1').focus();
							$(".modal-footer-customer-update").find('.btn-customer-update').disabled=true;
						}
					},
					error : function() {
					}
				});
				}
			});
		},
		displayAllArea : function() {
			var that = this;
			$.ajax({
						url : '/queryAllArea',
						dataType : 'json',
						type : "post",
						success : function(data) {

							var nums = 10; // 每页出现的数量
							var pages = Math.ceil(data.length / nums); // 得到总页数
							var allPages = data.length;
							var thisDate = function(curr) {
								// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
								var str = '', last = curr * nums - 1;
								last = last >= data.length ? (data.length - 1)
										: last;
								for (var i = (curr * nums - nums); i <= last; i++) {

									var id = data[i].id,
									departmentName = data[i].departmentName,
									address = data[i].address, 
									tel = data[i].tel,
									name = data[i].name;

									str += '<tr class="role-tr">'
											+ '<td class="cus-id">'
											+ id
											+ '</td>'
											+ '<td class="cus-name">'
											+ name
											+ '</td>'
											+ '<td>'
											+ '<div class="hidden-sm hidden-xs btn-group">'

											+ '<button class="btn btn-xs btn-info btn-update-view" data-toggle="modal" data-target="#myModal2">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '修改'
											+ '</button>'
											+ '<button class="btn btn-xs btn-danger btn-delete">'
											+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
											+ '删除' + '</button>'

											+ '</div>' + '</td>'

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

		// 删除分公司
		deleteDepartment : function() {
			var that = this;
			$("#role-manage-role").on('click', '.btn-delete', function() {
				// 要删除的索引 删除DOM树

				var id = $(this).parents('.role-tr').find('.cus-id').text();

				if (confirm('确定要删除么')) {
					$(this).parents('.role-tr').remove();
					$.ajax({
						url : "/deleteArea",
						type : "POST",
						data : {
							"id" : id, // 上传编号
						},
						success : function() {
							// customerManager.init();
							location = location;// 页面刷新
							departmentManager.loadDepartment();
						},
						error : function() {
						}
					});

				}
			});
		},

		// 查询区域
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
															+ '<td>'
															+ '<div class="hidden-sm hidden-xs btn-group">'

															+ '<button class="btn btn-xs btn-info btn-update-view" data-toggle="modal" data-target="#myModal2">'
															+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
															+ '修改'
															+ '</button>'
															+ '<button class="btn btn-xs btn-danger btn-delete">'
															+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
															+ '删除' + '</button>'

															+ '</div>' + '</td>'

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

		// 修改区域

		updateDepartmentView : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update-view',function() {
								// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
					var id = $(this).parents('.role-tr').find('.cus-id').text();
						name=$(this).parents('.role-tr').find('.cus-name').text();
						$('.modal-content-update').find('#form-field-0').val(id);
						$('.modal-content-update').find('#form-field-1').val(name);						
			});
		},

		// 修改角色后提交
		updateDepartmentSubmit : function() {
			var that = this;
//			var name=$("#myModal2").find('#form-field-1').val();
			$(".modal-footer-customer-update").on('click','.btn-customer-update',function() {
					var id = $(this).parents('.modal-content').find('#form-field-0').val(),
						areaName = $(this).parents('.modal-content').find('#form-field-1').val();
					if(areaName==""){
						   $("#myModal2").find('#quyuName').text("不能为空");
						   $("#myModal2").find('#form-field-1').focus();
					}else if(areaName.split(" ").length != 1){
					　   $("#myModal2").find('#quyuName').text("不能包含空格");
					   $("#myModal2").find('#form-field-1').focus();
					　　return false;
					}else{
						$.ajax({
							url : "/updateAreaSubmit",
							type : "POST",
							dataType : 'json',
							data : {
								"id" : id,// 0
								"areaName" : areaName,// 1
							},
							success : function(data) {
								if(data){
									$('#myModal2').hide();
									$('.modal-backdrop').hide();
									// customerManager.init();
									location = location;// 页面刷新
									areaManger.displayAllArea();
								}else{
									 $("#myModal2").find('#quyuName').text("已经存在");
										$("#myModal2").find('#form-field-1').focus();
										$(".modal-footer-customer-update").find('.btn-customer-update').disabled=true;
								}	
								},
							error : function() {
							}
						});
					
					}// 删除后要更新数据库，并且更新页面
					});
		},

		addDepartmentView : function() {
			var that = this;
			$(".modal-top-customer-addView").on('click','.btn-success-addView',function() {

						$.ajax({
							url : "/selectAllArea",
							type : "POST",
							data : 'json',
							success : function(data) {
								testJson = $.parseJSON(data);
								var str = '';
								for (var i = 0; i < testJson.length; i++) {
									str += "<option value='" + testJson[i].id
											+ "'>" + testJson[i].name + '</option>';
								}
								$(".allarea").html(str);
							},
							error : function() {
							}
						});
						// 删除后要更新数据库，并且更新页面
					});
		},

		// 添加分公司提交
		addDepartmentSubmit : function() {
			var that = this;
			$(".modal-footer-customer-add").on('click','.btn-customer-add',function() {
						var name = $(this).parents('.modal-content').find('#form-field-1').val();
						if(name==""){
							   $("#myModal1").find('#quyuName').text("不能为空");
							   $("#myModal1").find('#form-field-1').focus();
						}else if(name.split(" ").length != 1){
						　   $("#myModal1").find('#quyuName').text("不能包含空格");
						   $("#myModal1").find('#form-field-1').focus();
						　　return false;
						}else{
						$.ajax({
							url : "/saveArea",
							type : "POST",
							data : {
								"name" : name, // 上传编号
							},
							success : function(data) {
								if(data){
								location = location;// 页面刷新
								departmentManager.loadDepartment();
								}else{
								    $("#myModal1").find('#quyuName').text("已经存在");
									$("#myModal1").find('#form-field-1').focus();
									$(".modal-footer-customer-add").find('.btn-customer-add').disabled=true;
								}
							},
							error : function() {
							}
						});
						}
					});
		},



	};
	areaManger.init();

});