
$(document).ready(function () {
  const createitemElement = function (data) {
    const $img = $("<img>").attr("src", data.user.avatars);
    const $name = $("<span>").text(data.user.name);
    const $user = $("<div>").addClass("left-items").append($img, $name);
    const $span = $("<span>").addClass("right-items").text(data.user.handle);
    const $header = $("<header>").addClass("tweet-header").append($user, $span);

    const $p = $("<p>").text(data.content.text);
    if (data.content.text.length > 30) {
      //changes font based on length of input
      $p.addClass("smaller-font");
    }
    const $section = $("<section>").addClass("tweet-body").append($p);

    const $span2 = $("<span>").addClass("left-items").text(timeago.format(data.created_at));
    const $i1 = $("<i>").addClass(["fa-solid", "fa-heart"]);
    const $i2 = $("<i>").addClass(["fa-solid", "fa-retweet"]);
    const $i3 = $("<i>").addClass(["fa-solid", "fa-flag"]);
    const $div = $("<div>").addClass(["right-items", "icons"]).append($i1, $i2, $i3);
    const $footer = $("<footer>").addClass("tweet-footer").append($span2, $div);

    const $article = $("<article>").addClass("tweet").append($header, $section, $footer);
    return $article;
  };

  // const renderItems = function (items) {
  //   for (let each of items) {
  //     $("#items-section").prepend(createTweetElement(each));
  //   }
  // };

  // const loadItems = function () {
  //   $.get("/").then((data) => {
  //     $("#items-section").empty();
  //     renderItems(data);
  //   });
  // };

  // loadItems();

  $("error").css("display", "none");
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    let tweetLength = $("#tweet-text").val();
    $(".error").slideUp();
    if (!tweetLength) {
      $(".error").css({ "background-color": "red" }).text("Input must have a valid length!!").prepend('<i class="fa-solid fa-triangle-exclamation"></i>');
      return $(".error").slideDown("slow");
    }
    if (tweetLength.length > 140) {
      $(".error").css({ "background-color": "red" }).text("Input must be 140 characters or less!!").prepend('<i class="fa-solid fa-triangle-exclamation"></i>');
      return $(".error").slideDown("slow");
    }
    const data = $(this).serialize();
    $.post("/tweets", data).then(() => {
      $(".error").css({ "background-color": "rgba(162, 0, 255, 0.322)" }).text("Alright!! The world is now one Chirp louder!!").prepend('<i class="fa-solid fa-circle-check"></i>').slideDown("slow");
      $("#tweet-text").val("");
      $("#tweet-text").siblings("div").children(".counter").val(140);
      loadtweets();
    });
  });
});
