"use strict"
var first = true;
var sec = true;

hoverClass("", "#com-font", "orange", "#com-king-s")
hoverClass("", "#com-font2", "orange", "#com-together-s")
hoverClass("", "#com-font3", "orange", "#com-bord-s")
lengthTest(); //div 다 안차면 버튼 회색으로 만듬


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
	
	$('#d').val()
/*모달 끝*/
	
	//버튼 이벤트 시작
	var i = 1
	$("#next-btn").click(function(){
		$("#d").empty()
		       .append(++i);
		$("#video-box").empty()
		json2();
		lengthTest();
	})
	
	$("#prev-btn").click(function(){
		if (i != 1) {
		  $("#d").empty()
			     .append(--i);
	      $("#video-box").empty()
		  json();
		}
		
		lengthTest();
	})
    
	//버튼 이벤트 끝
});

/*얘도 모달*/
function modalImg(no) {
	console.log(no)
	var t = $(no).attr("src");
	$(".modal-body").html("<img src='"+t+"' class='modal-img'>");
	$("#myModal").modal();
}

//0.1초뒤에 버튼 회색!
function lengthTest() {
	setTimeout(() => {
		console.log($(".video").length)
		if ($(".video").length != "5"){
			console.log($(".video").length)
			$("#next-btn").attr("disabled", "true")
			              .css("background-color", "darkgray");
		} else if ($(".video").length == 5) {
			$("#next-btn").removeAttr("disabled", "true")
			              .css("background-color", "");
		}
	}, 100);	
	
}


//JSON
json()
function json() {
	
	$.getJSON('../js/together.json', function(data) {
		
		var testData = {
				div : [ 
					{ 
						imgId : data.div1.imgId, 
						srcImg : data.div1.srcImg, 
						title : data.div1.title, 
						content : data.div1.content,
						date : data.div1.date
					},
					{ 
						imgId : data.div2.imgId, 
						srcImg : data.div2.srcImg, 
						title : data.div2.title, 
						content : data.div2.content,
						date : data.div2.date
					},
					{ 
						imgId : data.div3.imgId, 
						srcImg : data.div3.srcImg, 
						title : data.div3.title, 
						content : data.div3.content,
						date : data.div3.date
					},
					{ 
						imgId : data.div4.imgId, 
						srcImg : data.div4.srcImg, 
						title : data.div4.title, 
						content : data.div4.content,
						date : data.div4.date
					},
					{ 
						imgId : data.div5.imgId, 
						srcImg : data.div5.srcImg, 
						title : data.div5.title, 
						content : data.div5.content,
						date : data.div5.date
					}
					]
		} 
		var template = Handlebars.compile($('#template').html());
		var html = template(testData);
		$("#video-box").append(html);
		
		console.log(template);
		console.log(html);
	})
}
function json2() {
	$.getJSON('../js/together.json', function(data) {
		var testData = {
				div : [ 
					{ 
						"imgId" : data.div11.imgId, 
						srcImg : data.div11.srcImg, 
						title : data.div11.title, 
						content : data.div11.content,
						date : data.div11.date
					}
					]
		}
		
		var template = Handlebars.compile($('#template').html());
		var html = template(testData);
		$("#video-box").append(html);
	})	
}
