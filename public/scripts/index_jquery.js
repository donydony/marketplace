$(document).ready(function () {
  const createItemElement = function (data, favid, favActive, convoId) {

    const obj = {favourite_id : favid};
    const $item_img = $("<img>").attr("src", data.img_url);
    const $item_img_div = $("<div>").addClass("item_img").append($item_img);
    const $sub_sect_1 = $("<section>").addClass("sub-sect1").append($item_img_div);


    const $item_title = $("<span>").text(data.title);
    const $price = $("<span>").text('$' + (data.price / 100));
    const $item_title_wrapper = $("<div>").append($item_title, $price);
    const $item_description = $("<p>").text(data.item_description);
    const $sub_sect_2 = $("<section>").addClass("sub-sect2").append($item_title_wrapper, $item_description);

    const $star = $("<i>").addClass("fa-solid fa-star");
    if(favid !== null && favActive !== null){
      $star.attr("id", favid);
      if(favActive === true) {
        $star.addClass("toggle-color");
      }

      $star.on("click", function () {
          $.ajax({
              type: "PUT",
              url: "/favourites",
              data: obj,
              success: (data1) => {
                  $star.toggleClass("toggle-color");
                  }
                });
              });
    }

    const $star_wrapper = $("<div>").text("Favourite this item").append($star);

    const $user_img = $("<img>").attr("src", data.user_pic);
    const $seller_name = $("<h5>").text(data.username);
    const $seller_info_div = $("<div>").addClass("seller_info").append($user_img, $seller_name);

    const $button = $("<button>").css({"display" : "none"});
    if(Number.isInteger(convoId)){
      if (data.sold_status) {
        $button.text("SOLD").attr("type", 'button').addClass("btn btn-outline-secondary");
      } else {
        $button.text("Message This Seller!").attr("type", 'submit').addClass("msg-redirect");
      }
      $button.css({"display" : "inline"});
    }
    const $form1 = $("<form>").attr("action", `/messages/${convoId}`).append($button);
    const $sub_sect_3 = $("<section>").addClass("sub-sect3").append($star_wrapper, $seller_info_div, $form1);

    const $article = $("<article>").addClass("item").append($sub_sect_1, $sub_sect_2, $sub_sect_3);
    return $article;
  }

  const renderItems = function (items) {
    for (let each of items) {
      $.ajax({
        type: "POST",
        url: "/favourites",
        data: each,
        success: (data1) => {
          console.log(data1);
          let favId = data1[0].id;
          let favActive = data1[0].active;
          let convoId = data1[1].id;
          $(".items-section").append(createItemElement(each, favId, favActive, convoId));
        }});
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
  });

  $(".sort-filter-by").on("submit", function (event) {
    event.preventDefault();
    $(".items-section").empty();
    const data = $(this).serialize();
    $.post("/filter", data).then(data => {
      renderItems(data);
    })
  })
  $(".btn-success").click(function () {
    $(".search_box").slideToggle();
  })

});


