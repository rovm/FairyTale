var fiNo = $('#fi-no'),
    fiEmail = $('#email'),
    fiTel = $('#tel'),
    fiPassword = $('#password');

$('#join-btn').on('click',function() {	
    $.post('join.json', {
      'email': fiEmail.val(),
      'phone': fiTel.val(),
      'password': fiPassword.val(),
    }, function(result) {
      location.href = 'main.html'
    }, 'json')
    console.log(fiEmail.val(), fiTel.val(), fiPassword.val())
  })
  