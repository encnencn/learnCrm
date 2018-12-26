/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var departmentManager = {
		departmentManager : $("#role-manage-role table tbody"),
		init : function() {
			this.loadDepartment();
			this.deleteDepartment();// 删除分公司
			this.addDepartmentView();// 添加客户展示
			this.addDepartmentSubmit(); // 添加客户提交
			this.updateDepartmentSubmit();// 修改提交用户
			this.updateDepartmentView();// 修改展示用户
			this.searchDepartment();// 查询用户
			this.departmentadd();
			this.departmentUpdate();
			// this.modalclose();//点击关闭刷新页面

		},
		rights_allPage : $("#rights_allPage"),
		departmentadd:function(){
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
					url : "/departmentExistOrnot",
					type : "POST",
					data : {
						"name" : name, // 上传编号
					},
					success : function(data) {
						if(data){
							  $("#myModal1").find('#departmentName').text("");
						}else{
						
						    $("#myModal1").find('#departmentName').text("已经存在");
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
		departmentUpdate:function(){
			var that = this;
			$("#myModal2").on('input', '#form-field-1', function() {
				var name=$("#myModal2").find('#form-field-1').val();
				if(name==""){
					   $("#myModal2").find('#departmentName').text("不能为空");
					   $("#myModal2").find('#form-field-1').focus();
				}else if(name.split(" ").length != 1){
				   $("#myModal2").find('#departmentName').text("不能包含空格");
				   $("#myModal2").find('#form-field-1').focus();
				return false;
				}else{
				$.ajax({
					url : "/departmentExistOrnot",
					type : "POST",
					data : {
						"name" : name, // 上传编号
					},
					success : function(data) {
						if(data){
							  $("#myModal2").find('#departmentName').text("");					
						}else{

						    $("#myModal2").find('#departmentName').text("已经存在");
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
		
		loadDepartment : function() {
			var that = this;
			$
					.ajax({
						url : '/departmentList',
						dataType : 'json',
						type : "post",
						success : function(data) {
							// alert("从后台传过来data:"+JSON.stringify(data));
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
											+ departmentName
											+ '</td>'
											+ '<td class="cus-name">'
											+ (address == undefined ? " "
													: address)
											+ '</td>'
											+ '<td class="cus-menuCode">'
											+ (tel == undefined ? " "
													: tel)
											+ '</td>'
											+ '<td class="cus-fatherName">'
											+ (name == undefined ? " "
													: name)
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
						url : "/deleteDepartment",
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

		// 查询分公司
		searchDepartment : function() {
			var that = this;
			$(".modal-footer-search")
					.on(
							'click',
							'.btn-customer-search',
							function() {

								var departmentname = $(this).parents('.modal-content-search').find(
										'#form-field-1').val();
								
								if(departmentname==""){
						               $(this).parents('.modal-content-search').find('#form-field-1').focus();
						                       return false;
						            }
								$.ajax({
											url : "/searchDepartment",
											dataType : 'json',
											type : "POST",
											data : {
												"departmentname" : departmentname,
											},
											success : function(data) {

												$('#myModal3').hide();
												$('.modal-backdrop').hide();

												// alert("从后台传过来data:"+JSON.stringify(data));
												var nums = 10; // 每页出现的数量
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
														departmentName = data[i].departmentName,
														address = data[i].address,
														tel = data[i].tel,
														name = data[i].name;

														str += '<tr class="role-tr">'
															+ '<td class="cus-id">'
															+ id
															+ '</td>'
															+ '<td class="cus-name">'
															+ departmentName
															+ '</td>'
															+ '<td class="cus-name">'
															+ (address == undefined ? " "
																	: address)
															+ '</td>'
															+ '<td class="cus-menuCode">'
															+ (tel == undefined ? " "
																	: tel)
															+ '</td>'
															+ '<td class="cus-fatherName">'
															+ (name == undefined ? " "
																	: name)
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
							});
		},

		// 点击修改展示分公司

		updateDepartmentView : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update-view',function() {
								
								// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
								var id = $(this).parents('.role-tr').find(
										'.cus-id').text();

								$.ajax({
											url : "/selectAllArea",
											type : "POST",
											dataType : 'json',
											success : function(data){
												 testJson=data;
												var str = '';
												for (var i = 0; i < testJson.length; i++) {
													str += "<option value='"
															+ testJson[i].id
															+ "'>"
															+ testJson[i].name
															+ '</option>';
												}
												$(".allarea").html(str);

											},
											error : function() {
											}
										});

								$.ajax({
											url : "/updateDepartmentView",
											dataType : 'json',
											type : "POST",
											data : {
												"id" : id,
											},// 上传编号
											success : function(data) {

												$('.modal-content-update')
														.find('#form-field-0')
														.val(data.id);
												$('.modal-content-update')
														.find('#form-field-1')
														.val(data.departmentName);
												$('.modal-content-update')
														.find('#form-field-2')
														.val(data.address);
												$('.modal-content-update')
														.find('#form-field-3')
														.val(data.tel);
												$('.modal-content-update')
														.find('#form-field-4')
														.val(data.areaId);
												
											},
											error : function() {
											}
										});
							});
		},

		// 修改角色后提交
		updateDepartmentSubmit : function() {
			var that = this;
			$(".modal-footer-customer-update").on('click','.btn-customer-update',function() {

						var id = $(this).parents('.modal-content').find(
								'#form-field-0').val();
						departmentname = $(this).parents('.modal-content').find(
								'#form-field-1').val();
						address = $(this).parents('.modal-content').find(
								'#form-field-2').val();
						tel = $(this).parents('.modal-content').find(
								'#form-field-3').val();
						areaId = $(this).parents('.modal-content').find(
								'#form-field-4').val();
						testTel=/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
						if(departmentname==""){
							   $("#myModal3").find('#departmentName').text("不能为空");
							   $("#myModal3").find('#form-field-1').focus();
						}else if(departmentname.split(" ").length != 1){
						   $("#myModal3").find('#departmentName').text("不能包含空格");
						   $("#myModal3").find('#form-field-1').focus();
						return false;
						}else if (address == "") {
							$(this).parents('.modal-content').find(
									'#form-field-2').focus();
							return false;
						} else if (tel == "") {
							$(this).parents('.modal-content').find(
									'#form-field-3').focus();
							return false;
						} else if (areaId == "") {
							$(this).parents('.modal-content').find(
									'#form-field-4').focus();
							return false;
						}else if(!testTel.exec(tel)){
							$(this).parents('.modal-content').find('#form-field-3').focus();
							$("#myModal2").find('#aaa').html("格式不正确");
							
							return false;
						}else{
							$("#myModal2").find('#aaa').html("");
						} ;
						
						jsonDate = {
							"id" : id,// 0
							"departmentName" : departmentname,// 1
							"address" : address,// 2
							"tel" : tel,// 3
							"areaId" : areaId,// 4
							
						};

						for ( var key in jsonDate) {
							if (jsonDate[key] == "") {
								delete jsonDate[key];
							}
						}
						// alert(JSON.stringify(jsonDate));

						$.ajax({
							url : "/updateDepartmentSubmit",
							type : "POST",
							data : jsonDate,
							success : function(data) {
								if(data){
									$('#myModal2').hide();
									$('.modal-backdrop').hide();
									// customerManager.init();
									location = location;// 页面刷新
									areaManger.displayAllArea();
								}else{
									 $("#myModal2").find('#departmentName').text("已经存在");
										$("#myModal2").find('#form-field-1').focus();
										$(".modal-footer-customer-update").find('.btn-customer-update').disabled=true;
								}	
//									$('#myModal2').hide();
//									$('.modal-backdrop').hide();
//									// customerManager.init();
//									location = location;// 页面刷新
//									departmentManager.loadDepartment();
							},
							error : function() {
							}
						});
						// 删除后要更新数据库，并且更新页面
					});
		},
		/*// 点击关闭后刷新页面
		modalclose : function() {
			var that = this;
			$(".modal-content-update").on('click', '.modal-close', function() {

				location.reload();
			});
		},*/

		// 添加分公司信息前填充区域下拉列表
		addDepartmentView : function() {
			var that = this;
			$(".modal-top-customer-addView").on('click','.btn-success-addView',function() {

						$.ajax({
							url : "/selectAllArea",
							type : "POST",
							dataType : 'json',
							success : function(data) {
								testJson=data;
								
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

				var departmentName = $("#myModal1").find('#form-field-1').val();
					address = $(this).parents('.modal-content').find('#form-field-2').val();
					tel = $(this).parents('.modal-content').find('#form-field-3').val();
					areaId = $(this).parents('.modal-content').find('#form-field-4').val();
					testTel=/^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/ ;
					if(departmentName==""){
						   $("#myModal1").find('#departmentName').text("不能为空");
						   $("#myModal1").find('#form-field-1').focus();
						   return false;
					}else if(departmentName.split(" ").length != 1){
					   $("#myModal1").find('#departmentName').text("不能包含空格");
					   $("#myModal1").find('#form-field-1').focus();
					return false;
					}else if (address == "") {
							$(this).parents('.modal-content').find('#form-field-2').focus();
							return false;
						} else if (tel == "") {
							$(this).parents('.modal-content').find('#form-field-3').focus();
							return false;
						} else if (areaId == "") {
							$(this).parents('.modal-content').find('#form-field-4').focus();
							return false;
						}else if(!testTel.exec(tel)){
							$(this).parents('.modal-content').find('#form-field-3').focus();
							$("#myModal1").find('#aaa').html("格式不正确");
							
							return false;
						}else{
							$("#myModal1").find('#aaa').html("");
						} ;
						
						jsonDate = {
							"departmentName" : departmentName,// 1
							"address" : address,// 2
							"tel" : tel,// 3
							"areaId" : areaId,// 4
						};
						
						for ( var key in jsonDate) {
							if (jsonDate[key] == "") {
								delete jsonDate[key];
							}
						}
						// alert(JSON.stringify(jsonDate));

						$.ajax({
							url : "/addDepartmentSubmit",
							type : "POST",
							data : jsonDate,
							success : function(data) {
								if(data){
									location = location;// 页面刷新
									departmentManager.loadDepartment();
									}else{
									    $("#myModal1").find('#departmentName').text("已经存在");
										$("#myModal1").find('#form-field-1').focus();
										$(".modal-footer-customer-add").find('.btn-customer-add').disabled=true;
									}
//									$('#myModal1').hide();
//									$('.modal-backdrop').hide();
//									//customerManager.init();
//									location = location;//页面刷新
//									departmentManager.loadDepartment();
								
							},
							error : function() {
							}
						});

					});
		},



	};
	departmentManager.init();

});