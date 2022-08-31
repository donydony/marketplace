$(document).ready(function () {
  const createItemElement = function (data) {

    const $item_img = $("<img>").attr("src", data.img_url);
    const $item_img_div = $("<div>").addClass("item_img").append($item_img);
    const $sub_sect_1 = $("<section>").addClass("sub-sect1").append($item_img_div);


    const $item_title = $("<span>").text(data.title);
    const $price = $("<span>").text('$' + (data.price / 100));
    const $item_title_wrapper = $("<div>").append($item_title, $price);
    const $item_description = $("<p>").text(data.item_description);
    const $sub_sect_2 = $("<section>").addClass("sub-sect2").append($item_title_wrapper, $item_description);

    const $star = $("<i>").addClass("fa-solid fa-star");
    const $button2 = $("<button>").attr("type", 'submit').addClass("delete").text("DELETE");
    const $button3 = $("<button>").attr("type", 'submit').addClass("sold").text("Mark As Sold");
    const $star_wrapper = $("<div>").text("Favourite this item").append($star);
    const $sub_sect_3 = $("<section>").addClass("sub-sect3").append($star_wrapper, $button2, $button3);



    const $article = $("<article>").addClass("item").append($sub_sect_1, $sub_sect_2, $sub_sect_3);
    return $article;
  };

  const renderItems = function (items) {
    for (let each of items) {
      $(".listing").append(createItemElement(each));
    }
  };

  const loadItems = function () {
    $.post("/user/fav", function (data) {
      renderItems(data);
    });
  };

  loadItems();
});


