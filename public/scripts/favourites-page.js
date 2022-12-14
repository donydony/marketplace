$(document).ready(function () {
  const createItemElement = function (data, favid, favActive, convoId, loginUserId) {

    const obj = {favourite_id : favid};
    const $item_img = $("<img>").attr("src", data.img_url).addClass("favourite-img");
    const $item_img_div = $("<div>").addClass("item_img").append($item_img);
    const $sub_sect_1 = $("<section>").addClass("sub-sect1").append($item_img_div);


    const $item_title = $("<h2>").text(data.title);
    const $line_break = $('<br>');
    const $price = $("<span>").text('$' + (data.price / 100)).addClass("favourite-price");
    const $item_title_wrapper = $("<div>").append($item_title, $line_break, $price).addClass("favourite-title");
    const $item_description = $("<p>").text(data.item_description);
    const $sub_sect_2 = $("<section>").addClass("sub-sect2").append($item_title_wrapper, $item_description);


    const $user_img = $("<img>").attr("src", data.user_pic).addClass("favourite-user-pic");
    const $seller_name = $("<h5>").text(data.username);
    const $seller_info_div = $("<div>").addClass("seller_info").append($user_img, $seller_name);

    const $button = $("<button>").css({"display" : "none"});
    if(convoId && Number.isInteger(convoId)){
      if (data.sold_status) {
        $button.text("SOLD").attr("type", 'button').addClass("btn btn-outline-secondary");
      } else {
        $button.text("Message This Seller!").attr("type", 'submit').addClass("msg-redirect");
      }
      // console.log("index_jquery:", data);
      // console.log("index_jquery session:", session);
      let sellerID = data.user_id;
      console.log("login user id:", loginUserId);
      if( sellerID !== loginUserId){
        $button.css({"display" : "inline"});
      }

    }
    const $form1 = $("<form>").append($button);
    if (convoId && Number.isInteger(convoId)){
      $form1.attr("action", `/messages/${convoId}`);
    }
    const $sub_sect_3 = $("<section>").addClass("sub-sect3").append($seller_info_div, $form1);

    const $article = $("<article>").addClass("item").append($sub_sect_1, $sub_sect_2, $sub_sect_3);
    return $article;
  }

  const renderItems = function (items, loginUserId) {
    for (let each of items) {
      $.ajax({
        type: "POST",
        url: "/favourites",
        data: each,
        success: (data1) => {
          console.log("renderitems:", data1);
          let favId = data1[0].id;
          let favActive = data1[0].active;
          let convoId = data1[1]?.id;
          $(".items-section").append(createItemElement(each, favId, favActive, convoId, loginUserId));
        }});
    }
  };

  const loadItems = function () {
    $.post("/favourites/items", function (data) {
      renderItems(data[0], data[1]);
    });
  };

  loadItems();
});


