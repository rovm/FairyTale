$('#login-btn').on('click',function(e) {
    $.post('login2.json', {
      'email': $('#login-email').val(),
      'password': $('#login-password').val()
    }, function(result) {
      if(result.status=="success")
      {
        // console.log();
        location.href = 'main.html'
        $('.login-link').css('display', 'none');
        $('.logout-link').css('display', 'block');

      // e.preventDefault();
    } else {
      console.log(result.data)
    }
    }, 'json')
    // e.preventDefault();
  })

  $.getJSON('userinfo.json', function (result) {
    if(result.data.no != null){
      $('.login-link').css('display', 'none');
      $('.logout-link').css('display', 'block');
      $('.sign-link').css('display', 'none');
    }
  })

  $('.logout-link').on('click', function() {
    $.getJSON('logout.json', function (result) {
      $('.login-link').css('display', 'block');
      $('.logout-link').css('display', 'none');
      $('.sign-link').css('display', 'block');
    })
  })
