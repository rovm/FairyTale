
	
var tbody = $('.box-form'),
	title=$('#bw_titl'),
	creater=$('#name'),
	Ccreater=$('#c_name'),
	con=$('#bw_con'),
	wdt=$('#bw_wdt'),
	Ccon=$('#c_con'),
    Ccount = $("#comCount"),
    filePath = $('#filePath'),
    mno,
    boardmno,
    posi;

var no = 0;
try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}

$.getJSON('detail.json', {'no': no}, function(result) {
    var data = result.data
    creater.text(data.name)
    title.text(data.bw_titl)
    con.text(data.bw_con)
    wdt.text(data.bw_wdt)
    filePath.attr("src", data.filePath)
    boardmno = data.mno
    console.log("이거", data)
    
})

  $('#board-delete').click(function(){
	  if (mno != null) {
		  $.getJSON('delete.json', {'no': no}, function(result) {
			  location.href = 'notice.html'
		  })	
	  } else {
		  alert("로그인하시옵소서")
		  location.href = 'login.html'
		 
	  }
})
  $('#board-update').click(function(){
	location.href = 'noticewrite.html?no=' + no
})

 $('#board-list').click(function(){
	location.href = 'notice.html'
})



  
  var pageNoTag = $('#page-no'),  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('#com-board > tbody'),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no'),
    pageSize = 5,
    disableBtn = $('.standard-collection');

function userInfo() {
	$.getJSON('userinfo.json', function(result) {
		console.log("데이터",result)
	    if(result.data != null) {
			mno = result.data.no;
			posi = result.data.posi;
		
			if(posi == 'master') {
			$('#board-update').css("display", "block")
			$('#board-delete').css("display", "block")
			$('#wdt').css("width", "186px")
			
			}
			$(".mno" + mno).css('display', "block")
		}		
	})
}

	

