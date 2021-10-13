import $ from "../library/jquery.js";
$.ajax({
	type: "get",
	url: "../../interface/getItems.php",
	dataType: "json"
})
	.then((res) => {
		let template = ``;
		res.forEach((item) => {
			let image = JSON.parse(item.picture)[1].images[0];
			template += `
            <li class="product__item">
                <a href="./iphone13.html?id=${item.id}">
                    <img src="${image}" width="185" height="185" alt="!">
                        <p class="desc">
                            <span>${item.title}</span>
                        </p>
                    <p class="price">￥<span>${item.price}</span></p>									
                </a>
            </li>
            `;
		});
		$(".product__list").html(template);
	})
	.catch((xhr) => {
		console.log(xhr.status);
	});
