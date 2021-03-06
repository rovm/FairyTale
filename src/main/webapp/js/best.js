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

var oldyear = dt.getFullYear(),
oldmonth = dt.getMonth()
if(month == 1) {
	oldyear = dt.getFullYear() -1
}


$("#y" + oldyear).attr('selected', 'selected')
$("#m" + oldmonth).attr('selected', 'selected')


$("#year>.drop").on("change", function() {
	oldyear = $("#year .drop").val()
	displayList2()
})

$("#month>.drop").on("change", function() {
	oldmonth = $("#month .drop").val()
	displayList2()
})


/*********************리스트 뿌려주기**********************/
displayList()
displayList2()

function displayList() {

	$.getJSON('BestList.json', {'year': year, 'month': month}, function(result) {

		$("#com-titl-best").html("<br><h1>"+ year +"<br>제"+ month +	"회 명예의전당</h1>")

		var templateFn = Handlebars.compile($('#Best-template').text())
		var generatedHTML = templateFn(result.data)
		$(".slider-content").text('') // tbody의 기존 tr 태그들을 지우고
		$(".slider-content").html(generatedHTML) // 새 tr 태그들로 설정한다.
		modalStart()
		slideStart()
	}) // getJSON()

}

function displayList2() {

	$.getJSON('BestList.json', {'year': oldyear, 'month': oldmonth}, function(result) {
        console.log(result)
		if(result.data.BestLastList.length == 0) {
			$(".com-oldbest-box").css("display", "none")
		} else {
			$(".com-oldbest-box").css("display", "block")
			$(".com-oldbest-box").html("<div class='com-oldbest-standard'>" +
					"<div id = 'ranking'><div id='gold' class='rank'><img src='../img/gold.png'></div><div id='silver' class='rank'><img src='../img/silver.png'></div><div id='bronz' class='rank'><img src='../img/bronze.png'></div></div>" +
					"<div class='com-titl-box'>" +
					"제 " + oldmonth + "회 명예의전당" +
					"</div><div class='com-oldbest'>" +
			"</div></div>")
		}

		var templateFn = Handlebars.compile($('#BestOld-template').text())
		var generatedHTML = templateFn(result.data)
		$(".com-oldbest").text('') // tbody의 기존 tr 태그들을 지우고
		$(".com-oldbest").html(generatedHTML) // 새 tr 태그들로 설정한다.

	}) // getJSON()
}
/*********************리스트 뿌려주기 끝**********************/

/*******************모달**********************/
function modalStart() {

	$("img").click(function(){
		bkno = $(this).attr("data-b")
		ctno = $(this).attr("data-a")
		Modalfunction();
	});

}

function Modalfunction() {

	setTimeout(() => {
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
			Slider()
		}) // getJSON()
	}, 100);

}

function Slider(){

	setTimeout(() => {
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