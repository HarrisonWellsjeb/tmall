import $ from "../library/jquery.js";
import cookie from "../library/cookie.js";
let id = location.search.split("=")[1];

$.ajax({
	type: "get",
	url: "../../interface/getItem.php",
	data: { id },
	dataType: "json"
})
	.then((res) => {
		let templateTitle = ``;
		let templatePrice = ``;
		let templateColor = ``;
		let templateStorage = ``;
		let templateIcon = ``;

		let pictures = JSON.parse(res.picture);
		let iconImage = pictures[0].images;
		let displayImage = pictures[1].images;
		let bigImage = pictures[2].images;

		// iconImage
		iconImage.forEach((item) => {
			templateIcon += `
                    <li class="item active">
                        <a href="javascript:;">
                            <img
                                src="${item}"
                                width="60"
                                height="60"
                                alt="!"
                            />
                        </a>
                    </li>
            `;
		});
		$(".showbanner__view .list").html(templateIcon);

		templateTitle += `
                <a target="_blank" href="javascript:;">
                    ${res.title}</a
                >
        `;
		$(".custion__title").html(templateTitle);

		// price
		templatePrice += `
                <span>价格</span>
                <p>
                    <em>￥</em>
                    <span class="price">${res.price}</span>
                </p>
        `;
		$(".custion__price").html(templatePrice);

		// color
		let type = JSON.parse(res.type);
		let colors = type.filter((item) => {
			if (item.color) {
				return item;
			}
		});
		colors.forEach((item) => {
			templateColor += `
            <li>${item.color}</li>
        `;
		});
		$(".custing-color").html(templateColor);

		// storage
		let storage = type.filter((item) => {
			if (item.storage) {
				return item;
			}
		});
		storage.forEach((item) => {
			templateStorage += `
                <li>${item.price}</li>
            `;
		});
		$(".price-storage").html(templateStorage);

		$(".btn__add").on("click", function () {
			addItem(res.id, $("#number-value").val());
		});
	})
	.catch((xhr) => {
		console.log(xhr.status);
	});

// 不管购物车中的商品有几种 都存储 JSON字符串(数组形式)
function addItem(id, num) {
	// 获取购物车数据
	let shop = cookie.get("shop");
	let product = { id, num };

	if (shop) {
		// 判断是否已经有属性
		shop = JSON.parse(shop); // cookie中已经有数据情况 将数据转成数组
		// shop.push(product);

		// 判断当前商品在购物车数据中是否已经存在 如果存在则修改数量 不存在则添加
		if (shop.some((el) => el.id == id)) {
			let index = shop.findIndex((elm) => elm.id == id); // 获得当前商品id在数组中的索引
			let count = parseInt(shop[index].num); // 获得当前数量
			count += parseInt(num);
			shop[index].num = count;
		} else {
			shop.push(product);
		}
	} else {
		shop = [];
		shop.push(product);
	}

	cookie.set("shop", JSON.stringify(shop), 1);
}
