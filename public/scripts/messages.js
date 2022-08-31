const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`);
});

$(document).ready(function () {
  $("#messages-texts").scrollTop($("#messages-texts")[0].scrollHeight);

  $('#new-message').on('submit', function (subEvent) {
    subEvent.preventDefault();
    const msgValue = $('#new-message-text')[0].value;
    if (msgValue.length === 0) {
      const $error = '<i class="fa-solid fa-circle-exclamation"></i>';
      $('#message-error').empty().append($error, " Cannot send empty message! ", $error).hide().slideDown('slow');
    } else if (msgValue.length > 300) {
      const $error = '<i class="fa-solid fa-circle-exclamation"></i>';
      $('#message-error').empty().append($error, ' Message over 300 characters! ', $error).hide().slideDown('slow');
    } else {
      const formData = $(this).serialize();
      $.ajax('/messages/', { method: 'POST', data: formData })
        .then((result) => {
          console.log('Successful POST emitting: ', result);
          
        });
    }
  });
});