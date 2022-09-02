$(document).ready(function () {
  const createItemElement = function (data) {

    const $item_img = $("<img>").attr("src", data.img_url).addClass("img");
    const $item_img_div = $("<div>").addClass("item_img").append($item_img);
    const $sub_sect_1 = $("<section>").addClass("sub-sect1").append($item_img_div);


    const $item_title = $("<span>").text(data.title);
    const $price = $("<span>").text('$' + (data.price / 100)).attr('id','price');
    const $item_title_wrapper = $("<div>").append($item_title, $price).attr('id','item-title-wrapper');
    const $item_description = $("<p>").text(data.item_description).attr('id', 'item-descript');
    const $sub_sect_2 = $("<section>").addClass("sub-sect2").append($item_title_wrapper, $item_description);

    const $button2 = $("<button>").attr("type", 'submit').addClass("delete").text("DELETE");
    $button2.on("click" , function (event) {
      event.preventDefault();
      $.ajax({
        type: "DELETE",
        url: "/user/fav/delete",
        data: data,
        success: (data) => {
          window.location.href='/user';
        }
      });

    });
    const $button3 = $("<button>").attr("type", 'submit').addClass("sold");
    if (data.sold_status) {
      $button3.text("SOLD").attr("type", 'button').addClass("btn btn-outline-secondary");
    } else {
      $button3.text("Mark as Sold").attr("type", 'submit').addClass("msg-redirect");
      $button3.on("click", function (event) {
        event.preventDefault();
        $.ajax({
          type: "PUT",
          url: "/user/fav/sold",
          data: data,
          success: (data) => {
            window.location.href='/user';
          }
        });
      });
    }

    const $sub_sect_4 = $("<section>").addClass("sub-sect3");

    //const $link = `<a href='/messages/:id'><span>Message Buyer</span><i class="fa-thin fa-message-arrow-up-right"></i><a>`;

    const $button4 = $("<button>").attr("type", 'submit').text("Message");
    $button4.on("click", function (event) {
      //console.log(data)
      event.preventDefault();
      $.ajax({
        type: "POST",
        url: "/user/abc",
        data: data,
        success: (data) => {
          if(data !== '')
          window.location.href=`/messages/${data.id}`;
        }
      });
    });

    const $sub_sect_3 = $("<section>").addClass("sub-sect3").append($button2, $button3, $button4);

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


