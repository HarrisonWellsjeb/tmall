<?php

include "./library/conn.php";  //连接数据库
//重名检测
if(isset($_POST['user'])){//判断当前是否存在user值。
    $user = $_POST['user'];//获取用户名
    $result = $conn->query("select * from userinfo where username='$user'");//通过用户名检测数据库中是否存在结果。
    if($result->fetch_assoc()){//获得结果，说明当前的用户名存在数据库  - 存在
        echo 'true';
    }else{//不存在
        echo 'false';
    }
}
//获取注册的数据，将其插入给数据库。
if(isset($_POST['submit'])){//前端点击了用户注册按钮，这里才开始取值，判断前端是否点击了注册按钮。
    $user = $_POST['username'];  //username是表单name后面的值
    $pass = $_POST['password']; 
    // $repass = sha1($_POST['repass']); //表里面密码字段长度设置为40因为sha1加密的长度
    // $tel = $_POST['tel']; 

    $conn->query("insert userinfo values(null,'$user','$pass')");
    //注意：这里的字段和数据库中的字段按照顺序对应。

    //跳转登录页面,前端和后端通信采用绝对路径(完整的路径),其他都采用相对路径
    header('location:http://localhost/tmall/src/public/html/login.html');
}
