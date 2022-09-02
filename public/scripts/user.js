//let toggled = false

$('.update').click(function(){

      $('.update-div').hide();
      $('.update-form').show();
      $('.aboutME-text').focus();

      $('.update-form').submit(function(e) {
        e.preventDefault();

        $.ajax({
          url: '/user/update',
          type: 'POST',
          data: $(this).serialize(),
          success: (result) => {
            console.log('SUCCESSS', result[0].description);
           $('aboutME-text').val(result[0].description)
           window.location.href='/user';
            //  $('.update-div').show();

            // $('.update-form').hide();

          },
        });
      });
    // }
});


