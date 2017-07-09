"use strict"
var first = true;
var sec = true;

hoverClass(".fa-optin-monster", "#com-font", "red", "#com-king-s")
hoverClass(".fa-reddit-alien", "#com-font2", "orange", "#com-together-s")
hoverClass(".fa-linux", "#com-font3", "darkblue", "#com-bord-s")


function hoverClass(fa, font, col, did) {
  console.log("gd");
  $(fa).hover(function(){
    console.log("이정표 호버 이벤트")

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
