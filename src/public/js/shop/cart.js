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
			let template = ``;
			res.forEach((product, index) => {
				let picture = JSON.parse(product.picture)[1].images[0];
				// 保证顺序
				let current = shopCookie.filter((el) => {
					return el.id === product.id;
				});
				template += `
					<li class="cart__product">
						<div class="pro__select">
							<input type="checkbox" />
						</div>
						<div class="pro__info">
							<a href="javascript:;">
								<img
									src="${picture}"
									alt="!"
								/>
								<p class="info__name">
									${product.title}
								</p>
							</a>
						</div>
						<div class="pro__desc">
							<p class="desc__color">颜色分类：深空灰</p>
							<p class="desc__storage">储存容量：256GB</p>
						</div>
						<div class="pro__price">
							<p class="price__value">
								￥
								<em>${parseFloat(product.price).toFixed(2)}</em>
							</p>
						</div>
						<div class="pro__amount">
							<p class="amount__input">
								<span class="disadd">-</span>
								<input
									type="text"
									name="amount-input"
									class="pro__input"
									value="${current[0].num}"
									max-value="${product.num}"
								/>
								<span class="add">+</span>
							</p>
						</div>
						<div class="pro__allprice">
							<p>￥<em>${(product.price * current[0].num).toFixed(2)}</em></p>
						</div>
						<div class="pro__del">
							<p id="pro__del" data-id="${product.id}">删除</p>
						</div>
					</li>
				`;
				$(".cart__products")
					.html(template)
					.find(".pro__del>p")
					.on("click", function (evt) {
						console.log($(this).attr("data-id"));
						let res = shopCookie.filter(
							(el) => el.id !== $(this).attr("data-id")
						);
						cookie.set("shop", JSON.stringify(res), 1);
						location.reload();
					});
			});
		})
		.catch((xhr) => {
			console.log(xhr.status);
		});
}
