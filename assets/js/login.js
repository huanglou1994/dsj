$(function(){
const layer = layui.layer
const form = layui.form;
// 注册
$('#reg-from').on('submit',function(e){
    // 阻止默认提交
    e.preventDefault()
    // 验证
    form.verify({
        // 用户验证账号不能低于5位数 最多10位数，
        username:function(val){
            let reg = /^[a-zA-Z]\w{4,16}$/
            if(!reg.test(val)) {
                return '账号必须以字母开头的5~16位数'
            }
        },
        pass: [ 
            // 密码验证不能少于5位数
            /^[\S]{5,12}$/
            ,'密码必须5到12位，且不能出现空格'
        ],
        // 密码重复验证，两次密码必须要一样
        pasAgain:function(val){
            let pas = $('[name="password"]').val().trim()
            if (pas !== val) {
                return '两次密码不一样'
            }
        }
    })
    // 通过验证发起请求
    $.ajax({
        method:'post',
        url:'/api/reguser',
        data: $(this).serialize(),
        success:function(res){
            if (res.status !== 0) {
            // 注册失败
                return layer.msg(res.message)
            }
            // 注册成功
            layer.msg(res.message)
            // 获取表单中所有的表单域
            $(':input','#reg-from').val('')
            $('#go-login').click()
        }
    })
})


// 登录
$('#login-from').on('submit',function(e){
    // 阻止默认提交
    e.preventDefault()
    // 验证
    form.verify({
        // 用户验证账号不能低于5位数 最多10位数，
        username:function(val){
            let reg = /^[a-zA-Z]\w{4,16}$/
            if(!reg.test(val)) {
                return '账号必须以字母开头的5~16位数'
            }
        },
        pass: [ 
            // 密码验证不能少于5位数
            /^[\S]{5,12}$/
            ,'密码必须5到12位，且不能出现空格'
        ]
    })
    // 通过验证发起请求
    $.ajax({
        method:'post',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            // 登入失败
            if(res.status !== 0) return layer.msg(res.message)
            // 登录成功
            layer.msg(res.message)
            localStorage.setItem('token',res.token)
            location.href = 'index.html'
            $(':input','#reg-from').val('')
           
        }
    })
   
})

// 跳转到登录
$('#go-login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
})

// 跳转到注册
$('#go-reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
})


})