import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class Tab {
	constructor(node) {
		this.node = node;
		this.loginSwitch = this.node.children(".login__switch");
		this.switchA = this.loginSwitch.children("a");
		this.forms = this.node.parent().children("form");
		this.switch();
	}
	switch() {
		const that = this;
		this.loginSwitch.on("click", function (evt) {
			let target = evt.target;
			let index = [...that.switchA].findIndex((item) => {
				return item === target;
			});
			[...that.forms].forEach((item) => {
				console.log(item);
				$(item).removeClass("login__form--active");
			});
			$(that.forms[index]).addClass("login__form--active");
		});
	}
}
export default Tab;
