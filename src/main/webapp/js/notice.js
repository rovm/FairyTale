var word = $("#keyword");
  
var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('table > tbody'),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no'),
    pageSize = 10,
    Div='notice';
var posi;
var mno;
userinfo()
$("#keyword").keyup(function(){
	displayList2(1);
	if(word.val() == "") {
		displayList(1);
	}
})

try {
	pagesize = location.href.split('p/')[1].split('.')[0]
} catch (err) {}
if(pagesize == 'notice'){
	pageSize = 10
} else if(pagesize == 'main'){
	pageSize = 9
}
displayList(1);
function displayList2(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('noticeSuchList.json', {'pageNo':pageNo, 'pageSize':pageSize , 'keyword':word.val()}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
	  
  var totalCount = result.data.totalCount
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


displayList(1)
function displayList(pageNo){
	// 서버에서 강사 목록 데이터를 받아 온다.
setTimeout(() => {
	
  $.getJSON('noticeList.json', {'pageNo':pageNo, 'pageSize':pageSize , 'bw_div':Div}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
  var totalCount = result.data.totalCount
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
}, 100);
}


/************************************************/

$(document.body).on('click', '.board', function(event){
	location.href = 'notice_detail.html?no=' + $(this).attr('data-no')
})


$('#bord-btn').click(function(){
	if (mno != null) {
	  location.href = 'noticewrite.html'
	} else {
	  alert("로그인하시옵소서")
	  location.href = 'login.html'
	}
})
function userinfo() {
		$.getJSON('userinfo.json', function(result) {
			if(result.data != null) {
				mno = result.data.no;
				posi = result.data.posi;
				if(posi == 'master') {
					$('#bord-btn').css('display','block')
				} else {
					$('#bord-btn').css('display','none')
				}
			}		
		})
}

