/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var departmentManager = {
		departmentManager : $("#role-manage-role table tbody"),
		init : function() {
			this.displayRizhi();
			this.queryRizhi();

		},
		rights_allPage : $("#rights_allPage"),
		displayRizhi:function(){
			var that = this;
        	$(function(){
        		$.ajax({
                    url : "/queryAllrizhi",
                    type : "POST",
                    data :  'json',
                    success : function(data) {

                        	  var nums = 5; // 每页出现的数量
                              var pages = Math.ceil(data.length/nums); // 得到总页数
                              var allPages = data.length;
                              var thisDate = function(curr){
                                  // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                                  var str = '', last = curr*nums - 1;
                                  last = last >= data.length ? (data.length-1) : last;
                                  for(var i = (curr*nums - nums); i <= last; i++){   
                                          var status = data[i].status,
                                          approveDate = data[i].approveDate, 
                                          trueName = data[i].trueName;
                                          customerName=data[i].customerName;
                                          
                                          if(status==0){
                                        	  status="待核"; 
                                          }else if(status==1){
                                        	  status="已核"; 
                                          }else {
                                        	  status="拒绝"; 
                                          };
                                          str += '<tr class="role-tr">'+
                                         
                                          '<td class="customerName">'+customerName+'</td>'+
                                          '<td class="visitTitle">'+trueName+'</td>'+
                                       
                                          '<td class="visitType">'+approveDate+'</td>'+
                                          '<td class="content">'+status+'</td>'
                                         
                                          +'</tr>'
                                         ;
                                  }
                                  that.rights_allPage.text("显示"+nums+"条记录，共"+allPages+"条");
                                  return str;
                              };

                              // 调用分页
                              laypage({
                                  cont: 'rights_page',// 分页id
                                  pages: pages,
                                  jump: function(obj){       // 容器id
                                      document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                                  }
                              });

                            },
                    error : function() {
                    }
                    
                  });
        		
        		
        	});
        },
		
        queryRizhi:function(){
			var that = this;
			$(".modal-footer-queryRizhi").on('click', '.btn-queryRizhi', function() {
			  var startDate=$(this).parents('.modal-content').find('#form-field-startDate').val(),
			      endDate=$(this).parents('.modal-content').find('#form-field-endDate').val(),
			      CustomerName=$(this).parents('.modal-content').find('#form-field-CustomerName').val();
			      trueName=$(this).parents('.modal-content').find('#form-field-trueName').val();
			 if(CustomerName==""&& trueName==""&& startDate==""&& endDate==""){
				  alert("请填写其中任意一项！");
			  }else{
			 
			  jsonDate= {
						"startDate" : startDate,
						"endDate" : endDate,
						"CustomerName" : CustomerName,
						"trueName" : trueName,
						
				};
			  for(var key in jsonDate) {
					if(jsonDate[key] == "") {
						delete jsonDate[key];
					}
			  };
			
			  $.ajax({
					url : "/queryRizhi",
					type : "POST",
					data : jsonDate,
					success : function(data) {
						
							$('#myModal3').hide();
							$('.modal-backdrop').hide();
				        	  var nums = 5; // 每页出现的数量
                              var pages = Math.ceil(data.length/nums); // 得到总页数
                              var allPages = data.length;
                              var thisDate = function(curr){
                                  // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                                  var str = '', last = curr*nums - 1;
                                  last = last >= data.length ? (data.length-1) : last;
                                  for(var i = (curr*nums - nums); i <= last; i++){   
                                          var status = data[i].status,
                                          approveDate = data[i].approveDate, 
                                          trueName = data[i].trueName;
                                          customerName=data[i].customerName;
                                          
                                          if(status==0){
                                        	  status="待核"; 
                                          }else if(status==1){
                                        	  status="已核"; 
                                          }else {
                                        	  status="拒绝"; 
                                          };
                                          str += '<tr class="role-tr">'+
                                         
                                          '<td class="customerName">'+customerName+'</td>'+
                                          '<td class="visitTitle">'+trueName+'</td>'+
                                       
                                          '<td class="visitType">'+approveDate+'</td>'+
                                          '<td class="content">'+status+'</td>'
                                         
                                          +'</tr>'
                                         ;
                                  }
                                  that.rights_allPage.text("显示"+nums+"条记录，共"+allPages+"条");
                                  return str;
                              };

                              // 调用分页
                              laypage({
                                  cont: 'rights_page',// 分页id
                                  pages: pages,
                                  jump: function(obj){       // 容器id
                                      document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                                  }
                              });

                            },
                          error : function() {
      					}
                  

				});
			  };
			  
			});
		}
		
	};
	departmentManager.init();

});