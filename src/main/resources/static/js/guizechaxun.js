/**
 * Created by mingjie on 2017/1/11.
 */
$(function(){
	
	
    var noticeManage = {
    	noticeManage:$("#role-manage-role table tbody"),
        init:function(){         
            this.queryNotice();
            this.updateNotice();
            this.loadRole();
        }, 
        rights_allPage:$("#rights_allPage"),
        loadRole:function(){
            var that = this;
            $.ajax({
                url:'/queryAllRegulation',
                data: 'json',
                type:"post",
                success:function(data){

                	  var nums = 5; // 每页出现的数量
                      var pages = Math.ceil(data.length/nums); // 得到总页数
                      var allPages = data.length;
                      var thisDate = function(curr){
                          // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                          var str = '', last = curr*nums - 1;
                          last = last >= data.length ? (data.length-1) : last;
                          for(var i = (curr*nums - nums); i <= last; i++){
                                 
                                  var title = data[i].title,
                                  id = data[i].id,
                                  createTime = data[i].createTime,
                                  content=data[i].content;

                                  str += '<tr class="role-tr">'
                                	  +  '<td class="title">'+title+'</td>'
                                	  +'<td >'+createTime+'</td>'                               
	                                  + '<td>'
	                                  + '<div class="hidden-sm hidden-xs btn-group">'
	                                  + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'

	                                  + '查看详情'
	                                  + '</button>'	                                 
	                                  + '</div>'
	                                  + '</td>'
	                                  +'<td style="display: none;"><textarea class="content" >'+content+'</textarea></td>'
	                                  +'<td style="display: none;" class="titleid">'+id+'</td>'
	                                  +'</tr>';
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
            });
           
        },
        queryNotice:function(){
        	var that = this;
            $(".queryNotice").on('click', '.btn-primary', function() {

              var title = $(this).parents('.modal-content').find('#form-field-title').val();
              if(title==""){
					$("#myModalQuery").find('#ruleName').text("标题不能为空");
				      $(this).parents('.modal-content').find('#form-field-title').focus();
				          return false;
				}else if(title.split(" ").length != 1){
					$("#myModalQuery").find('#ruleName').text("不能包含空格");
					  return false;
				}else{
	                $.ajax({
	                  url : "/queryByRegulationTitle",
	                  type : "POST",
	                  data :  "title="+title,
	                  success : function(data) {
	                    $('#myModalQuery').hide();
	                    $('.modal-backdrop').hide();	               
	                    var nums = 5; // 每页出现的数量
						var pages = Math.ceil(data.length/nums); // 得到总页数
						var allPages = data.length;
						var thisDate = function(curr){
						var str = '', last = curr*nums - 1;
						    last = last >= data.length ? (data.length-1) : last;
							    for(var i = (curr*nums - nums); i <= last; i++){
							           
							            var title = data[i].title,
							            id = data[i].id,
							            createTime = data[i].createTime,
							            content=data[i].content;
							            str += '<tr class="role-tr">'
							            	+'<td class="title">'+title+'</td>'
							            	+'<td >'+createTime+'</td>'							         
								            + '<td>'
								            + '<div class="hidden-sm hidden-xs btn-group">'
								            + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'

								            + '修改'
								            + '</button>'								           
								            + '</div>'
								            + '</td>'
								            +'<td style="display: none;"><textarea class="content" >'+content+'</textarea></td>'
								            +'<td style="display: none;" class="titleid">'+id+'</td>'
								            +'</tr>';
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
				}    // 删除后要更新数据库，并且更新页面
            });
       
        },updateNotice:function(){
            var that = this;
        	$("#role-manage-role") .on('click','.btn-update', function() { 		
        	var title = $(this).parents('.role-tr').find('.title').html();
        	var content= $(this).parents('.role-tr').find('.content').html();
        	var status= $(this).parents('.role-tr').find('.status').html();
        	var id= $(this).parents('.role-tr').find('.titleid').html();	
        	$('.updatenotice').find('#form-field-title').val(title);            
            var content1 =content.replace("\\\"", "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        	
        	insertHtml(content1);
			$('.updatenotice').find('#ruleid').val(id);
		});

        }
        
    };
    
    noticeManage.init();
});