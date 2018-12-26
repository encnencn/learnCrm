/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {
    var departmentManager = {
        departmentManager: $("#role-manage-role table tbody"),
        init: function () {
            this.loadDepartment();

            this.searchDepartment();// 查询分公司
            // this.modalclose();//点击关闭刷新页面

        },
        rights_allPage: $("#rights_allPage"),
        loadDepartment: function () {
            var that = this;
            $
                .ajax({
                    url: '/departmentList',
                    dataType: 'json',
                    type: "post",
                    success: function (data) {
                        // alert("从后台传过来data:"+JSON.stringify(data));
                        var nums = 10; // 每页出现的数量
                        var pages = Math.ceil(data.length / nums); // 得到总页数
                        var allPages = data.length;
                        var thisDate = function (curr) {
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

                                    + '</tr>';
                            }
                            that.rights_allPage.text("显示" + nums + "条记录，共"
                                + allPages + "条");
                            return str;
                        };

                        // 调用分页
                        laypage({
                            cont: 'rights_page',// 分页id
                            pages: pages,
                            jump: function (obj) { // 容器id
                                document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                            }
                        });
                    },
                    error: function () {
                    }
                })

        },


        // 查询分公司
        searchDepartment: function () {
            var that = this;
            $("#btn_query")
                .on(
                    'click',

                    function () {

                        var departmentname = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");

                        if (departmentname == "") {
                            location = location;
                            return false;
                        }
                        $.ajax({
                            url: "/searchDepartment",
                            dataType: 'json',
                            type: "POST",
                            data: {
                                "departmentname": departmentname,
                            },
                            success: function (data) {

                                $('#myModal3').hide();
                                $('.modal-backdrop').hide();

                                // alert("从后台传过来data:"+JSON.stringify(data));
                                var nums = 10; // 每页出现的数量
                                var pages = Math
                                    .ceil(data.length
                                        / nums); // 得到总页数
                                var allPages = data.length;
                                var thisDate = function (curr) {
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
                                    cont: 'rights_page',// 分页id
                                    pages: pages,
                                    jump: function (obj) { // 容器id
                                        document
                                            .getElementById('rights_list').innerHTML = thisDate(obj.curr);
                                    }
                                });

                            },
                            error: function () {
                            }
                        });
                    });
        },


        /*// 点击关闭后刷新页面
        modalclose : function() {
            var that = this;
            $(".modal-content-update").on('click', '.modal-close', function() {

                location.reload();
            });
        },*/


    };
    departmentManager.init();

});