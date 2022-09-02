let toggle = false;
$('.dropbtn').click(function(e) {
  if(!toggle){
    $('.options').show();
    toggle = true;
  }else {
    $('.options').hide();
    toggle = false;
  }

})
