var fiNo = $('#fi-no'),
	fiName = $('#name'),
    fiEmail = $('#email'),
		fiEmailAuth = $('#email-auth'),
    fiPassword = $('#password'),
		fiPasswordAuth = $('#password-auth'),
    fiTel = $('#tel'),
		authCode,
		authTrue = false;



$('#join-btn').on('click',function(e) {

	if(fiName.val() == ''){
		swal({
		  title: "이름을 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
		//swal("이름을 입력하세요", "", "error");
	}
	else if (fiEmail.val() == '') {
		swal({
		  title: "이메일을 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
	else if (fiEmailAuth.val() == '') {
		swal({
		  title: "인증번호를 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}

	else if (fiPassword.val() == '') {
		swal("비밀번호를 입력하세요", "", "error");
		swal({
		  title: "이메일을 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
	else if (fiPasswordAuth.val() == '') {
		swal({
		  title: "비밀번호를 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
	else if (fiTel.val() == '') {
		swal({
		  title: "전화번호를 입력하세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
	else if(fiPassword.val() != fiPasswordAuth.val()){
		swal({
		  title: "비밀번호가 다릅니다!!!!",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
	else if (authTrue == false) {
		swal({
		  title: "인증버튼을 눌러주세요",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}

else if (fiPassword.val() == fiPasswordAuth.val() && authTrue == true ) {

	console.log('sss');
	$.post('add2.json', {
		'name' : fiName.val(),
		'email': fiEmail.val(),
		'password': fiPassword.val(),
		'tel': fiTel.val(),
		'posi':'user'
	}, function(result) {
		if(result.status=="success")
		{console.log(result);
			location.href = 'login.html'
			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	// e.preventDefault();
}
})

//이메일전송

  var email = $("#email")
  $(".email-btn").on('click', function(){
		if(email.val() == '') {
			swal({
			  title: "이메일을 입력하세요",
				confirmButtonColor: "#229AF0",
				confirmButtonText: "OK",
				html: true
			});
		} else {
			var a = parseInt(Math.random()*8+1)*1000
			var b = parseInt(Math.random()*9)*100
			var c = parseInt(Math.random()*9)*10
			var d = parseInt(Math.random()*9)
			authCode = a + b + c + d
			console.log(authCode);
		   emailjs.init("user_dSmDeeFV1PGAlBxDyjeL5");
		   emailjs.send("fairytale","template_W4WUjJzb",{authCode : authCode, email : email.val()})
		  .then(function(response) {
				swal({
				  title: "전송 완료 되었습니다",
					type: "success",
					confirmButtonColor: "#229AF0",
					confirmButtonText: "OK",
					html: true
				});
		      console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
		  }, function(err) {
		      console.log("FAILED. error=", err);
		  });
 }
})


//인증번호클릭
$(".auth-btn").on('click', function() {
	if(authCode == fiEmailAuth.val()) {
		authTrue = true
		swal({
		  title: "인증 완료!",
			type: "success",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	} else  {
		authTrue = false
		swal({
		  title: "인증번호가 다릅니다",
			type: "error",
			confirmButtonColor: "#229AF0",
			confirmButtonText: "OK",
			html: true
		});
	}
})
