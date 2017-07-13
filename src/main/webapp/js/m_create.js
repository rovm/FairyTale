$(document).ready(function(){
	// options
	var speed = 500; //transition speed - fade
  // var autoswitch = true; //auto slider options
	// var autoswitch_speed = 5000; //auto slider speed

	// add first initial active class
	$(".slide").first().addClass("active");

	// hide all slides
	$(".slide").hide;

	// show only active class slide
	$(".active").show();

	// Next Event Handler
	$('#next').on('click', nextSlide);// call function nextSlide

	// Prev Event Handler
	$('#prev').on('click', prevSlide);// call function prevSlide

	// Auto Slider Handler
	// if(autoswitch == true){
	// 	setInterval(nextSlide,autoswitch_speed);// call function and value 4000
	// }

	// Switch to next slide
	function nextSlide(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':last-child')){
			$('.slide').first().addClass('active');
		} else {
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}

	// Switch to prev slide
	function prevSlide(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':first-child')){
			$('.slide').last().addClass('active');
		} else {
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}
});

var state = 'stop';

function buttonBackPress() {
    console.log("button back invoked.");
}

function buttonForwardPress() {
    console.log("button forward invoked.");
}

function buttonRewindPress() {
    console.log("button rewind invoked.");
}

function buttonFastforwardPress() {
    console.log("button fast forward invoked.");
}

function buttonPlayPress() {
    if(state=='stop'){
      state='play';
      var button = d3.select("#button_play").classed('btn-success', true);
      button.select("i").attr('class', "fa fa-pause");
    }
    else if(state=='play' || state=='resume'){
      state = 'pause';
      d3.select("#button_play i").attr('class', "fa fa-play");
    }
    else if(state=='pause'){
      state = 'resume';
      d3.select("#button_play i").attr('class', "fa fa-pause");
    }
    console.log("button play pressed, play was "+state);
}

function buttonStopPress(){
    state = 'stop';
    var button = d3.select("#button_play").classed('btn-success', false);
    button.select("i").attr('class', "fa fa-play");
    console.log("button stop invoked.");
}

//녹음버튼
// var $element = $('.speech-control-container');
//
// $element.on('click', function(){
//  $element.addClass('listen').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
//     $element.removeClass('listen');    $element.addClass('loading').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
//       $element.removeClass('loading');
//     });
//   });
// });
