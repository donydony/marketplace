//const { use } = require("../../routes/messages");

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`);
});

const createMessageElement = function (divClass, text, user_pic) {
  let $message;
  if (divClass.includes('current')) {
    $message = `<tr>
  <td>
    <div class="${divClass}">
        <span>${text}</span>
        <img class="messages-text-pic" src="${user_pic}" alt="Profile picture">
    </div>
  </td>
</tr>`;
  } else {
    $message = `<tr>
  <td>
    <div class="${divClass}">
        <img class="messages-text-pic" src="${user_pic}" alt="Profile picture">
        <span>${text}</span>
    </div>
  </td>
</tr>`;
  }
  return $message;
};

socket.on('receive-message', message => {
  console.log('emit received: ', message);
  const convo_id = $('#convo_id')[0].value;
  const user_id = $('#user_id')[0].value;

  if (message.conversation_id == convo_id) {
    if (message.sender_id == user_id) {
      const user_pic = $('#user_pic')[0].value;
      $('#messages-texts-table').append(createMessageElement('messages-current-user', message.message, user_pic));
      $("#messages-texts").scrollTop($("#messages-texts")[0].scrollHeight);
    } else {
      const user_pic = $('#messages-header-pic')[0].src;
      $('#messages-texts-table').append(createMessageElement('messages-other-user', message.message, user_pic));
      $("#messages-texts").scrollTop($("#messages-texts")[0].scrollHeight);
    }
  }
});

$(document).ready(function () {
  $("#messages-texts").scrollTop($("#messages-texts")[0].scrollHeight);

  $('#new-message-text').on('input', function() {
    const counter = 300 - this.value.length;
    $("#tcounter")[0].value = counter;
    if (counter >= 0) {
      $("#tcounter")[0].style.color = '#545149';
    } else {
      $("#tcounter")[0].style.color = "red";
    }
  });

  $('#new-message').on('submit', function (subEvent) {
    subEvent.preventDefault();
    const msgValue = $('#new-message-text')[0].value;

    if (msgValue.length === 0) {
      //error checking message value
      const $error = '<i class="fa-solid fa-circle-exclamation"></i>'
      $('#message-error').empty().append($error, " Cannot send empty message! ", $error).hide().slideDown('slow');

    } else if (msgValue.length > 300) {
      //error checking message value
      const $error = '<i class="fa-solid fa-circle-exclamation"></i>';
      $('#message-error').empty().append($error, ' Message over 300 characters! ', $error).hide().slideDown('slow');
    } else {
      //POST message, then emit message
      const formData = $(this).serialize();
      $.ajax('/messages/' + $('#convo_id')[0].value, { method: 'POST', data: formData })
        .then((result) => {
          console.log('Successful POST emitting: ', result);
          $('#new-message-text').val('');
          $('#tcounter').val('300');
          socket.emit('send-message', result);
        });
    }
  });
});