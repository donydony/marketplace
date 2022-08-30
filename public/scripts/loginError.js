// Client facing scripts here
$('#user-name-input').keypress( function() {
  $('#error').hide();
});

$('#login-form').submit(function(e) {
  //prevent the page from refresging
 e.preventDefault();

$.ajax({
    url: '/login',
    type: 'POST',
    data: $(this).serialize(),
    success: (result) => {
      console.log(result);
      window.location.href='/';
    },
    error: (error) => {
      console.log(error);
      displayErr(error.responseText);
      $('#user-name-input').focus();
    }
  })
});

function displayErr(msg) {
  const $error = $('#error');
  $error.children('i').children('span').text(` Error: ${msg}`);
  $error.slideDown();
}


