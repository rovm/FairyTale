"use strict"
var mno,
ctno,
bkno,
MovePage = 0,
StartPage,
EndPage;

var dt = new Date(),
year = dt.getFullYear(),
month = dt.getMonth() +1;

//$("#com-titl-best").html("<br><h1>"   + year + 
//"<br>제"
//+ month + 
//"회 명예의전당</h1>")

/*********************리스트 뿌려주기**********************/
displayList()

function displayList() {

	$.getJSON('BestList.json', function(result) {
		console.log(result)
		var templateFn = Handlebars.compile($('#Best-template').text())
		var generatedHTML = templateFn(result.data)
		$(".slider-content").text('') // tbody의 기존 tr 태그들을 지우고
		$(".slider-content").html(generatedHTML) // 새 tr 태그들로 설정한다.
		modalStart()
		slideStart()
	}) // getJSON()
}
/*********************리스트 뿌려주기 끝**********************/

/*******************모달**********************/
function modalStart() {
	$("img").click(function(){
//		console.log(ctno = $(this).attr("data-a"))
//		console.log("이거",bkno)
		bkno = $(this).attr("data-b")
		ctno = $(this).attr("data-a")
		Modalfunction();
	});
}
function Modalfunction() {

	setTimeout(() => {



		console.log("?")
//		console.log("모달 순서 1")
		$("#myModal").modal({backdrop: 'static', keyboard: false});	

		$.getJSON('TogetherDetail.json', {'ctno': ctno}, function(result) {
			var totalCount = result.data.totalCount;
			var templateFn = Handlebars.compile($('#BestSlider-template').text())
			var generatedHTML = templateFn(result.data)
			$(".FairyTale_Content").text('') // tbody의 기존 tr 태그들을 지우고
			$(".FairyTale_Content").html(generatedHTML) // 새 tr 태그들로 설정한다.
			StartPage = bkno;
			MovePage = StartPage;
			EndPage = parseInt(StartPage) + result.data.TogetherDetail.length -1;
//			console.log("디테일",result)
//			console.log(EndPage)
//			console.log("무브",MovePage)
			Slider()



		}) // getJSON()
	}, 100);
}
function Slider(){

	console.log("시작은 돼?")

	setTimeout(() => {
		console.log("으아")
//		console.log("0번방",$(".playREC"+ MovePage))
//		console.log(MovePage)
		$(".playREC"+ MovePage)[0].play();
		$(".playREC" + MovePage).on("ended", function() {
			moveRight();
			MovePage = parseInt(MovePage) + 1;
			$(".playREC"+ MovePage)[0].play();

			autoplayRecord(MovePage)
//			MovePage = StartPage
//			console.log("끝")
		})
//		console.log(MovePage)
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
//			console.log("prev");
			moveLeft();
			if(MovePage <= StartPage){
				MovePage = EndPage;
				console.log(MovePage)
			} else {
				MovePage -= 1;
				console.log(MovePage)
			}
		});

		$('.control_next').click(function () {
			$(".playREC"+ MovePage)[0].pause();
//			console.log("next");
			moveRight();
			if(MovePage >= EndPage){
				MovePage = StartPage;
//				console.log(MovePage)
			}else {
				MovePage = parseInt(MovePage) + 1;
//				console.log(MovePage)
			}
			$(".playREC"+ MovePage)[0].play();
		});

		$("#recordPlay").on("click", function() {

//			console.log(" 안내지!")
//			console.log(MovePage)
			$(".playREC"+ MovePage)[0].play();
//			console.log($(".playREC"+ MovePage)[0])
//			console.log($(".playREC"+ MovePage)[0].play())
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
//				console.log("오토에서받는 :" + MovePage)
				MovePage = parseInt(MovePage) + 1;
				moveRight();
//				console.log("Next MovePage:" + MovePage)
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
	}, 100);
}



/*******************모달 끝*******************/


/************************************슬라이더***********************/
function slideStart() {
	var slide = $('.slider-single');
	var slideTotal = slide.length - 1;
	var slideCurrent = -1;
	slideInitial();



	function slideInitial() {
		slide.addClass('proactivede');
		slideRight();
//		setInterval(() => {
//		slideRight();
//		}, 3000);
	}

	function slideRight() {

		if (slideCurrent < slideTotal) {
			slideCurrent++;
		} else {
			slideCurrent = 0;
		}

		if (slideCurrent > 0) {
			var preactiveSlide = slide.eq(slideCurrent - 1);
		} else {
			var preactiveSlide = slide.eq(slideTotal);
		}
		var activeSlide = slide.eq(slideCurrent);
		if (slideCurrent < slideTotal) {
			var proactiveSlide = slide.eq(slideCurrent + 1);
		} else {
			var proactiveSlide = slide.eq(0);

		}

		slide.each(function() {
			var thisSlide = $(this);
			if (thisSlide.hasClass('preactivede')) {
				thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
			}
			if (thisSlide.hasClass('preactive')) {
				thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
			}
		});
		preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
		activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
		proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
	}

	function slideLeft() {
		clearInterval()
		if (slideCurrent > 0) {
			slideCurrent--;
		} else {
			slideCurrent = slideTotal;
		}

		if (slideCurrent < slideTotal) {
			var proactiveSlide = slide.eq(slideCurrent + 1);
		} else {
			var proactiveSlide = slide.eq(0);
		}
		var activeSlide = slide.eq(slideCurrent);
		if (slideCurrent > 0) {
			var preactiveSlide = slide.eq(slideCurrent - 1);
		} else {
			var preactiveSlide = slide.eq(slideTotal);
		}
		slide.each(function() {
			var thisSlide = $(this);
			if (thisSlide.hasClass('proactivede')) {
				thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
			}
			if (thisSlide.hasClass('proactive')) {
				thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
			}
		});
		preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
		activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
		proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
	}


	var left = $('.slider-left');
	var right = $('.slider-right');
	left.on('click', function() {
		slideLeft();
	});
	right.on('click', function() {
		slideRight();
	});

}
/********************슬라이더 끝***************************/