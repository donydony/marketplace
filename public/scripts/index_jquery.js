$(document).ready(function () {
  const createItemElement = function (data) {

    const $user_img = $("<img>").attr("src", data.user_pic);
    const $seller_name = $("<h5>").text(data.username);
    const $seller_info_div = $("<div>").addClass("seller_info").append($user_img, $seller_name);
    const $item_img = $("<img>").attr("src", data.img_url);
    const $item_img_div = $("<div>").addClass("item_img").append($item_img);
    const $sub_sect_1 = $("<section>").addClass("sub-sect1").append($seller_info_div, $item_img_div);


    const $item_title = $("<span>").text(data.title);
    const $item_title_wrapper = $("<h5>").append($item_title);
    const $price = $("<span>").text('$' + (data.price / 100));
    const $item_description = $("<p>").text(data.item_description);
    const $sub_sect_2 = $("<section>").addClass("sub-sect2").append($item_title_wrapper, $price, $item_description);

    const $star = $("<i>").addClass("fa-solid fa-star");
    const $star_wrapper = $("<div>").text("Favourite this item").append($star);
    const $button = $("<button>").attr("type", 'button');
    const $sub_sect_3 = $("<section>").addClass("sub-sect3").append($star_wrapper, $button);



    const $article = $("<article>").addClass("item").append($sub_sect_1, $sub_sect_2, $sub_sect_3);
    return $article;
  };

  const renderItems = function (items) {
    for (let each of items) {
      $(".items-section").append(createItemElement(each));
    }
  };

  const loadItems = function () {
    $.post("/featured", function (data) {
      renderItems(data);
    });
  };

  loadItems();

  $("#sort-by-featured").click(()=> {
    $(".items-section").empty();
    $.post("/featured", function (data) {
      renderItems(data);
  })
})

  $("#sort-by-newest").click(()=> {
    $(".items-section").empty();
    $.post("/new", function (data) {
      renderItems(data);
    });
  })

  $("#sort-by-lowest").click(()=> {
    $(".items-section").empty();
    $.post("/price", function (data) {
      renderItems(data);
    });
  })

  $("#sort-by-highest").click(()=> {
    $(".items-section").empty();
    $.post("/pricedesc", function (data) {
      renderItems(data);
    });
  })

//   router.post('/user', (req, res) => {
//     userData(1).then(data => {
//       return res.json(data);
//     })
//   });

//   router.post('/pricerange', (req, res) => {
//     priceRangeData(1).then(data => {
//       return res.json(data);
//     })
//   });


//   router.post('/pricerangedesc', (req, res) => {
//     priceRangeDataDesc(1).then(data => {
//       return res.json(data);
//     })
//   });
});

// //href
// // convo id with buyer and seller
