/**
 * Created by mingjie on 2016/12/26.
 */
$(document).ready(function() {
					var collapseList = {
						init : function() {
							this.createSidebar();
						},
						/*产生菜单栏、产生左上角个人信息*/
						sidebarBox : $(".nav-side-menu"),
						createSidebar : function() {
							var that = this,
							 sidebarHtml = "";
							//产生左边菜单栏
							$.ajax({
										type : "GET",
										url : "/permission",
										dataType : "JSON",
										success : function(data) {
											  //alert(JSON.stringify(data));
											for (key in data) {
												sidebarHtml += '<li>'
							                        +'<a href="#"><i class="fa '+data[key].icon+'"></i> ' 
							                        +'<span class="nav-label">'
							                        + data[key].title
							                        +'</span>'
							                        +'<span class="fa arrow"></span></a>'
													+'<ul class="nav nav-second-level" collapse in" aria-expanded="false">';	
												for (key2 in data[key].list) {
													sidebarHtml +='<li><a class="J_menuItem" href="'
														+ data[key].list[key2]
														+ '"   >'
														+ key2
														+'</a>'
														+'</li>';
												}
												sidebarHtml += '</ul>'
														+ '</li>';
											}
											that.sidebarBox.append(sidebarHtml);
											//按顺序调用页面上的js
											spg();
											spb();
											spc();
											spd();
											spe();
											spf();
											spa();
											
										},
										error : function() {
										}
									});
							
							
							$.ajax({
								type : "GET",
								url : "/adminInfo",
								dataType : "JSON",
								success : function(data) {
								//alert(JSON.stringify(data));
								$('.adminName').html(data.trueName);
								$('.adminRoleName').html(data.rolename);
								},
								error : function() {
								}
							});
						},
						
						
						
						
					};
					collapseList.init();
				});

//修改密码事件
$(function() {
	var roleManage = {
		init : function() {
			this.oldPasswordSubmit(); // 原密码输入触发提交事件
			this.newPasswordSubmit(); // 新密码输入后提交
			this.loggingOut();	//安全退出
			this.refresh(); //子页面刷新
		},
		// 子页面刷新
		refresh : function() {
			
				$('body').on('click', '#refresh',function(){
					location.reload();
				})
			
		},
		
		// 安全退出
		loggingOut : function() {
			var that = this;

			$("body").on('click','#anquantuichu',function() {
						
						$.ajax({
							url : "/loggingOut",
							type : "POST",
							 dataType : 'json',
							data : {
								//返回主页,无返回值
							},
							success : function(data) {
								
							},
							error : function() {

							}
						});
						// 删除后要更新数据库，并且更新页面
					});
		},
		
		// 输入旧密码后检验
		oldPasswordSubmit : function() {
			var that = this;

			$("body").on(
					'blur',
					'#form-field-oldps',
					function() {
						//alert("blur事件");
						var oldpassword = $(this).parents('.modal-content')
								.find('#form-field-oldps').val();
						var passwordInfoMD5 = hex_md5(oldpassword);
						$.ajax({
							url : "/oldPasswordSubmit",
							type : "POST",
							// dataType : 'json',
							data : {
								"oldpassword" : passwordInfoMD5,
							},
							success : function(data) {
								if (data) {
									$('.roleNameHasBeen1').attr("style","color:green");
									$('.roleNameHasBeen1').html("输入正确");
									
									$('.btn-ps-submit').attr("disabled", false);
								} else {
									$('.roleNameHasBeen1').attr("style","color:red");
									$('.roleNameHasBeen1').html("输入密码错误！");
									$('.btn-ps-submit').attr("disabled", true);
								}
							},
							error : function() {

							}
						});
						// 删除后要更新数据库，并且更新页面
					});
		},
		// 第二次输入新密码后检验
		newPasswordSubmit : function() {
			var that = this;

			$("body").on(
					'blur',
					'#form-field-newps2',
					function() {
						
						var newpassword1 = $(this).parents('.modal-content')
								.find('#form-field-newps1').val();
						var newpassword2 = $(this).parents('.modal-content')
								.find('#form-field-newps2').val();
						if (newpassword1 == newpassword2) {
							$('.roleNameHasBeen3').html("");
						} else {
							$('.roleNameHasBeen3').html("两次输入不一致！");

						}
					});

			// 输入新密码后提交
			$("body").on(
					'click',
					'.btn-ps-submit',
					function() {
						
						
						var oldpassword = $(this).parents('.modal-content')
								.find('#form-field-oldps').val();

						var newpassword1 = $(this).parents('.modal-content')
								.find('#form-field-newps1').val();

						var newpassword2 = $(this).parents('.modal-content')
								.find('#form-field-newps2').val();

						if (oldpassword == "") {
							$(this).parents('.modal-content').find(
									'#form-field-oldps').focus();
							return false;
						} else if (newpassword1 == "") {
							$(this).parents('.modal-content').find(
									'#form-field-newps1').focus();
							return false;
						} else if (newpassword2 == "") {
							$(this).parents('.modal-content').find(
									'#form-field-newps2').focus();
							return false;
						} else if (newpassword1 != newpassword2) {
							$(this).parents('.modal-content').find(
									'#form-field-newps2').focus();
							return false;
						}	
						
						var passwordInfoMD5 = hex_md5(newpassword2);
						$.ajax({
							url : "/newPasswordSubmit",
							type : "POST",
							// dataType : 'json',
							data : {
								"newpassword" : passwordInfoMD5,
							},
							success : function(data) {

								$('#myModal10').hide();
								$('.modal-backdrop').hide();
								location = "../login.html";// 页面刷新

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
