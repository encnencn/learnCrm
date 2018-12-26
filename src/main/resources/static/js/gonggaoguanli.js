/**
 * Created by mingjie on 2017/1/11.
 */
$(function () {


    var noticeManage = {
        noticeManage: $("#role-manage-role table tbody"),
        init: function () {

            this.addNotice();
            this.queryNotice();
            this.updateNotice();
            this.loadRole();
            this.NoticeAdd();
            this.NoticeUpdate();
            this.createRTF();
        },
        rights_allPage: $("#rights_allPage"),
        NoticeAdd: function () {
            var that = this;
            $("#myModalAdd").on('input', '#form-field-titleadd', function () {
                var title = $("#myModalAdd").find('#form-field-titleadd').val();
                if (title == "") {
                    $("#myModalAdd").find('#noticeName').text("不能为空");
                } else if (title.split(" ").length != 1) {
                    $("#myModalAdd").find('#noticeName').text("不能包含空格");
                    return false;
                } else {
                    $.ajax({
                        url: "/noticeExistOrnot",
                        type: "POST",
                        data: {"title": title},
                        success: function (data) {
                            if (data) {
                                $("#myModalAdd").find('#noticeName').text("");
                            } else {
                                $("#myModalAdd").find('#noticeName').text("已经存在");
                                $("#myModalAdd").find('#form-field-titleadd').focus();
                                $(".addNotice").find('.btn-primary').disabled = true;
                            }
                        },
                        error: function () {
                        }
                    });
                }
            });
        },
        NoticeUpdate: function () {
            var that = this;
            $("#myModalUpdate").on('input', '#form-field-title', function () {
                var name = $("#myModalUpdate").find('#form-field-title').val();
                if (title == "") {
                    $("#myModalUpdate").find('#noticeName').text("不能为空");
                } else if (name.split(" ").length != 1) {
                    $("#myModalUpdate").find('#noticeName').text("不能包含空格");
                    return false;
                } else {
                    $.ajax({
                        url: "/noticeExistOrnot",
                        type: "POST",
                        data: {"name": name},
                        success: function (data) {
                            if (data) {
                                $("#myModalUpdate").find('#noticeName').text("");
                            } else {

                                $("#myModalUpdate").find('#noticeName').text("已经存在");
                                $("#myModalUpdate").find('#form-field-title').focus();
                                $(".updateNotice").find('.btn-primary').disabled = true;
                            }
                        },
                        error: function () {
                        }
                    });
                }
            });
        },
        addNotice: function () {
            var that = this;
            $(".addNotice").on('click', '.btn-primary', function () {

                var title = $(this).parents('.modal-content').find('#form-field-titleadd').val();
                var status = $(this).parents('.modal-content').find('#form-field-status').val();
                if (title == "") {
                    $("#myModalAdd").find('#noticeName').text("不能为空");
                } else if (title.split(" ").length != 1) {
                    $("#myModalAdd").find('#noticeName').text("不能包含空格");
                    return false;
                } else {
                    arr1 = $("#div1").html();
                    $.ajax({
                        url: "/addNotice",
                        type: "POST",
                        data: "title=" + title + "&content=" + arr1 + "&status=" + status,
                        success: function (data) {
                            if (data) {
                                $('#myModalAdd').hide();
                                $('.modal-backdrop').hide();
                                location = location;// 页面刷新
                            } else {
                                $("#myModalAdd").find('#noticeName').text("已经存在");
                                $("#myModalAdd").find('#form-field-titleadd').focus();
                                $(".addNotice").find('.btn-primary').disabled = true;
                            }

                        },
                        error: function () {
                        }
                    });
                }
                // 删除后要更新数据库，并且更新页面
            });


        }, loadRole: function () {
            var that = this;
            $.ajax({
                url: '/queryAllNotice',
                data: 'json',
                type: "post",
                success: function (data) {

                    var nums = 5; // 每页出现的数量
                    var pages = Math.ceil(data.length / nums); // 得到总页数
                    var allPages = data.length;
                    var thisDate = function (curr) {
                        // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                        var str = '', last = curr * nums - 1;
                        last = last >= data.length ? (data.length - 1) : last;
                        for (var i = (curr * nums - nums); i <= last; i++) {

                            var title = data[i].title,
                                id = data[i].id,
                                content = data[i].content,
                                status = data[i].status,
                                createTime = data[i].createTime;
                            adminName = data[i].trueName;
                            if (status == 0) {
                                status = "暂不发布";
                            } else {
                                status = "直接发布";
                            }
                            str += '<tr class="role-tr">' +

                                '<td class="title">' + title + '</td>' +
                                '<td class="status">' + status + '</td>' +
                                '<td >' + createTime + '</td>' +
                                '<td>' + adminName + '</td>'
                                + '<td>'
                                + '<div class="hidden-sm hidden-xs btn-group">'
                                + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
                                + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                + '修改'
                                + '</button>'

                                + '</div>'
                                + '</td>'
                                + '<td style="display: none;"><textarea class="content" >' + content + '</textarea></td>'
                                + '<td style="display: none;" class="titleid">' + id + '</td>'
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
                // success结束
                /* display(data); */


            });

        },
        queryNotice: function () {
            var that = this;
            $("#btn_query").on('click', function () {

                var title = $('#query_title').val().replace(/(^\s*)|(\s*$)/g, "");
                if (title == "") {
                    location = location;
                    return false;
                } else {

                    $.ajax({
                        url: "/queryByTitle",
                        type: "POST",
                        data: "title=" + title,
                        success: function (data) {

                            $('#myModalQuery').hide();
                            $('.modal-backdrop').hide();
                            /*
                              * location=location;//页面刷新
                              */
                            var nums = 5; // 每页出现的数量
                            var pages = Math.ceil(data.length / nums); // 得到总页数
                            var allPages = data.length;
                            var thisDate = function (curr) {
                                // 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
                                var str = '', last = curr * nums - 1;
                                last = last >= data.length ? (data.length - 1) : last;
                                for (var i = (curr * nums - nums); i <= last; i++) {

                                    var title = data[i].title,
                                        id = data[i].id,
                                        content = data[i].content,
                                        status = data[i].status,
                                        createTime = data[i].createTime;
                                    adminName = data[i].trueName;
                                    if (status == 0) {
                                        status = "暂不发布";
                                    } else {
                                        status = "直接发布";
                                    }
//      
                                    str += '<tr class="role-tr">' +
                                        /* '<td >'+title+'</td>'+ */
                                        '<td class="title">' + title + '</td>' +
                                        '<td class="status">' + status + '</td>' +
                                        '<td >' + createTime + '</td>' +
                                        '<td>' + adminName + '</td>'
                                        + '<td>'
                                        + '<div class="hidden-sm hidden-xs btn-group">'
                                        + '<button class="btn btn-xs btn-info btn-update" data-toggle="modal" data-target="#myModalUpdate">'
                                        + '<i class="ace-icon fa fa-pencil bigger-120" ></i>'
                                        + '修改'
                                        + '</button>'

                                        + '</div>'
                                        + '</td>'
                                        + '<td style="display: none;"><input class="content" >' + content + '</input></td>'
                                        + '<td style="display: none;" class="titleid">' + id + '</td>'
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
                } // 删除后要更新数据库，并且更新页面
            });

        },
        //生成富文本框
        createRTF:function(){
            function showErrorAlert (reason, detail) {
                var msg='';
                if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
                else {
                    //console.log("error uploading file", reason, detail);
                }
                $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+
                    '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
            }
            $('#div1,#div2').ace_wysiwyg({
                toolbar:
                    [
                        'font',
                        null,
                        'fontSize',
                        null,
                        {name:'bold', className:'btn-info'},
                        {name:'italic', className:'btn-info'},
                        {name:'strikethrough', className:'btn-info'},
                        {name:'underline', className:'btn-info'},
                        null,
                        {name:'insertunorderedlist', className:'btn-success'},
                        {name:'insertorderedlist', className:'btn-success'},
                        {name:'outdent', className:'btn-purple'},
                        {name:'indent', className:'btn-purple'},
                        null,
                        {name:'justifyleft', className:'btn-primary'},
                        {name:'justifycenter', className:'btn-primary'},
                        {name:'justifyright', className:'btn-primary'},
                        {name:'justifyfull', className:'btn-inverse'},
                        null,
                        {name:'createLink', className:'btn-pink'},
                        {name:'unlink', className:'btn-pink'},
                        null,
                        //{name:'insertImage', className:'btn-success'},
                        null,
                        'foreColor',
                        null,
                        {name:'undo', className:'btn-grey'},
                        {name:'redo', className:'btn-grey'}
                    ],
                'wysiwyg': {
                    fileUploadError: showErrorAlert
                }
            }).prev().addClass('wysiwyg-style4');
            if ( typeof jQuery.ui !== 'undefined' && ace.vars['webkit'] ) {

                var lastResizableImg = null;
                function destroyResizable() {
                    if(lastResizableImg == null) return;
                    lastResizableImg.resizable( "destroy" );
                    lastResizableImg.removeData('resizable');
                    lastResizableImg = null;
                }

                var enableImageResize = function() {
                    $('.wysiwyg-editor')
                        .on('mousedown', function(e) {
                            var target = $(e.target);
                            if( e.target instanceof HTMLImageElement ) {
                                if( !target.data('resizable') ) {
                                    target.resizable({
                                        aspectRatio: e.target.width / e.target.height,
                                    });
                                    target.data('resizable', true);

                                    if( lastResizableImg != null ) {
                                        //disable previous resizable image
                                        lastResizableImg.resizable( "destroy" );
                                        lastResizableImg.removeData('resizable');
                                    }
                                    lastResizableImg = target;
                                }
                            }
                        })
                        .on('click', function(e) {
                            if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
                                destroyResizable();
                            }
                        })
                        .on('keydown', function() {
                            destroyResizable();
                        });
                }

                enableImageResize();
            }
        },
        updateNotice: function () {
            var that = this;
            //修改展示
            $("#role-manage-role").on('click', '.btn-update', function () {
                var title = $(this).parents('.role-tr').find('.title').html();
                var content = $(this).parents('.role-tr').find('.content').val();
                var status = $(this).parents('.role-tr').find('.status').html();
                var id = $(this).parents('.role-tr').find('.titleid').html();
                $('.updatenotice').find('#form-field-title').val(title);
                if (status == "暂不发布") {
                    $('.updatenotice').find('#form-field-status').val("0");
                } else {
                    $('.updatenotice').find('#form-field-status').val("1");
                }


                // 将content的值设置进编辑器中

                $("#div2").html(content);
                $('.updatenotice').find('#titleid').val(id);
            });


            //修改提交
            $(".updateNotice").on('click', '.btn-primary', function () {

                var title = $('.updatenotice').find('#form-field-title').val();
                var status = $('.updatenotice').find('#form-field-status').val();
                var content = $('#div2').html();
                var titleid = $('.updatenotice').find('#titleid').val();
                if (title == "") {
                    $("#myModalAdd").find('#noticeName').text("不能为空");
                } else if (title.split(" ").length != 1) {
                    $("#myModalAdd").find('#noticeName').text("不能包含空格");
                    return false;
                } else {

//        		  alert("title="+title+"&content="+content+"&status="+status+"&id="+titleid);
                    $.ajax({

                        url: "/updateNotice",
                        type: "POST",
                        data: "title=" + title + "&content=" + content + "&status=" + status + "&id=" + titleid,
                        success: function (data) {
                            if (data) {

                                $('#myModalUpdate').hide();
                                $('.modal-backdrop').hide();
                                location = location;// 页面刷新
                            } else {
                                $("#myModalAdd").find('#noticeName').text("已经存在");
                                $("#myModalAdd").find('#form-field-title').focus();
                                $(".updateNotice").find('.btn-primary').disabled = true;
                            }

                        },
                        error: function () {
                        }
                    });
                }
            });


        }

    };

    noticeManage.init();
});