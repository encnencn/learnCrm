/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {

    var adminManager = {
        adminManager: $("#role-manage-role table tbody"),
        init: function () {
            this.fillSelectList();//填充选择角色下拉列表
            this.addAdmin();
            this.queryAdmin();
            this.loadAdmin();
            this.deleteAdmin();
            this.updateAdminView();// 修改展示用户
            this.updateAdminSubmit();// 修改提交用户
            this.addCheckAdminName();//添加用户，校验用户名是否存在
            this.updateCheckAdminName();//修改用户，校验用户名是否存在
            this.addCheckEmail();//添加输入触发检测邮箱格式
            this.updateCheckEmail();//修改输入触发检测邮箱格式
            this.addCheckMobile();//添加输入触发检测手机格式
            this.updateCheckMobile();//修改输入触发检测手机格式

        },
        //修改邮箱时候校验邮箱
        rights_allPage: $("#rights_allPage"),

        //添加手机时触发校验手机格式
        addCheckMobile: function () {
            var that = this;
            $("#myModalAdd").on('input', '#form-field-mobile', function () {

                var mobile = $(this).parents('.modal-content-add').find('#form-field-mobile').val();

                //如果输入框包含空格或不符合格式,报错
                var testMobile = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
                if ((!testMobile.test(mobile)) || (mobile.indexOf(" ") != -1)) {
                    $('#add-mobile-true').hide();
                    $('#add-mobile-false').show();
                    $('.btn-primary-add').attr("disabled", true);
                    return false;
                } else {
                    $('#add-mobile-true').show();
                    $('#add-mobile-false').hide();
                    $('.btn-primary-add').attr("disabled", false);
                    return true;
                }

            });

        },
        //修改手机时触发校验手机格式
        updateCheckMobile: function () {
            var that = this;
            $("#myModalUpdate").on('input', '#form-field-mobile', function () {

                var mobile = $(this).parents('.modal-content-update').find('#form-field-mobile').val();

                //如果输入框包含空格或不符合格式,报错
                var testMobile = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
                if ((!testMobile.test(mobile)) || (mobile.indexOf(" ") != -1)) {
                    $('#update-mobile-true').hide();
                    $('#update-mobile-false').show();
                    $('.btn-primary-update').attr("disabled", true);
                    return false;
                } else {
                    $('#update-mobile-true').show();
                    $('#update-mobile-false').hide();
                    $('.btn-primary-update').attr("disabled", false);
                    return true;
                }

            });

        },
        //添加邮箱时触发校验邮箱格式
        addCheckEmail: function () {
            var that = this;
            $("#myModalAdd").on('input', '#form-field-email', function () {

                var email = $(this).parents('.modal-content-add').find('#form-field-email').val();

                //如果输入框包含空格或不符合格式,报错
                var testEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                if ((!testEmail.test(email)) || (email.indexOf(" ") != -1)) {
                    $('#add-email-true').hide();
                    $('#add-email-false').show();
                    $('.btn-primary-add').attr("disabled", true);
                    return false;
                } else {
                    $('#add-email-true').show();
                    $('#add-email-false').hide();
                    $('.btn-primary-add').attr("disabled", false);
                    return true;
                }

            });

        },
        //修改邮箱时触发校验邮箱格式
        updateCheckEmail: function () {
            var that = this;
            $("#myModalUpdate").on('input', '#form-field-email', function () {

                var email = $(this).parents('.modal-content-update').find('#form-field-email').val();

                //如果输入框包含空格或不符合格式,报错
                var testEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                if ((!testEmail.test(email)) || (email.indexOf(" ") != -1)) {
                    $('#update-email-true').hide();
                    $('#update-email-false').show();
                    $('.btn-primary-update').attr("disabled", true);
                    return false;
                } else {
                    $('#update-email-true').show();
                    $('#update-email-false').hide();
                    $('.btn-primary-update').attr("disabled", false);
                    return true;
                }

            });

        },

        updateCheckAdminName: function () {

            var that = this;
            $("#myModalUpdate").on('input', '#userName_update', function () {

                var id = $(this).parents('.modal-content-update').find('#form-field-id').val();
                var username = $(this).parents('.modal-content-update').find('#userName_update').val();
                var username = $(this).parents('.modal-content-update').find('#userName_update').val();

                //如果输入框为空或者包含空格,报错
                if (username == "" || (username.indexOf(" ") != -1)) {
                    $('#update-name-true').hide();
                    $('#update-name-false').show();
                    $('.btn-primary-update').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/updateCheckAdminName",
                    type: "POST",
                    data: "id=" + id + "&username=" + username,
                    success: function (data) {
                        if (data) {
                            $('#update-name-true').show();
                            $('#update-name-false').hide();
                            $('.btn-primary-update').attr("disabled", false);
                        } else {
                            $('#update-name-true').hide();
                            $('#update-name-false').show();
                            $('.btn-primary-update').attr("disabled", true);

                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });

        },

        //添加用户时候校验用户名

        addCheckAdminName: function () {

            var that = this;
            $("#myModalAdd").on('input', '#userName_update', function () {

                var username = $(this).parents('.modal-content-add').find('#userName_update').val();

                //如果输入框为空或者包含空格,报错
                if (username == "" || (username.indexOf(" ") != -1)) {
                    $('#add-name-true').hide();
                    $('#add-name-false').show();
                    $('.btn-primary-add').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/addCheckAdminName",
                    type: "POST",
                    data: "username=" + username,
                    success: function (data) {

                        if (data) {
                            $('#add-name-true').show();
                            $('#add-name-false').hide();
                            $('.btn-primary-add').attr("disabled", false);
                        } else {
                            $('#add-name-true').hide();
                            $('#add-name-false').show();
                            $('.btn-primary-add').attr("disabled", true);

                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });

        },


        //填充选择角色下拉列表
        fillSelectList: function () {
            $(function () {
                $.ajax({
                    url: "/queryAllRole",
                    type: "POST",
                    data: 'json',
                    success: function (data) {
                        //alert(JSON.stringify(data));
                        var str = '';
                        for (var i = 0; i < data.length; i++) {
                            str += "<option value='" + data[i].id + "'>" + data[i].name + '</option>';
                        }
                        $(".suoshuRole-add").html(str);

                    },
                    error: function () {
                    }

                });

                $.ajax({
                    url: "/queryAllDepartment",
                    type: "POST",
                    data: 'json',
                    success: function (data) {
                        var str = '';
                        for (var i = 0; i < data.length; i++) {
                            str += "<option value='" + data[i].id + "'>" + data[i].departmentName + '</option>';
                        }
                        $(".suoshuDepartment-add").html(str);

                    },
                    error: function () {
                    }

                });
            });
        },

        // 点击修改展示用户
        updateAdminView: function () {
            var that = this;
            $("#role-manage-role").on('click', '.btn-update-view', function () {

                // 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
                var id = $(this).parents('.role-tr').find(
                    '.id').text();

                $.ajax({
                    url: "/updateAdminView",
                    dataType: 'json',
                    type: "POST",
                    data: {
                        "id": id,
                    },// 上传编号
                    success: function (data) {
                        //alert(JSON.stringify(data));
                        $('.modal-content-update')
                            .find('#form-field-id')
                            .val(data.id);
                        $('.modal-content-update')
                            .find('#userName_update')
                            .val(data.username);
                        $('.modal-content-update')
                            .find('#form-field-password')
                            .val(data.password);
                        $('.modal-content-update')
                            .find('#form-field-mobile')
                            .val(data.mobile);
                        $('.modal-content-update')
                            .find('#form-field-trueName')
                            .val(data.trueName);
                        $('.modal-content-update')
                            .find('#form-field-email')
                            .val(data.email);
                        $('.modal-content-update')
                            .find('#form-field-isDisable')
                            .val(data.isDisable);
                        $('.modal-content-update')
                            .find('#form-field-suoshuRole')
                            .val(data.roleId);
                        $('.modal-content-update')
                            .find('#form-field-suoshuDepartment')
                            .val(data.departmentId);
                        $('.modal-content-update')
                            .find('#form-field-remark')
                            .val(data.remark);
                    },

                    error: function () {
                    }
                });

            });

        },

        // 修改角色后提交
        updateAdminSubmit: function () {
            var that = this;
            $(".modal-footer-updateAdmin").on(
                'click',
                '.btn-primary-update',
                function () {

                    var
                        id = $(this).parents('.modal-content').find(
                            '#form-field-id').val();
                    username = $(this).parents('.modal-content').find(
                        '#userName_update').val();
                    password = $(this).parents('.modal-content').find(
                        '#password_update').val();
                    mobile = $(this).parents('.modal-content').find(
                        '#mobile_update').val();
                    trueName = $(this).parents('.modal-content').find(
                        '#trueName_update').val();
                    email = $(this).parents('.modal-content').find(
                        '#email_update').val();
                    isDisable = $(this).parents('.modal-content').find(
                        '#isDisable_update').val();
                    roleId = $(this).parents('.modal-content').find(
                        '#suoshuRole_update').val();
                    departmentId = $(this).parents('.modal-content').find(
                        '#suoshuDepartment_update').val();
                    remark = $(this).parents('.modal-content').find(
                        '#remark_update').val();

                    if (username == "") {
                        $(this).parents('.modal-content').find('#userName_update').focus();
                        return false;
                    } else if (password == "") {
                        $(this).parents('.modal-content').find('#password_update').focus();
                        return false;
                    } else if (mobile == "") {
                        $(this).parents('.modal-content').find('#mobile_update').focus();
                        return false;
                    } else if (trueName == "") {
                        $(this).parents('.modal-content').find('#trueName_update').focus();
                        return false;
                    } else if (email == "") {
                        $(this).parents('.modal-content').find('#email_update').focus();
                        return false;
                    } else if (isDisable == "") {
                        $(this).parents('.modal-content').find('#isDisable_update').focus();
                        return false;
                    }
//			               else if(remark==""){
//			            	   $(this).parents('.modal-content').find('#form-field-remark').focus();
//			            	   return false;
//			               }
                    jsonDate = {
                        "id": id,// 0
                        "username": username,// 1
                        "password": password,// 2
                        "mobile": mobile,// 3
                        "trueName": trueName,// 4
                        "email": email,// 5
                        "isDisable": isDisable,// 6
                        "roleId": roleId,// 7
                        "departmentId": departmentId,// 8
                        "remark": remark,// 9

                    };

                    for (var key in jsonDate) {
                        if (jsonDate[key] == "") {
                            delete jsonDate[key];
                        }
                    }
                    //alert(JSON.stringify(jsonDate));

                    $.ajax({
                        url: "/updateAdminSubmit",
                        type: "POST",
                        data: jsonDate,
                        success: function (data) {

                            /*if (data == "NameExist") {
                                $('.name-exist').html("菜单名称已存在,或为空！");
                            } else if (data == "CodeExist") {
                                $('.code-exist').html("菜单编码已存在,或为空！");
                            } else if (data == "linkNull") {
                                $('.ismenu-null').html("是否子菜单为空！");
                            } else if (data == "TrueNull") {
                                $('.url-null').html("URL为空！");
                            } else {*/
                            $('#myModal2').hide();
                            $('.modal-backdrop').hide();
                            // customerManager.init();
                            location = location;// 页面刷新
                            adminManager.loadAdmin();
                            //}

                        },
                        error: function () {
                        }
                    });
                    // 删除后要更新数据库，并且更新页面
                });
        },

        //添加用户

        addAdmin: function () {

            var that = this;
            $(".addAdmin").on('click', '.btn-primary-add', function () {

                var username = $(this).parents('.modal-content-add').find('#userName_add').val();
                var password = $(this).parents('.modal-content-add').find('#password_add').val();
                var password1 = hex_md5(password);

                var mobile = $(this).parents('.modal-content-add').find('#mobile_add').val();
                var trueName = $(this).parents('.modal-content-add').find('#trueName_add').val();
                var email = $(this).parents('.modal-content-add').find('#email_add').val();
                var isDisable = $(this).parents('.modal-content-add').find("#isDisable_add").val();
                var roleId = $(this).parents('.modal-content-add').find("#suoshuRole_add").val();
                var departmentId = $(this).parents('.modal-content-add').find("#suoshuDepartment_add").val();
                var remark = $(this).parents('.modal-content-add').find('#remark_add').val();

                if (username == "") {
                    $(this).parents('.modal-content-add').find('#userName_add').focus();
                    return false;
                } else if (password == "") {
                    $(this).parents('.modal-content-add').find('#password_add').focus();
                    return false;
                } else if (mobile == "") {
                    $(this).parents('.modal-content-add').find('#mobile_add').focus();
                    return false;
                } else if (trueName == "") {
                    $(this).parents('.modal-content-add').find('#trueName_add').focus();
                    return false;
                } else if (email == "") {
                    $(this).parents('.modal-content-add').find('#email_add').focus();
                    return false;
                } else if (isDisable == "") {
                    $(this).parents('.modal-content-add').find('#isDisable_add').focus();
                    return false;
                }
//               else if(remark==""){
//            	   $(this).parents('.modal-content-add').find('#form-field-remark').focus();
//            	   return false;
//               }

                $.ajax({
                    url: "/addAdmin",
                    type: "POST",
                    data: "username=" + username + "&password=" + password1 + "&mobile=" + mobile + "&trueName=" + trueName
                    + "&email=" + email + "&remark=" + remark + "&isDisable=" + isDisable + "&roleId=" + roleId
                    + "&departmentId=" + departmentId,
                    success: function () {
                        $('#myModalAdd').hide();
                        $('.modal-backdrop').hide();
                        location = location;// 页面刷新
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });

        },

        //加载列表
        loadAdmin: function () {
            var that = this;
            $.ajax({
                url: '/queryAllAdmin',
                data: 'json',
                type: "get",
                success: function (data) {

                    var nums = 5; // 每页出现的数量
                    var pages = Math.ceil(data.length / nums); // 得到总页数
                    var allPages = data.length;
                    var thisDate = function (curr) {
                        // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                        var str = '', last = curr * nums - 1;
                        last = last >= data.length ? (data.length - 1) : last;
                        for (var i = (curr * nums - nums); i <= last; i++) {

                            var username = data[i].username,
                                id = data[i].id,
                                mobile = data[i].mobile,
                                trueName = data[i].trueName,
                                email = data[i].email,
                                remark = data[i].remark,
                                isDisable = '',
                                name = data[i].rolename,
                                departmentname = data[i].departmentname;

                            if (data[i].isDisable == 0) {
                                isDisable = "启用";
                            } else if (data[i].isDisable == 1) {
                                isDisable = "禁用";
                            } else {

                            }


                            str += '<tr class="role-tr">' +
                                '<td class="id" >' + id + '</td>' +
                                '<td class="username">' + (username == undefined ? " " : username) + '</td>' +
                                '<td class="mobile">' + (mobile == undefined || mobile == null ? " " : mobile) + '</td>' +
                                '<td class="trueName">' + (trueName == undefined || trueName == null ? " " : trueName) + '</td>' +
                                '<td class="email">' + (email == undefined || email == null ? " " : email) + '</td>' +
                                '<td class="isDisable">' + (isDisable == undefined || isDisable == null ? " " : isDisable) + '</td>' +
                                '<td class="name">' + (name == undefined || name == null ? " " : name) + '</td>' +
                                '<td class="departmentname">' + (departmentname == undefined || departmentname == null ? " " : departmentname) + '</td>'
                                + '<td>'
                                + '<div class="hidden-sm hidden-xs btn-group">'
                                + '<button class="btn btn-xs btn-info btn-update btn-update-view" data-toggle="modal" data-target="#myModalUpdate">'
                                + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                + '修改'
                                + '</button>'
                                + '<button class="btn btn-xs btn-danger btn-delete"  >'
                                + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                + '删除'
                                + '</button>'
                                + '</div>'
                                + '</td>'
                                + '<td style="display: none;" class="adminid">' + id + '</td>'
                                + '</tr>'
                            ;
                        }
                        that.rights_allPage.text("显示" + nums + "条记录，共" + allPages + "条");
                        return str;
                    };

                    // 调用分页
                    laypage({
                        cont: 'rights_page',// 分页id
                        pages: pages,
                        jump: function (obj) {       // 容器id
                            document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                        }
                    });

                }

            });

        },

        //用户查询
        queryAdmin: function () {
            var that = this;
            $("#btn_query").on('click', function () {

                var name = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");
                if (name == "") {
                    location = location;
                    return false;
                }
                $.ajax({
                    url: "/queryByTrueName",
                    type: "POST",
                    data: "name=" + name,
                    success: function (data) {

                        $('#myModalQuery').hide();
                        $('.modal-backdrop').hide();

                        var nums = 5; // 每页出现的数量
                        var pages = Math.ceil(data.length / nums); // 得到总页数
                        var allPages = data.length;
                        var thisDate = function (curr) {
                            // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                            var str = '', last = curr * nums - 1;
                            last = last >= data.length ? (data.length - 1) : last;
                            for (var i = (curr * nums - nums); i <= last; i++) {

                                var username = data[i].username,
                                    id = data[i].id,
                                    mobile = data[i].mobile,
                                    trueName = data[i].trueName,
                                    email = data[i].email,
                                    remark = data[i].remark,
                                    //isDisable=data[i].isDisable,
                                    isDisable = '',
                                    name = data[i].rolename,
                                    departmentname = data[i].departmentname;

                                if (data[i].isDisable == 0) {
                                    isDisable = "启用";
                                } else if (data[i].isDisable == 1) {
                                    isDisable = "禁用";
                                } else {

                                }

                                str += '<tr class="role-tr">' +
                                    '<td class="id" ">' + id + '</td>' +
                                    '<td class="username">' + username + '</td>' +
                                    '<td class="mobile">' + mobile + '</td>' +
                                    '<td class="trueName">' + trueName + '</td>' +
                                    '<td class="email">' + email + '</td>' +

                                    '<td class="isDisable">' + isDisable + '</td>' +
                                    '<td class="name">' + name + '</td>' +
                                    '<td class="departmentname">' + departmentname + '</td>'
                                    + '<td>'
                                    + '<div class="hidden-sm hidden-xs btn-group">'
                                    + '<button class="btn btn-xs btn-info btn-update btn-update-view" data-toggle="modal" data-target="#myModalUpdate">'
                                    + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                    + '修改'
                                    + '</button>'
                                    + '<button class="btn btn-xs btn-info btn-delete"  >'
                                    + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                    + '删除'
                                    + '</button>'
                                    + '</div>'
                                    + '</td>'
                                    + '<td style="display: none;" class="adminid">' + id + '</td>'
                                    + '</tr>'
                                ;
                            }

                            that.rights_allPage.text("显示" + nums + "条记录，共" + allPages + "条");
                            return str;
                        };

                        // 调用分页
                        laypage({
                            cont: 'rights_page',// 分页id
                            pages: pages,
                            jump: function (obj) {       // 容器id
                                document.getElementById('rights_list').innerHTML = thisDate(obj.curr);
                            }
                        });

                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });

        },

        //用户删除
        deleteAdmin: function () {
            var that = this;
            $("#role-manage-role").on('click', '.btn-delete', function () {

                var id = $(this).parents('.role-tr').find('.id').html();

                $.ajax({
                    url: "/deleteAdmin",
                    type: "POST",
                    data: "id=" + id,
                    success: function () {

                        location = location;// 页面刷新
                    },
                    error: function () {
                    }
                });
            });
        }

    };

    adminManager.init();
});