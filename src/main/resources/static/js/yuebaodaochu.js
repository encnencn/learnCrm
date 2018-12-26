/**
 * Created by mingjie on 2017/1/11.
 */
$(function() {
	var departmentManager = {
		departmentManager : $("#role-manage-role table tbody"),
		init : function() {
			this.displayYuebao();
			this.updateYuebao();
			this.queryYuebao();

		},
		rights_allPage : $("#rights_allPage"),
		displayYuebao:function(){
			var that = this;
        	$(function(){
        		$.ajax({
                    url : "/queryAllYuebao1",
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
                                          var visitTitle = data[i].visitTitle,
                                          content = data[i].content,
                                          visitDate = data[i].visitDate, 
                                          visitType=data[i].visitType,
                                          trueName = data[i].trueName;
                                          customerName=data[i].customerName;
                                          
                                          if(visitType==1){
                                        	  visitType="电话回访"; 
                                          }else if(visitType==2){
                                        	  visitType="面谈"; 
                                          }else {
                                        	  visitType="邮件"; 
                                          };
                                          str += '<tr class="role-tr">'+
                                          /*'<td><input type="checkbox"/></td>'+*/
                                          '<td class="customerName">'+customerName+'</td>'+
                                          '<td class="visitTitle">'+visitTitle+'</td>'+
                                          '<td class="visitDate">'+visitDate+'</td>'+
                                          '<td class="visitType">'+visitType+'</td>'+
                                          '<td class="content">'+content+'</td>'
                                          /*+ '<td>'
                                          + '<div class="hidden-sm hidden-xs btn-group">'
                                          + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
                                          + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                          + '修改'
                                          + '</button>'
                                         
                                          + '</div>'*/
                                          /*+ '</td>'
                                          +'<td style="display: none;"><textarea class="content" >'+content+'</textarea></td>'
                                          +'<td style="display: none;" class="titleid">'+id+'</td>'*/
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
		// 修改月报
        updateYuebao : function() {
			var that = this;
			$("#role-manage-role").on('click','.btn-update', function() {
				var visitTitle = $(this).parents('.role-tr').find('.visitTitle').text(),
				content=$(this).parents('.role-tr').find('.content').text(),
				visitDate=$(this).parents('.role-tr').find('.visitDate').text(),
				visitType=$(this).parents('.role-tr').find('.visitType').text(),
				customerName=$(this).parents('.role-tr').find('.customerName').text();
		
				$(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-visitTitle').val(visitTitle); 
				$(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-content').val(content); 
				$(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-visitDate').val(visitDate);
				var count=$(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-visitType').children("option").length;
				
				for(var i=0;i<count;i++)  
				     {        if($(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-visitType').get(0).options[i].text == visitType)  
				        {  
				    	 $(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-visitType').get(0).options[i].selected = true;  
				          
				            break;  
				        }  
				    }
				
				$(".modal-footer-updateYuebao").parents('.modal-content').find('#form-field-customerName').val(customerName); 
			});
			
		   
			
			
			$(".modal-footer-updateYuebao").on('click', '.btn-updateYuebao', function() {
				
				var customerName = $(this).parents('.modal-content').find('#form-field-customerName').val(),
					visitTitle = $(this).parents('.modal-content').find('#form-field-visitTitle').val(), 
					content = $(this).parents('.modal-content').find('#form-field-content').val(), 
					visitType = $(this).parents('.modal-content').find('#form-field-visitType').val(), 
					visitDate = $(this).parents('.modal-content').find('#form-field-visitDate').val(),
					
				jsonDate= {
						"visitDate" : visitDate,
						"content" : content,
						"visitType" : visitType,
						"visitTitle" : visitTitle,
						"customerName":customerName
				}	
			$.ajax({
				url : "/updateYuebao",
				type : "POST",
				data : jsonDate,
				success : function(data) {
					
						$('#myModalUpdate').hide();
						$('.modal-backdrop').hide();
						
						location = location;//页面刷新
						customerManager.loadCustomer();
					
				},
				error : function() {
				}
			});

			});
		},
		queryYuebao:function(){
			var that = this;
			$("#btn_query").on('click', function() {
			  var startDate=$('#query_startDate').val(),
			      endDate=$('#query_endDate').val(),
			      CustomerName=$('#query_customerName').val().replace(/(^\s*)|(\s*$)/g, "");
			 
			  
			  jsonDate= {
						"startDate" : startDate,
						"endDate" : endDate,
						"CustomerName" : CustomerName
				};
			  if(CustomerName=="" && startDate==""&& endDate==""){
                  location = location;
			  }else{
			  for(var key in jsonDate) {
					if(jsonDate[key] == "") {
						delete jsonDate[key];
					}
			  };
			
			  $.ajax({
					url : "/queryYuebao1",
					type : "POST",
					data : jsonDate,
					success : function(data) {
						
							$('#myModalQuery').hide();
							$('.modal-backdrop').hide();
							
							var nums = 5; // 每页出现的数量
                            var pages = Math.ceil(data.length/nums); // 得到总页数
                            var allPages = data.length;
                            var thisDate = function(curr){
                                // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                                var str = '', last = curr*nums - 1;
                                last = last >= data.length ? (data.length-1) : last;
                                for(var i = (curr*nums - nums); i <= last; i++){   
                                        var visitTitle = data[i].visitTitle,
                                        content = data[i].content,
                                        visitDate = data[i].visitDate, 
                                        visitType=data[i].visitType,
                                        trueName = data[i].trueName;
                                        customerName=data[i].customerName;
                                        
                                        if(visitType==1){
                                      	  visitType="电话回访"; 
                                        }else if(visitType==2){
                                      	  visitType="面谈"; 
                                        }else {
                                      	  visitType="邮件"; 
                                        };
                                        str += '<tr class="role-tr">'+
                                       /* '<td><input type="checkbox"/></td>'+*/
                                        '<td class="customerName">'+customerName+'</td>'+
                                        '<td class="visitTitle">'+visitTitle+'</td>'+
                                        '<td class="visitDate">'+visitDate+'</td>'+
                                        '<td class="visitType">'+visitType+'</td>'+
                                        '<td class="content">'+content+'</td>'
//                                        + '<td>'
//                                        + '<div class="hidden-sm hidden-xs btn-group">'
//                                        + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
//                                        + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
//                                        + '修改'
//                                        + '</button>'
//                                       
//                                        + '</div>'
                                        /*+ '</td>'
                                        +'<td style="display: none;"><textarea class="content" >'+content+'</textarea></td>'
                                        +'<td style="display: none;" class="titleid">'+id+'</td>'*/
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