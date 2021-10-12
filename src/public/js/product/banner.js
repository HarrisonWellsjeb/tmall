import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class Banner {
	constructor(node) {
		this.node = node;
		this.list = this.node.children(".showbanner__view").children(".list");
		this.items = this.list.children(".item");
		this.width = 60;
		this.switch();
	}
	switch() {
		const $showBig = $(".showbig").children("img");
		const that = this;
		const img = this.items.find("img");
		img.on("mouseenter", function (evt) {
			evt.stopPropagation();
			const index = $(evt.target).attr("data-i");
			if (typeof Number(index) !== "number") {
				return false;
			}
			$showBig.attr("src", "../images/iphone/pro__ban__" + index + "L.jpg");

			[...that.items].forEach((item) => $(item).removeClass("active"));
			$(that.items[index - 1]).addClass("active");
		});
	}
}
export default Banner;
