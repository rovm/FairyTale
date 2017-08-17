var jsNo,
	mno,
	pageNoTag = $('#page-no'),
	prevBtn = $('#prev-btn'),
	nextBtn = $('#next-btn'),
	pageSize = 12,
	currPageNo = parseInt(pageNoTag.text()),
	StartPage,
	MovePage,
	EndPage;
	
$.getJSON('userinfo.json', function(result) {
	mno = result.data.no;
	console.log(mno)
	displayList(1, mno)
})

prevBtn.on('click', function() {
  displayList(currPageNo - 1, mno)
})

nextBtn.on('click', function() {
  displayList(currPageNo + 1, mno)	
})

var totalCount;

function displayList(pageNo, mno) {
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('CustPage_list.json', {'pageNo':pageNo, 'pageSize': pageSize, 'mno': mno}, function(result) {
	var totalCount = result.data.totalCount;
	var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
	console.log(result)
//    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
    var templateFn = Handlebars.compile($('#Storage-template').text())
    var generatedHTML = templateFn(result.data)
    $(".gallery").text('') // tbody의 기존 tr 태그들을 지우고
    $(".gallery").html(generatedHTML) // 새 tr 태그들로 설정한다.
		
    currPageNo = pageNo
    pageNoTag.text(currPageNo)

    if (currPageNo == 1) {
      prevBtn.prop('disabled', true)
    } else {
      prevBtn.prop('disabled', false)
    }

    if (currPageNo == lastPageNo) {
      nextBtn.prop('disabled', true)
    } else {
      nextBtn.prop('disabled', false)
    }

    gallery.ready_();
  }) // getJSON()
} // displayList()

/******************************************************************/
var gallery = (function(){
	  'use strict';
	  return {
	    // this.js(obj)
	    js: function(e){
	    	no = e;
	    	return $("[data-js="+e+"]");},
	    // this.lk(obj)
	    lk: function(e){
	    	no = e;
	    	return $("[data-lk="+e+"]");},
	    // Ready functions
	    ready_: function(){this.events();},
	    //  functions
	    events:function(){
	      var self = this;
	      var close = $('.gallery_item_full');
	      // Get all data js and add clickOn function
	      $('.gallery_item_preview a[data-js]').click(function() {
	        jsNo = $(this).attr("data-js")
	        
	        $.getJSON('storage-detail.json', {'ctno': jsNo}, function(result) {
			  var data = result.data
			  console.log(data)
			  var templateFn = Handlebars.compile($('#FairyTaleContent-template').text())
			  var generatedHTML = templateFn(result.data)
			  $("#FairyTale_Content").text('') // tbody의 기존 tr 태그들을 지우고
		      $("#FairyTale_Content").html(generatedHTML) // 새 tr 태그들로 설정한다.
		      
		      StartPage = data.list[0].bkno;
			  MovePage = StartPage;
			  EndPage = StartPage + data.list.length -1;
			  
			  Slider()
			  
	        })
	        
	        self.fx_in($('div[data-lk=' + jsNo + ']')); 
	        self.fx_in($('.box'));
	      });
	      
	      // close on click
	      $('').on("click",function(){
	        self.fx_out($('.gallery_item_full'));
	        self.fx_out($('.box'));
	      });
	  
	    },
 
	    // out function
	    fx_out: function(el){
	      el.addClass('efOut')
	      .delay(500)
	      .fadeOut('fast')
	      .removeClass('efIn');
	      $('body').css({overflow:'auto'});
	      return false;
	    }, 
	    // in function
	    fx_in: function(el){
	      el.removeClass('efOut')
	      .show()
	      .addClass('efIn');
	      $('body').css({overflow:'hidden'});
	      return false;
	    }
	  };
	})();
// ready function of gallery
gallery.ready_();

/*********************************************************/
function Slider(){
	jQuery(document).ready(function ($) {

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

		$('a.control_prev').click(function () {
			moveLeft();
			MovePage -= 1;
			if(MovePage < StartPage){
				MovePage = EndPage;
			}
			console.log(MovePage)
		});

		$('a.control_next').click(function () {
			moveRight();
			MovePage += 1;
			if(MovePage > EndPage){
				MovePage = StartPage;
			}
			console.log(MovePage)
		});
		
		$("#recordPlay").on("click", function() {
			  $(".playREC"+ MovePage)[0].play();
		})
		  
		$("#recordStop").on("click", function() {
			  $(".playREC"+ MovePage)[0].pause();
		})

		  $(".playREC"+ MovePage)[0].onended = function() {
				  console.log("Start MovePage:" + MovePage)
				  moveRight();
				  MovePage += 1;
				  console.log("Next MovePage:" + MovePage)
				  $(".playREC"+ MovePage)[0].play();
				  
				  autoplayRecord(MovePage)

		  }
		
		function autoplayRecord(MovePage) {
			$(".playREC"+ MovePage)[0].onended = function() {
				console.log("MovePage:" + MovePage)
				  moveRight();
				  MovePage += 1;
				  console.log("Next MovePage:" + MovePage)
				  $(".playREC"+ MovePage)[0].play();
				  if(MovePage == EndPage){
					  $(".playREC"+ MovePage)[0].onended = function() {
						alert("동화가 종료 되었습니다.")
						location.href = 'storage.html'
					}
					  return;
				  } else{
					  autoplayRecord(MovePage)
				  }
		}
		}
		
		$('#replay').on("click", function() {
			MovePage = StartPage;
		})
	});
}


