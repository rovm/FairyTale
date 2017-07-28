var tbody = $('.box-form'),
	title=$('#bw_titl'),
	creater=$('#name'),
	Ccreater=$('#c_name'),
	con=$('#bw_con'),
	wdt=$('#bw_wdt'),
	Ccon=$('#c_con'),
	comment=$('#comment')
	


var no = 0
try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}


$.getJSON('detail.json', {'no': no}, function(result) {
    var data = result.data
    creater.text(data.name)
    title.text(data.bw_titl)
    con.text(data.bw_con)
    wdt.text(data.bw_wdt)
    console.log(result)
})


  $('#board-delete').click(function() {
    $.getJSON('delete.json', {'no': no}, function(result) {
      location.href = 'community_boarder.html'
    })
  })
  
  
  $('#board-update').click(function(){
	location.href = 'boardwrite.html?no=' + no
})

 $('#board-list').click(function(){
	location.href = 'community_boarder.html'
})


$('#c-addbtn').on('click',function() {
	console.log('comment');
	console.log(no, Ccon.text())
    $.post('comAdd.json', {
      'no': no,
      'c_con': Ccon.text()
    }, function(result) {
      location.href = 'board_detail.html?no='+no
    }, 'json')
  })
  

  
  var pageNoTag = $('#page-no')  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('#comment'),
//    prevBtn = $('#prev-btn'),
//    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no')
    pageSize = 10;

function displayList(){
	
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('comList.json', {'no':no}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
	  console.log(result)
	  console.log(result.data)
  var totalCount = result.data.totalCount
  var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

  var templateFn = Handlebars.compile($('#comment-template').text())
  var generatedHTML = templateFn(result.data)
    tbody.text('')
    tbody.html(generatedHTML)
      // 문자열 html을 리턴한다.
    
//    currPageNo = pageNo
//    pageNoTag.text(currPageNo)
//    console.log(totalCount)
//    console.log(lastPageNo)
//    console.log(result)
//    if(currPageNo == 1){
//      prevBtn.prop('disabled', true)
//    } else {
//      prevBtn.prop('disabled', false)
//    }
//
//    if(currPageNo == lastPageNo){
//      nextBtn.prop('disabled', true)
//    } else {
//      nextBtn.prop('disabled', false)
//    }
//    
    

  })
}
displayList()

