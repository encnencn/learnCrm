/**
 * Created by mingjie on 2017/1/11.
 */
function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

$(function() {

    var pageNum=getUrlParam('pageNum');

    if(pageNum==""||pageNum=='undefined'||pageNum==null){pageNum=1}

	var areaManger = {
			areaManger : $("#role-manage-role table tbody"),
		init : function() {
			this.displayAllData();
			this.searchDepartment();// 查询用户
			this.addData();
			this.deleteData();
			// this.modalclose();//点击关闭刷新页面

		},
		rights_allPage : $("#rights_allPage"),
        //审核拒绝
        deleteData : function() {
            var that = this;
            $(".table-hover").on('click', '.btn-delete', function() {

                var id = $(this).parents('.data-tr').find('.data-id').text();

                if (confirm('确定要删除么')) {

                    $.ajax({
                        url : "/deletePrice",
                        type : "POST",
                        data : {
                            "id" : id, // 上传编号
                        },
                        dataType:'json',
                        success : function() {
                            //customerManager.init();
                            location = location;//页面刷新
                        },
                        error : function() {
                        }
                    });
                    // 删除后要更新数据库，并且更新页面
                    // some code
                }
            });
        },
        addData:function(){
			var that = this;
			$("#myModal1").on('click', '#submit', function() {

				var shopId=$("#myModal1").find('#shopId').val(),
                    good_1=$("#myModal1").find('#good_1').val(),
                    good_2=$("#myModal1").find('#good_2').val(),
                    good_3=$("#myModal1").find('#good_3').val(),
                    good_4=$("#myModal1").find('#good_4').val(),
                    good_5=$("#myModal1").find('#good_5').val(),
                    good_6=$("#myModal1").find('#good_6').val(),
                    good_7=$("#myModal1").find('#good_7').val(),
                    good_8=$("#myModal1").find('#good_8').val();

				var jsonData ={
                    "shopId":shopId,
					"good_1_price":good_1,
					"good_2_price":good_2,
					"good_3_price":good_3,
					"good_4_price":good_4,
					"good_5_price":good_5,
                    "good_6_price":good_6,
                    "good_7_price":good_7,
                    "good_8_price":good_8

				}

				console.log(jsonData)
				$.ajax({
					url : "/addPrice",
					type : "POST",
                    dataType:'json',
					data : jsonData,
					success : function(data) {
						console.log(data)
                        $('#myModal1').hide();
                        $('.modal-backdrop').hide();
                        location=location;// 页面刷新
					},
					error : function() {
					}
				});

			});
		},

        displayAllData : function(obj) {
			var that = this;
            var loadPageCount = 0;//加载页面次数
            var _html='';
            $.ajax({
                    url : '/goodsPriceList',
                    data : {
                        "pageNum" : pageNum,
                    },
                    dataType : 'json',
                    type : "GET",
                    success : function(result) {
                        loadPageCount++;
                        if(result.list.length>0){
                            $.each(result.list, function(index, Item){

                                _html += '<tr class="data-tr">'
                                    + '<td class="data-id">'
                                    + Item.id
                                    + '</td>'
                                    + '<td class="data-shopName">'
                                    + (Item.shopName == undefined ? " " : Item.shopName)
                                    + '</td>'
                                    + '<td class="data-goodsName">'
                                    + (Item.goodsName == undefined ? " " : Item.goodsName)
                                    + '</td>'
                                    + '<td class="data-price">'
                                    + (Item.price == undefined ? " " : Item.price)
                                    + '</td>'
                                    + '<td class="data-createTime">'
                                    + (Item.createTime == undefined ? " " : moment(new Date(Item.createTime)).utc(8).format('YYYY年MM月DD日  HH时mm分ss秒'))
                                    + '</td>'
									+ '<td class="data-oprate">'
                                    + '<button class="btn btn-xs btn-danger btn-delete"   >'
                                    + '<i class="ace-icon fa fa-trash bigger-120" ></i>'
                                    + '</button>'
                                    + '</td>'
                                    + '</tr>';
                            });

                            if(result.pageNum){
                                //显示分页信息：总页数(pages),当前页数(pageNum),页面大小(pageSize)
                                $(".nav.page").initPage(result.pages,result.pageNum,result.pageSize,'');

                                //前台分页js:当前页数(pageNum),页面大小(pageSize),总页数(pages)
                                $(obj).buildPage(result.pageNum,result.pageSize,result.pages);

                            }else{
                                _html='';
                                //如果没有返回数据,或者列表为空,你可能需要有一些提示信息,在此处拼接
                                $(obj).html("");
                                $(obj).buildPage(0,3,0);
                            }

                        };
                        $("#rights_list").html(_html);

                    },
                    error : function() {
                    }
            })
		},



		// 查询区域
		searchDepartment : function() {
			var that = this;
			$(".modal-footer-search").on('click','.btn-customer-search',function() {
				var areaName = $(this).parents('.modal-content-search').find('#form-field-1').val();
				if(areaName==""){
					   $("#myModal3").find('#quyuName').text("不能为空");
					   $("#myModal3").find('#form-field-1').focus();
				}else if(areaName.split(" ").length != 1){
				　   $("#myModal3").find('#quyuName').text("不能包含空格");
				   $("#myModal3").find('#form-field-1').focus();
				　　return false;
				}else{
								$.ajax({
											url : "/queryByAreaName",
											dataType : 'json',
											type : "POST",
											data : {
												"areaName" : areaName,
											},
											success : function(data) {

												$('#myModal3').hide();
												$('.modal-backdrop').hide();

												// alert("从后台传过来data:"+JSON.stringify(data));
												var nums = 5; // 每页出现的数量
												var pages = Math
														.ceil(data.length
																/ nums); // 得到总页数
												var allPages = data.length;
												var thisDate = function(curr) {
													// 此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
													var str = '', last = curr
															* nums - 1;
													last = last >= data.length ? (data.length - 1)
															: last;
													for (var i = (curr * nums - nums); i <= last; i++) {

														var id = data[i].id, 
													
														name = data[i].name;

														str += '<tr class="role-tr">'
															+ '<td class="cus-id">'
															+ id
															+ '</td>'
															+ '<td class="cus-name">'
															+ name
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
													cont : 'rights_page',// 分页id
													pages : pages,
													jump : function(obj) { // 容器id
														document
																.getElementById('rights_list').innerHTML = thisDate(obj.curr);
													}
												});

											},
											error : function() {
											}
										});
				}
							});
		},


	};
	areaManger.init();

});