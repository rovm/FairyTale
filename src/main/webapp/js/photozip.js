var mno, jsNo;
var pageNoTag = $('#page-no'),
	prevBtn = $('#prev-btn'),
	nextBtn = $('#next-btn'),
	pageSize = 12,
	currPageNo = parseInt(pageNoTag.text())

$.getJSON('userinfo.json', function(result) {
	mno = result.data.no;
	console.log(mno)
	displayList(1, mno)
})


function wrapWindowByMask(){
	//화면의 높이와 너비를 구한다.
	var maskHeight = $(document).height();  
	var maskWidth = $(window).width();  

	//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
	$('#mask').css({'width':maskWidth,'height':maskHeight});  

	//애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
	$('#mask').fadeIn(1000);      
	$('#mask').fadeTo("slow",0.8);    

	//윈도우 같은 거 띄운다.
	$('.window').show();
}

$(document).ready(function(){
	//검은 막 띄우기
	$('#photo-upload').click(function(e){
		e.preventDefault();
		wrapWindowByMask();
	});

	//검은 막을 눌렀을 때
	$('#mask').click(function () {  
		$(this).hide();  
		$('.window').hide();  
	});      
});

$('#fileupload').fileupload({
	url : '/p-desktop/upload.json', // 서버에 요청할 URL
	dataType : 'json', // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads : true, // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads : false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload : false, // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize : /Android(?!.*Chrome)|Opera/
	.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
	previewMaxWidth : 360, // 미리보기 이미지 너비
	previewMaxHeight : 250, // 미리보기 이미지 높이
	previewCrop : true, // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
	processalways : function(e, data) {
		console.log('fileuploadprocessalways()...');
		console.log(data.files);

		var imagesDiv = $('#images-div')
		imagesDiv.html("");
		for (var i = 0; i < data.files.length; i++) {
			try {
				if (data.files[i].preview.toDataURL) {
					$("<img>").attr('src',data.files[i].preview.toDataURL())
					.css('width', '360').appendTo(imagesDiv);
				}
			} catch (err) {
			}
		}
		$('#upload-btn').unbind("click");
		$('#upload-btn').click(function() {
			
			data.submit();
		});
	},


	submit : function(e, data) { // 서버에 전송하기 직전에 호출된다.	
		console.log('submit()...');
		
		data.formData = {
				bw_titl : $('#upload-titl').val(),
				bw_con : $('#upload-description').val(),
				mno: mno
		};
		
	},


	done : function(e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log('done()...');
		console.log(data.result);
		var file = data.result.fileList;
		$('<p/>').text("name : " + data.result.name).appendTo(
				document.body);
		$.each(data.result.fileList, function(index, file) {
			$('<p/>').text(file.filename + " : " + file.filesize)
			.appendTo(document.body);
		});
		location.href="photozip.html"
	}
});

/****************************************************************************/

prevBtn.on('click', function() {
  displayList(currPageNo - 1, mno)
})

nextBtn.on('click', function() {
  displayList(currPageNo + 1, mno)	
})

var totalCount;

function displayList(pageNo, mno) {
	// 서버에서 강사 목록 데이터를 받아 온다.
  $.getJSON('photozip_list.json', {'pageNo':pageNo, 'pageSize': pageSize, 'mno': mno}, function(result) {
	var totalCount = result.data.totalCount;
	var lastPageNo = parseInt(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
	console.log(result)
    // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
    var templateFn = Handlebars.compile($('#Photozip-template').text())
    var generatedHTML = templateFn(result.data)
    $(".gallery").text('') // tbody의 기존 tr 태그들을 지우고
    $(".gallery").html(generatedHTML) // 새 tr 태그들로 설정한다.

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

    gallery.ready_();
    deleteBtn();
  }) // getJSON()
} // displayList()


/***************************************************************************/
var gallery = (function(){
	  'use strict';
	  return {
	    // this.js(obj)
	    js: function(e){
	    	no = e;
	    	return $("[data-js="+e+"]");},
	    // this.lk(obj)
	    lk: function(e){
	    	no = e;
	    	return $("[data-lk="+e+"]");},
	    // Ready functions
	    ready_: function(){this.events();},
	    //  functions
	    events:function(){
	      var self = this;
	      var close = $('.gallery_item_full');
	      // Get all data js and add clickOn function
	      $('.gallery_item_preview a[data-js]').click(function() {
	        jsNo = $(this).attr("data-js")
	        self.fx_in($('div[data-lk=' + jsNo + ']')); 
	        self.fx_in($('.box'));
	      });
	      
	      // close on click
	      $('.gallery_item_full').on("click",function(){
	        self.fx_out($('.gallery_item_full'));
	        self.fx_out($('.box'));
	      });
	  
	    },
 
	    // out function
	    fx_out: function(el){
	      el.addClass('efOut')
	      .delay(500)
	      .fadeOut('fast')
	      .removeClass('efIn');
	      $('body').css({overflow:'auto'});
	      return false;
	    }, 
	    // in function
	    fx_in: function(el){
	      el.removeClass('efOut')
	      .show()
	      .addClass('efIn');
	      $('body').css({overflow:'hidden'});
	      return false;
	    }
	  };
	})();
	// ready function of gallery

function deleteBtn() {
	$(".deleteBtn").on("click", function() {
		console.log("딜리트 버튼 눌렷다!")
		console.log(jsNo)
		$.getJSON('photozip_delete.json', {'no': jsNo}, function(result) {
      location.href = 'photozip.html'
    })
	})	
}

