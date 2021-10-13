import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
export default class Login {
	constructor(node) {
		this.node = node;
		this.username = $("#username");
		this.psw = $("#psw");
		this.submit = this.node.find(".login__submit>button")[0];
		this.login();
	}
	login() {
		const that = this;
		$(this.submit).on("click", function submit(evt) {
			$.ajax({
				type: "get",
				url: "http://127.0.0.1/tmall/interface/login.php",
				data: {
					username: that.username.val(),
					password: that.psw.val()
				},
				dataType: "json"
			})
				.then(function (data) {
					console.log(data);
				})
				.catch(function (xhr) {
					console.log(xhr);
				});
		});
	}
}
