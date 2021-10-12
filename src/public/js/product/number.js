import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
export default class Number {
	constructor(node) {
		this.node = node;
		this.change();
	}
	change() {
		const $numberValue = $("#number-value");
		this.node.on("click", function (evt) {
			let target = evt.target;
			if (target.nodeName.toUpperCase() === "SPAN") {
				const step = $(target).attr("data-symbol");
				$numberValue.val(function () {
					let value = parseInt(this.value) + parseInt(step);
					value = Math.max(0, value);
					return (this.value = value);
				});
			}
		});
	}
}
