
	
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
    boardmno;

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

function comDel(cno) {
	if(mno != null) {		
    	$.getJSON('comDelete.json', {'no': cno}, function(result) {
	    	location.href = 'board_detail.html?no=' + no
	    })	
	} else {
		alert("로그인하시옵소서")
		location.href = 'login.html'
	}
}
  
  $('#board-delete').click(function(){
	  if (mno != null) {
		  $.getJSON('delete.json', {'no': no}, function(result) {
			  location.href = 'community_boarder.html'
		  })	
	  } else {
		  alert("로그인하시옵소서")
		  location.href = 'login.html'
		 
	  }
})
  $('#board-update').click(function(){
	location.href = 'boardwrite.html?no=' + no
})

 $('#board-list').click(function(){
	location.href = 'community_boarder.html'
})




$('#c-addbtn').on('click',function() {
		if(mno != null){
			$.post('comAdd.json', {
				'mno':mno,
				'no': no,
				'c_con': Ccon.val()
			}, function(result) {

				location.href = 'board_detail.html?no='+no
			}, 'json')
		} else {
			alert("로그인하시옵소서")
			location.href = 'login.html'

		}

  })
  
  var pageNoTag = $('#page-no'),  // 매번 이걸 찾으면 안좋다 찾아놓은걸 쓰자
    tbody = $('#com-board > tbody'),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    currPageNo = $('#page-no'),
    pageSize = 5,
    disableBtn = $('.standard-collection');

prevBtn.click(function() {
  displayList(currPageNo - 1)
})

nextBtn.click(function() {
	console.log('하하');
  displayList(currPageNo + 1)
})

displayList(1)
	
	
function displayList(pageNo){
	
	// 서버에서 강사 목록 데이터를 받아 온다.
		$.getJSON('comList.json', {'pageNo':pageNo, 'pageSize':pageSize, 'bwnoNo':no, 'mno':mno}, function(result) {// url, 서버에 보낼 데이터, 서버에서 받을 함수 비동기 방식
			var totalCount = result.data.totalCount
			var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1: 0)

			var templateFn = Handlebars.compile($('#comment-template').text())
			var generatedHTML = templateFn(result.data)
			tbody.text('')
			tbody.html(generatedHTML)
			
			userInfo()
			// 문자열 html을 리턴한다.
			currPageNo = pageNo
			pageNoTag.text(currPageNo)
			if(totalCount >= 1) {
				Ccount.text("댓글목록(" + totalCount + ")")
			}

			if(currPageNo == 1){
				prevBtn.prop('disabled', true)
				prevBtn.addClass("disable")
			} else {
				prevBtn.prop('disabled', false)
				prevBtn.removeClass("disable")
			}
			if(lastPageNo <= 1) {
				disableBtn.css("display", 'none')
			} else {
				disableBtn.css("display", 'block')
			}
			if(currPageNo == lastPageNo){
				nextBtn.prop('disabled', true)
				nextBtn.addClass("disable")
			} else {
				nextBtn.prop('disabled', false)
				nextBtn.removeClass("disable")
			}

		})
		
}

function userInfo() {
	$.getJSON('userinfo.json', function(result) {
		if(result.data != null) {
			mno = result.data.no;
			if(mno == boardmno) {
			$('#board-update').css("display", "block")
			$('#board-delete').css("display", "block")
			$('#wdt').css("width", "186px")
			
			}
			$(".mno" + mno).css('display', "block")
		}		
	})
}

	

