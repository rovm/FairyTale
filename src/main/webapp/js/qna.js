var email = $("#email"),
    phone = $("#phone"),
    comment = $("#comment");

$("#sendToMail").on('click', function(){
   emailjs.init("user_Dt9oz4QlqMeV4GWjgVrkl");
   emailjs.send("fairytale","template_O438q2Jn",{email: email.val(), phone: phone.val() , comment: comment.val()})
  .then(function(response) {
    swal({
		  title: "전송 완료!",
			type: "success",
			confirmButtonColor: "#9ACD32",
			confirmButtonText: "OK",
			html: true
		});
      console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
  }, function(err) {
      console.log("FAILED. error=", err);
  });
})
