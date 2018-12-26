/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {
    var menuManager = {
        menuManager: $("#role-manage-role table tbody"),
        init: function () {
            this.loadMenu();
            this.deleteMenu();// 删除菜单
            this.addMenuView();// 添加客户展示
            this.addMenuSubmit(); // 添加客户提交
            this.updateMenuSubmit();// 修改提交菜单
            this.updateMenuView();// 修改展示菜单
            this.searchMenu();// 查询菜单
            this.checkMenuName_add();//添加菜单，校验菜单名是否存在
            this.checkMenuName_update();//修改菜单，校验菜单名是否存在
            this.checkMenuCode_add();//添加编码，校验菜单名是否存在
            this.checkMenuCode_update();//修改编码，校验菜单名是否存在
            // this.modalclose();//点击关闭刷新页面

        },


        rights_allPage: $("#rights_allPage"),
        loadMenu: function () {
            var that = this;
            $.ajax({
                url: '/menuList',
                dataType: 'json',
                type: "GET",
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
                                fatherName = data[i].fatherName,
                                name = data[i].name,
                                menuCode = data[i].menuCode,
                                url = data[i].url,
                                action = data[i].action,
                                isMenu = '',
                                priority = data[i].priority;


                            if (data[i].isMenu == 0) {
                                isMenu = "父菜单";
                            } else if (data[i].isMenu == 1) {
                                isMenu = "子菜单";
                            }
                            ;
                            str += '<tr class="role-tr">'
                                + '<td class="cus-id">'
                                + id
                                + '</td>'

                                + '<td class="cus-name">'
                                + (name == undefined ? " " : name)
                                + '</td>'
                                + '<td class="cus-menuCode">'
                                + (menuCode == undefined ? " "
                                    : menuCode)
                                + '</td>'
                                + '<td class="cus-isMenu">'
                                + isMenu
                                + '</td>'
                                + '<td class="cus-fatherName">'
                                + (fatherName == undefined ? " "
                                    : fatherName)
                                + '</td>'
                                + '<td class="cus-url">'
                                + (url == undefined ? " " : url)
                                + '</td>'
                                + '<td class="cus-action">'
                                + (action == undefined ? " "
                                    : action)
                                + '</td>'
                                + '<td class="cus-priority">'
                                + (priority == undefined ? " "
                                    : priority)
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

        //添加菜单名时候校验菜单名
        rights_allPage: $("#rights_allPage"),
        checkMenuName_add: function () {

            var that = this;
            $("#myModal1").on('input', '#form-field-1', function () {
                var menuName = $(this).parents('.modal-content-add').find('#form-field-1').val();

                //如果输入框为空或者包含空格,报错
                if (menuName == "" || (menuName.indexOf(" ") != -1)) {
                    $('#add-name-true').hide();
                    $('#add-name-false').show();
                    $('.btn-customer-add').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/checkMenuName",
                    type: "POST",
                    data: "name=" + menuName,
                    success: function (data) {
                        if (data) {
                            $('#add-name-true').show();
                            $('#add-name-false').hide();
                            $('.btn-customer-add').attr("disabled", false);
                        } else {
                            $('#add-name-true').hide();
                            $('#add-name-false').show();
                            $('.btn-customer-add').attr("disabled", true);
                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });
        },

        //添加编码时候校验菜单编码
        rights_allPage: $("#rights_allPage"),
        checkMenuCode_add: function () {

            var that = this;
            $("#myModal1").on('input', '#form-field-2', function () {
                var menuCode = $(this).parents('.modal-content-add').find('#form-field-2').val();

                //如果输入框为空或者包含空格,报错
                if (menuCode == "" || (menuCode.indexOf(" ") != -1)) {
                    $('#add-code-true').hide();
                    $('#add-code-false').show();
                    $('.btn-customer-add').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/checkMenuCode",
                    type: "POST",
                    data: "menuCode=" + menuCode,
                    success: function (data) {
                        if (data && menuCode != '') {
                            $('#add-code-true').show();
                            $('#add-code-false').hide();
                            $('.btn-customer-add').attr("disabled", false);
                        } else {
                            $('#add-code-true').hide();
                            $('#add-code-false').show();
                            $('.btn-customer-add').attr("disabled", true);
                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });
        },

        //修改菜单时候校验菜单名
        rights_allPage: $("#rights_allPage"),
        checkMenuName_update: function () {

            var that = this;
            $("#myModal2").on('input', '#form-field-1', function () {
                var id = $(this).parents('.modal-content-update').find('#form-field-0').val();
                var menuName = $(this).parents('.modal-content-update').find('#form-field-1').val();

                //如果输入框为空或者包含空格,报错
                if (menuName == "" || (menuName.indexOf(" ") != -1)) {
                    $('#update-name-true').hide();
                    $('#update-name-false').show();
                    $('.btn-customer-update').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/checkMenuName",
                    type: "POST",
                    data: "id=" + id + "&name=" + menuName,
                    success: function (data) {
                        if (data) {
                            $('#update-name-true').show();
                            $('#update-name-false').hide();
                            $('.btn-customer-update').attr("disabled", false);
                        } else {
                            $('#update-name-true').hide();
                            $('#update-name-false').show();
                            $('.btn-customer-update').attr("disabled", true);

                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });
        },


        //修改菜单时候校验菜单编码
        rights_allPage: $("#rights_allPage"),
        checkMenuCode_update: function () {

            var that = this;
            $("#myModal2").on('input', '#form-field-2', function () {
                var id = $(this).parents('.modal-content-update').find('#form-field-0').val();
                var menuCode = $(this).parents('.modal-content-update').find('#form-field-2').val();

                //如果输入框为空或者包含空格,报错
                if (menuCode == "" || (menuCode.indexOf(" ") != -1)) {
                    $('#update-code-true').hide();
                    $('#update-code-false').show();
                    $('.btn-customer-update').attr("disabled", true);
                    return false;
                }

                $.ajax({
                    url: "/checkMenuCode",
                    type: "POST",
                    data: "id=" + id + "&menuCode=" + menuCode,
                    success: function (data) {
                        if (data && menuCode != '') {
                            $('#update-code-true').show();
                            $('#update-code-false').hide();
                            $('.btn-customer-update').attr("disabled", false);
                        } else {
                            $('#update-code-true').hide();
                            $('#update-code-false').show();
                            $('.btn-customer-update').attr("disabled", true);

                        }
                    },
                    error: function () {
                    }
                });
                // 删除后要更新数据库，并且更新页面
            });


        },
        // 删除菜单
        deleteMenu: function () {
            var that = this;
            $("#role-manage-role").on('click', '.btn-delete', function () {
                // 要删除的索引 删除DOM树

                var id = $(this).parents('.role-tr').find('.cus-id').text();

                if (confirm('确定要删除么')) {
                    $(this).parents('.role-tr').remove();
                    $.ajax({
                        url: "/deleteMenu",
                        type: "POST",
                        data: {
                            "id": id, // 上传编号
                        },
                        success: function () {
                            // customerManager.init();
                            location = location;// 页面刷新
                            menuManager.loadMenu();
                        },
                        error: function () {
                        }
                    });

                }
            });
        },

        // 查询菜单
        searchMenu: function () {
            var that = this;
            $("#btn_query").on('click', function () {

                var functionname = $('#query_menuName').val().replace(/(^\s*)|(\s*$)/g, "");
                if (functionname == "") {
                    location = location;
                    return false;
                }

                $.ajax({
                    url: "/searchMenu",
                    dataType: 'json',
                    type: "POST",
                    data: {
                        "functionname": functionname,
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
                                    fatherName = data[i].fatherName,
                                    name = data[i].name,
                                    menuCode = data[i].menuCode,
                                    isMenu = '',
                                    url = data[i].url,
                                    action = data[i].action,
                                    priority = data[i].priority;

                                if (data[i].isMenu == 0) {
                                    isMenu = "父菜单";
                                } else if (data[i].isMenu == 1) {
                                    isMenu = "子菜单";
                                }
                                ;
                                str += '<tr class="role-tr">'
                                    + '<td class="cus-id">'
                                    + id
                                    + '</td>'

                                    + '<td class="cus-name">'
                                    + (name == undefined ? " "
                                        : name)
                                    + '</td>'
                                    + '<td class="cus-menuCode">'
                                    + (menuCode == undefined ? " "
                                        : menuCode)
                                    + '</td>'
                                    + '<td class="cus-isMenu">'
                                    + isMenu
                                    + '</td>'
                                    + '<td class="cus-fatherName">'
                                    + (fatherName == undefined ? " "
                                        : fatherName)
                                    + '</td>'
                                    + '<td class="cus-url">'
                                    + (url == undefined ? " "
                                        : url)
                                    + '</td>'
                                    + '<td class="cus-action">'
                                    + (action == undefined ? " "
                                        : action)
                                    + '</td>'
                                    + '<td class="cus-priority">'
                                    + (priority == undefined ? " "
                                        : priority)
                                    + '</td>'
                                    + '<td>'
                                    + '<div class="hidden-sm hidden-xs btn-group">'

                                    + '<button class="btn btn-xs btn-info btn-update-view" data-toggle="modal" data-target="#myModal2">'
                                    + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                    + '修改'
                                    + '</button>'
                                    + '<button class="btn btn-xs btn-danger btn-delete">'
                                    + '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
                                    + '删除'
                                    + '</button>'

                                    + '</div>'
                                    + '</td>'

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

        // 点击修改展示客户

        updateMenuView: function () {
            var that = this;
            $("#role-manage-role")
                .on(
                    'click',
                    '.btn-update-view',
                    function () {
                        var updateCustomerViewHtml = "";
                        // 要删除的编号，需要上传服务器 编号唯一 服务器删除指定编号
                        var id = $(this).parents('.role-tr').find(
                            '.cus-id').text();

                        $.ajax({
                            url: "/selectAllFatherMenu",
                            type: "POST",
                            data: 'json',
                            success: function (data) {
                                testJson = $.parseJSON(data);
                                var str = '';
                                for (var i = 0; i < testJson.length; i++) {
                                    str += "<option value='"
                                        + testJson[i]
                                        + "'>"
                                        + testJson[i]
                                        + '</option>';
                                }
                                $(".allfathermenu").html(str);

                            },
                            error: function () {
                            }
                        });

                        $.ajax({
                            url: "/updateMenuView",
                            dataType: 'json',
                            type: "POST",
                            data: {
                                "id": id,
                            },// 上传编号
                            success: function (data) {

                                $('.modal-content-update')
                                    .find('#form-field-0')
                                    .val(data.id);
                                $('.modal-content-update')
                                    .find('#form-field-1')
                                    .val(data.name);
                                $('.modal-content-update')
                                    .find('#form-field-2')
                                    .val(data.menuCode);
                                $('.modal-content-update')
                                    .find('#form-field-3')
                                    .val(data.isMenu);
                                $('.modal-content-update')
                                    .find('#form-field-4')
                                    .val(data.fatherName);
                                $('.modal-content-update')
                                    .find('#form-field-5')
                                    .val(data.url);
                                $('.modal-content-update')
                                    .find('#form-field-6')
                                    .val(data.action);
                                $('.modal-content-update')
                                    .find('#form-field-7')
                                    .val(data.priority);

                            },

                            error: function () {
                            }
                        });

                    });

        },

        // 修改角色后提交
        updateMenuSubmit: function () {
            var that = this;
            $(".modal-footer-customer-update").on(
                'click',
                '.btn-customer-update',
                function () {

                    var id = $(this).parents('.modal-content').find(
                        '#form-field-0').val();
                    // alert(id);
                    name = $(this).parents('.modal-content').find(
                        '#form-field-1').val();
                    menuCode = $(this).parents('.modal-content').find(
                        '#form-field-2').val();
                    isMenu = $(this).parents('.modal-content').find(
                        '#form-field-3').val();
                    fatherName = $(this).parents('.modal-content').find(
                        '#form-field-4').val();
                    url = $(this).parents('.modal-content').find(
                        '#form-field-5').val();
                    action = $(this).parents('.modal-content').find(
                        '#form-field-6').val();
                    priority = $(this).parents('.modal-content').find(
                        '#form-field-7').val();

                    if (name == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-1').focus();
                        return false;
                    } else if (menuCode == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-2').focus();
                        return false;
                    } else if (isMenu == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-3').focus();
                        return false;
                    } else if (fatherName == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-4').focus();
                        return false;
                    } /*else if (url == "") {
							$(this).parents('.modal-content').find(
									'#form-field-5').focus();
							return false;
						}else if (action == "") {
							$(this).parents('.modal-content').find(
									'#form-field-6').focus();
							return false;
						}*/ else if (priority == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-7').focus();
                        return false;
                    }

                    jsonDate = {
                        "id": id,// 0
                        "name": name,// 1
                        "menuCode": menuCode,// 2
                        "isMenu": isMenu,// 3
                        "fatherName": fatherName,// 4
                        "url": url,// 5
                        "action": action,// 6
                        "priority": priority,// 7

                    };

                    for (var key in jsonDate) {
                        if (jsonDate[key] == "") {
                            delete jsonDate[key];
                        }
                    }
                    // alert(JSON.stringify(jsonDate));

                    $.ajax({
                        url: "/updateMenuSubmit2",
                        type: "POST",
                        data: jsonDate,
                        success: function (data) {

                            if (data == "NameExist") {
                                $('.name-exist').html("已存在！");
                            } else if (data == "CodeExist") {
                                $('.code-exist').html("已存在！");
                            } else {
                                $('#myModal2').hide();
                                $('.modal-backdrop').hide();
                                // customerManager.init();
                                location = location;// 页面刷新
                                menuManager.loadMenu();
                            }

                        },
                        error: function () {
                        }
                    });
                    // 删除后要更新数据库，并且更新页面
                });
        },
        // 点击关闭后刷新页面
        modalclose: function () {
            var that = this;
            $(".modal-content-update").on('click', '.modal-close', function () {

                location.reload();
            });
        },

        // 在菜单展示页面，点击菜单类型，选择子菜单后，查询所属父菜单，填充列表
        addMenuView: function () {
            var that = this;
            $(".modal-content-add").on('change', '#form-field-3', function () {

                $.ajax({
                    url: "/selectAllFatherMenu",
                    type: "POST",
                    data: 'json',
                    success: function (data) {
                        testJson = $.parseJSON(data);
                        var str = '';

                        for (var i = 0; i < testJson.length; i++) {
                            str += "<option value='" + testJson[i]
                                + "'>" + testJson[i] + '</option>';
                        }
                        $(".allfathermenu").html(str);
                    },

                    error: function () {
                    }
                });

                // 删除后要更新数据库，并且更新页面
            });
        },


        // 添加菜单提交
        addMenuSubmit: function () {
            var that = this;
            $(".modal-footer-customer-add").on(
                'click',
                '.btn-customer-add',
                function () {

                    var name = $(this).parents('.modal-content').find(
                        '#form-field-1').val();
                    menuCode = $(this).parents('.modal-content').find(
                        '#form-field-2').val();
                    isMenu = $(this).parents('.modal-content').find(
                        '#form-field-3').val();
                    fatherName = $(this).parents('.modal-content').find(
                        '#form-field-4').val();
                    url = $(this).parents('.modal-content').find(
                        '#form-field-5').val();
                    action = $(this).parents('.modal-content').find(
                        '#form-field-6').val();
                    priority = $(this).parents('.modal-content').find(
                        '#form-field-7').val();

                    if (name == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-1').focus();
                        return false;
                    } else if (menuCode == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-2').focus();
                        return false;
                    } else if (isMenu == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-3').focus();
                        return false;
                    } else if (fatherName == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-4').focus();
                        return false;
                    } /*else if (url == "") {
							$(this).parents('.modal-content').find(
									'#form-field-5').focus();
							return false;
						}*/
                    /*else if (action == "") {
                        $(this).parents('.modal-content').find(
                                '#form-field-6').focus();
                        return false;
                    }*/ else if (priority == "") {
                        $(this).parents('.modal-content').find(
                            '#form-field-7').focus();
                        return false;
                    }

                    jsonDate = {
                        "name": name,// 1
                        "menuCode": menuCode,// 2
                        "isMenu": isMenu,// 3
                        "fatherName": fatherName,// 4
                        "url": url,// 5
                        "action": action,// 6
                        "priority": priority,// 7
                    };

                    for (var key in jsonDate) {
                        if (jsonDate[key] == "") {
                            delete jsonDate[key];
                        }
                    }
                    // alert(JSON.stringify(jsonDate));

                    $.ajax({
                        url: "/addMenuSubmit",
                        type: "POST",
                        data: jsonDate,
                        success: function (data) {

                            if (data == "NameExist") {
                                $('.name-exist').html("已存在！");
                            } else if (data == "CodeExist") {
                                $('.code-exist').html("已存在！");
                            } else {
                                $('#myModal1').hide();
                                $('.modal-backdrop').hide();
                                //customerManager.init();
                                location = location;//页面刷新
                                menuManager.loadMenu();
                            }

                        },
                        error: function () {
                        }
                    });

                });
        },


    };
    menuManager.init();

});