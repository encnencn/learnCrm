/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {
    var menuManager = {
        menuManager: $("#role-manage-role table tbody"),
        init: function () {
            this.loadMenu();

            this.searchMenu();// 查询用户
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


        // 查询菜单
        searchMenu: function () {
            var that = this;
            $("#btn_query")
                .on(
                    'click',

                    function () {

                        var functionname = $('#query_name').val().replace(/(^\s*)|(\s*$)/g, "");
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

                                        var id = data[i].id, fatherName = data[i].fatherName, name = data[i].name,
                                            menuCode = data[i].menuCode,

                                            url = data[i].url;
                                        action = data[i].action;
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


        // 点击关闭后刷新页面
        modalclose: function () {
            var that = this;
            $(".modal-content-update").on('click', '.modal-close', function () {

                location.reload();
            });
        },


    };
    menuManager.init();

});