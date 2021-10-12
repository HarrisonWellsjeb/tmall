import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
export default class Price {
	constructor(node) {
		this.node = node;
		this.priceDisplay = $(".custion__price").find(".price")[0];
		this.change();
		this.defaultPrice = "5999.0 - 8399.0";
	}
	change() {
		const that = this;
		this.node.on("click", function (evt) {
			const target = evt.target;
			if (target.nodeName === "LI") {
				let price = $(evt.target).attr("data-price");
				price = price / 100;
				price = price.toFixed(2);
				$(that.priceDisplay).text(price);
			}
		});
	}
}
