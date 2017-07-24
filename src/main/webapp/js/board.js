$(document).ready(function(){
  $("#keyword").keyup(function(){
      var k = $(this).val();
      $(".n-middle > div").hide();
      var temp = $(".n-middle > div > span > a:nth-child(n+1):contains('" + k + "')");

      temp.parent().parent().show();
  })
})


$.getJSON("../js/board.json",function(result){
  console.log(result);
})
/*************************************************************************/
$.getJSON('../js/board.json', {'pageNo':1, 'pageSize':4},function(result) {
var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('#teacher-tbl > tbody'),
    

    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    pageSize = 3;

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
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('list.json', {'pageNo':pageNo, 'pageSize':pageSize}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
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

displayList(1)
