import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class TopNav {
	constructor(node) {
		this.node = node;
		this.init();
	}
	init() {
		const that = this;
		window.addEventListener("scroll", function (evt) {
			let scrollTop = document.documentElement.scrollTop;
			if (scrollTop > 200) {
				that.node.css("top", 0);
			} else if (scrollTop < 50) {
				that.node.css("top", -50);
			}
		});
	}
}
export default TopNav;
