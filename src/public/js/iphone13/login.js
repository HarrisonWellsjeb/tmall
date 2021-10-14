import $ from "../library/jquery.js";
import cookie from "../library/cookie.js";
const username = $("#user");
const password = $("#pass");
const userCheck = $(".input-user .checkbox");
const passCheck = $(".input-psw .checkbox");
const submit = $("#login-submit");

username.on("blur", function (evt) {
	if ($(this).val() !== "") {
		$.ajax({
			type: "post",
			url: "../../interface/login.php",
			data: {
				user: username.val()
			}
		})
			.then((res) => {
				if (res === "userfalse") {
					userCheck.css("color", "red").html("用户名不存在，请重新输入");
				} else {
					userCheck.html("");
				}
			})
			.catch((xhr) => console.log(xhr.status));
	} else {
		userCheck.css("color", "red").html("用户名不能为空！！！");
	}
});

submit.on("click", function (evt) {
	console.log({
		username: username.val(),
		password: password.val()
	});
	evt.preventDefault();
	if (password.val() !== "") {
		passCheck.html("");
		$.ajax({
			type: "post",
			url: "../../interface/login.php",
			data: {
				user: username.val(),
				pass: password.val()
			}
		})
			.then((res) => {
				if (res === "loginsuccess") {
					cookie.set("username", username.val(), 1);
					location.href = "./index.html";
				} else if (res === "loginfail") {
					alert("密码错误");
					password.val("");
				}
			})
			.catch((xhr) => console.log(xhr.status));
	} else {
		passCheck.css("color", "red").html("密码不能为空");
	}
});
