import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
export default class Select {
	constructor(node) {
		this.node = node;
		this.uls = this.node.find("ul").not("#not");
		this.click();
	}
	click() {
		[...this.uls].forEach((item) => {
			$(item).on("click", function (evt) {
				$(item).find("li").not(evt.target).removeClass("active");
				$(evt.target).toggleClass("active");
			});
		});
	}
}
