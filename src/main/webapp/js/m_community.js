"use strict"
var first = true;
var sec = true;

hoverClass(".fa-optin-monster", "#com-font", "red", "#com-king-s")
hoverClass(".fa-reddit-alien", "#com-font2", "orange", "#com-together-s")
hoverClass(".fa-linux", "#com-font3", "darkblue", "#com-bord-s")


function hoverClass(fa, font, col, did) {
  console.log("gd");
  $(fa).hover(function(){
    console.log("이정표 호버 이벤")

    if (first == true) {
      console.log("안되나?")
      $(did).css("background-color", col)

      $(fa).css("color", "white")
      $(font).css("color", "white")
      first= false
      return;
    }


    if(first == false) {
      console.log("응?")
      $(did).css("background-color", "")
      $(font).css("color", "black")
      $(fa).css("color", col)

      first=true
      return;
    }
  });



  $(font).hover(function(){

    console.log("메뉴얼 호버 이벤트")

    if (sec == true) {
      $(did).css("background-color", col)
      $(fa).css("color", "white")
      $(font).css("color", "white")
      sec = false
      return;
    }


    if(sec == false) {
      $(did).css("background-color", "")
      $(font).css("color", "black")
      $(fa).css("color", col)
      sec = true
      return;
    }
  });
}


more ("#m12", ".b11")
more ("#m11", ".b10")
more ("#m10", ".b9")
more ("#m9", ".b8")
more ("#m8", ".b7")
more ("#m7", ".b6")
more ("#m6", ".b5")
more ("#m5", ".b4")
more ("#m4", ".b3")
more ("#m3", ".b2")
more ("#m2", ".b1")

/* 더보기 */
function more (id, next) {
  $(id).click(function(){
	console.log("더보기!")
	$(id).css("display", "none")
	$(next).css("display", "block")
	return;
  });	
}


/* 모달  시작*/
$(document).ready(function(){
	  $("img").click(function(){
	  var t = $(this).attr("src");
	  $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
	  $("#myModal").modal();
	});

	$("video").click(function(){
	  var v = $("video > source");
	  var t = v.attr("src");
	  $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
	  $("#myModal").mosssdal();  
	});
	});//EOF Document.ready
	
