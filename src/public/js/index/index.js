import Banner from "./banner.js";
import TopNav from "./top-nav.js";
import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";

$(function () {
	const banner = new Banner({
		bannerBar: $(".banner__bar")
	});

	const topNav = new TopNav($(".top-nav"));
});
