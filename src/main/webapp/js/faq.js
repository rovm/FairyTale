

////////////////////////////////////////////////////

var pageNoTag = $('#page-no'),
	prevBtn = $('#pre-btn'),
	nextBtn = $('#next-btn'),
	pageSize = 5;

var currPageNo = parseInt(pageNoTag.text())

var selectBtn = $(".faq_select")
//이벤트 핸들러 등록




selectBtn.on("change", function() {
	console.log(selectBtn.val());
	displayList(1)
})

prevBtn.click(function() {
displayList(currPageNo - 1)
})

nextBtn.click(function() {
displayList(currPageNo + 1)
})

var faqForm = $('#faqForm')


function displayList(pageNo) {

// 서버에서 강사 목록 데이터를 받아 온다.
$.getJSON('FAQ_list.json', {'pageNo':pageNo, 'pageSize': pageSize, 'selectBtn' : selectBtn.val()}, function(result) {
	console.log(result.data);
	var totalCount = result.data.totalCount;
	 var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)


	// 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
	var templateFn = Handlebars.compile($('#faqForm-template').text())
	var generatedHTML = templateFn(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	faqForm.text('') // tbody의 기존 tr 태그들을 지우고
	faqForm.html(generatedHTML) // 새 tr 태그들로 설정한다.

	$(".box").click(function(){
		$(this).next().slideToggle("fast");
		$(this).find('i').toggle();
	});


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
