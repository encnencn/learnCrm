/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {
    var Manager = {
        Manager: $("#role-manage-role table tbody"),
        init: function () {
            this.load();
            this.search();
            this.addSubmit(); // 添加提交
            this.updateView();// 修改展示
            this.updateSubmit();// 修改提交
            this.deleteEvent();// 删除
            this.checkName_add();//添加，校验名是否存在
            this.checkName_update();//修改，校验名是否存在

        },


        rights_allPage: $("#rights_allPage"),
        load: function () {
            var that = this;
            var enName = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");

            $.ajax({
                url: '/parameterList',
                dataType: 'json',
                data: {
                    "enName": enName,
                },
                type: "GET",
                success: function (data) {
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
                                enName = data[i].enName,
                                cnName = data[i].cnName,
                                value = data[i].value,
                                description = data[i].description,
                                status = data[i].status,
                                createdatetime = data[i].createdatetime,
                                modifydatetime = data[i].modifydatetime;


                            if (status == 1) {
                                status_str = "有效";
                            } else {
                                status == 0;
                                status_str = "无效";
                            }
                            ;
                            str += '<tr class="role-tr">'
                                + '<td class="cus-id">'
                                + id
                                + '</td>'

                                + '<td class="cus-enName">'
                                + (enName == undefined ? " " : enName)
                                + '</td>'
                                + '<td class="cus-cnName">'
                                + (cnName == undefined ? " "
                                    : cnName)
                                + '</td>'
                                + '<td class="cus-value">'
                                + (value == undefined ? " "
                                    : value)
                                + '</td>'
                                + '<td class="cus-description" style="display: none">'
                                + description
                                + '</td>'
                                + '<td class="cus-status_str" >'
                                + status_str
                                + '</td>'
                                + '<td class="cus-status" style="display: none">'
                                + status
                                + '</td>'
                                + '<td class="cus-createdatetime">'
                                + (createdatetime == undefined ? " "
                                    : createdatetime)
                                + '</td>'
                                + '<td class="cus-modifydatetime">'
                                + (modifydatetime == undefined ? " "
                                    : modifydatetime)
                                + '</td>'
                                + '<td>'
                                + '<div class="hidden-sm hidden-xs btn-group">'

                                + '<button class="btn btn-xs btn-info btn-update"  data-toggle="modal" data-target="#myModal2">'
                                + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                + '修改'
                                + '</button>'
                                + '<button class="btn btn-xs btn-danger btn-delete" >'
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
                        cont: 'rights_page',// 分页id
                        pages: pages,
                        jump: function (obj) { // 容器id
                            document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                        }
                    });
                },
                error: function () {
                },

            })
        },
        // 查询菜单
        search: function () {
            var that = this;
            $("#btn_query").on('click', function () {

                that.load();
            });
        },
        //添加菜单名时候校验菜单名
        checkName_add: function () {

            var that = this;
            $("#enName_add").on('blur',  function () {
                var enName = $('#enName_add').val();

                //如果输入框为空或者包含空格,报错
                if (enName == "" || (enName.indexOf(" ") != -1)) {
                    return false;
                }

                $.ajax({
                    url: "/checkParameterName",
                    type: "GET",
                    data: {
                       "enName":enName
                    },
                    success: function (data) {
                        if (data == 0) {
                            $('#add-enName-true').show();
                            $('#add-enName-false').hide();
                            $('#btn_add').attr("disabled", false);
                        } else {
                            $('#add-enName-true').hide();
                            $('#add-enName-false').show();
                            $('#btn_add').attr("disabled", true);
                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });
        },



        checkName_update: function () {

            var that = this;
            $("#enName_update").on('blur',  function () {
                var enName = $('#enName_update').val();
                var id = $('#id_update').val();
                //如果输入框为空或者包含空格,报错
                if (enName == "" || (enName.indexOf(" ") != -1)) {
                    return false;
                }

                $.ajax({
                    url: "/checkParameterName",
                    type: "GET",
                    data: {
                        "id":id,
                        "enName":enName
                    },
                    success: function (data) {
                        if (data == 0) {
                            $('#update-enName-true').show();
                            $('#update-enName-false').hide();
                            $('#btn_update').attr("disabled", false);
                        } else {
                            $('#update-enName-true').hide();
                            $('#update-enName-false').show();
                            $('#btn_update').attr("disabled", true);
                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });
        },



        // 删除
        deleteEvent: function () {
            var that = this;
            $("#role-manage-role").on('click', '.btn-delete', function () {
                // 要删除的索引 删除DOM树

                var id = $(this).parents('.role-tr').find('.cus-id').text();

                if (confirm('确定要删除么')) {
                    $(this).parents('.role-tr').remove();
                    $.ajax({
                        url: "/parameterDelete",
                        type: "POST",
                        data: {
                            "id": id // 上传编号
                        },
                        success: function (data) {
                            if (data=="1"){
                                location = location;// 页面刷新
                                //menuManager.loadMenu();
                            }

                        },
                        error: function () {
                        }
                    });

                }
            });
        },


        // 点击修改展示客户

        updateView: function () {

            var that = this;
            $("#role-manage-role").on('click', '.btn-update', function () {
                var id = $(this).parents('.role-tr').find('.cus-id').text();

                $.ajax({
                    url: "/parameterOne",
                    type: "GET",
                    dataType: 'json',
                    data:{
                        "id": id
                    },
                    success: function (data) {
                        $('#id_update').val(data.id);
                        $('#enName_update').val(data.enName);
                        $('#cnName_update').val(data.cnName);
                        $('input[name="status_update"][value="' + data.status + '"]').prop('checked', true);
                        $('#value_update').val(data.value);
                        $('#description_update').val(data.description);

                    },
                    error: function () {
                    }
                });
            });

        },


        // 点击关闭后刷新页面
        modalclose: function () {
            var that = this;
            $(".modal-content-update").on('click', '.modal-close', function () {

                location.reload();
            });
        },


        // 添加菜单提交
        addSubmit: function () {
            var that = this;
            $("#btn_add").on('click', function () {

                var enName = $('#enName_add').val(),
                    cnName = $('#cnName_add').val(),
                    status = $("input[name='status_add']:checked").val(),
                    value = $('#value_add').val(),
                    description = $('#description_add').val();


                if (enName == "") {
                    $('#enName_add').focus();
                    return false;
                } else if (value == "") {
                    $('#value_add').focus();
                    return false;
                }


                jsonData = {
                    "enName": enName,// 1
                    "cnName": cnName,// 2
                    "status": status,// 3
                    "value": value,// 4
                    "description": description
                };

                for (var key in jsonData) {
                    if (jsonData[key] == "") {
                        delete jsonData[key];
                    }
                }


                $.ajax({
                    url: "/parameterAdd",
                    type: "POST",
                    data: jsonData,
                    success: function (data) {

                        if (data == "1") {
                            $('#myModal1').hide();
                            $('.modal-backdrop').hide();

                            location = location;//页面刷新
                            //Manager.load();
                        }

                    },
                    error: function () {
                    }
                });

            });
        },
        //修改
        updateSubmit: function () {
            var that = this;
            $("#btn_submit").on('click', function () {
                var id = $('#id_update').val(),
                    enName = $('#enName_update').val(),
                    cnName = $('#cnName_update').val(),
                    status = $("input[name='status_update']:checked").val(),
                    value = $('#value_update').val(),
                    description = $('#description_update').val();


                if (enName == "") {
                    $('#enName_update').focus();
                    return false;
                } else if (value == "") {
                    $('#value_update').focus();
                    return false;
                }


                jsonData = {
                    "id": id,
                    "enName": enName,
                    "cnName": cnName,
                    "status": status,
                    "value": value,
                    "description": description
                };

                for (var key in jsonData) {
                    if (jsonData[key] == "") {
                        delete jsonData[key];
                    }
                }
                $.ajax({
                    url: "/parameterEdit",
                    type: "POST",
                    data: jsonData,
                    success: function (data) {

                        if (data == "1") {
                            $('#myModal2').hide();
                            $('.modal-backdrop').hide();
                            location = location;//页面刷新
                        }

                    },
                    error: function () {
                    }
                });

            });
        },
    };
    Manager.init();

});