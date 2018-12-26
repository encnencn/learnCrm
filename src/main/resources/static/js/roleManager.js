/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var roleManage = {
		roleManage : $("#role-manage-role table tbody"),
		init : function() {
			this.loadRole();
			this.deleteRole();// 删除角色
			this.addRole(); // 添加角色
			this.updatePrimaryView();// 权限分配
			this.updateRoleSubmit();// 修改提交角色
			this.updateViewRole();// 修改展示角色
			this.updatePrimarySubmit();// 修改权限提交
			this.searchRole();//查询角色
			this.checkRoleName_add();//添加角色，校验角色名是否存在
			this.checkRoleName_update();//修改角色，校验角色名是否存在
		},
		rights_allPage : $("#rights_allPage"),
		loadRole : function() {
			var that = this;
			$.ajax({
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
											+ '<td>'
											+ '<div class="hidden-sm hidden-xs btn-group">'
											+ '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModal3">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '修改'
											+ '</button>'
											+ '<button class="btn btn-xs btn-danger btn-delete">'
											+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
											+ '删除'
											+ '</button>'
											+ '</div>'
											+ '</td>'
											+ '<td>'
											+ '<button type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal2" >'
											+ '<i class="ace-icon fa fa-key bigger-120"></i>'
											+ '分配功能'
											+ '</button>'
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
		//添加角色名时候校验角色名
        rights_allPage:$("#rights_allPage"),
        checkRoleName_add:function(){
        	
        	 var that = this;
             $("#myModal1").on('input', '#form-field-1', function() {
               var roleName = $(this).parents('.modal-content').find('#form-field-1').val();
               
           	//如果输入框为空或者包含空格,报错
        	   if(roleName==""||(roleName.indexOf(" ")!=-1)){
        		$('#add-name-true').hide();
               	$('#add-name-false').show();
               	$('.btn-primary-add').attr("disabled", true);
        		return false;
        	   }
               
                 $.ajax({
                   url : "/checkRoleName",
                   type : "POST",
                   data :  "name="+roleName,
                   success : function(data) {
                    if(data){
                    	$('#add-name-true').show();
                    	$('#add-name-false').hide();
                    	$('.btn-primary-add').attr("disabled", false);
                    }else{
                    	$('#add-name-true').hide();
                    	$('#add-name-false').show();
                    	$('.btn-primary-add').attr("disabled", true);
                    }
                   },
                   error : function() {
                   }
                 });
                 // 删除后要更新数据库，并且更新页面
             });
        }, 
		
      //修改角色时候校验角色名
        rights_allPage:$("#rights_allPage"),
        checkRoleName_update:function(){
        	
        	 var that = this;
             $("#myModal3").on('input', '#form-field-3', function() {
               var id = $(this).parents('.modal-content-update').find('#form-field-2').val(); 
               var roleName = $(this).parents('.modal-content-update').find('#form-field-3').val(); 
               
           	//如果输入框为空或者包含空格,报错
        	   if(roleName==""||(roleName.indexOf(" ")!=-1)){
        		$('#update-name-true').hide();
               	$('#update-name-false').show();
               	$('.btn-update-submit').attr("disabled", true);
        		return false;
        	   }
               
                 $.ajax({
                   url : "/checkRoleName",
                   type : "POST",
                   data :  "id="+id+"&name="+roleName,
                   success : function(data) {
                    if(data){
                    	$('#update-name-true').show();
                    	$('#update-name-false').hide();
                    	$('.btn-update-submit').attr("disabled", false);
                    }else{
                    	$('#update-name-true').hide();
                    	$('#update-name-false').show();
                    	$('.btn-update-submit').attr("disabled", true);
                    	
                    }
                   },
                   error : function() {
                   }
                 });
                 // 删除后要更新数据库，并且更新页面
             });
        }, 
		//查询角色
		searchRole : function() {
			var that = this;
			$("#btn_query").on('click',function() {

						var rolename = $('#query_roleName').val().replace(/(^\s*)|(\s*$)/g, "");
						if(rolename==""){
                            location = location;
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
												+ '<td>'
												+ '<div class="hidden-sm hidden-xs btn-group">'
												+ '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModal3">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '修改'
												+ '</button>'
												+ '<button class="btn btn-xs btn-danger btn-delete">'
												+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
												+ '删除'
												+ '</button>'
												+ '</div>'
												+ '</td>'
												+ '<td>'
												+ '<button type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal2" >'
												+ '<i class="ace-icon fa fa-key bigger-120"></i>'
												+ '分配功能'
												+ '</button>'
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
		
		
		// 权限管理，权限列表
		primaryBox : $(".form-group-primaryManager"),
		updatePrimaryView : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-primary',function() {
								var updatePrimaryViewHtml = "";
								// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
								var id = $(this).parents('.role-tr').find(
										'.rol-num').text();
								var name = $(this).parents('.role-tr').find(
										'.rol-name').text();
								$
										.ajax({
											url : "/updatePrimaryView",
											type : "POST",
											data : {
												"id" : id,
											},// 上传编号
											success : function(data) {
												 /*alert("从后台传过来data:"+JSON.stringify(data)); */
												updatePrimaryViewHtml += '<h6 class="modal-title" id="roleId" hidden="hidden">'
														+ id
														+ '</h6>'
														+ '<h6 class="modal-title" id="roleName">角色名称：'
														+ name
														+ '</h6>'
														+'<table class="table table-hover table-condensed table-bordered">'
														+ '<tr>'
										                + '<th><input   type="checkbox" id="selectAll" />父菜单</th>'
										                + '<th colspan="7">子菜单</th>'
										                +'</tr>'
													
												for (key in data) {
													updatePrimaryViewHtml +='<tr >'
										                 	+'<td ><input   type="checkbox"'
										                 	+'class="fatherMenu" name="checkbox"' 
										                 	+ data[key].checked
										                 	+ '  id="'
															+ data[key].id
															+ '  " value="'
															+ data[key].id
															+'" /><b>'
															+ data[key].FatherMenuName
															+'</b></td>'
															
													for (key2 in data[key].sonMenuList) {

														updatePrimaryViewHtml +='<td class="checkbox-group">'
																+ '<input type="checkbox" '
																+ data[key].sonMenuList[key2][1]
																+ '   id="'
																+ data[key].sonMenuList[key2][0]
																+ '"  value="'
																+ data[key].sonMenuList[key2][0]
																+ '"  class="sonMenu" name="checkbox"/>'
																+ key2
																+ '</td>';
													}
													updatePrimaryViewHtml += '</tr>';
												}
												updatePrimaryViewHtml += '</table>';
												that.primaryBox
														.html(updatePrimaryViewHtml);
												
											},
											
											error : function() {
											}
										});
								
							});
			
	
		},
		
		// 分配权限后提交
		updatePrimarySubmit : function() {
			var that = this;
			$(".update-primary-footer").on(
					'click',
					'.btn-primary-submit',
					function() {

						var roleid = $(this).parents('.update-primary-submit')
								.find('#roleId').text();

						var ids = "";
						$("[name='checkbox']").each(function() {
							if ($(this).prop("checked")) {
								ids += $(this).val() + ",";
							}
						});
						

						$.ajax({
							url : "/updateMenuSubmit",
							type : "POST",
							data : {
								"roleid" : roleid,
								"ids" : ids,
							},
							success : function() {
								$('#myModal2').hide();
								$('.modal-backdrop').hide();
								location = location;// 页面刷新
							},
							error : function() {
							}
						});
						// 删除后要更新数据库，并且更新页面

					});
		},



		deleteRole : function() {
			var that = this;
			$("#role-manage-role").on('click', '.btn-delete', function() {
				// 要删除的索引 删除DOM树
				var key = $(this).parents('.role-tr').index();
				// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
				var id = $(this).parents('.role-tr').find('.rol-num').text();

				if (confirm('确定要删除么')) {
					$(this).parents('.role-tr').remove();
					$.ajax({
						url : "/deleteRole",
						type : "POST",
						data : {
							"id" : id, // 上传编号
						},
						success : function() {
							location = location;// 页面刷新
						},
						error : function() {
						}
					});
					// 删除后要更新数据库，并且更新页面
					// some code
				}
			});
		},
		// 点击修改展示角色
		updateBox : $(".form-group-updateView"),
		updateViewRole : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update',function() {
								var updateViewRoleHtml = "";
								// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
								var id = $(this).parents('.role-tr').find(
										'.rol-num').text();
								var name = $(this).parents('.role-tr').find(
										'.rol-name').text();
								// 此处仅是展示把table上的信息展示到弹出框上，不需要ajax请求

								updateViewRoleHtml += '<label class="col-sm-3 control-label no-padding-right"'
										+ 'for="form-field-2" > 角色ID </label>'
										+ ' <div class="col-sm-9">'
										+ '<input type="text" id="form-field-2" value='
										+ id
										+ '	class="col-xs-10 col-sm-5" readonly="true">'
										+ '</div>'

										+ '<label class="col-sm-3 control-label no-padding-right"'
										+ '	for="form-field-3"> 角色名称 </label>'
										+ '<div class="col-sm-9">'
										+ '	<input type="text" id="form-field-3" value='
										+ name
										+ '		class="col-xs-10 col-sm-5">'
										+'<label  class="col-sm-5 control-label no-padding-left roleNameHasBeenUP" style="color:red;">'
										+'<a style="color:green;display:none"   id="update-name-true" >✔</a>'
										+'<a style="color:red;display:none"   id="update-name-false" >✘</a>'
										+'</label>'
										+ '</div>';

							
								that.updateBox.html(updateViewRoleHtml);
							

							});
		},

		// 修改角色后提交
		updateRoleSubmit : function() {
			var that = this;
			$(".modal-footer-update").on(
					'click',
					'.btn-update-submit',
					function() {

						var id = $(this).parents('.modal-content-update').find(
								'#form-field-2').val();
						var name = $(this).parents('.modal-content-update')
								.find('#form-field-3').val();
						if(name==""){
							 $(this).parents('.modal-content-update').find('#form-field-3').focus();
			            	   return false;
						}
						$.ajax({
							url : "/updateRoleSubmit",
							type : "POST",
							data : {
								"name" : name,
								"id" : id,
							},
							success : function(data) {
								if(data){
									$('#myModal1').hide();
									$('.modal-backdrop').hide();
									location = location;//页面刷新
								}else{
									$('.roleNameHasBeenUP').html("角色名已存在,或为空！");
								}
							},
							error : function(data) {
							}
						});
						//删除后要更新数据库，并且更新页面
					});
		},

		addRole : function() {
			var that = this;
			$(".modal-footer").on(
					'click',
					'.btn-primary-add',
					function() {

						var rolename = $(this).parents('.modal-content').find(
								'#form-field-1').val();
						if(rolename==""){
							 $(this).parents('.modal-content').find('#form-field-1').focus();
			            	   return false;
						}
						
						$.ajax({
							url : "/addRole",
							type : "POST",
							//dataType : 'json',
							data : {
								"rolename" : rolename,
							},
							success : function(data) {
								if(data){
									$('#myModal1').hide();
									$('.modal-backdrop').hide();
									location = location;//页面刷新
								}else{
									$('.roleNameHasBeen').html("角色名已存在,或为空！");
								}
								
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

