"use strict"

/* 모달  시작*/
$(document).ready(function(){
	  $("#select-btn").click(function(){
	  var t = $(this).attr("src");
	  $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
	  $("#myModal").modal();
	});
});

/*모달 끝*/

