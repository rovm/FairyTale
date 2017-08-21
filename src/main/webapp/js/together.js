"use strict"
var mno;
var ctno;
//<div style="display:none" data-no={{ctno}} class="hartfull-box" onClick="hate({{ctno}})"><a class="fa fa-heart hartfull" aria-hidden="true"></a></div></div>

 userInfo()

 $(document).ready(function() {
	 $.getJSON('TogetherList.json', {'pageNo':1, 'pageSize': 5, 'mno': 1}, function(result) {
		 var totalCount = result.data.totalCount;
//	var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
		 console.log(result)
//    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
		 var templateFn = Handlebars.compile($('#FairyTaleContent-template').text())
		 var generatedHTML = templateFn(result.data)
		 $("#video-box").text('') // tbody의 기존 tr 태그들을 지우고
		 $("#video-box").html(generatedHTML) // 새 tr 태그들로 설정한다.
		 
//    currPageNo = pageNo
//    pageNoTag.text(currPageNo)
//
//    if (currPageNo == 1) {
//      prevBtn.prop('disabled', true)
//    } else {
//      prevBtn.prop('disabled', false)
//    }
//
//    if (currPageNo == lastPageNo) {
//      nextBtn.prop('disabled', true)
//    } else {
//      nextBtn.prop('disabled', false)
//    }
		 
		  confirm()
		 
	 }) // getJSON()
 })
 



  function userInfo() {
	$.getJSON('userinfo.json', function(result) {
		if(result.data != null) {
			mno = result.data.no;
		}		
	})
  }
 
function like(ctno) {
	
	 if(mno==null) {
		 alert('로그인을 하시옵소서')
	 } else{
		 console.log($(".heart" + ctno).attr("class") == "hart-box heart" + ctno)
		 
         if($(".heart" + ctno).attr("class") == "heart" + ctno + " hart-box" ) {
			 console.log("성공적")
        	 
        	 $.getJSON('addLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
        		 $(".heart" + ctno).addClass("hartfull-box")
        		 .removeClass("hart-box")
        		 $(".heart" + ctno + "> a").removeClass("fa-heart-o")
        		 .removeClass("hart")
        		 .addClass("fa-heart")
        		 .addClass("hartfull")
        		 confirm()
        	 })
         } else {
        	 $.getJSON('delLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
        		 console.log("삭제")
        		 $(".heart" + ctno).addClass("hart-box")
        		 .removeClass("hartfull-box")
        		 $(".heart" + ctno + "> a").removeClass("fa-heart")
        		 .removeClass("hartfull")
        		 .addClass("fa-heart-o")
        		 .addClass("hart")
        		 confirm()
        	 })
         }
		 

	 }
}

//function hate(ctno) {
//	console.log(ctno)
//	console.log(mno)
//	$.getJSON('delLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
//		 console.log("성공적")
//		 confirm()
//	 })
//
//}
var rmnd;
function confirm() {
	if(mno !=null) {
		$.getJSON('hartfull.json', {'mno': mno}, function(result) {
			console.log('hartfull', result)
//			console.log(result.data.hartfull[0])
			
			try {
				if(result.data.hartfull[0].rmnd != null) {
//					console.log(result.data.hartfull.length)
					for (var i= 0; i < result.data.hartfull.length; i++) {
						ctno = result.data.hartfull[i].ctno
//						console.log(result)
//						console.log(result.data.hartfull[i])
//						console.log("ctno", ctno)
//						console.log(i)
//						console.log("왓",result.data.hartfull[i].ctno)
//						console.log("이거",$('.hart-box').attr('data-no'))
							if(result.data.hartfull[i].ctno == $('.heart'+ctno).attr('data-no')) {
								console.log("성공")
								$(".heart" + ctno + " > a").removeClass("fa-heart-o")
								                           .removeClass("hart")
							                  	           .addClass("fa-heart")
								                           .addClass("hartfull")
								$(".heart" + ctno).addClass("hartfull-box")
				        		              .removeClass("hart-box")
							}
					}
				}
			} catch(exception) {
//				$(".heart" + ctno).addClass("hart-box")
//       		                      .removeClass("hartfull-box")
//       	        $(".heart" + ctno + "> a").removeClass("fa-heart")
//       		                              .removeClass("hartfull")
//       	                                  .addClass("fa-heart-o")
//       	                                  .addClass("hart")
			}   
			
			
		})
	}
}


/******************************모달**************************************/

//function modal(ctno) {
////		console.log($(".content_no" + ctno + ">" + "img").attr("src"))
////	  var t = $(".content_no" + ctno + ">" + "img").attr("src");
////	  $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
//	  $("#myModal").modal();
//	  $(document).ready(function() {
//			 $.getJSON('TogetherDetail.json', {'ctno': 1}, function(result) {
//				 var totalCount = result.data.totalCount;
//				 console.log(result)
//				 var templateFn = Handlebars.compile($('#slider-template').text())
//				 var generatedHTML = templateFn(result.data)
//				 $("#slider").text('') // tbody의 기존 tr 태그들을 지우고
//				 $("#slider").html(generatedHTML) // 새 tr 태그들로 설정한다.
//				 
//				 confirm()
//				 
//			 }) // getJSON()
//		 })
//}




 /****************************슬라이더************************************/
 
//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();


$(document).ready(function(){
	
	
	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider-wrap ul#slider').width(sliderWidth*totalSlides);
	
    //next slide 	
	$('#next').click(function(){
		slideRight();
	});
	
	//previous slide
	$('#previous').click(function(){
		slideLeft();
	});
	
	
	
	/*************************
	 //*> OPTIONAL SETTINGS
	************************/
	//automatic slider
	var autoSlider = setInterval(slideRight, 3000);
	
	//for each slide 
	$.each($('#slider-wrap ul li'), function() { 
	   //set its color
	   var c = $(this).attr("data-color");
	   $(this).css("background",c);
	   
	   //create a pagination
	   var li = document.createElement('li');
	   $('#pagination-wrap ul').append(li);	   
	});
	
	//counter
	countSlides();
	
	//pagination
	pagination();
	
	//hide/show controls/btns when hover
	//pause automatic slide when hover
	$('#slider-wrap').hover(
	  function(){ $(this).addClass('active'); clearInterval(autoSlider); }, 
	  function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
	);
	
	

});//DOCUMENT READY
	


/***********
 SLIDE LEFT
************/
function slideLeft(){
	pos--;
	if(pos==-1){ pos = totalSlides-1; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos)); 	
	
	//*> optional
	countSlides();
	pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
	pos++;
	if(pos==totalSlides){ pos = 0; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos)); 
	
	//*> optional 
	countSlides();
	pagination();
}



	
/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(){
	$('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
	$('#pagination-wrap ul li').removeClass('active');
	$('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}
		
	