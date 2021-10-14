import $ from "../library/jquery.js";
import cookie from "../library/cookie.js";
const username = $("#user");
const password = $("#pass");
const userCheck = $(".input-user .checkbox");
const passCheck = $(".input-psw .checkbox");
const submit = $("#login-submit");

username.on("focus", function (evt) {
	userCheck.css("color", "#333").html("设置后不可更改，最长14位英文或7位汉字");
});
username.on("blur", function (evt) {
	if ($(this).val !== "") {
		let length = $(this).val().length;
		let reg = /^[a-zA-Z0-9]+$/;
		if (length <= 14) {
			if (reg.test($(this).val())) {
				$.ajax({
					type: "post",
					url: "../../interface/registry.php",
					data: {
						user: username.val()
					}
				})
					.then((res) => {
						console.log(res);
						if (res === "false") {
							userCheck.css("color", "green").html("用户名可以使用");
						} else {
							userCheck.css("color", "red").html("用户名已存在");
						}
					})
					.catch((xhr) => console.log(xhr.status));
			} else {
				userCheck.css("color", "red").html("只能使用大小写英文字母和数字");
			}
		} else {
			userCheck.css("color", "red").html("用户名过长");
		}
	} else {
		userCheck.css("color", "red").html("用户名不能为空");
	}
});
