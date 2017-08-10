

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
 	var totalCount = result.data.totalCount;
 	if(totalCount == 0){
		totalCount = 1;
	}
	var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)


	var templateFn = Handlebars.compile($('#faqForm-template').text())
	var generatedHTML = templateFn(result.data)
	faqForm.text('')
	faqForm.html(generatedHTML)

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
