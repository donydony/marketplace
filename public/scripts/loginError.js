// Client facing scripts here
$('#user-name-input').keypress( function() {
  $('#error').hide();
});

$('#login-form').submit(function(e) {
  //prevent the page from refresging
 e.preventDefault();

/** Ajax will post to login route
 * and will wait for a response
 * from the route in the form
 * of a success or an error*/
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


