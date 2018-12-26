/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var customerManager = {
		customerManager : $("#role-manage-role table tbody"),
		init : function() {
			this.loadCustomer();
			this.detailCustomerView();//点击查看详情
			this.searchCustomer();//查询用户
			this.modalclose();//点击关闭刷新页面
			
		},
		rights_allPage : $("#rights_allPage"),
		loadCustomer : function() {
			var that = this;
			$.ajax({
						url : '/efficientList',
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
									var id = data[i].id, 
									customerName = data[i].customerName,
									customerCode = data[i].customerCode,
									linkPersonName = data[i].linkPersonName,
									status=data[i].status,
									truename = data[i].truename;
									createTime=data[i].createTime;
									
									commonTime=moment(new Date(createTime)).utc(8).format('YYYY-MM-DD HH:mm:ss');
									if(data[i].status==0){
										status="待核";
									}else if(data[i].status==1){
										status="已核";
									}else if(data[i].status==2){
										status="拒绝";
									};
									str += '<tr class="role-tr">'
											+ '<td class="cus-id">'
											+ id
											+ '</td>'
											+ '<td class="cus-customerName">'
											+ customerName
											+ '</td>'
											+ '<td class="cus-customerCode">'
											+ customerCode
											+ '</td>'
											+ '<td class="cus-linkPersonName">'
											+ linkPersonName
											+ '</td>'
											+ '<td class="cus-truename">'
											+ truename
											+ '</td>'
											+ '<td class="cus-time">'
											+ commonTime
											+ '</td>'
											+ '<td class="cus-status">'
											+ status
											+ '</td>'
											+ '<td>'
											+ '<div class="hidden-sm hidden-xs btn-group">'
											+ '<button class="btn btn-xs btn-info btn-detail-view" data-toggle="modal" data-target="#myModal4">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '详情'
											+ '</button>'
//											+ '<button class="btn btn-xs btn-info btn-rizhi" data-toggle="modal" data-target="#myModal6">'
//											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
//											+ '日志'
//											+ '</button>'
//											+ '<button class="btn btn-xs btn-info btn-yuebao" data-toggle="modal" data-target="#myModal5">'
//											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
//											+ '月报'
//											+ '</button>'
											+ '</div>'
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
		
		
		// 点击详情展示客户
		
		detailCustomerView : function() {
			
			var that = this;
			$("#role-manage-role").on('click','.btn-detail-view',function() {
				
								var updateCustomerViewHtml = "";
								// 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
								var id = $(this).parents('.role-tr').find('.cus-id').text();
								
								//此处不用查询真实姓名下拉列表
								$.ajax({
											url : "/updateCustomerView",
											dataType : 'json',
											type : "POST",
											data : {
												"customerid" : id,
											},// 上传编号
											success : function(data) {
											
												if("planDate" in data){
													  
													$('.modal-content-detail').find('#form-field-17').val(moment(new Date(data.planDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-detail').find('#form-field-17').val(data.planDate);
												};
												if("planDate" in data){
													
													$('.modal-content-detail').find('#form-field-18').val(moment(new Date(data.signDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-detail').find('#form-field-18').val(data.signDate);
												};
												if("planDate" in data){
													
													 $('.modal-content-detail').find('#form-field-19').val(moment(new Date(data.produceDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-detail').find('#form-field-19').val(data.produceDate);
												};
												if("planDate" in data){
													
													 $('.modal-content-detail').find('#form-field-20').val(moment(new Date(data.deviceArriveDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-detail').find('#form-field-20').val(data.deviceArriveDate);
												};
												
												if(data.budgetStatus==0){
													budgetStatus="不充足";
												}else if(data.budgetStatus==1){
													budgetStatus="充足";
												}else if(data.budgetStatus==2){
													budgetStatus="未拨款";
												}
												
												
												
												$('.modal-content-detail').find('#form-field-0').val(data.id);
												$('.modal-content-detail').find('#form-field-1').val(data.customerName);
												$('.modal-content-detail').find('#form-field-2').val(data.customerCode);
												$('.modal-content-detail').find('#form-field-3').val(data.district);
												$('.modal-content-detail').find('#form-field-4').val(data.linkPersonName);
												$('.modal-content-detail').find('#form-field-5').val(data.linkPersonDuty);
												$('.modal-content-detail').find('#form-field-6').val(data.tel);
												$('.modal-content-detail').find('#form-field-7').val(data.address);
												$('.modal-content-detail').find('#form-field-8').val(data.fax);
												$('.modal-content-detail').find('#form-field-9').val(data.email);
												$('.modal-content-detail').find('#form-field-10').val(data.compayUrl);
												$('.modal-content-detail').find('#form-field-11').val(data.product);
												$('.modal-content-detail').find('#form-field-12').val(data.equipment);
												$('.modal-content-detail').find('#form-field-13').val(data.technique);
												$('.modal-content-detail').find('#form-field-14').val(data.deviceProblem);
												$('.modal-content-detail').find('#form-field-15').val(data.requirement);
												$('.modal-content-detail').find('#form-field-16').val(data.features);
												
												$('.modal-content-detail').find('#form-field-21').val(data.budgetAmount);
												$('.modal-content-detail').find('#form-field-22').val(budgetStatus);
												$('.modal-content-detail').find('#form-field-23').val(data.modelName);
												$('.modal-content-detail').find('#form-field-24').val(data.num);
												$('.modal-content-detail').find('#form-field-25').val(data.otherDevice);
												$('.modal-content-detail').find('#form-field-26').val(data.workProcess);
												$('.modal-content-detail').find('#form-field-27').val(data.transport);
												$('.modal-content-detail').find('#form-field-28').val(data.clamp);
												$('.modal-content-detail').find('#form-field-29').val(data.cutter);
												$('.modal-content-detail').find('#form-field-30').val(data.drawing);
												$('.modal-content-detail').find('#form-field-31').val(data.sampleParts);
												$('.modal-content-detail').find('#form-field-32').val(data.scheme);
												$('.modal-content-detail').find('#form-field-33').val(data.takt);
												$('.modal-content-detail').find('#form-field-34').val(data.priceList);
												$('.modal-content-detail').find('#form-field-35').val(data.remark);
												$('.modal-content-detail').find('#form-field-36').val(data.expect);
												$('.modal-content-detail').find('#form-field-37').val(data.status);
												$('.modal-content-detail').find('#form-field-38').val(data.truename);
											
											},
											
											error : function() {
											}
										});
								
							});
			
	
		},

	
	
	
		//查询客户
		searchCustomer : function() {
			var that = this;
			$("#btn_query").on('click',function() {

						var customername = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");
						
						if(customername==""){
                            location = location;
                            return false;
				            }
						
						$.ajax({
							url : "/searchEfficientCustomer",
							dataType : 'json',
							type : "POST",
							data : {
								"customername" : customername,
							},
							success : function(data) {
								//alert("从后台传过来data:"+JSON.stringify(data));
								
								$('#myModal3').hide();
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
										var id = data[i].id, 
										customerName = data[i].customerName,
										customerCode = data[i].customerCode,
										linkPersonName = data[i].linkPersonName,
										status=data[i].status,
										truename = data[i].truename;
										createTime=data[i].createTime;
										
										commonTime=moment(new Date(createTime)).utc(8).format('YYYY-MM-DD HH:mm:ss');
										if(data[i].status==0){
											status="待核";
										}else if(data[i].status==1){
											status="已核";
										}else if(data[i].status==2){
											status="拒绝";
										};
										str += '<tr class="role-tr">'
												+ '<td class="cus-id">'
												+ id
												+ '</td>'
												+ '<td class="cus-customerName">'
												+ customerName
												+ '</td>'
												+ '<td class="cus-customerCode">'
												+ customerCode
												+ '</td>'
												+ '<td class="cus-linkPersonName">'
												+ linkPersonName
												+ '</td>'
												+ '<td class="cus-truename">'
												+ truename
												+ '</td>'
												+ '<td class="cus-time">'
												+ commonTime
												+ '</td>'
												+ '<td class="cus-status">'
												+ status
												+ '</td>'
												+ '<td>'
												+ '<div class="hidden-sm hidden-xs btn-group">'
												+ '<button class="btn btn-xs btn-info btn-detail-view" data-toggle="modal" data-target="#myModal4">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '详情'
												+ '</button>'
												+ '</div>'
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
			});
			},

	
		//点击关闭后刷新页面
		modalclose : function() {
			var that = this;
			$(".modal-content-update").on('click', '.modal-close', function() {
				
				 location.reload() ;
			});
		},
		
	

	};
	customerManager.init();

});