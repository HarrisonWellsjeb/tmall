import $ from "../library/jquery.js";
import cookie from "../library/cookie.js";

let shopCookie = cookie.get("shop");
if (shopCookie) {
	shopCookie = JSON.parse(shopCookie);
	let idList = shopCookie.map((item) => item.id).join();
	$.ajax({
		type: "get",
		url: "../../interface/getshop.php",
		data: { idList },
		dataType: "json"
	})
		.then((res) => {
			res.forEach((product, index) => {
				let template = ``;
				let picture = JSON.parse(product.picture)[1].images[0];
			});
		})
		.catch((xhr) => {
			console.log(xhr.status);
		});
}
