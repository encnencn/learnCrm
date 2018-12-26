/**
 * Created by mingjie on 2017/1/11.
 */
$(function(){
    var roleManage = {
        roleManage:$("#role-manage-role table tbody"),
        init:function(){
            this.loadRole();
            this.deleteManage();
            this.addNewData();
        },
        rights_allPage:$("#rights_allPage"),
        loadRole:function(){
            var that = this;
            $.ajax({
                url:'/display',
                dataType:'json',
                type:"GET",
                success:function(data){
                    var nums = 5; //每页出现的数量
                    var pages = Math.ceil(data.length/nums); //得到总页数
                    var allPages = data.length;
                    var thisDate = function(curr){
                        //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                        var str = '', last = curr*nums - 1;
                        last = last >= data.length ? (data.length-1) : last;
                        for(var i = (curr*nums - nums); i <= last; i++){
                                var num = data[i].num,
                                    role = data[i].role,
                                    detail = data[i].detail;
                                str += '<tr class="role-tr">'+
                                    '<td class="rol-num">'+num+'</td>'+
                                    '<td>'+role+'</td>'+
                                    '<td class="hidden-480">'+detail+'</td>'+
                                    '<td class="role-manage-detail"></td>'+
                                    '<td>停用</td>'+
                                    '<td>'+
                                    '<div class="hidden-sm hidden-xs btn-group">'+
                                    '<button class="btn btn-xs btn-info">'+
                                    '<i class="ace-icon fa fa-pencil bigger-120"></i>'+
                                    '修改'+
                                    '</button>'+
                                    '<button class="btn btn-xs btn-danger btn-delete">'+
                                    '<i class="ace-icon fa fa-trash-o bigger-120"></i>'+
                                    '删除'+
                                    '</button>'+
                                    '</div>'+
                                    '</td>'+
                                    '<td>'+
                                    '<button type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal2">'+
                                    '<i class="ace-icon fa fa-key bigger-120"></i>'+
                                    '分配功能'+
                                    '</button>'+
                                    '</td>'+
                                    '</tr>';
                        }
                        that.rights_allPage.text("显示"+nums+"条记录，共"+allPages+"条");
                        return str;
                    };

                    //调用分页
                    laypage({
                        cont: 'rights_page',//分页id
                        pages: pages,
                        jump: function(obj){       //容器id
                            document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                        }
                    });

                },
                error:function(){

                }
            })

        },
        deleteManage:function(){
            var that = this;
            $("#role-manage-role").on('click','.btn-delete',function(){
                //要删除的索引 删除DOM树
                var key = $(this).parents('.role-tr').index();
                //要删除的编号，需要上传服务器 编号唯一  服务器删除指定编号
                var num = $(this).parents('.role-tr').find('.rol-num').text();
                if(confirm('确定要删除么')){
                    $(this).parents('.role-tr').remove();
                    $.ajax({
                        url:"www.sdfsfssfsfsf",
                        type:"POST",
                        data:{number:num},//上传编号
                        success:function(){
                            console.log("删除成功");
                        }
                    });
                    //删除后要更新数据库，并且更新页面
                    //some code
                }
            });
        },
        addNewData:function(){

        }
    };
    roleManage.init();
});