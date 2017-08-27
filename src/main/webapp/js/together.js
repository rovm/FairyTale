"use strict"
var mno,
ctno,
bkno,
prevBtn = $('#prev-btn'),
nextBtn = $('#next-btn'),
currPageNo = $('#page-no'),
pageSize = 5,
pageNo = 1,
pageNoTag = $('#page-no'),
MovePage = 0,
StartPage,
EndPage;



userInfo()
displayList(1)


function likeCountGet(ctno) { //요거 추천수 받아오는 함수
	setTimeout(() => {
		$.getJSON('TogetherList.json', {'pageNo':pageNo, 'pageSize': pageSize, 'mno': 1}, function(result) {
			for (var i = 0; i < 5; i ++) {
				if(result.data.TogetherList[i].ctno == ctno) {
					$(".like_count_no" + ctno).text('')
					$(".like_count_no" + ctno).text(result.data.TogetherList[i].likeCount)
				}	
			}
			
		})
	}, 100);
}

function displayList(pageNo) {
	
	$.getJSON('TogetherList.json', {'pageNo':pageNo, 'pageSize': pageSize, 'mno': 1}, function(result) {
		var totalCount = result.data.totalCount;
		var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
//	// 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
		var templateFn = Handlebars.compile($('#FairyTaleContent-template').text())
		var generatedHTML = templateFn(result.data)
		$("#video-box").text('') // tbody의 기존 tr 태그들을 지우고
		$("#video-box").html(generatedHTML) // 새 tr 태그들로 설정한다.
		
		$(".content_box").on("click", function() {
		ctno = $(this).attr("data-a")
		bkno = $(this).attr("data-b")
	    })
		
		playModal()
		
		
		currPageNo = pageNo
		pageNoTag.text(currPageNo)
		
		if (currPageNo == 1) {
			prevBtn.prop('disabled', true)
			prevBtn.addClass("disable")
		} else {
			prevBtn.prop('disabled', false)
			prevBtn.removeClass("disable")
		}
		
		if (currPageNo == lastPageNo) {
			nextBtn.prop('disabled', true)
			nextBtn.addClass("disable")
		} else {
			nextBtn.prop('disabled', false)
			nextBtn.removeClass("disable")
		}
		
		confirm()
		
	}) // getJSON()
	
	
}

prevBtn.click(function() {
	displayList(currPageNo - 1)
})

nextBtn.click(function() {
	displayList(currPageNo + 1)
})
/******************************모달**************************************/
function playModal() {

	$(".content_box > img").on("click", function() {
		Modalfunction()
	})
	$(".titl").on("click", function() {
		Modalfunction()
	})
	$(".date").on("click", function() {
		Modalfunction()
	})
	$(".cont").on("click", function() {
		Modalfunction()
	})
}
function Modalfunction() {
	setTimeout(() => {
		$("#myModal").modal({backdrop: 'static', keyboard: false});	
		$.getJSON('TogetherDetail.json', {'ctno': ctno}, function(result) {
			var totalCount = result.data.totalCount;
			var templateFn = Handlebars.compile($('#Slider-template').text())
			var generatedHTML = templateFn(result.data)
			$(".FairyTale_Content").text('') // tbody의 기존 tr 태그들을 지우고
			$(".FairyTale_Content").html(generatedHTML) // 새 tr 태그들로 설정한다.
			StartPage = bkno;
			MovePage = StartPage;
			EndPage = parseInt(StartPage) + result.data.TogetherDetail.length -1;
			Slider()
			
		
		}) // getJSON()
		
	}, 100);
}
/****************************슬라이더************************************/

function Slider(){
	$(".playREC"+ MovePage)[0].play();
	$(".playREC" + MovePage).on("ended", function() {
		moveRight();
		MovePage = parseInt(MovePage) + 1;
		$(".playREC"+ MovePage)[0].play();

		autoplayRecord(MovePage)
	})
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;



	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

	$('#slider ul li:last-child').prependTo('#slider ul');



	function moveLeft() {
		$('#slider ul').animate({
			left: + slideWidth
		}, 200, function () {
			$('#slider ul li:last-child').prependTo('#slider ul');
			$('#slider ul').css('left', '');
		});
	};

	function moveRight() {
		$('#slider ul').animate({
			left: - slideWidth
		}, 200, function () {
			$('#slider ul li:first-child').appendTo('#slider ul');
			$('#slider ul').css('left', '');
		});
	};


	$(".control_prev").unbind( "click" );
	$(".control_next").unbind( "click" );
	$('.control_prev').click(function () {
		$(".playREC"+ MovePage)[0].pause();
		moveLeft();
		if(MovePage <= StartPage){
			MovePage = EndPage;
		} else {
			MovePage -= 1;
		}
	});

	$('.control_next').click(function () {
		$(".playREC"+ MovePage)[0].pause();
		moveRight();
		if(MovePage >= EndPage){
			MovePage = StartPage;
		}else {
			MovePage = parseInt(MovePage) + 1;
		}
		$(".playREC"+ MovePage)[0].play();
	});

	$("#recordPlay").on("click", function() {

		$(".playREC"+ MovePage)[0].play();
		$("#recordPlay").css("display", "none")
		$("#recordStop").css("display", "block")
	})

	$("#recordStop").on("click", function() {
		$(".playREC"+ MovePage)[0].pause();
		$("#recordStop").css("display", "none")
		$("#recordPlay").css("display", "block")

	})
	$("#recordClose").on("click", function() {
		$(".playREC"+ MovePage)[0].pause();
		$("#myModal").modal("hide")
	})
	function autoplayRecord() {
		$(".playREC"+ MovePage)[0].onended = function() {
			MovePage = parseInt(MovePage) + 1;
			moveRight();
			$(".playREC"+ MovePage)[0].play();
			if(MovePage == EndPage){
				$(".playREC"+ MovePage)[0].onended = function() {
					alert("동화가 종료 되었습니다.")
					$("#recordStop").css("display", "none")
					$("#recordPlay").css("display", "block")
					moveRight();
					MovePage = StartPage

				}
				return
			} else{
				autoplayRecord(MovePage)
			}
		}
	}

}


function userInfo() {
	$.getJSON('userinfo.json', function(result) {
		if(result.data != null) {
			mno = result.data.no;
		}		
	})
}

function like(ctno) {

	if(mno==null) {
		swal({
			  title: "로그인이 필요합니다",
			  text: "서비스를 이용하시려면 로그인이 필요합니다.",
			  confirmButtonText: "확인",
				confirmButtonColor: "#6384E1",
				html: true
			})
	} else{
		if($(".heart" + ctno).attr("class") == "heart" + ctno + " heart-box" ) {
			$.getJSON('addLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
				$(".heart" + ctno).addClass("heartfull-box")
				.removeClass("heart-box")
				$(".heart" + ctno + "> a").removeClass("fa-heart-o")
				.removeClass("heart")
				.addClass("fa-heart")
				.addClass("heartfull")
				confirm()
			})
			
			likeCountGet(ctno)
			
		} else {
			$.getJSON('delLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
				$(".heart" + ctno).addClass("heart-box")
				.removeClass("heartfull-box")
				$(".heart" + ctno + "> a").removeClass("fa-heart")
				.removeClass("heartfull")
				.addClass("fa-heart-o")
				.addClass("heart")
				confirm()
			})
			
			likeCountGet(ctno)
		}


	}
}

var rmnd;
function confirm() {
	if(mno !=null) {
		$.getJSON('heartfull.json', {'mno': mno}, function(result) {
			try {
				if(result.data.heartfull[0].rmnd != null) {
					for (var i= 0; i < result.data.heartfull.length; i++) {
						ctno = result.data.heartfull[i].ctno
						if(result.data.heartfull[i].ctno == $('.heart'+ctno).attr('data-no')) {
							$(".heart" + ctno + " > a").removeClass("fa-heart-o")
							.removeClass("heart")
							.addClass("fa-heart")
							.addClass("heartfull")
							$(".heart" + ctno).addClass("heartfull-box")
							.removeClass("heart-box")
						}
					}
				}
			} catch(exception) {
			}   


		})
	}
}



