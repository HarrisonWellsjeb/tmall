import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class BigGlass {
	constructor(node) {
		this.node = node;
		this.img = this.node.find("img")[0];
		this.showbigXL = this.node.find(".showbig__xl")[0];
		this.mask = this.node.children(".showbig__mask")[0];
		this.init();
	}
	init() {
		const that = this;
		this.node.on("mouseenter", function (evt) {
			that.draw();
			$(that.showbigXL).css("display", "block");
			const point = {
				x: 0,
				y: 0
			};
			const rect = {
				width: that.mask.offsetWidth,
				height: that.mask.offsetHeight
			};
			$(this).on("mousemove", function (evt) {
				// 获取鼠标位置
				point.x = evt.offsetX;
				point.y = evt.offsetY;

				// 计算后 放大镜定位
				let x = point.x - rect.width / 2;
				let y = point.y - rect.height / 2;

				// 边界管理
				x = Math.max(x, 0);
				y = Math.max(y, 0);
				x = Math.min(x, this.offsetWidth - rect.width);
				y = Math.min(y, this.offsetHeight - rect.height);

				$(that.mask).css({
					left: x,
					top: y
				});

				// 计算大图定位
				$(that.showbigXL).css({
					"background-position-x": (-19 / 11) * x,
					"background-position-y": (-19 / 11) * y
				});
			});
			$(this).on("mouseleave", function (evt) {
				$(that.showbigXL).css("display", "none");
			});
		});
	}
	draw() {
		let path = $(this.img).attr("src");
		path = path.replace(/(?=\d)(\w)/, "$1x");
		path = path.replace(/jpg/, "png");
		$(this.showbigXL).css({
			"background-image": "url(" + path + ")"
		});
	}
}

export default BigGlass;
