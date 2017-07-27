$('#login-btn').on('click',function(e) {
    $.post('login2.json', {
      'email': $('#login-email').val(),
      'password': $('#login-password').val()
    }, function(result) {
      if(result.status=="success")
      {
      location.href = 'main.html'
      // e.preventDefault();
    } else {
      console.log(result.data)
    }
    }, 'json')
    // e.preventDefault();
  })
