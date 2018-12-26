/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var customerManager = {
		customerManager : $("#role-manage-role table tbody"),
		init : function() {
			this.loadCustomer();
			this.deleteCustomer();// 删除客户
			this.addCustomerView();//添加客户展示
			this.addCustomerSubmit(); // 添加客户提交
			this.updateCustomerSubmit();// 修改提交客户
			this.updateCustomerView();// 修改展示用
			this.searchCustomer_personal();//查询客户
			this.modalclose();//点击关闭刷新页面
			this.detailCustomerView();//点击查看详情
		    this.addYuebao();
		    
		    this.addCheckCustomerName();//添加客户，校验客户名是否存在
		    this.updateCheckCustomerName();//修改客户，校验客户名是否存在
		     
		    
		    this.addCheckTel();//添加客户，校验客户电话
		    this.updateCheckTel();//修改客户，校验客户电话
		    
		   /* this.addCheckLinkPersonName();//添加客户，校验客户担当
		    this.updateCheckLinkPersonName();//修改客户，校验客户担当
		    
		    this.addCheckLinkPersonDuty();//添加客户，校验客户担当者职务
		    this.updateCheckLinkPersonDuty();//修改客户，校验客户担当者职务
		    
		    this.addCheckAddress();//添加客户，校验客户地址
		    this.updateCheckAddress();//修改客户，校验客户地址
*/		    
		    this.addCheckFax();//添加客户，校验客户传真
		    this.updateCheckFax();//修改客户，校验客户传真
		    
		    this.addCheckEmail();//添加客户，校验客户邮箱
		    this.updateCheckEmail();//修改客户，校验客户邮箱
		    
		    this.addCheckCompayUrl();//添加客户，校验公司网址
		    this.updateCheckCompayUrl();//修改客户，校验公司网址
		    
		    /*this.addCheckBudgetAmount();//添加客户，校验预算金额
		    this.updateCheckBudgetAmount();//修改客户，校验预算金额
		    
		    this.addCheckNum();//添加客户，校验预算金额
		    this.updateCheckNum();//修改客户，校验预算金额
		     */		    
		    
		},
		rights_allPage : $("#rights_allPage"),
		/////////////////////////////////////
		addCheckCompayUrl:function(){
       	 var that = this;
            $("#myModal1").on('input', '#form-field-10', function() {
           	 
              var compayUrl = $(this).parents('.modal-content-add').find('#form-field-10').val();         
//              var strRegex = "^((https|http|ftp|rtsp|mms)?://)"  
//            	          + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
//            	          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
//            	          + "|" // 允许IP和DOMAIN（域名） 
//            	          + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
//            	          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
//            	          + "[a-z]{2,6})" // first level domain- .com or .museum  
//            	          + "(:[0-9]{1,4})?" // 端口- :80  
//            	          + "((/?)|" // a slash isn't required if there is no file name  
//            	          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
//              var re=new RegExp(strRegex);
              var Testurl=/^(?:http(?:s|):\/\/|)(?:(?:\w*?)\.|)(?:\w*?)\.(?:\w{2,4})(?:\?.*|\/.*|)$/ig;
          	//如果输入框为空或者包含空格,报错
       	   if((!Testurl.test(compayUrl))||(compayUrl.indexOf(" ")!=-1)){
       		$('#add-compayUrl-true').hide();
              	$('#add-compayUrl-false').show();
              	$('.btn-customer-add').attr("disabled", true);
       		return false;
       	   }else{
       		   $('#add-compayUrl-true').show();
              	   $('#add-compayUrl-false').hide();
              	   $('.btn-customer-add').attr("disabled", false);
              	return true;
       	   }
            });
       }, 
		
       updateCheckCompayUrl:function(){
         	 var that = this;
              $("#myModal2").on('input', '#form-field-10', function() {
             	 
                var compayUrl = $(this).parents('.modal-content-update').find('#form-field-10').val();         
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"  
              	          + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
              	          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
              	          + "|" // 允许IP和DOMAIN（域名） 
              	          + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
              	          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
              	          + "[a-z]{2,6})" // first level domain- .com or .museum  
              	          + "(:[0-9]{1,4})?" // 端口- :80  
              	          + "((/?)|" // a slash isn't required if there is no file name  
              	          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
                var re=new RegExp(strRegex);
            	//如果输入框为空或者包含空格,报错
         	   if((!re.test(compayUrl))||(compayUrl.indexOf(" ")!=-1)){
         		    $('#update-compayUrl-true').hide();
                	$('#update-compayUrl-false').show();
                	$('.btn-customer-update').attr("disabled", true);
         		return false;
         	   }else{
         		   $('#update-compayUrl-true').show();
         		   $('#update-compayUrl-false').hide();
                   $('.btn-compayUrl-update').attr("disabled", false);
                	return true;
         	   }
              });
         }, 
		
		///////////////////////////////////////////
		//添加客户时候校验客户传真
        addCheckEmail:function(){
        	 var that = this;
             $("#myModal1").on('input', '#form-field-9', function() {
            	 
               var email = $(this).parents('.modal-content-add').find('#form-field-9').val();         
               var  testEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                
           	//如果输入框为空或者包含空格,报错
        	   if((!testEmail.test(email))||(email.indexOf(" ")!=-1)){
        		$('#add-email-true').hide();
               	$('#add-email-false').show();
               	$('.btn-customer-add').attr("disabled", true);
        		return false;
        	   }else{
        		   $('#add-email-true').show();
               	   $('#add-email-false').hide();
               	   $('.btn-customer-add').attr("disabled", false);
               	return true;
        	   }
             });
        }, 
		
        updateCheckEmail:function(){
       	 var that = this;
            $("#myModal2").on('input', '#form-field-9', function() {
              var email = $(this).parents('.modal-content-update').find('#form-field-9').val(); 
              var  testEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              
          	//如果输入框为空或者包含空格,报错
       	   if((!testEmail.test(email))||(email.indexOf(" ")!=-1)){
       		    $('#update-email-true').hide();
              	$('#update-email-false').show();
              	$('.btn-customer-update').attr("disabled", true);
       		return false;
       	   }else{
    		   $('#update-email-true').show();
               $('#update-email-false').hide();
               $('.btn-customer-update').attr("disabled", false);
              	return true;
       	   }
            });
       }, 
        //添加客户时候校验客户传真
        addCheckFax:function(){
        	 var that = this;
             $("#myModal1").on('input', '#form-field-8', function() {
            	 
               var fax = $(this).parents('.modal-content-add').find('#form-field-8').val();         
               var  testMobile = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
           	//如果输入框为空或者包含空格,报错
        	   if((!testMobile.test(fax))||(fax.indexOf(" ")!=-1)){
        		$('#add-fax-true').hide();
               	$('#add-fax-false').show();
               	$('.btn-customer-add').attr("disabled", true);
        		return false;
        	   }else{
        		   $('#add-fax-true').show();
               	   $('#add-fax-false').hide();
               	   $('.btn-customer-add').attr("disabled", false);
               	return true;
        	   }
             });
        }, 
		
        updateCheckFax:function(){
       	 var that = this;
            $("#myModal2").on('input', '#form-field-8', function() {
              var fax = $(this).parents('.modal-content-update').find('#form-field-8').val(); 
              var  testMobile = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
          	//如果输入框为空或者包含空格,报错
       	   if((!testMobile.test(fax))||(fax.indexOf(" ")!=-1)){
       		    $('#update-fax-true').hide();
              	$('#update-fax-false').show();
              	$('.btn-customer-update').attr("disabled", true);
       		return false;
       	   }else{
    		   $('#update-fax-true').show();
               $('#update-fax-false').hide();
               $('.btn-customer-update').attr("disabled", false);
              	return true;
       	   }
            });
       }, 
		///////////////////////////////////////////////////////////
		 //添加客户时候校验客户电话
        rights_allPage:$("#rights_allPage"),
        addCheckTel:function(){
        	
        	 var that = this;
             $("#myModal1").on('input', '#form-field-6', function() {
            	 
               var tel = $(this).parents('.modal-content-add').find('#form-field-6').val();         
               var  testMobile = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
           	//如果输入框为空或者包含空格,报错
        	   if((!testMobile.test(tel))||(tel.indexOf(" ")!=-1)){
        		$('#add-tel-true').hide();
               	$('#add-tel-false').show();
               	$('.btn-customer-add').attr("disabled", true);
        		return false;
        	   }else{
        		   $('#add-tel-true').show();
                   $('#add-tel-false').hide();
                   $('.btn-customer-add').attr("disabled", false);
                  	return true;
           	   }
             });
        }, 
		
        updateCheckTel:function(){
       	 var that = this;
            $("#myModal2").on('input', '#form-field-6', function() {
              var tel = $(this).parents('.modal-content-update').find('#form-field-6').val(); 
              var  testMobile = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
          	//如果输入框为空或者包含空格,报错
       	   if((!testMobile.test(tel))||(tel.indexOf(" ")!=-1)){
       		    $('#update-tel-true').hide();
              	$('#update-tel-false').show();
              	$('.btn-customer-update').attr("disabled", true);
       		return false;
       	   }else{
    		   $('#update-tel-true').show();
               $('#update-tel-false').hide();
               $('.btn-customer-update').attr("disabled", false);
              	return true;
       	   }
            });
       }, 
        
     
       
		loadCustomer : function() {
			var that = this;
			$.ajax({
						url : '/personalCustomerList_pc',
						dataType : 'json',
						type : "POST",
						data : 'json',
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
									display="";
									yuebao="";
									commonTime=moment(new Date(createTime)).utc(8).format('YYYY-MM-DD HH:mm:ss');
									if(data[i].status==0){
										status="待核";
										yuebao="style= 'display:none '";
									}else if(data[i].status==1){
										status="已核";
										display="style= 'display:none '";
									}else if(data[i].status==2){
										status="拒绝";
										display="style= 'display:none '";
										yuebao="style= 'display:none '";
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
											+ '<button class="btn btn-xs btn-success btn-detail-view" data-toggle="modal" data-target="#myModal4">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '详情'
											+ '</button>'
											/*+ '<button class="btn btn-xs btn-info btn-rizhi" data-toggle="modal" data-target="#myModal6">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '日志'
											+ '</button>'*/
											+ '<button class="btn btn-xs btn-info btn-yuebao"'+yuebao+' data-toggle="modal" data-target="#myModal5">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '月报'
											+ '</button>'
											
											+ '<button class="btn btn-xs btn-warning btn-update-view" '+display+' data-toggle="modal" data-target="#myModal2">'
											+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
											+ '修改'
											+ '</button>'
											/*+ '<button class="btn btn-xs btn-danger btn-delete">'
											+ '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
											+ '删除' 
											+ '</button>'*/
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
		
		
		 //添加客户时候校验客户名
        rights_allPage:$("#rights_allPage"),
        addCheckCustomerName:function(){
        	
        	 var that = this;
             $("#myModal1").on('input', '#form-field-1', function() {
            	 
               var customerName = $(this).parents('.modal-content-add').find('#form-field-1').val();         
               
           	//如果输入框为空或者包含空格,报错
        	   if(customerName==""||(customerName.indexOf(" ")!=-1)){
        		$('#add-name-true').hide();
               	$('#add-name-false').show();
               	$('.btn-customer-add').attr("disabled", true);
        		return false;
        	   }
               
                 $.ajax({
                   url : "/CheckCustomerName",
                   type : "POST",
                   data :  "customerName="+customerName,
                   dataType : 'json',
                   success : function(data) {
                	   //alert("data"+JSON.stringify(data));
                    if(data.flag){
                    	$('#add-name-true').show();
                    	$('#add-name-false').hide();
                    	$('.btn-customer-add').attr("disabled", false);
                    	$('#form-field-2').val(data.firstName);
                    }else{
                    	$('#add-name-true').hide();
                    	$('#add-name-false').show();
                    	$('.btn-customer-add').attr("disabled", true);
                    	$('#form-field-2').val("");
                    }
                   },
                   error : function() {
                   }
                 });
                 // 删除后要更新数据库，并且更新页面
             });
        	
        }, 
   	 //修改客户名称时候校验客户名
        rights_allPage:$("#rights_allPage"),
        updateCheckCustomerName:function(){
        	
        	 var that = this;
             $("#myModal2").on('input', '#form-field-1', function() {
               var id = $(this).parents('.modal-content-update').find('#form-field-0').val(); 
               var customerName = $(this).parents('.modal-content-update').find('#form-field-1').val();         
               
           	//如果输入框为空或者包含空格,报错
        	   if(customerName==""||(customerName.indexOf(" ")!=-1)){
        		$('#update-name-true').hide();
               	$('#update-name-false').show();
               	$('.btn-customer-update').attr("disabled", true);
        		return false;
        	   }	
               
                 $.ajax({
                   url : "/CheckCustomerName",
                   type : "POST",
                   data :  "id="+id+"&customerName="+customerName,
                   dataType : 'json',
                   success : function(data) {
                    if(data.flag){
                    	$('#update-name-true').show();
                    	$('#update-name-false').hide();
                    	$('.btn-customer-update').attr("disabled", false);
                    	$('#form-field-2').val(data.firstName);
                    }else{
                    	$('#update-name-true').hide();
                    	$('#update-name-false').show();
                    	$('.btn-customer-update').attr("disabled", true);
                    	$('#form-field-2').val("");
                    	
                    }
                   },
                   error : function() {
                   }
                 });
                 // 删除后要更新数据库，并且更新页面
             });
        	
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

	
		//删除客户
		deleteCustomer : function() {
			var that = this;
			$("#role-manage-role").on('click', '.btn-delete', function() {
				// 要删除的索引 删除DOM树
				
				var id = $(this).parents('.role-tr').find('.cus-id').text();
				
				if (confirm('确定要删除么')) {
					$(this).parents('.role-tr').remove();
					$.ajax({
						url : "/deleteCustomer",
						type : "POST",
						data : {
							"id" : id, // 上传编号
						},
						success : function() {
							//customerManager.init();
							location = location;//页面刷新
							customerManager.loadCustomer();
						},
						error : function() {
						}
					});
					// 删除后要更新数据库，并且更新页面
					// some code
				}
			});
		},
		
	
		//查询客户
		searchCustomer_personal : function() {
			var that = this;
			$("#btn_query").on('click',function() {

						var customername = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");
						if(customername==""){
                            location = location;
			            	   return false;
						}
						$.ajax({
							url : "/searchCustomer_personal",
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
										display="";
										commonTime=moment(new Date(createTime)).utc(8).format('YYYY-MM-DD HH:mm:ss');
										if(data[i].status==0){
											status="待核";
										}else if(data[i].status==1){
											status="已核";
											display="style= 'display:none '";
										}else if(data[i].status==2){
											status="拒绝";
											display="style= 'display:none '";
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
												+ '<button class="btn btn-xs btn-success btn-detail-view" data-toggle="modal" data-target="#myModal4">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '详情'
												+ '</button>'
												
												+ '<button class="btn btn-xs btn-info btn-rizhi" data-toggle="modal" data-target="#myModal6">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '日志'
												+ '</button>'
												+ '<button class="btn btn-xs btn-info btn-yuebao" data-toggle="modal" data-target="#myModal5">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '月报'
												+ '</button>'
												+ '<button class="btn btn-xs btn-warning btn-update-view" '+display+' data-toggle="modal" data-target="#myModal2">'
												+ '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
												+ '修改'
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

		// 点击修改展示客户
		
		updateCustomerView : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update-view',function() {
								var updateCustomerViewHtml = "";
								// 要修改的编号，需要上传服务器 编号唯一 服务器修改指定编号
								var id = $(this).parents('.role-tr').find('.cus-id').text();
								
								$.ajax({
									url : "/selectAllTrueName",
									type : "POST",
									  data :  'json',
									  success : function(data) {
					                    	 testJson = $.parseJSON(data);  
					                    	var str='';
					                    	for(var i=0;i<testJson.length;i++){
					                    		 str +=  "<option value='" + testJson[i] + "'>"+testJson[i]+'</option>';
					                    	}
					                    	$(".alltruenameUpdate").html(str);

					                    },
									error : function() {
									}
								});
								
								$.ajax({
											url : "/updateCustomerView",
											dataType : 'json',
											type : "POST",
											data : {
												"customerid" : id,
											},// 上传编号
											success : function(data) {
												
												if("planDate" in data){
													  
													$('.modal-content-update').find('#form-field-17').val(moment(new Date(data.planDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-update').find('#form-field-17').val(data.planDate);
												};
												if("planDate" in data){
													
													$('.modal-content-update').find('#form-field-18').val(moment(new Date(data.signDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-update').find('#form-field-18').val(data.signDate);
												};
												if("planDate" in data){
													
													 $('.modal-content-update').find('#form-field-19').val(moment(new Date(data.produceDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-update').find('#form-field-19').val(data.produceDate);
												};
												if("planDate" in data){
													
													 $('.modal-content-update').find('#form-field-20').val(moment(new Date(data.deviceArriveDate)).utc(8).format('YYYY-MM-DD'));
												}else{
													$('.modal-content-update').find('#form-field-20').val(data.deviceArriveDate);
												};
												
												$('.modal-content-update').find('#form-field-0').val(data.id);
												$('.modal-content-update').find('#form-field-1').val(data.customerName);
												$('.modal-content-update').find('#form-field-2').val(data.customerCode);
												$('.modal-content-update').find('#form-field-3').val(data.district);
												$('.modal-content-update').find('#form-field-4').val(data.linkPersonName);
												$('.modal-content-update').find('#form-field-5').val(data.linkPersonDuty);
												$('.modal-content-update').find('#form-field-6').val(data.tel);
												$('.modal-content-update').find('#form-field-7').val(data.address);
												$('.modal-content-update').find('#form-field-8').val(data.fax);
												$('.modal-content-update').find('#form-field-9').val(data.email);
												$('.modal-content-update').find('#form-field-10').val(data.compayUrl);
												$('.modal-content-update').find('#form-field-11').val(data.product);
												$('.modal-content-update').find('#form-field-12').val(data.equipment);
												$('.modal-content-update').find('#form-field-13').val(data.technique);
												$('.modal-content-update').find('#form-field-14').val(data.deviceProblem);
												$('.modal-content-update').find('#form-field-15').val(data.requirement);
												$('.modal-content-update').find('#form-field-16').val(data.features);
												
												$('.modal-content-update').find('#form-field-21').val(data.budgetAmount);
												$('.modal-content-update').find('#form-field-22').val(data.budgetStatus);
												$('.modal-content-update').find('#form-field-23').val(data.modelName);
												$('.modal-content-update').find('#form-field-24').val(data.num);
												$('.modal-content-update').find('#form-field-25').val(data.otherDevice);
												$('.modal-content-update').find('#form-field-26').val(data.workProcess);
												$('.modal-content-update').find('#form-field-27').val(data.transport);
												$('.modal-content-update').find('#form-field-28').val(data.clamp);
												$('.modal-content-update').find('#form-field-29').val(data.cutter);
												$('.modal-content-update').find('#form-field-30').val(data.drawing);
												$('.modal-content-update').find('#form-field-31').val(data.sampleParts);
												$('.modal-content-update').find('#form-field-32').val(data.scheme);
												$('.modal-content-update').find('#form-field-33').val(data.takt);
												$('.modal-content-update').find('#form-field-34').val(data.priceList);
												$('.modal-content-update').find('#form-field-35').val(data.remark);
												$('.modal-content-update').find('#form-field-36').val(data.expect);
												$('.modal-content-update').find('#form-field-37').val(data.status);
												$('.modal-content-update').find('#form-field-38').val(data.truename);
											
											},
											
											error : function() {
											}
										});
								
							});
			
		},

		// 修改角色后提交
		updateCustomerSubmit : function() {
			var that = this;
			$(".modal-footer-customer-update").on(
					'click',
					'.btn-customer-update',
					function() {
						$('.name-exist').html("");
						
						
						var id= $(this).parents('.modal-content').find('#form-field-0').val();
						//alert(id);
						customerName= $(this).parents('.modal-content').find('#form-field-1').val(); 
						customerCode= $(this).parents('.modal-content').find('#form-field-2').val();
						district= $(this).parents('.modal-content').find('#form-field-3').val();
						linkPersonName= $(this).parents('.modal-content').find('#form-field-4').val();
						linkPersonDuty= $(this).parents('.modal-content').find('#form-field-5').val();
						tel=$(this).parents('.modal-content').find('#form-field-6').val();
						address = $(this).parents('.modal-content').find('#form-field-7').val();
						fax = $(this).parents('.modal-content').find('#form-field-8').val();
						email = $(this).parents('.modal-content').find('#form-field-9').val();
						compayUrl = $(this).parents('.modal-content').find('#form-field-10').val();
						product = $(this).parents('.modal-content').find('#form-field-11').val();
						equipment = $(this).parents('.modal-content').find('#form-field-12').val();
						technique = $(this).parents('.modal-content').find('#form-field-13').val();
						deviceProblem = $(this).parents('.modal-content').find('#form-field-14').val();
						requirement = $(this).parents('.modal-content').find('#form-field-15').val();
						features = $(this).parents('.modal-content').find('#form-field-16').val();
						planDate = $(this).parents('.modal-content').find('#form-field-17').val();
						signDate = $(this).parents('.modal-content').find('#form-field-18').val();
						produceDate = $(this).parents('.modal-content').find('#form-field-19').val();
						deviceArriveDate = $(this).parents('.modal-content').find('#form-field-20').val();
						budgetAmount = $(this).parents('.modal-content').find('#form-field-21').val();
						budgetStatus = $(this).parents('.modal-content').find('#form-field-22').val();
						modelName = $(this).parents('.modal-content').find('#form-field-23').val();
						num = $(this).parents('.modal-content').find('#form-field-24').val();
						otherDevice = $(this).parents('.modal-content').find('#form-field-25').val();
						workProcess = $(this).parents('.modal-content').find('#form-field-26').val();
						transport = $(this).parents('.modal-content').find('#form-field-27').val();
						clamp = $(this).parents('.modal-content').find('#form-field-28').val();
						cutter = $(this).parents('.modal-content').find('#form-field-29').val();
						drawing = $(this).parents('.modal-content').find('#form-field-30').val();
						sampleParts = $(this).parents('.modal-content').find('#form-field-31').val();
						scheme = $(this).parents('.modal-content').find('#form-field-32').val();
						takt = $(this).parents('.modal-content').find('#form-field-33').val();
						priceList = $(this).parents('.modal-content').find('#form-field-34').val();
						remark = $(this).parents('.modal-content').find('#form-field-35').val();
						expect = $(this).parents('.modal-content').find('#form-field-36').val();
						status =$(this).parents('.modal-content').find('#form-field-37').val();
						truename = $(this).parents('.modal-content').find('#form-field-38').val();
						
						if(customerName==""){
							 $(this).parents('.modal-content').find('#form-field-1').focus();
			            	   return false;
						}else if(district==""){
							 $(this).parents('.modal-content').find('#form-field-3').focus();
			            	   return false;
						}
						else if(linkPersonName==""){
							 $(this).parents('.modal-content').find('#form-field-4').focus();
			            	   return false;
						}
						else if(linkPersonDuty==""){
							 $(this).parents('.modal-content').find('#form-field-5').focus();
			            	   return false;
						}else if(tel==""){
							 $(this).parents('.modal-content').find('#form-field-6').focus();
			            	   return false;
						}else if(address==""){
							 $(this).parents('.modal-content').find('#form-field-7').focus();
			            	   return false;
						}else if(fax==""){
							 $(this).parents('.modal-content').find('#form-field-8').focus();
			            	   return false;
						}else if(email==""){
							 $(this).parents('.modal-content').find('#form-field-9').focus();
			            	   return false;
						}else if(compayUrl==""){
							 $(this).parents('.modal-content').find('#form-field-10').focus();
			            	   return false;
						}else if(truename==""){
							 $(this).parents('.modal-content').find('#form-field-38').focus();
			            	   return false;
						}
						
						jsonDate= {
							"id":id,//0
							"customerName" : customerName,//1
							"customerCode" : customerCode,//2
							"district" : district,//3
							"linkPersonName" : linkPersonName,//4
							"linkPersonDuty" : linkPersonDuty,//5
							"tel" : tel,//6
							"address" : address,//7
							"fax" : fax,//8
							"email" : email,//9
							"compayUrl" : compayUrl,//10
						    "product" : product,//11
							"equipment" : equipment,//12
							"technique" : technique,//13
							"deviceProblem" : deviceProblem,//14
							"requirement" : requirement,//15
						    "features" : features,//16
						   "planDate" : planDate,//17
						   "signDate" : signDate,//18
							"produceDate" : produceDate,//19
							"deviceArriveDate" : deviceArriveDate,//20	
							"budgetAmount" : budgetAmount,//21
							"budgetStatus" : budgetStatus,//22
							"modelName" : modelName,//23
							"num" : num,//24
							"otherDevice" : otherDevice,//25
							"workProcess" : workProcess,//26
							"transport" : transport,//27
							"clamp" : clamp,//28
							"cutter" : cutter,//29
							"drawing" : drawing,//30
							"sampleParts" : sampleParts,//31
							"scheme" : scheme,//32
							"takt" : takt,//33
							"priceList" : priceList,//34
							"remark" : remark,//35
							"expect" : expect,//36
							"status" : status,//37
							"truename":truename //38
					};
						
						  for(var key in jsonDate){  
							  if(jsonDate[key]==""){
								  delete jsonDate[key];
							  }
						    }
						  //alert(JSON.stringify(jsonDate));

						$.ajax({
							url : "/updateCustomerSubmit",
							type : "POST",
							data : jsonDate,
							success : function(data) {
								
								if(data){
									$('#myModal2').hide();
									$('.modal-backdrop').hide();
									//customerManager.init();
									location = location;//页面刷新
									customerManager.loadCustomer();
								}else {
									$('.name-exist').html("客户名称已存在！");
								}
								
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
		
		//点击添加客户展示
		addCustomerView : function() {
			var that = this;
			$(".modal-top-customer-addView").on(
					'click',
					'.btn-success-addView',
					function() {
						//填充事物担当下拉列表
						$.ajax({
							url : "/selectAllTrueName",
							type : "POST",
							  data :  'json',
							  success : function(data) {
								  //alert($.parseJSON(data));
			                    	testJson = $.parseJSON(data);  
			                    	var str='';
			                    	for(var i=0;i<testJson.length;i++){
			                    		 str +=  "<option value='" + testJson[i] + "'>"+testJson[i]+'</option>';
			                    	}
			                    	$(".alltruenameAdd").html(str);

			                    },
							error : function() {
							}
						});
						
					});
		},
		
		
		//添加提交客户
		addCustomerSubmit : function() {
			var that = this;
			$(".modal-footer-customer-add").on(
					'click',
					'.btn-customer-add',
					function() {
						$('.name-exist').html("");
						var customerName= $(this).parents('.modal-content').find('#form-field-1').val();
						customerCode= $(this).parents('.modal-content').find('#form-field-2').val();
						district= $(this).parents('.modal-content').find('#form-field-3').val();
						linkPersonName= $(this).parents('.modal-content').find('#form-field-4').val();
						linkPersonDuty= $(this).parents('.modal-content').find('#form-field-5').val();
						tel=$(this).parents('.modal-content').find('#form-field-6').val();
						address = $(this).parents('.modal-content').find('#form-field-7').val();
						fax = $(this).parents('.modal-content').find('#form-field-8').val();
						email = $(this).parents('.modal-content').find('#form-field-9').val();
						compayUrl = $(this).parents('.modal-content').find('#form-field-10').val();
						product = $(this).parents('.modal-content').find('#form-field-11').val();
						equipment = $(this).parents('.modal-content').find('#form-field-12').val();
						technique = $(this).parents('.modal-content').find('#form-field-13').val();
						deviceProblem = $(this).parents('.modal-content').find('#form-field-14').val();
						requirement = $(this).parents('.modal-content').find('#form-field-15').val();
						features = $(this).parents('.modal-content').find('#form-field-16').val();
						planDate = $(this).parents('.modal-content').find('#form-field-17').val();
						signDate = $(this).parents('.modal-content').find('#form-field-18').val();
						produceDate = $(this).parents('.modal-content').find('#form-field-19').val();
						deviceArriveDate = $(this).parents('.modal-content').find('#form-field-20').val();
						budgetAmount = $(this).parents('.modal-content').find('#form-field-21').val();
						budgetStatus = $(this).parents('.modal-content').find('#form-field-22').val();
						modelName = $(this).parents('.modal-content').find('#form-field-23').val();
						num = $(this).parents('.modal-content').find('#form-field-24').val();
						otherDevice = $(this).parents('.modal-content').find('#form-field-25').val();
						workProcess = $(this).parents('.modal-content').find('#form-field-26').val();
						transport = $(this).parents('.modal-content').find('#form-field-27').val();
						clamp = $(this).parents('.modal-content').find('#form-field-28').val();
						cutter = $(this).parents('.modal-content').find('#form-field-29').val();
						drawing = $(this).parents('.modal-content').find('#form-field-30').val();
						sampleParts = $(this).parents('.modal-content').find('#form-field-31').val();
						scheme = $(this).parents('.modal-content').find('#form-field-32').val();
						takt = $(this).parents('.modal-content').find('#form-field-33').val();
						priceList = $(this).parents('.modal-content').find('#form-field-34').val();
						remark = $(this).parents('.modal-content').find('#form-field-35').val();
						expect = $(this).parents('.modal-content').find('#form-field-36').val();
						status =$(this).parents('.modal-content').find('#form-field-37').val();
						truename = $(this).parents('.modal-content').find('#form-field-38').val();
						
						if(customerName==""){
							 $(this).parents('.modal-content').find('#form-field-1').focus();
			            	   return false;
						}else if(district==""){
							 $(this).parents('.modal-content').find('#form-field-3').focus();
			            	   return false;
						}
						else if(linkPersonName==""){
							 $(this).parents('.modal-content').find('#form-field-4').focus();
			            	   return false;
						}
						else if(linkPersonDuty==""){
							 $(this).parents('.modal-content').find('#form-field-5').focus();
			            	   return false;
						}else if(tel==""){
							 $(this).parents('.modal-content').find('#form-field-6').focus();
			            	   return false;
						}else if(address==""){
							 $(this).parents('.modal-content').find('#form-field-7').focus();
			            	   return false;
						}else if(fax==""){
							 $(this).parents('.modal-content').find('#form-field-8').focus();
			            	   return false;
						}else if(email==""){
							 $(this).parents('.modal-content').find('#form-field-9').focus();
			            	   return false;
						}else if(compayUrl==""){
							 $(this).parents('.modal-content').find('#form-field-10').focus();
			            	   return false;
						}else if(truename==""){
							 $(this).parents('.modal-content').find('#form-field-38').focus();
			            	   return false;
						}
						
						jsonDate= {
							"customerName" : customerName,//1
							"customerCode" : customerCode,//2
							"district" : district,//3
							"linkPersonName" : linkPersonName,//4
							"linkPersonDuty" : linkPersonDuty,//5
							"tel" : tel,//6
							"address" : address,//7
							"fax" : fax,//8
							"email" : email,//9
							"compayUrl" : compayUrl,//10
						    "product" : product,//11
							"equipment" : equipment,//12
							"technique" : technique,//13
							"deviceProblem" : deviceProblem,//14
							"requirement" : requirement,//15
						    "features" : features,//16
						   "planDate" : planDate,//17
						   "signDate" : signDate,//18
							"produceDate" : produceDate,//19
							"deviceArriveDate" : deviceArriveDate,//20	
							"budgetAmount" : budgetAmount,//21
							"budgetStatus" : budgetStatus,//22
							"modelName" : modelName,//23
							"num" : num,//24
							"otherDevice" : otherDevice,//25
							"workProcess" : workProcess,//26
							"transport" : transport,//27
							"clamp" : clamp,//28
							"cutter" : cutter,//29
							"drawing" : drawing,//30
							"sampleParts" : sampleParts,//31
							"scheme" : scheme,//32
							"takt" : takt,//33
							"priceList" : priceList,//34
							"remark" : remark,//35
							"expect" : expect,//36
							"status" : status,//37
							"truename":truename //38
					};
						
						  for(var key in jsonDate){  
							  if(jsonDate[key]==""){
								  delete jsonDate[key];
							  }
						    }
						  alert(JSON.stringify(jsonDate));

						$.ajax({
							url : "/addCustomerSubmit",
							type : "POST",
							data : jsonDate,
							success : function(data) {
								//alert(data);
								if(data){
									$('#myModal2').hide();
									$('.modal-backdrop').hide();
									//customerManager.init();
									location = location;//页面刷新
									customerManager.loadCustomer();
									
								}else {
									$('.name-exist').html("客户名称已存在,或为空！");
								}
							},
							error : function() {
							}
						});
					
					
					});
		},
		
		addYuebao:function(){
			var that = this;
			
			$(".modal-footer-addYuebao").on('click','.btn-customer-addYuebao',function() {
				var visitDate=$(this).parents('.modal-content').find('#form-field-visitDate').val();
					content=$(this).parents('.modal-content').find('#form-field-content').val(),
					visitType=$(this).parents('.modal-content').find('#form-field-visitType').val(),
					visitTitle=$(this).parents('.modal-content').find('#form-field-visitTitle').val();
					customerId=$('.role-tr').find('.cus-id').val();
//					alert(customerId);
				jsonDate= {
							"visitDate" : visitDate,
							"content" : content,
							"visitType" : visitType,
							"visitTitle" : visitTitle
				}	
				$.ajax({
					url : "/saveYuebao",
					type : "POST",
					data : jsonDate,
					success : function(data) {
						
							$('#myModal5').hide();
							$('.modal-backdrop').hide();
							
							location = location;//页面刷新
							customerManager.loadCustomer();
						
					},
					error : function() {
					}
				});
				
			});
		},
		
		/*//点击关闭后刷新页面
		modalclose : function() {
			var that = this;
			$(".modal-content-update").on('click', '.modal-close', function() {
				
				 location.reload() ;
			});
		},*/
		



	};
	customerManager.init();

});