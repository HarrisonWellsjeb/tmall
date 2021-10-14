<?php
include "./library/conn.php";  //连接数据库

//获取前端传入的用户名，进行存在检测.然后再判断密码
if(isset($_POST['user'])){//检测前端传入的用户名是否存在。
    $user = $_POST['user'];//存在结果
    $result = $conn->query("select * from userinfo where username='$user'");//进行匹配
    if($result->fetch_assoc()){//存在结果，用户名存在，继续检测密码
        if(isset($_POST['pass'])){//判断密码存在
            // $pass = sha1($_POST['pass']);
            $pass = $_POST['pass'];
            $result1 = $conn->query("select * from userinfo where username='$user' and password='$pass'");//匹配
            if($result1->fetch_assoc()){//成功
                echo 'loginsuccess';
            }else{
                echo 'loginfail';//失败
            }
        }
    }else{//用户名不存在
        echo 'userfalse';
    }
}

// 如果同时检测用户名和密码错误
// if(isset($_POST['user']) && isset($_POST['pass'])){//判断密码存在
//     $user = $_POST['user'];
//     $pass = sha1($_POST['pass']);
//     $result1 = $conn->query("select * from registry where username='$user' and password='$pass'");//匹配
//     if($result1->fetch_assoc()){//成功
//         echo 'loginsuccess';
//     }else{
//         echo 'loginfail';//失败
//     }
// }


// if(isset($_POST['user'])){
//     $user = $_POST['user'];
//     $result = $conn->query("select * from registry where username='$user'");
//     if($result->fetch_assoc()){//存在结果，登录成功
//         if(isset($_POST['pass'])){ //用户名存在，获取密码
//             $pass = sha1($_POST['pass']);
//             //将用户名和密码通过sql语句查询当前的数据表中是否存在。
//             $result = $conn->query("select * from registry where username='$user' and password='$pass'");
//             if($result->fetch_assoc()){//存在结果，登录成功
//                 session_start();
//                 //获取到用户提交的验证码
//                 $captcha = $_POST["yzm"];
//                 //将session中的验证码和用户提交的验证码进行核对,当成功时提示验证码正确，并销毁之前的session值,不成功则重新提交
//                 //strtolower:将文本框的内容改成小写。
//                 if(strtolower($_SESSION["captcha"]) == strtolower($captcha)){
//                     echo 'success';
//                     $_SESSION["captcha"] = "";//清空session
//                 }else{
//                     echo 'yzmfail';
//                 }
//             }else{//登录失败
//                 echo 'passwordfail';
//             }
//         }
//     }else{//登录失败
//         echo 'false';
//     }
// }
