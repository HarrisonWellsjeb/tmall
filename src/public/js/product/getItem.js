import $ from "../library/jquery.js";
import cookie from "../library/cookie.js";
import BigGlass from "./bigglass.js";
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
		let templateDisplay = ``;

		let pictures = JSON.parse(res.picture);
		let iconImage = pictures[0].images;
		let displayImage = pictures[1].images;
		let bigImage = pictures[2].images;
		let descImage = JSON.parse(res.details);

		// iconImage
		iconImage.forEach((item, index) => {
			templateIcon += `
                    <li class="item">
                        <a href="javascript:;">
                            <img
                                src="${item}"
                                width="60"
                                height="60"
                                alt="!"
								data-index="${index}"
                            />
                        </a>
                    </li>
            `;
		});

		$(".showbig").find("img").attr("src", displayImage[0]);

		$(".showbanner__view .list")
			.html(templateIcon)
			.on("mouseover", function (evt) {
				let target = evt.target;
				if (target.nodeName.toUpperCase() === "IMG") {
					let index = $(target).attr("data-index");
					$(target).parent().parent().parent().children().removeClass("active");
					$(target).parent().parent("li.item").addClass("active");
					$(".showbig>img").attr("src", displayImage[index]);
					$(".showbig").on("mouseenter", function (evt) {
						console.log("1");
						$(this).find(".showbig__xl").css({
							"background-image": bigImage[index]
						});
					});
				}
			});

		// display image
		// displayImage.forEach((item, i) => {
		// 	templateDisplay += `
		// 	<div class="showbig__mask"></div>
		// 	<img
		// 		src="${item}"
		// 		width="430"
		// 		height="430"
		// 		alt="!"
		// 	/>
		// 	<img class="showbig__xl" src="${bigImage[i]}" />
		// 	`;
		// });
		// $(".showbig")
		// 	.html(templateDisplay)
		// 	.children(".showbig__mask")
		// 	.on("click", function (evt) {
		// 		console.log(evt.targete);
		// 	});

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
                <li>${item.storage}</li>
            `;
		});
		$(".price-storage").html(templateStorage);

		$(".btn__add").on("click", function () {
			addItem(res.id, $("#number-value").val());
		});

		// <!-- 温馨提示 -->
		let templateWX = `
				<div class="item">
					<div class="item__img">
						<img
							src="${descImage[0]}"
							alt="温馨提示"
						/>
					</div>
				</div>
			`;
		$(".product__about .wx").html(templateWX);

		// <!-- 注意事项 -->
		let templateZY = `
				<div class="item__img">
					<img
						src="${descImage[1]}"
						alt="温馨提示"
					/>
				</div>
		`;
		$(".product__about .zhuyi").html(templateZY);

		// <!-- 了解一下iphone13 -->
		let templateLJ = `
			<div class='item__img'>
				<img
					src='${descImage[2]}'
					alt='温馨提示'
				/>
			</div>
			`;
		$(".product__about .lj").html(templateLJ);

		// <!-- 包装内容 -->
		let templateBZ = `
			<div class="item__img">
				<img
					src="${descImage[3]}"
					alt="温馨提示"
				/>
			</div>
		`;
		$(".product__about .baozhuang").html(templateBZ);

		// <!-- 比较 -->
		let templateBiJiao = `
		<div class="item__img">
			<img
				src="${descImage[4]}"
				alt="温馨提示"
			/>
		</div>
	`;
		$(".product__about .bijiao").html(templateBiJiao);

		// <!-- 哪款机型适合你 -->
		let templateShiHe = `
		<div class="item__img">
			<img
				src="${descImage[5]}"
				alt="温馨提示"
			/>
		</div>
	`;
		$(".product__about .shihe").html(templateShiHe);
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
