var	jsNo,
    mno,
	pageNoTag = $('#page-no'),
	prevBtn = $('#prev-btn'),
	nextBtn = $('#next-btn'),
	pageSize = 12,
	currPageNo = parseInt(pageNoTag.text()),
	StartPage,
	MovePage,
	EndPage,
	makePulic,
	makeDscp;

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
	makePulic = result.data.list[0].Ct_public
    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
    var templateFn = Handlebars.compile($('#Storage-template').text())
    var generatedHTML = templateFn(result.data)
    $(".gallery").text('') // tbody의 기존 tr 태그들을 지우고
    $(".gallery").html(generatedHTML) // 새 tr 태그들로 설정한다.
		
    currPageNo = pageNo
    pageNoTag.text(currPageNo)
    
    collection_detail() 

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
  }) // getJSON()
} // displayList()

function collection_detail() {
	$(".play_collection").on("click", function() {
		jsNo = $(this).attr("data-js")
		
	$(this).on("click", function() {
	  $("#myModal").modal();
    })
		
	$.getJSON('storage-detail.json', {'ctno': jsNo}, function(result) {
		var data = result.data
		console.log(data)
		
		var templateFn = Handlebars.compile($('.FairyTaleContent-template').text())
	    var generatedHTML = templateFn(result.data)
	    $(".FairyTale_Content").text('') // tbody의 기존 tr 태그들을 지우고
	    $(".FairyTale_Content").html(generatedHTML) // 새 tr 태그들로 설정한다.
	    
	    
	    Slider()
	    MakePublic(makePulic)
	    console.log(result)
	    makeDscp = data.list[0].Ct_Dscp
	    
	    StartPage = data.list[0].bkno;
		MovePage = StartPage;
		EndPage = StartPage + data.list.length -1;

		console.log("Start " + StartPage)
		console.log("MovePage " + MovePage)
		console.log("End " + EndPage)
		})
	}) 
}
/***********************************************************/

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

		$(".control_prev").unbind( "click" );
		$(".control_next").unbind( "click" );
		$('.control_prev').click(function () {
			moveLeft();
			MovePage -= 1;
			if(MovePage < StartPage){
				MovePage = EndPage;
			}
			console.log(MovePage)
		});

		$('.control_next').click(function () {
			moveRight();
			MovePage += 1;
			if(MovePage > EndPage){
				MovePage = StartPage;
			}
		});
		
		$("#recordPlay").on("click", function() {
			$("#recordPlay").css("background-color","rgba(255, 0, 0, 0.54)")
			$("#recordStop").css("background-color","rgb(211, 211, 211)")
			$(".playREC"+ MovePage)[0].play();
		})

		$("#recordStop").on("click", function() {
			$("#recordStop").css("background-color","rgba(255, 0, 0, 0.54)")
			$("#recordPlay").css("background-color","rgb(211, 211, 211)")
			$(".playREC"+ MovePage)[0].pause();
		})

		$(".playREC"+ MovePage).on("ended",  function() {
			console.log("Start MovePage:" + MovePage)
			moveRight();
			MovePage += 1;
			console.log("Next MovePage:" + MovePage)
			$(".playREC"+ MovePage)[0].play();

			autoplayRecord(MovePage)
		})
		

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


		
	});
}
/***********************************************************************/
function MakePublic(makePulic) {
	console.log("makePulic"+makePulic)
	if(makePulic == "Yes"){
		$("#together-view").css("background-color", "#ff9869");
		$("#me-view").css("background-color", "#D3D3D3");
	}
	else{
		$("#me-view").css("background-color", "#ff9869");
		$("#together-view").css("background-color", "#D3D3D3");
	}
}

$('#me-view').on('click',function() {
	$("#me-view").css("background-color", "#ff9869");
	$("#together-view").css("background-color", "#D3D3D3");
	$.post('updateCustbook.json', {
		'no': jsNo,
		'Ct_public': "No",
		'Ct_dscp': makeDscp
	}, function(result) {
		console.log(result)
	}, 'json')
});

$("#together-view").on("click", function() {
	$("#together-view").css("background-color", "#ff9869");
	$("#me-view").css("background-color", "#D3D3D3");
	$.post('updateCustbook.json', {
		'no': jsNo,
		'Ct_public': "Yes",
		'Ct_dscp': makeDscp
	}, function(result) {
		console.log(result)
	}, 'json')
})

$("#deleteWork").on("click", function() {
	$.getJSON('storage_delete.json', {'no': jsNo}, function(result) {
	  location.href = 'storage.html'
	})
})