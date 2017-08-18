"use strict"
var mno;
var ctno;


 userInfo()

 $(document).ready(function() {
	 $.getJSON('Together_list.json', {'pageNo':1, 'pageSize': 5, 'mno': 1}, function(result) {
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
		 $.getJSON('addLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
//			 console.log("성공적")
			 confirm()
		 })

	 }
}

function hate(ctno) {
	console.log(ctno)
	console.log(mno)
	$.getJSON('delLike.json', {'mno' : mno, 'ctno' : ctno}, function(result) {
		 console.log("성공적")
		 confirm()
	 })

}
var rmnd;
function confirm() {
	if(mno !=null) {
		$.getJSON('hartfull.json', {'mno': mno}, function(result) {
//			console.log('hartfull', result)
//			console.log(result.data.hartfull[0])
			try {
				if(result.data.hartfull[0].rmnd != null) {
					console.log(result.data.hartfull.length)
					for (var i= 0; i < result.data.hartfull.length; i++) {
						console.log(result.data.hartfull[0].rmnd)
							if(result.data.hartfull[0].ctno == $('.hart-box').attr('data-no')) {
								$('.hart-box').css('display', 'none')
								$('.hartfull-box').css('display', 'block')
							}else {
								$('.hart-box').css('display', 'block')
								$('.hartfull-box').css('display', 'none')
							}
					}
				}
			} catch(exception) {
				$('.hart-box').css('display', 'block')
				$('.hartfull-box').css('display', 'none')
			}
			
			
		})
	}
}
 
 
 