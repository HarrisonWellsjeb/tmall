import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class Swap {
	constructor(node) {
		this.node = node;
		this.colorLs = this.node.find("#custing-color")[0];
		this.$showBig = $(".showbig").find("img");
		this.$showBigXL = $(".showbig__xl")[0];
		this.color();
	}
	color() {
		const that = this;
		const map = {
			"data-i": function (target) {
				let i = $(target).attr("data-i");
				i = String(i);
				let path = `url("../images/iphone/pro__ban__s${i}xL.png")`;
				that.$showBigXL.style["background-image"] = path;
				$(that.$showBig).attr(
					"src",
					"../images/iphone/pro__ban__s" + i + "L.jpg"
				);
			}
		};
		$(this.colorLs).on("click", function (evt) {
			const target = evt.target;
			const key = $(target).attr("data-i");
			if (target.nodeName === "LI") {
				map["data-i"] && map["data-i"](target);
			}
		});
	}
}
export default Swap;
