var word = $("#keyword");
  
var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('table > tbody'),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no')
    pageSize = 10;

var mno;

userinfo()

$("#keyword").keyup(function(){
//	$.post('mySuchList.json', {
//		'keyword': word.val()
//	}, function(result) {
//	}, 'json')
	displayList2(1);
	if(word.val() == "") {
		displayList(1);
	}
})


function displayList2(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('mySuchList.json', {'pageNo':pageNo, 'pageSize':pageSize , 'keyword':word.val()}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
  var totalCount = result.data.totalCount
  console.log("이거",result.data)
  var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

  var templateFn = Handlebars.compile($('#tbody-template').text())
  var generatedHTML = templateFn(result.data)
    tbody.text('')
    tbody.html(generatedHTML)  // 문자열 html을 리턴한다.
    
    currPageNo = pageNo
    pageNoTag.text(currPageNo)
    console.log(result)
    
    if(currPageNo == 1){
      prevBtn.prop('disabled', true)
    } else {
      prevBtn.prop('disabled', false)
    }

    if(currPageNo == lastPageNo){
      nextBtn.prop('disabled', true)
    } else {
      nextBtn.prop('disabled', false)
    }
    console.log("어디서 안되는거야2", templateFn);
    
  })
}

var currPageNo = parseInt(pageNoTag.text())
$(document.body).on('click', '.detail-link', function(event){
	location.href = 'view.html?no=' + $(this).attr('data-no')
	event.preventDefault()
})
prevBtn.click(function() {
  displayList(currPageNo - 1)
})

nextBtn.click(function() {
  displayList(currPageNo + 1)
})



function displayList(pageNo){
	console.log("여기",mno)
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('myList.json', {'pageNo':pageNo, 'pageSize':pageSize ,'memberNo':mno}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식

	  var totalCount = result.data.totalCount
  console.log(result.data)
  var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

  var templateFn = Handlebars.compile($('#tbody-template').text())
  var generatedHTML = templateFn(result.data)
    tbody.text('')
    tbody.html(generatedHTML)  // 문자열 html을 리턴한다.
    
    currPageNo = pageNo
    pageNoTag.text(currPageNo)
    if(currPageNo == 1){
      prevBtn.prop('disabled', true)
    } else {
      prevBtn.prop('disabled', false)
    }

    if(currPageNo == lastPageNo){
      nextBtn.prop('disabled', true)
    } else {
      nextBtn.prop('disabled', false)
    }
  })
}


/************************************************/

$(document.body).on('click', '.board', function(event){
	location.href = 'mywrite_detail.html?no=' + $(this).attr('data-no')
	
//	event.preventDefault()
})


function userinfo() {
	
		$.getJSON('userinfo.json', function(result) {
			if(result.data != null) {
				console.log(result.data.no)
				mno = result.data.no;
				console.log(mno)
				displayList(1)
			}		
		})
}


