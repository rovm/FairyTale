var pageNoTag = $('#page-no'),
    photoStack = $(".photo-stack-grid"),
    prevBtn = $('#prev-btn'),
    nextBtn = $('#next-btn'),
    pageSize = 12,
    selectform = $('#select_sort_form');

var currPageNo = parseInt(pageNoTag.text())

selectform.on('change', function() {
	console.log(selectform.val());
	displayList(1);
})

prevBtn.on('click', function() {
  displayList(currPageNo - 1)
})

nextBtn.on('click', function() {
  displayList(currPageNo + 1)	
})
var totalCount = 1;
function displayList(pageNo) {
  // 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('MSTBOOK_list.json', {'pageNo':pageNo, 'pageSize': pageSize, 'selectform' : selectform.val()}, function(result) {
    var totalCount = result.data.totalCount;
    var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)

    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
    var templateFn = Handlebars.compile($('#BookList-template').text())
    var generatedHTML = templateFn(result.data)
    photoStack.text('') // tbody의 기존 tr 태그들을 지우고
    photoStack.html(generatedHTML) // 새 tr 태그들로 설정한다.

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
  }) // getJSON()
} // displayList()

displayList(1)

function wrapWindowByMask(){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $(document).height();  
        var maskWidth = $(window).width();  

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#mask').css({'width':maskWidth,'height':maskHeight});  

        //애니메이션 효과
        $('#mask').fadeIn(1000);      
        $('#mask').fadeTo("slow",0.8);    
}

