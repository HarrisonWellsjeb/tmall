import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
class Banner {
	constructor({ bannerBar }) {
		this.bannerBar = bannerBar;
		this.bannerView = this.bannerBar.children(".banner__view");
		this.bannerImgs = this.bannerView.children(".banner__imgs");
		this.bannerImg = this.bannerImgs.children();
		this.bannerBtn = this.bannerBar.children(".banner__btn");
		this.length = this.bannerImg.length;
		this.index = 0;
		this.timer = null;
		this.init();
	}
	init() {
		this.addDotted();
		this.switch();
		this.select();
	}
	addDotted() {
		this.bannerBtn.empty();
		for (let i = 0; i < this.length; i++) {
			this.bannerBtn.append($('<span class="banner__btn--dotted"></span>'));
		}
		$(this.bannerBtn.children("span")[this.index]).addClass("btn__dotted--active");
	}
	select() {
		const that = this;
		const $bannerBtnDotted = this.bannerBtn.children(".banner__btn--dotted");
		this.bannerBtn.on("click", function (evt) {
			clearInterval(that.timer);
			evt.stopPropagation();
			let target = evt.target;
			let index = [...$bannerBtnDotted].findIndex((item) => {
				return item === target;
			});
			that.index = index;
			[...that.bannerImg].forEach((item) => {
				$(item).removeClass("banner__img--active");
			});
			$(that.bannerImg[that.index]).addClass("banner__img--active");
			[...that.bannerBtn.children("span")].forEach((item) => {
				$(item).removeClass("btn__dotted--active");
			});
			$(that.bannerBtn.children("span")[that.index]).addClass(
				"btn__dotted--active"
			);
			that.switch();
		});
	}
	switch() {
		this.timer = setInterval(() => {
			[...this.bannerImg].forEach((item) => {
				$(item).removeClass("banner__img--active");
			});
			this.index++;
			this.index %= this.length;
			$(this.bannerImg[this.index]).addClass("banner__img--active");

			[...this.bannerBtn.children("span")].forEach((item) => {
				$(item).removeClass("btn__dotted--active");
			});
			$(this.bannerBtn.children("span")[this.index]).addClass(
				"btn__dotted--active"
			);
		}, 5000);
	}
}

export default Banner;
