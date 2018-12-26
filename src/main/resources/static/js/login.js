/**
 * Created by mingjie on 2017/1/9.
 */
$(function() {

    var logins = {
        init:function(){
            this.autoImport();
            this.changeToolbar();
            this.clickLogin();
            this.phoneAuthCode();
            this.changePwd();
        },
        /*跳转至获取验证码界面及进入修改密码界面*/
        changeToolbar:function(){
            $(document).on('click', '.toolbar a[data-target]', function(e) {
                e.preventDefault();
                var target = $(this).data('target');
                $('.widget-box.visible').removeClass('visible');//hide others
                $(target).addClass('visible');//show target
            });
        },
        /*登录界面交互*/
        username:$("#username"),
        password:$("#password"),
        verifyCode:$("#verifyCode"),
        autoLogin:$("#autoLogin"),
        prompt1:$(".prompt1"),
        login:$("#login"),
        regUser: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        clickLogin:function(){
            var usernameInfo = "";
            var passwordInfo = "";
            var autoLoginInfo = "";
            var that = this;
            //清除错误提示
            $("#login-box").find("input").on("focus",function(){
                that.prompt1.text("");
            });
            //点击登录
            this.login.on("click",function(){
                //获取用户名
                usernameInfo = that.username.val();
                //获取密码
                passwordInfo = that.password.val();
             
                //获取验证码
                verifyCode  = that.verifyCode.val();
                //获取是否自动登录
                autoLoginInfo = that.autoLogin.prop("checked");
                //校验用户名
                if(!that.regUser.test(usernameInfo)){
                    that.prompt1.text("用户名格式错误");
                    return false;
                }
                //加密用户名
                var usernameInfoMD5 = usernameInfo;
                //加密密码
                var passwordInfoMD5 = hex_md5(passwordInfo);
              
                $.ajax({
                    type: "POST",
                    url: "/loginCheck",
                   
                    data: "username="+usernameInfoMD5+"&password="+passwordInfoMD5+"&verifyCode="+verifyCode+"&autoLogin="+autoLoginInfo,
                    success: function(data){
//                    	console.log(data)

                    	
                        if (data=="验证码输入正确") {
                            if (autoLoginInfo) {
                              $.cookie("autoLoginInfo", "true", { expires: 7 }); //存储一个带7天期限的cookie
                              $.cookie("username", usernameInfo, { expires: 7 });
                              $.cookie("password", passwordInfo, { expires: 7 });
                            }
                            else {
                              $.cookie("autoLoginInfo", "false", { expire: -1 });
                              $.cookie("username", "", { expires: -1 });
                              $.cookie("password", "", { expires: -1 });
                            }
                            location = 'html/index.html'; // 登录成功后指定跳转页面
                        } else {
                            that.prompt1.text(data);
                            return false;
                        }
                    }
                });
            })
        },
        /*下次登录免输入用户名及密码*/
        autoImport:function(){
            if ($.cookie("autoLoginInfo") == "true") {
                this.autoLogin.prop("checked", true);
                this.username.val($.cookie("username"));
                this.password.val($.cookie("password"));
            }
        },
        /*手机验证码*/
        getPhone:$("#getPhone"),
        authCode:$("#authCode"),
        authIdentity:$("#authIdentity"),
        getAuthCode:$("#getAuthCode"),
        prompt2:$(".prompt2"),
        phoneAuthCode:function(){
            var InterValObj; //timer变量，控制时间
            var count = 120; //间隔函数，1秒执行
            var curCount;//当前剩余秒数
            var code = ""; //验证码
            var codeLength = 6;//验证码长度
            var that = this;
            //清除错误提示
            $("#forgot-box").find("input").on("focus",function(){
                that.prompt2.text("");
            });
            this.getAuthCode.on("click",function(){
                curCount = count;
                var getphoneInfo = that.getPhone.val();//手机号码
                if(getphoneInfo != ""){
                    if(!that.regUser.test(getphoneInfo)){
                        that.prompt2.text("邮箱格式错误")
                        return false;
                    }else{
                        //产生验证码
                        for (var i = 0; i < codeLength; i++) {
                            code += parseInt(Math.random() * 9).toString();
                        }
                        console.log(code);
                        //设置button效果，开始计时
                        that.getAuthCode.attr("disabled", "true");
                        that.getAuthCode.html("请在" + curCount + "秒内输入");
                        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
                        //向后台发送处理数据
                        $.ajax({
                            type: "POST", //用POST方式传输
                            dataType: "text", //数据格式:JSON
                            url: 'forgetpassword', //目标地址
                            data: "phone=" + getphoneInfo + "&code=" + code,
                            error: function (XMLHttpRequest, textStatus, errorThrown) { },
                            success: function (data){ }
                        });
                    }
                }else{
                    that.prompt2.text("邮箱不能为空");
                }
            });
            /*如果验证码匹配成功，点击跳转至重置密码页面*/
            this.authIdentity.on("click",function(){
                if(that.authCode.val() !== code){
                    that.prompt2.text("验证码输入错误");
                    return false;
                }else if (code == "") {
                    return false;
                }
            });
            //timer处理函数
            function SetRemainTime() {
                if (curCount == 0) {
                    window.clearInterval(InterValObj);//停止计时器
                    that.getAuthCode.removeAttr("disabled");//启用按钮
                    that.getAuthCode.html("重新发送验证码");
                    code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
                }
                else {
                    curCount--;
                    that.getAuthCode.html("请在" + curCount + "秒内输入");
                }
            }
        },
        /*重置密码*/
        getPhone:$("#getPhone"),
        newPassword:$("#newPassword"),
        RetypePassword:$("#RetypePassword"),
        confirmChange:$("#confirmChange"),
        prompt3:$(".prompt3"),
        changePwd:function(){
            var that = this;
            //清除错误提示
            $("#reset-box").find("input").on("focus",function(){
                that.prompt3.text("");
            });
            this.confirmChange.on("click",function(){
                var newPasswordInfo = that.newPassword.val();
                var RetypePasswordInfo = that.RetypePassword.val();
                if(that.RetypePassword.val() !== that.newPassword.val()){
                    that.prompt3.text("两次输入密码不一致");
                    return false;
                }
                //加密新密码
                RetypePasswordInfoMD5 = hex_md5(RetypePasswordInfo);
                $.ajax({
                    type: "POST",
                    url: "updatepassword",
                    data: "password="+RetypePasswordInfoMD5,
                    success: function(data){
                        if (data) {
                            location.reload(true);	// 密码修改成功后刷新页面
                        } else {
                            return false;
                        }
                    }
                });
            });
        }
    };
    logins.init();
});
document.onkeyup = function (e) {//按键信息对象以函数参数的形式传递进来了，就是那个e
    var code = e.charCode || e.keyCode;  //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)
    if (code == 13) {
        //此处编写用户敲回车后的代码
        $('#login').click();
    }
}