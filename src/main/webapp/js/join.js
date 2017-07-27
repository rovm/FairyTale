var fiNo = $('#fi-no'),
	fiName = $('#name'),
    fiEmail = $('#email'),
    fiPassword = $('#password'),
    fiTel = $('#tel');

$('#join-btn').on('click',function(e) {
	console.log('sss');
    $.post('add2.json', {
      'name' : fiName.val(),
      'email': fiEmail.val(),
      'password': fiPassword.val(),
      'tel': fiTel.val()
    }, function(result) {
      if(result.status=="success")
      {console.log(result);
      location.href = 'main.html'
      // e.preventDefault();
    } else {
      console.log(result.data)
    }
    }, 'json')
    console.log('www');
    // e.preventDefault();
  })
